"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function DashboardHome() {
  const { user } = useAuth();
  const [serverInfo, setServerInfo] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    const fetchServer = async () => {
      const docRef = doc(db, "users", user.uid, "data", "server");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setServerInfo(docSnap.data());
    };
    fetchServer();
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Panel de Waevo</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <p className="text-lg">Bienvenido, <span className="text-blue-400">{user?.email}</span></p>
        {serverInfo && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Tipo de servidor</p>
              <p className="font-mono">{serverInfo.type === "node" ? "Node.js" : "Python"}</p>
            </div>
            <div>
              <p className="text-gray-400">Versión</p>
              <p className="font-mono">{serverInfo.version}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
