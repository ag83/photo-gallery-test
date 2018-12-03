import React from 'react'
import { shallow, mount } from 'enzyme';

import PhotoModal from"./PhotoModal";

const mockEvt = {
    stopPropagation: jest.fn()
}

const modalData = {
    hidePhotoModal: jest.fn(),
    nextPhotoModal: jest.fn(),
    photoInModal: {
        title: "accusamus beatae ad facilis cum similique qui sunt",
        url: "https://via.placeholder.com/600/92c952",
        dataIndex: 0,
        id: 1
    },
    modalShowed: true
};

describe('PhotoModal', ()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<PhotoModal {...modalData}/>);
    });

    it("should render PhotoModal", () => {
        expect(wrapper.length).toEqual(1)
    });

    it("shouldn't render modal with false modalShowed", () => {
        let changedModalData = {...modalData};
        changedModalData.modalShowed = false;
        const changedWrapper = shallow(<PhotoModal {...changedModalData}/>)
        expect(changedWrapper.find('.ph-modal-container').length).toEqual(0);
    });

    it("shouldn't render modal with absent photo data", () => {
        let changedModalData = {...modalData};
        changedModalData.photoInModal = null;
        const changedWrapper = shallow(<PhotoModal {...changedModalData}/>)
        expect(changedWrapper.find('.ph-modal-container').length).toEqual(0);
    });

    it("should render a photo", () => {
        expect(wrapper.find('.ph-photo-container img').prop("src")).toEqual(modalData.photoInModal.url);
    });

    it("should render a description", () => {
        expect(wrapper.find('.ph-photo-description').text()).toEqual(modalData.photoInModal.title);
    });

    it("should render close button", () => {
        expect(wrapper.find('button.ph-modal-close').length).toEqual(1);
    });

    it("should render background", () => {
        expect(wrapper.find('.ph-modal-back').length).toEqual(1);
    });

    it('should close on press Esc', () => {
        const map = {};
        document.addEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });
        const changedWrapper = mount(<PhotoModal {...modalData}/>)
        expect(modalData.hidePhotoModal).toHaveBeenCalledTimes(0);
        map.keyup({ keyCode: 27 });
        expect(modalData.hidePhotoModal).toHaveBeenCalledTimes(1);
        modalData.hidePhotoModal.mockClear();
    });

    it('should close on press X', () => {
        expect(modalData.hidePhotoModal).toHaveBeenCalledTimes(0);
        wrapper.find('button.ph-modal-close').simulate('click',  mockEvt);
        expect(modalData.hidePhotoModal).toHaveBeenCalledTimes(1);
        modalData.hidePhotoModal.mockClear();
    });

    it('should close on background press', () => {
        expect(modalData.hidePhotoModal).toHaveBeenCalledTimes(0);
        wrapper.find('.ph-modal-back').simulate('click',  mockEvt);
        expect(modalData.hidePhotoModal).toHaveBeenCalledTimes(1);
        modalData.hidePhotoModal.mockClear();
    });

    it("shouldn't close on picture press", () => {
        expect(modalData.hidePhotoModal).toHaveBeenCalledTimes(0);
        wrapper.find('.ph-modal-container').simulate('click',  mockEvt);
        expect(modalData.hidePhotoModal).toHaveBeenCalledTimes(0);
        modalData.hidePhotoModal.mockClear();
        modalData.nextPhotoModal.mockClear();
    });

    it("should next picture called on picture press", () => {
        expect(modalData.nextPhotoModal).toHaveBeenCalledTimes(0);
        wrapper.find('.ph-modal-container').simulate('click',  mockEvt);
        expect(modalData.nextPhotoModal).toHaveBeenCalledTimes(1);
        modalData.nextPhotoModal.mockClear();
    });

});