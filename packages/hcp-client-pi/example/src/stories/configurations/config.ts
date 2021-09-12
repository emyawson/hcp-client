import {
  NumberValidation,
  SelectValidation,
  ValidationConfig,
} from '@roche/patterns-indicators/types/config.types';

export const configDetails = {
  categories: [
    // Measurements for Analysis
    {
      id: 'indicator-category.measurements-for-analysis',
      patterns: [
        {
          id: 'indicator.measurements-for-analysis.variability',
          displayText:
            'indicator.measurements-for-analysis.variability.display',
          configText: 'indicator.measurements-for-analysis.variability.config',
          informationText: [],
        },
        {
          id: 'indicator.measurements-for-analysis.general',
          displayText: 'indicator.measurements-for-analysis.general.display',
          configText: 'indicator.measurements-for-analysis.general.config',
          informationText: [],
        },
        {
          id: 'indicator.measurements-for-analysis.preprandial',
          displayText:
            'indicator.measurements-for-analysis.preprandial.display',
          configText: 'indicator.measurements-for-analysis.preprandial.config',
          informationText: [],
        },
        {
          id: 'indicator.measurements-for-analysis.postprandial',
          displayText:
            'indicator.measurements-for-analysis.postprandial.display',
          configText: 'indicator.measurements-for-analysis.postprandial.config',
          informationText: [],
        },
        {
          id: 'indicator.measurements-for-analysis.bedtime',
          displayText: 'indicator.measurements-for-analysis.bedtime.display',
          configText: 'indicator.measurements-for-analysis.bedtime.config',
          informationText: [],
        },
      ],
      underlyingCategory: true,
    },
    // Glycemic limits
    {
      id: 'indicator-category.glycemic-limits',
      patterns: [
        // Hypo limit
        {
          id: 'indicator.glycemic-limits.hypo-limit',
          displayText: 'indicator.glycemic-limits.hypo-limit.display',
          configText: 'indicator.glycemic-limits.hypo-limit.config',
          informationText: [],
          consts: {
            hypoLimit: [
              { text: '50 mg/dL', value: 50 },
              { text: '55 mg/dL', value: 55 },
              { text: '60 mg/dL', value: 60 },
              { text: '65 mg/dL', value: 65 },
              { text: '70 mg/dL', value: 70 },
              { text: '75 mg/dL', value: 75 },
              { text: '80 mg/dL', value: 80 },
              { text: '85 mg/dL', value: 85 },
              { text: '90 mg/dL', value: 90 },
            ],
          },
        },
        // Hyper limit
        {
          id: 'indicator.glycemic-limits.hyper-limit',
          displayText: 'indicator.glycemic-limits.hyper-limit.display',
          configText: 'indicator.glycemic-limits.hyper-limit.config',
          informationText: [],
          consts: {
            hyperLimit: [
              { text: '100 mg/dL', value: 100 },
              { text: '105 mg/dL', value: 105 },
              { text: '110 mg/dL', value: 110 },
              { text: '115 mg/dL', value: 115 },
              { text: '120 mg/dL', value: 120 },
              { text: '125 mg/dL', value: 125 },
              { text: '130 mg/dL', value: 130 },
              { text: '135 mg/dL', value: 135 },
              { text: '140 mg/dL', value: 140 },
              { text: '145 mg/dL', value: 145 },
              { text: '150 mg/dL', value: 150 },
              { text: '155 mg/dL', value: 155 },
              { text: '160 mg/dL', value: 160 },
              { text: '170 mg/dL', value: 170 },
              { text: '180 mg/dL', value: 180 },
              { text: '190 mg/dL', value: 190 },
              { text: '200 mg/dL', value: 200 },
              { text: '210 mg/dL', value: 210 },
              { text: '220 mg/dL', value: 220 },
              { text: '230 mg/dL', value: 230 },
              { text: '240 mg/dL', value: 240 },
              { text: '250 mg/dL', value: 250 },
            ],
          },
        },
        // Pre Hyper Limit
        {
          id: 'indicator.glycemic-limits.pre-hyper-limit',
          displayText: 'indicator.glycemic-limits.pre-hyper-limit.display',
          configText: 'indicator.glycemic-limits.pre-hyper-limit.config',
          informationText: [],
          consts: {
            preHyperLimit: [
              { text: '100 mg/dL', value: 100 },
              { text: '105 mg/dL', value: 105 },
              { text: '110 mg/dL', value: 110 },
              { text: '115 mg/dL', value: 115 },
              { text: '120 mg/dL', value: 120 },
              { text: '125 mg/dL', value: 125 },
              { text: '130 mg/dL', value: 130 },
              { text: '135 mg/dL', value: 135 },
              { text: '140 mg/dL', value: 140 },
              { text: '145 mg/dL', value: 145 },
              { text: '150 mg/dL', value: 150 },
              { text: '155 mg/dL', value: 155 },
              { text: '160 mg/dL', value: 160 },
              { text: '170 mg/dL', value: 170 },
              { text: '180 mg/dL', value: 180 },
              { text: '190 mg/dL', value: 190 },
              { text: '200 mg/dL', value: 200 },
              { text: '210 mg/dL', value: 210 },
              { text: '220 mg/dL', value: 220 },
              { text: '230 mg/dL', value: 230 },
              { text: '240 mg/dL', value: 240 },
              { text: '250 mg/dL', value: 250 },
            ],
          },
        },
        // Post Hyper Limit
        {
          id: 'indicator.glycemic-limits.post-hyper-limit',
          displayText: 'indicator.glycemic-limits.post-hyper-limit.display',
          configText: 'indicator.glycemic-limits.post-hyper-limit.config',
          informationText: [],
          consts: {
            postHyperLimit: [
              { text: '120 mg/dL', value: 120 },
              { text: '125 mg/dL', value: 125 },
              { text: '130 mg/dL', value: 130 },
              { text: '135 mg/dL', value: 135 },
              { text: '140 mg/dL', value: 140 },
              { text: '145 mg/dL', value: 145 },
              { text: '150 mg/dL', value: 150 },
              { text: '155 mg/dL', value: 155 },
              { text: '160 mg/dL', value: 160 },
              { text: '170 mg/dL', value: 170 },
              { text: '180 mg/dL', value: 180 },
              { text: '190 mg/dL', value: 190 },
              { text: '200 mg/dL', value: 200 },
              { text: '210 mg/dL', value: 210 },
              { text: '220 mg/dL', value: 220 },
              { text: '230 mg/dL', value: 230 },
              { text: '240 mg/dL', value: 240 },
              { text: '250 mg/dL', value: 250 },
            ],
          },
        },
        // Limit hyper overcorrection
        {
          id: 'indicator.glycemic-limits.limit-hyper-overcorrection',
          displayText:
            'indicator.glycemic-limits.limit-hyper-overcorrection.display',
          configText:
            'indicator.glycemic-limits.limit-hyper-overcorrection.config',
          informationText: [],
          consts: {
            limitHyperOvercorrection: [
              { text: '120 mg/dL', value: 120 },
              { text: '125 mg/dL', value: 125 },
              { text: '130 mg/dL', value: 130 },
              { text: '135 mg/dL', value: 135 },
              { text: '140 mg/dL', value: 140 },
              { text: '145 mg/dL', value: 145 },
              { text: '150 mg/dL', value: 150 },
              { text: '155 mg/dL', value: 155 },
              { text: '160 mg/dL', value: 160 },
              { text: '170 mg/dL', value: 170 },
              { text: '180 mg/dL', value: 180 },
              { text: '190 mg/dL', value: 190 },
              { text: '200 mg/dL', value: 200 },
              { text: '210 mg/dL', value: 210 },
              { text: '220 mg/dL', value: 220 },
              { text: '230 mg/dL', value: 230 },
              { text: '240 mg/dL', value: 240 },
              { text: '250 mg/dL', value: 250 },
            ],
          },
        },
      ],
      underlyingCategory: true,
    },
    // Variability
    {
      id: 'indicator-category.variability',
      patterns: [
        {
          id: 'indicator.variability.standard-deviation',
          displayText: 'indicator.variability.standard-deviation.display',
          configText: 'indicator.variability.standard-deviation.config',
          informationText: [],
          consts: {
            absoluteThreshold: [
              { text: '30 mg/dL', value: 30 },
              { text: '35 mg/dL', value: 35 },
              { text: '40 mg/dL', value: 40 },
              { text: '45 mg/dL', value: 45 },
              { text: '50 mg/dL', value: 50 },
              { text: '55 mg/dL', value: 55 },
              { text: '60 mg/dL', value: 60 },
              { text: '65 mg/dL', value: 65 },
              { text: '70 mg/dL', value: 70 },
              { text: '75 mg/dL', value: 75 },
              { text: '80 mg/dL', value: 80 },
              { text: '85 mg/dL', value: 85 },
              { text: '90 mg/dL', value: 90 },
              { text: '95 mg/dL', value: 95 },
              { text: '100 mg/dL', value: 100 },
            ],
            andOr: [{ text: 'and', value: 'AND' }, { text: 'or', value: 'OR' }],
          },
        },
      ],
    },
    // Hypoglycemia
    {
      id: 'indicator-category.hypoglycemia',
      patterns: [
        {
          id: 'indicator.hypoglycemia.trend',
          displayText: 'indicator.hypoglycemia.trend.display',
          configText: 'indicator.hypoglycemia.trend.config',
          informationText: [],
        },
        {
          id: 'indicator.hypoglycemia.overcorrection',
          displayText: 'indicator.hypoglycemia.overcorrection.display',
          configText: 'indicator.hypoglycemia.overcorrection.config',
          informationText: [],
        },
        {
          id: 'indicator.hypoglycemia.time-blocks',
          displayText: 'indicator.hypoglycemia.time-blocks.display',
          configText: 'indicator.hypoglycemia.time-blocks.config',
          informationText: [],
        },
        {
          id: 'indicator.hypoglycemia.repetition-days',
          displayText: 'indicator.hypoglycemia.repetition-days.display',
          configText: 'indicator.hypoglycemia.repetition-days.config',
          informationText: [],
          consts: {
            hypoglycemicLimit: [
              { text: '50 mg/dL', value: 50 },
              { text: '55 mg/dL', value: 55 },
              { text: '60 mg/dL', value: 60 },
              { text: '65 mg/dL', value: 65 },
              { text: '70 mg/dL', value: 70 },
              { text: '75 mg/dL', value: 75 },
              { text: '80 mg/dL', value: 80 },
              { text: '85 mg/dL', value: 85 },
              { text: '90 mg/dL', value: 90 },
            ],
          },
        },
        {
          id: 'indicator.hypoglycemia.cartridge',
          displayText: 'indicator.hypoglycemia.cartridge.display',
          configText: 'indicator.hypoglycemia.cartridge.config',
          informationText: [],
        },
      ],
    },
    // Hyperglycemia
    {
      id: 'indicator-category.hyperglycemia',
      patterns: [
        {
          id: 'indicator.hyperglycemia.trend',
          displayText: 'indicator.hyperglycemia.trend.display',
          configText: 'indicator.hyperglycemia.trend.config',
          informationText: [],
        },
        {
          id: 'indicator.hyperglycemia.overcorrection',
          displayText: 'indicator.hyperglycemia.overcorrection.display',
          configText: 'indicator.hyperglycemia.overcorrection.config',
          informationText: [],
        },
        {
          id: 'indicator.hyperglycemia.time-blocks',
          displayText: 'indicator.hyperglycemia.time-blocks.display',
          configText: 'indicator.hyperglycemia.time-blocks.config',
          informationText: [],
        },
        {
          id: 'indicator.hyperglycemia.repetition-days',
          displayText: 'indicator.hyperglycemia.repetition-days.display',
          configText: 'indicator.hyperglycemia.repetition-days.config',
          informationText: [],
          consts: {
            hyperglycemicLimit: [
              { text: '120 mg/dL', value: 120 },
              { text: '125 mg/dL', value: 125 },
              { text: '130 mg/dL', value: 130 },
              { text: '135 mg/dL', value: 135 },
              { text: '140 mg/dL', value: 140 },
              { text: '145 mg/dL', value: 145 },
              { text: '150 mg/dL', value: 150 },
            ],
          },
        },
        {
          id: 'indicator.hyperglycemia.cartridge',
          displayText: 'indicator.hyperglycemia.cartridge.display',
          configText: 'indicator.hyperglycemia.cartridge.config',
          informationText: [],
        },
        {
          id: 'indicator.hyperglycemia.bolus',
          displayText: 'indicator.hyperglycemia.bolus.display',
          configText: 'indicator.hyperglycemia.bolus.config',
          informationText: [],
        },
      ],
    },
  ],
};

