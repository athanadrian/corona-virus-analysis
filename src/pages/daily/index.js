import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Divider } from "semantic-ui-react";
import { API_URL } from "../../constants";
import {
  ComposedChart,
  Line,
  Legend,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import DeathsPerMillionChart from "../../components/deathsPerMillionChart";

const Daily = () => {
  const [dataChart, setDataChart] = useState();
  useEffect(() => {
    async function fetchDailyData() {
      const res = await fetch(`${API_URL}/daily`).then((data) => data.json());
      setDataChart(res);
    }
    fetchDailyData();
  }, []);

  function BuildChart() {
    return (
      <>
        <h3>Σύγκριση: Ξέσπαμσα επιδημίας Κίνα - Υπόλοιπες χώρες</h3>
        <div style={{ width: "100%", maxWidth: "700px", height: 300 }}>
          <ResponsiveContainer>
            <ComposedChart
              width={500}
              height={400}
              data={dataChart}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="reportDate" />
              <YAxis />
              <Legend />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="mainlandChina"
                stroke="#7ca48b"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="otherLocations"
                stroke="#ffc658"
                fill="#ffc658"
              />
              <Line
                type="monotone"
                dataKey="totalConfirmed"
                stroke="#ff7300"
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Στατιστικοί Χάρτες</h1>
      <p>Παγκόσμιο Ξέσπασμα της Επιδημίας από 20/01/2020 μέχρι σήμερα</p>
      <Link to="/">&larr; Πίσω στην αναζήτηση.</Link>
      <Divider />
      <BuildChart />
      <Divider />
      <DeathsPerMillionChart />
    </div>
  );
};

export default Daily;
