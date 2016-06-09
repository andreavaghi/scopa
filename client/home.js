Template.userList.helpers({
  users: function() {
    var myId = Meteor.userId(),
      cantPlayAgainst = [myId];

    Games.find({
      inProgress: true
    }).forEach(function(game) {
      cantPlayAgainst.push(game.currentTurn[game.currentTurn[0] === myId ? 1 : 0]);
    });
    return Meteor.users.find({
      _id: {
        $not: {
          $in: cantPlayAgainst
        }
      }
    });
  }
});

Template.userItem.events({
  'click button': function(e, template) {
    Meteor.call('createGame', template.data._id);
  }
});
