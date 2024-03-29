import styled from '@emotion/styled';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PiGlobeLight } from 'react-icons/pi';

const Container = styled.div<{ hidePicker: string }>`
  display: ${(props) => {
    console.log(props.hidePicker);
    return props.hidePicker === 'true' ? 'none' : 'block';
  }};
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
  const defaultLanguage = import.meta.env.VITE_I18N_DEFAULT_LOCALE ?? 'en';
  console.log('def lan', defaultLanguage);
  const [isEnglish, setIsEnglish] = useState(defaultLanguage === 'en');
  const toggleLanguage = async () => {
    const newLanguage = isEnglish ? 'hr' : 'en';
    setIsEnglish(!isEnglish);
    await i18n.changeLanguage(newLanguage);
  };

  // const hidePickerBool = import.meta.env.HIDE_LANGUAGE_PICKER === 'true';
  // console.log(
  //   'hidePickerBool',
  //   hidePickerBool,
  //   'VITE_HIDE_PICKER',
  //   import.meta.env.VITE_HIDE_LANGUAGE_PICKER,
  //   typeof import.meta.env.VITE_HIDE_LANGUAGE_PICKER,
  // );

  return (
    <Container onClick={toggleLanguage} hidePicker={import.meta.env.VITE_HIDE_LANGUAGE_PICKER}>
      <Slider>
        <Option isActive={isEnglish}>EN</Option>
        <PiGlobeLight />
        <Option isActive={!isEnglish}>HR</Option>
      </Slider>
    </Container>
  );
}
