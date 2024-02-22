import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
const SearchContainer = styled.div`
  width: 30%;
  @media (max-width: 800px) {
    display: none;
  }
`;
const Input = styled.input`
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg');
  background-size: 13px;
  background-repeat: no-repeat;
  background-position: 10px center;
  padding-left: 35px;

  border-radius: 15px;
  border-width: 0px;

  font-family: Axiforma;
  font-style: normal;
  font-size: 16px;
  background-color: #f5f5f5;
`;
export function GlobalSearch({ setSearchQuery }: { setSearchQuery: (query: string) => void }) {
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchText);
      setSearchQuery(searchText);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  return (
    <SearchContainer>
      <Input type="search" placeholder="Search" autoComplete="off" onChange={(e) => setSearchText(e.target.value)} />
    </SearchContainer>
  );
}
