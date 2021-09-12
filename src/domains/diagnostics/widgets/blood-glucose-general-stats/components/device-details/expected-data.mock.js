import { convertISOToJsGMT } from 'src/domains/diagnostics/utils';

export const expectedDataMock = {
  deviceData: [
    {
      id: 6735,
      name: 'Aviva',
      serial: '00057305',
      lastReading: convertISOToJsGMT('2018-03-09T00:00:00.000Z'),
      type: 'PUMP',
    },
  ],
  deviceStats: {
    hypos: {
      hypoglycaemiaNumber: 2,
      hypoglycemiaThreshold: 90,
    },
    indexes: {
      hbgi: '0.2',
      lbgi: '7.0',
    },
    meanBG: {
      highestBG: 130,
      lowestBG: 50,
      mean: 88,
      stdDev: 33,
    },
    meanBeforeMeals: {
      meanBeforeBreakfast: '-',
      meanBeforeDinner: '-',
      meanBeforeLunch: '-',
      meanBeforeMeals: '-',
    },
    targetRange: {
      aboveCount: 0,
      abovePercentage: 0,
      belowAndHypoCount: 3,
      belowAndHypoPercentage: 75,
      targetBloodGlucoseMaximum: 130,
      targetBloodGlucoseMinimum: 100,
      withinCount: 1,
      withinPercentage: 25,
    },
    tests: {
      numberOfTests: 4,
      testsPerDay: 0,
      testsPerMeasuredDay: '2.0',
    },
  },
  bloodGlucoseMeasurementUnit: 'mg/dL',
  bolusStats: {
    ext: 0,
    frequency: '0.0',
    max: '3.0',
    mean: '1.5',
    min: '0.9',
    mul: 0,
    scr: 0,
    std: 4,
    total: 4,
  },
  basalDataMetrics: {
    basalRateProfileChangePerWeek: '0.2',
    daysinDateRange: 91,
    percentageOfStopEvents: 96,
    profileChangeCount: 2,
    tbrDecreaseCount: 2,
    tbrIncreaseCount: 0,
  },
};
