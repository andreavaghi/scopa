Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('/', function() {
    this.render('home')
  });
  this.route('/game/:_id', function() {
    this.render('play', {
      data: function() {
        return Games.findOne({
          _id: this.params._id
        });

        var game = Games.findOne({
          _id: this.params._id
        });

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
  })
});
