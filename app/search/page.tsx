import type { Business } from "../../common";
import { BASE_URL, isApiResponse } from "../../common/utils";
import { BusinessCard, SearchForm } from "../../components";

const getBusinesses = async (searchTerm?: string) => {
  const response = await fetch(
    `${BASE_URL}/businesses?serviceId=${searchTerm}`
  );

  // TODO: Use the error message sent by the API
  // TODO: Use pagination
  if (response.ok) {
    const data: unknown = await response.json();
    return isApiResponse<Business>(data) ? data.items : [];
  }
  return [];
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { serviceId?: string };
}) {
  const businesses: Business[] = await getBusinesses(searchParams.serviceId);

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
              : "No service is selected"}
          </p>
        )}
      </section>
    </main>
  );
}
