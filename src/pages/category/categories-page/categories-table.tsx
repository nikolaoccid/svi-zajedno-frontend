import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { GoDotFill } from 'react-icons/go';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { GridLoader } from 'react-spinners';

import { deleteCategory } from '../../../api/api.ts';
import { Spinner } from '../../../components/spinner/spinner.tsx';
import { toastError, toastSuccess } from '../../../utils/toast.ts';
import { useSelectedSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';

const TableContainer = styled.div`
  height: 100%;
  padding: 0px 25px 0 25px;
  width: 100%;
`;
const TableRow = styled.tr`
  &:hover {
    background-color: #faf9f9;
    border-radius: 10px;
    cursor: default;
  }
`;
const TableDataLeft = styled.td`
  text-align: left;
`;
const Table = styled.table`
  font-family: Axiforma;
  font-size: 14px;
  color: #696969;
  font-weight: normal;
`;
const Icon = styled.td`
  width: 2%;
  padding-top: 10px;
  padding-right: 10px;
  white-space: nowrap;
  cursor: pointer;
`;
export function CategoriesTable({
  data,
}: {
  data: {
    items: any[];
    meta: { totalItems: number; itemCount: number; itemsPerPage: number; totalPages: number; currentPage: number };
  };
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: schoolYear, isLoading } = useSelectedSchoolYear();
  const onEditClick = (category) => {
    navigate(`/${schoolYear?.startYear}/categories/${category.id}/edit`);
  };
  const onDeleteClick = async (category) => {
    try {
      await deleteCategory(category.id);
      await queryClient.invalidateQueries(['getCategories']);
      toastSuccess(t('Operation successfull'));
    } catch (e) {
      toastError(t('Error, try again'));
    }
  };

  if (isLoading) {
    return <Spinner SpinnerComponent={GridLoader} color={'#2196f3'} />;
  }
  return (
    <TableContainer>
      <Table>
        <tbody>
          {data &&
            data.items.map((category, i) => (
              <TableRow key={i}>
                <Icon>
                  <GoDotFill size={18} color={'#00193f'} />
                </Icon>
                <TableDataLeft>{category.categoryName}</TableDataLeft>
                <Icon>
                  <MdEdit size={18} color={'#00193f'} onClick={() => onEditClick(category)} />
                  <MdDelete size={18} color={'#00193f'} onClick={() => onDeleteClick(category)} />
                </Icon>
              </TableRow>
            ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}
