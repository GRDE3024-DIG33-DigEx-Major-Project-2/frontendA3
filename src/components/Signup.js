import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SignUp() {
  const [accountType, setAccountType] = React.useState('');

  const handleChange = (event) => {
    setAccountType(event.target.value);
  };

  return (
    <>
    <div class="signup">
    <div class="signup-left">
    <Box class="signup-form"  alignItems="center"
  justifyContent="center" sx={{ maxWidth: 450}}>
        <div class="signup-logo">
        <img src="../gigney-logo-white.jpg" alt="gigney logo white" />
        </div>
        <h1>Create an account</h1>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">What would you like to do on this site?</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={accountType}
          label="What would you like to do on this site?"
          onChange={handleChange}
        >
          <MenuItem value={'guest'}>Search for events</MenuItem>
          <MenuItem value={'organiser'}>Create an event</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <div class="signup-next-button">
                        <button class="next-button">Continue</button>
                    </div>
    </div>
  
    <div class="signup-right"></div>
    </div>
    </>
  );
};

export default SignUp;