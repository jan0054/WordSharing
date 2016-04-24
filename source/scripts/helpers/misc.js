// Misc Helpers
// ============
//
// This file defines misc helpers.
//
// Import Modules
// --------------
//
// ### NPM Modules

import {keys} from 'bound-native-methods/object';

// Export Module
// -------------
//
// This module contains the following helpers.

export default {
  reduceToObject (transformer, initialObject = {}) {
    return this::keys().reduce((object, key) => {
      object[key] = transformer(this[key], key);

      return object;
    }, initialObject);
  }
};
