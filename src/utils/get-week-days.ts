export function getWeekDays(language = 'pt-BR') {
  const formatter = new Intl.DateTimeFormat(language, { weekday: 'long' })

  const weekDays = createArrayWithWeekDays(formatter)

  const weekDaysFormatted = weekDays.map((weekDay) => {
    return capitalizeFirstLetter(weekDay)
  })

  return weekDaysFormatted
}

function createArrayWithWeekDays(formatter: Intl.DateTimeFormat) {
  const arrayWithNumbers = Array.from(Array(7).keys())

  const arrayWithWeekDays = arrayWithNumbers.map((weekDay) =>
    formatter.format(new Date(Date.UTC(2023, 7, weekDay))),
  )

  return arrayWithWeekDays
}

function capitalizeFirstLetter(weekDay: string) {
  return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
}
