import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: row;

  background-color: #f39e21;
  padding: 5px 10px;
  border-radius: 5px;
  color: #004279;
  font-weight: bold;
`;
const Text = styled.div`
  width: 70%;
`;
const Counter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  font-size: 30px;
`;
export const SmallBanner = ({ text, count }) => {
  return (
    <Container>
      <Text>{text.toUpperCase()}</Text>
      <Counter> {count}</Counter>
    </Container>
  );
};
