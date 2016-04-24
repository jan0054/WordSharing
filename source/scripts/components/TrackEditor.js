import React from 'react';
import classnames from 'classnames';
import {reduxForm as connectForm} from 'redux-form';
import Moment from 'moment';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'TrackEditor',
  fields: ['_trackName', '_startDate', '_endDate', '_locationName', 'capacity'],
  initialValues: defaultFormValues.TrackEditor
})
export default class TrackEditor extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.element.isRequired,
      React.PropTypes.arrayOf(React.PropTypes.element.isRequired)
    ])
  }

  render () {
    const {
      input: {
        user,
        data: {conferences, track, location, talks},
        editor
      },
      actions: {clearIsSaved, saveTrack, deleteTrack, saveLocation, deleteLocation, addTalk, deleteTalk, setupConferenceEditor},
      fields: {_trackName, _startDate, _endDate, _locationName, capacity},
      children
    } = this.props;

    const conference = conferences.find(conference => conference.id === editor.conference.id);
    const isSaved = editor.tracks.find(_track => _track.id === track.id).isSaved && editor.locations.find(_location => _location.id === location.id).isSaved;

    return (
      <div className = 'callout secondary'>
        <form
          ref = {
            element => element && !_trackName.touched && Array.from(element.querySelectorAll('input, select, textarea')).reverse().forEach(field => field.focus())
          }
        >
          <h4 className = 'subheader'>
            “{_trackName.touched ? _trackName.value : track.get('name')}”
          </h4>
          <div
            style = {{
              margin: '0 0 0 15px'
            }}
          >
            <div className = 'row'>
              <div className = 'columns'>
                <label>Track Name
                  <input
                    {..._trackName}
                    type = 'text'
                    value = {_trackName.touched ? _trackName.value : track.get('name')}
                  />
                </label>
              </div>
            </div>
            <div className = 'row'>
              <div className = 'columns small-3'>
                <label>Track Start Date
                  <input
                    {..._startDate}
                    type = 'date'
                    value = {_startDate.touched ? _startDate.value : Moment(track.get('start_time')).format('YYYY-MM-DD')}
                  />
                </label>
              </div>
              <div className = 'columns small-offset-1 small-3 end'>
                <label>Track End Date
                  <input
                    {..._endDate}
                    type = 'date'
                    value = {_endDate.touched ? _endDate.value : Moment(track.get('end_time')).format('YYYY-MM-DD')}
                  />
                </label>
              </div>
            </div>
            <div className = 'row'>
              <div className = 'columns'>
                <label>Location Name
                  <input
                    {..._locationName}
                    type = 'text'
                    value = {_locationName.touched ? _locationName.value : location.get('name')}
                  />
                </label>
              </div>
            </div>
            <div className = 'row'>
              <div className = 'columns'>
                <label>Location Capacity
                  <input
                    {...capacity}
                    type = 'number'
                    value = {capacity.touched ? capacity.value : location.get('capacity')}
                  />
                </label>
              </div>
            </div>
            <div className = 'row'>
              <div className = 'columns small-offset-6 small-6 expanded button-group'>
                <button
                  className = 'alert button'
                  onClick = {async event => {
                    event.preventDefault();

                    const conference = conferences.find(conference => conference.id === editor.conference.id);

                    talks.forEach(async talk => await deleteTalk({talk}));

                    await deleteLocation({location});

                    await deleteTrack({track});

                    setupConferenceEditor({conference});
                  }}
                >
                  Delete Track & Talks
                </button>
                <button
                  className = {classnames('button', {
                    success: isSaved
                  })}
                  onClick = {event => {
                    event.preventDefault();

                    saveLocation({
                      location,

                      fields: {
                        name: _locationName.value,
                        capacity: +capacity.value,
                        event: conference
                      }
                    });

                    saveTrack({
                      track,

                      fields: {
                        name: _trackName.value,
                        start_time: Moment(`${_startDate.value} 00:00`, 'YYYY-MM-DD HH:mm').toDate(),
                        end_time: Moment(`${_endDate.value} 23:59`, 'YYYY-MM-DD HH:mm').toDate(),
                        event: conference,
                        location
                      }
                    });

                    setTimeout(() => clearIsSaved({editor}), 3000);
                  }}
                >
                  {isSaved ? 'Saved' : 'Save Track Info'}
                </button>
              </div>
            </div>
          </div>
        </form>
        <h4>
          Edit Talks
          <small> in “{_trackName.touched ? _trackName.value : track.get('name')}”</small>
        </h4>
        <div className = 'row'>
          <div className = 'columns small-3 end'>
            <button
              className = 'expanded secondary button'
              onClick = {async event => {
                event.preventDefault();

                await addTalk({
                  fields: {
                    content: '',
                    author: await user.get('person').fetch(),
                    event: conference,
                    session: track,
                    location,
                    type: 0
                  }
                });

                setupConferenceEditor({conference});
              }}
            >
              Add Talk
            </button>
          </div>
        </div>
        {children}
      </div>
    );
  }
}
