import { Slider } from "@mui/material";
import * as React from "react";

function ProductFilters({ maxPrice, priceRange, setPriceRange }: { maxPrice: number, priceRange: [number, number], setPriceRange: (value: [number, number]) => void }) {

  // Update price range when slider changes
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  return (
    <div className="m-3">
      <h1>Filters:</h1>

      {/* Price Range Filter */}
      <p>Price Range</p>
      <div className="w-3/4">
        <Slider
          getAriaLabel={() => "Price range"}
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={maxPrice || 100}
        />
      </div>
    </div>
  );
}

export default ProductFilters;
