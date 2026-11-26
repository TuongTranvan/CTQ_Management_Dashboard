// ======================
// OUT SPEC RATE
// ======================
const API_BASE_URL = "http://127.0.0.1:8000";

export interface OutSpecRateResponse {
  process: string;
  period_type: string;
  period_value: string;
  scope: string;
  view_mode: string;

  summary: {
    fail: number;
    total: number;
    rate: number;
  };

  chart: {
    period: string;

    lines: {
      line: string;
      fail: number;
      total: number;
      rate: number;
    }[];

    machines: {
      machine: string;
      fail: number;
      total: number;
      rate: number;
    }[];
  }[];
}

export async function getOutSpecRateChart(
  process: string,
  periodType: string,
  periodValue: string,
  scope: string = "All"
): Promise<OutSpecRateResponse> {

  const url =
    `${API_BASE_URL}/api/out-spec/chart` +
    `?process=${process}` +
    `&period_type=${periodType}` +
    `&period_value=${periodValue}` +
    `&scope=${scope}`;

  console.log("OUT SPEC RATE URL:", url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch out spec rate chart: ${response.status}`
    );
  }

  return await response.json();
}