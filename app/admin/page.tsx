"use client";
import { useState } from "react";
import AdminPanel from "@/components/AdminPanel";

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  const handlePlusClick = () => {
    setShowPrompt(true);
  };

  const checkPassword = () => {
    if (passwordInput === "Alex27Junio") {
      setUnlocked(true);
      setShowPrompt(false);
      setPasswordInput("");
    } else {
      alert("Contraseña incorrecta");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Botón "+" casi invisible en la esquina inferior derecha */}
      <button
        onClick={handlePlusClick}
        className="fixed bottom-4 right-4 text-gray-700 hover:text-gray-500 text-4xl font-bold transition"
        style={{ opacity: 0.2 }}
      >
        +
      </button>

      {showPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Ingresa la contraseña</h2>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="bg-gray-700 p-3 rounded w-full mb-4"
              placeholder="Contraseña"
              onKeyDown={(e) => e.key === "Enter" && checkPassword()}
            />
            <button
              onClick={checkPassword}
              className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
            >
              Validar
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className="ml-2 text-gray-400 hover:text-white"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {unlocked && (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Panel de Administración</h1>
          <AdminPanel />
        </div>
      )}
    </div>
  );
}
