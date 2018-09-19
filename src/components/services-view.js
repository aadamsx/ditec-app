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

class ServicesView extends PageViewElement {
  _render(props) {
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

      </style>

      <div id="container">
        <img src="../images/timer.svg"></img>
        <h1>Sorry, we're doing some work on this site. Will be back soon!</h1>
      </div>
    `;
  }
}

window.customElements.define('services-view', ServicesView);
