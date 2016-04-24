// Method Virtualizer
// ==================
//
// This file transforms third-party helpers that are incompatible with ES2015+ [bind operator](https://github.com/zenparsing/es-function-bind) into compatible formats.
//
// Import Modules
// --------------
//
// ### NPM Modules

import is from 'is';

// ### Local Modules

import {reduceToObject} from 'scripts/helpers/misc';

// Define Functions
// ----------------

function virtualizeMethods (target) {
  if (is.object(target)) {
    return target::reduceToObject(f => virtualizeMethods(f));
  } else if (is.fn(target)) {
    return function (...args) {
      return target(this, ...args);
    };
  }
}

// Export Module
// -------------
//
// This module contains the following virtualized third-party helpers.

export default {
  is: virtualizeMethods(is)
};
