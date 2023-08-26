import styled from '@emotion/styled';

const Container = styled.div<{ status }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 10px 20px;
  background-color: ${(props) =>
    props.status === 'active' ? '#5cb85c' : props.status === 'pending' ? '#3e5c74' : '#d9534f'};
`;
const Text = styled.span`
  font-family: 'Alegreya Sans', sans-serif;
  font-weight: 500;
  color: white;
`;
export const Status = ({ status }: { status: 'active' | 'pending' | 'inactive' }) => {
  return (
    <Container status={status}>
      <Text>{status === 'active' ? 'AKTIVAN' : status === 'pending' ? 'OBRADA' : 'NEAKTIVAN'}</Text>
    </Container>
  );
};
