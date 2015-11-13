'use strict';
var callback;
var user = {
  id: null,
  token: null,
};

var mwbapi = {
  mwb: 'http://localhost:3000',

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

  searchWord: function(name, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.mwb + '/words' + '?name=' + name,
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

};

$(document).ready(function() {

  $('#search').hide();
  $('#define').hide();
  $('#random').hide();
  $('#favorite').hide();
  $('#logout').hide();
  $('#updateForm').hide();

  var form2object = function(form) {
    var data = {};
    $(form).find('input').each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });

    return data;
  };

  var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };

  callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' + error.error);
      return;
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
    e.preventDefault();
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        $('#login').html('<strong>Error! Login fail!</strong>');
        return;
      }

      user.token = data.user.token;
      user.id = data.user.id;
      $('.token').val(data.user.token);
      console.log(data.user.token);

    };

    mwbapi.login(credentials, cb);
    $('.login-block').hide();
    $('#search').show();
    $('#define').show();
    $('#random').show();
    $('#favorite').show();
    $('#logout').show();
    $('#createNew').hide();

  }); //end of login

  $('#logout').click(function(e) {
    e.preventDefault();
    var token = user.token;
    var id = user.id;
    mwbapi.logout(id, token, callback);
    user.token = null;
    $('.login-block').show();
    $('#sidebar-wrapper').children().hide();
    $('.container-fluid').hide();
    $('.container-fluid').hide();
    $('.row').hide();
    $('.sixColumns').hide();
    $('.u-full-width').hide();
    $('.button-primary').hide();
  }); // end of logout

  $('#define').click(function() {
      $('.col-lg-12').hide();
      $('#createNew').show();
    });

  //create a new word
  $('#createNew').on('submit', function(e) {
    var word = {
      word: {
        id: $('#exampleWordID').val(),
        name: $('#exampleWordInput').val(),
        definition: $('#exampleDefinition').val(),
        sample_sentence: $('#exampleSentence').val(),
        user_id: user.id,
      }
    };

    mwbapi.createWord(word, user.token, function(err, data) {
      if (err) {
        console.error(err);
        return;
      }

      console.log(data);
    });

    e.preventDefault();
  }); //end of createWord

  //search for a word
  $('#search').on('submit', function(e) {
      e.preventDefault();
      var name = form2object(this).word;

      mwbapi.searchWord(name, user.token, function(err, data) {
        if (err) {
          console.error(err);
          return;
        }

        $('#word').text(name);
        $('#definition').text(data.words[0].definition);
        $('#sentence').text(data.words[0].sample_sentence);
        $('#wordID').text(data.words[0].id);
      });
    }); //end of searchWord

  //updates a word
  $('#displayWordUpdateForm').on('click', function(e) {
      e.preventDefault();

      $('.col-lg-12').hide();
      $('#updateForm').show();
  });


  $('#updateForm').on('submit', function(e) {
    var wordId = $('#updateWordID').val();

    var word = {
      word: {
        name: $('#updateWordInput').val(),
        definition: $('#updateDefinition').val(),
        sample_sentence: $('#updateSentence').val(),
        user_id: user.id
      }
    }

    mwbapi.updateWord(wordId, word, user.token, function(err, data) {
      if (err) {
        console.error(err);
        return;
      }
      $('.col-lg-12').show();
      $('#createNew').hide();
      console.log(data);
      e.preventDefault();
    });
  });
});
