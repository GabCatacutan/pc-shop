import { Checkbox, FormControlLabel, Slider } from "@mui/material";
import * as React from "react";

function valuetext(value: number) {
  return `${value}°C`;
}

function ProductFilters() {
  const [value, setValue] = React.useState<number[]>([0, 100]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div className="m-3">
      <h1>Filters:</h1>
      <p>Brand</p>
      <p>Price Range</p>
      <div className="w-3/4">
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </div>
      <p>Availability</p>
      <FormControlLabel control={<Checkbox/>} label="In Stock" />
      <FormControlLabel control={<Checkbox/>} label="Out of Stock" />
    </div>
  );
}

export default ProductFilters;
