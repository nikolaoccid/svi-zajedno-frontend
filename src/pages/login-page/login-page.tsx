import styled from '@emotion/styled';
import { useState } from 'react';

import heroLoginImage from '/hero-login.jpeg';

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
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 92vh;
  padding: 1rem;
  gap: 30px;
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
const LoginHero = styled.div`
  width: 50%;
  background-image: url(${heroLoginImage});
  height: 97vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, errorApiMessages: errorMessages } = useLogin({ email, password });

  const handleLogin = async () => {
    await login();
  };

  return (
    <>
      <PageContainer>
        <LoginHero />
        <FormContainer>
          <h1>Prijavi se u svoj racun</h1>
          <div>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleLogin} disabled={email === '' || password === '' || isLoading}>
            Login
          </Button>
          {errorMessages.map((error, index) => (
            <ErrorMessage key={index}>{error}</ErrorMessage>
          ))}
        </FormContainer>
      </PageContainer>
    </>
  );
}

export default LoginPage;
