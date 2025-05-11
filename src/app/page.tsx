import { useState } from "react";

export default function Home() {
  const [income, setIncome] = useState(60000);
  const [filingStatus, setFilingStatus] = useState("single");

  const standardDeduction = filingStatus === "married" ? 29200 : 14600;
  const taxableIncome = Math.max(income - standardDeduction, 0);

  const tax = calculateTax(taxableIncome, filingStatus);
  const effectiveRate = (tax / income) * 100;
  const afterTaxIncome = income - tax;

  return(null);
}

function calculateTax(income: number, status: string): number {

}