import "./globals.css";
import { Toaster } from "react-hot-toast";
import Sidebar from "../components/layout/sidebar";
import Navbar from "../components/layout/navbar";
import AuthListener from "../components/common/AuthListener";

export const metadata = {
  title: "Ethara Seat Allocation",
  description: "Ethara Seat Allocation System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <AuthListener />
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="flex-1 min-h-screen overflow-y-auto">
            <Navbar />
            <main className="p-6">{children}</main>
          </div>
        </div>

        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}