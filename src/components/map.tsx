import React, { useRef, useState } from "react";

import Link from "next/link";
import { Image } from "cloudinary-react";
import ReactMapGL, { Marker, Popup, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocalState } from "src/utils/useLocalState";
import { SearchBox } from "./searchBox";
import { RulerControl } from "mapbox-gl-controls";
import PopUpComponent from "./PopUpComponent";

interface IProps {
  highlightedId: string | null;
}

export default function Map({ highlightedId }: IProps) {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const mapRef = useRef(null);

  const [viewport, setViewport] = useState<ViewState>({
    latitude: 0,
    longitude: 0,
    zoom: 2,
  });

  const togglePopup = () => {
    setPopupOpen(!popupOpen);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="text-black relative">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="calc(100vh - 64px)"
        mapboxApiAccessToken="pk.eyJ1IjoiY2hyaXNqb2huc29ucHIiLCJhIjoiY2w2Y2UxMXZtMjZoeDNibjNobTlwNDVnbSJ9.lCf2hvyuoxjuk4wmGgvUTg"
        onViewportChange={(nextViewport: ViewState) =>
          setViewport(nextViewport)
        }
        maxZoom={15}
        minZoom={0}
        mapStyle="mapbox://styles/chrisjohnsonpr/clgs594hv003k01pie798e370"
        onLoad={() => {
          if (mapRef.current) {
          }
        }}
      >
        <div className="absolute top-0 right-0 w-1/2 z-10 p-4">
          <SearchBox
            defaultValue=""
            onSelectAddress={(_address, latitude, longitude) => {
              if (latitude && longitude) {
                setViewport((old) => ({
                  ...old,
                  latitude,
                  longitude,
                  zoom: 5,
                }));
                if (mapRef.current) {
                }
              }
            }}
          />
        </div>
        <div>
          <button
            onClick={togglePopup}
            style={{
              color: "white",
              backgroundColor: popupOpen ? "green" : "red",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            {popupOpen ? "Hide Conflicts" : "Show Conflicts"}
          </button>

          {popupOpen && (
            <Popup
              latitude={47.8487551}
              longitude={20.6119717}
              onClose={closePopup}
            >
              <PopUpComponent
                highlightedId={highlightedId}
                closePopup={closePopup}
              />
            </Popup>
          )}
        </div>
      </ReactMapGL>
    </div>
  );
}
