"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

type PredictionResult = {
  chiller_load: number;
  plant_efficiency: number;
  amount_saved: number;
  commission: number;
};

export default function PredictPage() {
  const [inputs, setInputs] = useState({
    KW_TOT: "",
    KW_CHH: "",
    Precent_CH: "",
    RT: "",
    CHWS: "",
    DeltaCHW: "",
  });
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          KW_TOT: parseFloat(inputs.KW_TOT),
          KW_CHH: parseFloat(inputs.KW_CHH),
          Precent_CH: parseFloat(inputs.Precent_CH),
          RT: parseFloat(inputs.RT),
          CHWS: parseFloat(inputs.CHWS),
          DeltaCHW: parseFloat(inputs.DeltaCHW),
        }),
      });
      if (!res.ok) throw new Error("Prediction failed");
      const data: PredictionResult = await res.json();
      setResult(data);
    } catch (err) {
      setError("Prediction failed. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white rounded-xl shadow p-8">
      <div className="flex items-center mb-6 justify-center">
        <Image src="/logo.png" alt="SmartChill Logo" width={60} height={60} className="mr-4 rounded-lg" />
        <h1 className="text-2xl font-bold text-blue-700">SmartChill Prediction</h1>
      </div>
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="text-gray-700 font-semibold">KW_TOT - TOTAL PLANT POWER
          <input type="number" step="0.01" min="0" name="KW_TOT" value={inputs.KW_TOT} onChange={handleChange} className="w-full mt-1 p-2 rounded border border-gray-300" required />
        </label>
        <label className="text-gray-700 font-semibold">KW_CHH - TOTAL CHILLER POWER
          <input type="number" step="0.01" min="0" name="KW_CHH" value={inputs.KW_CHH} onChange={handleChange} className="w-full mt-1 p-2 rounded border border-gray-300" required />
        </label>
        <label className="text-gray-700 font-semibold">Precent_CH - PRESENT CHILLER LOAD
          <input type="number" step="0.01" min="0" name="Precent_CH" value={inputs.Precent_CH} onChange={handleChange} className="w-full mt-1 p-2 rounded border border-gray-300" required />
        </label>
        <label className="text-gray-700 font-semibold">RT - PLANT TONE
          <input type="number" step="0.01" min="0" name="RT" value={inputs.RT} onChange={handleChange} className="w-full mt-1 p-2 rounded border border-gray-300" required />
        </label>
        <label className="text-gray-700 font-semibold">CHWS - CHILLED WATER SUPPLY TEMPERATURE
          <input type="number" step="0.01" min="0" name="CHWS" value={inputs.CHWS} onChange={handleChange} className="w-full mt-1 p-2 rounded border border-gray-300" required />
        </label>
        <label className="text-gray-700 font-semibold">DeltaCHW - CHILLED WATER DELTA T (DIFFERENTIAL TEMPERATURE)
          <input type="number" step="0.01" min="0" name="DeltaCHW" value={inputs.DeltaCHW} onChange={handleChange} className="w-full mt-1 p-2 rounded border border-gray-300" required />
        </label>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition mt-4" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>
      {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      {result && (
        <div className="bg-blue-50 rounded-lg p-4 mt-6 w-full text-blue-900 shadow">
          <div><b>Predicted Chiller Load:</b> {result.chiller_load}</div>
          <div><b>Predicted Plant Efficiency:</b> {(result.plant_efficiency * 100).toFixed(2)}%</div>
          <div><b>Amount Saved:</b> ₹{result.amount_saved.toFixed(2)}</div>
          <div><b>Our Commission (5%):</b> ₹{result.commission.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
} 