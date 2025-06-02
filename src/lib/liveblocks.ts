import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// Create a Liveblocks client
const client = createClient({
  // This key enables public access without authentication (development only)
  publicApiKey: "pk_dev_SID9OuYnKB-rRDkazZEepQdazrZ-NvyBzec9-ZnvYsUPTMrwmQzqfvmOxNhzbK-l",
  throttle: 16,
});

// Define our Element interface for the whiteboard
export type WhiteboardElement = {
  id: string;
  type: "path" | "rectangle" | "ellipse" | "text" | "line";
  x: number;
  y: number;
  width?: number;
  height?: number;
  points?: number[][];
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  text?: string;
  fontSize?: number;
};

// Define our presence type
export type Presence = {
  cursor: { x: number; y: number } | null;
  selection?: string[];
  color?: string;
  name?: string;
};

// Define our storage type
export type Storage = {
  elements: WhiteboardElement[];
};

// Create a room context for our whiteboard
export const {
  RoomProvider,
  useRoom,
  useMyPresence,
  useUpdateMyPresence,
  useOthers,
  useOthersMapped,
  useOthersConnectionIds,
  useOther,
  useBroadcastEvent,
  useEventListener,
  useSelf,
  useStorage,
  useMutation,
  useHistory,
  useCanUndo,
  useCanRedo,
  useUndo,
  useRedo,
} = createRoomContext<Presence, Storage>(client);

export type Element = WhiteboardElement;
