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
        "peer relative shrink-0 outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-none",
        className
      )}
      style={{
        width: "23px",
        height: "23px",
        borderRadius: "6px",
      }}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="absolute inset-0 flex items-center justify-center transition-none"
      >
        <CheckIcon
          strokeWidth={1}
          style={{
            width: "25px",
            height: "25px",
            color: "white",
          }}
        />
      </CheckboxPrimitive.Indicator>

      {/* Faint checkmark on hover/press when unchecked */}
      {(isHovered || isPressed) && !props.checked && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-none">
          <CheckIcon
            strokeWidth={1}
            style={{
              width: "25px",
              height: "25px",
              color: isPressed ? "#878787" : "#E3E3E3",
            }}
          />
        </div>
      )}
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
