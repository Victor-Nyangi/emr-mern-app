import ChartRenderer from "@/components/analytics/chart-renderer";

export default function Page() {
  const query = {
    dimensions: ["users.state"],
    measures: [
      "users.count",
      "base_orders.wau",
      "base_orders.total",
      "base_orders.dau",
    ],
  };
  const defaultPivot = {
    x: ["users.state"],
    y: ["measures"],
    fillMissingDates: true,
  };

  return (
    <>
      <ChartRenderer
        chartQuery={query}
        chartType="line"
        useWebSockets={false}
        useSubscription={false}
        pivotConfig={defaultPivot}
      />
    </>
  );
}
