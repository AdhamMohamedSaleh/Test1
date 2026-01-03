"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  const isHovered = props["data-hovered" as keyof typeof props] as boolean;
  const isPressed = props["data-pressed" as keyof typeof props] as boolean;

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-7 shrink-0 rounded-lg border shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center transition-none"
      >
        <CheckIcon
          className="size-8"
          strokeWidth={1}
          style={
            isPressed && !props.checked
              ? { color: "#1F2128" }
              : { color: "white" }
          }
        />
      </CheckboxPrimitive.Indicator>

      {/* Faint checkmark on hover when unchecked */}
      {isHovered && !props.checked && (
        <div className="grid place-content-center absolute inset-0 pointer-events-none">
          <CheckIcon
            className="size-8"
            strokeWidth={1}
            style={{
              color: isPressed ? "#1F2128" : "rgb(107, 114, 128)",
              opacity: isPressed ? 1 : 0.3,
            }}
          />
        </div>
      )}
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
