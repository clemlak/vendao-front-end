import React from 'react';
import { storiesOf } from '@storybook/react';

import Order from '.';

storiesOf('Components/Order', module)
  .add('Standard', () => (
    <Order
      url="https://cdn.shoplightspeed.com/shops/621581/files/14012574/800x1024x2/dr-pepper-dr-pepper-12-oz-4-6-pk.jpg"
      price="2"
      name="Dr Pepper"
    />
  ));
