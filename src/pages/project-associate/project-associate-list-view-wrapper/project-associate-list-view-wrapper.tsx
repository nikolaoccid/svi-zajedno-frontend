import { useEffect, useState } from 'react';
import { useAsync } from 'react-async-hook';

import { ProjectAssociateListView } from '../project-associate-list-view/project-associate-list-view.tsx';
import { useProjectAssociates } from '../project-associate-search-view/hooks/use-project-associates.ts';

export function ProjectAssociateListViewWrapper() {
  const [associates, setAssociates] = useState({
    items: [],
    meta: { totalItems: 0, itemCount: 0, itemsPerPage: 0, totalPages: 0, currentPage: 2 },
  });

  const {
    execute: getProjectAssociates,
    error: isError,
    loading: isLoading,
  } = useProjectAssociates(associates.meta.currentPage);
  const [searchQuery, setSearchQuery] = useState('');
  const setCurrentPage = (page: number) => {
    setAssociates((prevState) => ({ ...prevState, meta: { ...prevState.meta, currentPage: page } }));
  };
  useAsync(async () => {
    const response = await getProjectAssociates(searchQuery);
    setAssociates(response as any);
  }, [searchQuery]);

  useEffect(() => {
    console.log('associates', associates);
  }, [associates]);
  if (isError || isLoading) return <>Loading</>;
  return (
    <ProjectAssociateListView
      associates={associates}
      setSearchQuery={setSearchQuery}
      setCurrentPage={setCurrentPage}
      searchQuery={searchQuery}
    />
  );
}
