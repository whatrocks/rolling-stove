export function parseTime(timeString: string): number {
  const date = new Date()
  const [hours, minutes] = timeString.split(':').map((s) => parseInt(s, 10))
  return date.setHours(hours, minutes, 0, 0)
}
