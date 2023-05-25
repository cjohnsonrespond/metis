import React from "react";
import { Card1 } from "src/components/Card1";
import { Card2 } from "./Card2";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarComponent: React.FC<SidebarProps> = ({
  sidebarOpen,
  toggleSidebar,
}) => {
  return (
    <div
      className={`w-1/4 pb-4 ${
        sidebarOpen ? "block" : "hidden" // Toggle visibility based on sidebarOpen state
      }`}
      style={{
        maxHeight: "calc(100vh - 64px)",
        overflowX: "scroll",
        backgroundColor: "#070B19",
        borderRadius: "15px",
      }}
    >
      <button
        onClick={toggleSidebar}
        className="bg-gray-500 px-4 py-2 rounded-lg text-white mb-4"
      >
        Toggle
      </button>
      <div className="mb-4">
        <Card1 />
      </div>
      <div className="mb-4">
        <Card2 />
      </div>
    </div>
  );
};

export default SidebarComponent;
