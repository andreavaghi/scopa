Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  template: 'home'
});

Router.route('/game/:_id', {
  subscriptions: function() {
    return Meteor.subscribe('games');
  },
  template: 'play',
  data: function() {
    var game = Games.findOne(this.params._id);

    game.player = game.players[Meteor.userId()];
    game.yourTurn = game.currentTurn[0] === Meteor.userId();

    var otherId = game.currentTurn[game.yourTurn ? 1 : 0];
    game.otherPlayer = {
      username: Meteor.users.findOne(otherId).username,
      score: game.players[otherId].score
    }

    return game;
  }
});