export const translationText = {
  // Measurements for Analysis
  'indicator-category.measurements-for-analysis':
    'Minimum no. of tests to perform analysis',

  'indicator.measurements-for-analysis.variability': 'Glycemic variability',

  'indicator.measurements-for-analysis.variability.display':
    '{{min:number}} tests in 4 weeks',

  'indicator.measurements-for-analysis.variability.config':
    '{{min:number}} tests in 4 weeks',

  'indicator.measurements-for-analysis.general': 'General',

  'indicator.measurements-for-analysis.general.display':
    '{{min:number}} tests in 4 weeks',

  'indicator.measurements-for-analysis.general.config':
    '{{min:number}} tests in 4 weeks',

  'indicator.measurements-for-analysis.preprandial': 'Preprandial block',

  'indicator.measurements-for-analysis.preprandial.display':
    '{{min:number}} tests in 4 weeks',

  'indicator.measurements-for-analysis.preprandial.config':
    '{{min:number}} tests in 4 weeks',

  'indicator.measurements-for-analysis.postprandial': 'Postprandial block',

  'indicator.measurements-for-analysis.postprandial.display':
    '{{min:number}} tests in 4 weeks',

  'indicator.measurements-for-analysis.postprandial.config':
    '{{min:number}} tests in 4 weeks',

  'indicator.measurements-for-analysis.bedtime': 'Bedtime',

  'indicator.measurements-for-analysis.bedtime.display':
    '{{min:number}} tests in 4 weeks',

  'indicator.measurements-for-analysis.bedtime.config':
    '{{min:number}} tests in 4 weeks',

  // Glycemic Limits
  'indicator-category.glycemic-limits': 'Glycemic Limits',

  'indicator.glycemic-limits.hypo-limit': 'Hypo Limit',

  'indicator.glycemic-limits.hypo-limit.display': '{{hypoLimit:select}}',

  'indicator.glycemic-limits.hypo-limit.config': '{{hypoLimit:select}}',

  'indicator.glycemic-limits.hyper-limit': 'Hyper Limit',

  'indicator.glycemic-limits.hyper-limit.display': '{{hyperLimit:select}}',

  'indicator.glycemic-limits.hyper-limit.config': '{{hyperLimit:select}}',

  'indicator.glycemic-limits.pre-hyper-limit': 'Pre Hyper Limit',

  'indicator.glycemic-limits.pre-hyper-limit.display':
    '{{preHyperLimit:select}}',

  'indicator.glycemic-limits.pre-hyper-limit.config':
    '{{preHyperLimit:select}}',

  'indicator.glycemic-limits.post-hyper-limit': 'Post Hyper limit',

  'indicator.glycemic-limits.post-hyper-limit.display':
    '{{postHyperLimit:select}}',

  'indicator.glycemic-limits.post-hyper-limit.config':
    '{{postHyperLimit:select}}',

  'indicator.glycemic-limits.limit-hyper-overcorrection':
    'Overcorrection hyper limit',

  'indicator.glycemic-limits.limit-hyper-overcorrection.display':
    '{{limitHyperOvercorrection:select}}',

  'indicator.glycemic-limits.limit-hyper-overcorrection.config':
    '{{limitHyperOvercorrection:select}}',

  // Variability
  'indicator-category.variability': 'Variability Configurations',

  'indicator.variability.standard-deviation': 'Standard Deviation',

  'indicator.variability.standard-deviation.display':
    'Above {{absoluteThreshold:select}} {{andOr:radio}} above {{averageThreshold:number}} % of mean glycemia',

  'indicator.variability.standard-deviation.config':
    'Above {{absoluteThreshold:select}} {{andOr:radio}} above {{averageThreshold:number}} % of mean glycemia',

  // Hyperglycemia
  'indicator-category.hyperglycemia': 'Hyperglycemia',

  'indicator.hyperglycemia.trend': 'Hyperglycemia Trend',

  'indicator.hyperglycemia.trend.display':
    'More than {{hyperglycemiaDaily:number}} hyperglycemias a day during {{consecutiveDays:number}}' +
    ' consecutive days.',

  'indicator.hyperglycemia.trend.config':
    'More than {{hyperglycemiaDaily:number}} hyperglycemias a day during {{consecutiveDays:number}}' +
    ' consecutive days.',

  'indicator.hyperglycemia.overcorrection': 'Overcorrection Hyperglycemia',

  'indicator.hyperglycemia.overcorrection.display':
    'More than {{hyperPercentage:number}} % of hyperglycemias with a previous hypoglycemia within ' +
    'a window of {{windowInterval:number}} hours ',

  'indicator.hyperglycemia.overcorrection.config':
    'More than {{hyperPercentage:number}} % of hyperglycemias with a previous hypoglycemia within ' +
    'a window of {{windowInterval:number}} hours ',

  'indicator.hyperglycemia.time-blocks': 'Hyperglycemia in Time Block',

  'indicator.hyperglycemia.time-blocks.display':
    'Within a time interval of {{dayInterval:number}} days there are more than {{eventCount:number}} ' +
    'hyperglycemic events in the same time block.',

  'indicator.hyperglycemia.time-blocks.config':
    'Within a time interval of {{dayInterval:number}} days there are more than {{eventCount:number}} ' +
    'hyperglycemic events in the same time block.',

  'indicator.hyperglycemia.repetition-days':
    'Hyperglycemia by repetition in days',

  'indicator.hyperglycemia.repetition-days.display':
    'More than {{eventCount:number}} glycemic measurements above {{hyperglycemicLimit:select}} ' +
    'with repeat pattern every {{dayInterval:number}} days.',

  'indicator.hyperglycemia.repetition-days.config':
    'More than {{eventCount:number}} glycemic measurements above {{hyperglycemicLimit:select}} ' +
    'with repeat pattern every {{dayInterval:number}} days.',

  'indicator.hyperglycemia.cartridge': 'Cartridge change hyperglycemia',

  'indicator.hyperglycemia.cartridge.display':
    'When there is a delay in the cartridge change of more than {{changeDelayDays:number}} ' +
    'days, the % of hyperglycemias is greater than {{hyperPercentage:number}} %',

  'indicator.hyperglycemia.cartridge.config':
    'When there is a delay in the cartridge change of more than {{changeDelayDays:number}} ' +
    'days, the % of hyperglycemias is greater than {{hyperPercentage:number}} %',

  'indicator.hyperglycemia.bolus': 'Hyperglycemia due to missed intake bolus',

  'indicator.hyperglycemia.bolus.display':
    'In an interval of {{weeksInterval:number}} weeks there are more than {{bolusOmission:number}}' +
    ' hyperglycemias related to a bolus omission',

  'indicator.hyperglycemia.bolus.config':
    'In an interval of {{weeksInterval:number}} weeks there are more than {{bolusOmission:number}}' +
    ' hyperglycemias related to a bolus omission',

  // Hypoglycemia
  'indicator-category.hypoglycemia': 'Hypoglycemia',

  'indicator.hypoglycemia.trend': 'Hypoglycemia Trend',

  'indicator.hypoglycemia.trend.display':
    'More than {{hypoglycemiaDaily:number}} hypoglycemias per day during {{consecutiveDays:number}} ' +
    'consecutive days',

  'indicator.hypoglycemia.trend.config':
    'More than {{hypoglycemiaDaily:number}} hypoglycemias per day during {{consecutiveDays:number}} ' +
    'consecutive days',

  'indicator.hypoglycemia.overcorrection': 'Overcorrection Hypoglycemia ',

  'indicator.hypoglycemia.overcorrection.display':
    'More than {{hyposPercent:number}} % of hypos with a previous hyperglycemia' +
    ' within a window of {{timeDifference:number}} hours',

  'indicator.hypoglycemia.overcorrection.config':
    'More than {{hyposPercent:number}} % of hypos with a previous hyperglycemia' +
    ' within a window of {{timeDifference:number}} hours',

  'indicator.hypoglycemia.time-blocks': 'Hypoglycemia in Time Blocks',

  'indicator.hypoglycemia.time-blocks.display':
    'Within a time interval of {{dayInterval:number}} days there are more than {{eventCount:number}} ' +
    'hypoglycemic events in the same time block.',

  'indicator.hypoglycemia.time-blocks.config':
    'Within a time interval of {{dayInterval:number}} days there are more than {{eventCount:number}} ' +
    'hypoglycemic events in the same time block.',

  'indicator.hypoglycemia.repetition-days':
    'Hypoglycemia by repetition in days',

  'indicator.hypoglycemia.repetition-days.display':
    'More than {{eventCount:number}} glycemic measurements above {{hypoglycemicLimit:select}} ' +
    'with repeat pattern every {{dayInterval:number}} days.',

  'indicator.hypoglycemia.repetition-days.config':
    'More than {{eventCount:number}} glycemic measurements above {{hypoglycemicLimit:select}} ' +
    'with repeat pattern every {{dayInterval:number}} days.',

  'indicator.hypoglycemia.cartridge': 'Cartridge Change Hypoglycemia',

  'indicator.hypoglycemia.cartridge.display':
    'In more than {{cartridgeChanges:number}} % of cartridge changes there is a hypoglycemia in the ' +
    'subsequent {{laterHours:number}} later hours',

  'indicator.hypoglycemia.cartridge.config':
    'In more than {{cartridgeChanges:number}} % of cartridge changes there is a hypoglycemia in the ' +
    'subsequent {{laterHours:number}} later hours',
};

