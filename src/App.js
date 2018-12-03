import React, { Component, Fragment } from 'react';

import PhotoContainer from './containers/PhotoContainer';

import './styles/main.css';

export default class App extends Component {
    render() {
        return (
            <Fragment>
                <header className="ph-header"><h1 className="ph-header__logo">Photo Gallery</h1></header>
                <PhotoContainer/>
                <footer className="ph-footer"></footer>
            </Fragment>
        );
      }
};