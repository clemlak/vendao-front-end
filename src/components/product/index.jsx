import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Order from '../order';

const Card = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  padding: 15px;
`;

const Image = styled.div`
  width: 100%;
  height: 180px;
  background-image: url(${props => props.src});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Label = styled.p`
  margin: 0;
  font-family: 'Source Sans Pro';
  font-size: 16px;
  font-weight: 600;
`;

const Price = styled.p`
  margin: 0;
  font-family: 'Source Sans Pro';
  font-size: 24px;
  font-weight: 800;
`;

function Product(props) {
  const {
    name,
    price,
    url,
  } = props;

  const [isModalOpen, toggleModal] = useState(false);

  return (
    <>
      <Order
        isOpen={isModalOpen}
        url={url}
        name={name}
        price={price}
        toggle={() => toggleModal(!isModalOpen)}
      />
      <Card
        onClick={() => toggleModal(!isModalOpen)}
      >
        <Image src={url} />
        <Label>
          {name}
        </Label>
        <Price>
          {price}
        </Price>
      </Card>
    </>
  );
}

export default Product;

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
