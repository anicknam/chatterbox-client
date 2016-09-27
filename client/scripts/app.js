// YOUR CODE HERE:
  var app = {};

  app.init = function() {
    //$('.username').on('click', app.handleUsernameClick);
  };

  app.send = function(message) {
    var message = {
      username: window.location.search.replace('?username=', ''),
      text: $('.message').val(),
      roomname: 'lobby'
    };
    console.log(message);
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
        //console.log(data);
        app.addRooms(data['results']);
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

    $('body').on('click', '.submitButton', function() {
      app.send();
    });

    $('body').on('click', '.dropbtn', function() {
      //console.log('hello')
      dropDownButton();
    });
    
    window.onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName('dropdown-content');
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    };

  });
  
  app.addRooms = function(allMessage) {
    var allRooms = {};
    for (var i = 0; i < allMessage.length; i++) {
      allRooms[JSON.stringify(allMessage[i].roomname)] = true;
    }
    
    for (var room in allRooms) {
      var $room = $('<a>' + room + '</a>');
      $room.addClass(room);
      $('.dropdown-content').append($room);
    }
  };
  
  var dropDownButton = function() {
    document.getElementById('myDropDown').classList.toggle('show');
  };

  app.fetch();



















