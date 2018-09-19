/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { LitElement, html } from '@polymer/lit-element';
import { SharedStyles } from './shared-styles.js';
import './shop-image.js';

class ShopListItem extends LitElement {
	_render({ item = {} }) {
		return html`

    <style>
      ${SharedStyles}
      :host {
        display: flex;
        flex-direction: column;
        text-align: center;
        margin: 0 48px;
      }

      shop-image {
        margin: 32px 0 16px;
      }

      shop-image::before {
        content: "";
        display: block;
        padding-top: 100%;
      }

      .title {
        color: var(--app-text-dark-color);
      }

      .price {
        color: var(--app-secondary-color);
      }

      @media (max-width: 1039px) {
        :host {
          margin: 0 12px;
        }
        shop-image {
          z-index: -1;
        }
      }

    </style>

    <shop-image src="${item.image}" alt="${item.title}"></shop-image>
    <div class="title">${item.title}</div>
    <span class="price">${item.sizes ? `$${( item.sizes[0].price /100 ).toFixed(2)}` : null}</span>
    `;
  }

  static get properties() { return {
    
    item: Object

  }}

}

customElements.define('shop-list-item', ShopListItem);

