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
  TablePagination,
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("https://38375370-103e-44f9-ba50-67c60bff12f7.mock.pstmn.io/users")
      .then((response) => setUserData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredData = userData.filter((user) =>
    `${user.id} ${user.name} ${user.phone} ${user.status} ${user.registrationDate}`
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
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
        <TablePagination
          labelRowsPerPage="Linhas por página"
          labelDisplayedRows={({ from, to, count }) =>
            `${from} - ${to} de ${count}`
          }
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default TableComponent;