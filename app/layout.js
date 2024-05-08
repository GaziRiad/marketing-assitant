import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  icons: {
    icon: ["/fav/favicon.ico?v=4"],
    apple: ["/fav/apple-touch-icon.png?v=4"],
    shortcut: ["/fav/apple-touch-icon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
