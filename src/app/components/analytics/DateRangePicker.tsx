import { useState, useRef, useEffect } from 'react'
import { CalendarIcon } from 'lucide-react'

import { Calendar } from '../ui/calendar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

function formatDate(date: Date | undefined) {
  if (!date) return ''
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
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

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(null)
    }

    function onClickOutside(e: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node) &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('mousedown', onClickOutside)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('mousedown', onClickOutside)
    }
  }, [open])

  function handleSelect(d: Date | undefined) {
    if (!d || !open) return

    if (open === 'from') {
      setFrom(d)
      onChange?.({ from: d, to })
    }

    if (open === 'to') {
      setTo(d)
      onChange?.({ from, to: d })
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <p className="text-xs text-muted-foreground mb-1">
        Analyze period
      </p>

      <div className="flex gap-2">
        <div className="relative w-full">
          <Label className="sr-only">From</Label>

          <div
            className="relative cursor-pointer"
            onClick={() => setOpen(open === 'from' ? null : 'from')}
          >
            <Input
              value={formatDate(from)}
              placeholder="From"
              readOnly
              className="cursor-pointer pr-9"
            />
            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="relative w-full">
          <Label className="sr-only">To</Label>

          <div
            className="relative cursor-pointer"
            onClick={() => setOpen(open === 'to' ? null : 'to')}
          >
            <Input
              value={formatDate(to)}
              placeholder="To"
              readOnly
              className="cursor-pointer pr-9"
            />
            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {open && (
        <div
          ref={calendarRef}
          className="
            absolute
            left-0
            mt-2
            z-50
            bg-popover
            border
            border-border
            rounded-xl
            shadow-xl
            p-3
          "
        >
          <Calendar
            mode="single"
            selected={open === 'from' ? from : to}
            captionLayout="dropdown"
            fromYear={2015}
            toYear={2030}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  )
}
