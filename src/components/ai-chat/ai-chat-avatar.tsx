import Image from "next/image";
import { AI_CHAT_AVATAR_SRC } from "@/lib/ai-chat-config";

interface AiChatAvatarProps {
  size: number;
  className?: string;
}

export function AiChatAvatar({ size, className = "" }: AiChatAvatarProps) {
  return (
    <Image
      src={AI_CHAT_AVATAR_SRC}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={`h-full w-full object-cover ${className}`.trim()}
    />
  );
}
