import React from "react";




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
        backgroundColor: "black",
        borderRadius: "15px",
      }}
    >
      <button
        onClick={toggleSidebar}
        className="bg-gray-500 px-4 py-2 rounded-lg text-white"
      >
        Toggle
      </button>
      
     
    </div>
  );
};

export default SidebarComponent;
