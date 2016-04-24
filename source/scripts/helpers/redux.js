// Redux Helpers
// =============
//
// This file defines Redux-related helpers.
//
// Import Modules
// --------------
//
// ### NPM Modules

import {createAction} from 'redux-actions';

// ### Local Modules

import {reduceToObject} from 'scripts/helpers/misc';
import {is} from 'scripts/helpers/method-virtualizer';

// Export Module
// -------------
//
// This module contains the following helpers.

export default {

  // > `createActions` : Function

  createActions (...actionDefinitions) {
    return actionDefinitions.reduce((actions, actionDefinition) => {
      if (actionDefinition::is.object()) {
        actions = actionDefinition::reduceToObject((payloadCreator, actionName) => createAction(actionName, payloadCreator), actions);
      } else if (actionDefinition::is.string()) {
        actions[actionDefinition] = createAction(actionDefinition);
      }

      return actions;
    }, {});
  },

  // > `createReducers` : Function

  createReducers (schema, defaultState) {
    return schema::reduceToObject((transitions, stateName) =>
      (state = defaultState[stateName], action) =>
        transitions.hasOwnProperty(action.type) ? transitions[action.type](state, action) : state
    );
  }
};
