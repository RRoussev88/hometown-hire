import type { APIResponse, Business } from "../../common";
import { BASE_API_URL, isApiResponse } from "../../common/utils";
import { Alert, BusinessCard, SearchForm } from "../../components";

const getBusinesses = async (
  searchTerm?: string
): Promise<[APIResponse<Business>, string]> => {
  const defResponse: APIResponse<Business> = {
    page: 0,
    perPage: 0,
    totalItems: 0,
    totalPages: 0,
    items: [],
  };
  const response = await fetch(
    `${BASE_API_URL}/businesses?serviceId=${searchTerm}`
  );

  // TODO: Use pagination
  const data: unknown = await response.json();
  if (response.ok) {
    return [isApiResponse<Business>(data) ? data : defResponse, ""];
  }
  return [
    defResponse,
    (data as { error: string })?.error ?? "Failed to load businesses data",
  ];
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { serviceId?: string };
}) {
  const [businesses, error] = await getBusinesses(searchParams.serviceId);

  return (
    <main className="p-6">
      <section className="max-w-2xl mx-auto mb-6 sm:mb-12">
        <SearchForm />
      </section>
      <section>
        {!!error && <Alert text={error} mode="error" />}
        {!error && !!businesses.items.length && (
          <div className="flex flex-wrap gap-6">
            {businesses.items.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}
        {!error && !businesses.items.length && (
          <Alert
            mode="info"
            text={
              searchParams.serviceId && searchParams.serviceId !== "undefined"
                ? "No businesses offering that service"
                : "No service is selected"
            }
          />
        )}
      </section>
    </main>
  );
}
