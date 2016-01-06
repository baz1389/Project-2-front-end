'use strict'

$(document).ready(function() {

  $('#search').hide();
  $('#define').hide();
  $('#random').hide();
  $('#favorite').hide();
  $('#logout').hide();
  $('#updateForm').hide();
  $('.container-fluid').hide();
  $('.register-block').hide();
  $('#createNew').hide();
  $('#single-word').hide();

  $('.register-a2').on('click', function(e) {
    e.preventDefault();
    $('.register-block').show();
    $('.login-block').hide();
  });

  $('.login-a2').on('click', function(e) {
    e.preventDefault();
    $('.register-block').hide();
    $('.login-block').show();
  });

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

    $('.register-block').hide();
    e.preventDefault();
  });

  $('#login').on('submit', function(e) {
    e.preventDefault();
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        $('#login').html('<strong>Error! Login fail!</strong>');
        // return;
      }

      user.token = data.user.token;
      user.id = data.user.id;
      $('#login > input').val('');
      $('#register > input').val('');
      $('.token').val(data.user.token);
      $('.login-block').hide();
      $('#search').show();
      $('#define').show();
      $('#random').show();
      $('#favorite').show();
      $('#logout').show();
      $('#createNew').hide();
      $('.register-block').hide();
      $('.container-fluid').show();
      $('body').css('background', 'white');

    };

    mwbapi.login(credentials, cb);


  }); //end of login

  $('#logout').click(function(e) {
    e.preventDefault();
    var token = user.token;
    var id = user.id;
    mwbapi.logout(id, token, callback);
    user.token = null;
    $('.login-block').show();
    $('#sidebar-wrapper').find('li').hide();
    $('.container-fluid').hide();
    $('.container-fluid').hide();
    $('.row').hide();
    $('.sixColumns').hide();
    $('.u-full-width').hide();
    $('.button-primary').hide();
    $('#single-word').hide();
  }); // end of logout

  $('#define').click(function() {
      $('.col-lg-12').hide();
      $('#createNew').show();
      $('#single-word').hide();
      $('#defineCreate').text("Define a Word!");
      $('#exampleWordInput').show();
      $('#exampleDefinition').show();
      $('#exampleSentence').show();
      $('#createNew').find('h4').show();
      $('.button-primary').show();

    });

  //create a new word
  $('#createNew').on('submit', function(e) {
    var word = {
      word: {
        // id: $('#exampleWordID').val(),
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

      $("#defineCreate").text("Creation Successful!");
      $('#exampleWordInput').val('').hide();
      $('#exampleDefinition').val('').hide();
      $('#exampleSentence').val('').hide();
      $('#createNew').find('h4').hide();
      $('.button-primary').hide();

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

        var template = Handlebars.compile($("#show-one-word").html());
        var newHTML = template(data);
        $("#createNew").hide();
        $(".container-fluid").hide();
        $("#single-word").show();
        $("#single-word").html(newHTML);
        $("#confirm-edit-button").hide();

      });

    }); //end of searchWord

  //updates a word

  $(document).on("click", "#edit-button", function(event){
    event.preventDefault();
    $(".editable").css({"border": " 2px solid #336699"});
    $(".editable").attr("contentEditable", "true");
    $("#confirm-edit-button").show();
    $("#edit-button").hide();
    $("#delete-button").hide();
  });

  $(document).on("click", "#confirm-edit-button", function(e){
    e.preventDefault();
    $(".editable").attr("contentEditable", "false");
    $(".editable").css({"color":"", "border": ""});
    $("#confirm-edit-button").hide();
    $("#edit-button").show();
    $("#delete-button").show();
    var id = $(this).data("id");
    var word = {
      word: {
        name: $("#wordName").html(),
        definition: $("#edit-definition").html(),
        sample_sentence: $("#edit-sentence").html()
      }
    }
    mwbapi.updateWord(id, word, user.token, callback);
  }); //end of update word

   //deletes a word
  $(document).on("click", "#delete-button", function(e){
    e.preventDefault();
    var id = $(this).data("id");
    console.log("id is " + id);
    mwbapi.deleteWord(id, user.token, function(err, data) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
      $("single-word").empty().hide();
      $("#word").html("Successfully deleted!").show();

    });
  });


}); //end document ready
