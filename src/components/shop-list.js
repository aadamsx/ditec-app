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
import { SharedStyles } from './shared-styles.js';
import { repeat } from 'lit-html/lib/repeat.js';
import './shop-image.js';
import './shop-list-item.js';

import { store } from '../store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { currentCategorySelector } from '../reducers/categories.js';

class ShopList extends connect(store)(PageViewElement) {
  _render({ _category = {}, _failure }) {
    return html`
      ${SharedStyles}
      <style>

        .hero-image {
          position: relative;
          height: 320px;
          overflow: hidden;
          margin-bottom: 32px;
        }

        .grid {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          margin: 0 10px 32px 10px;
          padding: 0;
          list-style: none;
        }

        .grid li {
          -webkit-flex: 1 1;
          flex: 1 1;
          -webkit-flex-basis: 33%;
          flex-basis: 33%;
          max-width: 33%;
        }

        .grid a {
          display: block;
          text-decoration: none;
        }

        .container {
          margin-top: 1em;
          color: var(--app-text-dark-color);
          text-align: center;
        }

        .container h1 {
          margin-bottom: 0;
        }


        @media (max-width: 1039px) {
          .hero-image{
            display: none;
          }

          .grid li {
            -webkit-flex-basis: 50%;
            flex-basis: 50%;
            max-width: 50%;
          }

        }

      </style>

      <div class="container">

        <header>
          <h1>${_category.title}</h1>
          <span>${this._getPluralizedQuantity(_category.items)}</span>
        </header>

        <shop-image
          atl="${_category.title}"
          src="${_category.image}"
          placeholder="${_category.placeholder}" class="hero-image">
        </shop-image>

        ${ !_failure ? html`
          <ul class="grid">
            ${repeat(this._getListItems(_category.items), item => html`
              <li>
                <a href="/detail/${_category.name}/${item.name}">
                  <shop-list-item item="${item}"></shop-list-item>
                </a>
              </li>
            `)}
          </ul>` : html`
            <shop-network-warning></shop-network-warning>`
         }
       </div>
    `;
  }

  static get properties() { return {

    _category: Object,

    _failure: Boolean

  }}

  _stateChanged(state) {
    const category = currentCategorySelector(state);
    this._category = category;
    this._failure = category && category.failure;
  }

  _getListItems(items) {
    // reurn placeholder items whe the items have not yet loaded
    return items ? Object.keys(items).map(key => items[key]) : [{},{},{},{},{},{},{},{},{},{}];
  }

  _getPluralizedQuantity(items) {
    const quantity = items ? Object.keys(items).length : 0;
    if (!quantity) {
      return '';
    }
    let pluralizedQ = quantity === 1 ? 'item' : 'items';
    return `(${quantity} ${pluralizedQ})`;
  }

}


window.customElements.define('shop-list', ShopList);
