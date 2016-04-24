// Form Reducer
// ============
//
// This file defines form-related Redux reducers ***to be plugged into [Redux Form](https://github.com/erikras/redux-form)***.
//
// Import Modules
// --------------
//
// ### Local Modules

import {createReducers} from 'scripts/helpers';

// Export Module
// -------------
//
// Do ***not*** provide `defaultState` because the web app's forms are administered by Redux Form.

export default createReducers({
  ConferenceEditor: {
    clearConferenceEditor: (state, action) => ({
      ...state,
      name: {},
      organizer: {},
      _startDate: {},
      _startTime: {},
      _endDate: {},
      _endTime: {},
      _parentEventId: {},
      content: {}
    })
  }
});
