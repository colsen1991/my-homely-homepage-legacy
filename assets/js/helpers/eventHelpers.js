'use strict';

const EventHelpers = {
  isEnter: function (e) {
    return e.key === 'Enter';
  },
  isShift: function (e) {
    return e.shiftKey;
  }
};

module.exports = EventHelpers;
