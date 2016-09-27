// YOUR CODE HERE:
  var app = {};

  app.init = function() {
    //$('.username').on('click', app.handleUsernameClick);
  };

  app.send = function(message) {
    // var message = {
    //   username: window.location.search.replace('?username=', ''),
    //   text: $('.message').value,
    //   roomname: '4chan'
    // };

    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });

  };

  app.fetch = function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
        for ( var i = 0; i < data['results'].length; i++) {
          //console.log(data['results'][i].text);
          app.renderMessage(data['results'][i]);
        }
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      }
    });
  };

  app.server = 'https://api.parse.com/1/classes/messages';

  app.clearMessages = function() {
    $('#chats').children().remove();
  };

  app.renderMessage = function(message) {
    
    var $div = $('<div></div>');
    $div.addClass(message.objectId);
    var func = function(type) {
      if (type === 'username') {
        var $newDOM = $('<span></span><br>');
      } else {
        var $newDOM = $('<span></span><br>');
      }
      $newDOM.addClass(type);
      $($newDOM).text((type === 'username') ? '@' + message[type] : message[type]);
      $($div).append($newDOM);
    };

    func('username');
    func('text');
    $('#chats').append($div);
    

  };

  app.renderRoom = function(roomName) {
    $('#roomSelect').append('<div>' + roomName + '</div>');
  };

  app.handleUsernameClick = function () {
    window.location['friends'] = window.location['friends'] || {};
    window.location['friends'][this.innerHTML.replace('@', '')] = this.innerHTML.replace('@', '');
  };

  $(document).ready(function() {
    $('body').on('click', '.username', function() {
      app.handleUsernameClick.call(this);
    });    
  });

  app.fetch();



















