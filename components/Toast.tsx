"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type ToastVariant = "success" | "error" | "info";

type Toast = {
  id: number;
  message: string;
  variant: ToastVariant;
  leaving: boolean;
};

type ShowToast = (message: string, variant?: ToastVariant) => void;

const ToastContext = createContext<ShowToast | null>(null);

/** Panggil dari komponen mana pun: const toast = useToast(); toast("Pesan"). */
export function useToast(): ShowToast {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast harus dipakai di dalam <ToastProvider>");
  }
  return ctx;
}

const ICONS: Record<ToastVariant, React.ReactNode> = {
  success: <path d="M20 6L9 17l-5-5" />,
  error: <path d="M18 6L6 18M6 6l12 12" />,
  info: <path d="M12 8h.01M11 12h1v4h1" />,
};

const ACCENT: Record<ToastVariant, string> = {
  success: "text-gold",
  error: "text-red-300",
  info: "text-cream",
};

function ToastItem({ toast }: { toast: Toast }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`${toast.leaving ? "animate-toast-out" : "animate-toast-in"} flex items-center gap-2 rounded-full border border-gold/30 bg-panel-2/95 px-4 py-2.5 text-[0.8rem] font-semibold text-cream shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`w-4 shrink-0 ${ACCENT[toast.variant]}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {ICONS[toast.variant]}
      </svg>
      {toast.message}
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const show = useCallback<ShowToast>((message, variant = "success") => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message, variant, leaving: false }]);
    // Tandai keluar → main animasi toast-out
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)),
      );
    }, 2500);
    // Hapus dari DOM setelah animasi keluar selesai
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500 + 320);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[100] flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