export const configState = {
  // Measurements for Analysis
  'indicator-category.measurements-for-analysis': {
    enabled: true,
  },

  'indicator.measurements-for-analysis.variability': {
    min: 135,
  },

  'indicator.measurements-for-analysis.general': {
    min: 72,
  },

  'indicator.measurements-for-analysis.preprandial': {
    min: 24,
  },

  'indicator.measurements-for-analysis.postprandial': {
    min: 12,
  },

  'indicator.measurements-for-analysis.bedtime': {
    min: 10,
  },

  // Glycemic Limits
  'indicator-category.glycemic-limits': {
    enabled: true,
  },
  'indicator.glycemic-limits.hypo-limit': {
    hypoLimit: 70,
  },

  'indicator.glycemic-limits.hyper-limit': {
    hyperLimit: 160,
  },

  'indicator.glycemic-limits.pre-hyper-limit': {
    preHyperLimit: 140,
  },

  'indicator.glycemic-limits.post-hyper-limit': {
    postHyperLimit: 180,
  },

  'indicator.glycemic-limits.limit-hyper-overcorrection': {
    limitHyperOvercorrection: 200,
  },
  // Variability
  'indicator-category.variability': {
    enabled: true,
  },

  'indicator.variability.standard-deviation': {
    enabled: true,
    absoluteThreshold: 30,
    averageThreshold: 33,
    andOr: 'AND',
  },

  // Hyperglycemia
  'indicator-category.hyperglycemia': {
    enabled: true,
  },
  'indicator.hyperglycemia.trend': {
    enabled: true,
    hyperglycemiaDaily: 2,
    consecutiveDays: 7,
  },

  'indicator.hyperglycemia.overcorrection': {
    enabled: true,
    hyperPercentage: 25,
    windowInterval: 3,
  },

  'indicator.hyperglycemia.time-blocks': {
    enabled: true,
    dayInterval: 3,
    eventCount: 7,
  },
  'indicator.hyperglycemia.repetition-days': {
    enabled: true,
    dayInterval: 3,
    eventCount: 1,
    hyperglycemicLimit: 120,
  },

  'indicator.hyperglycemia.cartridge': {
    enabled: true,
    changeDelayDays: 1,
    hyperPercentage: 50,
  },

  'indicator.hyperglycemia.bolus': {
    enabled: true,
    weeksInterval: 4,
    bolusOmission: 5,
  },

  // Hypoglycemia
  'indicator-category.hypoglycemia': {
    enabled: true,
  },
  'indicator.hypoglycemia.trend': {
    enabled: true,
    hypoglycemiaDaily: 1,
    consecutiveDays: 7,
  },

  'indicator.hypoglycemia.overcorrection': {
    enabled: true,
    hyposPercent: 25,
    timeDifference: 3,
  },

  'indicator.hypoglycemia.time-blocks': {
    enabled: true,
    dayInterval: 3,
    eventCount: 7,
  },
  'indicator.hypoglycemia.repetition-days': {
    enabled: true,
    dayInterval: 3,
    eventCount: 1,
    hypoglycemicLimit: 50,
  },

  'indicator.hypoglycemia.cartridge': {
    enabled: true,
    cartridgeChanges: 80,
    laterHours: 6,
  },
};

