import styled from '@emotion/styled';

const Container = styled.div<{ status }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 0px 5px;
  height: 20px;
  background-color: ${(props) =>
    props.status === 'active' ? '#5cb85c' : props.status === 'pending' ? '#3e5c74' : '#d9534f'};
`;
const Text = styled.span`
  font-family: Axiforma;
  font-weight: bold;
  font-size: 9px;
  color: white;
`;
export const Status = ({ status }: { status: 'active' | 'pending' | 'inactive' }) => {
  return (
    <Container status={status}>
      <Text>{status === 'active' ? 'AKTIVAN' : status === 'pending' ? 'OBRADA' : 'NEAKTIVAN'}</Text>
    </Container>
  );
};
