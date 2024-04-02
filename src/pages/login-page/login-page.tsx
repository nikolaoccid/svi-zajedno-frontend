import styled from '@emotion/styled';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HalfScreenHero } from '../../components/half-screen-hero/half-screen-hero.tsx';
import { DemoLogin } from './demo-login.tsx';
import { useLogin } from './hooks/use-login.ts';
const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  height: 92vh;
  padding: 1rem;
  gap: 30px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 90%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 0.5rem;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 80%;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, errorApiMessages: errorMessages } = useLogin({ email, password });

  const handleLogin = async () => {
    await login();
  };

  return (
    <>
      <PageContainer>
        <HalfScreenHero />
        <FormContainer>
          <Content>
            <DemoLogin />
            <h1>{t('Login')}</h1>
            <InputContainer>
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
            <Button onClick={handleLogin} disabled={email === '' || password === '' || isLoading}>
              Login
            </Button>
            {errorMessages.map((error, index) => (
              <ErrorMessage key={index}>{error}</ErrorMessage>
            ))}
          </Content>
        </FormContainer>
      </PageContainer>
    </>
  );
}

export default LoginPage;
