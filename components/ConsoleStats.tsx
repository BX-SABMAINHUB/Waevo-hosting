"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ConsoleStats() {
  // Estado de conexión (false por defecto)
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Datos estáticos (se actualizarán cuando se conecte a la API real)
  const [stats, setStats] = useState({
    cpu: "0%",
    ram: "0 MB / 0 MB",
    disk: "0 GB / 0 GB",
    network: "0 Mbps",
  });

  // Logs iniciales (indican que está desactivado)
  const [logs, setLogs] = useState<string[]>([
    "[SISTEMA] Servicio de consola desactivado",
    "[INFO] Conecta con Pterodactyl para ver logs reales",
  ]);

  // Función para "activar" la consola (simula conexión)
  const handleConnect = async () => {
    setIsLoading(true);
    try {
      // Aquí iría la llamada real a la API de Pterodactyl
      // Por ahora, siempre falla para mantenerlo desactivado
      await new Promise((resolve) => setTimeout(resolve, 1500));
      throw new Error("El servicio de consola no está disponible aún. Configura la API de Pterodactyl.");
    } catch (error: any) {
      toast.error(error.message || "No se pudo conectar");
      // Añadir log de error
      setLogs((prev) => [
        ...prev,
        `[ERROR] ${error.message || "Fallo de conexión"}`,
      ]);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para desactivar (resetear)
  const handleDisconnect = () => {
    setIsConnected(false);
    setStats({
      cpu: "0%",
      ram: "0 MB / 0 MB",
      disk: "0 GB / 0 GB",
      network: "0 Mbps",
    });
    setLogs([
      "[SISTEMA] Servicio de consola desactivado",
      "[INFO] Conecta con Pterodactyl para ver logs reales",
    ]);
    toast.success("Consola desconectada");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Consola y Recursos</h1>
        <div className="flex gap-2">
          {!isConnected ? (
            <button
              onClick={handleConnect}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-bold disabled:opacity-50"
            >
              {isLoading ? "Conectando..." : "Activar consola"}
            </button>
          ) : (
            <button
              onClick={handleDisconnect}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold"
            >
              Desactivar consola
            </button>
          )}
        </div>
      </div>

      {/* Indicador de estado */}
      <div className={`mb-4 p-2 rounded text-center font-bold ${isConnected ? "bg-green-800 text-green-200" : "bg-yellow-800 text-yellow-200"}`}>
        {isConnected ? "✅ Consola activa" : "⛔ Consola desactivada (sin conexión real)"}
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-gray-400">CPU</p>
          <p className="text-xl font-bold">{stats.cpu}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-gray-400">RAM</p>
          <p className="text-xl font-bold">{stats.ram}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-gray-400">Disco</p>
          <p className="text-xl font-bold">{stats.disk}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-gray-400">Red</p>
          <p className="text-xl font-bold">{stats.network}</p>
        </div>
      </div>

      {/* Logs */}
      <div className="bg-black p-4 rounded h-80 overflow-y-auto font-mono text-sm">
        {logs.map((log, i) => (
          <div key={i} className="border-b border-gray-700 py-1">
            {log}
          </div>
        ))}
      </div>

      {/* Mensaje informativo */}
      <p className="text-gray-500 text-sm mt-4">
        * La consola real requiere conexión con el panel de Pterodactyl. 
        Actualmente está desactivada. El botón "Activar consola" es un placeholder para futura integración.
      </p>
    </div>
  );
}
