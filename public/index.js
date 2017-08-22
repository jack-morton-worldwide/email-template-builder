'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Template = function Template(title, filename) {
  return Object.assign({}, { title: title, filename: filename });
};

var templates = [Template('Blank', 'blank.html'), Template('CEO update', 'ceo-update.html'), Template('CFO/COO update', 'cfo-coo-update.html'), Template('CCO update', 'cco-update.html'), Template('Jack insider', 'jack-insider.html'), Template('Jack news', 'jack-news.html'), Template('Jack Awards 2017', 'jack-awards-2017.html'), Template('Jack Awards 2018', 'jack-awards-2018.html')];

var Iframe = function Iframe() {
  var node = document.querySelector('iframe');

  return Object.assign({}, {
    render: function render(filename) {
      node.setAttribute('name', Date.now());
      node.setAttribute('src', 'dist/templates/' + filename + '?time=' + Date.now());
    }
  });
};

var NavItem = function NavItem(_ref) {
  var title = _ref.title,
      index = _ref.index,
      _ref$selected = _ref.selected,
      selected = _ref$selected === undefined ? false : _ref$selected,
      handleClick = _ref.handleClick;

  var node = document.createElement('button');

  return Object.assign({}, {
    render: function render() {
      node.setAttribute('data-index', index);
      node.innerHTML = title;
      node.addEventListener('click', function () {
        return handleClick(index);
      });

      if (selected) {
        node.setAttribute('class', 'selected');
      }

      return node;
    }
  });
};

var Nav = function Nav(_ref2) {
  var handleClick = _ref2.handleClick;

  var node = document.querySelector('.nav__container');

  var navItems = [];

  return Object.assign({}, {
    render: function render(_ref3) {
      var currentIndex = _ref3.currentIndex;

      node.innerHTML = '';

      navItems = templates.map(function (template, index) {
        var title = template.title;

        var selected = index === currentIndex;
        var templateNode = NavItem({ title: title, index: index, selected: selected, handleClick: handleClick });
        return templateNode.render();
      });

      navItems.forEach(function (navItem) {
        return node.appendChild(navItem);
      });

      return node;
    }
  });
};

var App = function App() {
  var state = {
    currentIndex: 0
  };

  var render = function render() {
    var _state = state,
        currentIndex = _state.currentIndex;

    var currentTemplate = templates[currentIndex];
    var filename = currentTemplate.filename;


    nav.render({ currentIndex: currentIndex });
    iframe.render(filename);
  };

  var getCurrentIndex = function getCurrentIndex() {
    return state.currentIndex;
  };

  var setCurrentIndex = function setCurrentIndex(currentIndex) {
    var newState = _extends({}, state, { currentIndex: currentIndex });
    state = newState;
    render();
  };

  var nav = Nav({ handleClick: setCurrentIndex });
  var iframe = Iframe();

  return Object.assign({}, {
    getCurrentIndex: getCurrentIndex,
    setCurrentIndex: setCurrentIndex,
    render: render
  });
};

var app = App();
app.render();