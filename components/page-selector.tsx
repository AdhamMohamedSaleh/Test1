"use client";
import { useState, ReactNode } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
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
    const isUnchecked = !item.checked;

    return cn(
      "h-8 w-8 rounded-[6px] border cursor-pointer",
      isPressed && isUnchecked && "shadow-[0_0_0_2px_rgba(100,150,255,0.25)]",
      item.checked
        ? isHovered
          ? "border-[rgb(100,150,255)] bg-[rgb(100,150,255)]"
          : "border-[rgb(80,135,248)] bg-[rgb(80,135,248)]"
        : isHovered
        ? "border-gray-300"
        : "border-gray-200"
    );
  };

  const RowWrapper = ({
    item,
    children,
  }: {
    item: PageItem;
    children: ReactNode;
  }) => (
    <div
      className="flex items-center justify-between py-4 cursor-pointer select-none"
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
    <Card className="w-full py-2 max-w-lg px-5">
      <div className="px-2 pt-4 pb-2">
        <RowWrapper item={allPagesItem}>
          <label className="text-lg font-normal pointer-events-none text-[#1F2128]">
            {allPagesItem.label}
          </label>
          <Checkbox
            checked={allPagesItem.checked}
            data-hovered={hoveredId === allPagesItem.id}
            data-pressed={pressedId === allPagesItem.id}
            onCheckedChange={() => handleCheckboxChange(allPagesItem.id)}
            className={getCheckboxClasses(allPagesItem.id)}
          />
        </RowWrapper>
      </div>

      <div className="border-t py-2 border-gray-300" />

      <div className="max-h-64 overflow-y-auto px-2 scrollbar-hide">
        {pageItems.map((page) => (
          <RowWrapper key={page.id} item={page}>
            <label className="text-lg font-normal pointer-events-none text-[#1F2128]">
              {page.label}
            </label>
            <Checkbox
              checked={page.checked}
              data-hovered={hoveredId === page.id}
              data-pressed={pressedId === page.id}
              onCheckedChange={() => handleCheckboxChange(page.id)}
              className={getCheckboxClasses(page.id)}
            />
          </RowWrapper>
        ))}
      </div>

      <div className="pt-4">
        <div className="border-t py-2 border-gray-300" />
        <div className="py-2">
          <button className="mb-2 w-full rounded-sm py-3 bg-[#FFCE22] cursor-pointer active:bg-[#FFCE22] text-[#1F2128] text-lg hover:bg-[#FFD84D]">
            Done
          </button>
        </div>
      </div>
    </Card>
  );
}
