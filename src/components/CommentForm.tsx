"use client";

import { useRef, useState } from "react";

const MAX_GIF_BYTES = 2 * 1024 * 1024; // 2 MB
const MAX_SIDE = 900; // las fotos se reducen a este tamaño máximo

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(new Error("No se pudo leer la imagen"));
    r.readAsDataURL(file);
  });
}

// Fotos normales: se reducen y comprimen. Los GIF se dejan tal cual para que sigan moviéndose.
async function prepareImage(file: File): Promise<string> {
  if (file.type === "image/gif") {
    if (file.size > MAX_GIF_BYTES) throw new Error("El GIF pesa demasiado (máx. 2 MB)");
    return readAsDataURL(file);
  }
  const src = await readAsDataURL(file);
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("No se pudo abrir la imagen"));
    img.src = src;
  });
  const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No se pudo procesar la imagen");
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.82);
}

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
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    try {
      if (!/^image\/(png|jpeg|gif|webp)$/.test(file.type)) {
        throw new Error("Solo se permiten imágenes PNG, JPG, WEBP o GIF");
      }
      setImage(await prepareImage(file));
    } catch (err) {
      setImage(null);
      setError(err instanceof Error ? err.message : "Error con la imagen");
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, image }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al enviar comentario");
      }

      setName("");
      setEmail("");
      setMessage("");
      setImage(null);
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

      {/* Imagen o GIF opcional */}
      <div>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/gif,image/webp"
          onChange={handleFile}
          className="hidden"
        />
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="px-3 py-2 bg-[#1a1a1a] border-2 border-[#4a3728] hover:border-[#4CAF50] text-[#BDBDBD] font-mono text-sm tracking-wide transition-colors"
          >
            🖼 {image ? "Cambiar imagen / GIF" : "Añadir imagen o GIF"}
          </button>
          <span className="text-[#757575] font-mono text-xs">Opcional · PNG, JPG, WEBP o GIF (máx. 2 MB)</span>
        </div>
        {image && (
          <div className="relative inline-block mt-3 border-2 border-[#4a3728] bg-[#1a1a1a] p-1">
            <img src={image} alt="Vista previa" className="block max-h-48 max-w-full" />
            <button
              type="button"
              onClick={() => setImage(null)}
              aria-label="Quitar imagen"
              className="absolute -top-3 -right-3 w-7 h-7 bg-red-700 hover:bg-red-600 border-2 border-black text-white font-mono text-sm leading-none"
            >
              ✕
            </button>
          </div>
        )}
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
