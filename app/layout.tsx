import "../styles/globals.css";
import { Footer, ModalDialog, Navbar, LoginForm } from "../components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="bumblebee">
      <head></head>
      <body>
        <Navbar />
        <main className="flex-auto shrink-0">{children}</main>
        <Footer />
        <ModalDialog toggleId="login-modal" Content={LoginForm} />
      </body>
    </html>
  );
}
