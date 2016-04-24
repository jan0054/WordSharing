// Web App Configs
// ===============
//
// This file defines the configs of the web app.
//
// Export Module
// -------------
//
// This module contains the configs of the web app.

export default {
  defaultState: {
    UI: {
      Login: {
        hasError: false
      },

      Dashboard: {
        showConferenceEditor: true,
        showPeopleEditor: true
      }
    },

    user: {
      isLoggedIn: false,
      data: {}
    },

    data: {
      people: [],
      conferences: [],
      tracks: [],
      locations: [],
      talks: [],
      venues: []
    },

    editor: {
      conference: {
        id: '',
        isSaved: false
      },
      tracks: [],
      locations: [],
      talks: [],
      venues: [],
      people: {
        isSaved: false
      }
    }
  },

  defaultFormValues: {
    Login: {
      email: '',
      password: ''
    },

    ConferenceEditor: {
      name: '',
      organizer: '',
      _startDate: '',
      _startTime: '',
      _endDate: '',
      _endTime: '',
      _parentEventId: '',
      content: ''
    },

    TrackEditor: {
      _trackName: '',
      _startDate: '',
      _endDate: '',
      _locationName: '',
      capacity: 0
    },

    TalkEditor: {
      name: '',
      _authorId: '',
      _date: '',
      _startTime: '',
      _endTime: '',
      content: ''
    },

    VenueEditor: {
      name: '',
      address: '',
      phone: '',
      url: '',
      content: ''
    },

    PeopleEditor: {
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      title: '',
      institute: ''
    }
  }
};
