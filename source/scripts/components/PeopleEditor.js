import React from 'react';
import classnames from 'classnames';
import {reduxForm as connectForm} from 'redux-form';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'PeopleEditor',
  fields: [
    'email',
    'attendees[].id',
    'attendees[].first_name',
    'attendees[].last_name',
    'attendees[].title',
    'attendees[].email',
    'attendees[].institute'
  ]
})
export default class PeopleEditor extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    const {
      input: {
        data: {people},
        editor
      },
      fields: {attendees}
    } = this.props;

    people.filter(person => person.get('events') && person.get('events')
                                                          .map(event => event.id)
                                                          .includes(editor.conference.id))
          .forEach(attendee => attendees.addField({
            id: attendee.id || defaultFormValues.PeopleEditor.id,
            first_name: attendee.get('first_name') || defaultFormValues.PeopleEditor.first_name,
            last_name: attendee.get('last_name') || defaultFormValues.PeopleEditor.last_name,
            title: attendee.get('title') || defaultFormValues.PeopleEditor.title,
            email: attendee.get('email') || defaultFormValues.PeopleEditor.email,
            institute: attendee.get('institution') || defaultFormValues.PeopleEditor.institute
          }));
  }

  render () {
    const {
      input: {
        data: {people, conferences},
        editor
      },
      actions: {clearIsSaved, unmountPeopleEditor, mountPeopleEditor, getPeople, addAttendee, saveAttendee, deleteAttendee},
      fields: {email, attendees}
    } = this.props;

    const conference = conferences.find(conference => conference.id === editor.conference.id);
    const {isSaved} = editor.people;

    return (
      <form>
        <div className = 'input-group'>
          <input
            className = 'input-group-field'
            {...email}
            type = 'text'
            placeholder = 'Attendee’s Email'
          />
          <div
            className = 'input-group-button'
            style = {{
              width: '25%'
            }}
          >
            <button
              className = 'secondary button'
              style = {{
                width: '100%'
              }}
              onClick = {async event => {
                event.preventDefault();

                const conference = conferences.find(conference => conference.id === editor.conference.id);

                await addAttendee({
                  people,

                  fields: {
                    first_name: '',
                    last_name: '',
                    email: email.value,
                    event: conference
                  }
                });

                unmountPeopleEditor();

                await getPeople();

                mountPeopleEditor();
              }}
            >
              Add Attendee
            </button>
          </div>
        </div>
        <div
          style = {{
            margin: '0 0 0 15px'
          }}
        >
          <table>
            <thead>
              <tr>
                <th width = {200}>First Name</th>
                <th width = {200}>Last Name</th>
                <th width = {150}>Title</th>
                <th width = {300}>Email</th>
                <th width = {200}>Institute</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {attendees.map(attendee =>
              <tr key = {attendee.id.value}>
                <td>
                  <input
                    {...attendee.first_name}
                    type = 'text'
                  />
                </td>
                <td>
                  <input
                    {...attendee.last_name}
                    type = 'text'
                  />
                </td>
                <td>
                  <select
                    {...attendee.title}
                  >
                    <option></option>
                    <option value = 'professor'>Professor</option>
                    <option value = 'postdoc'>PhD</option>
                    <option value = 'doctor'>Doctor</option>
                    <option value = 'master'>Master</option>
                    <option value = 'bachelor'>Bachelor</option>
                    <option value = 'other'>Other</option>
                  </select>
                </td>
                <td>
                  <input
                    {...attendee.email}
                    type = 'text'
                  />
                </td>
                <td>
                  <input
                    {...attendee.institute}
                    type = 'text'
                  />
                </td>
                <td>
                  <button
                    className = 'alert button'
                    onClick = {async event => {
                      event.preventDefault();

                      unmountPeopleEditor();

                      await deleteAttendee({
                        attendee: people.find(person => person.id === attendee.id.value),

                        fields: {
                          event: conference
                        }
                      });

                      mountPeopleEditor();
                    }}
                  >
                    ╳
                  </button>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <div className = 'row'>
            <div className = 'columns small-offset-9 small-3'>
              <button
                className = {classnames('expanded button', {
                  success: isSaved
                })}
                onClick = {event => {
                  event.preventDefault();

                  saveAttendee({
                    people,

                    fields: attendees.map(attendee => ({
                      id: attendee.id.value,
                      first_name: attendee.first_name.value,
                      last_name: attendee.last_name.value,
                      title: attendee.title.value,
                      email: attendee.email.value,
                      institution: attendee.institute.value,
                      event: conference
                    }))
                  });

                  setTimeout(() => clearIsSaved({editor}), 3000);
                }}
              >
                {isSaved ? 'Saved' : 'Save Attendees Info'}
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
