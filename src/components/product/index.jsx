import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  padding: 15px;
`;

const Image = styled.img`
  width: 100%;
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

  return (
    <Card>
      <Image src={url} alt={name} />
      <Label>
        {name}
      </Label>
      <Price>
        {price}
      </Price>
    </Card>
  );
}

export default Product;

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
