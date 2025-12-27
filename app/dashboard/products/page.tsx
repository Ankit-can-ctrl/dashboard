"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Rating,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useProductsStore } from "@/store/productsStore";

export default function ProductsPage() {
  // Get state and actions from Zustand store
  const {
    products,
    total,
    isLoading,
    fetchProducts,
    searchProducts,
    fetchByCategory,
  } = useProductsStore();

  // Local UI state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch categories
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.map((c: any) => c.slug || c)));
  }, []);

  // Fetch products using store actions
  useEffect(() => {
    const skip = (page - 1) * limit;

    if (search) {
      searchProducts(search);
    } else if (category) {
      fetchByCategory(category);
    } else {
      fetchProducts(limit, skip);
    }
  }, [search, category, page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCategory("");
    setPage(1);
  };

  const handleCategoryChange = (e: any) => {
    setCategory(e.target.value);
    setSearch("");
    setPage(1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          label="Search products"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{ flex: 1 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Products Grid */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {products.map((product) => (
            <Box key={product.id}>
              <Link
                href={`/dashboard/products/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card sx={{ height: "100%", "&:hover": { boxShadow: 6 } }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={product.thumbnail}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography variant="h6" noWrap>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.category}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${product.price}
                    </Typography>
                    <Rating
                      value={product.rating}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                  </CardContent>
                </Card>
              </Link>
            </Box>
          ))}
        </Box>
      )}

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Container>
  );
}
