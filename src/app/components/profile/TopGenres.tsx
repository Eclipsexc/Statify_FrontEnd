type Props = {
  genres: string[]
}

export function TopGenres({ genres }: Props) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">
        Top Genres
      </h2>

      <div
        className="
          flex gap-2
          overflow-x-auto
          scrollbar-none
          py-2
          -mx-2 px-2
        "
      >
        {genres.map((g) => (
          <button
            key={g}
            className="
              whitespace-nowrap
              px-4 py-2
              rounded-full
              text-sm
              bg-card
              transition-transform duration-200
              hover:scale-[1.05]
              active:scale-95
            "
          >
            {g}
          </button>
        ))}
      </div>
    </section>
  )
}
