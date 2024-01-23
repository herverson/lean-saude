"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import styles from "./styles.module.scss";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className={styles.container}>
      <Box className={styles.loginBox}>
        <Typography variant="h4" color="primary" className={styles.logoTitle}>
          LOGO
        </Typography>
        <Typography variant="h4" color="primary" className={styles.title}>
          Bem-vindo(a)
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          className={styles.sectionTitle}
        >
          Acesse sua conta para iniciar a sessão
        </Typography>
        <TextField
          label="Email"
          placeholder="Email"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Senha"
          placeholder="Senha"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Link href="#" passHref>
          <Typography
            variant="body2"
            color="primary"
            className={styles.forgotPassword}
          >
            Esqueceu a senha?
          </Typography>
        </Link>
        <Link href="/clients" passHref legacyBehavior>
          <Button
            variant="contained"
            color="primary"
            className={styles.loginButton}
          >
            Acessar plataforma
          </Button>
        </Link>
      </Box>
      <Box className={styles.rightContainer}></Box>

    </Container>
  );
}
