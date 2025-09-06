import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import * as turf from "@turf/turf";

const StatsMapView = ({ data }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [regionCounts, setRegionCounts] = useState({});

  // Step 1: Fetch Ghana region polygons
  useEffect(() => {
    const fetchGeoJson = async () => {
      const res = await fetch(
        "https://raw.githubusercontent.com/virgoaugustine/Ghana-GeoJSON-data/master/ghana_regions.json"
      );
      const geo = await res.json();
      setGeoJsonData(geo);

      // Step 2: Count issues per region
      const counts = {};

      geo.features.forEach((feature) => {
        const regionName = feature?.properties?.region?.toLowerCase();
        if (!regionName) return;
        counts[regionName] = 0;
      });

      data.forEach((issue) => {
        const lat = parseFloat(issue.latitude);
        const lon = parseFloat(issue.longitude);

        if (isNaN(lat) || isNaN(lon)) return;

        const point = turf.point([lon, lat]);

        geo.features.forEach((feature) => {
          const polygon = turf.polygon(feature.geometry.coordinates);
          const regionName = feature?.properties?.region?.toLowerCase();

          if (regionName && turf.booleanPointInPolygon(point, polygon)) {
            counts[regionName] = (counts[regionName] || 0) + 1;
          }
        });
      });

      setRegionCounts(counts);
    };

    fetchGeoJson();
  }, [data]);

  // Step 3: Style regions based on issue count
  const getRegionStyle = (regionName) => {
    const key = regionName?.toLowerCase?.(); // optional chaining avoids crash
    const count = key ? regionCounts[key] || 0 : 0;

    let fillColor = "#f2f2f2";
    if (count > 20) fillColor = "#800026";
    else if (count > 10) fillColor = "#BD0026";
    else if (count > 5) fillColor = "#E31A1C";
    else if (count > 0) fillColor = "#FC4E2A";

    return {
      fillColor,
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  return (
    <MapContainer
      center={[7.9465, -1.0232]}
      zoom={6}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          style={(feature) => {
            const regionName = feature?.properties?.region;
            return getRegionStyle(regionName);
          }}
          onEachFeature={(feature, layer) => {
            const region = feature?.properties?.region;
            const count = regionCounts[region?.toLowerCase?.()] || 0;
            layer.bindPopup(`<strong>${region}</strong><br/>Issues: ${count}`);
          }}
        />
      )}
    </MapContainer>
  );
};

export default StatsMapView;
