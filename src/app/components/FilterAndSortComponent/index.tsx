"use client";
import React from "react";
import {
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  IconButton,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useOrder } from "../../store/OrderContext";

import styles from "./styles.module.scss";

const FilterAndSortComponent: React.FC = () => {
  const { orderBy, setOrderBy, searchTerm, setSearchTerm } = useOrder();
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setOrderBy(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.filterAndSortContainer}>
      <TextField
        label="Pesquisar ID ou Nome ou Telefone..."
        variant="outlined"
        style={{ width: "300px" }}
        onChange={handleSearchChange}
        value={searchTerm}
      />
      <FormControl variant="outlined" className={styles.sortSelect}>
        <Select
          value={orderBy}
          displayEmpty
          onChange={handleSortChange}
          inputProps={{ "aria-label": "Without label" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton color="primary" aria-label="sort"></IconButton>
            </InputAdornment>
          }
        >
          <MenuItem value="" disabled>
            Ordenar por
          </MenuItem>
          <MenuItem value="id">ID</MenuItem>
          <MenuItem value="nome">Nome</MenuItem>
          <MenuItem value="telefone">Telefone</MenuItem>
          <MenuItem value="registrationDate">Data de cadastro</MenuItem>
          <MenuItem value="status">Status</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={styles.sortSelect}>
        <Select
          value={orderBy}
          displayEmpty
          onChange={handleSortChange}
          inputProps={{ "aria-label": "Without label" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton color="primary" aria-label="sort"></IconButton>
            </InputAdornment>
          }
        >
          <MenuItem value="" disabled>
            Filtros
          </MenuItem>
          <MenuItem value="nome">Nome</MenuItem>
          <MenuItem value="telefone">Telefone</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterAndSortComponent;
