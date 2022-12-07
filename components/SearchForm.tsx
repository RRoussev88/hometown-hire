import { FC, useState } from "react";

type SearchFormType = { handleSearch: (term: string) => void };

export const SearchForm: FC<SearchFormType> = ({ handleSearch }) => {
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
          onClick={() => handleSearch(searchTerm)}
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
