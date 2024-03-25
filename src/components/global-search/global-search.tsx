import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg');
  background-size: 13px;
  background-repeat: no-repeat;
  background-position: 10px center;
  padding-left: 35px;
  padding-right: 35px;
  max-width: 310px;
  margin-right: 10px;
  border-radius: 15px;
  border-width: 0px;
  font-family: Axiforma;
  font-style: normal;
  font-size: 16px;
  background-color: #f5f5f5;
`;

const ClearButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  margin: 0;
  background-image: url('https://www.svgrepo.com/show/365893/x-thin.svg');
  background-repeat: no-repeat;
  background-size: 13px;
  background-color: #e0e9ff;
  background-position: center;
  width: 20px;
  height: 20px;
`;

export function GlobalSearch({
  setSearchQuery,
  clearSearch = false,
}: {
  setSearchQuery: (query: string) => void;
  clearSearch?: boolean;
}) {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    if (clearSearch) {
      setSearchText('');
    }
  }, [clearSearch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText) setSearchQuery(searchText);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, setSearchQuery]);

  const handleClear = () => {
    setSearchText('');
    setSearchQuery('');
  };

  return (
    <SearchContainer>
      <Input
        type="search"
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={t('Search')}
        value={searchText}
      />
      {searchText && <ClearButton onClick={handleClear} />}
    </SearchContainer>
  );
}
