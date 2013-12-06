var $inviteList;

Template.list.list = function () {
  //var regexp = new RegExp(Session.get('invites-search'),'i');
  return Invites.find({}, {sort: {fname: 1}});
  //return Invites.find({$or: [
    //{fname: {$regex: regexp }},
    //{lname: {$regex: regexp }},
    //{email: {$regex: regexp }}] }, {sort: {lname: 1}});
};

Template.list.events({
  'click .list-item' : function (evt,tmpl) {
    evt.preventDefault();
    if (evt.target.className.split(' ').indexOf('btn') != -1) {
      return;
    }
    if(Meteor.user()) { // only if logged in
      Invites.update(this._id,{$inc: {arrived: 1}});
    }
  },
  'keyup #filter-search' : function (evt) {
    var keyword = evt.target.value || "";
    var $matches = $('.list-item', $inviteList).filter("li:Contains('"+keyword+"')");
    $matches.css('display','block');
    $('.list-item', $inviteList).not($matches).css('display','none');
  }
});

jQuery.expr[':'].Contains = function(a,i,m){
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
};

Template.list.rendered = function () {
  inviteList = $('#list-pane');
};
