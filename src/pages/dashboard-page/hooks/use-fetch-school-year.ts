import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { api } from '../../../api';

export function useSchoolYear(startYear: number | undefined) {
  return useQuery({
    queryKey: ['fetchSchoolYear'],
    queryFn: () => api.fetchSchoolYear((startYear ?? 0).toString()),
    enabled: startYear !== undefined,
  });
}

function betterParseInt(x: string | undefined) {
  if (!x) {
    return undefined;
  }

  if (!Number.isInteger(parseInt(x))) {
    return undefined;
  }

  return parseInt(x);
}

export function useSchoolYearFromParams() {
  const { startYear: startYearString } = useParams();
  return betterParseInt(startYearString);
}

export function useSelectedSchoolYear() {
  const schoolYear = useSchoolYearFromParams();
  const { isLoading, data, error } = useSchoolYear(schoolYear);

  if (schoolYear === undefined) {
    return { isLoading: false, data: undefined, error: new Error('Invalid school year') };
  }

  return { isLoading, data, error };
}
