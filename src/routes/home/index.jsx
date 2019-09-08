import React from 'react';
import {
  Flex,
  Box,
} from 'reflexbox';

import Product from '../../components/product';
import Products from '../../common/products';

function displayProducts(products) {
  const display = [];

  for (let i = 0; i < products.length / 2; i += 1) {
    const rows = [];

    for (let j = 0; j < 2; j += 1) {
      rows.push(
        <Box width={1 / 2} p={3} key={i + j}>
          <Product
            name={products[i + j].name}
            url={products[i + j].url}
            price={products[i + j].price}
            productId={products[i + j].productId}
          />
        </Box>,
      );
    }

    display.push(
      <Flex key={`flex${i}`}>
        {rows}
      </Flex>,
    );
  }

  return display;
}

function Home() {
  return displayProducts(Products);
}

export default Home;
