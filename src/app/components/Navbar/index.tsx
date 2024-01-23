"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { CSSProperties, useState } from "react";

import styles from "./styles.module.scss";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();

  const navbarStyles: CSSProperties = {
    backgroundColor: "white",
  };

  return (
    <header className={styles.headerContainer} style={navbarStyles}>
      <div className={styles.headerContent}>
        <Image
          src=""
          width={120}
          height={800}
          alt="LOGO"
          className={styles.logoHeader}
        />
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
