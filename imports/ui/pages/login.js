import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

import './login.html';

Template.LoginLayout.events({
  'click button': function(e, template) {
    e.preventDefault();
    Meteor.loginWithPassword(
      template.find('#li-username').value,
      template.find('#li-password').value
    )
  }
});
