// Define the styled components
import styled from '@emotion/styled';

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const ResponsiveTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  th {
    background-color: #f2f2f2;
    border: 1px solid #dddddd;
    padding: 8px;
    text-align: left;
  }
`;

const TableRow = styled.tr`
  border: 1px solid #dddddd;

  &:nth-child(even) {
    background-color: #f39e21;
  }
`;

const TableCell = styled.td`
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
  font-size: 16px;
`;

const ResponsiveTableComponent = ({ data }) => {
  console.log(data);
  return (
    <TableContainer>
      <ResponsiveTable>
        <TableHead>
          <tr>
            <th>Kategorija</th>
            <th>Broj suradnika u kategoriji</th>
            <th>Ukupno besplatnih aktivnosti</th>
            <th>Ukupno placenih aktivnosti</th>
            <th>Korisnici koji pohadaju besplatne aktivnosti</th>
            <th>Korisnici koji pohadaju placene aktivnosti</th>
          </tr>
        </TableHead>
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
