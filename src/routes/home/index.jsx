import React from 'react';
import {
  Flex,
  Box,
} from 'reflexbox';

import Product from '../../components/product';

function Home() {
  return (
    <Flex>
      <Box width={1 / 4} p={3}>
        <Product
          label="Dr Pepper"
          url="https://cdn.shoplightspeed.com/shops/621581/files/14012574/800x1024x2/dr-pepper-dr-pepper-12-oz-4-6-pk.jpg"
          price="2"
          name="Dr Pepper"
        />
      </Box>
      <Box width={1 / 4} p={3}>
        <Product
          label="Dr Pepper"
          url="https://cdn.shoplightspeed.com/shops/621581/files/14012574/800x1024x2/dr-pepper-dr-pepper-12-oz-4-6-pk.jpg"
          price="2"
          name="Dr Pepper"
        />
      </Box>
      <Box width={1 / 4} p={3}>
        <Product
          label="Dr Pepper"
          url="https://cdn.shoplightspeed.com/shops/621581/files/14012574/800x1024x2/dr-pepper-dr-pepper-12-oz-4-6-pk.jpg"
          price="2"
          name="Dr Pepper"
        />
      </Box>
      <Box width={1 / 4} p={3}>
        <Product
          label="Dr Pepper"
          url="https://cdn.shoplightspeed.com/shops/621581/files/14012574/800x1024x2/dr-pepper-dr-pepper-12-oz-4-6-pk.jpg"
          price="2"
          name="Dr Pepper"
        />
      </Box>
    </Flex>
  );
}

export default Home;
