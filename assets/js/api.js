'use strict';
var callback;
var user = {
  id: null,
  token: null,
};

var mwbapi = {
  mwb: 'https://fathomless-island-1134.herokuapp.com',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({
        jqxher: jqxhr,
        status: status,
        error: error,
      });
    });
  },

  register: function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.mwb + '/register',
      contentType: 'application/json',
      data: JSON.stringify(credentials),
      dataType: 'json',
    }, callback);
  },

  login: function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.mwb + '/login',
      contentType: 'application/json',
      data: JSON.stringify(credentials),
      dataType: 'json',
    }, callback);
  },

  //Authenticated api actions
  logout: function(id, token, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.mwb + '/logout/' + id,
      headers: {
        Authorization: 'Token token=' + token,
      },
      dataType: 'json',
    }, callback);
  },

  createWord: function(word, token, callback) {
    this.ajax({
      method: 'POST',
      url: this.mwb + '/words',
      headers: {
        Authorization: 'Token token=' + token,
      },
      contentType: 'application/json',
      data: JSON.stringify(word),
      dataType: 'json',
    }, callback);
  },

  searchWord: function(id, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.mwb + '/words' + '?name=' + id,
      headers: {
        Authorization: 'Token token=' + token,
      },
      dataType: 'json',
    }, callback);
  },

  updateWord: function(id, word, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.mwb + '/words/' + id,
      headers: {
        Authorization: 'Token token=' + token,
      },
      data: JSON.stringify(word),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
    }, callback);
  },

  deleteWord: function (id, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.mwb + '/words/' + id,
      // headers: {
      //   Authorization: 'Token token=' + token,
      // },
      contentType: 'application/json'
    }, callback);
  }

};
