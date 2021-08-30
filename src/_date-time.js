// this is a modified version of https://github.com/sindresorhus/date-time
// but they don't provide a CJS build
export default function dateTime() {
  let date = new Date()
  let end = ''

  // Offset the date so it will return the correct value when getting the ISO string.
  date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))

  return date
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, end)
}
