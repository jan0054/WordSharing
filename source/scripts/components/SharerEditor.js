import React from 'react';
import {reduxForm as connectForm} from 'redux-form';
import Linkify from 'react-linkify';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'SharerEditor',
  fields: ['word1', 'word2', 'word3', 'content', 'file'],
  initialValues: defaultFormValues.SharerEditor,
  validate: values => {
    const errors = {};

    values.word1 === '' && (errors.word1 = 'Passphrase A is required.');
    values.content === '' && (errors.content = 'Note is required.');

    return errors;
  }
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
      actions: {changeMode, share, retrieve, clearSharerEditor, clearStatus},
      fields: {word1, word2, word3, content, file}
    } = this.props;

    const modes = ['share', 'retrieve'];

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
            {modes.map(mode =>
              <li
                key = {mode}
                className = 'tabs-title'
              >
                <a
                  style = {{textTransform: 'capitalize'}}
                  aria-selected = {mode === editor.mode}
                  onClick = {() => changeMode(mode)}
                >
                  {mode}
                </a>
              </li>
            )}
            </ul>
            <div className = 'tabs-content'>
              <div className = 'tabs-panel is-active'>
                <div className = 'row'>
                  <div className = 'columns small-4'>
                    <input
                      {...word1}
                      type = 'text'
                      placeholder = 'Passphrase A (Required)'
                    />
                  </div>
                  <div className = 'columns small-4'>
                    <input
                      {...word2}
                      type = 'text'
                      placeholder = 'Passphrase B'
                    />
                  </div>
                  <div className = 'columns small-4'>
                    <input
                      {...word3}
                      type = 'text'
                      placeholder = 'Passphrase C'
                    />
                  </div>
                </div>
              {editor.mode === 'share' &&
                <div className = 'row'>
                  <div className = 'columns'>
                    <textarea
                      {...content}
                      rows = {8}
                      placeholder = '(Required)'
                    ></textarea>
                  </div>
                  <div className = 'columns'>
                    <input
                      {...file}
                      type = 'file'
                      value = {null}
                    />
                  </div>
                </div>
              }
                <div className = 'row'>
                  <div className = 'columns'>
                    <button
                      className = 'expanded button'
                      style = {{textTransform: 'capitalize'}}
                      disabled = {
                        editor.mode === 'share' && (word1.value === '' || content.value === '') ||
                        editor.mode === 'retrieve' && word1.value === ''
                      }
                      onClick = {async event => {
                        event.preventDefault();

                        switch (editor.mode) {
                          case 'share':
                            await share({
                              file: file.value[0],

                              fields: {
                                word1: word1.value,
                                word2: word2.value,
                                word3: word3.value,
                                content: content.value,
                                type: file.value.length
                              }
                            });

                            break;
                          case 'retrieve':
                            await retrieve({
                              fields: {
                                word1: word1.value,
                                word2: word2.value,
                                word3: word3.value
                              }
                            });

                            break;
                        }

                        clearSharerEditor();

                        setTimeout(() => clearStatus(), 3000);
                      }}
                    >
                      {editor.status || `${editor.mode} Note`}
                    </button>
                  </div>
                </div>
              {editor.mode === 'share' &&
                <div className = 'row'>
                  <div className = 'columns'>
                  {word1.touched && word1.error &&
                    <p className = 'help-text'>
                      {word1.error}
                    </p>
                  }
                  {content.touched && content.error &&
                    <p className = 'help-text'>
                      {content.error}
                    </p>
                  }
                  </div>
                </div>
              }
              {editor.mode === 'retrieve' && editor.results.map(result =>
                <div
                  key = {result.id}
                  className = 'callout primary'
                >
                  <p>
                    <Linkify properties = {{target: '_blank'}}>
                      {result.get('content')}
                    </Linkify>
                  </p>
                { !result.get('file')
                ? ''

                : ['gif', 'jpg', 'png'].includes(result.get('file')._name.split('.').pop())
                ? <img src = {result.get('file')._url} />

                : <a
                    target = '_blank'
                    href = {result.get('file')._url}
                  >
                    Download Attached File
                  </a>
                }
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
