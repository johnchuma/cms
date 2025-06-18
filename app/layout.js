import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });
export const metadata = {
  title: "Hemani",
  description: "Simplify Church Operations with the our Management Tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="facebook-domain-verification"
          content="qalqux8lvmic3tbrq2kq8i9thx02uj"
        />
      </head>
      <body className={plusJakartaSans.className}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
