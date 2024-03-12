import styled from '@emotion/styled';
import { IconType } from 'react-icons';
import { IoPersonAdd } from 'react-icons/io5';

const Button = styled.button<{ maxWidth: string }>`
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
  max-width: ${(props) => props.maxWidth};

  &:disabled {
    background-color: #d3d3d3;
    color: #ffffff;
  }
`;
export function AddNewButton({
  text,
  onClick,
  disabled = false,
  maxWidth = '380px',
  Icon = IoPersonAdd,
}: {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  maxWidth?: string;
  Icon?: IconType;
}) {
  return (
    <Button onClick={() => onClick()} disabled={disabled} maxWidth={maxWidth}>
      {text} <Icon />
    </Button>
  );
}
