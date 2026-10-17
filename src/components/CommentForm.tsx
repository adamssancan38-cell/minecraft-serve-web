"use client";

import { useState } from "react";

interface CommentFormProps {
  onCommentAdded: () => void;
}

export default function CommentForm({ onCommentAdded }: CommentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al enviar comentario");
      }

      setName("");
      setEmail("");
      setMessage("");
      setSuccess(true);
      onCommentAdded();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#BDBDBD] mb-1 tracking-wide">
            ⛏ Tu nombre
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Steve..."
            className="w-full px-3 py-2 bg-[#1a1a1a] border-2 border-[#4a3728] text-[#4CAF50] placeholder-[#555] focus:border-[#4CAF50] focus:outline-none font-mono"
          />
        </div>
        <div>
          <label className="block text-sm text-[#BDBDBD] mb-1 tracking-wide">
            ✉ Tu correo
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="steve@minecraft.com"
            className="w-full px-3 py-2 bg-[#1a1a1a] border-2 border-[#4a3728] text-[#4CAF50] placeholder-[#555] focus:border-[#4CAF50] focus:outline-none font-mono"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-[#BDBDBD] mb-1 tracking-wide">
          📝 Tu mensaje
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          placeholder="Escribe tu comentario aquí..."
          className="w-full px-3 py-2 bg-[#1a1a1a] border-2 border-[#4a3728] text-[#4CAF50] placeholder-[#555] focus:border-[#4CAF50] focus:outline-none font-mono resize-none"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-900/50 border border-red-500 text-red-300 font-mono text-sm">
          ⚠ {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-[#2E7D32]/50 border border-[#4CAF50] text-[#4CAF50] font-mono text-sm">
          ✅ ¡Comentario enviado! Tu mensaje ha sido enviado al correo del
          administrador.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[#4CAF50] hover:bg-[#2E7D32] text-[#1a1a1a] font-bold tracking-wider border-2 border-[#2E7D32] shadow-[inset_1px_1px_0_#66BB6A,inset_-1px_-1px_0_#2E7D32] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-mono uppercase text-lg"
      >
        {loading ? "⏳ Enviando..." : "⛏ Enviar Comentario"}
      </button>
    </form>
  );
}
