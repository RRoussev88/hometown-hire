import "../styles/globals.css";
import { Footer, Navbar, LoginForm, RegisterForm } from "../components";
import { GlobalProvider } from "../context/GlobalContext";
import { QueryProvider } from "../context/QueryContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="bumblebee">
      <head></head>
      <body>
        <QueryProvider>
          <GlobalProvider>
            <Navbar />
            <main className="bg-base-200 flex-auto shrink-0">{children}</main>
            <LoginForm />
            <RegisterForm />
          </GlobalProvider>
        </QueryProvider>
        <Footer />
      </body>
    </html>
  );
}
