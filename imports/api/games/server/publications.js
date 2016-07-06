/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Games } from '../games.js';

Meteor.publish('games', function() {
  return Games.find({ currentTurn: this.userId });
});

Meteor.publish('users', function() {
  return Meteor.users.find();
});
