var $loginForm;

Template.loginForm.rendered = function () {
  $loginForm = $("#login-form");
};

Template.loginForm.events({
  'submit' : function (evt) {
    evt.preventDefault();
    if (Meteor.user()) {
      Meteor.logout();
      return;
    }
    Meteor.loginWithPassword($loginForm.find('[name="username"]').val(), $loginForm.find('[name="password"]').val(), function (err) {
      if(err) {
        setStatus('Incorrect login credentials!', 'error');
      } else {
        setStatus('Logged in as '+Meteor.user().username+'.', 'confirm');
      }
    });
  }
});

Template.loginForm.loggingIn = function () {
  return Meteor.loggingIn(); 
};
