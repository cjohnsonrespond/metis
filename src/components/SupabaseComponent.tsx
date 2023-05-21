import React, { useEffect, useState } from "react";
import { createClient, PostgrestResponse } from "@supabase/supabase-js";

const supabaseUrl = "https://begngpuiwkhprlwrqljt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlZ25ncHVpd2tocHJsd3JxbGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE2NTQ0NDUsImV4cCI6MTk5NzIzMDQ0NX0.XucBQEvlRYe7-4LGxy6ORWniXny-e7FslhLmwnAx440";

const supabase = createClient(supabaseUrl, supabaseKey);

interface PredictionData {
  // Define the shape of your prediction data here
  country: string;
  political: string;
  economic: string;
  social: string;
  military: string;
  environmental: string;
  "Most Likely to Occur": string;
  "Probability of Conflict": string;
  "Active Conflict": string;
}

const SupabaseComponent = () => {
  const [data, setData] = useState<PredictionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: predictions,
          error,
        }: PostgrestResponse<PredictionData> = await supabase
          .from("predictions")
          .select("*");

        if (error) {
          throw new Error(error.message);
        }

        setData(predictions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    "country",
    "political",
    "economic",
    "social",
    "military",
    "environmental",
    "Most Likely to Occur",
    "Probability of Conflict",
    "Active Conflict",
  ];

  return (
    <div className="min-w-full overflow-x-auto">
      <h1 className="text-2xl font-bold text-white mb-4">
        {" "}
        Conflict Prediction Matrix
      </h1>
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="py-2 px-4 text-left font-medium text-gray-500 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((prediction, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td
                  key={column}
                  className="py-2 px-4 whitespace-nowrap text-black"
                >
                  {prediction[column as keyof PredictionData]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupabaseComponent;
