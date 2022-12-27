import type { Business } from "../../common";
import { BASE_URL } from "../../common/utils";
import { BusinessCard, SearchForm } from "../../components";

const getBusinesses = async (searchTerm?: string) => {
  const url = new URL(`${BASE_URL}/businesses/records`);
  url.searchParams.set("page", "1");
  url.searchParams.set("perPage", "20");
  url.searchParams.set("sort", "name");
  url.searchParams.set("expand", "services");
  if (searchTerm) {
    url.searchParams.set("filter", `services ~ "${searchTerm}"`);
  }
  // TODO: use pockebase npm library

  const response = await fetch(url);
  const data: { items: Business[] } = await response.json();

  return data?.items;
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { serviceId?: string };
}) {
  const businesses = await getBusinesses(searchParams.serviceId);

  return (
    <main className="p-6">
      <section className="max-w-2xl mx-auto mb-6 sm:mb-12">
        <SearchForm />
      </section>
      <section>
        {businesses.length ? (
          <div className="flex flex-wrap gap-6">
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <p className="bg-base-100 p-6 rounded-lg shadow-xl">
            {searchParams.serviceId && searchParams.serviceId !== "undefined"
              ? "No businesses offering that service"
              : "No services in that category"}
          </p>
        )}
      </section>
    </main>
  );
}
