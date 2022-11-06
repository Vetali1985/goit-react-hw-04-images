import { useState } from 'react';

import { Modal } from 'components/Modal/Modal';

import PropTypes from 'prop-types';

import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Item onClick={toggleModal}>
        <Image src={webformatURL} alt={tags} />
      </Item>
      {showModal && (
        <Modal largeImageURL={largeImageURL} alt={tags} onClose={toggleModal} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
