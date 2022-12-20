"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { BASE_URL, Service, ServiceCategory } from "../common";

const getBusinesses = async (searchTerm?: string) => {
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

const useCategories = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  const fetchData = async () => {
    const url = new URL(`${BASE_URL}/serviceCategories/records`);
    url.searchParams.set("page", "1");
    url.searchParams.set("perPage", "20");
    url.searchParams.set("sort", "name");

    const response = await fetch(url);
    const data = await response.json();

    setCategories(data?.items);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return categories;
};

const useServices = (category: string | null) => {
  const [services, setServices] = useState<Service[]>([]);

  const fetchData = async () => {
    const url = new URL(`${BASE_URL}/services/records`);
    url.searchParams.set("page", "1");
    url.searchParams.set("perPage", "20");
    url.searchParams.set("sort", "name");

    if (category) {
      url.searchParams.set("filter", `category="${category}"`);
      const response = await fetch(url);
      const data = await response.json();

      setServices(data?.items);
    } else {
      setServices([]);
    }
  };

  const callbackFetch = useCallback(fetchData, [category]);

  useEffect(() => {
    callbackFetch();
  }, [callbackFetch]);

  return services;
};

export const SearchForm: FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategory | null>(null);

  const categories = useCategories();
  const services = useServices(selectedCategory?.id ?? null);

  return (
    <form className="rounded-md p-4 bg-base-200 text-accent form-control gap-2">
      <div className="flex flex-row max-sm:flex-col gap-2">
        <div className="form-control w-full sm:w-1/2">
          <label className="label">Category</label>
          <select
            className="select select-bordered truncate"
            onChange={(event) =>
              setSelectedCategory(
                categories.find(
                  (category) => category.name === event.target.value
                ) ?? null
              )
            }
          >
            {categories.map((category: ServiceCategory) => (
              <option key={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="form-control w-full sm:w-1/2">
          <label className="label">Service</label>
          <select className="select select-bordered truncate">
            {services.map((service: Service) => (
              <option key={service.id}>{service.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-row max-sm:flex-col gap-2">
        <div className="form-control flex-1">
          <label className="label">Area</label>
          <select className="select select-bordered">
            <option>Star Wars</option>
          </select>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => getBusinesses()}
      >
        Search&nbsp;
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
    </form>
  );
};
