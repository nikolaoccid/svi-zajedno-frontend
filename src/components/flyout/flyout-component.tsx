import styled from '@emotion/styled';
import { Flyout } from 'pivotal-ui/react/flyout';
import { useTranslation } from 'react-i18next';

import { useSelectedSchoolYear } from '../../pages/dashboard-page/hooks/use-fetch-school-year.ts';
import { HeaderSubtext, HeaderText } from '../../pages/project-user/user-list/user-list-container.tsx';
const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
interface FlyoutComponentProps {
  flyoutTitle: string;
  onHide: () => void;
  RenderComponent: any;
  flyoutWidth?: string;
  showFlyout?: boolean;
}

export function FlyoutComponent({
  flyoutWidth,
  flyoutTitle,
  onHide,
  RenderComponent,
  showFlyout = true,
}: FlyoutComponentProps) {
  const { data: schoolYear } = useSelectedSchoolYear();
  const { t } = useTranslation();
  return (
    <Flyout
      show={showFlyout}
      animationDuration={100}
      width={flyoutWidth}
      header={
        <Column>
          <HeaderText>{flyoutTitle}</HeaderText>
          <HeaderSubtext>
            {t('Academic year')}: {schoolYear?.startYear} / {schoolYear?.endYear}
          </HeaderSubtext>
        </Column>
      }
      onHide={onHide}
    >
      <RenderComponent />
    </Flyout>
  );
}
