import { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { useSocket } from "../../context/SocketContext";
import { SocketEvent } from "../../types/socket";
import { USER_STATUS } from "../../types/user";

const JoinForm = () => {
  const location = useLocation();
  const { currentUser, setCurrentUser, status, setStatus } = useAppContext();
  const { socket } = useSocket();

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const validateForm = () => {
    if (currentUser.username.length === 0) {
      toast.error("Enter your username");
      return false;
    } else if (currentUser.roomId.length === 0) {
      toast.error("Enter a room id");
      return false;
    } else if (currentUser.roomId.length < 5) {
      toast.error("ROOM Id must be at least 5 characters long");
      return false;
    } else if (currentUser.username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return false;
    }
    return true;
  };

  const joinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === USER_STATUS.ATTEMPTING_JOIN) return;
    if (!validateForm()) return;
    toast.loading("Joining room...");
    setStatus(USER_STATUS.ATTEMPTING_JOIN);
    socket.emit(SocketEvent.JOIN_REQUEST, currentUser);
  };

  useEffect(() => {
    if (currentUser.roomId.length > 0) return;
    if (location.state?.roomId) {
      setCurrentUser({ ...currentUser, roomId: location.state.roomId });
      if (currentUser.username.length === 0) {
        toast.success("Enter your username");
      }
    }
  }, [currentUser, location.state?.roomId, setCurrentUser]);

  useEffect(() => {
    if (status === USER_STATUS.DISCONNECTED && !socket.connected) {
      socket.connect();
      return;
    }

    const isRedirect = sessionStorage.getItem("redirect") || false;

    if (status === USER_STATUS.JOINED && !isRedirect) {
      const username = currentUser.username;
      sessionStorage.setItem("redirect", "true");
      navigate(`/code/${currentUser.roomId}`, {
        state: {
          username,
        },
      });
    } else if (status === USER_STATUS.JOINED && isRedirect) {
      sessionStorage.removeItem("redirect");
      setStatus(USER_STATUS.DISCONNECTED);
      socket.disconnect();
      socket.connect();
    }
  }, [currentUser, location.state?.redirect, navigate, socket, status]);

  return (
    <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-4 p-4 sm:w-[500px] sm:p-8">
      <h1 className="text-4xl sm:text-6xl font-light">Collaboration.</h1>
      <h1 className="text-4xl sm:text-6xl font-normal">Redefined.</h1>
      <p className="mb-4 text-center md:mb-8 sm:text-2xl text-lg text-[#fff9] font-normal sm:mt-4">
        {"Built on open source. Code, Chat and Collaborate in Real-time."}
      </p>
      <form onSubmit={joinRoom} className="flex w-full flex-col gap-4">
        <input
          type="text"
          name="roomId"
          placeholder="Room Id"
          className="w-full rounded-md border-none bg-gray-600 px-3 py-3 focus:outline-none"
          onChange={handleInputChanges}
          value={currentUser.roomId}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full rounded-md border-none bg-gray-600 px-3 py-3 focus:outline-none"
          onChange={handleInputChanges}
          value={currentUser.username}
          ref={usernameRef}
        />
        <button
          type="submit"
          className="mt-2 w-full rounded-md bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg font-semibold text-white"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default JoinForm;