const makeNumberValidation = ({
  min,
  max,
  required = true,
}): NumberValidation & { required: boolean } => ({
  min,
  max,
  required,
  type: 'number',
});

const makeSelectValidation = ({
  required = true,
}): SelectValidation & { required: boolean } => ({
  required,
  type: 'select',
});

export const validationConfig: ValidationConfig = {
  // Measurements for analysis
  'indicator.measurements-for-analysis.variability': {
    min: makeNumberValidation({ min: 60, max: 270 }),
  },

  'indicator.measurements-for-analysis.general': {
    min: makeNumberValidation({ min: 30, max: 120 }),
  },

  'indicator.measurements-for-analysis.preprandial': {
    min: makeNumberValidation({ min: 10, max: 40 }),
  },

  'indicator.measurements-for-analysis.postprandial': {
    min: makeNumberValidation({ min: 5, max: 40 }),
  },

  'indicator.measurements-for-analysis.bedtime': {
    min: makeNumberValidation({ min: 5, max: 30 }),
  },

  // Glycemic Limits
  'indicator.glycemic-limits.hypo-limit': {
    hypoLimit: makeSelectValidation({}),
  },

  'indicator.glycemic-limits.hyper-limit': {
    hyperLimit: makeSelectValidation({}),
  },

  'indicator.glycemic-limits.pre-hyper-limit': {
    preHyperLimit: makeSelectValidation({}),
  },

  'indicator.glycemic-limits.post-hyper-limit': {
    postHyperLimit: makeSelectValidation({}),
  },
  'indicator.glycemic-limits.limit-hyper-overcorrection': {
    limitHyperOvercorrection: makeSelectValidation({}),
  },

  // Variability
  'indicator.variability.standard-deviation': {
    absoluteThreshold: makeSelectValidation({}),
    averageThreshold: makeNumberValidation({ min: 20, max: 50 }),
  },

  // Hyperglycemia
  'indicator.hyperglycemia.trend': {
    hyperglycemiaDaily: makeNumberValidation({ min: 1, max: 10 }),
    consecutiveDays: makeNumberValidation({ min: 3, max: 10 }),
  },

  'indicator.hyperglycemia.overcorrection': {
    hyperPercentage: makeNumberValidation({ min: 10, max: 50 }),
    windowInterval: makeNumberValidation({ min: 2, max: 4 }),
  },
  'indicator.hyperglycemia.time-blocks': {
    dayInterval: makeNumberValidation({ min: 3, max: 10 }),
    eventCount: makeNumberValidation({ min: 1, max: 10 }),
  },

  'indicator.hyperglycemia.repetition-days': {
    eventCount: makeNumberValidation({ min: 1, max: 10 }),
    dayInterval: makeNumberValidation({ min: 3, max: 10 }),
    hyperglycemicLimit: makeSelectValidation({}),
  },

  'indicator.hyperglycemia.cartridge': {
    changeDelayDays: makeNumberValidation({ min: 1, max: 5 }),
    hyperPercentage: makeNumberValidation({ min: 25, max: 75 }),
  },

  'indicator.hyperglycemia.bolus': {
    weeksInterval: makeNumberValidation({ min: 1, max: 8 }),
    bolusOmission: makeNumberValidation({ min: 1, max: 10 }),
  },

  // Hypoglycemia
  'indicator.hypoglycemia.trend': {
    hypoglycemiaDaily: makeNumberValidation({ min: 1, max: 5 }),
    consecutiveDays: makeNumberValidation({ min: 3, max: 10 }),
  },

  'indicator.hypoglycemia.overcorrection': {
    hyposPercent: makeNumberValidation({ min: 10, max: 50 }),
    timeDifference: makeNumberValidation({ min: 2, max: 4 }),
  },

  'indicator.hypoglycemia.time-blocks': {
    dayInterval: makeNumberValidation({ min: 3, max: 10 }),
    eventCount: makeNumberValidation({ min: 1, max: 10 }),
  },

  'indicator.hypoglycemia.repetition-days': {
    eventCount: makeNumberValidation({ min: 1, max: 10 }),
    dayInterval: makeNumberValidation({ min: 3, max: 10 }),
    hypoglycemicLimit: makeSelectValidation({}),
  },

  'indicator.hypoglycemia.cartridge': {
    cartridgeChanges: makeNumberValidation({ min: 50, max: 90 }),
    laterHours: makeNumberValidation({ min: 1, max: 12 }),
  },
};
