// Define the styled components
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const ResponsiveTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border: 1px solid #dddddd;
  font-size: 16px;

  &:nth-of-type(even) {
    background-color: #f39e21;
  }
`;

const TableCell = styled.td`
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
  font-size: 20px;
`;
const HeaderData = styled.th`
  font-weight: bold;
  text-wrap: normal;
  word-wrap: break-word;
`;
const ResponsiveTableComponent = ({ data }) => {
  const { t } = useTranslation();
  return (
    <TableContainer>
      <ResponsiveTable>
        <thead>
          <tr>
            <HeaderData>{t('Category')}</HeaderData>
            <HeaderData>{t('Associates in category')}</HeaderData>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.categoryName}</TableCell>
              <TableCell>{item.totalAssociatesPerCategory}</TableCell>
              <TableCell>{item.totalFreeActivities}</TableCell>
              <TableCell>{item.totalPaidActivities}</TableCell>
              <TableCell>{item.usersAttendingFreeActivities}</TableCell>
              <TableCell>{item.usersAttendingPaidActivities}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </ResponsiveTable>
    </TableContainer>
  );
};

export default ResponsiveTableComponent;
