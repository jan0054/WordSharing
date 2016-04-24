import Parse from 'parse';

import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

export default createReducers({
  Login: {
    login: ({hasError, ...rest}, action) => ({
      hasError: action.payload instanceof Parse.Error,
      ...rest
    })
  },

  Dashboard: {
    unmountConferenceEditor: ({showConferenceEditor, ...rest}, action) => ({
      showConferenceEditor: false,
      ...rest
    }),

    mountConferenceEditor: ({showConferenceEditor, ...rest}, action) => ({
      showConferenceEditor: true,
      ...rest
    }),

    unmountPeopleEditor: ({showPeopleEditor, ...rest}, action) => ({
      showPeopleEditor: false,
      ...rest
    }),

    mountPeopleEditor: ({showPeopleEditor, ...rest}, action) => ({
      showPeopleEditor: true,
      ...rest
    })
  }
}, defaultState.UI);
