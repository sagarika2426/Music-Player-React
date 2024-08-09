import { Link, useLocation } from "react-router-dom";

const Tabs = () => {
    const location = useLocation();
  
    return (
      <div className="flex mb-2 p-2 gap-4">
        <Link
          to="/"
          className={`mr-4 text-white text-lg lg:text-xl ${
            location.pathname === "/" ? "font-bold" : ""
          }`}
        >
          For You
        </Link>
        <Link
          to="/top-tracks"
          className={`text-white text-lg lg:text-xl ${
            location.pathname === "/top-tracks" ? "font-bold" : ""
          }`}
        >
          Top Tracks
        </Link>
      </div>
    );
  };

  export default Tabs;