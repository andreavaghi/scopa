import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

import './signup.html';

Template.SignupLayout.events({
  'click button': function(e, template) {
    e.preventDefault();
    Accounts.createUser({
      email: template.find('#su-email').value,
      username: template.find('#su-username').value,
      password: template.find('#su-password').value
    });
  }
});
