Template.logout.events({
  'click button': function(e, template) {
    e.preventDefault();
    Meteor.logout();
  }
});
