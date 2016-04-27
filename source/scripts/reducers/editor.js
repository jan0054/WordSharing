import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

export default createReducers({
  mode: {
    changeMode: (state, action) => action.payload
  },

  results: {
    retrieve: (state, action) => action.payload
  }
}, defaultState.editor);
