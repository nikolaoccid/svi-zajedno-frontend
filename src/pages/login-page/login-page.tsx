import styled from '@emotion/styled';
import { useState } from 'react';

import Header from '../../components/header/header.tsx';
import { useLogin } from './hooks/use-login.ts';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 600px;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { login, isLoading, errorApiMessages: errorMessages } = useLogin({ email, password });

  const handleLogin = async () => {
    await login();
  };

  return (
    <>
      <Header />
      <PageContainer>
        <FormContainer>
          <h2>Login to Your Account</h2>
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
