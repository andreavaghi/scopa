import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './play.html';

Template.hand.events({
  'click .card': function(e, template) {
    if (template.data.yourTurn) {
      Meteor.call('takeTurn', template.data._id, Meteor.userId(), this);
    }
  }
});
