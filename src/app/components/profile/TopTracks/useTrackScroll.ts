import { useRef, useState, useEffect } from 'react'

const LIST_INITIAL = 12
const LIST_BATCH = 8
const CARD_SHIFT = (192 + 16) * 3
const EDGE_OFFSET = 4

export function useTrackScroll(total: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(LIST_INITIAL)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const updateEdges = () => {
    const el = ref.current
    if (!el) return

    setCanLeft(el.scrollLeft > EDGE_OFFSET)
    setCanRight(
      el.scrollLeft + el.clientWidth <
        el.scrollWidth - EDGE_OFFSET
    )
  }

  const scroll = (dir: 'left' | 'right') => {
    if (!ref.current) return

    ref.current.scrollBy({
      left: dir === 'left' ? -CARD_SHIFT : CARD_SHIFT,
      behavior: 'smooth',
    })

    requestAnimationFrame(updateEdges)
  }

  const onScroll = () => {
    updateEdges()

    const el = ref.current
    if (!el) return

    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 120) {
      setVisibleCount(v => Math.min(v + LIST_BATCH, total))
    }
  }

  const reset = () => {
    setVisibleCount(LIST_INITIAL)
    requestAnimationFrame(updateEdges)
  }

  useEffect(() => {
    updateEdges()
  }, [])

  return {
    ref,
    visibleCount,
    scroll,
    onScroll,
    reset,
    canLeft,
    canRight,
  }
}
