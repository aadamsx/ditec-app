/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const REQUEST_CATEGORY_ITEMS = "REQUEST_CATEGORY_ITEMS";
export const RECEIVE_CATEGORY_ITEMS = "RECEIVE_CATEGORY_ITEMS";
export const FAIL_CATEGORY_ITEMS = "FAIL_CATEGORY_ITEMS";
export const UPDATE_CATEGORY_ITEM_PRICE = "UPDATE_CATEGORY_ITEM_PRICE";


export const fetchCategoriesIfNeeded = () => async (dispatch, getState) => {
  const categories = getState().categories;
  if (categories === undefined || !Object.keys(categories).length) {
    let _host = window.location.host
    _host = ( _host.startsWith("http") ? _host : `http://${_host}`)
    let response = await fetch(`${_host}/api/categories`);
    let initialCategories = await response.json();
    await dispatch({
      type: RECEIVE_CATEGORIES,
      categories: initialCategories
    });
  }
};

export const fetchCategoryItemsIfNeeded = (category) => async (dispatch, getState) => {
  let _categories = getState().categories;
  if ( !category && !category.name && category.items || category.isFetching ) {
    return
  }
  dispatch(requestCategoryItems(category.name));
  try {
    //let response = await fetch(`../data/${category.name}.json`);
    let _host = window.location.host
    _host = ( _host.startsWith("http") ? _host : `http://${_host}`)
    let response = await fetch(`${_host}/api/category/${category.name}`);
    let items = await response.json();
    await dispatch(receiveCategoryItems(category.name, items));
  } catch (error) {
    console.log(error);
  }
};

const requestCategoryItems = (categoryId) => {
  return {
    type: REQUEST_CATEGORY_ITEMS,
    categoryId
  };
};

const receiveCategoryItems = (categoryId, items) => {
  return {
    type: RECEIVE_CATEGORY_ITEMS,
    categoryId,
    items
  };
};

export const updateCategoryItemPrice = (categoryId, itemId, price) => {
  return {
    type: UPDATE_CATEGORY_ITEM_PRICE,
    categoryId,
    itemId,
    price
  };
};

const failCategoryItems = (categoryId) => {
  return {
    type: FAIL_CATEGORY_ITEMS,
    categoryId
  };
};
