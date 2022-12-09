import "../styles/globals.css";
import Head from "./head";
import { Footer, ModalDialog, Navbar, LoginForm } from "../components";

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
        <main className="flex-auto shrink-0">{children}</main>
        <Footer />
        <ModalDialog>
          <LoginForm />
        </ModalDialog>
      </body>
    </html>
  );
}
