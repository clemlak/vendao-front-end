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
  margin-bottom: 15px;
`;

const Label = styled.p`
  margin: 0;
  font-family: 'Open Sans';
  font-size: 16px;
  font-weight: 700;
`;

const Price = styled.p`
  margin: 0;
  font-family: 'Open Sans';
  font-size: 24px;
  font-weight: 700;
`;

function Product(props) {
  const {
    productId,
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
        productId={productId}
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
  productId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
