import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

export default function BillDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    userName,
    userEmail,
    userPhone,
    units,
    pricePerUnit,
    taxRate,
    discountRate,
    finalTotal,
    timestamp,
  } = state || {};

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Bill Details", 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${userName}`, 20, 35);
    doc.text(`Email: ${userEmail}`, 20, 45);
    doc.text(`Phone: ${userPhone}`, 20, 55);
    doc.text(`Units: ${units}`, 20, 65);
    doc.text(`Price per Unit: $${pricePerUnit}`, 20, 75);
    doc.text(`Tax Rate: ${taxRate}%`, 20, 85);
    doc.text(`Discount Rate: ${discountRate}%`, 20, 95);
    doc.text(`Total Bill: $${finalTotal.toFixed(2)}`, 20, 105);
    doc.text(`Date: ${timestamp}`, 20, 115);

    doc.save("bill-summary.pdf");
  };

  if (!state) {
    return <div>No bill data found.</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "2rem", color: "#6b21a8", marginBottom: "1rem" }}>Bill Summary</h2>
      <p><strong>Name:</strong> {userName}</p>
      <p><strong>Email:</strong> {userEmail}</p>
      <p><strong>Phone:</strong> {userPhone}</p>
      <p><strong>Units:</strong> {units}</p>
      <p><strong>Price per Unit:</strong> ${pricePerUnit}</p>
      <p><strong>Tax Rate:</strong> {taxRate}%</p>
      <p><strong>Discount Rate:</strong> {discountRate}%</p>
      <p><strong>Total:</strong> ${finalTotal.toFixed(2)}</p>
      <p><strong>Generated On:</strong> {timestamp}</p>

      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={downloadPDF}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            fontWeight: "bold",
            marginRight: "1rem",
          }}
        >
          Download PDF
        </button>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            fontWeight: "bold",
          }}
        >
          Back to Calculator
        </button>
      </div>
    </div>
  );
}
