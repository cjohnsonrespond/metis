import Link from "next/link";
import { useAuth } from "src/auth/useAuth";

export const Card2 = () => {
  const linkClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nodeName = e.currentTarget?.nodeName;

    if (nodeName === "A") {
      // Handle the link click event
      // ...
    }
  };

  return (
    <div className="w-full h-200  ">
      <div className="relative z-10 top-5 ">{/* Card Header */}</div>

      <div className=" bg-white shadow-md rounded-lg p-4">
        <div className="flex">
          <div className="flex-grow">
            <p className="text-15 font-bold text-red-600">
              Vessel and Aircraft{" "}
            </p>
            <p className="text-black text-12">Tracking</p>
          </div>
          <div>
            <div className="flex justify-end">
              <Link href="/houses/missioncontrol">
                <a>
                  <button
                    className="rounded py-1 px-2 bg-secondary text-sm font-bold"
                    onClick={linkClicked}
                  >
                    <p className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
                      Launch
                    </p>
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
