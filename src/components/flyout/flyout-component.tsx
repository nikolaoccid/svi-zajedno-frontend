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
  shouldShow: boolean;
  flyoutTitle: string;
  onHide: () => void;
  RenderComponent: any;
  flyoutWidth?: string;
}

export function FlyoutComponent({
  flyoutWidth,
  shouldShow,
  flyoutTitle,
  onHide,
  RenderComponent,
}: FlyoutComponentProps) {
  const { data: schoolYear } = useSelectedSchoolYear();
  const { t } = useTranslation();
  return (
    <Flyout
      animationDuration={100}
      show={shouldShow}
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
