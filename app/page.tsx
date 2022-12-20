import { NextPage } from "next";
import Link from "next/link";
import { SearchForm } from "../components";

const Home: NextPage = () => (
  <div
    className="hero min-h-full"
    style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` }}
  >
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-center text-primary p-6 sm:p-12">
      <div className="max-w-sm">
        <h1 className="mb-5 text-2xl sm:text-5xl font-bold">
          Welcome to&nbsp;<Link href="/">Hiretown</Link>
        </h1>
        <p className="mb-5">Get started by searching a Hire</p>
        <SearchForm />
      </div>
    </div>
  </div>
);

export default Home;
