import { FC } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Box,
} from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <Container maxWidth="lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Shop */}
          <div>
            <Typography variant="h6" className="mb-4">
              Shop
            </Typography>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" underline="hover" color="inherit">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" underline="hover" color="inherit">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/best-sellers" underline="hover" color="inherit">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/sale" underline="hover" color="inherit">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <Typography variant="h6" className="mb-4">
              Customer Service
            </Typography>
            <ul className="space-y-2 text-sm">
              <li>
                <p>
                  Contact Us
                </p>
              </li>
              <li>
                <p>
                  FAQs
                </p>
              </li>
              <li>
                <p>
                  Shipping & Returns
                </p>
              </li>
              <li>
                <p>
                  Support Center
                </p>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <Typography variant="h6" className="mb-4">
              Company
            </Typography>
            <ul className="space-y-2 text-sm">
              <li>
                <p>
                  About Us
                </p>
              </li>
              <li>
                <p>
                  Branches
                </p>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <Typography variant="h6" className="mb-4">
              Stay Connected
            </Typography>
            <Box component="form" className="flex flex-col space-y-2">
              <TextField
                variant="outlined"
                size="small"
                placeholder="Enter your email"
                InputProps={{ className: "bg-white rounded" }}
              />
              <Button variant="contained" color="primary" className="rounded">
                Subscribe
              </Button>
            </Box>
            <div className="flex space-x-4 mt-4">
              <Link href="#" color="inherit" aria-label="Facebook">
                <Facebook />
              </Link>
              <Link href="#" color="inherit" aria-label="Instagram">
                <Instagram />
              </Link>
              <Link href="#" color="inherit" aria-label="Twitter">
                <Twitter />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 mt-10">
          © 2025 ByteMart. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
