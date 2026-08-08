import type { Translations } from '../i18n'
import type { PresetOption } from '../types/calculator'

interface PresetButtonsProps {
  t: Translations
  onSelectPreset: (value: string) => void
}

export function PresetButtons({ t, onSelectPreset }: PresetButtonsProps) {
  const presets: PresetOption[] = [
    { label: `10,000 ${t.presetUnit}`, value: '10000' },
    { label: `20,000 ${t.presetUnit}`, value: '20000' },
    { label: `50,000 ${t.presetUnit}`, value: '50000' }
  ]

  return (
    <div className="preset-buttons">
      {presets.map((preset) => (
        <button
          key={preset.value}
          type="button"
          className="preset-btn"
          onClick={() => onSelectPreset(preset.value)}
        >
          {preset.label}
        </button>
      ))}
    </div>
  )
}
