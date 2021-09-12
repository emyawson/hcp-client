import * as React from 'react';

const createMockCartridgeChangeOptions = (): string[] => {
  const container: string[] = [];
  for (let i = 1; i <= 14; i++) {
    container.push(`Every ${i} Day(s)`);
  }
  return container;
};

const mockSelectOptions = {
  filters: [
    { key: 'profile', valuesKey: 'profile' },
    { key: 'calculationPeriods', valuesKey: 'calculationPeriods' },
    { key: 'units', valuesKey: 'units' },
    { key: 'cartridgeChange', valuesKey: 'cartridgeChange' },
  ],
};

const getMockData = data => {
  return {
    values: {
      profile: ['Bolus Calculator', 'Insulin Pump', 'Meter'],
      calculationPeriods: [
        '2 Weeks',
        '4 Weeks',
        '6 Weeks',
        '8 Weeks',
        '12 Weeks',
      ],
      units: ['mg / dL', '-mmol / L'],
      cartridgeChange: createMockCartridgeChangeOptions(),
    },
    data,
  };
};

export class DropdownChain extends React.Component {
  public state = {
    selects: [],
    data: null,
  };

  public render() {
    const values = getMockData({});
    return (
      <div>
        {mockSelectOptions.filters.forEach(element => {
          return <span>{element.key}</span>;
        })}

        {values.values.cartridgeChange.forEach(element => {
          return { element };
        })}
      </div>
    );
  }
}
