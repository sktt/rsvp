// global components
//
var $status;

setStatus = function (message, type) { 
  $status.html(message).
    removeClass('status-confirm status-warn status-error').
    addClass('status-visible status-'+type);
  setTimeout(function() {
    $status.removeClass('status-visible');
  }, 5000);
};

Template.userInfo.events({
  'click input[type=submit]' : function () {
    Meteor.logout();
  }
});

Template.status.rendered = function () {
  $status    = $("#status");
};
