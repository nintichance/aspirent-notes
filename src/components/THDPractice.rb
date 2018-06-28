# There's a couple things that you need for a task
# You have two things that you are doing when running a rake task
# You need a namespace and a task
# The descirption is a descirption of what the task does
# :envinoment specifies that you want it to load the curren rails environment to be used... if you don't do that it will try to run the taks
# as pure ruby code... it will look for our development db and whatnot, but we want to use different environment in the case that we didn't have the local environment viariables
# and whatnot set
# bundle exec rake tool_rental:seed_collections_salvage_fees
# because we have multiple versions of rake, we have a bundle exec to execute the specific version of rake that we need
# if running on a cpu that only has one version of rake install
# with cloud foundry, we use "cf run task [app name] '[command]'"
# when you run a cf rake task, it spins up a whole new container in cloud foundry, you need to specify the amount of space you need to take up
# our app requires at least 1G, in order to not use extra space on CF
namespace name :tool_rental do
    desc "Populates salvage fees on tools on contracts in collections status"

    task :seed_collections_salvage_fees => :environment do
        
        contracts = Contract.where(status: 'COLLECTIONS')

        contracts.each do | contract |
            contract.contract_tools.each do | tool |
                if tool.tool_status == 'SALVAGED' && tool.contract_fee_amount('salvage_fee') == 0.0
                    tax = get_tax(contract, tool, product_code 'salvage_fee', tool.max_order_cost)
                    tool.contract_fees << ContractFee.create(description: 'salvage_fee', amount: tool.max_order_cost, tax: tax)
                end
            end
        end

    end

    def get_tax(contract, tool, product_code, amount)
        TaxCalculator.new.getTaxAmountForFee(storedetails(contract), tool.category_code, tool.sub_category_code, product_code, amount)
    #A rescue block catches any errors of the types specified
    #In the case that we get any of these errors, we store the error in the object called e and we return 0, in order to return a number which will allow everything to continue
    rescue HomeDepotTaxwareClient::Client::TaxWareClientError, HTTP::Error, Net::ReadTimeout, Net::OpenTimeout => e
        0
    end

    def store_details(contract)
        #if the store details are already defined, then return them
        return @store_details if defined?(store_details)
        #We removed if defined? because it will only return the same information
        address = StoreInformationService.new(contract.store_number).address
        #StoreInformationService is a class that WE made, which returns stor information by making an API call to the SIS's team's store information that we need
        #We make these calls daily and it expires daily... CHALLENGE--sometmes we get bad information cached... If we have a bad cache, stores may go down
        #StoreInformationService is a class which is created by the DOTCOM team, this will return the particular store for which we are looking
        @store_details = {
            country_code: address.country,
            city: address.city,
            state_province: address.state,
            postal_code: address.postal_code,
            store_number: contract.store_number,
            geo_code: address.geo_code
        }
    end
end

class CloseSwappedToolJob
    include Sidekiq::Worker
    #Sidekiq is a gem
    sidekiq_options retry: 3,
    unique: :while_executing,
    unique_args: ->(args) {[]}

##every job has a perform method, which is what the job does
# It is all the information that the job will need to run asynchronously
def perform(tool_id=nil, store_number)
    tool = ContractTool.find(tool_id)
    
    return unless tool&.has_been_swapped && store_number

    StoreInventoryService.update_store_inventory_on_close(tool.category_code, tool.sub_category_code, tool.unique_reference_number, store_number)
end
end


