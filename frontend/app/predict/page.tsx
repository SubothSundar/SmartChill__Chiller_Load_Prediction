"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

// Spinner for loading state
function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-white inline-block mr-2" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

// Decorative floating logos inside the prediction box
function BoxLogos() {
  const logos = Array.from({ length: 8 }).map((_, i) => {
    const size = Math.floor(Math.random() * 32) + 32; // 32-64px
    const top = Math.random() * 85 + 5; // 5-90%
    const left = Math.random() * 85 + 5; // 5-90%
    const rotate = Math.floor(Math.random() * 60) - 30; // -30 to +30 deg
    return (
      <div
        key={i}
        className="absolute pointer-events-none select-none"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: 0.07,
          transform: `rotate(${rotate}deg)`,
          zIndex: 1,
        }}
      >
        <Image src="/logo4.png" alt="Decorative Logo" width={size} height={size} style={{ width: "100%", height: "auto" }} />
      </div>
    );
  });
  return <>{logos}</>;
}

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
    <div className="max-w-2xl mx-auto mt-16 bg-gradient-to-br from-black via-gray-900 to-blue-950 rounded-2xl shadow-2xl p-8 border border-blue-900 relative overflow-hidden">
      {/* Decorative floating logos inside the box */}
      <BoxLogos />
      <div className="flex flex-col items-center mb-8 relative z-10">
        <h1 className="text-3xl font-bold text-blue-500 mb-1">SmartChill Prediction</h1>
        <p className="text-gray-300 text-center text-lg">Enter your plant data to predict chiller load, efficiency, and savings.</p>
      </div>
      <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10" onSubmit={handleSubmit}>
        <div>
          <label className="text-gray-200 font-semibold block mb-1">KW_TOT - TOTAL PLANT POWER</label>
          <input type="number" step="0.01" min="0" name="KW_TOT" value={inputs.KW_TOT} onChange={handleChange} className="w-full p-3 rounded-lg border border-blue-800 bg-gray-950 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required />
        </div>
        <div>
          <label className="text-gray-200 font-semibold block mb-1">KW_CHH - TOTAL CHILLER POWER</label>
          <input type="number" step="0.01" min="0" name="KW_CHH" value={inputs.KW_CHH} onChange={handleChange} className="w-full p-3 rounded-lg border border-blue-800 bg-gray-950 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required />
        </div>
        <div>
          <label className="text-gray-200 font-semibold block mb-1">Precent_CH - PRESENT CHILLER LOAD</label>
          <input type="number" step="0.01" min="0" name="Precent_CH" value={inputs.Precent_CH} onChange={handleChange} className="w-full p-3 rounded-lg border border-blue-800 bg-gray-950 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required />
        </div>
        <div>
          <label className="text-gray-200 font-semibold block mb-1">RT - PLANT TONE</label>
          <input type="number" step="0.01" min="0" name="RT" value={inputs.RT} onChange={handleChange} className="w-full p-3 rounded-lg border border-blue-800 bg-gray-950 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required />
        </div>
        <div>
          <label className="text-gray-200 font-semibold block mb-1">CHWS - CHILLED WATER SUPPLY TEMPERATURE</label>
          <input type="number" step="0.01" min="0" name="CHWS" value={inputs.CHWS} onChange={handleChange} className="w-full p-3 rounded-lg border border-blue-800 bg-gray-950 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required />
        </div>
        <div>
          <label className="text-gray-200 font-semibold block mb-1">DeltaCHW - CHILLED WATER DELTA T (DIFFERENTIAL TEMPERATURE)</label>
          <input type="number" step="0.01" min="0" name="DeltaCHW" value={inputs.DeltaCHW} onChange={handleChange} className="w-full p-3 rounded-lg border border-blue-800 bg-gray-950 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition" required />
        </div>
        <div className="md:col-span-2 flex justify-center mt-2">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-xl shadow-xl transition text-lg flex items-center" disabled={loading}>
            {loading && <Spinner />}
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>
      </form>
      {error && <div className="text-red-400 mt-4 text-center font-semibold z-10 relative">{error}</div>}
      {result && (
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 rounded-2xl p-6 mt-8 w-full text-white shadow-xl animate-fade-in flex flex-col gap-3 z-10 relative">
          <div className="flex items-center gap-3 text-xl">
            <span className="inline-block bg-blue-700 rounded-full p-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20m10-10H2" /></svg></span>
            <b>Predicted Chiller Load:</b> {result.chiller_load}
          </div>
          <div className="flex items-center gap-3 text-xl">
            <span className="inline-block bg-blue-700 rounded-full p-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg></span>
            <b>Predicted Plant Efficiency:</b> {(result.plant_efficiency * 100).toFixed(2)}%
          </div>
          <div className="flex items-center gap-3 text-xl">
            <span className="inline-block bg-blue-700 rounded-full p-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 17l4 4 4-4m0-5V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v9" /></svg></span>
            <b>Amount Saved:</b> ₹{result.amount_saved.toFixed(2)}
          </div>
          <div className="flex items-center gap-3 text-xl">
            <span className="inline-block bg-blue-700 rounded-full p-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20m10-10H2" /></svg></span>
            <b>Our Commission (5%):</b> ₹{result.commission.toFixed(2)}
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
} 