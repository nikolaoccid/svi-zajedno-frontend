import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { RiseLoader } from 'react-spinners';
import * as Yup from 'yup';

import { api } from '../../../api';
import {
  CreateUserRequestDtoUserRequestCategoryEnum,
  CreateUserRequestDtoUserRequestStatusEnum,
} from '../../../api/codegen';
import { Spinner } from '../../../components/spinner/spinner.tsx';
import { toastError, toastSuccess } from '../../../utils/toast.ts';
import { Button, CenterContent, FormError, FormField } from '../../common-styles/common-styles.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useStudentOnSchoolYear } from '../../student-on-school-year/hooks/get-student-on-school-year.ts';
import { useGetUserRequest, useGetUserRequests } from './hooks/use-get-user-requests.ts';
import { useProjectUser } from './hooks/use-project-user.ts';
const validationSchema = Yup.object({
  userRequestTitle: Yup.string().required('Required'),
  userRequestQuantity: Yup.number().required('Required'),
  userRequestCostPerUnit: Yup.number().required('Required'),
  userRequestStoreInfo: Yup.string().required('Required'),
  userRequestStatus: Yup.string().required('Required'),
  userRequestCategory: Yup.string().required('Required'),
});
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 45px;
  width: 90%;
`;
export function AddEditRequestView() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { startYear, userId, activityId, requestId } = useParams();
  const { data: schoolYear } = useSchoolYear(startYear ? parseInt(startYear) : 0);
  const schoolYearId = (schoolYear && schoolYear.id) ?? 0;
  const { data: projectUser } = useProjectUser(userId);
  const { data: studentOnSchoolYear } = useStudentOnSchoolYear(schoolYearId, projectUser?.id);
  const { data: userRequests } = useGetUserRequests((studentOnSchoolYear as any)?.id, parseInt(activityId ?? '0'));
  const userRequest = useGetUserRequest(parseInt(requestId ?? '0'), userRequests);

  const formik = useFormik({
    initialValues: {
      userRequestStatus: (requestId && userRequest?.userRequestStatus) ?? 'approved',
      userRequestCategory: (requestId && userRequest?.userRequestCategory) ?? 'sportsequipment',
      userRequestTitle: (requestId && userRequest?.userRequestTitle) ?? '',
      userRequestDescription: (requestId && userRequest?.userRequestDescription) ?? '',
      userRequestQuantity: (requestId && userRequest?.userRequestQuantity) ?? 1,
      userRequestCostPerUnit: (requestId && userRequest?.userRequestCostPerUnit) ?? 0,
      userRequestStoreInfo: (requestId && userRequest?.userRequestStoreInfo) ?? '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const userRequest = {
        studentOnActivityId: parseInt(activityId ?? '0'),
        studentOnSchoolYearId: (studentOnSchoolYear as any)?.id,
        userRequestStatus: values.userRequestStatus as CreateUserRequestDtoUserRequestStatusEnum,
        userRequestCategory: values.userRequestCategory as CreateUserRequestDtoUserRequestCategoryEnum,
        userRequestTitle: values.userRequestTitle,
        userRequestDescription: values.userRequestDescription,
        userRequestQuantity: values.userRequestQuantity ? values.userRequestQuantity : undefined,
        userRequestCostPerUnit: values.userRequestCostPerUnit as number,
        userRequestStoreInfo: values.userRequestStoreInfo,
      };
      if (!requestId) {
        try {
          console.log('create');
          await api.createUserRequests(userRequest);
          await queryClient.invalidateQueries(['getUserRequests', (studentOnSchoolYear as any)?.id]);
          toastSuccess(t('Operation successful'));
          navigate(`/${startYear}/users/${userId}/activities/${activityId}`);
        } catch (e) {
          toastError(t('Error, try again'));
        }
      } else {
        try {
          console.log('update');
          const res = await api.updateUserRequests(requestId, {
            ...userRequest,
            id: parseInt(requestId),
          });
          console.log('res', res);
          await queryClient.invalidateQueries(['getUserRequests', (studentOnSchoolYear as any)?.id]);
          toastSuccess(t('Operation successful'));
          navigate(`/${startYear}/users/${userId}/activities/${activityId}`);
        } catch (e) {
          console.log('error', e);
          toastError(t('Error, try again'));
        }
      }
    },
    enableReinitialize: true,
  });

  if (formik.isSubmitting) {
    return <Spinner SpinnerComponent={RiseLoader} color={'#2196f3'} />;
  }
  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <FormField>
          <label htmlFor="userRequestTitle">{t('Title')}</label>
          <input type="text" id="userRequestTitle" {...formik.getFieldProps('userRequestTitle')} />
          {formik.touched.userRequestTitle && formik.errors.userRequestTitle ? (
            <FormError>{formik.errors.userRequestTitle}</FormError>
          ) : null}
        </FormField>

        <FormField>
          <label htmlFor="userRequestDescription">{t('Description')}</label>
          <input type="text" id="userRequestDescription" {...formik.getFieldProps('userRequestDescription')} />
          {formik.touched.userRequestDescription && formik.errors.userRequestDescription ? (
            <FormError>{formik.errors.userRequestDescription}</FormError>
          ) : null}
        </FormField>

        <FormField>
          <label htmlFor="userRequestQuantity">{t('Quantity')}</label>
          <input type="number" id="userRequestQuantity" {...formik.getFieldProps('userRequestQuantity')} />
          {formik.touched.userRequestQuantity && formik.errors.userRequestQuantity ? (
            <FormError>{formik.errors.userRequestQuantity}</FormError>
          ) : null}
        </FormField>

        <FormField>
          <label htmlFor="userRequestCostPerUnit">{t('Price per unit')}</label>
          <input type="number" id="userRequestCostPerUnit" {...formik.getFieldProps('userRequestCostPerUnit')} />
          {formik.touched.userRequestCostPerUnit && formik.errors.userRequestCostPerUnit ? (
            <FormError>{formik.errors.userRequestCostPerUnit}</FormError>
          ) : null}
        </FormField>

        <FormField>
          <label htmlFor="userRequestStoreInfo">{t('Store')}</label>
          <input type="text" id="userRequestStoreInfo" {...formik.getFieldProps('userRequestStoreInfo')} />
          {formik.touched.userRequestStoreInfo && formik.errors.userRequestStoreInfo ? (
            <FormError>{formik.errors.userRequestStoreInfo}</FormError>
          ) : null}
        </FormField>

        <FormField>
          <label htmlFor="userRequestStatus">Status</label>
          <Field as="select" id="userRequestStatus" {...formik.getFieldProps('userRequestStatus')}>
            <option value="approved">{t('Approved')}</option>
            <option value="pending">{t('Pending')}</option>
            <option value="rejected">{t('Rejected')}</option>
          </Field>
          <ErrorMessage name="userRequestStatus" component="div" />
        </FormField>

        <FormField>
          <label htmlFor="userRequestCategory">{t('Category')}</label>
          <Field as="select" id="userRequestCategory" {...formik.getFieldProps('userRequestCategory')}>
            <option value="sportsequipment">{t('Sports equipment')}</option>
            <option value="other">{t('Other')}</option>
          </Field>
          <ErrorMessage name="userRequestCategory" component="div" />
        </FormField>

        <CenterContent>
          <Button type="submit">{t('Confirm')}</Button>
        </CenterContent>
      </Form>
    </FormikProvider>
  );
}
