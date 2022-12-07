import "../styles/globals.css";
import Head from "./head";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="bumblebee">
      <Head />
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
