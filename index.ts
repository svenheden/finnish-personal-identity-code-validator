const pattern = /^[0-3]\d[0-1]\d{3}[\-+ABCDEFYXWVU]\d{3}[\dABCDEFHJKLMNPRSTUVWXY]$/i;
const controlChars = "0123456789ABCDEFHJKLMNPRSTUVWXY".split("");
const centurySigns = {
  "+": 1800,
  "-": 1900,
  Y: 1900,
  X: 1900,
  W: 1900,
  V: 1900,
  U: 1900,
  A: 2000,
  B: 2000,
  C: 2000,
  D: 2000,
  E: 2000,
  F: 2000,
};

const hasCorrectChecksum = (input: string, checksum: string) => {
  const remainder = Number(input) % 31;

  return controlChars[remainder] === checksum;
};

const hasValidDate = (input: string) => {
  const [
    _,
    dayStr,
    monthStr,
    yearStr,
    centurySign,
  ] = /^(\d{2})(\d{2})(\d{2})(.)/.exec(input);
  const year = Number(yearStr) + centurySigns[centurySign];
  const month = Number(monthStr) - 1;
  const day = Number(dayStr);
  const date = new Date(year, month, day);

  const yearIsValid = String(date.getFullYear()).substr(-2) === yearStr;
  const monthIsValid = date.getMonth() === month;
  const dayIsValid = date.getDate() === day;

  return yearIsValid && monthIsValid && dayIsValid;
};

export const isValid = (input: string) => {
  if (!pattern.test(input)) {
    return false;
  }

  const cleaned = input.substr(0, 10).replace(/\D/g, "");
  const checksum = input.substr(-1).toUpperCase();

  return hasCorrectChecksum(cleaned, checksum) && hasValidDate(input);
};
