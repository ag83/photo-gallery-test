import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import AutoSizer from "react-virtualized/dist/es/AutoSizer";
import Grid from "react-virtualized/dist/es/Grid";

import Photo from "./Photo";
import PhotoModal from "./PhotoModal";

export default class Photos extends Component {

    constructor(props) {
        super(props);
    
        this._itemWidth = 150;
        this._itemHeight = 170;
        this._colNumber = 3;

        this.onResize = this.onResize.bind(this);
        this.cellRenderer = this.cellRenderer.bind(this);
        this.calculateColumns = this.calculateColumns.bind(this);
        this.calculateRows = this.calculateRows.bind(this);
        this.calculateHeight = this.calculateHeight.bind(this);
        this.virtualScroll = this.virtualScroll.bind(this);
    }
    

    componentDidMount() {
        this.props.getPhotos();
    }

    cellRenderer({ columnIndex, key, rowIndex, style }) {
        const dataIndex = columnIndex + rowIndex * this._colNumber
		let data = { ...this.props.photos[dataIndex], dataIndex };
		let functions = {
			showPhotoModal: this.props.showPhotoModal
		};
		if (data.id) {
			return (
                <div style={style} key={key}>
                    <Photo
                        {...data}
                        {...functions}
                    />
                </div>
			);
		}
    };
    
    onResize({ width }) {
		this.calculateColumns(width);
    };

    calculateColumnNum() {
		let screenWidth = window.innerWidth;
		if (screenWidth >= 1600) {
			return 10;
		} else if (screenWidth < 1600 && screenWidth >= 1366) {
			return 8;
		} else if (screenWidth < 1366 && screenWidth >= 1024) {
			return 6;
        } else if (screenWidth < 1024 && screenWidth >= 768) {
            return 4;
        } else if (screenWidth < 768 && screenWidth >= 480) {
            return 3;
        }
		return 2;
	}
    
    calculateColumns(width) {
		const colNum = this.calculateColumnNum();
		const colWidth = Math.floor(width / colNum);
		this._itemWidth = colWidth;
		this._colNumber = colNum;
    };
    
	calculateRows() {
		return Math.ceil(this.props.photos.length / this._colNumber);
	};

	calculateHeight() {
        let screenHeight = window.innerHeight;
        return Math.ceil(screenHeight - 6*16 - 6*16);
		//return (150 + 30) * Math.ceil(this.props.photos.length / this._colNumber);
    };
    
    virtualScroll() {
        const height = this.calculateHeight();
        return (
            <AutoSizer disableHeight onResize={this.onResize}>
                {({ width }) => {
                    this.calculateColumns(width);
                    return (
                        <Grid
                            cellRenderer={this.cellRenderer}
                            columnWidth={this._itemWidth}
                            columnCount={this._colNumber}
                            height={height}
                            ref={(ref) => {
                                this.grid = ref;
                            }}
                            rowHeight={this._itemHeight}
                            rowCount={this.calculateRows()}
                            width={width}
                        />
                    );
                }}
            </AutoSizer>
        );
  
    }

    render() {
        const photoModal = { 
            modalShowed: this.props.modalShowed, 
            photoInModal: this.props.photoInModal, 
            hidePhotoModal: this.props.hidePhotoModal,
            nextPhotoModal: this.props.nextPhotoModal
        };
        return (
            <Fragment>
                <main className="ph-content" >
                    {this.props.photos? this.virtualScroll() : (<div className="ph-loading" >loading</div>)}
                </main>
                <PhotoModal {...photoModal} />
            </Fragment>
        );
    }

}