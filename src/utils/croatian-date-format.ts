export function croatianDateFormat(date?: string, shouldNotReturn = false) {
  if (!date && shouldNotReturn) {
    return;
  }
  const today = date ? new Date(date) : new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${day}.${month}.${year}`;
}
