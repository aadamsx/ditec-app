/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';

import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';

import { menuIcon } from './my-icons.js';
import './snack-bar.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { installRouter } from 'pwa-helpers/router.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

import { store } from '../store.js';
import { currentCategorySelector } from '../reducers/categories.js';
import { metaSelector } from '../reducers/app.js';
import { updateLocation, updateNetworkStatus, updateDrawerState } from '../actions/app.js';

import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-menu-button/paper-menu-button.js';


import './home-view.js';

class DitecApp extends connect(store)(LitElement) {
  _render({
    _lazyResourcesLoaded,
    _modalOpened,
    _a11yLabel,
    _smallScreen,
    _page,
    _drawerOpened,
    _snackbarOpened,
    _offline}) {
    // Anything that's related to rendering should be done in here.
    return html`
    <style>
      :host {
        --app-drawer-width: 256px;
        display: block;

        --app-primary-color: #E91E63;
        --app-secondary-color: #293237;
        --app-dark-text-color: var(--app-secondary-color);
        --app-light-text-color: white;
        --app-section-even-color: transparent;
        --app-section-odd-color: transparent;

        --app-header-background-color: transparent;
        --app-header-text-color: var(--app-dark-text-color);
        --app-header-selected-color: var(--app-primary-color);

        --app-drawer-background-color: var(--app-secondary-color);
        --app-drawer-text-color: var(--app-light-text-color);
        --app-drawer-selected-color: #78909C;
      }

      app-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color);
        border-bottom: 1px solid #eee;
      }

      .toolbar-top {
        font-size: 18px;
        background-color: var(--app-header-background-color);
        padding-top: 1em;
        justify-content: center;
      }

      [main-title] {
        font-family: 'Pacifico';
        text-transform: lowercase;
        font-size: 30px;
        /* In the narrow layout, the toolbar is offset by the width of the
        drawer button, and the text looks not centered. Add a padding to
        match that button */
        padding-right: 44px;
      }

      .toolbar-list {
        display: none;
      }

      .toolbar-list > a {
        display: inline-block;
        color: var(--app-header-text-color);
        text-decoration: none;
        line-height: 30px;
        padding: 4px 24px;
      }

      .toolbar-list > a[selected] {
        color: var(--app-header-selected-color);
        border-bottom: 4px solid var(--app-header-selected-color);
      }

      .menu-btn {
        background: none;
        border: none;
        fill: var(--app-header-text-color);
        cursor: pointer;
        height: 44px;
        width: 44px;
      }

      shop-cart-button {
        display: block;
        width: 40px;
      }

      shop-cart-modal {
        z-index: 2;
      }

      .announcer {
        position: fixed;
        height: 0;
        overflow: hidden;
      }

      app-drawer {
        z-index: 3;
      }

      .drawer-list {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 24px;
        background: var(--app-drawer-background-color);
        position: relative;
      }

      .drawer-list > a {
        display: block;
        text-decoration: none;
        color: var(--app-drawer-text-color);
        line-height: 40px;
        padding: 0 24px;
      }

      .drawer-list > a[selected] {
        color: var(--app-drawer-selected-color);
      }

      .page {
        display: none;
      }

      .page[active] {
        display: block;
      }

      footer {
        padding: 24px;
        background: var(--app-drawer-background-color);
        color: var(--app-drawer-text-color);
        text-align: center;
      }

      /* Wide layout: when the viewport width is bigger than 768px, layout
      changes to a wide layout. */
      @media (min-width: 1040px) {
        .toolbar-list {
          display: block;
        }

        .menu-btn {
          display: none;
        }

        .main-content {
          padding-top: 117px;
          min-height: 100vh;
        }

        .DitecLogo {
          width: 275px;
        }

        .DitecLogo > img {
          margin: auto;
        }


        /* The drawer button isn't shown in the wide layout, so we don't
        need to offset the title */
        [main-title] {
          padding-right: 0px;
        }
      }

      /* Narrow layout: when the viewport width is more narrow than 1040px
       * layout changes to a narrow layout */
      @media (max-width: 1039px) {
        .main-content {
          padding-top: 72px;
        }
      }
    </style>

    <!-- Header -->
    <app-header condenses reveals effects="waterfall">
      <app-toolbar class="toolbar-top">
        <button class="menu-btn" title="Menu" on-click="${_ => store.dispatch(updateDrawerState(true))}">${menuIcon}</button>
          <div class="DitecLogo">
             <img src="../images/DitecMarine-logo-blk.svg">
          </div>
          <!-- This gets hidden on a small screen-->
          <nav class="toolbar-list">
            <a selected?="${_page === 'home'}" href="/home">Home</a>
            <a selected?="${_page === 'about'}" href="/about">About Us</a>
            <a selected?="${_page === 'products'}" href="products">Products</a>
            <a selected?="${_page === 'services'}" href="/services">Services</a>
            <a selected?="${_page === 'testimonials'}" href="/testimonials">Testimonials</a> 
            <a selected?="${_page === 'contact'}" href="/contact">Contact Us</a> 
          </nav>
          <!-- social links menu -->
          <paper-menu-button>
            <paper-icon-button src="../images/social-share.svg" slot="dropdown-trigger" ></paper-icon-button>
              <paper-listbox  slot="dropdown-content" >
                <paper-item>
                  <img src="../images/fb-logo.svg"></img>
                </paper-item>
                <paper-item>
                  <img src="../images/twitter-logo.svg"></img>
                </paper-item>
                <paper-item>
                  <img src="../images/in-logo.svg">
                </img></paper-item>
                <paper-item>
                  <img src="../images/rss-logo.svg"></img>
                </paper-item>
              </paper-listbox>
            </paper-menu-button>
          <!-- end off social links menu -->

        </app-toolbar>


    </app-header>

    <!-- Drawer content -->
    <app-drawer opened="${_drawerOpened}"
        on-opened-changed="${e => store.dispatch(updateDrawerState(e.target.opened))}">
      <nav class="drawer-list">
        <a selected?="${_page === 'home'}" href="/home">Home</a>
        <a selected?="${_page === 'about'}" href="/about">About Us</a>
        <a selected?="${_page === 'products'}" href="products">Products</a>
        <a selected?="${_page === 'services'}" href="/services">Services</a>
        <a selected?="${_page === 'testimonials'}" href="/testimonials">Testimonials</a>
        <a selected?="${_page === 'contact'}" href="/contact">Contact Us</a> 
      </nav>
    </app-drawer>

    <!-- Main content -->
    <main class="main-content">
      <home-view class="page" active?="${_page === 'home'}"></home-view>
      <about-view class="page" active?="${_page === 'about'}"></about-view>
      <services-view class="page" active?="${_page === 'services'}"></services-view>
      <products-view class="page" active?="${_page === 'products'}"></products-view>
      <testimonials-view class="page" active?="${_page === 'testimonials'}"></testimonials-view>
      <contact-view class="page" active?="${_page === 'contact'}"></contact-view>
      <shop-list class="page" active?="${_page === 'list'}"></shop-list>
      <shop-detail class="page" active?="${_page === 'detail'}"></shop-detail>
      <shop-cart class="page" active?="${_page === 'cart'}"></shop-cart>
      <shop-checkout class="page" active?="${_page === 'checkout'}"></shop-checkout>
      <my-view404 class="page" active?="${_page === 'view404'}"></my-view404>
    </main>

    <!-- <footer> -->
      <!-- <p>Powered by Cmartbooks™</p> -->
      <!-- </footer> -->

    <!-- a11y announcer -->
    <div class="announcer" aria-live="assertive">${_a11yLabel}</div>

    ${ _modalOpened ? html`<shop-cart-modal></shop-cart-modal>` : null }
    ${ _lazyResourcesLoaded ? html`
      <snack-bar class="${_snackbarOpened ? 'opened' : ''}">
        ${_offline ? 'You are offline' : 'You are online'}
      </snack-bar> 
      ` : null
      }
    `;
  }

