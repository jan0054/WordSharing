// < App/> Entry Container
// =======================
//
// This file defines the React entry container `< App/>`.
//
// Import Modules
// --------------
//
// ### NPM Modules

import React from 'react';
import {connect} from 'react-redux';

// ### Local Modules

import * as actions from 'scripts/actions';
import SharerEditor from 'scripts/components/SharerEditor';

// Define & Export Module
// ----------------------
//
// This module contains the ***Redux-connected < App/>***.

export default @connect(state => state, actions) class App extends React.Component {
  static propTypes = {
    editor: React.PropTypes.object.isRequired,
    changeMode: React.PropTypes.func.isRequired,
    share: React.PropTypes.func.isRequired,
    retrieve: React.PropTypes.func.isRequired,
    clearSharerEditor: React.PropTypes.func.isRequired,
    clearStatus: React.PropTypes.func.isRequired
  }

  render () {
    const {
      editor,
      changeMode, share, retrieve, clearSharerEditor, clearStatus
    } = this.props;

    return (
      <SharerEditor
        input = {{
          editor
        }}
        actions = {{changeMode, share, retrieve, clearSharerEditor, clearStatus}}
      />
    );
  }
}
