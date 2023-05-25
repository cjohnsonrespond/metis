import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { SearchBox } from "./searchBox";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2hyaXNqb2huc29ucHIiLCJhIjoiY2w2Y2UxMXZtMjZoeDNibjNobTlwNDVnbSJ9.lCf2hvyuoxjuk4wmGgvUTg";

type MapComponent2Props = {
  addingMarker: boolean;
  setAddingMarker: (addingMarker: boolean) => void;
  setMarkerData: (data: any) => void; // Replace 'any' with the type of data
};

const MapComponent2: React.FC<MapComponent2Props> = ({
  addingMarker,
  setAddingMarker,
  setMarkerData,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

  useEffect(() => {
    const initializeMap = () => {
      if (!mapContainerRef.current) return; // Early return if current is null

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/chrisjohnsonpr/clgs594hv003k01pie798e370",
        center: [-68.137343, 45.137451],
        zoom: 4,
      });
      const navigationControl = new mapboxgl.NavigationControl();
      map.addControl(navigationControl, "top-right");
      map.addControl(new mapboxgl.FullscreenControl(), "top-right");

      map.on("load", () => {
        setMap(map);

        const draw = new MapboxDraw({
          displayControlsDefault: false,
          controls: {
            polygon: true,
            trash: true,
          },
        });
        map.addControl(draw, "top-right");

        map.on("draw.create", function (e) {
          const data = draw.getAll();
          if (data.features.length > 0) {
            const geometry = data.features[0].geometry;

            // Check if the geometry type is Point, LineString or Polygon
            if (
              geometry.type === "Point" ||
              geometry.type === "LineString" ||
              geometry.type === "Polygon"
            ) {
              const coordinates = geometry.coordinates;
              console.log(coordinates);
            }
          }
        });
      });
    };

    if (!map) {
      initializeMap();
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map]);

  useEffect(() => {
    if (map && addingMarker) {
      const handleMapClick = (
        e: mapboxgl.MapMouseEvent & mapboxgl.EventData
      ) => {
        const marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
        setMarkers((prevMarkers) => [...prevMarkers, marker]);
        setMarkerData((prevData: mapboxgl.LngLatLike[]) => [
          ...prevData,
          e.lngLat,
        ]);
      };

      map.on("click", handleMapClick);

      return () => {
        map.off("click", handleMapClick);
      };
    }
  }, [map, addingMarker]);

  const handleAddMarker = () => {
    setAddingMarker(true);
  };

  const handleRemoveMarker = (marker: mapboxgl.Marker) => {
    const updatedMarkers = markers.filter((m) => m !== marker);
    setMarkers(updatedMarkers);
    marker.remove();
  };

  const handleDataUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          // Ensure event.target is not null
          const data = JSON.parse(event.target.result as string);
          if (map && data && data.features && data.features.length > 0) {
            data.features.forEach((feature: GeoJSON.Feature) => {
              if (feature.geometry.type === "Point") {
                const coordinates = (feature.geometry as GeoJSON.Point)
                  .coordinates;
                const marker = new mapboxgl.Marker()
                  .setLngLat(coordinates as [number, number])
                  .addTo(map);
                setMarkers((prevMarkers) => [...prevMarkers, marker]);
                setMarkerData((prevData: [number, number][]) => [
                  ...prevData,
                  coordinates,
                ]);
              }
            });
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const Toolbar: React.FC = () => {
    return (
      <div
        style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1 }}
      >
        <div style={{ position: "relative" }}>
          <button
            onClick={handleAddMarker}
            style={{
              padding: "8px 16px",
              backgroundColor: "#fff",
              color: "#000",
              border: "none",
              cursor: "pointer",
              borderRadius: "8px",
            }}
          >
            Add Marker
          </button>
          {addingMarker && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#506687",
                padding: "8px",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                zIndex: 1,
              }}
            >
              Click on the map to add a marker
            </div>
          )}
        </div>
        {markers.length > 0 && (
          <div>
            <h3>Markers:</h3>
            <ul style={{ color: "white" }}>
              {markers.map((marker, index) => (
                <li key={index}>
                  Marker {index + 1}{" "}
                  <button onClick={() => handleRemoveMarker(marker)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ position: "relative", height: "400px" }}>
      <div
        ref={mapContainerRef}
        style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
      />
      <div className="absolute bottom-0 right-0 w-1/4 z-10 p-4">
        <SearchBox
          defaultValue=""
          onSelectAddress={(_address, latitude, longitude) => {
            if (latitude && longitude && map) {
              map.flyTo({
                center: [longitude, latitude],
                zoom: 5,
                essential: true,
              });
            }
          }}
        />
        <div className="relative top-1 left-1 w-3/4 z-10 p-4">
          <input
            type="file"
            accept=".geojson"
            onChange={handleDataUpload}
            style={{ display: "none" }}
            id="uploadInput"
          />

          <label
            htmlFor="uploadInput"
            style={{
              borderRadius: "7px",
              backgroundColor: "#172e52",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              cursor: "pointer",
            }}
          >
            Upload GeoJSON Data
          </label>
        </div>
      </div>
      {map && <Toolbar />}
    </div>
  );
};

export default MapComponent2;
