"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function AdminPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverType, setServerType] = useState("node");
  const [version, setVersion] = useState("18");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;
      // Guardar datos del servidor en Firestore
      await setDoc(doc(db, "users", uid, "data", "server"), {
        type: serverType,
        version,
        createdAt: new Date().toISOString(),
      });
      // Inicializar archivos vacíos
      await setDoc(doc(db, "users", uid, "data", "files"), { files: [] });
      toast.success("Cuenta creada con éxito");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Crear nueva cuenta de usuario</h2>
      <form onSubmit={handleCreate} className="space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-700 p-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-700 p-3 rounded"
          required
        />
        <div className="flex gap-4">
          <select
            value={serverType}
            onChange={(e) => setServerType(e.target.value)}
            className="bg-gray-700 p-3 rounded flex-1"
          >
            <option value="node">Node.js</option>
            <option value="python">Python</option>
          </select>
          <input
            type="text"
            placeholder="Versión (ej: 18, 3.10)"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            className="bg-gray-700 p-3 rounded flex-1"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 py-3 rounded font-bold"
        >
          {loading ? "Creando..." : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
}
