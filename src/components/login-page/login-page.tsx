import styled from '@emotion/styled';
import { useState } from 'react';

import Header from '../header/header.tsx';

const PageContainer = styled.div`
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.div`
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
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleLogin = () => {
    // TODO call backend

    const response = {
      statusCode: 400,
      message: ['email must be an email', 'password should not be empty'],
      error: 'Bad Request',
    };

    if (response.statusCode === 400 && response.message) {
      setErrorMessages(response.message);
    } else {
      setErrorMessages([]);
    }
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
          <Button onClick={handleLogin} disabled={email === '' || password === ''}>
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
