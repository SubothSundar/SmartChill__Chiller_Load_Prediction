"use client";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <div className="max-w-2xl mx-auto mt-16 bg-white rounded-xl shadow p-8 w-full">
      <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">Contact Us</h1>
      {submitted ? (
        <div className="text-green-600 text-center font-semibold">Thank you for reaching out! We'll get back to you soon.</div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" className="p-3 rounded border border-gray-300 placeholder-gray-500" required />
          <input type="email" name="email" placeholder="Your Email" className="p-3 rounded border border-gray-300 placeholder-gray-500" required />
          <textarea name="message" placeholder="Your Message" className="p-3 rounded border border-gray-300 placeholder-gray-500" rows={5} required />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition">Send Message</button>
        </form>
      )}
    </div>
  );
} 