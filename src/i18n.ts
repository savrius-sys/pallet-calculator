export type Language = 'uk' | 'en'

export interface Translations {
  title: string
  subtitle: string
  totalLabel: string
  perPalletLabel: string
  rowsLabel: string
  optionalHint: string
  totalPlaceholder: string
  perPalletPlaceholder: string
  rowsPlaceholder: string
  presetUnit: string
  fullPallets: string
  lastPallet: string
  lastPalletExact: string
  bottlesSuffix: string
  perRow: string
  rowsToOpen: string
  rowsToOpenOf: string
  withPartial: string
  totalBreakdownPartial: (full: string, remainder: string, bottleSuffix: string) => string
  totalBreakdownExact: (full: string) => string
  installApp: string
  installSubtitle: string
  installBtn: string
  iosGuideTitle: string
  iosGuideShareText: string
  iosGuideActionText: string
}

export const translations: Record<Language, Translations> = {
  uk: {
    title: 'Калькулятор піддонів',
    subtitle: 'Розрахунок кількості піддонів та рядів',
    totalLabel: 'Скільки пляшок треба',
    perPalletLabel: 'Пляшок у піддоні',
    rowsLabel: 'Рядів у піддоні',
    optionalHint: "(необов'язково)",
    totalPlaceholder: 'напр. 20000',
    perPalletPlaceholder: 'напр. 1152',
    rowsPlaceholder: 'напр. 8',
    presetUnit: 'шт',
    fullPallets: 'Повних піддонів',
    lastPallet: 'Пляшок на останньому піддоні',
    lastPalletExact: 'немає, остання поставка рівна',
    bottlesSuffix: 'пляшок',
    perRow: 'Пляшок у ряду',
    rowsToOpen: 'Рядів відкрити на останньому',
    rowsToOpenOf: 'з',
    withPartial: 'Разом піддонів (з неповним)',
    totalBreakdownPartial: (full, remainder, bottleSuffix) =>
      `(${full} повних + 1 неповний з ${remainder} ${bottleSuffix})`,
    totalBreakdownExact: (full) =>
      `(${full} повних піддонів, неповного немає)`,
    installApp: 'Встановити додаток',
    installSubtitle: 'Швидкий доступ з головного екрана',
    installBtn: 'Додати',
    iosGuideTitle: '📱 Як додати на головний екран iOS?',
    iosGuideShareText: '«Поділитися»',
    iosGuideActionText: '«На початковий екран»'
  },
  en: {
    title: 'Pallet Calculator',
    subtitle: 'Calculate pallets and rows quantity',
    totalLabel: 'Bottles needed',
    perPalletLabel: 'Bottles per pallet',
    rowsLabel: 'Rows per pallet',
    optionalHint: '(optional)',
    totalPlaceholder: 'e.g. 20000',
    perPalletPlaceholder: 'e.g. 1152',
    rowsPlaceholder: 'e.g. 8',
    presetUnit: 'pcs',
    fullPallets: 'Full pallets',
    lastPallet: 'Bottles on last pallet',
    lastPalletExact: 'none, shipment is exact',
    bottlesSuffix: 'bottles',
    perRow: 'Bottles per row',
    rowsToOpen: 'Rows to open on last pallet',
    rowsToOpenOf: 'of',
    withPartial: 'Total pallets (with partial)',
    totalBreakdownPartial: (full, remainder, bottleSuffix) =>
      `(${full} full + 1 partial with ${remainder} ${bottleSuffix})`,
    totalBreakdownExact: (full) =>
      `(${full} full pallets, no partial needed)`,
    installApp: 'Install App',
    installSubtitle: 'Quick access from home screen',
    installBtn: 'Add',
    iosGuideTitle: '📱 How to add to iOS Home Screen?',
    iosGuideShareText: "'Share'",
    iosGuideActionText: "'Add to Home Screen'"
  }
}

export function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'uk'

  const saved = localStorage.getItem('app_lang')
  if (saved === 'uk' || saved === 'en') {
    return saved as Language
  }

  const browserLangs = navigator.languages || [navigator.language || '']
  for (const lang of browserLangs) {
    const l = lang.toLowerCase()
    if (l.startsWith('uk') || l.startsWith('ua')) return 'uk'
    if (l.startsWith('en')) return 'en'
  }

  return 'uk'
}
