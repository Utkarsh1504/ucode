import { useAppContext } from "../../context/AppContext";
import { useChatRoom } from "../../context/ChatContext";
import { SyntheticEvent, useEffect, useRef } from "react";

function ChatList() {
  const {
    messages,
    isNewMessage,
    setIsNewMessage,
    lastScrollHeight,
    setLastScrollHeight,
  } = useChatRoom();
  const { currentUser } = useAppContext();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (e: SyntheticEvent) => {
    const container = e.target as HTMLDivElement;
    setLastScrollHeight(container.scrollTop);
  };

  useEffect(() => {
    if (!messagesContainerRef.current) return;
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (isNewMessage) {
      setIsNewMessage(false);
    }
    if (messagesContainerRef.current)
      messagesContainerRef.current.scrollTop = lastScrollHeight;
  }, [isNewMessage, setIsNewMessage, lastScrollHeight]);

  return (
    <div
      className="flex-grow overflow-auto rounded-md p-2"
      ref={messagesContainerRef}
      onScroll={handleScroll}
    >
      {messages.map((message, index) => {
        return (
          <div
            key={index}
            className={
              "mb-2 w-[80%] self-end break-words rounded-md bg-[#313131] px-3 py-2" +
              (message.username === currentUser.username ? " ml-auto " : "")
            }
          >
            <div className="flex justify-between">
              <span className="text-xs text-blue-500">{message.username}</span>
              <span className="text-xs text-white">{message.timestamp}</span>
            </div>
            <p className="py-1">{message.message}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ChatList;
