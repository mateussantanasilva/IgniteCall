interface getWeekDaysParams {
  language?: string
  short?: boolean
}

export function getWeekDays({
  language = 'pt-BR',
  short = false,
}: getWeekDaysParams = {}) {
  const formatter = new Intl.DateTimeFormat(language, { weekday: 'long' })

  const weekDays = createArrayWithWeekDays(formatter)

  const weekDaysFormatted = weekDays.map((weekDay) => {
    if (short) {
      return turnIntoShortAbbreviation(weekDay)
    }

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

function turnIntoShortAbbreviation(weekDay: string) {
  return weekDay.substring(0, 3).toUpperCase().concat('.')
}

function capitalizeFirstLetter(weekDay: string) {
  return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
}
