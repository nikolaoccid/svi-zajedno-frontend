import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { GoDotFill } from 'react-icons/go';
const TableContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 10px 25px 0 25px;
`;
const TableRow = styled.tr`
  &:hover {
    background-color: #faf9f9;
    border-radius: 10px;
    cursor: pointer;
  }
`;
const TableData = styled.td`
  padding-top: 10px;
`;
const Table = styled.table`
  font-family: Axiforma;
  font-size: 14px;
  color: #696969;
  font-weight: normal;
  width: 100%;
`;
const Icon = styled.td`
  width: 2%;
  padding-top: 10px;
  padding-right: 10px;
  white-space: nowrap;
  gap: 12px;
`;
export function StudentOnActivityTable({
  activities,
  onActivityClick,
}: {
  activities: any;
  onActivityClick: (activity: any) => void;
}) {
  const { t } = useTranslation();
  return (
    <TableContainer>
      <Table>
        <tbody>
          {activities && activities?.length !== 0 ? (
            activities.map((item) => (
              <TableRow key={item.id} onClick={() => onActivityClick(item)}>
                <Icon>
                  <GoDotFill size={18} color={'#00193f'} />
                </Icon>
                <TableData>{item.projectAssociate.clubName}</TableData>
                <TableData>{item.activityName}</TableData>
                <TableData>{item.activityPrice ? item.activityPrice + '€' : t('Free')}</TableData>
              </TableRow>
            ))
          ) : (
            <tr>
              <TableData>{t('No available activities')}</TableData>
            </tr>
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
}
