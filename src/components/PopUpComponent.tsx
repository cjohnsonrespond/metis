import React from "react";

type PopUpProps = {
  highlightedId: string | null;
  closePopup: () => void;
};

const PopUpComponent: React.FC<PopUpProps> = ({
  highlightedId,
  closePopup,
}) => {
  return (
    <div
      className="popup"
      style={{
        color: "white",
        backgroundColor: "red",
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="popup-content">
        <h1>Ukraine War</h1>
        <p>
          {" "}
          Wagner chief says Ukraine’s counteroffensive has started; Kyiv says it
          needs more time and arms.{" "}
        </p>

        <button
  onClick={() => {
    // Handle Learn More button click
  }}
          style={{
            color: "white",
            backgroundColor: "blue",
            padding: "5px 10px",
            border: "none",
            alignContent: "space-between",
            borderRadius: "4px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default PopUpComponent;
