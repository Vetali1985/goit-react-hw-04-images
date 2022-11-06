import { useState } from 'react';
import { toast } from 'react-toastify';

import { MdKeyboardAlt } from 'react-icons/md';

import {
  Searchbar,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    setInputValue(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      toast.error(`No name - no images. Please, input your request!`);
      return;
    }

    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <MdKeyboardAlt size={40} />
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>
        <SearchFormInput
          value={inputValue}
          onChange={handleChange}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Searchbar>
  );
};
// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
