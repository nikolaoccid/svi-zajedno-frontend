import { useState } from 'react';

import { ProjectAssociateListView } from '../project-associate-list-view/project-associate-list-view.tsx';

export function ProjectAssociateListViewWrapper() {
  const [associates, setAssociates] = useState({
    items: [],
    meta: { totalItems: 0, itemCount: 0, itemsPerPage: 0, totalPages: 0, currentPage: 0 },
  });
  const [searchQuery, setSearchQuery] = useState('');
  const setCurrentPage = (page: number) => {
    setAssociates((prevState) => ({ ...prevState, meta: { ...prevState.meta, currentPage: page } }));
  };
  return (
    <ProjectAssociateListView
      associates={associates}
      setSearchQuery={setSearchQuery}
      setCurrentPage={setCurrentPage}
      searchQuery={searchQuery}
    />
  );
}
