import { useState } from "react";
import { Whiteboard } from "@/components/whiteboard";
import { RoomProvider } from "@/lib/liveblocks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function WhiteboardPage() {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(true);
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [color, setColor] = useState("#5c6ac4");
  // Simple toast notification function
  const toast = ({ title, description }: { title: string; description: string; variant?: "destructive" }) => {
    // We ignore the variant parameter for now since we're using simple alerts
    alert(`${title}\n${description}`);
  };

  const handleJoinRoom = () => {
    if (!roomName) {
      toast({
        variant: "destructive",
        title: "Room name is required",
        description: "Please enter a room name to join or create a whiteboard session.",
      });
      return;
    }

    // Generate a consistent room ID from the room name
    const generatedRoomId = roomName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    setRoomId(generatedRoomId);
    setShowDialog(false);

    toast({
      title: "Joined whiteboard session",
      description: `You've joined the "${roomName}" whiteboard session.`,
    });
  };

  // Random colors for user identification
  const colors = [
    "#5c6ac4", // Blue
    "#d53f8c", // Pink
    "#38a169", // Green
    "#e53e3e", // Red
    "#dd6b20", // Orange
    "#805ad5", // Purple
  ];

  // Select a random color if one isn't selected
  const getRandomColor = () => {
    if (color) return color;
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Medical Collaboration Whiteboard</h2>
      </div>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Join Whiteboard Session</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="room">Room Name</Label>
              <Input
                id="room"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Use the same room name to collaborate with others.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Choose Your Color</Label>
              <div className="flex space-x-2">
                {colors.map((c) => (
                  <button
                    key={c}
                    className={`w-8 h-8 rounded-full border ${color === c ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleJoinRoom}>Join Session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {roomId && (
        <RoomProvider
          id={roomId}
          initialPresence={{
            cursor: null,
            color: getRandomColor(),
            name: userName || "Anonymous User",
          }}
          initialStorage={{ elements: [] }}
        >
          <Whiteboard />
        </RoomProvider>
      )}
      
      {/* Toast notifications handled via simple alert for now */}
    </div>
  );
}
