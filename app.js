//'use strict';


// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.login',
  'myApp.viewProject',
  'myApp.people',
  'myApp.editPeople',
  // 'myApp.partners',
  'myApp.projects',
  'myApp.edit',
  'myApp.publications',
  'myApp.editPublications',
  'myApp.viewPublications',
  'myApp.events',
  'myApp.Eventedit',
  'myApp.viewEvent',
  'myApp.contact',
  // 'myApp.news',
  // 'myApp.links',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}])
.factory('authentication', function(){
  return {
    isLoggedIn: function(){
      if(JSON.parse(sessionStorage.getItem('credentials')) == undefined)
      {
        return false;
      }
      else
      {
        var cr = JSON.parse(sessionStorage.getItem('credentials'));
        return cr.loggedIn;
      }
    },
    login: function(accesstoken){
      sessionStorage.removeItem('credentials');
      sessionStorage.setItem('credentials',JSON.stringify({'loggedIn':true,'token':accesstoken}));
    },
    logout: function(){
      sessionStorage.removeItem('credentials');
      sessionStorage.setItem('credentials',JSON.stringify({'loggedIn':false,'token':''}))
    }
  }
})
.factory('EditProject', function(){
  var id_project,title_project,parts,descs;
  return {
    set: function(id,title,desc,participants){
      id_project=id;
      title_project=title;
      descs=desc;
      parts=participants;
    },
    get: function(){
      return {'id':id_project,'title':title_project,'description':descs,'participants':parts}
    }
  }
})
.factory('EditEvent', function(){
  var id_event,title_event,place_event,descs, date_event, remarks_event;
  return {
    set: function(id,title,desc,place,date,remarks){
      id_event=id;
      title_event=title;
      descs=desc;
      place_event= place;
      date_event= date;
      remarks_event= remarks;
    },
    get: function(){
      return {'id':id_event,'title':title_event,'description':descs,'place':place_event, 'date': date_event, 'remarks': remarks_event}
    }
  }
})
.factory('EditPublication', function(){
  var id_pub,author_pub,coauthors_pub,descs, area_pub, date_pub;
  return {
    set: function(id,author, coauthors, area, date, desc){
      id_pub=id;
      author_pub= author;
      coauthors_pub= coauthors;
      area_pub= area;
      date_pub= date;
      descs= desc;
    },
    get: function(){
      return {'id':id_pub,'author': author_pub, 'coauthors': coauthors_pub, 'area':area_pub, 'date': date_pub, 'description':descs};
    }
  }
})
.factory('ViewProject', function(){
  var project;
  return {
    set: function(proj){
      project = proj;
    },
    get: function(){
      return project
    }
  }
})
.factory('ViewPublication', function(){
  var publication;
  return {
    set: function(pub){
      publication = pub;
    },
    get: function(){
      return publication;
    }
  }
})
.factory('ViewEvent', function(){
  var event;
  return {
    set: function(eve){
      event = eve;
    },
    get: function(){
      return event;
    }
  }
})
.factory('EditPeople', function(){
  var id_people,name_people,email_people,phno_people;
  return {
    set: function(id, name, email, phno){
      id_people=id;
      name_people=name;
      email_people=email;
      phno_people=phno;
    },
    get: function(){
      return {'id':id_people,'name':name_people,'email':email_people,'phno':phno_people}
    }
  }
});