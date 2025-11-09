import React from 'react';
import Button from './button';

export default {
  title: 'HTML/Button',
  component: Button,
};

export const Primary = (args) => <Button {...args}>Primary</Button>;
Primary.args = {
  className: 'form-button',
  disabled: false,
};

export const Disabled = (args) => <Button {...args}>Disabled</Button>;
Disabled.args = {
  className: 'form-button',
  disabled: true,
};
