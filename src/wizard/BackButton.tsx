import { useBrowserLocation } from "wouter/use-browser-location";
import "./init_tailwind.css";

export default function BackButton() {
  const [browserLocation, navigate] = useBrowserLocation();
  const lastSlash = browserLocation
    .slice(0, browserLocation.length - Number(browserLocation.endsWith("/")))
    .lastIndexOf("/");
  const handleBack = () => {
    navigate(browserLocation.slice(0, lastSlash) || "/");
  };
  return (
    <>
      {browserLocation !== "/" ? (
        <div className="flex justify-center mt-4">
          <button
            className="px-2 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition duration-300 ease-in-out text-xs font-medium shadow-sm lg:px-3 lg:py-2 lg:text-sm"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      ) : null}
    </>
  );
}
