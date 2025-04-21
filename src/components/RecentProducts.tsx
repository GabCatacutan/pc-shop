import { Box, IconButton, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Product } from "../common/types";
import supabase from "../config/supabase";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

const fetchRecentProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .order("created_at", { ascending: false })
    .limit(9);

  if (error) throw error;

  return data;
};

function RecentProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    data: recentProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: fetchRecentProducts,
  });

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading products.</Typography>;

  return (
    <>
    <h2>Recently Added Products</h2>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={handleScrollLeft}>
          <ArrowBackIos />
        </IconButton>

        <Box
          ref={scrollRef}
          sx={{
            overflowX: "auto",
            display: "flex",
            gap: 3, // Increased gap
            px: 4, // Add more horizontal padding
            py: 2,
            scrollBehavior: "smooth",
          }}
        >
          {recentProducts?.map((product, index) => (
            <Box sx={{ minWidth: 250 }} key={index}>
              {" "}
              {/* Minimum width for product card */}
              <ProductCard {...product} />
            </Box>
          ))}
        </Box>

        <IconButton onClick={handleScrollRight}>
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </>
  );
}

export default RecentProducts;
