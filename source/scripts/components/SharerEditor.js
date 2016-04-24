import React from 'react';
import {reduxForm as connectForm} from 'redux-form';
import Linkify from 'react-linkify';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'SharerEditor',
  fields: ['word1', 'word2', 'word3'],
  initialValues: defaultFormValues.SharerEditor
})
export default class SharerEditor extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired
  }

  render () {
    const {
      input: {
        editor
      },
      actions: {retrieve, clearSharerEditor},
      fields: {word1, word2, word3}
    } = this.props;

    return (
      <form>
        <div className = 'row'>
          <div className = 'columns'>
            <h1
              className = 'text-center'
              style = {{
                margin: '60px 0 60px 0'
              }}
            >Colloquium.me Note Sharer</h1>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'columns small-8 small-centered'>
            <ul className = 'tabs'>
              <li className = 'tabs-title'>
                <a>Share</a>
              </li>
              <li className = 'tabs-title'>
                <a aria-selected = 'true'>Retrieve</a>
              </li>
            </ul>
            <div className = 'tabs-content'>
              <div className = 'tabs-panel is-active'>
                <div className = 'row'>
                  <div className = 'columns small-4'>
                    <input
                      {...word1}
                      type = 'text'
                      placeholder = 'Passphrase 1'
                    />
                  </div>
                  <div className = 'columns small-4'>
                    <input
                      {...word2}
                      type = 'text'
                      placeholder = 'Passphrase 2'
                    />
                  </div>
                  <div className = 'columns small-4'>
                    <input
                      {...word3}
                      type = 'text'
                      placeholder = 'Passphrase 3'
                    />
                  </div>
                </div>
                <div className = 'row'>
                  <div className = 'columns'>
                    <button
                      className = 'expanded button'
                      onClick = {async event => {
                        event.preventDefault();

                        await retrieve({
                          fields: {
                            word1: word1.value,
                            word2: word2.value,
                            word3: word3.value
                          }
                        });

                        clearSharerEditor();
                      }}
                    >
                      Retrieve Note
                    </button>
                  </div>
                </div>
              {editor.results.map(result =>
                <div
                  key = {result.id}
                  className = 'callout primary'
                >
                  <Linkify properties = {{target: '_blank'}}>
                    {result.get('content')}
                  </Linkify>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
