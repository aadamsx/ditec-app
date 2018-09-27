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
import '@polymer/paper-dialog/paper-dialog.js';


class ServicesView extends PageViewElement {
  
  _render() {

    return html`
      ${SharedStyles}
      <style>

        div#_viewport {
          position: relative;
        }

        div#hero {
          background: url(../images/services-bkg.jpg) no-repeat center center fixed;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
          z-index: -5;
        }

        div#hero, div#container {
          overflow: hidden;
          min-width: 100vw;
          min-height: 100vh;
          position: absolute;
          width: 100%;
          height: 100%;
        }

        div#container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        div#overlay {
          position: absolute;
          top: 0px;
          bottom: -10px;
          left: -10px;
          right: -10px;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          z-index: -3;
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

      <div id="_viewport">
        <div id="hero"></div>
        <div id="overlay"></div>
        <div class="flex-container">
          <paper-card  heading="Detail" image="http://placehold.it/350x150/FFC107/000000" alt="Emmental">
            <div class="card-content">
              Our Express service includes a complete wash and chamois hand dry of all exterior surfaces followed by an application of wax/cleaner wax using a variable speed power buffer on exterior fiberglass. 
            </div>
            <div class="card-actions">
              <paper-button raised on-click="${()=>this._openDetail()}">More</paper-button>
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
          <paper-dialog id="detail" modal>
            <p>Our Express service includes a complete wash and chamois hand dry of all exterior surfaces followed by an application of wax/cleaner wax using a variable speed power buffer on exterior fiberglass.<br /><br /> Premium Service Detailing - Our Premium Service Detailing includes a complete wash and chamois hand dry of all exterior surfaces including vinyl, metal, non-skid, and windows followed by an application of wax/cleaner wax using a high speed power buffer on all fiberglass PLUS non-skid deck treatment, compartment cleaning, helm cleaning/waxing, UV vinyl treatment, metal shine dressing and rub rail restorer.
            </p>
            <div class="buttons">
              <paper-button dialog-confirm autofocus>Tap me to close</paper-button>
            </div>
          </paper-dialog>

        </div>
      </div>
   
    `;
  }


  _openDetail() {
    const detailDialog = this.shadowRoot.querySelector('#detail');
    detailDialog.open();
  }

  _openPaint() {
    const paintDialog = this.shadowRoot.querySelector('#paint');
    paintDialog.open();
  }




  

}

window.customElements.define('services-view', ServicesView);
