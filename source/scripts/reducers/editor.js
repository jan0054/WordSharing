import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

export default createReducers({
  conference: {
    setupConferenceEditor: (state, action) => ({
      id: action.payload.conference.id,
      isSaved: false
    }),

    saveConference: (state, action) => ({
      ...state,
      isSaved: true
    }),

    deleteConference: (state, action) => ({
      id: '',
      isSaved: false
    }),

    clearIsSaved: (state, action) => ({
      ...state,
      isSaved: false
    })
  },

  tracks: {
    setupConferenceEditor: (state, action) => action.payload.tracks.map(track => ({
      id: track.id,
      isSaved: false
    })),

    saveTrack: (state, action) => state.map(track =>
        track.id === action.payload.id
      ? {
        ...track,
        isSaved: true
      }
      : track
    ),

    clearIsSaved: (state, action) => action.payload.editor.tracks.map(track => ({
      id: track.id,
      isSaved: false
    }))
  },

  locations: {
    setupConferenceEditor: (state, action) => action.payload.locations.map(location => ({
      id: location.id,
      isSaved: false
    })),

    saveLocation: (state, action) => state.map(location =>
        location.id === action.payload.id
      ? {
        ...location,
        isSaved: true
      }
      : location
    ),

    clearIsSaved: (state, action) => action.payload.editor.locations.map(location => ({
      id: location.id,
      isSaved: false
    }))
  },

  talks: {
    setupConferenceEditor: (state, action) => action.payload.talks.map(talk => ({
      id: talk.id,
      isSaved: false
    })),

    saveTalk: (state, action) => state.map(talk =>
        talk.id === action.payload.id
      ? {
        ...talk,
        isSaved: true
      }
      : talk
    ),

    clearIsSaved: (state, action) => action.payload.editor.talks.map(talk => ({
      id: talk.id,
      isSaved: false
    }))
  },

  venues: {
    setupConferenceEditor: (state, action) => action.payload.venues.map(venue => ({
      id: venue.id,
      isSaved: false
    })),

    saveVenue: (state, action) => state.map(venue =>
        venue.id === action.payload.id
      ? {
        ...venue,
        isSaved: true
      }
      : venue
    ),

    clearIsSaved: (state, action) => action.payload.editor.venues.map(venue => ({
      id: venue.id,
      isSaved: false
    }))
  },

  people: {
    setupConferenceEditor: (state, action) => ({
      isSaved: false
    }),

    saveAttendee: (state, action) => ({
      isSaved: true
    }),

    clearIsSaved: (state, action) => ({
      isSaved: false
    })
  }
}, defaultState.editor);
