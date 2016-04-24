import Parse from 'parse';

import {createActions} from 'scripts/helpers';

export default createActions(
  {
    setupConferenceEditor: async ({conference}) => {
      try {
        return {
          conference,

          tracks: await (new Parse.Query('Session')).equalTo('event', conference)
                                                    .ascending('createdAt')
                                                    .find(),

          talks: await (new Parse.Query('Talk')).equalTo('event', conference)
                                                .ascending('createdAt')
                                                .find(),

          locations: await (new Parse.Query('Location')).equalTo('event', conference)
                                                        .find(),

          venues: await (new Parse.Query('Venue')).equalTo('event', conference)
                                                  .ascending('createdAt')
                                                  .find()
        };
      } catch (error) {
        return error;
      }
    },

    addConference: async ({fields}) => {
      try {
        return await new (Parse.Object.extend('Event'))().save(fields);
      } catch (error) {
        return error;
      }
    },

    saveConference: async ({conference, fields: {parentEvent, ...fields}}) => {
      try {
        if (conference.get('parentEvent')) {
          await conference.get('parentEvent').save({
            childrenEvent: conference.get('parentEvent').get('childrenEvent').filter(childEvent => childEvent.id !== conference.id)
          });
        }

        if (parentEvent) {
          await parentEvent.save({
            childrenEvent: (parentEvent.get('childrenEvent') || []).concat(conference)
          });

          return await conference.save({parentEvent, ...fields});
        } else {
          return await conference.unset('parentEvent')
                                 .save(fields);
        }
      } catch (error) {
        return error;
      }
    },

    deleteConference: async ({conference}) => {
      try {
        return await conference.destroy();
      } catch (error) {
        return error;
      }
    },

    addTrack: async ({fields}) => {
      try {
        return await new (Parse.Object.extend('Session'))().save(fields);
      } catch (error) {
        return error;
      }
    },

    saveTrack: async ({track, fields}) => {
      try {
        return await track.save(fields);
      } catch (error) {
        return error;
      }
    },

    deleteTrack: async ({track}) => {
      try {
        return await track.destroy();
      } catch (error) {
        return error;
      }
    },

    addLocation: async ({fields}) => {
      try {
        return await new (Parse.Object.extend('Location'))().save(fields);
      } catch (error) {
        return error;
      }
    },

    saveLocation: async ({location, fields}) => {
      try {
        return await location.save(fields);
      } catch (error) {
        return error;
      }
    },

    deleteLocation: async ({location}) => {
      try {
        return await location.destroy();
      } catch (error) {
        return error;
      }
    },

    addTalk: async ({fields}) => {
      try {
        return await new (Parse.Object.extend('Talk'))().save(fields);
      } catch (error) {
        return error;
      }
    },

    saveTalk: async ({talk, fields}) => {
      try {
        return await talk.save(fields);
      } catch (error) {
        return error;
      }
    },

    deleteTalk: async ({talk}) => {
      try {
        return await talk.destroy();
      } catch (error) {
        return error;
      }
    },

    addVenue: async ({fields}) => {
      try {
        return await new (Parse.Object.extend('Venue'))().save(fields);
      } catch (error) {
        return error;
      }
    },

    saveVenue: async ({venue, fields}) => {
      try {
        return await venue.save(fields);
      } catch (error) {
        return error;
      }
    },

    deleteVenue: async ({venue}) => {
      try {
        return await venue.destroy();
      } catch (error) {
        return error;
      }
    },

    addAttendee: async ({people, fields: {event, ...attendee}}) => {
      try {
        return await event.addUnique('attendees',
          await (
            people.find(person => person.get('email') === attendee.email) ||
            new (Parse.Object.extend('Person'))().set(attendee)
          ).addUnique('events', event)
           .save(null)
        ).save(null);
      } catch (error) {
        return error;
      }
    },

    saveAttendee: async ({people, fields}) => {
      try {
        return await Parse.Object.saveAll(
          fields.map(
            ({id, event, ...attendee}) => people.find(person => person.id === id)
                                                .set(attendee)
                                                .addUnique('events', event)
          )
        );
      } catch (error) {
        return error;
      }
    },

    deleteAttendee: async ({attendee, fields: {event}}) => {
      try {
        await event.remove('attendees', attendee)
                   .save(null);

        return await attendee.remove('events', event)
                             .save(null);
      } catch (error) {
        return error;
      }
    }
  }
);
