Meteor.publish('invites', function () {
  if (this.userId) 
    return Invites.find();
});
