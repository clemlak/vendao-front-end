import React from 'react';
import { storiesOf } from '@storybook/react';

import Product from '.';

storiesOf('Components/Product', module)
  .add('Standard', () => (
    <Product
      url="https://cdn.shoplightspeed.com/shops/621581/files/14012574/800x1024x2/dr-pepper-dr-pepper-12-oz-4-6-pk.jpg"
      price="2"
      name="Dr Pepper"
    />
  ));
