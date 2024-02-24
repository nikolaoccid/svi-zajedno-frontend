import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const SearchContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg');
  background-size: 13px;
  background-repeat: no-repeat;
  background-position: 10px center;
  padding-left: 35px;
  padding-right: 35px; /* Add padding for the "x" button */

  border-radius: 15px;
  border-width: 0px;

  font-family: Axiforma;
  font-style: normal;
  font-size: 16px;
  background-color: #f5f5f5;
`;

const ClearButton = styled.button`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

export function GlobalSearch({ setSearchQuery }: { setSearchQuery: (query: string) => void }) {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText) setSearchQuery(searchText);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, setSearchQuery]);

  const handleClearSearch = () => {
    setSearchText('');
    setSearchQuery('');
  };

  return (
    <SearchContainer>
      <Input
        type="search"
        placeholder="Search"
        autoComplete="off"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
      <ClearButton onClick={handleClearSearch}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path d="M13.354 3.646a.5.5 0 0 0-.708 0L8 8.293 3.354 3.646a.5.5 0 0 0-.708.708L7.293 8l-4.647 4.646a.5.5 0 0 0 .708.708L8 8.707l4.646 4.647a.5.5 0 0 0 .708-.708L8.707 8l4.647-4.646a.5.5 0 0 0 0-.708z" />
        </svg>
      </ClearButton>
    </SearchContainer>
  );
}
