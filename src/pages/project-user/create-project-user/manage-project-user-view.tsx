import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import * as Yup from 'yup';

import { api } from '../../../api';
import { Spinner } from '../../../components/spinner/spinner.tsx';
import { frontendFormattedDate } from '../../../utils/frontend-formatted-date.ts';
import { toastError, toastSuccess } from '../../../utils/toast.ts';
import { Button, CenterContent, Form, FormError, FormField, PageContainer } from '../../common-styles/common-styles.ts';
import { useSchoolYear, useSchoolYearFromParams } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useGetProjectUser } from './hooks/use-get-project-user.ts';
const validationSchema = Yup.object({
  oib: Yup.string().required('OIB je obavezan').length(11, 'OIB mora imati točno 11 znakova'),
  gender: Yup.string().required('Spol mora biti odabran'),
  guardianName: Yup.string().required('Ime skrbnika je obavezno'),
  guardianSurname: Yup.string().required('Prezime skrbnika je obavezno'),
  childName: Yup.string().required('Ime djeteta je obavezno'),
  childSurname: Yup.string().required('Prezime djeteta je obavezno'),
  dateOfBirth: Yup.date().required('Datum rođenja je obavezan'),
  address: Yup.string().required('Adresa je obavezna'),
  city: Yup.string().required('Grad je obavezan'),
  school: Yup.string().notRequired(), // Optional field
  mobilePhone: Yup.string().required('Broj mobitela je obavezan'),
  email: Yup.string().email('Neispravna email adresa').notRequired(),
});
const Input = styled.input`
  font-size: 14px;
  font-weight: normal;
  font-family: Axiforma;
`;
const Option = styled.option`
  font-size: 14px;
  font-weight: normal;
  font-family: Axiforma;
`;
const Section = styled.div<{ show?: boolean }>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  gap: 15px;
`;
const SectionTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
//This component creates and updates project user
export const ManageProjectUserView = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userId } = useParams();
  const schoolYearFromParams = useSchoolYearFromParams();
  const { data: projectUser } = useGetProjectUser(userId);
  const { data: currentSchoolYear } = useSchoolYear(schoolYearFromParams);
  const [showSection, setShowSection] = useState({ child: true, guardian: true });

  const formik = useFormik({
    initialValues: {
      id: projectUser?.id ?? 0,
      oib: projectUser?.oib ?? '',
      gender: projectUser?.gender ?? 'male',
      guardianName: projectUser?.guardianName ?? '',
      guardianSurname: projectUser?.guardianSurname ?? '',
      childName: projectUser?.childName ?? '',
      childSurname: projectUser?.childSurname ?? '',
      dateOfBirth: frontendFormattedDate(projectUser?.dateOfBirth) ?? '',
      address: projectUser?.address ?? '',
      city: projectUser?.city ?? '',
      school: projectUser?.school ?? '',
      mobilePhone: projectUser?.mobilePhone ?? '',
      email: projectUser?.email ?? '',
    },
    validationSchema: validationSchema,
    onSubmit: async (formData) => {
      console.log('formData', formData);
      if (userId && projectUser && projectUser.oib) {
        try {
          await api.updateProjectUser(userId, formData);
          await queryClient.invalidateQueries({ queryKey: ['getProjectUserById'] });
          await queryClient.invalidateQueries({ queryKey: ['getProjectUsers'] });
          await queryClient.invalidateQueries({ queryKey: ['getProjectUsersBySchoolYear'] });
          navigate(`/${currentSchoolYear?.startYear}/users/${projectUser.id}`);
          toastSuccess(t("User's data updated"));
        } catch (e) {
          toastError(t("User's data not updated, try again"));
        }
      } else {
        try {
          const user = await api.createProjectUser(formData);
          await queryClient.invalidateQueries({ queryKey: ['getProjectUserById'] });
          await queryClient.invalidateQueries({ queryKey: ['getProjectUsers'] });
          await queryClient.invalidateQueries({ queryKey: ['getProjectUsersBySchoolYear'] });
          navigate(`/${currentSchoolYear?.startYear}/users/${user.id}`);
          toastSuccess(t('User created succesfully'));
        } catch (e) {
          toastError(t('User not created succesfully, try again'));
        }
      }
    },
    enableReinitialize: true,
  });

  if (formik.isSubmitting) {
    return <Spinner SpinnerComponent={CircleLoader} color={'#2196f3'} />;
  }
  return (
    <PageContainer>
      <CenterContent>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <SectionTitle onClick={() => setShowSection({ ...showSection, guardian: !showSection['guardian'] })}>
              <h2>{t("Guardian's details")}</h2>
              <IoIosArrowDown />
            </SectionTitle>
            <Section show={showSection['guardian']}>
              <FormField>
                <label htmlFor="guardianName">{t('Guardian name')}</label>
                <Input type="text" id="guardianName" {...formik.getFieldProps('guardianName')} />
                {formik.touched.guardianName && formik.errors.guardianName ? (
                  <FormError>{formik.errors.guardianName}</FormError>
                ) : null}
              </FormField>

              <FormField>
                <label htmlFor="guardianSurname">{t('Guardian surname')}</label>
                <Input type="text" id="guardianSurname" {...formik.getFieldProps('guardianSurname')} />
                {formik.touched.guardianSurname && formik.errors.guardianSurname ? (
                  <FormError>{formik.errors.guardianSurname}</FormError>
                ) : null}
              </FormField>

              <FormField>
                <label htmlFor="mobilePhone">{t('Phone number')}</label>
                <Input type="text" id="mobilePhone" {...formik.getFieldProps('mobilePhone')} />
                {formik.touched.mobilePhone && formik.errors.mobilePhone ? (
                  <FormError>{formik.errors.mobilePhone}</FormError>
                ) : null}
              </FormField>

              <FormField>
                <label htmlFor="email">Email</label>
                <Input type="email" id="email" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ? <FormError>{formik.errors.email}</FormError> : null}
              </FormField>
            </Section>
            <SectionTitle onClick={() => setShowSection({ ...showSection, child: !showSection['child'] })}>
              <h2>{t("Child's details")}</h2>
              <IoIosArrowDown />
            </SectionTitle>
            <Section show={showSection['child']}>
              <FormField>
                <label htmlFor="oib">{t("Child's personal identification number (PIN)")}</label>
                <Input
                  type="text"
                  id="oib"
                  {...formik.getFieldProps('oib')}
                  onFocus={() => setShowSection({ ...showSection, guardian: false })}
                />
                {formik.touched.oib && formik.errors.oib ? <FormError>{formik.errors.oib}</FormError> : null}
              </FormField>

              <FormField>
                <label htmlFor="childName">{t("Child's name")}</label>
                <Input type="text" id="childName" {...formik.getFieldProps('childName')} />
                {formik.touched.childName && formik.errors.childName ? (
                  <FormError>{formik.errors.childName}</FormError>
                ) : null}
              </FormField>

              <FormField>
                <label htmlFor="childSurname">{t("Child's surname")}</label>
                <Input type="text" id="childSurname" {...formik.getFieldProps('childSurname')} />
                {formik.touched.childSurname && formik.errors.childSurname ? (
                  <FormError>{formik.errors.childSurname}</FormError>
                ) : null}
              </FormField>

              <FormField>
                <label htmlFor="gender">{t('Gender')}</label>
                <Field as="select" id="gender" {...formik.getFieldProps('gender')}>
                  <Option value="male">{t('Male')}</Option>
                  <Option value="female">{t('Female')}</Option>
                </Field>
                <ErrorMessage name="gender" component="div" />
              </FormField>

              <FormField>
                <label htmlFor="dateOfBirth">{t('Date of birth')}</label>
                <Input type="date" id="dateOfBirth" {...formik.getFieldProps('dateOfBirth')} />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                  <FormError>{formik.errors.dateOfBirth}</FormError>
                ) : null}
              </FormField>

              <FormField>
                <label htmlFor="address">{t('Address')}</label>
                <Input type="text" id="address" {...formik.getFieldProps('address')} />
                {formik.touched.address && formik.errors.address ? (
                  <FormError>{formik.errors.address}</FormError>
                ) : null}
              </FormField>

              <FormField>
                <label htmlFor="city">{t('City')}</label>
                <Input type="text" id="city" {...formik.getFieldProps('city')} />
                {formik.touched.city && formik.errors.city ? <FormError>{formik.errors.city}</FormError> : null}
              </FormField>

              <FormField>
                <label htmlFor="school">{t('School')}</label>
                <Input type="text" id="school" {...formik.getFieldProps('school')} />
                {formik.touched.school && formik.errors.school ? <FormError>{formik.errors.school}</FormError> : null}
              </FormField>
            </Section>

            <CenterContent>
              <Button type="submit">{t('Confirm')}</Button>
            </CenterContent>
          </Form>
        </FormikProvider>
      </CenterContent>
    </PageContainer>
  );
};

export default ManageProjectUserView;
