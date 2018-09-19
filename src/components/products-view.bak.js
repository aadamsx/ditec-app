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
import { PageViewElement } from './page-view-element.js';
import { repeat } from 'lit-html/lib/repeat.js';
import { SharedStyles } from './shared-styles.js';
import { ButtonSharedStyles } from './button-shared-styles.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import './shop-image.js';

// This element is connected to the redux store.
import { store } from '../store.js';


class ProductsView extends connect(store)(PageViewElement) {
  _render({ _categories }) {
    return html`
      ${SharedStyles}
      ${ButtonSharedStyles}
      <style>
        /* Add more specificity (.checkout) to workaround an issue in lit-element:
           https://github.com/PolymerLabs/lit-element/issues/34 */
        button.checkout {
          border: 2px solid var(--app-dark-text-color);
          border-radius: 3px;
          padding: 8px 16px;
        }
        button.checkout:hover {
          border-color: var(--app-primary-color);
          color: var(--app-primary-color);
        }
        
        .image-link {
          outline: none;
        }

        .item {
          display: inline-block;
          width: 50%;
          text-decoration: none;
          text-align: center;
        }

        .item:nth-of-type(5) {
          display: block;
          width: 100%;
        }

        .item a {
          text-decoration: none;
        }

        /* Wide layout: when the viewport width is bigger than 600px, layout
        changes to a wide layout. */
        @media (min-width: 1040px) {
          .item h4 {
            font-size: 24px;
          }
        }
  
        /* narrow layout: when the viewport width is smaller than 600px, layout
        changes to a wide layout. */
        @media (max-width: 1039px) {
          .item h4 {
            font-size: 2.4vw;
          }
          shop-image {
            z-index: -1;
          }
        }
  
        shop-image {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

      </style>

      <section>
        <!-- <h2>Ditec Marine Products</h2> -->
        
        ${repeat(Object.keys(_categories), key => {
            const category = _categories[key];
            return html`<div class="item">
              <a class="image-link" href="/list/${category.name}">

                <shop-image
                  alt="${category.title}"
                  src="${category.image}"
                  placeholder="${category.placeholder}">
                </shop-image>
                
                <h4>${category.title}</h4>

              </a>
            </div>`;
          })}
      </section>
    `;
  }

  static get properties() { return {
    // This is the data from the store.
    _categories: Object
  }}


  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._categories = state.categories;
  }
}

window.customElements.define('products-view', ProductsView);
