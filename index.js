const pattern = /^[0-3]\d[0-1]\d{3}[\-+A]\d{3}[\dABCDEFHJKLMNPRSTUVWXY]$/i;
const controlChars = '0123456789ABCDEFHJKLMNPRSTUVWXY'.split('');

const hasCorrectChecksum = (input, checksum) => {
  const remainder = input % 31;

  return controlChars[remainder] === checksum;
}

const hasValidDate = input => {
  let [_, day, month, year] = /^(\d{2})(\d{2})(\d{2})/.exec(input);

  year = Number(year);
  month = Number(month) - 1;
  day = Number(day);

  const date = new Date(year, month, day);

  return date.getYear() === year && date.getMonth() === month && date.getDate() === day;
}

const isValidFinnishPersonalIdentityCode = input => {
  if (!pattern.test(input)) {
    return false;
  }

  const cleaned = input.substr(0, 10).replace(/\D/g, '');
  const checksum = input.substr(-1).toUpperCase();

  return hasCorrectChecksum(cleaned, checksum) && hasValidDate(cleaned);
};

module.exports = isValidFinnishPersonalIdentityCode;
