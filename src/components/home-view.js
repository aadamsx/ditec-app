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
import './shop-image.js';

class HomeView extends PageViewElement {
  _render(props) {
    return html`
      ${SharedStyles}

      <style>

        h1, h2 {
          text-align: center;
        }

        div#container {
          overflow: hidden;
          min-width: 100vw;
          min-height: 100vh;
          background: url("../images/homepagebkg.jpg") no-repeat center center fixed;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        }
        
        div#caption-box {
          width: 45vw;
          height: 18vw;
          margin-top: 40%;
          margin-left: 5%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          
          background: rgba(0,0,0,0.6);
        }

        .caption {
          overflow: hidden;
          margin-top: 0;
          padding-top: 0;
          margin-bottom: 0;
          padding-bottom: 0;
        }
  
        h2 {
          font-weight: normal;
          color: white;
          font-size: 3.5vw;
          margin-top: 0;
          line-height: 92%;
          padding-top: 0;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        h1 { 
          font-weight: normal;
          margin-top: 0;
          line-height: 90%;
          padding-top: 0;
          margin-bottom: 0;
          padding-bottom: 0;
          color: white;
          font-size: 3.7vw;
        }


      </style>

      <div id="container">
        <div id="caption-box">
          <div class="caption">
            <h2>The World's Best Yacht<br />Preservation Systems.</h2>
          </div>
          <div class="caption">
            <h1>Period.</h1>
          </div>
      </div>
    `;
  }
}

window.customElements.define('home-view', HomeView);
