import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BillCalculatorApp() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [units, setUnits] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [applyTax, setApplyTax] = useState(false);
  const [applyDiscount, setApplyDiscount] = useState(false);
  const [calculatedTotal, setCalculatedTotal] = useState(0);

  const navigate = useNavigate();

  // Recalculate total whenever inputs change
  useEffect(() => {
    let total = parseFloat(units || 0) * parseFloat(pricePerUnit || 0);
    if (applyTax) total += total * (parseFloat(taxRate || 0) / 100);
    if (applyDiscount) total -= total * (parseFloat(discountRate || 0) / 100);
    setCalculatedTotal(isNaN(total) ? 0 : total);
  }, [units, pricePerUnit, taxRate, discountRate, applyTax, applyDiscount]);

  const handleSubmit = () => {
    const finalTotal = calculatedTotal;

    const billData = {
      userName,
      userEmail,
      userPhone,
      units,
      pricePerUnit,
      taxRate: applyTax ? taxRate : 0,
      discountRate: applyDiscount ? discountRate : 0,
      finalTotal,
      timestamp: new Date().toLocaleString(),
    };

    navigate("/bill-details", { state: billData });
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    border: "1px solid #ccc",
    marginBottom: "1rem",
  };

  return (
    <div
      style={{
        minHeight: "96vh",
        background: "linear-gradient(to right, #cbd5e1, #ddd6f3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "white",
          borderRadius: "1rem",
          padding: "2rem",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "#6b21a8",
            marginBottom: "1.5rem",
          }}
        >
          Bill Calculator
        </h2>

        <input
          style={inputStyle}
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
        />

        <input
          style={inputStyle}
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <input
          style={inputStyle}
          type="tel"
          value={userPhone}
          onChange={(e) => setUserPhone(e.target.value)}
          placeholder="Enter your phone number"
        />

        <input
          style={inputStyle}
          type="number"
          value={units}
          onFocus={() => units === "0" && setUnits("")}
          onChange={(e) => setUnits(e.target.value)}
          placeholder="Enter units"
        />

        <input
          style={inputStyle}
          type="number"
          value={pricePerUnit}
          onFocus={() => pricePerUnit === "0" && setPricePerUnit("")}
          onChange={(e) => setPricePerUnit(e.target.value)}
          placeholder="Enter price per unit"
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <label>Apply Tax</label>
          <input
            type="checkbox"
            checked={applyTax}
            onChange={(e) => setApplyTax(e.target.checked)}
          />
        </div>

        {applyTax && (
          <input
            style={inputStyle}
            type="number"
            value={taxRate}
            onFocus={() => taxRate === "0" && setTaxRate("")}
            onChange={(e) => setTaxRate(e.target.value)}
            placeholder="Enter tax rate (%)"
          />
        )}
    

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <label>Apply Discount</label>
          <input
            type="checkbox"
            checked={applyDiscount}
            onChange={(e) => setApplyDiscount(e.target.checked)}
          />
        </div>

        {applyDiscount && (
          <input
            style={inputStyle}
            type="number"
            value={discountRate}
            onFocus={() => discountRate === "0" && setDiscountRate("")}
            onChange={(e) => setDiscountRate(e.target.value)}
            placeholder="Enter discount rate (%)"
          />
        )}

        <div
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontWeight: "bold",
            color: "#1e40af",
          }}
        >
          Estimated Total: ${calculatedTotal.toFixed(2)}
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#2563eb",
            color: "white",
            borderRadius: "0.5rem",
            border: "none",
            fontWeight: "bold",
            marginTop: "1.5rem",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
