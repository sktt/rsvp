Invites = new Meteor.Collection('invites');

Invites.allow({
  insert: function (userId, invite) {
    console.log(invite.free, userId);
    return !invite.free || userId;
  },
  update: function (userId) {
    return userId;
  },
  remove: function (userId) {
    return userId;
  }
});

Meteor.methods({
  rsvp: function (submission) {
    if (!Invites.findOne({email: submission.email})) {
      Invites.insert(submission);
      return 'added';
    }
    return 'dupe';
  },
  arrived: function (invite) {
    Invites.update(invite, {
      $inc: {arrived: 1}, 
      $set: {updated: new Date().getTime()} 
    });
  }
});
