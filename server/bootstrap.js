Meteor.startup(function () {
  if(!Meteor.users.findOne({username: "admin"}))  {
    var pw = 'randompassword';

    Accounts.createUser({
      username: 'admin',
      password: pw
    });
    console.log("created admin user with password: "+pw);
  }
});
