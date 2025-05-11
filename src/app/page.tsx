"use client";

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
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Tax Estimator</h1>
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md space-y-6">
        <Input label="Annual Income ($)" value={income} onChange={setIncome} />
        <div>
          <label className="font-semibold text-gray-700 block mb-2">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value)}
            className="block w-full mt-1 border-2 border-gray-200 px-4 py-2.5 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-gray-900"
          >
            <option value="single" className="text-gray-900">Single</option>
            <option value="married" className="text-gray-900">Married</option>
          </select>
        </div>

        <div className="mt-8 space-y-3 text-base">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-800">Standard Deduction: <span className="text-blue-600">${standardDeduction.toLocaleString()}</span></p>
            <p className="font-medium text-gray-800">Taxable Income: <span className="text-blue-600">${taxableIncome.toLocaleString()}</span></p>
            <p className="font-medium text-gray-800">Estimated Tax: <span className="text-blue-600">${tax.toFixed(2)}</span></p>
            <p className="font-medium text-gray-800">Effective Tax Rate: <span className="text-blue-600">{effectiveRate.toFixed(2)}%</span></p>
            <p className="font-medium text-gray-800">After-Tax Income: <span className="text-blue-600">${afterTaxIncome.toLocaleString()}</span></p>
          </div>
        </div>
      </div>
    </main>
  );
}

function Input({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) {
    return (
      <div>
        <label className="font-semibold text-gray-700 block mb-2">{label}</label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="block w-full border-2 border-gray-200 px-4 py-2.5 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-gray-900"
        />
      </div>
    );
  }
  

function calculateTax(income: number, status: string): number {
    const brackets =
    status === "married"
      ? [
          [0, 0.10],
          [23200, 0.12],
          [94000, 0.22],
          [201050, 0.24],
          [383900, 0.32],
          [487450, 0.35],
          [732800, 0.37],
        ]
      : [
          [0, 0.10],
          [11600, 0.12],
          [47000, 0.22],
          [100525, 0.24],
          [191950, 0.32],
          [243725, 0.35],
          [365600, 0.37],
        ];

    let tax = 0;
    for (let i = 0; i < brackets.length; i++) {
        const [limit, rate] = brackets[i];
        const nextLimit = brackets[i + 1]?.[0] ?? Infinity;
        if (income > limit) {
        const taxable = Math.min(income, nextLimit) - limit;
        tax += taxable * rate;
        } else {
        break;
        }
    }
    return tax;
}