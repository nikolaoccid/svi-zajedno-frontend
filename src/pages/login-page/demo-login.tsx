import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { RiseLoader } from 'react-spinners';

import { Spinner } from '../../components/spinner/spinner.tsx';
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
const Button = styled.button`
  color: white;
`;

export const DemoLogin = () => {
  const { t } = useTranslation();
  const { login, isLoading } = useLogin({
    email: import.meta.env.VITE_DEMO_EMAIL,
    password: import.meta.env.VITE_DEMO_PASSWORD,
  });
  if (isLoading) {
    return <Spinner SpinnerComponent={RiseLoader} color={'#2196f3'} />;
  }
  return (
    <Container show={import.meta.env.VITE_DEMO_MODE}>
      <Title>Demo login</Title>
      <p>{t('Note: Database restores every 45 minutes')}</p>
      <Button onClick={login}>DEMO</Button>
    </Container>
  );
};
