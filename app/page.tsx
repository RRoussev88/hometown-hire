"use client";
import { NextPage } from "next";
import Link from "next/link";
import { SearchForm } from "../components";
import { BASE_URL } from "../common/utils";

const getBusinesses = async (searchTerm: string) => {
  console.log(searchTerm);
  const url = new URL(`${BASE_URL}/businesses/records`);
  url.searchParams.set("page", "1");
  url.searchParams.set("perPage", "20");
  url.searchParams.set("sort", "name");
  // TODO: use pockebase npm library

  const response = await fetch(url);
  const data = await response.json();

  return data?.items;
};

const Home: NextPage = () => {
  return (
    <main>
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
            <SearchForm handleSearch={getBusinesses} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
