import { useEffect } from "react";
import { useCursor } from "./hooks/useCursor";

export default function CustomCursor() {
  const { isTerminalHovered } = useCursor();

  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");

    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      (cursor as HTMLElement).style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const showCursor = () => (cursor as HTMLElement).style.opacity = "1";
    const hideCursor = () => (cursor as HTMLElement).style.opacity = "0";

    // ✅ Grabbing handlers
    const handleMouseDown = () => cursor.classList.add("grabbing");
    const handleMouseUp = () => cursor.classList.remove("grabbing");
    
    // Interactive elements handlers
    const interactiveSelectors = 'a, button, input, textarea, select, [role="button"], [tabindex], .interactive, .clickable';
    
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches && target.matches(interactiveSelectors)) {
        cursor.classList.add("hover");
      }
    };
    
    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches && target.matches(interactiveSelectors)) {
        cursor.classList.remove("hover");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", showCursor);
    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", showCursor);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Apply terminal hover state to cursor
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");
    if (!cursor) return;

    if (isTerminalHovered) {
      cursor.classList.add("terminal-hover");
    } else {
      cursor.classList.remove("terminal-hover");
    }
  }, [isTerminalHovered]);

  return <div className="custom-cursor" />;
}
