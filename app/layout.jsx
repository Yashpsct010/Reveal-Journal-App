import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Reveal",
  description: "A Journal App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={`${inter.className}`}>
        <div className="bg-[#FEFFFE] opacity-50 fixed -z-10 inset-0 bg-cover bg-center bg-no-repeat" />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Toaster position="bottom-right" richColors />
        <footer>
          <div className="bg-blue-300 py-12 bg-opacity-10">
            <p className="mx-auto px-4 text-center text-gray-900">Made with 💗 by Yash Parmar</p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
