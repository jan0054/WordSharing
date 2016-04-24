import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

export default createReducers({
  results: {
    retrieve: (state, action) => action.payload
  }
}, defaultState.editor);
