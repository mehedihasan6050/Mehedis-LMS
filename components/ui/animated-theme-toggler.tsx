"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // ✅ mounted check inside useEffect (deferred to avoid synchronous setState)
  useEffect(() => {
    let id: number | undefined;

    if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
      id = window.requestAnimationFrame(() => setMounted(true));
      return () => {
        if (typeof window.cancelAnimationFrame === "function" && id !== undefined) {
          window.cancelAnimationFrame(id);
        }
      };
    }

    // Fallback for environments without requestAnimationFrame
    id = window.setTimeout(() => setMounted(true), 0);
    return () => {
      if (id !== undefined) {
        clearTimeout(id);
      }
    };
  }, []);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
      });
    }).ready;

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [setTheme, theme, duration]);

  if (!mounted) return null;

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(className)}
      {...props}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
