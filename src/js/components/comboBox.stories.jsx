import React, { useState } from 'react';
import ComboBox from './comboBox';

export default {
  title: 'Components/ComboBox',
  component: ComboBox,
  argTypes: {
    data: { control: 'array' },
    selected: { control: 'text' }
  }
};

export const Default = (args) => {
  const [value, setValue] = useState(args.selected || (args.data && args.data[0]) || '');
  return (
    <div>
      <ComboBox {...args} selected={value} handleChange={(v) => setValue(v)} />
      <div style={{marginTop: 8}}>Selected: {value}</div>
    </div>
  );
};
Default.args = {
  id: 'story-combobox',
  data: ['Option A', 'Option B', 'Option C'],
  selected: 'Option A',
};
