import React from "react";
import { Routes, Route } from "react-router-dom";
import BillCalculatorApp from "./BillCalculatorApp";
import BillDetailsPage from "./BillDetailsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BillCalculatorApp />} />
      <Route path="/bill-details" element={<BillDetailsPage />} />
    </Routes>
  );
}
