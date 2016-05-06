import React from 'react';
import {reduxForm as connectForm} from 'redux-form';
import Linkify from 'react-linkify';
import Moment from 'moment';

import {defaultFormValues} from 'scripts/configs';

@connectForm({
  form: 'SharerEditor',
  fields: ['word1', 'word2', 'word3', 'content', 'file'],
  initialValues: defaultFormValues.SharerEditor,
  validate: values => {
    const errors = {};

    values.word1 === '' && (errors.word1 = 'Phrase 1 is required.');

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
      actions: {changeMode, uploading, share, retrieve, clearSharerEditor, clearStatus},
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
                margin: '60px 0 60px 0',
                color: '#505160'
              }}
            >Colloquium.me URL & File Sharing</h1>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'columns small-8 small-centered'>
            <ul
              className = 'tabs'
            >
            {modes.map(mode =>
              <li
                key = {mode}
                className = 'tabs-title'
              >
                <a
                  style = {{
                    color: '#495c71',
                    textTransform: 'capitalize'
                  }}
                  aria-selected = {mode === editor.mode}
                  onClick = {() => changeMode(mode)}
                >
                  {mode === 'share' ? 'Send' : 'Receive'}
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
                      placeholder = 'Search Phrase 1 (Required)'
                    />
                  </div>
                  <div className = 'columns small-4'>
                    <input
                      {...word2}
                      type = 'text'
                      placeholder = 'Search Phrase 2'
                    />
                  </div>
                  <div className = 'columns small-4'>
                    <input
                      {...word3}
                      type = 'text'
                      placeholder = 'Search Phrase 3'
                    />
                  </div>
                </div>
              {editor.mode === 'share' &&
                <div className = 'row'>
                  <div className = 'columns'>
                    <textarea
                      {...content}
                      rows = {8}
                      placeholder = 'Enter URL here or upload file below'
                    ></textarea>
                  </div>
                  <div className = 'columns text-center'>
                    <p>OR</p>
                  </div>
                  <div className = 'columns'>
                    <input
                      {...file}
                      type = 'file'
                      value = {null}
                    />
                    <p>File Size Limit: 10 MB</p>
                  </div>
                </div>
              }
                <div className = 'row'>
                  <div className = 'columns'>
                    <button
                      className = 'expanded button'
                      style = {{
                        background: '#882426',
                        textTransform: 'capitalize'
                      }}
                      disabled = {word1.value === ''}
                      onClick = {async event => {
                        event.preventDefault();

                        switch (editor.mode) {
                          case 'share':
                            uploading();

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

                            file.value.length && window.alert('File has been uploaded!');

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
                      {editor.status || (editor.mode === 'share' ? 'Upload' : 'Search')}
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
                  </div>
                </div>
              }
              {editor.mode === 'retrieve' && editor.results.map(result =>
                <div
                  key = {result.id}
                  className = 'callout primary'
                  style = {{
                    background: '#e0e0e0'
                  }}
                >
                  <ul className = 'breadcrumbs'>
                    <li>{Moment(result.get('createdAt')).format('YYYY-MM-DD')}</li>
                    <li>{result.get('type') ? 'File' : 'URL'}</li>
                  </ul>
                  <p
                    style = {{color: '#505160'}}
                  >
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
