Router.configure({
  autoRender: false,
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.map(function () {
  this.route('home', {
    path: '/',
    template: 'rsvp'
  });

  this.route('list', {
    template: 'list',
    path: '/list',
    before: function () {
      if (!Meteor.user()) {
        this.render('login');
        this.stop();
      }
    }
  });
});
function wait(){
  
}
