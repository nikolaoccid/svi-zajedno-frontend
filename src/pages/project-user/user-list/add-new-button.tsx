import styled from '@emotion/styled';
import { IoPersonAdd } from 'react-icons/io5';

const Button = styled.button`
  font-family: Axiforma;
  font-weight: 400;
  font-size: 14px;
  background-color: #1352f1;
  color: #ffffff;
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 10px 15px;

  &:disabled {
    background-color: #d3d3d3;
    color: #ffffff;
  }
`;
export function AddNewButton({
  text,
  onClick,
  disabled = false,
}: {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button onClick={() => onClick()} disabled={disabled}>
      {text} <IoPersonAdd />
    </Button>
  );
}
