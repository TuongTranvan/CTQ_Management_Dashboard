const API_BASE_URL = "http://127.0.0.1:8000";

// cards
export interface OverviewCardsResponse {
    cards: {
        total_strip: number;
        upload_strip: number;
        total_rate: number;

    reflow: {
        total_strip: number;
        upload_strip: number;
        rate: number;
        };

    deflux: {
        total_strip: number;
        upload_strip: number;
        rate: number;
        };

        active_machines: number;
        total_machines: number;
        active_machine_names: string[];
    };
}

export async function getOverviewCards(
  periodType: string,
  periodValue: string,
): Promise<OverviewCardsResponse> {

  const url =
    `${API_BASE_URL}/api/upload/card?period_type=${periodType}&period_value=${periodValue}`;

  console.log("API URL:", url);

  const response = await fetch(url);

  console.log("status =", response.status);
  console.log("url =", response.url);

  const text = await response.text();

  console.log(text);

  console.log("Status:", response.status);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch overview cards: ${response.status}`
    );
  }

//   return response.json();
console.log(text);
return JSON.parse(text);
}

// ======================
// UPLOAD RATE
// ======================

export interface UploadRateResponse {
    process: string;
    period_type: string;
    period_value: string;
    scope: string;
    view_mode: string;

    summary: {
        uploaded: number;
        total: number;
        rate: number;
    };

    chart: {
        period: string;
        lines: {
            line: string;
            uploaded:number;
            total:number;
            rate: number;
        }[];
        machines: {
            machine: string;
            station: string;
            uploaded:number;
            total: number;
            rate: number;
        }[],
    }[],
}

export async function getUploadRateChart(
    process: string,
    periodType: string,
    periodValue: string,
    scope: string = "All"
): Promise<UploadRateResponse> {
    const url = 
    `${API_BASE_URL}/api/upload/rate/chart?process=${process}&period_type=${periodType}&period_value=${periodValue}&scope=${scope}`;

    console.log("UPLOAD RATE URL:", url);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(
            `Failed to fetch upload rate chart: ${response.status}`
        );
    }
    return await response.json();
}

