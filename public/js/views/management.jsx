import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import { gettext } from 'utils';

const navData = [
  {
    className: 'profile',
    action: 'showMyAccount',
    text: gettext('My Account'),
  }, {
    className: 'pay-methods',
    action: 'showPayMethods',
    text: gettext('Payment Methods'),
  }, {
    className: 'history',
    action: 'showHistory',
    text: gettext('Receipts & History'),
  }, {
    className: 'subs',
    action: 'showSubscriptions',
    text: gettext('Subscriptions'),
  },
];


export default class Management extends Component {

  static propTypes = {
    getPayMethods: PropTypes.func.isRequired,
    getUserSubscriptions: PropTypes.func.isRequired,
    showPayMethods: PropTypes.func.isRequired,
    showSignOut: PropTypes.func.isRequired,
    tab: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    userSubscriptions: PropTypes.array,
  }

  showMyAccount = e => {
    e.preventDefault();
  }

  showPayMethods = e => {
    e.preventDefault();
    this.props.showPayMethods();
  }

  showReceipts = e => {
    e.preventDefault();
    e.stopPropagation();
  }

  showSubscriptions = e => {
    e.preventDefault();
    this.props.getUserSubscriptions();
  }

  showSignOut = e => {
    e.preventDefault();
    this.props.showSignOut();
  }

  renderNav = () => {
    var nav = [];

    for (var i = 0; i < navData.length; i += 1) {
      var navItem = navData[i];
      var isActive = this.props.tab === navItem.className;
      var classes = cx('nav', navItem.className, {active: isActive});
      nav.push((
        <li className={classes} key={navItem.className}>
          <a href="#" onClick={this.props[navItem.action]}>
            {navItem.text}</a>
        </li>
      ));
    }

    nav.push((
      <li className="signout">
        <a id="show-sign-out" href="#" onClick={this.showSignOut}>
          {gettext('Sign Out')}
        </a>
      </li>
    ));

    return <ul>{nav}</ul>;
  }

  render() {
    var props = this.props;

    if (!this.props.user.signedIn) {
      return (
        <div>
          <main className="content no-sidebar">{props.children}</main>
        </div>
      );
    } else {
      return (
        <div>
          <nav className="sidebar">
            {this.renderNav()}
          </nav>
          <main className="content">{props.children}</main>
        </div>
      );
    }
  }
}
