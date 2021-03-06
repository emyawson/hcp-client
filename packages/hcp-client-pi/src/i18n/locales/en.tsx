export const en = {
  translations: {
    advancedIndicators: { tabs: { warnings: 'warnings', compare: 'compare' } },
    dashboard: {
      notificationCardTitle: 'Notifications',
      distributionCardTitle: 'Distribution',
      hypoCardTitle: 'Hypoglycemia',
      bgCardTitle: 'BG Status',
      bgStatisticsCardTitle: 'BG Statistics',
      deviceCardTitle: 'Devices',
      statusCardTitle: 'Status',
      graphs: { dayGraphTitle: 'Day Graph', dateRangeTitle: 'Date Range' },
      patientCardPopover: {
        editPatient: 'Edit Patient',
        timePeriods: 'Time Periods',
        listTreatments: 'List Treatments',
        graphicSettings: 'Target Range',
        listDevices: 'List Devices',
        dataDownloadAssignment: 'Upload Data',
        deactivatePatient: 'Deactivate Patient',
      },
      distributionCard: {
        statsTable: {
          targetRange: 'Target Range',
          above: 'above',
          within: 'within',
          below: 'below',
          hypoglycaemia: 'Hypoglycemia',
        },
      },
      hypoglycaemiaCard: {
        hypoglycaemia: 'Hypoglycemia',
        hypoLimit: 'hypo limit',
        hypoAtNight: 'Hypos at Night',
      },
      statusCard: {
        hypoRisk: 'Hypo Risk',
        variability: 'Variability',
        meanBloodGlucose: 'Mean blood glucose',
        targetRange: 'target range',
        hypoLimit: 'Hypo limit',
        above: 'above',
        below: 'below',
        within: 'within',
        low: 'Low',
        moderate: 'Moderate',
        medium: 'Medium',
        high: 'High',
      },
    },
    menu: {
      title: 'MENU',
      patients: 'Patients',
      logoIcon: 'logo',
      homeIcon: 'home',
      patientsIcon: 'patients',
      patientDashboardIcon: 'patient dashboard',
      stripsStockIcon: 'stock',
      infoIcon: 'info',
      helpIcon: 'help',
      dtcIcon: 'DTC',
    },
    patientSearch: {
      DIABETES_TYPE1: 'Type 1',
      DIABETES_TYPE2: 'Type 2',
      DIABETES_GESTATIONAL: 'Gestational',
      title: 'Find Patient',
      table: {
        name: 'Patient Name',
        id: 'ID Number',
        birthDate: 'Date of Birth',
        diabetesType: 'Diabetes Type',
        treatment: 'Treatment',
        userInfo: 'View Patient Profile',
      },
      noResults: 'No results found',
      addPatient: 'Add new Patient',
    },
    devices: {
      allDevicesTitle: 'All Devices',
      deviceDetailsTitle: 'Device',
      deviceDetailsNameTitle: 'Name',
      deviceDetailsSerialTitle: 'Serial Number',
      deviceLastReadingTitle: 'Last Reading',
      deviceDataTitleTests: 'Tests',
      deviceDataTitleAdditionalInfo: 'Additional Information',
      deviceDateTimeSetTitle: 'Date / Time Set',
      tests: {
        numberOfTestsTitle: 'Number of Tests',
        testPerDayTitle: 'Test per Day',
      },
      meanBloodGlucose: {
        meanBloodGlucoseTitle: 'Mean blood glucose',
        standardDevTitle: 'Standard Deviation (SD)',
        highestTitle: 'highest result',
        lowestTitle: 'lowest result',
      },
      meanBloodGlucoseBeforeMeals: {
        meanBloodGlucoseBeforeMealsTitle: 'Mean BG Before Meals',
        meanBloodGlucoseBeforeBreakfastTitle: 'Breakfast',
        meanBloodGlucoseBeforeLunchTitle: 'Lunch',
        meanBloodGlucoseBeforeDinnerTitle: 'Dinner',
      },
      targetRange: {
        targetRangeTitle: 'TARGET RANGE',
        aboveTitle: 'above',
        withinTitle: 'within',
        belowTitle: 'below',
      },
      hypos: {
        hypoTitle: 'Hypos',
        hypoLimitTitle: 'Hypo limit',
        hypoglycaemiaTitle: 'Hypoglycemia',
      },
      bloodGlucoseIndex: {
        bloodGlucoseIndexTitle: 'BLOOD GLUCOSE INDEX',
        hbgiTitle: 'HBGI',
        lbgiTitle: 'LBGI',
      },
      additionalInfo: { additionalInfoTitle: 'Additional Information' },
      bolus: {
        bolusTitle: 'Bolus',
        numberOfBolusesTitle: 'Number of Boluses',
        standardBolusTitle: 'Standard Bolus',
        quickBolusTitle: 'Quick Bolus',
        extendedBolusTitle: 'Extended Bolus',
        multiwaveBolusTitle: 'Multiwave Bolus',
        highestResultTitle: 'Highest result',
        meanDoseTitle: 'Mean Dose',
        lowestResultTitle: 'Lowest result',
        bolusFrequencyTitle: 'Bolus Frequency',
        tbrIncreaseTitle: 'Temporary Basal Rate Increase',
        tbrDecreaseTitle: 'Temporary Basal Rate Decrease',
        basalRateChangeTitle: 'Basal Rate Change',
        basalRateChangesTitle: 'Basal Rate Changes',
        basalRateProfileSelectionTitle: 'Basal Rate Profile Selection',
        stopTitle: 'Stop',
      },
    },
    homeStripDelivery: {
      title: 'Home Strip Delivery',
      deliveryStatus: 'Delivery Status',
      deliveryConfiguration: 'Delivery Configuration',
    },
    stripDelivery: {
      title: 'Strip Delivery',
      titleExpanded: 'Delivery Status',
      unitsSmallStatusCard: 'UDS',
      unitsTubesSmallStatusCard: {
        singular: 'Strip Container',
        plural: 'Strip Containers',
      },
      patientStatusDeliverSmall: 'Strips to deliver',
      nextDeliveryDateSmall: 'Next delivery',
      patientStatusDeliver: 'Strips to deliver:',
      patientStatusDeliverWithAlert: 'Strips to deliver [?]:',
      patientStatusDoNotDeliver: 'Cannot deliver strips',
      lastCollectedDate: 'Last collected:',
      nextDeliveryDate: 'Next delivery:',
      statusFlagForced: 'FORCED',
      statusFlagTemporary: 'Temporary Guideline [?]',
      statusDetails: 'Status Details',
      stripsConsumed: 'Strips Consumed',
      deliverCta: 'Deliver Strips',
      createPrescription: 'Create Guideline',
      notifications: {
        deliveredWithAlert: 'Previous Traffic Light Status was Orange.',
        forceStatusToDeliver:
          'Change the Traffic Light Status to Green to deliver strips.',
        doNotDeliver:
          'Test strips cannot be delivered. The patient must see a healthcare professional.',
      },
      alerts: {
        title: 'Alerts',
        info: 'Status Information',
        hypoThreshold: 'Hypo threshold alerts',
        upperLimit: 'Upper limit alerts',
        lowerLimit: 'Lower limit alerts',
        percentageOfStripsConsumed: 'Strips Consumed',
        outOf: 'out of',
        infoDescription: {
          info: 'Info',
          green: 'Patient consultation complete. Deliver the strips.',
          orange:
            'The patient must see a healthcare professional to receive more strips.',
          red:
            'The patient has not met the required criteria. The patient must see a healthcare professional to receive more strips.',
          gray: 'The patient has not uploaded the data.',
        },
        loading: 'Loading patient alerts data...',
      },
      update: 'Update Status',
      forceStatus: {
        title: 'Force Status',
        instruction: 'Press add ???+??? to force a status',
        comment: 'Force status comments',
        submit: 'Force Status',
      },
      manualDelivery: {
        title: 'Extra Strips Delivered',
        tubes: 'Strip Containers',
        strips: 'Strips',
        manualDelivery: 'Manual Delivery',
        comment: 'Add a comment...',
      },
      lostStrips: {
        title: 'Lost Strips',
        numberOfLostStrips: 'Strips',
        recalculate: 'Recalculate Strips',
      },
      empty: {
        stripsToDeliver: 'No data on file',
        nextDeliveryDate: 'Not scheduled',
        lastCollectedDate: 'Date not found',
        prescription: 'Patient data not found. ',
        stripsConsumed: 'No Data on File',
        prescriptionCta: 'Add a guideline here.',
      },
      loading: 'Loading patient delivery data...',
      comments: {
        forceStatus: {
          title: 'Force Status',
          titleExpanded: 'Force Status Comments',
        },
        adminComments: {
          title: 'Administrative Comments',
          placeholder: 'Add your comment here...',
        },
      },
    },
    profileDropdown: {
      manageYourProfile: 'Manage your Profile',
      signOut: 'LOG OUT',
    },
    profileDropdownPopover: {
      updateDetails: 'Update Details',
      changePassword: 'Change Password',
      changeSecurityQuestion: 'Change Security Question',
      notificationSettings: 'Notification Settings',
      graphSettings: 'graph settings',
      addProfessional: 'Add a Professional',
      defaultGraphicSettings: 'Default Target Range',
    },
    userDropdown: { managePatientProfile: 'Patient Profile' },
    searchBar: { name: 'Name', patientId: 'Patient ID', search: 'Search' },
    modals: {
      support: {
        title: 'Customer Support',
        accept: 'Accept',
        forgotPassword: {
          title: 'Contact Customer Support',
          body:
            'Please contact customer support at (+34) 900 210 341 to request a new password.',
        },
      },
      disclaimer: {
        title: 'Additional Information',
        testFrequency: {
          title: 'Test Frequency',
          desc: `The blood glucose status can only be displayed if the minimum number of 2 tests per day is
            achieved and the tests have been sufficiently spaced throughout the day. In addition 28 test results
            must be available for the selected period. The ability to edit this value is not available in this current version of the application.`,
        },
        hypoRisk: {
          title: 'Hypo Risk',
          desc: `The LBGI is used to calculate the hypo risk. It represents the frequency and therefore the risk of blood glucose results being too
            low. The aim is to have the lowest values possible and the thresholds are preset:`,
          greenInfo: 'From 0 to 1.0 low hypo risk (Green)',
          orangeInfo: 'Between 1.1 and 2.4 moderate hypo risk (Orange)',
          redInfo: 'Above 2.5 high hypo risk (Red)',
        },
        variability: {
          title: 'Variability',
          desc: `The variability is calculated from the standard deviation (SD) or variance of analysed results. The thresholds for the variability
            have been defined as relative SD (related to the mean blood glucose):`,
          greenInfo: 'From 0% to 32.9% of mean BG - low variability (Green)',
          orangeInfo:
            'Between 33% and 49.9% of mean BG - moderate variability (Orange)',
          redInfo: 'Above 50% of mean BG - high variability (Red)',
          footerDesc:
            'The ability to edit these thresholds is not available in this current version of the application.',
        },
        meanBloodGlucose: {
          title: 'Mean Blood Glucose',
          desc: `The mean blood glucose is calculated from the arithmetic mean of all blood glucose values. The status displayed is determined by the
            set thresholds under ???Graphs Settings???. These thresholds are also used when displaying the target range and hypo limit in the glucose graphs
            and  reports.`,
        },
        hiLoControlResult: {
          title: 'HI/LO Control Results',
          desc:
            'The ability to display HI/LO control result data is not available in this current version of the application.',
        },
        flags: {
          title: 'Flags',
          desc: `The ability to edit and add flags (e.g. Fasting, Stress, Illness) onto the logbook is not available in this
            current version of the application.  Only Meal-related flags associated with blood glucose measurements will be displayed.`,
        },
        timeAdjustments: {
          title: 'Time Adjustments and Events',
          desc: `Current version of the application will not display any time adjustments or events because of daylight savings, travelling
            between time zones or time adjustment made on any medical devices.`,
        },
        standardBolus: {
          title: 'Standard Bolus',
          desc:
            'Standard Bolus includes both Standard and Quick Bolus in this current version of the application.',
        },
        lastCollectedDate: 'Last Updated: {{date}}',
      },
      patientStatusNotification: {
        title: 'Patient Status Notification',
        acknowledgePatientStatus: 'Acknowledge Patient Status',
      },
      sendPatientStatus: {
        title: 'Patient Status',
        send: 'Send Status to Doctor',
      },
    },
    dtcModal: {
      headerMessage: 'Download DTC software',
      message: 'Select your OS:',
      windows: 'Windows',
      macOs: 'macOS',
    },
    bloodGlucoseOverview: {
      bgOverviewLongTermView: 'BG Overview - Long Term View',
      bgStatus: 'BG Status',
      insufficientData: 'Insufficient amount of data',
      bgStatistics: 'BG Statistics',
      high: 'High',
      hyper: 'Above',
      hypo: 'Below',
      hypoglycaemia: 'Hypoglycemia',
      hypoRisk: 'Hypo Risk',
      inRange: 'In Range',
      low: 'Low',
      meanBloodGlucose: 'Mean Blood Glucose',
      medium: 'Medium',
      mgPerDL: 'mg/dL',
      na: 'N/A',
      testsPerDay: 'Tests per Day',
      variability: 'Variability',
      intervals: {
        uploadDate: 'Upload Date',
        monthly: 'Monthly Intervals',
        quarterly: 'Quarterly Intervals',
        weekly: 'Weekly Intervals',
      },
    },
    bloodGlucoseStats: {
      title: 'Detailed Patient Health Information',
      titleNav: 'Statistics',
      numberOfTestsTitle: 'Number of Tests',
      testsPerDayTitle: 'Tests per Day',
      standardDevTitle: 'Standard Deviation',
      meanBloodGlucoseTitle: 'Mean blood glucose',
      bloodGlucoseGeneralStatsTitle: 'General Statistics',
    },
    graphDetails: {
      mgPerDL: 'mg/dL',
      legend: {
        legend: 'Legend',
        bloodGlucose: 'blood glucose',
        meanBloodGlucose: 'mean blood glucose',
        meanBloodGlucoseSD: 'Mean BG / SD',
        meanBloodGlucoseMeanSD: 'Mean BG / Mean SD',
        oneSdTwoSd: '1 SD / 2 SD',
        hypoglycaemia: 'hypoglycemia',
        hypoSymptoms: 'hypo symptoms',
        hypoLimit: 'Hypo limit',
        graphVisuals: 'GRAPH VISUALS',
        targetRange: 'TARGET RANGE',
        aboveTargetRange: 'above target range',
        belowTargetRange: 'below target range',
        targetRangeSectionHeader: 'TARGET RANGE',
        connectingLines: 'connecting lines',
        results: 'RESULTS',
        lowestResult: 'lowest result',
        highestResult: 'highest result',
        standardBolus: 'Standard bolus',
        quickBolus: 'Quick bolus',
        extendedBolus: 'Extended bolus',
        multiwaveBolus: 'Multiwave bolus',
        bolusAdvice: 'Bolus advice',
        modifiedBolus: 'Modified bolus',
        basalRateBolus: 'Basal rate + bolus',
      },
      statistics: {
        statistics: 'Statistics',
        tests: {
          tests: 'TESTS',
          numberOfTests: 'Number of tests',
          testsPerDay: 'Tests per Day',
        },
        indexes: { indexes: 'BLOOD GLUCOSE INDEX', hbgi: 'HBGI', lbgi: 'LBGI' },
        bloodGlucose: {
          bloodGlucose: 'BLOOD GLUCOSE',
          glucoseLevel: 'glucose level',
          standardDeviation: 'standard deviation',
          testsPerDay: 'tests per day',
          meanBloodGlucose: 'Mean Blood Glucose',
          meanBloodGlucoseBeforeMeal: 'Mean BG Before Meal',
          meanBloodGlucoseAfterMeal: 'Mean BG After Meal',
          standardDeviationSD: 'Standard Deviation (SD)',
          stdDevMeanRatio: 'SD / Mean BG',
        },
        targetRanges: {
          above: 'Above',
          below: 'Below',
          hypos: 'hypos',
          targetRange: 'TARGET RANGE',
          within: 'Within',
        },
      },
    },
    graphs: {
      detailGraph: {
        bgAfterMeal: 'BG after meal',
        bgBeforeMeal: 'BG before meal',
        bloodGlucose: 'Blood glucose',
        carbohydratesInG: 'Carbohydrates (g)',
        connectingLines: 'Connecting lines',
        gridLines: 'Grid lines',
        hypoglycaemia: 'Hypoglycemia',
        hypoLimit: 'hypo limit',
        hypoSymptoms: 'Hypo symptoms',
        mealTime: 'Meal Time',
        meanBloodGlucose: 'Mean Blood Glucose',
        targetRange: 'Target Range',
        time: 'Time',
        toolTip: { bloodGlucose: 'Blood Glucose' },
      },
      loading: 'Loading patient graphs...',
      missingData: 'There are no measurements between this range.',
      noAvailableData: 'No Data Available.',
      logbook: {
        date: 'Date',
        mgPerDL: 'mg/dL',
        g: 'g',
        u: 'U',
        loading: 'Loading logbook data...',
      },
      logbookDiary: {
        bloodGlucose: 'Blood Glucose',
        date: 'Date',
        carbohydrates: 'Carbohydrates',
        insulin: 'Insulin',
        unitSymbol: 'U',
        basalRateProfile: 'Basal Rate Profile',
        pump: 'Pump',
        notes: 'Notes',
        mgPerDL: 'mg/dL',
        time: 'Time',
        diary: 'Diary',
        grams: 'g',
      },
      insulinPump: {
        title: 'Insulin Pump - Bolus List',
        date: 'Date',
        time: 'Time',
        u: 'U',
        type: 'Type',
        comments: 'Comments',
        daysTotal: `Day's Total`,
        loading: 'Loading insulin pump data...',
        subtitle:
          'Learn about the insulin Pump List - Bolus List. Here you can view the different bolus list.',
      },
      insulin: {
        title: 'Basal Rate',
        basalBolusTitle: 'Basal / Bolus',
        basalRateChange: 'BASAL RATE CHANGE',
        bolus: 'Bolus',
        basalInsulin: 'Basal Insulin',
        totalInsulin: 'Total Insulin',
        acceptedBolus: 'Accepted Bolus',
        modifiedBolus: 'Modified Bolus',
        withoutCalculator: 'No Bolus Advice',
        measurements: 'Measurements',
        bolusAdvice: 'Bolus Advice',
        bolusType: 'BOLUS TYPE',
        bolusViaRemoteControl: 'Bolus via remote control',
        categoryName: 'Category Name',
        day: 'Day',
        days: 'DAYS',
        extendedBolus: 'Extended Bolus',
        multiwaveBolus: 'Multiwave Bolus',
        percentSymbol: '%',
        profile: 'PROFILE',
        quickBolus: 'Quick Bolus',
        standardBolus: 'Standard Bolus',
        stop: 'Stop',
        tbrIncrease: 'TBR INCREASE',
        tbrDecrease: 'TBR DECREASE',
        loading: 'Loading insulin data...',
      },
      logbookStats: {
        date: 'DATE',
        bloodGlucose: 'BLOOD GLUCOSE',
        numOfTests: 'Number of tests',
        meanBG: 'Mean BG',
        standard: 'Standard',
        deviation: 'Deviation',
        hypos: 'Hypos',
        mgPerDL: 'mg/dL',
        carbohydrates: 'CARBOHYDRATES',
        g: 'g',
        insulinInAllCaps: 'INSULIN',
        insulin: 'Insulin',
        basal: 'Basal',
        basalSlash: 'Basal /',
        bolus: 'Bolus',
        numOf: 'Number of',
        boluses: 'Boluses',
        u: 'U',
      },
      logbookTitle: 'Logbook',
      logbookStatsTitle: 'Daily Statistics',
      metabolicTitle: 'Metabolic Rate',
      insulinPumpTitle: 'Insulin Pump',
      standardDayTitle: 'Standard Day',
      standardWeekTitle: 'Standard Week',
      trendGraph: {
        toolTip: {
          numberOfTests: 'Number of Tests',
          highestResult: 'Highest result',
          mean: 'Mean',
          lowestResult: 'Lowest result',
          standardDeviation: 'Standard Deviation',
        },
      },
      metabolicGraph: {
        labels: {
          stableHigh: 'Stable - High',
          stableLow: 'Stable - Low',
          unstableHigh: 'Unstable - High',
          unstableLow: 'Unstable - Low',
        },
        tooltip: {
          meanbg: 'MEAN BG',
          standardDeviation: 'SD',
          meanStandardDeviation: 'MEAN SD',
        },
      },
      axisLabels: {
        bloodGlucose: 'Blood Glucose',
        meanBloodGlucose: 'Mean Blood Glucose',
        standardDeviation: 'Standard Deviation',
        mgPerDL: 'mg/dL',
      },
      trendTitle: 'Trend',
      detailTitle: 'Details',
      iconTitles: {
        afterMeal: 'After Meal',
        arrow: 'Arrow',
        bedtime: 'Bedtime',
        beforeMeal: 'Before Meal',
        bell: 'Bell',
        bolusExtended: 'Extended Bolus',
        bolusMultiwave: 'Multiwave Bolus',
        bolusQuick: 'Quick Bolus',
        bolusStandard: 'Standard Bolus',
        flag: 'Flag',
        hypo: 'Hypo',
        hypoLimit: 'Hypo Limit',
        hypoSymptoms: 'Hypo Symptoms',
        lineGraph: 'Line Graph',
        meanBloodGlucose: 'Mean Blood Glucose',
        night: 'Night',
        pumpBasalRateChange: 'Basal Rate Change',
        pumpPause: 'Pause',
        pumpPowerDown: 'Power down',
        pumpPowerUp: 'Power up',
        pumpBasalRateProfileChange: 'Basal rate profile change',
        pumpRun: 'Run',
        pumpStop: 'Stop',
        pumpTbrDec: 'TBR decrease',
        pumpTbrEndDec: 'TBR end decrease',
        pumpTbrEndInc: 'TBR end increase',
        pumpTbrInc: 'TBR increase',
        targetRangeIcon: 'Target Range Icon',
        ce: 'Conformit?? Europ??enne',
        factory: 'Created at icon',
        help: 'Help',
      },
    },
    alerts: {
      title: 'Alerts',
      preIdealInterval: 'Pre-Ideal Interval',
      postIdealInterval: ' Post-Ideal Interval',
      noctIdealInterval: 'Nocturnal Ideal Interval',
      alertSettings: 'Alert Configurations',
      thresholdHypo: 'Hypo Threshold',
      thresholdUpper: 'Upper Limit',
      thresholdLower: 'Lower Limit',
      activateThreshold: 'Alert When Over',
      activateUnitHypo: 'Hypo Alerts',
      activateUnitUpper: 'Upper Limit Alerts',
      activateUnitLower: 'Lower Limit Alerts',
      saveAccessibilityLabel: 'Save Patient Alerts Data',
      save: 'Save Alerts',
      unavailable: 'Unavailable',
      defaultBannerText:
        'Alerts are based on the maximum number of alerts allowed between the delivery periods of the test strips to the patient. The alerts could consist of any variation of the different types of alerts you select.',
    },
    prescription: {
      title: 'GUIDELINE',
      permanentTitle: 'PRIMARY',
      temporaryTitle: 'TEMPORARY',
      save: 'Save Guideline',
      activeLabel: 'ACTIVE GUIDELINE',
      quantity: { label: 'Number of Tests' },
      stripConsumption: { title: 'Strip Consumption' },
      patientStock: { label: 'Total Patient Stock', units: 'UDS' },
      frequency: {
        label: 'Delivery Frequency',
        every: 'Every',
        twoDays: 'Two days',
        twoWeeks: 'Two weeks',
        oneMonth: 'One month',
        oneMonthAndAHalf: 'One month and a half',
        twoMonths: 'Two months',
        threeMonths: 'Three months',
      },
      period: { days: 'Day', weeks: 'Week', label: 'Test Frequency' },
      stripModel: { label: 'Model' },
      therapy: {
        label: 'Patient Therapy',
        diabetesTypeOne: 'Diabetes Type 1',
        gestationalDiabetes: 'Gestational Diabetes',
        diabetesTypeTwoOralDrugs: 'Diabetes Type 2 - Oral Drugs',
        diabetesTypeTwoInsuline: 'Diabetes Type 2 - Insulin',
      },
      clinicGuide: {
        label: 'Clinical Guide',
        insuline: 'Insulin',
        insulinePump: 'Insulin Pump',
        preGestational: 'Pre-Gestational',
        duringPregnancy: 'During Pregnancy',
        noMedication: 'No Medication',
        secretagogues: 'Secretagogues',
        noSecretagogues: 'No Secretagogues',
        oneDoseBasalNoPatientAdjusting:
          '1 dose (Basal) without patient adjustment',
        oneDoseBasalPatientAdjusting: '1 dose (Basal) with patient adjustment',
        twoDosesBifasicaNoPatientAdjusting:
          '2 doses (Biphasic insulin) without patient adjustment',
        twoDosesBifasicaPatientAdjusting:
          '2 doses (Biphasic insulin) with patient adjustment',
        multipleDosesNoPatientAdjusting:
          'Multiple doses without patient adjustment',
        multipleDosesPatientAdjusting: 'Multiple doses with patient adjustment',
      },
      reason: { label: 'Reason' },
      dateRange: { label: 'Date Range' },
      createNewTemporary: 'Add Temporary Guideline',
      empty: 'No information on file.',
      patientHasNoCurrentPrescription:
        'No information on file. Complete new patient form below.',
      customClinicGuides: {
        title: 'Custom Clinical Guides Settings',
        createNew: 'Create New Custom Clinical Guide',
        link: 'Custom Clinical Guide Settings',
        guideName: 'Custom Clinical Guide Name',
        patientTherapy: 'Patient Therapy',
        quantityRange: 'Number of Tests',
        period: 'Test Frequency',
        quantitySlider: 'Adjust slider to select quantity range',
        namePlaceholder: 'Enter a name...',
        save: 'Save Custom Clinical Guide',
      },
    },
    general: {
      appName: 'Accu-Chek Smart Pix Online',
      days: {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',
      },
      loading: 'Loading...',
      mealBlocks: {
        breakfast: 'Breakfast',
        lunch: 'Lunch',
        dinner: 'Dinner',
        bedTime: 'Bed Time',
        night: 'Night',
      },
      save: 'Save',
      disclaimers: 'Additional Information',
      dropdownEmpty: 'Selection',
      units: { mgPerDL: 'mg/dL', g: 'g', U: 'U' },
    },
    requestsLoading: {
      addOrgStock: 'Saving strip model stock...',
      closeModal: 'Close',
      complete: 'Complete',
      default: 'Saving...',
      error: 'An error occurred',
      getCurrentPrescription: 'Loading patient guideline...',
      getDeliveryStatus: 'Analyzing patient data...',
      saveAlerts: 'Saving alerts data...',
      saveDelivery: 'Saving strip delivery data...',
      savePrescription: 'Saving guideline data...',
      setDeliveryStatus: 'Updating strip delivery status...',
      submitLostStrips: 'Submitting lost strips data...',
      submitManualDelivery: 'Saving extra strip delivery data...',
      GET_PATIENT: 'Loading patient data...',
      'ORG_STOCK/FETCH_ORG_STRIP_MODELS': 'Loading stock data...',
    },
    patient: {
      idNumber: 'Patient Number',
      birthDate: 'Date of Birth:',
      diabetesType: 'Diabetes Type:',
      treatmentCenter: 'Center:',
      treatmentName: 'Treatment:',
      editPatient: 'Edit Patient',
      patientActivation: 'Deactivate Patient',
      createPatient: 'Create Patient',
      editTimePeriods: 'Edit Time Ranges',
      dataDownloadAssigment: 'Upload Data',
      listDevices: 'List Devices',
      listTreatments: 'List Treatments',
      graphSettings: 'Graph Settings',
      editLink: 'Edit',
      deliveryConfiguration: 'Delivery Configuration',
    },
    login: {
      language: 'Language',
      description: 'Working Together to Manage Diabetes',
      subdescription:
        'We take glucose monitoring to the next level...allowing you to take care of your patients',
      signIn: 'Log In',
      forgotPassword: 'Forgot Password?',
      email: 'Email',
      password: 'Password',
      keepMeLoggedIn: 'Keep me logged in',
      agreement: 'I agree to:',
      disclaimer:
        'the Hospital being responsible as controller for processing patient data through the Platform. The Hospital will use Roche and other subcontractors as processors to operate and maintain the Platform in compliance with data protection laws. I agree to only bring on patients of the Hospital onto the Platform after having obtained their explicit consent. I will remove patients who withdraw their consent.',
      errors: {
        email: 'Enter your e-mail',
        password: 'Enter your password',
        invalidCredentials: 'User and password combination is incorrect.',
        agreement: 'Please accept the terms of service',
        hcpNotActive:
          'Your user does not currently have access to the portal, please contact your doctor if you wish to request it',
      },
    },
    resetPassword: {
      oldPassword: 'Temporary Password',
      newPassword: 'New Password',
      repeatPassword: 'Confirm New Password',
      title: 'Reset Password',
      changePassword: 'Reset Password',
      errors: {
        repeatPassword: 'Re-enter your new password',
        newPassword: 'Enter your new password',
        oldPassword: 'Enter your old password',
        passwordMatch: `Your passwords don't match. Re-enter them now.`,
        serverError: 'Something went wrong',
        previouslyUsedPassword:
          'This password was already entered for this user.',
        invalidPassword:
          'The password does not meet the security criteria: It must contain between 6 and 20 characters, including a lower-case letter, an upper-case letter, a number, and it cannot contain the user name or any spaces',
      },
    },
    firstTime: {
      oldPassword: 'Temporary Password',
      password: 'New Password',
      repeatPassword: 'Confirm New Password',
      secretAnswer: 'Answer',
      changePassword: 'Change Password',
      title: 'Password Change',
      securityQuestion: 'Security Question',
      errors: {
        oldPassword: 'Enter your old password',
        password: 'Enter your new password',
        repeatPassword: 'Re-enter your new password',
        securityQuestion: 'Please select your security question',
        securityAnswer: 'Enter your security answer',
      },
    },
    profile: {
      changeSecurityQuestion: 'Change Security Question',
      changePassword: 'Change Password',
      editProfessional: 'Edit Professional',
    },
    datePicker: {
      done: 'DONE',
      custom: 'Custom',
      startDate: 'Start Date',
      endDate: 'End Date',
      dayLabels: {
        sunday: 'Su',
        monday: 'Mo',
        tuesday: 'Tu',
        wednesday: 'We',
        thursday: 'Th',
        friday: 'Fr',
        saturday: 'Sa',
      },
      presets: {
        today: 'Today',
        yesterday: 'Yesterday',
        last7Days: 'Last 7 days',
        last30Days: 'Last 30 days',
        thisMonth: 'This month',
        lastMonth: 'Last month',
      },
    },
    units: { mgPerDL: 'mg/dL', mmgPerDL: 'mmg/dL', mmolPerL: 'mmol/L' },
    orgStock: {
      title: 'Stock Details',
      addNewStock: {
        title: 'Add New Stock',
        submit: 'Add New Stock',
        date: { label: 'Stock Delivery Date' },
        models: { label: 'Model' },
        tubes: { label: 'Strip Containers Received' },
        strips: { label: 'Strips' },
      },
      orgStockHistory: {
        title: 'Stock history',
        dateAdded: 'Date Added',
        model: 'Model',
        unitsAdded: 'Strips Added',
        tubesAdded: 'Strip Containers Added',
        unitsTotal: 'Total Strips',
        tubesTotal: 'Total Strip Containers',
      },
      totalStock: {
        title: 'Total Stock',
        lastAddedDate: 'Stock Last Updated',
        tubes: 'Total Strip Containers',
        strips: 'Total Strips',
      },
      empty: { default: '-' },
    },
    help: {
      title: 'Accu-Chek Smart Pix Online Support',
      prevPage: 'Back',
      nextPage: 'Next',
    },
    manufacturerInfo: {
      title: 'Manufacturer Information',
      version: 'v',
      description: 'Medical Device Modules',
      addressLine1: 'Roche Diabetes Care Spain SLU',
      addressLine2: 'Avda. Generalitat, 171-173',
      addressLine3: '08174 Sant Cugat del Valles',
    },
    piProfileSelectors: {
      profileSelect: 'Profile',
      calculationPeriodSelect: 'Calculation Periods',
      unitSelect: 'Units',
      cartridgeChangeSelect: 'Cartridge Change',
    },
  },
};
