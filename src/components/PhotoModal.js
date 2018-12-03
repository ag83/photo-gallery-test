import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PhotoModal extends Component {

	constructor() {
        super();
        
		this.hidePhotoModal = this.hidePhotoModal.bind(this);
        this.hidePhotoModalEsc = this.hidePhotoModalEsc.bind(this);
        this.nextPhoto = this.nextPhoto.bind(this);
    }

    componentDidMount() {
		document.addEventListener("keyup", this.hidePhotoModalEsc);
	}

	componentWillUnmount() {
		document.removeEventListener("keyup", this.hidePhotoModalEsc);
	}

	hidePhotoModalEsc(evt) {
		if (evt.keyCode === 27) {
			this.props.hidePhotoModal();
		}
	};

	hidePhotoModal(evt) {
        evt.stopPropagation();
        this.props.hidePhotoModal();
    }

    nextPhoto(evt) {
        evt.stopPropagation();
        this.props.nextPhotoModal(this.props.photoInModal.dataIndex + 1);
    }
    
    render() {
		if (!this.props.modalShowed || !this.props.photoInModal) {
			return null;
		}
		return (
            <div className="ph-modal-back" onClick={this.hidePhotoModal}>
                <div className="ph-modal-container" role="dialog" onClick={this.nextPhoto}>
                    <button
                        className="ph-modal-close"
                        name="close"
                        onClick={this.hidePhotoModal}
                    >&#x2715;</button>
                    <div className="ph-photo-container">
                        <img  src={this.props.photoInModal.url} alt={this.props.title} />
                    </div>
                    <div className="ph-photo-description">{this.props.photoInModal.title}</div>
                </div>
            </div>
		);
	}
}