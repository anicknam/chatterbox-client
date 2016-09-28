// YOUR CODE HERE:
  var app = {
    currRoom: 'lobby'
  };

  app.init = function() {
    //$('.username').on('click', app.handleUsernameClick);
  };

  app.send = function(message) {
    var message = {
      username: window.location.search.replace('?username=', ''),
      text: $('.message').val(),
      roomname: app.currRoom
    };

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

  app.fetch = function(roomName) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'GET',
      data: {order: '-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        app.allMessages = data['results'];
        app.clearMessages();
        app.clearRooms();
        app.addRooms(app.allMessages);
        if (roomName) {

          app.allMessages.forEach(function(message) {
            if (JSON.stringify(message.roomname) === roomName) {
              app.renderMessage(message);
            }
          });
        } else {
          app.allMessages.forEach(function(message) {
            app.renderMessage(message);
          });         
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
    
    var $div = $('<div class = "chatBox"></div>');
    $div.addClass(message.objectId);
    var func = function(type) {
      if (type === 'username') {
        var $newDOM = $('<span></span><br>');
      } else {
        var $newDOM = $('<span></span><br>');
      }
      $newDOM.addClass(type);
      $($newDOM).text((type === 'username') ? '@' + JSON.stringify(message[type]) : JSON.stringify(message[type]));
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
      $('.message').val('');
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

    $('body').on('click', '.refresh', function() {
      console.log(app.currRoom);
      //app.currRoom = JSON.stringify(app.currRoom);
      app.fetch(app.currRoom);
    });

    $('body').on('click', 'a', function() {

      if (this.innerHTML === 'add room') {
        var newRoom = prompt('Enter room name', 'here');
        $('.dropdown-content').append('<a class ="' + newRoom + '">' + newRoom + '</a>');
      } else {
        app.currRoom = this.innerHTML;
        app.fetch(app.currRoom);
      }
    });
  });
  
  app.addRooms = function(allMessage) {

    var allRooms = {};
    //debugger;
    $('.dropdown-content').append('<a class ="addRoom">Add oom...</a>');
    for (var i = 0; i < allMessage.length; i++) {
      allRooms[JSON.stringify(allMessage[i].roomname)] = true;
    }
    
    for (var room in allRooms) {
      var $room = $('<a class="' + room + '">' + room + '</a>');

      $room.addClass(room);
      $('.dropdown-content').append($room);
    }

  };
  
  var dropDownButton = function() {
    document.getElementById('myDropDown').classList.toggle('show');
  };

  app.fetch();

  app.clearRooms = function() {
    $('.dropdown-content').children().remove();
  };

















