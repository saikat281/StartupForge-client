import StartupsComponent from "@/Components/StartupsComponent";

const StartupsPage = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/mystartup`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch startups");
  }

  const StartupData = await res.json();

  const filterStartupData = Array.isArray(StartupData)
    ? StartupData.filter((data) => data.status === "approved")
    : [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Startups
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Browse startups building on the platform.
        </p>
      </div>

      <StartupsComponent startups={filterStartupData} />
    </div>
  );
};

export default StartupsPage;
