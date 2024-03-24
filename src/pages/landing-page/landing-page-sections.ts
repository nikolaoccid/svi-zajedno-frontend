import academicYearPicker from '/landing-page/academic-year-picker.png';
import projectAssociateView from '/landing-page/project-associate-view.png';
import projectUsersPicture from '/landing-page/project-users.png';
export const landingSections = [
  {
    title: 'Track each academic cycle',
    subtext: [
      'Easily organize activities according to the academic year.',
      'Track user engagement separately for each academic cycle for better analysis and management.',
      'Efficiently monitor progress and outcomes across multiple academic cycles.',
    ],
    picture: academicYearPicker,
  },
  {
    title: 'Project User Tracking',
    subtext: [
      'Seamlessly enroll project users for specific academic years.',
      'Allow users to enroll in various activities offered within the academic year.',
      'Easily change user enrollment status between active and inactive as needed.',
      'Keep track of enrollment and withdrawal dates for accurate project user management.',
    ],
    picture: projectUsersPicture,
  },
  {
    title: 'Project Associate Management',
    subtext: [
      'Seamlessly add sport clubs and categorize them according to their specific attributes or characteristics.',
      'Easily manage activities for each sport club, allowing them to be marked as active or inactive as needed.',
      'Offer activities that are either paid or free, providing flexibility for both the clubs and participants.',
    ],
    picture: projectAssociateView,
  },
];
