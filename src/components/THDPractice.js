state = {
    file: null, 
    successful: false,
    unsuccessful: false
}
//function(s) that we are testing
onClick = async()=>{
    try{
        const formData = new FormData()
        formData.append('file', this.state.file)
        await apiClient.usedEquipmentupload(formData)
        this.setState({file: null, unsuccessful: false, successful: true})
    }
    catch(e){
        console.log(e)
        this.setState({file: null, successful: false, unsuccessful: true})
    }
}

onDrop = (file) => {
    this.setState({file: file[0], successful: false, unsuccessful: false})
}

renderDropzoneInput = () => {
    if(this.state.file){
        return (<p>{this.state.file.name}</p>)
    }
    else{
        return (<p>Drop files here or <span>Browse</span></p>)
    }
}

showBanner = () => {
    if(this.state.successful){
        return "Banner succesful"
    }
    else if (this.state.unsuccessful){
        return "Banner unsuccessful"
    }
    else {
        return "default"
    }
}
 
//Testing uploading the file upon drag & drop
import React from 'react'
import { shallow } from 'enzyme'
import { UsedEquipmentUploadPage } from './UsedEquipmentUploadPage'
import apiClient from 'lib/contracts-api/contractsApiClient'

jest.mock('lib/contracts-api/contractsApiClient')

let props
let component
let uploadPromise
let bannerComponent

beforeEach(()=>{
    uploadPromise = Promise.resolve()
    apiClient.usedEquipment.upload = jest.fn(data => Promise.resolve(data))
    component = shallow(<UsedEquipmentUploadPage/>)
})
it('Display the Banner component if successful is true', ()=>{
    component.instance().state = {successful: true}
    const showBannerInfo = component.instance().showBanner()
    bannerComponent = <div><Banner successful/></div>
    expect(showBannerInfo).toEqual(bannerComponent)
})
it('Display the Banner component if unsuccessful is true', ()=>{
    component.instance().state = {unsuccessful: true}
    const showBannerInfo = component.instance().showBanner()
    bannerComponent = <div><Banner unsuccessful/></div>
    expect(showBannerInfo).toEqual(bannerComponent)
})
it('Display the default Banner component is true', ()=>{
    component.instance().state = {unsuccessful: false, successful: false}
    const showBannerInfo = component.instance().showBanner()
    bannerComponent = <div><Default/></div>
    expect(showBannerInfo).toEqual(bannerComponent)
})
it('calls onDrop when files are added by user', ()=>{
    //Mocking the happy path of making an API call
    // let fakeReader = jest.fn({
    //     readAsText: jest.fn(string => {}),
    //     result: 'some text'
    // })
    // let file = new File(["some text"], 'filename', {type: 'text/html'})
    // component.instance().onDrop(file)

    component.find(Dropzone).simulate('drop', {dataTransfer: {files: [file]}})
    //this calls onDrop, which calls reader.onload and reader.readAsArrayBuffer

    return uploadPromise.then(()=>{

    })
    expect(apiClient.usedEquipment.upload).toHaveBeenCalledWith()
})


