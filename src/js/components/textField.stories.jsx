import React, { useState } from 'react';
import TextField from './textField';

export default {
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    label: { control: 'text' },
    autoOptions: { control: 'array' }
  }
};

export const Default = (args) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <div style={{width: 360}}>
      <TextField {...args} id="story-textfield" value={value} update={(v) => setValue(v)} />
      <div style={{marginTop: 8}}>Value: {value}</div>
    </div>
  );
};
Default.args = {
  label: 'Provider',
  value: '',
  validDef: { required: true, restricted: false, options: [] },
  autoOptions: ['Apple', 'Banana', 'Cherry']
};
