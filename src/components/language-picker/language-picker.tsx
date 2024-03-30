import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { PiGlobeLight } from 'react-icons/pi';

const Container = styled.div<{ hidePicker: string }>`
  display: ${(props) => (props.hidePicker === 'true' ? 'none' : 'block')};
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999;
  cursor: pointer;
  padding: 1vw;
`;

const Slider = styled.div`
  width: 9vw;
  height: 3vw;
  background-color: #ccc;
  border-radius: 1vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Option = styled.div<{ isActive: boolean }>`
  flex: 1;
  text-align: center;
  padding: 1vw;
  font-family: Axiforma;
  font-size: 1vw;
  color: ${(props) => (props.isActive ? 'black' : 'gray')};
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
  transition:
    color 0.3s ease,
    font-weight 0.3s ease;
`;

export function LanguagePicker() {
  const { i18n } = useTranslation();
  const toggleLanguage = async () => {
    const newLanguage = i18n.language === 'en' ? 'hr' : 'en';
    await i18n.changeLanguage(newLanguage);
  };

  return (
    <Container onClick={toggleLanguage} hidePicker={import.meta.env.VITE_HIDE_LANGUAGE_PICKER}>
      <Slider>
        <Option isActive={i18n.language === 'en'}>EN</Option>
        <PiGlobeLight />
        <Option isActive={i18n.language === 'hr'}>HR</Option>
      </Slider>
    </Container>
  );
}
