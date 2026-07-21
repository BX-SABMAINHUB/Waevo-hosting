"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { user } = useAuth();
  const [startup, setStartup] = useState("");
  const [packages, setPackages] = useState("");

  useEffect(() => {
    if (!user) return;
    const fetchSettings = async () => {
      const docRef = doc(db, "users", user.uid, "data", "settings");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStartup(data.startup || "");
        setPackages(data.packages || "");
      }
    };
    fetchSettings();
  }, [user]);

  const saveSettings = async () => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid, "data", "settings");
    await setDoc(docRef, { startup, packages });
    toast.success("Configuración guardada");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Ajustes</h1>
      <div className="bg-gray-800 p-6 rounded-lg space-y-4">
        <div>
          <label className="block text-gray-400 mb-2">Comando de inicio (startup)</label>
          <input
            type="text"
            value={startup}
            onChange={(e) => setStartup(e.target.value)}
            placeholder="Ej: node bot.js"
            className="w-full bg-gray-700 p-3 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Paquetes adicionales (separados por espacio)</label>
          <input
            type="text"
            value={packages}
            onChange={(e) => setPackages(e.target.value)}
            placeholder="Ej: express dotenv"
            className="w-full bg-gray-700 p-3 rounded"
          />
        </div>
        <button
          onClick={saveSettings}
          className="bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded font-bold"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
