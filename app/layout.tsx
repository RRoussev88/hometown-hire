import "../styles/globals.css";
import { Footer, Navbar, LoginForm, RegisterForm } from "../components";
import { GlobalProvider } from "../context/GlobalContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="bumblebee">
      <head></head>
      <body>
        <GlobalProvider>
          <Navbar />
          <main className="flex-auto shrink-0">{children}</main>
          <LoginForm />
          <RegisterForm />
        </GlobalProvider>
        <Footer />
      </body>
    </html>
  );
}
