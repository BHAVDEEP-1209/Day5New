import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Method(props) {
    const handleChange = (e)=>{
        props.state.setFormValues(prev=> {
            return {
                ...prev,
                "method" : e.target.value
            }
        })
    }
    // console.log("rendering data!");
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Method:</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        // defaultValue={props.state.formValues.method}
        onChange={handleChange}
      >
        <FormControlLabel value="product" control={<Radio />} label="Product" />
        <FormControlLabel value="draft" control={<Radio />} label="Draft" />
        
      </RadioGroup>
    </FormControl>
  );
}