  static get properties() {
    return {
      _lazyResourcesLoaded: Boolean,
      _modalOpened: Object,
      _a11yLabel: String,
      _smallScreen: Boolean,
      _page: String,
      _drawerOpened: Boolean,
      _snackbarOpened: Boolean,
      _offline: Boolean
    }
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
    setPassiveTouchGestures(true);
  }

  _firstRendered() {
    installRouter((location) => this._updateLocation(location));
    installOfflineWatcher((offline) => store.dispatch(updateNetworkStatus(offline)));
    installMediaQueryWatcher('(min-width: 1040px)', (matches) => this._smallScreen = matches);

    // custom elements polyfill safe way to indicate an element has been upgraded
    this.removeAttribute('unresolved');
  }

  _didRender(props, changed, oldProps) {
    if ('_meta' in changed) {
      const meta = changed._page;
      updateMetadata({
          title: pageTitle,
          description: pageTitle
          // This object also takes an image property, that points to an img src.
      });
    }
  }

  _stateChanged(state) {
    const category = currentCategorySelector(state);
    this._page = state.app.page;
    this._meta = metaSelector(state);
    this._modalOpened = state.app.cartModalOpened;
    this._a11yLabel = state.app.announcerLabel;
    this.lazyResourcesLoaded = state.app.lazyResourcesLoaded;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened;
    this._drawerOpened = state.app.drawerOpened;
  }

  _updateLocation(location) { store.dispatch(updateLocation(location));
    // close the drawer - in case the route came from a link in the drawer
    this._drawerOpened = false;
  }


}


window.customElements.define('ditec-app', DitecApp);
