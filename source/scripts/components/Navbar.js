import React from 'react';

export default class Dashboard extends React.Component {
  static propTypes = {
    input: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  }

  render () {
    const {
      input: {user},
      actions: {logout}
    } = this.props;

    return (
      <nav className = 'top-bar'>
        <div className = 'row'>
          <div className = 'top-bar-title columns small-4'>
            <strong
              style = {{
                lineHeight: '40px'
              }}
            >
              Colloquium.me Admin Dashboard
            </strong>
          </div>
          <div className = 'columns small-4'>
            <div className = 'top-bar-right'>
              <ul className = 'menu'>
                <li>
                  <a
                    style = {{
                      color: 'inherit',
                      cursor: 'default'
                    }}
                  >
                    {user.get('first_name')} {user.get('last_name')}
                  </a>
                </li>
                <li>
                  <button
                    className = 'button'
                    onClick = {logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
