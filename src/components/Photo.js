import React, { Component } from "react";
import PropTypes from "prop-types";


export default class Photo extends Component {

    constructor(props) {
        super(props);

        this.showModal = this.showModal.bind(this);
    }

    showModal() {
        const selectedPhoto = {
            title: this.props.title,
            url: this.props.url,
            dataIndex: this.props.dataIndex,
            id: this.props.id
        }
        this.props.showPhotoModal(selectedPhoto);
    }

    render() {
        return (
            <div className="ph-thumbphoto-container" onClick={this.showModal}>
                <img  src={this.props.thumbnailUrl} alt={this.props.title}/>
            </div>
        ); 
    }
}