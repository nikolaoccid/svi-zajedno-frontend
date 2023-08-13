import _ from 'lodash';
export const generateSchoolYears = (existingSchoolYears: number[] = []) => {
  const currentYear = new Date().getFullYear();
  const schoolYears = _.range(currentYear - 5, currentYear + 5, 1);
  const filteredSchoolYears = schoolYears.filter((schoolYear) => !existingSchoolYears.includes(schoolYear));
  return filteredSchoolYears;
};
