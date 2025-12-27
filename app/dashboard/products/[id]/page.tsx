"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Rating,
  CircularProgress,
  Card,
  CardMedia,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Link href="/dashboard/products" style={{ textDecoration: "none" }}>
        <Button startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
          Back to Products
        </Button>
      </Link>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
        }}
      >
        {/* Image Carousel */}
        <Box>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.images[selectedImage]}
              alt={product.title}
              sx={{ objectFit: "contain", bgcolor: "#f5f5f5" }}
            />
          </Card>
          <Box sx={{ display: "flex", gap: 1, mt: 2, overflowX: "auto" }}>
            {product.images.map((img, index) => (
              <Box
                key={index}
                onClick={() => setSelectedImage(index)}
                sx={{
                  width: 80,
                  height: 80,
                  cursor: "pointer",
                  border:
                    selectedImage === index
                      ? "2px solid primary.main"
                      : "1px solid #ddd",
                  borderRadius: 1,
                }}
              >
                <img
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Product Details */}
        <Box>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({product.rating})
            </Typography>
          </Box>

          <Chip label={product.category} size="small" sx={{ mb: 2 }} />

          <Typography variant="h4" color="primary" gutterBottom>
            ${product.price}
            {product.discountPercentage > 0 && (
              <Chip
                label={`-${product.discountPercentage}%`}
                color="error"
                size="small"
                sx={{ ml: 2 }}
              />
            )}
          </Typography>

          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          {/* Specs */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Specifications
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Brand
                </Typography>
                <Typography variant="body1">{product.brand}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Category
                </Typography>
                <Typography variant="body1">{product.category}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Stock
                </Typography>
                <Typography variant="body1">{product.stock} units</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Discount
                </Typography>
                <Typography variant="body1">
                  {product.discountPercentage}%
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
