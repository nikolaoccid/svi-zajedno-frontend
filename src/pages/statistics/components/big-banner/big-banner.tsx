import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 350px;

  background-color: #f39e21;
  padding: 5px 10px;
  border-radius: 5px;
  color: #004279;
  font-weight: bold;
`;
const Text = styled.div`
  font-size: 22px;
  word-break: break-all
  width: 70%;
`;
const Counter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45%;
  font-size: 45px;
`;
export const BigBanner = ({ text, count, euro = false }) => {
  return (
    <Container>
      <Text>{text.toUpperCase()}</Text>
      <Counter>
        {count}
        {euro ? ' €' : ''}
      </Counter>
    </Container>
  );
};
