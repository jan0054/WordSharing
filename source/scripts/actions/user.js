// User Actions
// ============
//
// This file defines user-related Redux actions.
//
// Import Modules
// --------------
//
// ### NPM Modules

import Parse from 'parse';

// ### Local Modules

import {createActions} from 'scripts/helpers';

// Export Module
// -------------
//
// This module contains the following Redux actions.

export default createActions(
  {
    login: async ({email, password}) => {
      try {
        return await Parse.User.logIn(email, password);
      } catch (error) {
        return error;
      }
    },

    logout: async () => {
      try {
        await Parse.User.logOut();
      } catch (error) {
        return error;
      }
    }
  }
);
