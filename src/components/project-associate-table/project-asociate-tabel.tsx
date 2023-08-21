import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { CenterContent, PageContainer } from '../../pages/common-styles/common-styles.ts';

const TableContainer = styled.div`
  width: 100%;
`;

const ClubNameLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    color:#e74c3c
    text-decoration: underline;
  }
`;
const Item = styled.div`
  display: flex;
  gap: 25px;
`;

const ProjectAssociateTable = ({ data, goTo }) => {
  return (
    <PageContainer>
      <CenterContent>
        <TableContainer>
          {data.map((item) => (
            <Item key={item.id}>
              <ClubNameLink to={goTo}>{item.clubName}</ClubNameLink>
            </Item>
          ))}
        </TableContainer>
      </CenterContent>
    </PageContainer>
  );
};

export default ProjectAssociateTable;
