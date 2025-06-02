import React, { useRef, useState, useEffect } from "react";
import { useMyPresence, useOthers, useStorage, useMutation, WhiteboardElement } from "@/lib/liveblocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Square, 
  Circle, 
  Type, 
  Minus, 
  Pencil, 
  Undo2, 
  Redo2, 
  Trash2,
  Download,
  Users
} from "lucide-react";

const colors = [
  "#000000", // Black
  "#5c6ac4", // Blue
  "#d53f8c", // Pink
  "#38a169", // Green
  "#e53e3e", // Red
  "#dd6b20", // Orange
  "#805ad5", // Purple
];

export function Whiteboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Use _ to indicate we're not using the first part of the array return value
  const [_, updateMyPresence] = useMyPresence();
  const [tool, setTool] = useState<"select" | "path" | "rectangle" | "ellipse" | "text" | "line">("path");
  const [color, setColor] = useState("#000000");
  const [drawing, setDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<number[][]>([]);
  const others = useOthers();
  
  // Access the storage
  const elements = useStorage((root) => root.elements);
  
  // Create a mutation to add an element
  const addElement = useMutation(({ storage }, newElement: WhiteboardElement) => {
    const elements = storage.get("elements");
    if (Array.isArray(elements)) {
      elements.push(newElement);
      storage.set("elements", elements);
    }
  }, []);
  
  // Create a mutation to clear the whiteboard
  const clearWhiteboard = useMutation(({ storage }) => {
    storage.set("elements", []);
  }, []);

  // Set up the canvas when component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all elements
    if (elements && Array.isArray(elements)) {
      elements.forEach((element) => {
        ctx.save();
        
        // Set styles based on element properties
        ctx.fillStyle = element.fill || color;
        ctx.strokeStyle = element.stroke || color;
        ctx.lineWidth = element.strokeWidth || 2;
        
        // Draw based on element type
        if (element.type === "path" && element.points) {
          ctx.beginPath();
          element.points.forEach((point, index) => {
            if (index === 0) {
              ctx.moveTo(point[0], point[1]);
            } else {
              ctx.lineTo(point[0], point[1]);
            }
          });
          ctx.stroke();
        } else if (element.type === "rectangle") {
          ctx.strokeRect(element.x, element.y, element.width || 0, element.height || 0);
        } else if (element.type === "ellipse" && element.width && element.height) {
          ctx.beginPath();
          ctx.ellipse(
            element.x + (element.width / 2),
            element.y + (element.height / 2),
            element.width / 2,
            element.height / 2,
            0,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        } else if (element.type === "line" && element.points && element.points.length === 2) {
          ctx.beginPath();
          ctx.moveTo(element.points[0][0], element.points[0][1]);
          ctx.lineTo(element.points[1][0], element.points[1][1]);
          ctx.stroke();
        } else if (element.type === "text" && element.text) {
          ctx.font = `${element.fontSize || 16}px sans-serif`;
          ctx.fillText(element.text, element.x, element.y);
        }
        
        ctx.restore();
      });
    }

    // Draw current path if drawing
    if (drawing && currentPath.length > 0) {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      currentPath.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point[0], point[1]);
        } else {
          ctx.lineTo(point[0], point[1]);
        }
      });
      
      ctx.stroke();
      ctx.restore();
    }

    // Draw other users' cursors
    others.forEach((other) => {
      if (other.presence && other.presence.cursor) {
        ctx.save();
        
        // Draw cursor
        ctx.fillStyle = (other.presence.color as string) || "#000000";
        ctx.beginPath();
        ctx.arc(other.presence.cursor.x, other.presence.cursor.y, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw name if present
        if (other.presence.name) {
          ctx.fillStyle = "#000000";
          ctx.font = "12px sans-serif";
          ctx.fillText(other.presence.name as string, other.presence.cursor.x + 10, other.presence.cursor.y + 10);
        }
        
        ctx.restore();
      }
    });
  }, [elements, others, drawing, currentPath, color]);

  // Mouse event handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update user presence with cursor position
    updateMyPresence({ cursor: { x, y } });

    // If drawing, update current path
    if (drawing && tool === "path") {
      setCurrentPath((prev) => [...prev, [x, y]]);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDrawing(true);

    if (tool === "path") {
      setCurrentPath([[x, y]]);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // If drawing, add the element to storage based on tool type
    if (tool === "path" && currentPath.length > 0) {
      addElement({
        id: Date.now().toString(),
        type: "path",
        x: currentPath[0][0],
        y: currentPath[0][1],
        points: [...currentPath, [x, y]],
        stroke: color,
        strokeWidth: 2
      });
    }

    setDrawing(false);
    setCurrentPath([]);
  };

  const handleMouseLeave = () => {
    updateMyPresence({ cursor: null });
    setDrawing(false);
    setCurrentPath([]);
  };

  // Function to export the canvas as an image
  const exportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement("a");
    link.download = "medical-whiteboard-" + new Date().toISOString() + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="px-4 py-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Shared Medical Whiteboard</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-1 h-4 w-4" />
              <span>{others.length + 1} user{others.length === 0 ? "" : "s"}</span>
            </div>
            <Button size="sm" variant="outline" onClick={exportImage}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <Button 
            size="sm" 
            variant={tool === "select" ? "default" : "outline"} 
            onClick={() => setTool("select")}
            className="h-8 w-8 p-0"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={tool === "path" ? "default" : "outline"} 
            onClick={() => setTool("path")}
            className="h-8 w-8 p-0"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={tool === "rectangle" ? "default" : "outline"} 
            onClick={() => setTool("rectangle")}
            className="h-8 w-8 p-0"
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={tool === "ellipse" ? "default" : "outline"} 
            onClick={() => setTool("ellipse")}
            className="h-8 w-8 p-0"
          >
            <Circle className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={tool === "line" ? "default" : "outline"} 
            onClick={() => setTool("line")}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={tool === "text" ? "default" : "outline"} 
            onClick={() => setTool("text")}
            className="h-8 w-8 p-0"
          >
            <Type className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-8" />
          <div className="flex items-center gap-1">
            {colors.map((c) => (
              <button
                key={c}
                className={`w-6 h-6 rounded-full border ${color === c ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
          <Separator orientation="vertical" className="h-8" />
          <Button 
            size="sm" 
            variant="outline" 
            className="h-8 w-8 p-0"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="h-8 w-8 p-0"
          >
            <Redo2 className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="h-8 w-8 p-0"
            onClick={() => clearWhiteboard()}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative border rounded-md overflow-hidden">
          <canvas
            ref={canvasRef}
            width={1200}
            height={800}
            className="w-full h-[calc(100vh-250px)] bg-white"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </CardContent>
    </Card>
  );
}
