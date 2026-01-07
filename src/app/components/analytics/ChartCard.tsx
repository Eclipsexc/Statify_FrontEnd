type Props = {
  title: string
  children: React.ReactNode
}

export function ChartCard({ title, children }: Props) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  )
}
