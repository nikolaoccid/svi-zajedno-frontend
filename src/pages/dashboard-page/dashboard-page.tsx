import { useParams } from 'react-router-dom';

import { PageContainer } from '../common-styles/common-styles.ts';

export function DashboardPage() {
  const { startYear } = useParams();
  console.log('dashboard -> params', startYear);
  return (
    <PageContainer>
      <h1>Dashboard page</h1>
    </PageContainer>
  );
}
