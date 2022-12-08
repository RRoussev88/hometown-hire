import { NextPage } from "next";
import Link from "next/link";
import { SearchForm } from "../components";

const Home: NextPage = () => (
  <div
    className="hero h-96 min-h-full"
    style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` }}
  >
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-center text-neutral-content mx-3">
      <div className="max-w-xl">
        <h1 className="mb-5 text-5xl font-bold">
          Welcome to <Link href="/">Hiretown</Link>
        </h1>
        <p className="mb-5">Get started by searching a Hire</p>
        <SearchForm />
      </div>
    </div>
  </div>
);

export default Home;
