'use client'

import { useState, useRef, useEffect } from 'react'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { Input } from '../ui/input'

function formatDate(date?: Date) {
  if (!date) return ''
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

type Props = {
  onChange?: (range: { from?: Date; to?: Date }) => void
}

export function DateRangePicker({ onChange }: Props) {
  const [from, setFrom] = useState<Date | undefined>()
  const [to, setTo] = useState<Date | undefined>()
  const [open, setOpen] = useState<'from' | 'to' | null>(null)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const calendarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return

    function handleClickOutside(e: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node) &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(null)
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    return () => window.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  function handleSelect(date?: Date) {
    if (!date || !open) return

    if (open === 'from') {
      setFrom(date)
      onChange?.({ from: date, to })
    } else {
      setTo(date)
      onChange?.({ from, to: date })
    }
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-[360px] sm:max-w-none">
      {/* LABEL */}
      <div className="mb-1">
        <span className="text-[13px] font-semibold tracking-wide text-zinc-800 dark:text-zinc-200">
          Analyze period
        </span>
      </div>

      {/* INPUTS */}
      <div className="flex flex-col sm:flex-row gap-2">
        {(['from', 'to'] as const).map(type => (
          <div
            key={type}
            className="relative w-full sm:w-[170px] cursor-pointer"
            onClick={() => setOpen(open === type ? null : type)}
          >
            <Input
              readOnly
              placeholder={type === 'from' ? 'From' : 'To'}
              value={formatDate(type === 'from' ? from : to)}
              className="
                pr-9
                bg-white dark:bg-zinc-900
                border border-zinc-300 dark:border-zinc-700
                shadow-sm
                hover:border-zinc-400 dark:hover:border-zinc-500
                focus-visible:ring-1 focus-visible:ring-[#1DB954]
                transition-colors
              "
            />
            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          </div>
        ))}
      </div>

      {/* CALENDAR */}
      {open && (
        <div
          ref={calendarRef}
          className="
            absolute z-50 mt-2
            rounded-xl
            border border-zinc-200 dark:border-zinc-700
            bg-white dark:bg-zinc-900
            shadow-xl
            p-3
          "
        >
          <Calendar
            mode="single"
            selected={open === 'from' ? from : to}
            onSelect={handleSelect}
            captionLayout="dropdown"
            fromYear={2015}
            toYear={2030}
          />
        </div>
      )}
    </div>
  )
}
