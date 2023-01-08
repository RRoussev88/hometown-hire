import "../styles/globals.css";
import type { NextPage } from "next";
import { Footer } from "../components";

const NotFound: NextPage = () => (
  <main
    data-theme="bumblebee"
    className="bg-base-200 min-h-screen flex flex-col"
  >
    <div className="hero h-52 bg-base-200 flex-auto shrink-0">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-xl sm:text-5xl font-bold">Page not found</h1>
          <p className="py-6 text-xs sm:text-base">
            The page you are trying to acces doesn&apos;t exist.
          </p>
          <a href="/" className="btn btn-primary">
            Go Home
          </a>
        </div>
      </div>
    </div>
    <Footer />
  </main>
);

export default NotFound;
