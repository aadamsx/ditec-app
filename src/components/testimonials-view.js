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
        
        div#container {
          min-height: 100vh;
          background: linear-gradient(
            rgba(0,0,0,0.5),
            rgba(0,0,0,0.5)
            ),
            url(../images/testimonials-bkg.jpg);
          background-repeat: no-repeat;
          background-attachment: fixed;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
          /* create a flex layout context */
          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;

          justify-content: center;
          align-items: center;
        }

        iron-pages {
          flex-basis: 80%;
        }

        iron-pages > div {
          padding: 2em 3em;
          background-color: rgba(255,255,255,0.85);
          background-image: url(../images/quotes.svg);
          background-repeat: no-repeat;
          background-position: top 2em center;
          min-height: 50vh;
          border-top-right-radius: 40px;
          border-bottom-left-radius: 40px;
        }

        iron-pages  p {
          margin-top: 5em;
          font-size: 1.5em;
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

        div#previous-container  button {
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

      <div id="container">
        <div id="previous-container">
            <paper-button-light on-click="${()=>this.shadowRoot.querySelector('#carousel').selectPrevious()}">
              <button title="previous">
                <img src="../images/previous.svg" alt="<" />
              </button>
            </paper-button-light>
          </div>
          <iron-pages id="carousel" selected="0">
            <div>
              <p>
                I wanted to reach out to and let you know how pleased I am with your team’s work on my Chaparral Signature 290 cruiser. The boat is a 2006 model; however, the gel-coat looks as good if not better than new thanks to your recent detail work. Your team spent a lot of time and put in the necessary effort to make her shine. I have had a similar detail done at a marina but am pleased to say your work is better. I noticed your team member looking very closely at all the “nooks and crannies” to make sure nothing was overlooked. Your team also washed everything down upon completion, including my dock. It’s nice to do business with a reputable company.<br />Robert Wainland, P.A.<br />Senior Investment Advisor
              </p>
            </div>
            <div>
              <p>
                I would highly recommend Debbie's Boat Cleaning Services to anyone in the Fort Lauderdale area in need of such services. I had a severe problem with my 47' sailing catamaran docked in Fort Lauderdale and on the market for sale. I thought the listing sales agent was checking on the boat on a regularly basis, as I live several thousand miles away, but he wasn't and as a result the interior of the boat became mildew and mold infested due excessive moisture and lack of attention.<br />I found Debbie/s Boat Cleaning with a Google search on Feb 17, 2016 and talked to her (Debbie) that day. She immediately went to the boat and assessed the situation and confirmed with pictures the mold and mildew situation. Within 24 hours she gave an estimate for her services, which was very competitive with other boat cleaning services I had contacted. I decided to use her services and she had people on the boat cleaning within a few days. Ten days after I agreed to use her services, the boat was clean and ready to be shown to potential buyers again. I'm sure anyone who reads this letter, Debbie can share the before and after pictures of the tremendous job she and her crew did in such a short period of time. I cannot thank Debbie enough for her professionalism in dealing with matter on a timely and completive basis.<br />CJ "Chuck" Abrams<br />Silverthorne, CO
              </p>
            </div>
            <div>
              <p>
                I would highly recommend Debbie's Boat Cleaning Services to anyone in the Fort Lauderdale area in need of such services. I had a severe problem with my 47' sailing catamaran docked in Fort Lauderdale and on the market for sale. I thought the listing sales agent was checking on the boat on a regularly basis, as I live several thousand miles away, but he wasn't and as a result the interior of the boat became mildew and mold infested due excessive moisture and lack of attention.<br />I found Debbie/s Boat Cleaning with a Google search on Feb 17, 2016 and talked to her (Debbie) that day. She immediately went to the boat and assessed the situation and confirmed with pictures the mold and mildew situation. Within 24 hours she gave an estimate for her services, which was very competitive with other boat cleaning services I had contacted. I decided to use her services and she had people on the boat cleaning within a few days. Ten days after I agreed to use her services, the boat was clean and ready to be shown to potential buyers again. I'm sure anyone who reads this letter, Debbie can share the before and after pictures of the tremendous job she and her crew did in such a short period of time. I cannot thank Debbie enough for her professionalism in dealing with matter on a timely and completive basis.<br />CJ "Chuck" Abrams<br />Silverthorne, CO
              </p>
            </div>
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
