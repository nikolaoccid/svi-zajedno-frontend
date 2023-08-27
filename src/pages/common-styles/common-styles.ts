import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 20px;
  padding: 1em;
`;

export const Select = styled.select`
  font-family: 'Alegreya Sans', sans-serif;
  width: 100%;
  font-size: 1em;
  padding: 15px 20px;
`;

export const Input = styled.input`
  font-family: 'Alegreya Sans', sans-serif;
  width: 100%;
  font-size: 1em;
  padding: 15px 20px;
`;

export const Button = styled.button`
  background-color: #2196f3;
  //width: 100%;
  font-weight: 800;
  font-family: 'Alegreya Sans', sans-serif;
  text-transform: uppercase;
  border-radius: 4px;
  padding: 20px 30px;
  color: white;
  &:disabled {
    background-color: lightgray;
  }
`;

export const SecondaryButton = styled.button`
  background-color: #f39e21;
  font-weight: 800;
  font-family: 'Alegreya Sans', sans-serif;
  text-transform: uppercase;
  border-radius: 4px;
  padding: 20px 35px;
  color: white;
  &:disabled {
    background-color: lightgray;
  }
`;

export const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  min-width: 600px;
`;

export const AlignRight = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  margin-left: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 45px;
  width: 90%;
`;

export const FormError = styled.div`
  color: #e74c3c;
  font-weight: 500;
`;

export const ProfileSubmenu = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  gap: 20px;
`;
