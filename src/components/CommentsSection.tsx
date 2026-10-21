"use client";

import { useState, useCallback, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface Comment {
  id: string;
  name: string;
  email: string;
  message: string;
  hasImage?: boolean;
  createdAt: string;
}

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="space-y-6">
      <CommentForm onCommentAdded={fetchComments} />

      {/* Lista de comentarios */}
      <div className="border-t-2 border-[#4a3728] pt-6">
        <h3 className="text-lg font-bold text-[#4CAF50] mb-4 font-mono tracking-wide">
          💬 Comentarios Recientes
        </h3>

        {loading ? (
          <div className="text-center text-[#BDBDBD] py-8 font-mono">
            ⏳ Cargando comentarios...
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center text-[#757575] py-8 font-mono">
            💬 Aún no hay comentarios. ¡Sé el primero en escribir!
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 bg-[#1a1a1a] border-2 border-[#4a3728] shadow-[inset_1px_1px_0_#2d2d2d]"
              >
                <div className="flex items-center gap-2 mb-2 flex-wrap">
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
                {comment.hasImage && (
                  <img
                    src={`/api/comments/${comment.id}/image`}
                    alt="Imagen del comentario"
                    loading="lazy"
                    className="mt-3 block max-h-72 max-w-full border-2 border-[#4a3728]"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
