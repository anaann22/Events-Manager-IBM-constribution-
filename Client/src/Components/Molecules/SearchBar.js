import React from 'react';
import Input from '../Atoms/Input';
import Button from '../Atoms/Button';

const SearchBar = () => {
  return (
    <>
      <Input />
      <Button label="Press me" className="button" />
    </>
  );
};

export default SearchBar;