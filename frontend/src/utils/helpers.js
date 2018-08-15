
export function formatData (timestamp) {
  const formatter = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }
  return new Intl.DateTimeFormat('en-GB', formatter).format(timestamp)
}
