export function frontendFormattedDate(date?: string) {
  let today: Date;
  if (date) {
    if (date.includes('-') && date.includes('T')) {
      // Input is in ISO 8601 format
      today = new Date(date);
    } else if (date.includes('.')) {
      // Input is in "29.11.2009" format
      const [day, month, year] = date.split('.');
      today = new Date(Number(year), Number(month) - 1, Number(day));
    } else {
      throw new Error(`Unsupported date format, got: ${date}`);
    }
  } else {
    today = new Date();
  }

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
