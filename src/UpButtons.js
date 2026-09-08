import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function UpButtons({alignment,setAlignment}) {
  

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
    style={{alignSelf:"center"}}
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="done">Done</ToggleButton>
      <ToggleButton value="notDone">Not Done</ToggleButton>
    </ToggleButtonGroup>
  );
}