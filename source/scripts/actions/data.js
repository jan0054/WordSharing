import Parse from 'parse';

import {createActions} from 'scripts/helpers';

export default createActions(
  {
    getConferences: async ({user}) => {
      try {
        return await (new Parse.Query('Event')).equalTo('admin', user)
                                               .ascending('start_time')
                                               .find();
      } catch (error) {
        return error;
      }
    },

    getPeople: async () => {
      try {
        return await (new Parse.Query('Person').ascending('last_name')
                                               .limit(1000))
                                               .find();
      } catch (error) {
        return error;
      }
    }
  }
);
