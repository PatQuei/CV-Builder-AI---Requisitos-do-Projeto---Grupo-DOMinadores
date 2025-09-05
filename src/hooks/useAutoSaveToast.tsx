import { useState, useEffect } from "react";

export function useAutoSaveToast(
  key: string,
  value: any,
  delay = 1500,
  toastDuration = 3000
) {
  const [message, setMessage] = useState<string | null>(null);

  // Função para mostrar toast
  const showToast = (msg: string) => setMessage(msg);

  // Auto-save
  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(value));
      showToast("💾 Dados salvos automaticamente!");
    }, delay);

    return () => clearTimeout(handler);
  }, [value, key, delay]);

  // Esconde o toast automaticamente
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), toastDuration);
      return () => clearTimeout(timer);
    }
  }, [message, toastDuration]);

  // Componente do Toast
  const ToastComponent = () =>
    message ? (
      <div
        className="fixed bottom-5 right-5 bg-gray-900 dark:bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ease-out animate-fade-in"
        style={{ opacity: message ? 1 : 0 }}
      >
        {message}
      </div>
    ) : null;

  return { ToastComponent };
}
