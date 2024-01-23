import React from "react";
import TableComponent from "../components/TableComponent";
import FilterAndSortComponent from "../components/FilterAndSortComponent";
import { OrderProvider } from "../store/OrderContext";

const HomePage: React.FC = () => {
  return (
    <OrderProvider>
      <h1>Sua Página</h1>
      <FilterAndSortComponent />
      <TableComponent />
    </OrderProvider>
  );
};

export default HomePage;
