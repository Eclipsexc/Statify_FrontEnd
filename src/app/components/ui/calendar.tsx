"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "./utils"
import { buttonVariants } from "./button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 select-none rdp", className)}
      classNames={{
        months: "flex flex-col gap-4",
        month: "flex flex-col gap-4",

        caption: "flex justify-center relative items-center w-full h-8",
        caption_label: "hidden",

        caption_dropdowns: "flex gap-2",
        dropdown:
          "h-8 rounded-md border border-border bg-background px-2 text-sm focus:outline-none transition-none",

        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-70 hover:opacity-100 transition-none focus-visible:ring-0"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",

        table: "w-full border-collapse",
        head_row: "flex",
        head_cell:
          "w-9 text-center text-[0.75rem] font-normal text-muted-foreground",

        row: "flex w-full mt-1",

        cell:
          "relative h-9 w-9 text-center p-0 transition-none focus-within:z-10",

        day: cn(
          buttonVariants({ variant: "ghost" }),
          `
            h-9 w-9 p-0 font-normal
            transition-none
            focus:outline-none
            focus-visible:outline-none
            focus-visible:ring-0
            hover:bg-zinc-200 hover:text-zinc-900
            dark:hover:bg-zinc-600 dark:hover:text-zinc-100
            aria-selected:opacity-100
          `
        ),

        day_selected: `
          bg-zinc-200 text-zinc-900 border border-black
          dark:bg-zinc-700 dark:text-zinc-100 dark:border-white
        `,

        day_today: `
          bg-blue-500 text-white
          dark:bg-blue-500 dark:text-white
        `,

        day_outside: `
          text-zinc-400
          dark:text-zinc-500
        `,

        day_disabled: "text-muted-foreground opacity-40",
        day_hidden: "invisible",

        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft
            className={cn("h-4 w-4 transition-none", className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn("h-4 w-4 transition-none", className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  )
}

export { Calendar }
