import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './app-body.html';

Template.AppBody.onCreated(function appBodyOnCreated() {
  this.subscribe('games');
  this.subscribe('users');
});

Template.AppBody.events({
  'click .js-logout' () {
    Meteor.logout();
  }
});
