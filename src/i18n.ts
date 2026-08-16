export type Language = 'uk' | 'en'

export interface Translations {
  title: string
  subtitle: string
  tabQuantity: string
  tabTime: string
  tabLayer: string
  tabCrud: string
  tabStats: string
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

  // Time-based calculator translations
  currentTimeLabel: string
  currentTimeAuto: string
  targetTimeLabel: string
  targetTimePlaceholder: string
  palletDurationLabel: string
  hoursLabel: string
  minutesLabel: string
  hoursPlaceholder: string
  minutesPlaceholder: string
  timeRemainingCard: string
  palletsNeededCard: string
  finishTimeCard: string
  useCurrentTimeBtn: string
  timeBreakdownNote: (full: number, partialMins: number) => string
  timeExactNote: (full: number) => string

  // Layer time calculator translations
  rowTimeLabel: string
  rowsPerPalletLabel: string
  palletCountLabel: string
  timePerPalletCard: string
  batchTimeCard: string
  layerBreakdownNote: (rows: number, timeStr: string) => string
  layerBatchNote: (pallets: number, timePerPallet: string) => string

  // Stopwatch translations
  toggleStopwatch: string
  startStopwatch: string
  pauseStopwatch: string
  resetStopwatch: string
  useStopwatchTime: string

  // History translations
  historyTitle: string
  clearHistory: string
  emptyHistory: string
  restoreEntry: string
  deleteEntry: string
  historySaved: string

  // CRUD Pallet Registry translations
  addPalletBtn: string
  editPalletTitle: string
  newPalletTitle: string
  palletCodeLabel: string
  palletCodePlaceholder: string
  productNameLabel: string
  productNamePlaceholder: string
  bottlesLabel: string
  bottlesPlaceholder: string
  palletTimeLabel: string
  palletTimePlaceholder: string
  quantityLabel: string
  zoneLabel: string
  zonePlaceholder: string
  statusLabel: string
  statusWarehouse: string
  statusShipped: string
  statusProduction: string
  noteLabel: string
  notePlaceholder: string
  saveBtn: string
  cancelBtn: string
  searchPlaceholder: string
  emptyRegistry: string
  deletePalletConfirm: string

  // Pick from registry translations
  selectFromRegistryBtn: string
  selectFromRegistryTitle: string
  emptyRegistryPickHint: string

  // Statistics translations
  statsTitle: string
  totalPalletsCard: string
  totalBottlesCard: string
  totalRowsCard: string
  historyCalcsCard: string
  productBreakdownTitle: string
  calcTypeBreakdownTitle: string
  noStatsData: string
  avgBottlesPerPallet: string

  // Privacy & Data Management
  privacyNote: string
  exportDataBtn: string
  importDataBtn: string
  importSuccess: string
  importError: string

  // Installation guide
  installApp: string
  installSubtitle: string
  installBtn: string
  installGuideTitle: string
  iosGuideSteps: string
  androidGuideSteps: string

  // Achievements System
  achievementsTitle: string
  achievementsUnlocked: (unlocked: number, total: number) => string
  achievementUnlockedToast: string
  achievementsCategoryCalc: string
  achievementsCategoryRegistry: string
  achievementsCategoryTools: string
  achievementsCategorySpecial: string
  achievementUnlockedAt: (dateStr: string) => string
  achievementLocked: string

  ach_first_calc_title: string
  ach_first_calc_desc: string
  ach_calc_10_title: string
  ach_calc_10_desc: string
  ach_calc_50_title: string
  ach_calc_50_desc: string
  ach_time_master_title: string
  ach_time_master_desc: string
  ach_layer_master_title: string
  ach_layer_master_desc: string
  ach_stopwatch_used_title: string
  ach_stopwatch_used_desc: string
  ach_registry_first_title: string
  ach_registry_first_desc: string
  ach_registry_5_title: string
  ach_registry_5_desc: string
  ach_registry_pick_title: string
  ach_registry_pick_desc: string
  ach_night_shift_title: string
  ach_night_shift_desc: string
  ach_backup_done_title: string
  ach_backup_done_desc: string
  ach_stats_viewed_title: string
  ach_stats_viewed_desc: string
}

