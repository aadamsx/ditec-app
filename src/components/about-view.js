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

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

class AboutView extends PageViewElement {
  _render() {

    const { _hide } = this;

    return html`
      ${SharedStyles}
      <style>

        div#container {
          min-height: 100vh;
          padding-top: 3em;
          background: linear-gradient(
            rgba(0,0,0,0.5),
            rgba(0,0,0,0.5)
            ),
            url(../images/about-bkg.jpg);
          background-repeat: no-repeat;
          background-attachment: fixed;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
          
        }
        
        p:first-of-type {
          margin-top: 0;
        }
        
        .main-content {
          width: 65vw;
          margin-left: auto;
          margin-right: auto;
          margin-top: 3em;
          padding: 5%;
          font-size: 1.25em;
          background-color: rgba(255,255,255,0.85);
          border-top-left-radius: 40px;
          border-bottom-right-radius: 40px;
        }

        .center {
          text-align: center;
        }
        
        img#about1 {
          float: right;
          width: 20em;
        }
        
        paper-button {
          text-align: center;
        }

        paper-button img {
          clear: right;
          width: 2em;
        }

      </style>

        <div id="container">
          <div class="main-content">
            <img id="about1" alt="about us image" src="../images/about.1.jpg" />
            <p>
              DITEC Marine has spent the last 27 years in marine maintenance, surface refinishing, and surface preservation.  Our body of knowledge comes from extensively testing and using marine products firsthand and by way of feedback from our service teams which operate in south Florida, Europe, and the Middle East.  Most importantly, we have studied and addressed the unintended negative effects of cleaning chemicals and the environment on yacht paint, one of the most valuable "wear and tear" components of any yacht.
            </p>
            <div hidden?="${this._hide}">
              <p>
                Until recently, the inherent problem with the durability of marine paint preservation products has been chemistry.  Waxes, sealants, and acrylic polymers are all based on organic chemistry.  They are highly affected by UV degradation, acids, and alkali.  Unfortunately, every yacht exists in an environment that is rich in these performance reducing factors.  Current chemistry has evolved beyond these limitations.  DITEC Marine Ultra Preservation utilizes advances in inorganic chemistry to achieve unparalleled durability in all marine conditions.  Inorganic compounds do not readily react with UV, acids, or alkali.  Put simply, day to day yacht maintenance and environmental exposure will not readily degrade the protection of DITEC Ultra.  DITEC Marine Ultra does not contain Silicon Dioxide (SiO2) or Zirconium Silicate (ZrSiO4) and presents no problems with repainting.
              </p>
              <p>
                As a simple example, imagine a paper cup and a plastic cup placed outside for one year.  Only one cup will survive the exposure intact...the plastic cup, as it is an inorganic compound.  The paper cup, the organic compound, will have long since been degraded by the elements.  The primary chemical constituents of DITEC Ultra are precursors for rubber and plastic.  This is an important feature which creates durability and flexibility.  Flexibility is incredibly important, because the preservation system must be able to flex with the expansion and contraction of the paint substrate.
              </p>
              <p>
                DITEC Ultra is extremely durable, offering service intervals of 12 months; however, there is another equally important consideration...the service provider.  Our polishing teams are the best in the industry.  We have spent years analyzing various marine paint substrates.  We have identified their individual strengths and weaknesses and learned how to manage them effectively.  Our polishing process is unique and focuses on being non-invasive and cautious. We achieve results that others cannot.
              </p>
              <p>
                DITEC Marine has also developed a complete line of deck maintenance product line, another unique aspect of our program.  Our products all meet or exceed MARPOL Annex V compliance requirements.  If your yacht is in Montenegro, Turkey, Monaco or Palm Beach, all our products can be processed through a yacht's grey water system, rinsed overboard or through the drain scuppers into the sea.
              </p>
              <div class="center" hidden?="${this._hide}">
                <paper-button on-tap="${()=>this._toggleHide()}">
                  <img src="../images/less.svg" />
                </paper-button>
              </div>
            </div>
            <div class="center" hidden?="${!this._hide}">
              <paper-button on-tap="${()=>this._toggleHide()}">
                <img src="../images/more.svg" />
              </paper-button>
            </div>
          </div>
        </div>
    `;
  }
  
  constructor() {
    super();
    this._hide = true;
  }
  
  static get properties() { return {

    _hide: {type: Boolean}

  }}
  
  _toggleHide() {
    this._hide = !this._hide;
  }


}

window.customElements.define('about-view', AboutView);
