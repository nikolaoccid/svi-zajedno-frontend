import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import backBttnImg from '/back-button.png';
const Content = styled.div`
  cursor: pointer;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const Img = styled.img`
  max-width: 30px;
`;

export function BackButton() {
  const navigation = useNavigate();

  const handleBack = () => {
    navigation(-1);
  };
  return (
    <Content onClick={handleBack}>
      <Img src={backBttnImg} />
      <h3>Natrag</h3>
    </Content>
  );
}
