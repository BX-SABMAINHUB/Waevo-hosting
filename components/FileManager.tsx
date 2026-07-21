"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

interface File {
  name: string;
  content: string;
  language: string;
}

export default function FileManager() {
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [newFile, setNewFile] = useState({ name: "", content: "", language: "javascript" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchFiles = async () => {
      const docRef = doc(db, "users", user.uid, "data", "files");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFiles(docSnap.data().files || []);
      }
      setLoading(false);
    };
    fetchFiles();
  }, [user]);

  const saveFiles = async (newFiles: File[]) => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid, "data", "files");
    await setDoc(docRef, { files: newFiles });
    setFiles(newFiles);
    toast.success("Archivos guardados");
  };

  const addFile = async () => {
    if (!newFile.name.trim()) return toast.error("Nombre requerido");
    const updated = [...files, { ...newFile }];
    await saveFiles(updated);
    setNewFile({ name: "", content: "", language: "javascript" });
  };

  const deleteFile = async (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    await saveFiles(updated);
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestor de Archivos</h1>
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nombre (ej: bot.js)"
            value={newFile.name}
            onChange={(e) => setNewFile({ ...newFile, name: e.target.value })}
            className="bg-gray-700 p-2 rounded"
          />
          <select
            value={newFile.language}
            onChange={(e) => setNewFile({ ...newFile, language: e.target.value })}
            className="bg-gray-700 p-2 rounded"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="json">JSON</option>
            <option value="html">HTML</option>
          </select>
          <button onClick={addFile} className="bg-blue-600 hover:bg-blue-700 py-2 rounded">
            + Añadir archivo
          </button>
        </div>
        <textarea
          placeholder="Contenido del archivo..."
          value={newFile.content}
          onChange={(e) => setNewFile({ ...newFile, content: e.target.value })}
          className="w-full mt-4 bg-gray-700 p-2 rounded h-32"
        />
      </div>

      <div className="grid gap-4">
        {files.map((file, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded flex justify-between items-center">
            <div>
              <span className="font-mono">{file.name}</span>
              <span className="ml-4 text-sm text-gray-400">{file.language}</span>
            </div>
            <button onClick={() => deleteFile(idx)} className="text-red-400 hover:text-red-600">
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
