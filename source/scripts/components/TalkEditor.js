import React from 'react';
import classnames from 'classnames';
import {reduxForm as connectForm} from 'redux-form';
import Moment from 'moment';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'TalkEditor',
  fields: ['name', '_authorId', '_date', '_startTime', '_endTime', 'content'],
  initialValues: defaultFormValues.TalkEditor
})
export default class TalkEditor extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired
  }

  render () {
    const {
      input: {
        user,
        data: {people, conferences, track, location, talk},
        editor
      },
      actions: {clearIsSaved, deleteTalk, saveTalk, setupConferenceEditor},
      fields: {name, _authorId, _date, _startTime, _endTime, content}
    } = this.props;

    const conference = conferences.find(conference => conference.id === editor.conference.id);
    const {isSaved} = editor.talks.find(_talk => _talk.id === talk.id);

    return (
      <div className = 'callout primary'>
        <form
          ref = {
            element => element && !name.touched && Array.from(element.querySelectorAll('input, select, textarea')).reverse().forEach(field => field.focus())
          }
        >
          <h5 className = 'subheader'>
            “{name.touched ? name.value : talk.get('name')}”
          </h5>
          <div
            style = {{
              margin: '0 0 0 15px'
            }}
          >
            <div className = 'row'>
              <div className = 'columns'>
                <label>Talk Name
                  <input
                    {...name}
                    type = 'text'
                    value = {name.touched ? name.value : talk.get('name')}
                  />
                </label>
              </div>
            </div>
            <div className = 'row'>
              <div className = 'columns'>
                <label>Speaker
                  <select
                    {..._authorId}
                    value = {
                        _authorId.touched
                      ? _authorId.value

                      : talk.get('author')
                      ? talk.get('author').id

                      : user.get('person').id
                    }
                  >
                  {people.map(person =>
                    <option
                      key = {person.id}
                      value = {person.id}
                    >
                      {person.get('last_name')}, {person.get('first_name')}
                    </option>
                  )}
                  </select>
                </label>
              </div>
            </div>
            <div className = 'row'>
              <div className = 'columns small-3'>
                <label>Talk Date
                  <input
                    {..._date}
                    type = 'date'
                    value = {_date.touched ? _date.value : Moment(talk.get('start_time')).format('YYYY-MM-DD')}
                  />
                </label>
              </div>
              <div className = 'columns small-offset-1 small-2'>
                <label>Talk Start Time
                  <input
                    {..._startTime}
                    type = 'time'
                    value = {_startTime.touched ? _startTime.value : Moment(talk.get('start_time')).format('HH:mm')}
                  />
                </label>
              </div>
              <div className = 'columns small-2 end'>
                <label>Talk End Time
                  <input
                    {..._endTime}
                    type = 'time'
                    value = {_endTime.touched ? _endTime.value : Moment(talk.get('end_time')).format('HH:mm')}
                  />
                </label>
              </div>
            </div>
            <div className = 'row'>
              <div className = 'columns'>
                <label>Talk Summary
                  <textarea
                    {...content}
                    rows = {8}
                    value = {content.touched ? content.value : talk.get('content')}
                  ></textarea>
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

                    await deleteTalk({talk});

                    setupConferenceEditor({conference});
                  }}
                >
                  Delete Talk
                </button>
                <button
                  className = {classnames('button', {
                    success: isSaved
                  })}
                  onClick = {event => {
                    event.preventDefault();

                    const author = people.find(person => person.id === _authorId.value);

                    saveTalk({
                      talk,

                      fields: {
                        name: name.value,
                        start_time: Moment(`${_date.value} ${_startTime.value}`, 'YYYY-MM-DD HH:mm').toDate(),
                        end_time: Moment(`${_date.value} ${_endTime.value}`, 'YYYY-MM-DD HH:mm').toDate(),
                        content: content.value,
                        author,
                        event: conference,
                        session: track,
                        location,
                        type: 0
                      }
                    });

                    setTimeout(() => clearIsSaved({editor}), 3000);
                  }}
                >
                  {isSaved ? 'Saved' : 'Save Talk Info'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
