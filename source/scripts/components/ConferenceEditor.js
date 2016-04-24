import React from 'react';
import classnames from 'classnames';
import {reduxForm as connectForm} from 'redux-form';
import Moment from 'moment';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'ConferenceEditor',
  fields: ['name', 'organizer', '_startDate', '_startTime', '_endDate', '_endTime', '_parentEventId', 'content'],
  initialValues: defaultFormValues.ConferenceEditor
})
export default class ConferenceEditor extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired
  }

  render () {
    const {
      input: {
        user,
        data: {conferences, tracks, talks, locations, venues},
        editor
      },
      actions: {clearIsSaved, getConferences, saveConference, deleteConference, deleteTrack, deleteLocation, deleteTalk, deleteVenue},
      fields: {name, organizer, _startDate, _startTime, _endDate, _endTime, _parentEventId, content}
    } = this.props;

    const conference = conferences.find(conference => conference.id === editor.conference.id);
    const {isSaved} = editor.conference;

    return (
      <form
        ref = {
          element => element && !name.touched && Array.from(element.querySelectorAll('input, select, textarea')).reverse().forEach(field => field.focus())
        }
      >
        <h3 className = 'subheader'>
          “{name.touched ? name.value : conference.get('name')}”
        </h3>
        <div
          style = {{
            margin: '0 0 0 15px'
          }}
        >
          <div className = 'row'>
            <div className = 'columns'>
              <label>Conference Name
                <input
                  {...name}
                  type = 'text'
                  value = {name.touched ? name.value : conference.get('name')}
                />
              </label>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'columns'>
              <label>Conference Organizer
                <input
                  {...organizer}
                  type = 'text'
                  value = {organizer.touched ? organizer.value : conference.get('organizer')}
                />
              </label>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'columns small-3'>
              <label>Start Date
                <input
                  {..._startDate}
                  type = 'date'
                  value = {_startDate.touched ? _startDate.value : Moment(conference.get('start_time')).format('YYYY-MM-DD')}
                />
              </label>
            </div>
            <div className = 'columns small-3'>
              <label>Start Time
                <input
                  {..._startTime}
                  type = 'time'
                  value = {_startTime.touched ? _startTime.value : Moment(conference.get('start_time')).format('HH:mm')}
                />
              </label>
            </div>
            <div className = 'columns small-3'>
              <label>End Date
                <input
                  {..._endDate}
                  type = 'date'
                  value = {_endDate.touched ? _endDate.value : Moment(conference.get('end_time')).format('YYYY-MM-DD')}
                />
              </label>
            </div>
            <div className = 'columns small-3'>
              <label>End Time
                <input
                  {..._endTime}
                  type = 'time'
                  value = {_endTime.touched ? _endTime.value : Moment(conference.get('end_time')).format('HH:mm')}
                />
              </label>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'columns'>
              <label>Parent Event
                <select
                  {..._parentEventId}
                  value = {
                      _parentEventId.touched
                    ? _parentEventId.value

                    : conference.get('parentEvent')
                    ? conference.get('parentEvent').id

                    : ''
                  }
                >
                  <option></option>
                {conferences.filter(conference => conference.id !== editor.conference.id)
                            .map(conference =>
                  <option
                    key = {conference.id}
                    value = {conference.id}
                  >
                    {conference.get('name')}
                  </option>
                )}
                </select>
              </label>
            </div>
          </div>
        {conference.get('childrenEvent') &&
          <div className = 'row'>
            <div className = 'columns'>
              <label>Subevents
                <ul>
                {conference.get('childrenEvent').map(conference =>
                  <li
                    key = {conference.id}
                  >
                    {conference.get('name')}
                  </li>
                )}
                </ul>
              </label>
            </div>
          </div>
        }
          <div className = 'row'>
            <div className = 'columns'>
              <label>Conference Summary
                <textarea
                  {...content}
                  rows = {8}
                  value = {content.touched ? content.value : conference.get('content')}
                ></textarea>
              </label>
            </div>
          </div>
          <div className = 'row'>
            <div className = 'columns small-offset-3 small-9 expanded button-group'>
              <button
                className = 'alert button'
                onClick = {async event => {
                  event.preventDefault();

                  talks.forEach(async talk => await deleteTalk({talk}));

                  locations.forEach(async location => await deleteLocation({location}));

                  tracks.forEach(async track => await deleteTrack({track}));

                  venues.forEach(async venue => await deleteVenue({venue}));

                  await deleteConference({conference});

                  getConferences({user});
                }}
              >
                Delete Conference
              </button>
              <button
                className = 'warning button'
                onClick = {event => {
                  event.preventDefault();

                  const parentEvent = conferences.find(conference => conference.id === _parentEventId.value);

                  saveConference({
                    conference,

                    fields: {
                      name: name.value,
                      organizer: organizer.value,
                      start_time: Moment(`${_startDate.value} ${_startTime.value}`, 'YYYY-MM-DD HH:mm').toDate(),
                      end_time: Moment(`${_endDate.value} ${_endTime.value}`, 'YYYY-MM-DD HH:mm').toDate(),
                      parentEvent,
                      content: content.value,
                      published: +!conference.get('published'),
                      admin: user
                    }
                  });
                }}
              >
                {conference.get('published') ? 'Unpublish' : 'Publish' } Conference
              </button>
              <button
                className = {classnames('button', {
                  success: isSaved
                })}
                onClick = {event => {
                  event.preventDefault();

                  const parentEvent = conferences.find(conference => conference.id === _parentEventId.value);

                  saveConference({
                    conference,

                    fields: {
                      name: name.value,
                      organizer: organizer.value,
                      start_time: Moment(`${_startDate.value} ${_startTime.value}`, 'YYYY-MM-DD HH:mm').toDate(),
                      end_time: Moment(`${_endDate.value} ${_endTime.value}`, 'YYYY-MM-DD HH:mm').toDate(),
                      content: content.value,
                      parentEvent,
                      admin: user
                    }
                  });

                  setTimeout(() => clearIsSaved({editor}), 3000);
                }}
              >
                {isSaved ? 'Saved' : 'Save Conference Info'}
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
