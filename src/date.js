// ======== Date n Time
const toUTCString = (time) => {
  const d = new Date()
  return time && d.setTime(time) ? d.toUTCString() : '-'
}

export const date = { toUTCString }

export default date
