import { Listbox } from '@headlessui/react'

export function HeaderSection({ year, setYear, years, metric, setMetric, theme }) {
  const {
    borderColor,
    bgColor,
    bgColorActive,
    textOpacity
  } = theme

  const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark')

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}
    >
      <div>
        <div style={{ fontSize: 22, fontWeight: 700 }}>
          Listening Geography
        </div>
        <div style={{ fontSize: 13, opacity: textOpacity, marginTop: 4 }}>
          See where you listened based on city-level GPS data, not just country.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ fontSize: 13, opacity: textOpacity }}>
            Year
          </div>

          <Listbox value={year} onChange={setYear}>
            <div style={{ position: 'relative' }}>
              <Listbox.Button
                style={{
                  height: 36,
                  minWidth: 84,
                  padding: '0 14px',
                  borderRadius: 10,
                  border: `1px solid ${borderColor}`,
                  background: bgColor,
                  color: 'inherit',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {year}
              </Listbox.Button>

              <Listbox.Options
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  width: '100%',
                  background: isDark ? '#1a1a1a' : '#fff',
                  border: `1px solid ${borderColor}`,
                  borderRadius: 12,
                  zIndex: 1000,
                  overflow: 'hidden'
                }}
              >
                {years.map(y => (
                  <Listbox.Option
                    key={y}
                    value={y}
                    className={({ active, selected }) => `
                      px-[14px] py-[8px] text-[14px] cursor-pointer
                      ${active ? 'bg-neutral-200 dark:bg-neutral-700' : ''}
                      ${selected ? 'font-semibold' : ''}
                    `}
                  >
                    {y}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => setMetric('msPlayed')}
            style={{
              height: 34,
              padding: '0 12px',
              borderRadius: 10,
              border: `1px solid ${borderColor}`,
              background: metric === 'msPlayed' ? bgColorActive : bgColor,
              color: 'inherit',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Time played
          </button>

          <button
            onClick={() => setMetric('sessions')}
            style={{
              height: 34,
              padding: '0 12px',
              borderRadius: 10,
              border: `1px solid ${borderColor}`,
              background: metric === 'sessions' ? bgColorActive : bgColor,
              color: 'inherit',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Sessions
          </button>
        </div>
      </div>
    </div>
  )
}
