import lib from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/ru'

lib.extend(customParseFormat)
lib.extend(utc)
lib.extend(duration)
lib.extend(localizedFormat)
lib.locale('ru')

function dayjs (
  date: string,
  format = 'DD-MM-YYYY0HH:m:ss',
  outputFormat = 'DD.MM.YYYY HH:mm'
): string {
  return lib.utc(date, format).format(outputFormat)
}

export { lib as dayjsLib, dayjs }
