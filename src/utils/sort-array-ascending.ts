import { SchoolYear } from '../api/codegen';

export function sortArrayAscending(arr: SchoolYear[]) {
  return [...arr].sort((a, b) => a.startYear - b.endYear);
}
