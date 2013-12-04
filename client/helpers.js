//
//   Handlebars
//

Handlebars.registerHelper('isAdmin', function () {
  if (Meteor.user())
    return Meteor.user().username === 'admin';
});

Handlebars.registerHelper('loggedIn', function () {
  return Meteor.user();
});

Handlebars.registerHelper('arrived', function () {
  return Invites.findOne({_id: this._id, arrived: {$mod: [2,1]}}) ? 'arrived' : '';
});
