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

    const { detailOpened, gelcoatOpened, teakOpened } = this;

    return html`
      ${SharedStyles}
      <style>

        div#container {
          min-height: 100vh;
          background: linear-gradient(
            rgba(0,0,0,0.5),
            rgba(0,0,0,0.5)
            ),
            url(../images/services-bkg.jpg);
          background-repeat: no-repeat;
          background-attachment: fixed;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
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
          align-items: flex-start;
          padding-top: 5em;
        }

        h1 {
          color: white;
          font-size: 4vw;
          line-height: 90%;
          padding: 7vw;
        }

        paper-card {
          width: 350px;
          margin-top: 20px;
        }

        div.header  {
          height: 230px;
        }

        div.card-actions {
          text-align: center;
        }


      </style>

        <div id="container">
          <paper-card  heading="Detail" image="../images/services-detailing.jpg" alt="Detail">
            <div class="card-content">
              Our Express service includes a complete wash and chamois hand dry of all exterior surfaces followed by an application of wax/cleaner wax using a variable speed power buffer on exterior fiberglass. 
            </div>
            <div class="card-actions">
              <paper-button raised on-click="${()=>this._toggleDetailOpened()}">More</paper-button>
            </div>
          </paper-card>
          <paper-card heading="Gelcoat" image="../images/services-gelcoat.jpg" alt="Gelcoat">
            <div class="card-content">
              <p>Gelcoat is by its nature a harder surface along with being generally thicker and longer lasting than its counterpart – marine paints. Gelcoat is the preferred coating for fiberglass boats by far and as such is the most prolific surface in the marine recreational industry.
              </p>
            </div>
            <div class="card-actions">
              <paper-button on-click="${()=>this._toggleGelcoatOpened()}" raised >More</paper-button>
            </div>
          </paper-card>
          <paper-card heading="Teak Care" image="../images/services-teak.jpg" alt="Teak">
            <div class="card-content">
              Teak and boats have been going together for the last 2000 years and as the demand for more teak has been ever increasing in the marine industry there is an urgent need for products to safely clean, preserve and maintain the finish of the teak; along with people skilled on how to properly use the products.
            </div>
            <div class="card-actions">
              <paper-button raised on-click="${()=>this._toggleTeakOpened()}">More</paper-button>
            </div>
          </paper-card>

          <!-- define card dialogs -->
          <paper-dialog opened?="${this.detailOpened}" modal>
            <p>Our Express service includes a complete wash and chamois hand dry of all exterior surfaces followed by an application of wax/cleaner wax using a variable speed power buffer on exterior fiberglass.<br /><br /> Premium Service Detailing - Our Premium Service Detailing includes a complete wash and chamois hand dry of all exterior surfaces including vinyl, metal, non-skid, and windows followed by an application of wax/cleaner wax using a high speed power buffer on all fiberglass PLUS non-skid deck treatment, compartment cleaning, helm cleaning/waxing, UV vinyl treatment, metal shine dressing and rub rail restorer.
            </p>
            <div class="buttons">
              <paper-button on-click="${()=>this._toggleDetailOpened()}" autofocus>Tap me to close</paper-button>
            </div>
          </paper-dialog>
          <paper-dialog opened?="${this.gelcoatOpened}" modal>
            <p>While its longevity and benefits have been well established there have been some setbacks with gelcoat especially colored gelcoat. With the advancements in shine and color formulations so along with it other problems have popped up, such as UV discoloration and premature fading. Another problem is the random “yellowing” of gelcoat, especially gelcoat exposed to the sun, this type of problem is often confused with bad paint patches. Also there is a third problem and that is the porous nature of some gel coats, giving rise to the difficulty of keeping a shine on the surface and having most waxes, polishes and even cleaners soak into the surface and leaving it looking blotchy.</p>
            <p>Gelcoat benefits greatly from proper care but knowing what products to use and how to use them can be confusing, laborious and daunting given the amount of products on the market today. However, not caring for the surface will lead to oxidation, deterioration and if left long enough- eventual failure of the gelcoat itself; allowing water to permeate into the fiberglass and causing blisters and eventually delamination.</p>
            <p>Yacht Surface Restoration’s knowledgeable crew know how to take care of these problems. We lead the industry in cutting edge techniques and technology and provide solutions custom tailored for our customers needs. Our existing processes provide the best swirl free finishes obtainable with outstanding clarity and our sealants are the longest lasting in the industry. The products we use will never damage the surface and are the best, most innovative on the market today. All this to provide the best looking finish while adding years to the life of the gelcoat.</p>
            <div class="buttons">
              <paper-button on-click="${()=>this._toggleGelcoatOpened()}" autofocus>Tap me to close</paper-button>
            </div>
          </paper-dialog>
          <paper-dialog opened?="${this.teakOpened}" modal>
            <p>One-part cleaners come in a single bottle and use a mild chemical to clean the wood. We prefer one-part cleaners because they are much gentler on the teak wood and won't damage your boat gelcoat or paint. Because they are relatively mild, you need to work the cleaner into the wood. For teak wood that is in good condition, you may use a bristle brush or bronze wool. Do not use a brass brush. Using a brass brush will eat out the soft part of the wood and may produce a condition known as raised grain. For weathered wood, use coarse bronze wool to work the cleaner into the wood. Keep the wood wet for 5-10 minutes before rinsing. Rinse the wood with clean water and use bronze wool to rub the surface in the direction of the wood grain. This opens up the pores of the wood to remove all of the cleaner ensure that the wood is as clean as possible.</p>
            <p>Two-part cleaners come in two bottles and typically consist of a harsh acid and a neutralizer. The first part (the acid) chemically cleans the wood, killing the mold and mildew spores and removing the black and gray color. This step works faster and requires less work than for one-part cleaners, but the harsh acid also raises the wood grain (making your wood rougher) and can eat away your gelcoat and bottom paint. The second part is a neutralizer which counteracts the acid, allowing you to rinse off the teak safely. We generally discourage the use of two-part cleaners because of the damage they can do to your teak, your boat and the environment.</p>
            <div class="buttons">
              <paper-button on-click="${()=>this._toggleTeakOpened()}" autofocus>Tap me to close</paper-button>
            </div>
          </paper-dialog>
      </div>
   
    `;
  }

  constructor() {
    super();
    this.detailOpened = false;
    this.gelcoatOpened = false;
    this.teakOpened = false;
  }

  static get properties() { return {

    detailOpened: { type: Boolean },

    gelcoatOpened: { type: Boolean },
    
    teakOpened: { type: Boolean }

  }}

  _toggleDetailOpened() {
    this.detailOpened = !this.detailOpened;
  }

  _toggleGelcoatOpened() {
    this.gelcoatOpened = !this.gelcoatOpened;
  }

  _toggleTeakOpened() {
    this.teakOpened = !this.teakOpened;
  }


}

window.customElements.define('services-view', ServicesView);
