import Parse from 'parse';

import {createActions} from 'scripts/helpers';

export default createActions(
  'changeMode',
  'uploading',
  'clearStatus',
  {
    share: async ({file, fields}) => {
      try {
        return await new (Parse.Object.extend('Shared'))().save({
          ...fields,

          ...(file && {
            file: await (new Parse.File(file.name, file)).save()
          })
        });
      } catch (error) {
        return error;
      }
    },

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
