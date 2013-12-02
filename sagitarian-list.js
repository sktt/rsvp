var Invites = new Meteor.Collection('invites');

if (Meteor.isClient) {
  var inpForm,
      inpSubmit, 
      status;
  Template.list.list = Invites.find();
  Template.listActions.rendered = function () {
    inpForm   = this.find('#rsvp-form');
    inpSubmit = $("input[type=submit]", inpForm);
    status    = $("#status");
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
      inpSubmit.prop('disabled', !inputsFilled(inpForm));
    },
    'click input[type=submit]' : function (evt) {
      evt.preventDefault();
      if(inputsFilled(inpForm)) {
        if(submitInvitation(inpForm)) {
          setStatus("See you soon, "+$("#inp-fname", inpForm).val()+"! You may bring 2 friends", 'confirm');
          inpForm[0].reset();
        } else {
          setStatus($("#inp-email", inpForm).val()+" is already on invitation list!", 'warn');
        }
      }
    }
  });

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
    if (Invites.findOne({email: fields[2].value}) === undefined) {
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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
