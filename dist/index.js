'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var pattern = /^[0-3]\d[0-1]\d{3}[\-+A]\d{3}[\dABCDEFHJKLMNPRSTUVWXY]$/i;
var controlChars = '0123456789ABCDEFHJKLMNPRSTUVWXY'.split('');

var hasCorrectChecksum = function hasCorrectChecksum(input, checksum) {
  var remainder = input % 31;

  return controlChars[remainder] === checksum;
};

var hasValidDate = function hasValidDate(input) {
  var _$exec = /^(\d{2})(\d{2})(\d{2})/.exec(input),
      _$exec2 = _slicedToArray(_$exec, 4),
      _ = _$exec2[0],
      day = _$exec2[1],
      month = _$exec2[2],
      year = _$exec2[3];

  year = Number(year);
  month = Number(month) - 1;
  day = Number(day);

  var date = new Date(year, month, day);

  return date.getYear() === year && date.getMonth() === month && date.getDate() === day;
};

var isValidFinnishPersonalIdentityCode = function isValidFinnishPersonalIdentityCode(input) {
  if (!pattern.test(input)) {
    return false;
  }

  var cleaned = input.substr(0, 10).replace(/\D/g, '');
  var checksum = input.substr(-1).toUpperCase();

  return hasCorrectChecksum(cleaned, checksum) && hasValidDate(cleaned);
};

module.exports = isValidFinnishPersonalIdentityCode;