"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Panel", href: "/dashboard" },
    { name: "Files", href: "/dashboard/files" },
    { name: "Console", href: "/dashboard/console" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Sesión cerrada");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <aside className="w-64 bg-gray-800 p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-blue-400 mb-8">Waevo</h2>
        <nav className="flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-2 px-4 rounded transition ${
                pathname === item.href ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 hover:bg-red-700 py-2 rounded transition"
        >
          Cerrar sesión
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
