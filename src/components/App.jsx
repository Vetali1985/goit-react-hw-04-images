import { useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { SearchBar } from './SearchBar/SearchBar';

import api from '../service/FetchApi';

import 'react-toastify/dist/ReactToastify.css';
import { Wrapper } from './App.styled';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (inputValue && page) {
      setStatus('pending');

      api(inputValue, page)
        .then(resp => {
          if (resp.total === 0) {
            setStatus('rejected');
          }
          setImages(prevState => [...prevState, ...resp.hits]);
          setStatus('resolved');
        })
        .catch(error => {
          setStatus('rejected');
        });
    }
  }, [inputValue, page]);

  const handleFormSubmit = inputValue => {
    setInputValue(inputValue);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(state => state + 1);
  };

  // const { images, status } = useState;
  return (
    <Wrapper>
      <SearchBar onSubmit={handleFormSubmit} />
      {images && <ImageGallery data={images} />}
      {status === 'pending' && <Loader />}
      {images.length >= 12 && status === 'resolved' && (
        <Button onClick={loadMore} />
      )}

      <ToastContainer />
    </Wrapper>
  );
}
