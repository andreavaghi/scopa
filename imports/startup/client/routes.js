import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/HomeLayout.js';

FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('HomeLayout');
  }
});

FlowRouter.route('/game/:_id', {
  name: 'game',
  action() {
    BlazeLayout.render('MainLayout');
  }
});

FlowRouter.configure({
  layoutTemplate: 'layout'
});

FlowRouter.map(function() {
  this.route('play', {
    path: '/game/:_id',
    data: function() {
      var game = Games.findOne(this.params._id);

      if (game) {
        game.player = game.players[Meteor.userId()];
        game.yourTurn = game.currentTurn[0] === Meteor.userId();

        var otherId = game.currentTurn[game.yourTurn ? 1 : 0];
        game.otherPlayer = {
          username: Meteor.users.findOne(otherId).username,
          score: game.players[otherId].score
        };

        if (game.winner) {
          if (game.winner === 'tie') game.message = 'Pareggio!';
          else if (game.winner === Meteor.userId()) game.message = 'Hai vinto!';
          else game.message = 'Hai perso!';
        }

        return game;
      }
      return {};
    }
  });
});
