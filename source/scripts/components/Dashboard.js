import React from 'react';
import classnames from 'classnames';

import Navbar from 'scripts/components/Navbar';
import ConferenceEditor from 'scripts/components/ConferenceEditor';
import TrackEditor from 'scripts/components/TrackEditor';
import TalkEditor from 'scripts/components/TalkEditor';
import VenueEditor from 'scripts/components/VenueEditor';
import PeopleEditor from 'scripts/components/PeopleEditor';

export default class Dashboard extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    const {
      input: {user},
      actions: {getPeople, getConferences}
    } = this.props;

    getPeople();
    getConferences({user});
  }

  render () {
    const {
      input: {
        UI,
        user,
        data: {people, conferences, tracks, talks, locations, venues},
        editor
      },
      actions: {logout, unmountConferenceEditor, mountConferenceEditor, unmountPeopleEditor, mountPeopleEditor, clearIsSaved, getPeople, getConferences, setupConferenceEditor, clearConferenceEditor, addConference, saveConference, deleteConference, addTrack, saveTrack, deleteTrack, addLocation, saveLocation, deleteLocation, addTalk, saveTalk, deleteTalk, addVenue, saveVenue, deleteVenue, addAttendee, saveAttendee, deleteAttendee}
    } = this.props;

    return (
      <div>
        <Navbar
          input = {{
            user
          }}
          actions = {{logout}}
        />
        <main
          className = 'row'
          style = {{
            padding: '16px 0 0 0'
          }}
        >
          <div className = 'columns small-3'>
            <ul className = 'menu vertical'>
              <li>
                <a
                  style = {{
                    color: 'inherit',
                    cursor: 'default'
                  }}
                >
                  <strong>
                    My Conferences
                  </strong>
                </a>
              </li>
            {conferences.map(conference =>
              <li
                key = {conference.id}
                className = {classnames({
                  active: conference.id === editor.conference.id
                })}
              >
                <a
                  style = {{
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                  onClick = {async () => {
                    unmountConferenceEditor();

                    await setupConferenceEditor({conference});

                    clearConferenceEditor();

                    mountConferenceEditor();
                  }}
                >
                  {conference.get('name')}
                </a>
              </li>
            )}
              <li
                style = {{
                  margin: '40px 16px 0 16px'
                }}
              >
                <button
                  className = 'expanded secondary button'
                  onClick = {async event => {
                    event.preventDefault();

                    await addConference({
                      fields: {
                        name: '(New Conference)',
                        attendees: [],
                        admin: user
                      }
                    });

                    getConferences({user});
                  }}
                >
                  Add Conference
                </button>
              </li>
            </ul>
          </div>
        {UI.showConferenceEditor &&
          <div
            className = 'columns small-9'
            style = {{
              background: '#fff'
            }}
          >
          {editor.conference.id &&
            <div>
              <h2>Edit Conference</h2>
              <ConferenceEditor
                input = {{
                  user,
                  data: {conferences, tracks, talks, locations, venues},
                  editor
                }}
                actions = {{clearIsSaved, getConferences, saveConference, deleteConference, deleteTrack, deleteLocation, deleteTalk, deleteVenue}}
              />
              <hr />
              <h3>Edit Conference Tracks</h3>
              <div className = 'row'>
                <div className = 'columns small-3 end'>
                  <button
                    className = 'expanded secondary button'
                    onClick = {async event => {
                      event.preventDefault();

                      const conference = conferences.find(conference => conference.id === editor.conference.id);

                      await addTrack({
                        fields: {
                          event: conference,
                          location: (await addLocation({
                            fields: {
                              event: conference
                            }
                          })).payload
                        }
                      });

                      setupConferenceEditor({conference});
                    }}
                  >
                    Add Track
                  </button>
                </div>
              </div>
            {tracks.map(track => {
              const location = locations.find(location => location.id === track.get('location').id);
              const talksInTrack = talks.filter(talk => talk.get('session').id === track.id);

              return (
              <TrackEditor
                key = {track.id}
                formKey = {track.id}
                input = {{
                  user,
                  data: {
                    conferences,
                    track,
                    location,
                    talks: talksInTrack
                  },
                  editor
                }}
                actions = {{clearIsSaved, saveTrack, deleteTrack, saveLocation, deleteLocation, addTalk, deleteTalk, setupConferenceEditor}}
              >
              {talksInTrack.map(talk =>
                <TalkEditor
                  key = {talk.id}
                  formKey = {talk.id}
                  input = {{
                    user,
                    data: {
                      people,
                      conferences,
                      track,
                      location,
                      talk
                    },
                    editor
                  }}
                  actions = {{clearIsSaved, saveTalk, deleteTalk, setupConferenceEditor}}
                />
              )}
              </TrackEditor>
              );
            })}
              <hr />
              <h3>Edit Conference Venues</h3>
              <div className = 'row'>
                <div className = 'columns small-3 end'>
                  <button
                    className = 'expanded secondary button'
                    onClick = {async event => {
                      event.preventDefault();

                      const conference = conferences.find(conference => conference.id === editor.conference.id);

                      await addVenue({
                        fields: {
                          event: conference
                        }
                      });

                      setupConferenceEditor({conference});
                    }}
                  >
                    Add Venue
                  </button>
                </div>
              </div>
            {venues.map(venue =>
              <VenueEditor
                key = {venue.id}
                formKey = {venue.id}
                input = {{
                  data: {
                    conferences,
                    venue
                  },
                  editor
                }}
                actions = {{clearIsSaved, saveVenue, deleteVenue, setupConferenceEditor}}
              />
            )}
              <hr />
              <h3>Edit Conference Attendees</h3>
            {UI.showPeopleEditor &&
              <PeopleEditor
                input = {{
                  data: {
                    people,
                    conferences
                  },
                  editor
                }}
                actions = {{unmountPeopleEditor, mountPeopleEditor, clearIsSaved, getPeople, addAttendee, saveAttendee, deleteAttendee}}
              />
            }
            </div>
          }
          </div>
        }
        </main>
      </div>
    );
  }
}
