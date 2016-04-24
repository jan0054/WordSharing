import React from 'react';

export default class Support extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired
  }

  render () {
    const {
      actions: {logout}
    } = this.props;

    return (
      <div
        className = 'row'
        style = {{
          margin: '60px 0 0 0'
        }}
      >
        <div className = 'columns small-8 small-centered'>
          <div className = 'callout warning'>
            <p>
              Your account does not have admin privilege. Please
              <a href = 'mailto:jan0054@gmail.com'> contact support </a>
              for assistance.
            </p>
            <button
              className = 'expanded button'
              onClick = {logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