export const translations: Record<Language, Translations> = {
  uk: {
    title: 'Калькулятор палет',
    subtitle: 'Швидкий розрахунок палет та рядів',
    tabQuantity: 'Кількість',
    tabTime: 'За часом',
    tabLayer: 'Ряди',
    tabCrud: 'База',
    tabStats: 'Аналітика',
    totalLabel: 'Загальна кількість',
    perPalletLabel: 'Кількість у палеті',
    rowsLabel: 'Рядів у палеті',
    optionalHint: "(необов'язково)",
    totalPlaceholder: 'напр. 20000',
    perPalletPlaceholder: 'напр. 1152',
    rowsPlaceholder: 'напр. 8',
    presetUnit: 'шт',
    fullPallets: 'Повних палет',
    lastPallet: 'На останній палеті',
    lastPalletExact: 'немає, остання поставка рівна',
    bottlesSuffix: 'шт',
    perRow: 'Кількість у ряду',
    rowsToOpen: 'Рядів відкрити на останній',
    rowsToOpenOf: 'з',
    withPartial: 'Разом палет (з неповною)',
    totalBreakdownPartial: (full, remainder, bottleSuffix) =>
      `(${full} повних + 1 неповна з ${remainder} ${bottleSuffix})`,
    totalBreakdownExact: (full) =>
      `(${full} повних палет, неповної немає)`,

    currentTimeLabel: 'Скільки зараз годин',
    currentTimeAuto: '(за замовчуванням: зараз)',
    targetTimeLabel: 'Час, до якого треба палети',
    targetTimePlaceholder: 'напр. 18:00',
    palletDurationLabel: 'Час закінчення 1 палети',
    hoursLabel: 'год',
    minutesLabel: 'хв',
    hoursPlaceholder: 'год',
    minutesPlaceholder: 'хв',
    timeRemainingCard: 'Загальний час роботи',
    palletsNeededCard: 'Потрібно палет',
    finishTimeCard: 'Запасу вистачить до',
    useCurrentTimeBtn: 'Зараз',
    timeBreakdownNote: (full, partialMins) =>
      `(${full} повних + 1 неповна на ${partialMins} хв)`,
    timeExactNote: (full) =>
      `(${full} повних палет рівно)`,

    rowTimeLabel: 'Час 1 ряду (шару)',
    rowsPerPalletLabel: 'Кількість рядів',
    palletCountLabel: 'Кількість палет',
    timePerPalletCard: 'Час на палету (усі ряди)',
    batchTimeCard: 'Час на всі палети',
    layerBreakdownNote: (rows, timeStr) =>
      `(${rows} рядів × ${timeStr}/ряд)`,
    layerBatchNote: (pallets, timePerPallet) =>
      `(${pallets} палет × ${timePerPallet})`,

    toggleStopwatch: 'Секундомір',
    startStopwatch: 'Старт',
    pauseStopwatch: 'Пауза',
    resetStopwatch: 'Скинути',
    useStopwatchTime: 'Вставити час',

    historyTitle: 'Історія розрахунків',
    clearHistory: 'Очистити історію',
    emptyHistory: 'Історія порожня. Зроблені розрахунки зберігатимуться тут.',
    restoreEntry: 'Відновити',
    deleteEntry: 'Видалити',
    historySaved: 'Збережено в історію',

    addPalletBtn: 'Додати палету',
    editPalletTitle: 'Редагувати палету',
    newPalletTitle: 'Нова палета у базі',
    palletCodeLabel: 'Код / № палети',
    palletCodePlaceholder: 'напр. PL-104',
    productNameLabel: 'Назва продукції / тари',
    productNamePlaceholder: 'напр. Вода 0.5л Газована',
    bottlesLabel: 'Кількість пляшок',
    bottlesPlaceholder: 'напр. 1152',
    palletTimeLabel: 'Час обробки всієї палети',
    palletTimePlaceholder: 'напр. 6 хв або 1 год 30 хв',
    quantityLabel: 'Кількість пляшок',
    zoneLabel: 'Зона / Склад',
    zonePlaceholder: 'напр. Склад А-2',
    statusLabel: 'Статус палети',
    statusWarehouse: 'На складі',
    statusShipped: 'Відвантажено',
    statusProduction: 'В роботі',
    noteLabel: 'Примітка',
    notePlaceholder: 'Додаткові примітки...',
    saveBtn: 'Зберегти',
    cancelBtn: 'Скасувати',
    searchPlaceholder: 'Пошук за назвою чи приміткою...',
    emptyRegistry: 'База палет порожня. Додайте перший запис.',
    deletePalletConfirm: 'Видалити запис про палету?',

    selectFromRegistryBtn: 'З бази палет',
    selectFromRegistryTitle: 'Виберіть палету з бази',
    emptyRegistryPickHint: 'У базі ще немає збережених палет.',

    statsTitle: 'Аналітика та статистика',
    totalPalletsCard: 'Всього палет у базі',
    totalBottlesCard: 'Загальна кількість пляшок',
    totalRowsCard: 'Сума рядів',
    historyCalcsCard: 'Виконано розрахунків',
    productBreakdownTitle: 'Статистика за продукцією',
    calcTypeBreakdownTitle: 'Використання калькуляторів',
    noStatsData: 'Даних ще немає. Додайте палети в базу або виконайте розрахунки.',
    avgBottlesPerPallet: 'Середнє пляшок/палету',

    privacyNote: '🔒 Усі ваші дані (база палет та історія розрахунків) зберігаються виключно на цьому пристрої та ніколи не надсилаються в мережу.',
    exportDataBtn: 'Експорт (JSON)',
    importDataBtn: 'Імпорт',
    importSuccess: 'Дані успішно імпортовано!',
    importError: 'Не вдалося прочитати файл. Перевірте формат JSON.',

    installApp: 'Встановити додаток',
    installSubtitle: 'Швидкий доступ з головного екрана',
    installBtn: 'Додати',
    installGuideTitle: 'Як додати на головний екран?',
    iosGuideSteps: 'iOS (Safari): Натисніть меню (три крапки з правого боку або іконку Поділитися) ➔ «Поширити» ➔ «Переглянути ще» ➔ «На початковий екран».',
    androidGuideSteps: 'Android / Інші браузери: Залежить від вашого браузера (Chrome, Firefox тощо) — відкрийте меню браузера (три крапки у кутку) та виберіть «Встановити додаток» або «Додати на головний екран».',

    achievementsTitle: 'Досягнення та ачівки',
    achievementsUnlocked: (unlocked, total) => `Розблоковано ${unlocked} з ${total}`,
    achievementUnlockedToast: '🏆 Нове досягнення розблоковано!',
    achievementsCategoryCalc: 'Розрахунки',
    achievementsCategoryRegistry: 'База палет',
    achievementsCategoryTools: 'Інструменти',
    achievementsCategorySpecial: 'Особливі',
    achievementUnlockedAt: (dateStr) => `Отримано: ${dateStr}`,
    achievementLocked: 'Заблоковано',

    ach_first_calc_title: '🎯 Перші кроки',
    ach_first_calc_desc: 'Виконайте свій перший розрахунок кількості палет',
    ach_calc_10_title: '🔢 Досвідчений рахівник',
    ach_calc_10_desc: 'Зробіть 10 розрахунків у додатку',
    ach_calc_50_title: '🏆 Палетний Гуру',
    ach_calc_50_desc: 'Зробіть 50 розрахунків у додатку',
    ach_time_master_title: '⏱️ Повелитель часу',
    ach_time_master_desc: 'Скористайтеся калькулятором палет за часом',
    ach_layer_master_title: '🥞 Майстер шарів',
    ach_layer_master_desc: 'Розрахуйте час обробки рядів (шарів)',
    ach_stopwatch_used_title: '⏱️ Секундометрист',
    ach_stopwatch_used_desc: 'Заміряйте час 1 ряду за допомогою секундоміра',
    ach_registry_first_title: '📦 Перший запис',
    ach_registry_first_desc: 'Збережіть перший тип палети у базу',
    ach_registry_5_title: '📚 Власник бази',
    ach_registry_5_desc: 'Збережіть 5 різних типів палет у базу',
    ach_registry_pick_title: '⚡ Швидка підстановка',
    ach_registry_pick_desc: 'Виберіть готовий шаблон палети з бази',
    ach_night_shift_title: '🦉 Нічна зміна',
    ach_night_shift_desc: 'Зробіть розрахунок палет у нічний час (22:00 – 06:00)',
    ach_backup_done_title: '💾 Хранитель даних',
    ach_backup_done_desc: 'Зробіть резервну копію даних (JSON)',
    ach_stats_viewed_title: '📊 Головний аналітик',
    ach_stats_viewed_desc: 'Перегляньте вкладку аналітики'
  },
  en: {
    title: 'Pallet Calculator',
    subtitle: 'Quick pallet and row quantity calculator',
    tabQuantity: 'Quantity',
    tabTime: 'By Time',
    tabLayer: 'Rows',
    tabCrud: 'Registry',
    tabStats: 'Analytics',
    totalLabel: 'Total quantity',
    perPalletLabel: 'Quantity per pallet',
    rowsLabel: 'Rows per pallet',
    optionalHint: '(optional)',
    totalPlaceholder: 'e.g. 20000',
    perPalletPlaceholder: 'e.g. 1152',
    rowsPlaceholder: 'e.g. 8',
    presetUnit: 'pcs',
    fullPallets: 'Full pallets',
    lastPallet: 'On last pallet',
    lastPalletExact: 'none, shipment is exact',
    bottlesSuffix: 'pcs',
    perRow: 'Quantity per row',
    rowsToOpen: 'Rows to open on last pallet',
    rowsToOpenOf: 'of',
    withPartial: 'Total pallets (with partial)',
    totalBreakdownPartial: (full, remainder, bottleSuffix) =>
      `(${full} full + 1 partial with ${remainder} ${bottleSuffix})`,
    totalBreakdownExact: (full) =>
      `(${full} full pallets, no partial needed)`,

    currentTimeLabel: 'Current time',
    currentTimeAuto: '(default: now)',
    targetTimeLabel: 'Target time needed until',
    targetTimePlaceholder: 'e.g. 18:00',
    palletDurationLabel: 'Time per 1 pallet',
    hoursLabel: 'hrs',
    minutesLabel: 'mins',
    hoursPlaceholder: 'hrs',
    minutesPlaceholder: 'mins',
    timeRemainingCard: 'Total duration',
    palletsNeededCard: 'Pallets needed',
    finishTimeCard: 'Pallets will last until',
    useCurrentTimeBtn: 'Now',
    timeBreakdownNote: (full, partialMins) =>
      `(${full} full + 1 partial for ${partialMins} mins)`,
    timeExactNote: (full) =>
      `(${full} full pallets exact)`,

    rowTimeLabel: 'Time per 1 row (layer)',
    rowsPerPalletLabel: 'Number of rows',
    palletCountLabel: 'Number of pallets',
    timePerPalletCard: 'Time per pallet (all rows)',
    batchTimeCard: 'Time for all pallets',
    layerBreakdownNote: (rows, timeStr) =>
      `(${rows} rows × ${timeStr}/row)`,
    layerBatchNote: (pallets, timePerPallet) =>
      `(${pallets} pallets × ${timePerPallet})`,

    toggleStopwatch: 'Stopwatch',
    startStopwatch: 'Start',
    pauseStopwatch: 'Pause',
    resetStopwatch: 'Reset',
    useStopwatchTime: 'Apply time',

    historyTitle: 'Calculation History',
    clearHistory: 'Clear history',
    emptyHistory: 'History is empty. Completed calculations will be saved here.',
    restoreEntry: 'Restore',
    deleteEntry: 'Delete',
    historySaved: 'Saved to history',

    addPalletBtn: 'Add Pallet',
    editPalletTitle: 'Edit Pallet',
    newPalletTitle: 'New Pallet Entry',
    palletCodeLabel: 'Pallet Code / ID',
    palletCodePlaceholder: 'e.g. PL-104',
    productNameLabel: 'Product Name',
    productNamePlaceholder: 'e.g. Sparkling Water 0.5L',
    bottlesLabel: 'Number of bottles',
    bottlesPlaceholder: 'e.g. 1152',
    palletTimeLabel: 'Full pallet processing time',
    palletTimePlaceholder: 'e.g. 6 mins or 1 hr 30 mins',
    quantityLabel: 'Number of bottles',
    zoneLabel: 'Storage Zone',
    zonePlaceholder: 'e.g. Aisle A-2',
    statusLabel: 'Pallet Status',
    statusWarehouse: 'In Warehouse',
    statusShipped: 'Shipped',
    statusProduction: 'In Production',
    noteLabel: 'Note',
    notePlaceholder: 'Additional notes...',
    saveBtn: 'Save',
    cancelBtn: 'Cancel',
    searchPlaceholder: 'Search product or notes...',
    emptyRegistry: 'Registry is empty. Add your first pallet record.',
    deletePalletConfirm: 'Delete pallet record from registry?',

    selectFromRegistryBtn: 'From Registry',
    selectFromRegistryTitle: 'Select Pallet from Registry',
    emptyRegistryPickHint: 'No saved pallets in registry yet.',

    statsTitle: 'Analytics & Statistics',
    totalPalletsCard: 'Total Pallets in DB',
    totalBottlesCard: 'Total Bottles Count',
    totalRowsCard: 'Total Layers/Rows',
    historyCalcsCard: 'Calculations Performed',
    productBreakdownTitle: 'Product Breakdown',
    calcTypeBreakdownTitle: 'Calculators Used',
    noStatsData: 'No statistics available yet. Add pallets or perform calculations.',
    avgBottlesPerPallet: 'Avg bottles/pallet',

    privacyNote: '🔒 All your data (pallet registry and calculation history) is stored exclusively on this device and is never sent anywhere.',
    exportDataBtn: 'Export (JSON)',
    importDataBtn: 'Import',
    importSuccess: 'Data successfully imported!',
    importError: 'Failed to read file. Please check JSON backup file.',

    installApp: 'Install App',
    installSubtitle: 'Quick access from home screen',
    installBtn: 'Add',
    installGuideTitle: 'How to add to Home Screen?',
    iosGuideSteps: 'iOS (Safari): Open browser menu (three dots on right side or Share icon) ➔ "Share" ➔ "More" ➔ "Add to Home Screen".',
    androidGuideSteps: 'Android / Other browsers: Depends on your browser (Chrome, Firefox, etc.) — open browser menu (three dots in corner) and tap "Install app" or "Add to Home Screen".',

    achievementsTitle: 'Achievements & Badges',
    achievementsUnlocked: (unlocked, total) => `Unlocked ${unlocked} of ${total}`,
    achievementUnlockedToast: '🏆 New achievement unlocked!',
    achievementsCategoryCalc: 'Calculations',
    achievementsCategoryRegistry: 'Pallet Registry',
    achievementsCategoryTools: 'Tools',
    achievementsCategorySpecial: 'Special',
    achievementUnlockedAt: (dateStr) => `Unlocked: ${dateStr}`,
    achievementLocked: 'Locked',

    ach_first_calc_title: '🎯 First Steps',
    ach_first_calc_desc: 'Perform your first pallet calculation',
    ach_calc_10_title: '🔢 Experienced Counter',
    ach_calc_10_desc: 'Complete 10 calculations in the app',
    ach_calc_50_title: '🏆 Pallet Guru',
    ach_calc_50_desc: 'Complete 50 calculations in the app',
    ach_time_master_title: '⏱️ Time Lord',
    ach_time_master_desc: 'Use the time-based pallet calculator',
    ach_layer_master_title: '🥞 Layer Master',
    ach_layer_master_desc: 'Calculate layer/row processing time',
    ach_stopwatch_used_title: '⏱️ Chronomaster',
    ach_stopwatch_used_desc: 'Measure row duration using built-in stopwatch',
    ach_registry_first_title: '📦 First Entry',
    ach_registry_first_desc: 'Save your first pallet type to the registry',
    ach_registry_5_title: '📚 Registry Owner',
    ach_registry_5_desc: 'Save 5 different pallet types to registry',
    ach_registry_pick_title: '⚡ Quick Fill',
    ach_registry_pick_desc: 'Select a preset pallet from registry',
    ach_night_shift_title: '🦉 Night Shift',
    ach_night_shift_desc: 'Perform a calculation during night shift (22:00 – 06:00)',
    ach_backup_done_title: '💾 Data Keeper',
    ach_backup_done_desc: 'Export a JSON data backup',
    ach_stats_viewed_title: '📊 Chief Analyst',
    ach_stats_viewed_desc: 'Check out the Analytics tab'
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
