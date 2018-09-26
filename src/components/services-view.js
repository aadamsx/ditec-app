/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element';
import { SharedStyles } from './shared-styles.js';
import { PageViewElement } from './page-view-element.js';

import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';

import { store } from '../store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { setServicesModalId } from '../actions/app.js';

class ServicesView extends connect(store)(PageViewElement) {
  _render() {
    const { _servicesModalId } = this;
    return html`
      ${SharedStyles}
      <style>
        #container {
          min-height: 100vh !important;
          background: url(../images/surface.jpg) no-repeat center center fixed;
          -webkit-background-size: cover;
          -o-background-size: cover;
          -moz-background-size: cover;
          background-size: cover;

          display: flex;
          align-items: center;
        }
        
        h1 {
          color: white;
          font-size: 4vw;
          line-height: 90%;
          padding: 7vw;
        }

        .flex-container {
          padding: 0;
          margin: 0;
          list-style: none;

          /* create a flex layout context */
          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;

          /* then set flow direction and wrap property */
          -webkit-flex-flow: row wrap;
          flex-flow: row wrap;

          /* define space is distributed around children */
          justify-content: space-around;
        }

        paper-card {
          width: 350px;
          margin-top: 20px;
        }

        .hide {
          visibility: hidden;
        }

      </style>

      <div class="flex-container">
        <paper-card  heading="Detail" image="http://placehold.it/350x150/FFC107/000000" alt="Emmental">
          <div class="card-content">
            Our Express service includes a complete wash and chamois hand dry of all exterior surfaces followed by an application of wax/cleaner wax using a variable speed power buffer on exterior fiberglass. 
          </div>
          <div class="card-actions">
            <paper-button raised on-click="${_=>store.dispatch(setServicesModalId('detail'))}">More</paper-button>
          </div>
        </paper-card>
        <paper-card heading="Emmental" image="http://placehold.it/350x150/FFC107/000000" alt="Emmental">
          <div class="card-content">
            Emmentaler or Emmental is a yellow, medium-hard cheese that originated in the area around Emmental, Switzerland. It is one of the cheeses of Switzerland, and is sometimes known as Swiss cheese.
          </div>
          <div class="card-actions">
            <paper-button raised >More</paper-button>
          </div>
        </paper-card>
        <paper-card heading="Emmental" image="http://placehold.it/350x150/FFC107/000000" alt="Emmental">
          <div class="card-content">
            Emmentaler or Emmental is a yellow, medium-hard cheese that originated in the area around Emmental, Switzerland. It is one of the cheeses of Switzerland, and is sometimes known as Swiss cheese.
          </div>
          <div class="card-actions">
            <paper-button>Share</paper-button>
            <paper-button>Explore</paper-button>
          </div>
        </paper-card>

        <!-- define card dialogs -->

        <div class$="${this._hide(this._servicesModalId !== 'detail')}" >
          <h2>detail content goes here...</hw>
        </div>
        <div class$="${this._hide(this._servicesModalId !== 'paint')}" >
          <h2>paint content goes here...</hw>
        </div>
      </div>
   
    `;
  }

  static get properties() { return {
    _servicesModalId: {type: String}
  }}

  _stateChanged(state) {
    this._servicesModalId = state.app.servicesModalId;
  }

  
  _hide(yes) {
    if ( yes ) {
      return "hide";
    }
    return ""
  }

}

window.customElements.define('services-view', ServicesView);
