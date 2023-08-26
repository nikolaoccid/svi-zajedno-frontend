import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgray;
  padding: 10px 10px;
`;
const Text = styled.span``;
export const Status = ({ status }: { status: 'active' | 'pending' | 'inactive' }) => {
  return (
    <Container>
      <Text>{status.toUpperCase()}</Text>
    </Container>
  );
};
