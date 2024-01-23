import React from "react";
import TableComponent from "../components/TableComponent";
import FilterAndSortComponent from "../components/FilterAndSortComponent";
import { OrderProvider } from "../store/OrderContext";
import { Navbar } from "../components/Navbar";
import styles from "./styles.module.scss";


const Clients: React.FC = () => {
  return (
    <OrderProvider>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.contentContainer}>
          <h1>Usuários</h1>
          <FilterAndSortComponent />
          <TableComponent />
        </div>
      </div>
    </OrderProvider>
  );
};

export default Clients;
