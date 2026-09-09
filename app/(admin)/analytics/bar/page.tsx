import ChartRenderer from "@/components/analytics/chart-renderer";

export default function Page() {
  const defaultPivot = {
    x: ["users.state"],
    y: ["measures"],
    fillMissingDates: true,
  };

  const query = {
    dimensions: ["users.state"],
    measures: ["users.count", "base_orders.total"],
  };

  return (
    <>
      <ChartRenderer
        chartQuery={query}
        chartType="bar"
        useWebSockets={false}
        useSubscription={false}
        pivotConfig={defaultPivot}
      />
    </>
  );
}
