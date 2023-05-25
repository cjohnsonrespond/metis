import { GetServerSideProps, NextApiRequest } from "next";
import { loadIdToken } from "src/auth/firebaseAdmin";
import Layout from "src/components/layout";
import MapComponent2 from "src/components/MapComponent2";
import SupabaseComponent from "src/components/SupabaseComponent";
import ChatBox from "src/components/chatBox";
import VideoPlayer from "src/components/VideoPlayer";
import React, { useState } from "react";

const Missioncontrol: React.FC = () => {
  const videoSrc = "https://www.youtube.com/watch?v=lmZRiDMK3OU";
  const [addingMarker, setAddingMarker] = useState(false);
  const [markerData, setMarkerData] = useState([]);

  const handleAddMarker = () => {
    setAddingMarker(true);
  };

  return (
    <Layout
      main={
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg bg-gray-600 p-4 col-span-1 md:col-span-2">
            <div className="h-96 md:h-full">
              <h1 className="text-2xl font-bold text-white mb-4">
                Analysis Map
              </h1>
              <MapComponent2
                addingMarker={addingMarker}
                setAddingMarker={setAddingMarker}
                setMarkerData={setMarkerData}
              />
            </div>
          </div>

          <div className="border rounded-lg bg-gray-600 p-4 col-span-1 md:col-span-1">
            <ChatBox />
          </div>

          <div className="border rounded-lg bg-gray-600 p-4 col-span-1 md:col-span-1">
            <div className="border rounded-lg bg-gray-600 p-4">
              <h1 className="text-2xl font-bold text-white mb-4">World News</h1>
              <VideoPlayer src={videoSrc} width="320px" height="180px" />
            </div>
          </div>

          <div className="border rounded-lg bg-gray-600 p-4 col-span-1 md:col-span-2">
            <SupabaseComponent />
          </div>
        </div>
      }
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const uid = await loadIdToken(req as NextApiRequest);

    if (!uid) {
      res.setHeader("location", "/auth");
      res.statusCode = 302;
      res.end();
    }
  } catch (error) {
    console.error(error);
  }

  return { props: {} };
};

export default Missioncontrol;
