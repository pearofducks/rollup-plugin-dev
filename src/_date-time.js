export default function dateTime(options = {}) {
  let {
    date = new Date(),
    local = true,
  } = options;

  if (local) {
    // Offset the date so it will return the correct value when getting the ISO string.
    date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  }

  let end = '';

  return date
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, end);
}
