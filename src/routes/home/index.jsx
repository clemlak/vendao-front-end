import React from 'react';
import {
  Flex,
  Box,
} from 'reflexbox';

import Product from '../../components/product';
import Products from '../../common/products';

function displayProducts(products) {
  console.log('Products length:', products.length);
  console.log('Products length % 4:', products.length / 4);


  const display = [];

  for (let i = 0; i < products.length / 4; i += 1) {
    const rows = [];

    for (let j = 0; j < 4; j += 1) {
      rows.push(
        <Box width={[1, 1 / 2, 1 / 3, 1 / 4]} p={3} key={i + j}>
          <Product
            name={products[i + j].name}
            url={products[i + j].url}
            price={products[i + j].price}
          />
        </Box>,
      );
    }

    display.push(
      <Flex>
        {rows}
      </Flex>,
    );
  }

  for (let i = 0; i < products.length % 4; i += 4) {
    const rows = [];

    for (let j = 0; j < products.length % 4; j += 1) {
      rows.push(
        <Box width={[1, 1 / 2, 1 / 3, 1 / 4]} p={3} key={i + j * 2}>
          <Product
            name={products[i + j].name}
            url={products[i + j].url}
            price={products[i + j].price}
          />
        </Box>,
      );
    }

    display.push(
      <Flex>
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
