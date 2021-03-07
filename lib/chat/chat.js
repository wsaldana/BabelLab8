"use strict";

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.timers.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("../chat/chatStyle.scss");

var _readUserName = require("./readUserName");

var _autoResize = require("./autoResize");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function validarURL(str) {
  var patron = new RegExp("^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$");
  console.log(patron.test(str));
  return patron.test(str);
}

function handleKeyPress(e) {
  var key = e.keyCode || e.which;

  if (key == 13) {
    e.preventDefault();
    sendMsg();
  }
}

function postMessages(msg) {
  fetch('http://3.129.101.133:3050/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: msg,
      user: username
    })
  });
}

var ids = []; //var username = prompt("Ingrese su nombre de usuario: ");

var username = (0, _readUserName.getUrlParam)("txtUserName", "Guest");
var body = document.getElementsByTagName("body")[0];
var displayName = document.getElementById("displayName");
displayName.innerHTML = username;
var msgContainer = document.getElementById("msgContainer");
var inputContainer = document.getElementById("inputContainer");
var input = document.getElementById("input");
input.addEventListener('input', _autoResize.autoResizeHeight, 0);
input.addEventListener('keypress', handleKeyPress);
input.placeholder = "Escríbe tu mensaje...";
input.maxLength = "140";
var btn = document.getElementById("btn");
btn.addEventListener("click", sendMsg);

function sendMsg(txt) {
  var msgText = input.value;
  var validText = false;

  for (var i = 0; i < msgText.length; i++) {
    if (msgText.charAt(i) != " " && msgText != "\n") {
      validText = true;
    }
  }

  if (msgText != "" && validText) {
    postMessages(msgText);
  }

  input.value = "";
  input.style.height = "25px";
}

function loadMessages(_x) {
  return _loadMessages.apply(this, arguments);
}

function _loadMessages() {
  _loadMessages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(firstRun) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fetch('http://3.129.101.133:3050/chats').then(function (results) {
              return results.json();
            }).then(function (json) {
              return json.forEach(function (msgText) {
                if (ids.includes(msgText.id) == false) {
                  var msgBox = document.createElement("div");
                  msgContainer.appendChild(msgBox); //msgBox.className = "msgBox";

                  msgBox.classList = "msgBox animate__animated animate__bounceIn";

                  if (msgText.user == username) {
                    msgBox.style.borderRadius = "12px 12px 0 12px";
                    msgBox.style.alignSelf = "flex-end";
                  } else {
                    msgBox.style.borderRadius = "12px 12px 12px 0";
                    msgBox.style.alignSelf = "flex-start";
                  }

                  if (msgText.description.trim().toLowerCase().match(/.(jpeg|jpg|gif|png)$/) != null) {
                    msgBox.innerHTML = "<b class='uname'>" + msgText.user + "</b><br>";
                    var img = document.createElement("img");
                    msgBox.appendChild(img);
                    img.src = msgText.description;
                    img.style.width = "375px";
                  } else if (validarURL(msgText.description)) {
                    msgBox.innerHTML = "<b class='uname'>" + msgText.user + "</b><br><a href='" + msgText.description + "' style='color:rgb(51,102,204)'>" + msgText.description + "</a><br>";
                    var website = document.createElement("iframe");
                    msgBox.appendChild(website);
                    website.src = 'https://s.wordpress.com/mshots/v1/' + msgText.description;
                    website.style.width = "375px";
                  } else {
                    msgBox.innerHTML = "<b class='uname'>" + msgText.user + "</b><br>" + msgText.description;
                  }

                  if (firstRun || msgText.user == username) {
                    document.documentElement.scrollTop = document.documentElement.scrollHeight;
                  }

                  ids.push(msgText.id);
                }
              });
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadMessages.apply(this, arguments);
}

var sendIcon = document.getElementById("sendIcon");
btn.appendChild(sendIcon);
sendIcon.src = "../icons/send.png";
loadMessages(true);
var intervalId = window.setInterval(function () {
  loadMessages(false);
}, 1000);