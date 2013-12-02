var inpForm,
    inpSubmit, 
    status,
    loginForm;

Template.list.list = function () {
  return Invites.find();
};
Template.listActions.rendered = function () {
  inpForm   = this.find('#rsvp-form');
  inpSubmit = this.find("input[type=submit]");
};

Template.status.rendered = function () {
  status    = $("#status");
};

Template.loginForm.rendered = function () {
  loginForm = $("#login-form");
};

Template.listActions.form = [
  {
    type: 'text',
    eid: 'inp-fname',
    placeholder: 'First Name',
    wrapper: 'w50'
  },
  {
    type: 'text',
    eid: 'inp-lname',
    placeholder: 'Last Name',
    wrapper: 'w50'
  },
  {
    type: 'email',
    eid: 'inp-email',
    placeholder: 'Email adress',
    wrapper: 'w100'
  }
];

Template.listActions.events({
  'keyup input.inp-validate' : function () {
    inpSubmit.disabled = !inputsFilled(inpForm);
  },
  'click input[type=submit]' : function (evt) {
    evt.preventDefault();
    if(inputsFilled(inpForm)) {
      if(submitInvitation(inpForm)) {
        setStatus($("#inp-fname", inpForm).val()+" is now added to the invitation list!", 'confirm');
        inpForm.reset();
      } else {
        setStatus($("#inp-email", inpForm).val()+" is already on invitation list!", 'warn');
      }
    }
  }
});
Template.listActions.isAdmin = function () {
  if (Meteor.user())
    return Meteor.user().username === 'admin';
};

Template.loginForm.events({
  'submit' : function (evt) {
    evt.preventDefault();
    if (Meteor.user()) {
      Meteor.logout();
      return false;
    }
    Meteor.loginWithPassword(loginForm.find('[name="username"]').val(), loginForm.find('[name="password"]').val(), function (err) {
      if(err) {
        setStatus('Incorrect login credentials!', 'error');
      } else {
        setStatus('Logged in as '+Meteor.user().username+'.', 'confirm');
      }
    });
  }
});

Template.loginForm.loggedIn = function () {
  return Meteor.user();
};

var isEmail = function (email) {
  var regex = /^([a-zA-Z0-9_.+\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
};

var setStatus = function (message, type) { 
  status.html(message).
    removeClass('status-confirm status-warn status-error').
    addClass('status-visible status-'+type);
  setTimeout(function() {
    status.removeClass('status-visible');
  }, 5000);
};
var submitInvitation = function (form) {
  var fields = $(":input", form);
  var insertion = {
    fname: fields[0].value,
    lname: fields[1].value,
    email: fields[2].value
  };
  if (Meteor.user() && Meteor.user().username === 'admin') {
    insertion.free = fields[3].checked;
  }
  if (!Invites.findOne({email: fields[2].value})) {
    Invites.insert(insertion);
    return true;
  }
  return false;
};
var inputsFilled = function (form) {
  var inputElems = $(form.elements).not("#inp-email");
  var result = true;
  inputElems.each(function(index, item){
    result &= item.value !== '';
  });
  result &= isEmail($(form).find('#inp-email').val());
  return result;
};
