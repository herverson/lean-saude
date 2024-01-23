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
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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

const StatusInativoMenuIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <mask
      id="mask0_0_5416"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="20"
      height="20"
    >
      <rect width="20" height="20" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_0_5416)">
      <path
        d="M10 18C8.90278 18 7.86806 17.7917 6.89583 17.375C5.92361 16.9583 5.07292 16.3854 4.34375 15.6562C3.61458 14.9271 3.04167 14.0764 2.625 13.1042C2.20833 12.1319 2 11.0972 2 10C2 8.88889 2.20833 7.85069 2.625 6.88542C3.04167 5.92014 3.61458 5.07292 4.34375 4.34375C5.07292 3.61458 5.92361 3.04167 6.89583 2.625C7.86806 2.20833 8.90278 2 10 2C11.1111 2 12.1493 2.20833 13.1146 2.625C14.0799 3.04167 14.9271 3.61458 15.6562 4.34375C16.3854 5.07292 16.9583 5.92014 17.375 6.88542C17.7917 7.85069 18 8.88889 18 10C18 11.0972 17.7917 12.1319 17.375 13.1042C16.9583 14.0764 16.3854 14.9271 15.6562 15.6562C14.9271 16.3854 14.0799 16.9583 13.1146 17.375C12.1493 17.7917 11.1111 18 10 18ZM10 16.5C10.7639 16.5 11.4861 16.375 12.1667 16.125C12.8472 15.875 13.4653 15.5278 14.0208 15.0833L4.91667 5.97917C4.47222 6.53472 4.125 7.15278 3.875 7.83333C3.625 8.51389 3.5 9.23611 3.5 10C3.5 11.8056 4.13194 13.3403 5.39583 14.6042C6.65972 15.8681 8.19444 16.5 10 16.5ZM15.0833 14.0208C15.5278 13.4653 15.875 12.8472 16.125 12.1667C16.375 11.4861 16.5 10.7639 16.5 10C16.5 8.19444 15.8681 6.65972 14.6042 5.39583C13.3403 4.13194 11.8056 3.5 10 3.5C9.23611 3.5 8.51389 3.625 7.83333 3.875C7.15278 4.125 6.53472 4.47222 5.97917 4.91667L15.0833 14.0208Z"
        fill="#E53E3E"
      />
    </g>
  </svg>
);

const StatusAtivoMenuIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <mask
      id="mask0_0_5406"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="20"
      height="20"
    >
      <rect width="20" height="20" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_0_5406)">
      <path
        d="M15.2062 6.94898L9.16536 12.9898L5.87453 9.70815L4.58203 11.0007L9.16536 15.584L16.4987 8.25065L15.2062 6.94898ZM10.9987 1.83398C5.9387 1.83398 1.83203 5.94065 1.83203 11.0007C1.83203 16.0607 5.9387 20.1673 10.9987 20.1673C16.0587 20.1673 20.1654 16.0607 20.1654 11.0007C20.1654 5.94065 16.0587 1.83398 10.9987 1.83398ZM10.9987 18.334C6.94703 18.334 3.66536 15.0523 3.66536 11.0007C3.66536 6.94898 6.94703 3.66732 10.9987 3.66732C15.0504 3.66732 18.332 6.94898 18.332 11.0007C18.332 15.0523 15.0504 18.334 10.9987 18.334Z"
        fill="#2E7D32"
      />
    </g>
  </svg>
);



const TableComponent: React.FC = () => {
  const { orderBy, searchTerm } = useOrder();
  const [userData, setUserData] = useState<UserData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              <TableCell className={styles.tableCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  className={`${styles.tableRow} ${
                    row.status === "Inativo" ? styles.inativo : styles.ativo
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
                    <div
                      className={`${styles.statusCell} ${
                        row.status === "Inativo"
                          ? styles.inativoText
                          : styles.ativoText
                      }`}
                    >
                      {row.status}
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <StatusAtivoMenuIcon />
                        </svg>
                        Ativar
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <StatusInativoMenuIcon />
                        </svg>
                         Inativar
                      </MenuItem>
                    </Menu>
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
