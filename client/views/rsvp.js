var inpForm,
    inpSubmit; 
  
Template.listActions.rendered = function () {
  inpForm   = this.find('#rsvp-form');
  inpSubmit = this.find("input[type=submit]");
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
    disableForm(inpForm, true);
    if(inputsFilled(inpForm)) {
      submitInvitation(inpForm, function(err, res) {
        if(res === 'added') {
          setStatus($("#inp-fname", inpForm).val()+" was added to the invitation list!", 'confirm');
          inpForm.reset();
        } else if(res === 'dupe') {
          setStatus($("#inp-email", inpForm).val()+" is already on invitation list!", 'warn');
        }
        disableForm(inpForm, false);
      });
    }
  }
});

///--- helper functions 
//
var disableForm = function (form, val) {
  var inputs = form.elements;
  for (var i=0, fLen=inputs.length; i<fLen; i++)
    inputs[i].disabled = val;
};

var isEmail = function (email) {
  var regex = /^([a-zA-Z0-9_.+\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
};

var submitInvitation = function (form, callback) {
  var fields = $(":input", form);
  var insertion = {
    fname:   fields[0].value,
    lname:   fields[1].value,
    email:   fields[2].value,
    free:    false,
    arrived: 0 // odd=true, even=true
  };
  if (Meteor.user() && Meteor.user().username === 'admin') {
    insertion.free = fields[3].checked;
  }
  return Meteor.call('rsvp', insertion, callback);
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
