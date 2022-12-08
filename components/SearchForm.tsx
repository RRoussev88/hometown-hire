"use client";
import { FC, useState } from "react";
import { BASE_URL } from "../common/utils";

const getBusinesses = async (searchTerm: string) => {
  console.log(searchTerm);
  const url = new URL(`${BASE_URL}/businesses/records`);
  url.searchParams.set("page", "1");
  url.searchParams.set("perPage", "20");
  url.searchParams.set("sort", "name");
  if (searchTerm) {
    url.searchParams.set("filter", `name="${searchTerm}"`);
  }
  // TODO: use pockebase npm library

  const response = await fetch(url);
  const data = await response.json();

  return data?.items;
};

export const SearchForm: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <form className="form-control">
      <div className="input-group">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary btn-square"
          onClick={() => getBusinesses(searchTerm)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};
