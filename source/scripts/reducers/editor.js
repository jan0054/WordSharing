import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

export default createReducers({
  mode: {
    changeMode: (state, action) => action.payload
  },

  results: {
    retrieve: (state, action) => action.payload
  },

  status: {
    share: (state, action) => 'shared',

    retrieve: (state, action) => action.payload.length ? 'retrieved' : 'not found',

    clearStatus: (state, action) => ''
  }
}, defaultState.editor);
