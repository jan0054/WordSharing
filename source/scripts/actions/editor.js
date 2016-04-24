import Parse from 'parse';

import {createActions} from 'scripts/helpers';

export default createActions(
  {
    retrieve: async ({fields: {word1, word2, word3}}) => {
      try {
        return await (new Parse.Query('Shared')).equalTo('word1', word1)
                                               .equalTo('word2', word2)
                                               .equalTo('word3', word3)
                                               .find();
      } catch (error) {
        return error;
      }
    }
  }
);
