import { useAppContext } from "../../context/AppContext";
import { useRef } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="w-12 h-12 mr-2"
  >
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="url(#bgGradient)" />

    <g transform="translate(50,50) scale(0.6)">
      <text
        x="0"
        y="8"
        fontFamily="Arial, sans-serif"
        fontSize="40"
        fill="#38BDF8"
        textAnchor="middle"
      >
        &lt;/&gt;
      </text>
    </g>
    <g>
      <circle cx="50" cy="15" r="5" fill="#34D399">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="6s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="85" cy="50" r="5" fill="#34D399">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="90 50 50"
          to="450 50 50"
          dur="6s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="50" cy="85" r="5" fill="#34D399">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="180 50 50"
          to="540 50 50"
          dur="6s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="15" cy="50" r="5" fill="#34D399">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="270 50 50"
          to="630 50 50"
          dur="6s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
);

const Navbar = () => {
  const { currentUser, setCurrentUser } = useAppContext();
  const usernameRef = useRef<HTMLInputElement | null>(null);

  const createNewRoom = () => {
    setCurrentUser({ ...currentUser, roomId: uuidv4() });
    toast.success("New Room Created", { duration: 750 });
    usernameRef.current?.focus();
  };

  return (
    <nav className="w-full bg-[#2C2C32] py-1">
      <div className="max-w-16xl mx-auto px-4 sm:px-6 lg:px-28">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center text-white">
              <Logo />
              <span className="font-normal sm:text-3xl text-2xl">
                CodeXpress
              </span>
            </Link>
          </div>
          <div className="hidden xl:flex h-full">
            <button
              className="px-6 py-2 text-lg font-medium text-white bg-[#0078D4]  hover:bg-[#005a9e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0078D4] transition duration-150 ease-in-out"
              onClick={createNewRoom}
            >
              Create New Room
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
