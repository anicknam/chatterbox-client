// YOUR CODE HERE:
var app = {};

app.init = function() {};

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
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.server = 'https://api.parse.com/1/classes/messages';

app.clearMessages = function() {
  $('#chats').children().remove();
};

app.renderMessage = function(message) {

  var newDOM = $('<span></span>');
  newDOM.addClass('username');
  newDOM.addClass(message.objectId);
  $('#chats').append(newDOM);
  $('.' + message.objectId).text(message.text);
  // $('#chats').append('<div><span class = "username"' + message.objectId + "></span><span class="message"></span></div>');
  // $('.username').text('@' + message['username'] + ': '); 
  // $('.message').text(message['text']);
};

app.renderRoom = function(roomName) {
  $('#roomSelect').append('<div>' + roomName + '</div>');
};

app.handleUsernameClick = function () {

};

app.fetch();



















