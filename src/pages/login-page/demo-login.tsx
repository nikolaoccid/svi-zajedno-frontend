import styled from '@emotion/styled';

import { useLogin } from './hooks/use-login.ts';

const Container = styled.div<{ show: string }>`
  display: ${(props) => (props.show === 'true' ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  border: 1px solid #333;
  border-radius: 5px;
  padding: 1vw;
  margin: 2vw;
  width: 100%;
  background-color: #fafafa;
`;

const Title = styled.h3`
  align-self: center;
`;

export const DemoLogin = () => {
  const { login, isLoading } = useLogin({
    email: import.meta.env.VITE_DEMO_EMAIL,
    password: import.meta.env.VITE_DEMO_PASSWORD,
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Container show={import.meta.env.VITE_DEMO_MODE}>
      <Title>Demo login</Title>
      <p>Note: Database restores every 45 minutes</p>
      <button onClick={login}>Demo</button>
    </Container>
  );
};
