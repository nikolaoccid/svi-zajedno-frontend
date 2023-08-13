import { SchoolYear } from '../api/codegen';

export function SortArrayAscending(arr: SchoolYear[]) {
  return arr.sort((a, b) => a.startYear - b.endYear);
}
