
import React, { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  }

  return (
    <main className="flex flex-col items-center min-h-[80vh] py-14 px-4 bg-[#181f2e]">
      <h1 className="text-3xl md:text-4xl font-extrabold neon-text text-center mb-8">
        Contact Script Mitra
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#232044]/90 neon-glow-panel rounded-2xl shadow-lg p-8 w-full max-w-lg flex flex-col space-y-5 animate-fade-in-up"
      >
        <label>
          <span className="block mb-2 text-[#93c5fd] font-medium">Full Name</span>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg neon-input bg-[#161c30] border border-[#433ac2] text-white placeholder-[#93c5fd]/70"
            placeholder="Eg. Arnav Gare"
          />
        </label>
        <label>
          <span className="block mb-2 text-[#93c5fd] font-medium">Email</span>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg neon-input bg-[#161c30] border border-[#433ac2] text-white placeholder-[#93c5fd]/70"
            placeholder="your@email.com"
          />
        </label>
        <label>
          <span className="block mb-2 text-[#93c5fd] font-medium">Message</span>
          <textarea
            name="message"
            rows={4}
            required
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg neon-input bg-[#161c30] border border-[#433ac2] text-white placeholder-[#93c5fd]/70"
            placeholder="Tell us what you'd like to discuss"
          />
        </label>
        <button
          className="mt-3 px-6 py-3 neon-gradient-bg rounded-xl text-white font-bold shadow-lg text-lg transition-all hover:scale-105 animate-pulse"
          type="submit"
        >
          {sent ? "Thank You!" : "Send Message"}
        </button>
        <div className="flex gap-2 mt-4 justify-center">
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2 bg-green-600 text-white rounded-full font-bold text-base hover:scale-105 transition shadow">
            WhatsApp
          </a>
          <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2 bg-sky-700 text-white rounded-full font-bold text-base hover:scale-105 transition shadow">
            Telegram
          </a>
        </div>
        <div className="pt-2 text-center text-[#b1b5dd] text-sm">
          Want a custom AI solution? Reach out now!
        </div>
      </form>
    </main>
  );
}
