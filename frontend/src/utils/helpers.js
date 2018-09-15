/**
 * Converte um timestamp para uma string amigável.
 * Ex: 28/06/2016, 23:21:12
 */
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
