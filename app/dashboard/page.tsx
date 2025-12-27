"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useAuthStore } from "@/store/authStore";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { clearToken } = useAuthStore();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleLogout = () => {
    clearToken();
    signOut({ callbackUrl: "/login" });
  };

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return null;

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Typography>Welcome, {session.user?.name}</Typography>
        <Button variant="outlined" onClick={handleLogout} sx={{ mt: 2 }}>
          Logout
        </Button>
      </Box>
    </Container>
  );
}
