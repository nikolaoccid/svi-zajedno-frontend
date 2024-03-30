import styled from '@emotion/styled';
import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { useTranslation } from 'react-i18next';

import { DashboardHeader } from '../../components/dashboard-header/dashboard-header.tsx';
import { HeaderText } from '../../components/header-text-with-subtext/header-text-with-subtext.tsx';
import { Navigation } from '../../components/navigation/navigation.tsx';
import { Select } from '../common-styles/common-styles.ts';
import { ContentContainer, DashboardContainer } from '../dashboard/dashboard.tsx';
import { Divider } from '../project-user/user-list/user-list.tsx';

const SingleSetting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  padding: 2vw 3vw 2vw 1vw;
`;
const SettingsSelect = styled(Select)`
  padding: 1vw 1vw;
  background-color: #d6d7da;
  //background-color: #d6d7da;
  border-radius: 1vw;
  border-width: 0;
  color: #424242;
  width: 20vw;
`;

export function Settings() {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState({ language: i18n.language });
  const onLanguageChange = (event) => {
    setSettings({ ...settings, language: event.target.value });
  };

  useAsync(async () => {
    await i18n.changeLanguage(settings.language);
  }, [settings.language]);

  return (
    <DashboardContainer>
      <Navigation />
      <ContentContainer>
        <DashboardHeader text={t('Settings')} showSubtext={false} />
        <SingleSetting>
          <HeaderText>{t('Choose language')}</HeaderText>
          <SettingsSelect onChange={onLanguageChange}>
            <option value="en">{t('English')}</option>
            <option value="hr"> {t('Croatian')}</option>
          </SettingsSelect>
        </SingleSetting>
        <Divider />
      </ContentContainer>
    </DashboardContainer>
  );
}
