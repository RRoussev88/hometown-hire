"use client";
import "react-toastify/dist/ReactToastify.css";
import { FC, useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { BASE_URL, isApiResponse, Service, ServiceCategory } from "../common";

const useCategories = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  const fetchData = async () => {
    const response = await fetch(`${BASE_URL}/serviceCategories`);

    // TODO: Use pagination
    const data: unknown = await response.json();
    if (response.ok) {
      setCategories(isApiResponse<Service>(data) ? data.items : []);
    } else {
      setCategories([]);
      toast.error(
        (data as { error: string })?.error ??
          "Failed to load service categories data"
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return categories;
};

const useServices = (category: string | null) => {
  const [services, setServices] = useState<Service[]>([]);

  const fetchData = async () => {
    const response = await fetch(`${BASE_URL}/services?category=${category}`);

    // TODO: Use pagination
    const data: unknown = await response.json();
    if (response.ok) {
      if (category) {
        setServices(isApiResponse<Service>(data) ? data.items : []);
      } else {
        setServices([]);
      }
    } else {
      toast.error(
        (data as { error: string })?.error ?? "Failed to load services data"
      );
    }
  };

  const callbackFetch = useCallback(fetchData, [category]);

  useEffect(() => {
    callbackFetch();
  }, [callbackFetch]);

  return services;
};

export const SearchForm: FC = () => {
  const categories = useCategories();
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategory | null>(() => categories?.[0] ?? null);

  const services = useServices(selectedCategory?.id ?? null);
  const [selectedService, setSelectedService] = useState<Service | null>(
    () => services?.[0] ?? null
  );

  useEffect(() => {
    setSelectedService(services?.[0]);
  }, [services]);

  return (
    <>
      <form className="rounded-md p-4 bg-base-100 shadow-xl text-accent form-control gap-2">
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
            <select
              className="select select-bordered truncate"
              onChange={(event) =>
                setSelectedService(
                  services.find(
                    (category) => category.name === event.target.value
                  ) ?? null
                )
              }
            >
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
        <Link
          href={`/search?serviceId=${selectedService?.id}`}
          className="btn btn-primary"
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
        </Link>
      </form>
      <ToastContainer hideProgressBar newestOnTop theme="colored" />
    </>
  );
};
