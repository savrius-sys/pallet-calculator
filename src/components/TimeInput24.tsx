interface TimeInput24Props {
  id?: string
  value: string
  onChange: (val: string) => void
  placeholder?: string
}

export function TimeInput24({ id, value, onChange, placeholder }: TimeInput24Props) {
  return (
    <input
      type="time"
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="time-input-24"
      step="60"
    />
  )
}
