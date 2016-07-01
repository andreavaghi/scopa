import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './app-body.html';

Template.AppBody.events({
  'click .js-logout' () {
    Meteor.logout();
  }
});
