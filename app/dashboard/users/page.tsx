"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { useUsersStore } from "@/store/userStore";

export default function UsersPage() {
  const router = useRouter();

  // Get state and actions from Zustand store
  const { users, total, isLoading, fetchUsers, searchUsers } = useUsersStore();

  // Local UI state
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const limit = 10;

  // Fetch users using store actions
  useEffect(() => {
    const skip = page * limit;

    if (search) {
      searchUsers(search);
    } else {
      fetchUsers(limit, skip);
    }
  }, [page, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Users
        </Typography>

        <TextField
          fullWidth
          label="Search users..."
          value={search}
          onChange={handleSearch}
          sx={{ mb: 3 }}
        />

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.gender}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.company.name}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() =>
                            router.push(`/dashboard/users/${user.id}`)
                          }
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}
            >
              <Button
                variant="outlined"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                Page {page + 1} of {totalPages}
              </Typography>
              <Button
                variant="outlined"
                disabled={page >= totalPages - 1}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}
