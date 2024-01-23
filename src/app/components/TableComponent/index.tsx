"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import styles from "./styles.module.scss";
import axios from "axios";
import { useOrder } from "../../store/OrderContext";

interface UserData {
  id: number;
  name: string;
  phone: string;
  registrationDate: string;
  status: string;
}

const TableComponent: React.FC = () => {
  const { orderBy, searchTerm } = useOrder();
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    axios
      .get("https://38375370-103e-44f9-ba50-67c60bff12f7.mock.pstmn.io/users")
      .then((response) => setUserData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredData = userData.filter((user) =>
    `${user.id} ${user.name} ${user.phone}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const sortedData = filteredData.slice().sort((a, b) => {
    if (orderBy === "nome") {
      return a.name.localeCompare(b.name);
    } else if (orderBy === "telefone") {
      return a.phone.localeCompare(b.phone);
    } else if (orderBy === "registrationDate") {
      return a.registrationDate.localeCompare(b.registrationDate);
    } else if (orderBy === "status") {
      return a.status.localeCompare(b.status);
    } else if (orderBy === "id") {
      return a.id - b.id;
    } else {
      return 0;
    }
  });

  return (
    <>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow className={styles.tableHeader}>
                <TableCell className={styles.tableCell}>ID</TableCell>
                <TableCell className={styles.tableCell}>Nome</TableCell>
                <TableCell className={styles.tableCell}>Telefone</TableCell>
                <TableCell className={styles.tableCell}>
                  Data de Cadastro
                </TableCell>
                <TableCell className={styles.tableCell}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((row) => (
                <TableRow
                  key={row.id}
                  className={`${styles.tableRow} ${
                    row.status === "Inativo" ? styles.inativo : ""
                  }`}
                >
                  <TableCell className={styles.tableCell}>{row.id}</TableCell>
                  <TableCell className={styles.tableCell}>{row.name}</TableCell>
                  <TableCell className={styles.tableCell}>
                    {row.phone}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {row.registrationDate}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {row.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </>
  );
};

export default TableComponent;
