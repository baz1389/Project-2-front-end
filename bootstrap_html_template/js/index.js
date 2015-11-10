'use strict';
var callback;
var mwbapi = {
  mwb: 'http://localhost:3000',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.mwb + '/register',
      contentType: 'application/json',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  login: function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.mwb + '/login',
      contentType: 'application/json',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

   //Authenticated api actions
  logout: function (token, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.mwb + '/logout',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  // createGame: function (token, callback) {
  //   this.ajax({
  //     method: 'POST',
  //     url: this.ttt + '/games',
  //     headers: {
  //       Authorization: 'Token token=' + token
  //     },
  //     contentType: 'application/json; charset=utf-8',
  //     data: JSON.stringify({}),
  //     dataType: 'json',
  //   }, callback);
  // }
};

$(document).ready(function() {
  var form2object = function(form) {
    // debugger;
    var data = {};
    $(form).find('input').each(function(index, element) {
      // debugger;
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  };

  var wrap = function wrap(root, formData) {
    // debugger;
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };

  callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      // return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
  };

  $('#register').on('submit', function(e) {
    console.log(form2object(this));
    var credentials = wrap('credentials', form2object(this));
    mwbapi.register(credentials, callback);
    e.preventDefault();
  });

  $('#login').on('submit', function(e) {
    console.error(error);
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
      $('.token').val(data.user.token);

    };
    mwbapi.login(credentials, cb);
    console.log("You logged in!");
  });

  $('#logout').on('click', function(e) {
    alert("I was clicked!");
  });

});
