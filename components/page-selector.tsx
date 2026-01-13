"use client";
import { useState, ReactNode } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface PageItem {
  id: string;
  label: string;
  checked: boolean;
}

export function PageSelector() {
  const [pages, setPages] = useState<PageItem[]>([
    { id: "all", label: "All pages", checked: false },
    { id: "page1", label: "Page 1", checked: false },
    { id: "page2", label: "Page 2", checked: false },
    { id: "page3", label: "Page 3", checked: false },
    { id: "page4", label: "Page 4", checked: false },
    { id: "page5", label: "Page 5", checked: false },
    { id: "page6", label: "Page 6", checked: false },
  ]);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pressedId, setPressedId] = useState<string | null>(null);

  const handleCheckboxChange = (id: string) => {
    if (id === "all") {
      setPages((prev) => {
        const next = !prev[0].checked;
        return prev.map((p) => ({ ...p, checked: next }));
      });
    } else {
      setPages((prev) => {
        const updated = prev.map((p) =>
          p.id === id ? { ...p, checked: !p.checked } : p
        );
        updated[0].checked = updated.slice(1).every((p) => p.checked);
        return updated;
      });
    }
  };

  const allPagesItem = pages[0];
  const pageItems = pages.slice(1);

  const getCheckboxClasses = (itemId: string) => {
    const item = pages.find((p) => p.id === itemId)!;
    const isHovered = hoveredId === itemId;
    const isPressed = pressedId === itemId;
    const isChecked = item.checked;

    // Unchecked states
    if (!isChecked) {
      if (isPressed) {
        // State 3: Unchecked + Pressed
        return cn(
          "border-[1px] border-[#BDBDBD] bg-white cursor-pointer",
          "shadow-[0_0_0_3px_rgba(36,105,246,0.1)]"
        );
      }
      if (isHovered) {
        // State 2: Unchecked + Hover
        return cn("border-[1px] border-[#BDBDBD] bg-white cursor-pointer");
      }
      // State 1: Unchecked + Default
      return cn("border-[1px] bg-white cursor-pointer", "border-[#CDCDCD]/60");
    }

    // Checked states
    if (isPressed) {
      // State 7: Checked + Pressed (to uncheck)
      return cn(
        "bg-[#2469F6] border-[#2469F6] cursor-pointer",
        "shadow-[0_0_0_3px_rgba(36,105,246,0.1)]"
      );
    }
    if (isHovered) {
      // State 4: Checked + Hover (to uncheck)
      return cn("bg-[#5087F8] border-[#5087F8] cursor-pointer");
    }
    // State 5: Checked + Default
    return cn("bg-[#2469F6] border-[#2469F6] cursor-pointer");
  };

  const RowWrapper = ({
    item,
    children,
  }: {
    item: PageItem;
    children: ReactNode;
  }) => (
    <div
      className="h-10.5 bg-white flex items-center justify-between pt-2 -my-px pr-3.75 pb-2 pl-5.5 cursor-pointer select-none"
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => {
        setHoveredId(null);
        setPressedId(null);
      }}
      onMouseDown={() => setPressedId(item.id)}
      onMouseUp={() => setPressedId(null)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('[data-slot="checkbox"]')) return;
        handleCheckboxChange(item.id);
      }}
    >
      {children}
    </div>
  );

  return (
    <div
      className="w-92.5 bg-white border border-[#EEEEEE] rounded-[6px] py-2.5"
      style={{
        boxShadow:
          "0 8px 15px 0 rgba(20, 20, 20, 0.12), 0 0px 4px 0 rgba(20, 20, 20, 0.10)",
      }}
    >
      {/* All pages */}
      <RowWrapper item={allPagesItem}>
        <div className="w-92.5 h-10.5 cursor-pointer bg-white flex items-center justify-between pr-3">
          <label className="text-[14px] font-normal leading-[130%] tracking-[0px] pointer-events-none text-[#1F2128]">
            {allPagesItem.label}
          </label>

          <Checkbox
            checked={allPagesItem.checked}
            data-hovered={hoveredId === allPagesItem.id}
            data-pressed={pressedId === allPagesItem.id}
            onCheckedChange={() => handleCheckboxChange(allPagesItem.id)}
            className={getCheckboxClasses(allPagesItem.id)}
          />
        </div>
      </RowWrapper>

      <div className="w-92.5 h-5 flex items-center py-2.5 px-3.75 gap-2.5">
        <div className="flex-1 border-t-[0.7px] border-[#CDCDCD]" />
      </div>

      <div className="max-h-41 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {pageItems.map((page) => (
          <RowWrapper key={page.id} item={page}>
            <label className="text-[14px] font-normal leading-[130%] tracking-[0px] pointer-events-none text-[#1F2128]">
              {page.label}
            </label>

            <div className="w-8.75 h-8.75">
              <Checkbox
                checked={page.checked}
                data-hovered={hoveredId === page.id}
                data-pressed={pressedId === page.id}
                onCheckedChange={() => handleCheckboxChange(page.id)}
                className={getCheckboxClasses(page.id)}
              />
            </div>
          </RowWrapper>
        ))}
      </div>

      <div className="w-92.5 h-5 flex items-center py-2.5 px-3.75 gap-2.5">
        <div className="flex-1 border-t-[0.7px] border-[#CDCDCD]" />
      </div>

      <div className="justify-center my-2.5 flex items-center">
        <button className="w-85 h-10 rounded-sm text-center text-[14px] font-normal leading-[130%] tracking-[0px] text-[#1F2128] bg-[#FFCE22] cursor-pointer active:bg-[#FFCE22] hover:bg-[#FFD84D] pt-2.5 pr-5 pb-2.5 pl-5 gap-2.5">
          Done
        </button>
      </div>
    </div>
  );
}
