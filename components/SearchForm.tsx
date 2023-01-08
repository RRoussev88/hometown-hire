"use client";
import "react-toastify/dist/ReactToastify.css";
import clsx from "clsx";
import { FC, useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { useQuery } from "react-query";
import {
  APIError,
  APIResponse,
  BASE_API_URL,
  isApiResponse,
  Service,
  ServiceCategory,
} from "../common";
import { Search } from "./SvgIcons";

const fetchCategories = async () => {
  const response = await fetch(`${BASE_API_URL}/serviceCategories`);

  const data: APIResponse<ServiceCategory> | APIError = await response.json();
  if (response.ok) {
    toast.dismiss();
    return data as APIResponse<ServiceCategory>;
  }

  toast.error(
    (data as APIError).isSystemError
      ? (data as APIError).message
      : "Service Categories error: Failed to load service categories data"
  );
};

const useServices = (category: string | null) => {
  const [services, setServices] = useState<Service[]>([]);

  const fetchData = async () => {
    if (!category) {
      setServices([]);
      return;
    }
    const response = await fetch(
      `${BASE_API_URL}/services?category=${category}`
    );

    // TODO: Use pagination
    const data: unknown = await response.json();
    if (response.ok) {
      setServices(isApiResponse<Service>(data) ? data.items : []);
    } else {
      toast.error(
        `Services error: ${
          (data as { error: string })?.error ?? "Failed to load services data"
        }`
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
  const { data: categories, isLoading: isLoadingCategories } = useQuery<
    APIResponse<ServiceCategory> | undefined
  >("categories", fetchCategories);

  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategory | null>(() => categories?.items[0] ?? null);

  const services = useServices(selectedCategory?.id ?? null);
  const [selectedService, setSelectedService] = useState<Service | null>(
    () => services?.[0] ?? null
  );

  useEffect(() => {
    setSelectedCategory(categories?.items[0] ?? null);
  }, [categories]);

  useEffect(() => {
    setSelectedService(services?.[0] ?? null);
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
                  categories?.items.find(
                    (category) => category.name === event.target.value
                  ) ?? null
                )
              }
            >
              {categories?.items.map((category: ServiceCategory) => (
                <option key={category.id}>{category.name}</option>
              )) ?? null}
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
          className={clsx("btn btn-primary", { loading: isLoadingCategories })}
        >
          Search&nbsp;
          <Search />
        </Link>
      </form>
      <ToastContainer hideProgressBar newestOnTop theme="colored" limit={3} />
    </>
  );
};
