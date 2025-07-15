"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define o tipo do contexto do Toast
type ToastContextType = {
    showToast: (message: string, duration: number) => void; // Função para exibir o toast
};

// Cria o contexto do Toast
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provider que gerencia o estado do toast e fornece a função showToast
export function ToastProvider({ children }: { children: ReactNode }) {
    // Estado para armazenar a mensagem do toast
    const [message, setMessage] = useState<string | null>(null);

    // Função para exibir o toast com uma mensagem
    const showToast = (msg: string, duration: number) => {
        setMessage(msg); // Define a mensagem
        setTimeout(() => setMessage(null), duration); // Esconde após 1,5s
    };

    return (
        // Fornece a função showToast para os componentes filhos
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Renderiza o toast se houver mensagem */}
            {message && (
                <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg text-sm z-50 animate-fade-in">
                    {message}
                </div>
            )}
        </ToastContext.Provider>
    );
}

// Hook personalizado para acessar o contexto do Toast
export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx;
}