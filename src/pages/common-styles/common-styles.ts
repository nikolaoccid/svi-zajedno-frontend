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
  font-family: Axiforma, sans-serif;
  width: 100%;
  font-size: 1em;
  padding: 15px 20px;
`;

export const Input = styled.input`
  font-family: Axiforma, sans-serif;
  width: 100%;
  font-size: 1em;
  padding: 15px 20px;
`;

export const AlignLeft = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;
export const Button = styled.button<{ backgroundColor?: string }>`
  background-color: ${(props) => props.backgroundColor ?? '#1352f1'};
  font-weight: normal;
  font-family: Axiforma, sans-serif;
  font-size: 12px;
  border-radius: 5px;
  padding: 5px 15px;
  color: white;
  &:disabled {
    background-color: lightgray;
  }
`;

export const SecondaryButton = styled.button`
  background-color: #f39e21;
  font-weight: 800;
  font-family: Axiforma, sans-serif;
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
  min-width: 400px;
  gap: 15px;
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
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  gap: 30px;
  width: 100%;
`;
export const HalfWidthDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
