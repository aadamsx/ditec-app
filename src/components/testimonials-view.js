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
import '@polymer/paper-dialog/paper-dialog.js';

class TestimonialsView extends PageViewElement {
  _render() {
    const { _index } = this;
    return html`
      ${SharedStyles}
      <style>
        
        h1 {
          color: white;
          font-size: 4vw;
          line-height: 90%;
          padding: 7vw;
        }

      </style>

      <div >
        <h3>local state example</h3>
        <p>you clicked ${this._index} times</p>
        <paper-button raised on-click=${()=> this._increment()}>Click Me!</paper-button>
      </div>

      <div>
        press "paint" button to fire modal?
        <paper-button raised on-click="${()=>this._paintDialog()}">Paint</paper-button>
      </div>



        <paper-dialog id="paint" modal>
          <p>ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <div class="buttons">
            <paper-button dialog-confirm autofocus>Tap me to close</paper-button>
          </div>
        </paper-dialog>
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

  _paintDialog() {
    const dialog = this.shadowRoot.querySelector('#paint');
    console.log(`at _paintModal with dialog`);
    dialog.open();
  }

}

window.customElements.define('testimonials-view', TestimonialsView);
