import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

export default createReducers({
  people: {
    getPeople: (state, action) => action.payload
  },

  conferences: {
    getConferences: (state, action) => action.payload
  },

  tracks: {
    setupConferenceEditor: (state, action) => action.payload.tracks
  },

  talks: {
    setupConferenceEditor: (state, action) => action.payload.talks
  },

  locations: {
    setupConferenceEditor: (state, action) => action.payload.locations
  },

  venues: {
    setupConferenceEditor: (state, action) => action.payload.venues
  }
}, defaultState.data);
