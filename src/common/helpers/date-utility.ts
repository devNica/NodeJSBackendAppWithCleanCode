import moment from 'moment'

export function createFutureDate (date: Date, secondsToAdd: number): Date {
  const secondsToMilliseconds = secondsToAdd * 1000
  return new Date(date.getTime() + secondsToMilliseconds)
}

export function getCurrentTimeFormatted (): string {
  return moment().utc().format()
}
