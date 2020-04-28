import React, { useEffect, useState } from "react";
import _ from "lodash";
import { API_URL } from "../../constants";
import StatsTable from "./statsTable";

/**
 * Use to get the display name based on the country names in the deaths data. Use to override the deaths data name and
 * make sure that the same country is treated as the same even if the name in the death data changes.
 * @param {string} country
 */
export function getDisplayAlias(country) {
  const trimmedCountry = country.trim();
  const DISPLAY_ALIASES = Object.freeze({
    "cape verde": "cape verde",
    "Cote d'Ivoire": "cote divoire",
    "Holy See": "Vatican City",
    "Hong Kong SAR": "Hong Kong",
    "Iran (Islamic Republic of)": "Iran",
    "Korea, South": "South Korea",
    "Macao SAR": "Macao",
    "Mainland China": "China",
    "North Macedonia": "macedonia",
    "Republic of Korea": "South Korea",
    "Republic of Moldova": "Moldova",
    "Republic of the Congo": "Congo (Brazzaville)",
  });
  return DISPLAY_ALIASES[trimmedCountry] || trimmedCountry;
}

const Stats = () => {
  const [countryData, setCountryData] = useState();
  useEffect(() => {
    const fetchStats = async () => {
      const data = await fetch(`${API_URL}/deaths`).then((data) => data.json());
      const grouped = _.groupBy(data, "countryRegion");
      const tableData = [];
      Object.entries(grouped).forEach((country, index) => {
        let confirmed = 0;
        let deaths = 0;
        let recovered = 0;
        let active = 0;
        tableData.push({ country: country[0] });
        country[1].forEach((i) => {
          confirmed += i.confirmed;
          deaths += i.deaths;
          recovered += i.recovered;
          active += i.active;
          tableData[index].iso2 = i.iso2;
          tableData[index].confirmed = confirmed;
          tableData[index].deaths = deaths;
          tableData[index].recovered = recovered;
          tableData[index].active = active;
          tableData[index].mortality = parseFloat(
            (Math.round(deaths * 100) / confirmed).toFixed(1)
          );
        });
      });
      setCountryData(tableData);
    };
    fetchStats();
  }, []);
  if (!countryData) return <p>φόρτωση...</p>;
  return (
    <div style={{ padding: 20 }}>
      <StatsTable data={countryData} />
    </div>
  );
};

export default Stats;
