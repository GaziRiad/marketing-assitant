import { TemplateProvider } from "@/components/context/TemplateContext";
import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Marketing assistant",
  description:
    "marketing assistant website, to sell marketing packages online.",
  icons: {
    icon: ["/fav/favicon.ico?v=4"],
    apple: ["/fav/apple-touch-icon.png?v=4"],
    shortcut: ["/fav/apple-touch-icon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className="font-main">
        <TemplateProvider>
          <Header />
          <main className="mt-16">{children}</main>
        </TemplateProvider>
      </body>
    </html>
  );
}
