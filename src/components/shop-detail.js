/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PageViewElement } from './page-view-element.js';
import { html } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat.js';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import { shopButtonStyle } from './shop-button-style.js';
import { shopCommonStyle } from './shop-common-style.js';
import { shopSelectStyle } from './shop-select-style.js';
import './shop-image.js';

import { store } from '../store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { currentCategorySelector, currentItemSelector } from '../reducers/categories.js';
import { addToCart } from '../actions/cart.js';
import { updateItemPriceFromSize, updateItemQuantity } from '../actions/categories.js';
import { updateAttributeForSelected } from '../actions/app.js';

class ShopDetail extends connect(store)(PageViewElement) {
  _render({ _failure, _item, _price, _attributeForSelected  }) {
    return html`
    ${shopButtonStyle}
    ${shopCommonStyle}
    ${shopSelectStyle}
    <style>

      :host {
        display: block;
      }

      #content {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

      #content p {
        white-space: pre-line;
        text-align: justify;
      }

      shop-image {
        position: relative;
        margin: 64px 32px;
        width: 50%;
        max-width: 1039px;
      }

      shop-image::before {
        content: "";
        display: block;
        padding-top: 100%;
      }

      .detail {
        margin: 64px 32px;
        width: 50%;
        max-width: 600px;
        transition: opacity 0.4s;
        opacity: 0;
      }

      .detail[has-content] {
        opacity: 1;
      }

      h1 {
        font-size: 24px;
        font-weight: 500;
        line-height: 28px;
        margin: 0;
      }

      .price {
        margin: 16px 0 40px;
        font-size: 16px;
        color: var(--app-secondary-color);
      }

      .description {
        margin: 32px 0;
      }

      .description > h2 {
        margin: 16px 0;
        font-size: 13px;
      }

      .description > p {
        margin: 0;
        color: var(--app-secondary-color);
      }

      .pickers {
        display: flex;
        flex-direction: column;
        border-top: 1px solid #ccc;
      }

      /* Add more specificity (.pickers) to workaround an issue in lit-element:
         https://github.com/PolymerLabs/lit-element/issues/34 */
      .pickers > shop-select > select {
        font-size: 16px;
        padding: 16px 24px 16px 70px;
      }

      paper-tabs {
        margin-top: 3em;
        background-color: #eeeeee;
        --paper-tabs-selection-bar-color: #d32f2f;
      }

      paper-tab {
        --paper-tab-ink: #d32f2f;
      }

      @media (max-width: 1039px) {

        #content {
          flex-direction: column;
          align-items: center;
        }

        shop-image {
          margin: 0;
          width: 80%;
          z-index: -1;
        }

        shop-button {
          background-color: red;
        }

        .detail {
          box-sizing: border-box;
          margin: 32px 0;
          padding: 0 24px;
          width: 100%;
          max-width: 1039px;
        }

        h1 {
          font-size: 20px;
          line-height: 24px;
        }

        .price {
          font-size: inherit;
          margin: 12px 0 32px;
        }

      }

    </style>

    <div id="content" hidden="${_failure || !_item}">
      <shop-image alt="${_item.title}" src="${_item.largeImage}"></shop-image>
      <div class="detail" has-content>
        <h1>${_item.title}</h1>
        <div id="priceId" class="price">${_price ? "$" + ( _price / 100 ).toFixed(2) : null}</div>
        <div class="pickers">
          <paper-dropdown-menu  label='Size' on-iron-select="${e => store.dispatch(updateItemPriceFromSize(e.detail.item.innerText))}">
            <paper-listbox slot="dropdown-content" selected="0">
              ${repeat(_item.sizes, kvp => html`
                <paper-item>${kvp.size}</paper-item>
              `)}
          </paper-listbox>
        </paper-dropdown-menu>
        <paper-dropdown-menu label="Quantity" on-iron-select="${ e => store.dispatch(updateItemQuantity(e.detail.item.innerText))}" >
          <paper-listbox  slot="dropdown-content" selected="0">
            ${repeat([1,2,3,4,5], qty => html`
                <paper-item>${qty}</paper-item>
              `)}
        </paper-listbox>
      </paper-dropdown-menu>
        </div>
        <div class="description">
          <h2>Description</h2>
          <p>${ _item ? unsafeHTML(this._unescapeText(_item.description)) : null }</p>
        </div>
        <shop-button responsive>
          <button on-click="${() => this._addToCart()}" aria-label="Add this item to cart">Add to Cart</button>
        </shop-button>
        <paper-tabs attr-for-selected="name" selected="costPerformance" scrollable on-iron-select="${ e => store.dispatch(updateAttributeForSelected(e.detail.item.getAttribute('name')))}">
          <paper-tab name="costPerformance">Cost&#x2F;Performance</paper-tab>
          <paper-tab name="packagingHandling">Packaging and Handling</paper-tab>
          <paper-tab name="useApplication" >Use&#x2F;Application</paper-tab>
          <paper-tab name="suggestedDilutionDirections" >Suggested Dilution Directions</paper-tab>
          <paper-tab name="environment" >Environment</paper-tab>
          <paper-tab name="productSpecification" >Product Specifications</paper-tab>
        </paper-tabs>
          <div hidden="${_attributeForSelected !== 'costPerformance'}">
            <ul>
              ${repeat(_item.costPerformance, item => html`
                <li>${item}</li>
              `)}
            </ul>
          </div>
          <div hidden="${_attributeForSelected !== 'packagingHandling'}">
            <p>
              ${this._scrub(_item.packagingHandling)}
            </p>
          </div>
          <div hidden="${_attributeForSelected !== 'useApplication'}">
            <ul>
              ${repeat(_item.useApplication, item => html`
                <li>${item}</li>
              `)}
            </ul>
          </div>
          <div hidden="${_attributeForSelected !== 'suggestedDilutionDirections'}">
            <p>
              ${this._scrub(_item.suggestedDilutionDirections)}
            </p>
          </div>
          <div hidden="${_attributeForSelected !== 'environment'}">
            <ul>
              ${repeat(_item.environment, item => html`
                <li>${item}</li>
              `)}
            </ul>
          </div>
          <div hidden="${_attributeForSelected !== 'productSpecification'}">
            <p>
              ${this._scrub(_item.productSpecification)}
            </p>
          </div>
            
      </div>
    </div>

    <!--
      shop-network-warning shows a warning message when the items can't be rendered due
      to network conditions.
    -->
    <shop-network-warning hidden="${!_failure}"></shop-network-warning>
    `;

  }

  static get properties() { return {

    _item: Object,

    _failure: Boolean,

    _price: Number,

    _attributeForSelected: String



  }}


  _stateChanged(state) {
    const category = currentCategorySelector(state);
    this._item = currentItemSelector(state) || {};
    this._failure = category && category.failure;
    this._price = this._item.price;
    this._attributeForSelected = state.app.attributeForSelected;
  }

  _unescapeText(text) {
    // The item description contains escaped HTML (e.g. "&lt;br&gt;"), so we need to
    // unescape it ("<br>") and set it as innerHTML.
    let elem = document.createElement('textarea');
    elem.innerHTML = text;
    return elem.textContent;
  }

  _addToCart() {
    store.dispatch(addToCart({
      item: this._item,
      quantity: this._item.qty,
      size: this._item.size
    }));
  }

  _isDefined(item) {
    return item != null;
  }
  
  _scrub(text) {
    if ( text != null && text != "") {
      return text.replace(/\\n/g, '\n');
    }
    return text;
  }

    

}

window.customElements.define('shop-detail', ShopDetail);
