import morgan from 'morgan'
import moment from 'moment-timezone'

morgan.token('date', (req, res, tz) => {
  return moment().tz('America/Fortaleza').format('YYYY-MM-DD HH:mm')
})

export default morgan
