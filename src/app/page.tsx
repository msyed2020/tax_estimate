import { useState } from "react";

export default function Home() {
  const [income, setIncome] = useState(60000);
  const [filingStatus, setFilingStatus] = useState("single");

  const standardDeduction = filingStatus === "married" ? 29200 : 14600;
  const taxableIncome = Math.max(income - standardDeduction, 0);

  const tax = calculateTax(taxableIncome, filingStatus);
  const effectiveRate = (tax / income) * 100;
  const afterTaxIncome = income - tax;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Tax Estimator</h1>
      <div className="bg-white shadow-md p-6 rounded-md w-full max-w-md space-y-4">
        <Input label="Annual Income ($)" value={income} onChange={setIncome} />
        <div>
          <label className="font-medium">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value)}
            className="block w-full mt-1 border px-3 py-2 rounded"
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>

        <div className="mt-4 space-y-1 text-sm text-gray-700">
          <p>Standard Deduction: ${standardDeduction.toLocaleString()}</p>
          <p>Taxable Income: ${taxableIncome.toLocaleString()}</p>
          <p>Estimated Tax: ${tax.toFixed(2)}</p>
          <p>Effective Tax Rate: {effectiveRate.toFixed(2)}%</p>
          <p>After-Tax Income: ${afterTaxIncome.toLocaleString()}</p>
        </div>
      </div>
    </main>
  );
}

function calculateTax(income: number, status: string): number {
    return 1;
}