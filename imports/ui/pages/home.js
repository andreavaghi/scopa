import './home.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Games } from '../../api/games/games.js';

function otherId(game) {
  return game.currentTurn[game.currentTurn[0] === Meteor.userId() ? 1 : 0];
}

moment.locale('it');

Template.gameList.helpers({
  completedGames: function() {
    return Games.find({ inProgress: false }).map(function(game) {
      game.otherPlayer = Meteor.users.findOne(otherId(game)).username;
      game.finished = moment(game.finished).fromNow();

      if (game.winner === 'tie') game.message = 'pareggiata';
      else if (game.winner === Meteor.userId()) game.message = 'vinta';
      else game.message = 'persa';
      return game;
    });
  },
  games: function() {
    return Games.find({ inProgress: true }).map(function(game) {
      game.otherPlayer = Meteor.users.findOne(otherId(game)).username;
      game.started = moment(game.started).fromNow();
      return game;
    });
  }
});

Template.userList.helpers({
  users: function() {
    var myid = Meteor.userId(),
      cantPlayAgainst = [myid];

    Games.find({ inProgress: true }).forEach(function(game) {
      cantPlayAgainst.push(otherId(game));
    });

    return Meteor.users.find({ _id: { $not: { $in: cantPlayAgainst } } });
  }
});

Template.userItem.events({
  'click button': function(e, template) {
    Meteor.call('createGame', template.data._id);
  }
});
