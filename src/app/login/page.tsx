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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passError, setPassError] = useState<string | undefined>(undefined);


  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if (email === "lean@example.com" && password === "password123") {
      window.location.href = "/clients";
    } else {
      if (email !== "lean@example.com" && password !== "password123") {
        setEmailError("Email não encontrado. Confira e tente novamente.");
        setPassError(
          "Senha incorreta. Por favor, verifique e tente novamente."
        );
      } else if (email === "lean@example.com" && password !== "password123") {
        setEmailError("Email não encontrado. Confira e tente novamente.");
        setPassError(
          "Senha incorreta. Por favor, verifique e tente novamente."
        );
      } else {
        setEmailError("Email não encontrado. Confira e tente novamente.");
        setPassError(
          "Senha incorreta. Por favor, verifique e tente novamente."
        );
      }
    }
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          label="Senha"
          placeholder="Senha"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passError}
          helperText={passError}
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
        <Button
          variant="contained"
          color="primary"
          className={styles.loginButton}
          onClick={handleLogin}
        >
          Acessar plataforma
        </Button>
      </Box>
      <Box className={styles.rightContainer}></Box>
    </Container>
  );
}