"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { CSSProperties, useState } from "react";

import styles from "./styles.module.scss";
import Image from "next/image";
import { Typography } from "@mui/material";

export function Navbar() {
  const pathname = usePathname();

  const navbarStyles: CSSProperties = {
    backgroundColor: "white",
  };

  return (
    <header className={styles.headerContainer} style={navbarStyles}>
      <div className={styles.headerContent}>
        <Typography variant="h4" color="primary" className={styles.logoTitle}>
          LOGO
        </Typography>
        <nav className={styles.web}>
          <Link
            href="/clients"
            className={`${pathname === "/clients" ? styles.active : ""}`}
          >
            Clientes
          </Link>
          <Link href="/">Entregas</Link>
          <Link href="/">Endereços</Link>
        </nav>
      </div>
    </header>
  );
}
