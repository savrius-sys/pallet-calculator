interface ResultCardProps {
  label: string
  value: string
  id: string
  accent?: boolean
  note?: string
  stack?: boolean
}

export function ResultCard({
  label,
  value,
  id,
  accent = false,
  note,
  stack = false
}: ResultCardProps) {
  return (
    <div className={`card ${accent ? 'accent' : ''} ${stack ? 'stack' : ''}`}>
      <p className="label">{label}</p>
      <p className="value" id={id}>
        {value}
      </p>
      {note && <p className="card-note">{note}</p>}
    </div>
  )
}
