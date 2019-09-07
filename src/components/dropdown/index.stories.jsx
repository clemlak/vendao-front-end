import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Dropdown from '.';

const options = [
  {
    text: 'Foo',
    value: 'Foo',
  },
  {
    text: 'Bar',
    value: 'Bar',
  },
  {
    text: 'Beef',
    value: 'Beef',
  },
  {
    text: 'Moo',
    value: 'Moo',
  },
];

storiesOf('Dropdown', module)
  .add('standard', () => (
    <Dropdown
      text="Choose something"
      options={options}
      setValue={val => action(val)}
    />
  ))
  .add('block', () => (
    <Dropdown
      text="Choose something"
      options={options}
      setValue={val => action(val)}
      block
    />
  ));
