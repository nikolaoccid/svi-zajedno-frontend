export function backendFormattedDate(date: string | Date) {
  if (typeof date === 'string') {
    return new Date(date);
  }
  return date;
}
