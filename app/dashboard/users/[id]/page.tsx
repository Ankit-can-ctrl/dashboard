"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  birthDate: string;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  company: {
    name: string;
    department: string;
    title: string;
  };
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`
        );
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
      setLoading(false);
    };

    fetchUser();
  }, [params.id]);

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Typography sx={{ mt: 4 }}>User not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Button
          variant="outlined"
          onClick={() => router.push("/dashboard/users")}
          sx={{ mb: 3 }}
        >
          ← Back to Users
        </Button>

        <Paper sx={{ p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
            <img
              src={user.image}
              alt={user.firstName}
              style={{ width: 100, height: 100, borderRadius: "50%" }}
            />
            <Box>
              <Typography variant="h4">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography color="text.secondary">{user.email}</Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            <Box sx={{ flex: "1 1 45%", minWidth: "200px" }}>
              <Typography variant="subtitle2" color="text.secondary">
                Phone
              </Typography>
              <Typography>{user.phone}</Typography>
            </Box>
            <Box sx={{ flex: "1 1 45%", minWidth: "200px" }}>
              <Typography variant="subtitle2" color="text.secondary">
                Gender
              </Typography>
              <Typography>{user.gender}</Typography>
            </Box>
            <Box sx={{ flex: "1 1 45%", minWidth: "200px" }}>
              <Typography variant="subtitle2" color="text.secondary">
                Age
              </Typography>
              <Typography>{user.age}</Typography>
            </Box>
            <Box sx={{ flex: "1 1 45%", minWidth: "200px" }}>
              <Typography variant="subtitle2" color="text.secondary">
                Birth Date
              </Typography>
              <Typography>{user.birthDate}</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Address
          </Typography>
          <Typography>
            {user.address.address}, {user.address.city}, {user.address.state},{" "}
            {user.address.country}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Company
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ flex: "1 1 30%", minWidth: "150px" }}>
              <Typography variant="subtitle2" color="text.secondary">
                Name
              </Typography>
              <Typography>{user.company.name}</Typography>
            </Box>
            <Box sx={{ flex: "1 1 30%", minWidth: "150px" }}>
              <Typography variant="subtitle2" color="text.secondary">
                Department
              </Typography>
              <Typography>{user.company.department}</Typography>
            </Box>
            <Box sx={{ flex: "1 1 30%", minWidth: "150px" }}>
              <Typography variant="subtitle2" color="text.secondary">
                Title
              </Typography>
              <Typography>{user.company.title}</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
