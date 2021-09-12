import React from 'react';

import {
  AppleIcon,
  AppleEatenIcon,
  OvernightIcon,
  NightIcon,
} from 'src/assets/icons';

export const getMealIcon = (key, styles) => {
  const mealIconKeyMap = {
    AFTER_BREAKFAST: <AppleEatenIcon height={20} {...styles} />,
    AFTER_DINNER: <AppleEatenIcon height={20} {...styles} />,
    AFTER_LUNCH: <AppleEatenIcon height={20} {...styles} />,
    BEDTIME: <OvernightIcon height={20} {...styles} />,
    BEFORE_BREAKFAST: <AppleIcon height={20} {...styles} />,
    BEFORE_DINNER: <AppleIcon height={20} {...styles} />,
    BEFORE_LUNCH: <AppleIcon height={20} {...styles} />,
    NIGHT: <NightIcon height={20} {...styles} />,
  };

  if (!mealIconKeyMap[key]) {
    return null;
  }

  return mealIconKeyMap[key];
};
