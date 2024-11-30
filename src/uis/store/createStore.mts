/**
 * *****************************************************************************
 * 
 * Store creater
 *
 * *****************************************************************************
 */

import { Store } from "./Store.mts";
import { combineReducers } from "./combineReducers.mts";
import * as M from "./middlewares/index.mts";
import * as reducers from "../reducers/index.mts";

export function createStore (state) {

  const store = new Store(state);
  store.currentReducer = combineReducers(reducers);

  store.middlewares = [
    M.crashReporter,
    M.thunk,
    M.promise,
    M.timeoutScheduler,
    M.normalization,
    process.env.NODE_ENV === "development" && M.logger,
  ].filter(Boolean).map(fn => fn(store));

  return store.init();
}
