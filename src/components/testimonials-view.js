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

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button-light.js';
import '@polymer/iron-pages/iron-pages.js';

class TestimonialsView extends PageViewElement {
  _render() {
    const { _index } = this;

    return html`
      ${SharedStyles}
      <style>
        
        div#hero {
          background: url(../images/testimonials-bkg.jpg) no-repeat center center fixed;
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
          position: fixed;
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
          top: -10px;
          bottom: -10px;
          left: -10px;
          right: -10px;
          background: rgba(0,0,0,0.5);
          z-index: -3;
        }

        iron-pages {
          flex-basis: 80%;
        }

        iron-pages > div {
          background-color: white;
        }

        div#previous-container {
          flex-basis: 10%;
          background: transparent;
          float: right;
          padding-right: 20px;
        }
      
        div#next-container {
          background: transparent;
          flex-basis: 10%;
          padding-left: 20px;
        }

        div#previous-container > button {
          float: right;
        }

        paper-button-light, button {
          background: transparent;
          border: 0;
        }

        button:active, button:focus {
          outline: 0;
          border: none;
        }



      </style>

      <div id="hero"></div>
      <div id="overlay"></div>
      <div id="container">
        <div id="previous-container">
          <paper-button-light on-click="${()=>this._previous()}">
            <button title="previous">
              <img src="../images/previous.svg" alt="<" />
            </button>
          </paper-button-light>
        </div>
        <iron-pages id="carousel" selected="0">
          <div>Page 0</div>
          <div>Page 1</div>
          <div>Page 2</div>
          <div>Page 3</div>
        </iron-pages>
        <div id="next-container">
          <paper-button-light on-click="${()=>this._next()}">
            <button title="next">
              <img src="../images/next.svg" alt=">" />
            </button>
          </paper-button-light>
        </div>
      </div>



    `;
  }

  constructor() {
    super();
    this._index = 0;
  }

  static get properties() { return {

    _index: { type: Number }

  }}

  _increment() {
    this._index++
    if (this._index > 4) {
      this._index = 0
    }
  }

  _next() {
    const carousel = this.shadowRoot.querySelector('#carousel');
    carousel.selectNext()
  }

  _previous() {
    const carousel = this.shadowRoot.querySelector('#carousel');
    carousel.selectPrevious()
  }


}

window.customElements.define('testimonials-view', TestimonialsView);
