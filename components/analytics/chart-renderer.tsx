"use client";

import cube, { PivotConfig, Query } from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import WebSocketTransport from "@cubejs-client/ws-transport";
import { ChartType } from "@/types/chart.js";
import { QueryRenderer } from "../cubejs/query-renderer";
import { ChartViewer } from "../cubejs/chart-viewer";

interface ChatProps {
  chartQuery: Query;
  chartType: ChartType;
  useWebSockets: boolean;
  useSubscription: boolean;
  pivotConfig: PivotConfig;
}

const apiUrl = process.env.NEXT_PUBLIC_CUBE_API_URL || "";
const apiToken = process.env.NEXT_PUBLIC_CUBE_API_TOKEN || "";

const ChartRenderer = ({
  chartQuery,
  chartType,
  useWebSockets,
  useSubscription,
  pivotConfig,
}: ChatProps) => {
  let transport = undefined;

  if (useWebSockets) {
    transport = new WebSocketTransport({ authorization: apiToken, apiUrl });
  }

  console.log(apiUrl,'apiUrl')
  const cubeApi = cube(apiToken, { apiUrl, transport });

  return (
    <>
      <CubeProvider cubeApi={cubeApi}>
        <QueryRenderer query={chartQuery} subscribe={useSubscription}>
          {({ resultSet }) => {
            return (
              <ChartViewer
                chartType={chartType}
                resultSet={resultSet}
                pivotConfig={pivotConfig}
              />
            );
          }}
        </QueryRenderer>
      </CubeProvider>
    </>
  );
};

export default ChartRenderer;
