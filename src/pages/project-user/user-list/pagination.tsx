import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
`;
const PageButton = styled.button<{ active: boolean }>`
  border: 1px solid #e0e9ff;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #e0e9ff;

  &:hover {
    background-color: #041643;
  }
  ${({ active }) =>
    active &&
    `
    background-color: #041643;
    color: #ffffff;
  `}
`;
export function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname.includes('page')) {
      const page = pathname.split('page=')[1];
      setCurrentPage(parseInt(page));
    }
  }, [pathname, setCurrentPage]);
  const onButtonClick = (page: number) => {
    setCurrentPage(page);
    navigate(pathname + `?page=${page}`);
  };
  return (
    <PaginationContainer>
      {Array.from({ length: totalPages }, (_, index) => (
        <PageButton active={currentPage === index + 1} key={index + 1} onClick={() => onButtonClick(index + 1)}>
          {index + 1}
        </PageButton>
      ))}
    </PaginationContainer>
  );
}
