import { useState } from 'react';

import { GlobalSearch } from '../../../components/global-search/global-search.tsx';
import { CenterContent, PageContainer } from '../../common-styles/common-styles.ts';
import { ManageStudentOnActivity } from './manage-student-on-activity.tsx';

export function ManageStudentOnActivityContainer() {
  const [query, setQuery] = useState<any>(undefined);

  return (
    <PageContainer>
      <CenterContent>
        <GlobalSearch setSearchQuery={setQuery} />
        <ManageStudentOnActivity query={query} />
      </CenterContent>
    </PageContainer>
  );
}
