type LogbookMeasurement = {
  glucose: number,
  bolus: number,
  carbohydrates: number,
  date: string,
};

export type LogbookDayData = {
  day: string,
  mealTimes: {
    [
      | 'night'
      | 'beforeBreakfast'
      | 'afterBreakfast'
      | 'beforeLunch'
      | 'afterLunch'
      | 'beforeDinner'
      | 'afterDinner'
      | 'bedtime']: Array<LogbookMeasurement>,
  },
};
