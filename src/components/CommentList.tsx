"use client";

import { useState, useEffect } from "react";

interface Comment {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function CommentList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/comments");
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Expose refresh method via refetch on new mount
  useEffect(() => {
    const interval = setInterval(fetchComments, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center text-[#BDBDBD] py-8 font-mono">
        ⏳ Cargando comentarios...
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center text-[#757575] py-8 font-mono">
        💬 Aún no hay comentarios. ¡Sé el primero en escribir!
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="p-4 bg-[#1a1a1a] border-2 border-[#4a3728] shadow-[inset_1px_1px_0_#2d2d2d]"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#4CAF50] font-bold font-mono">
              ⛏ {comment.name}
            </span>
            <span className="text-[#555] text-xs font-mono">
              {new Date(comment.createdAt).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <p className="text-[#BDBDBD] font-mono text-sm whitespace-pre-wrap">
            {comment.message}
          </p>
        </div>
      ))}
    </div>
  );
}
