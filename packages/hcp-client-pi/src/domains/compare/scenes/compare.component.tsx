import * as React from 'react';
import { withTheme } from 'styled-components';

import { TableExpandable } from '@roche/patterns-indicators/components';

import {
  HYPERGLYCEMIAS_TABLE_DATA,
  HYPERGLYCEMIAS_TABLE_NAME,
  HYPOGLYCEMIAS_TABLE_DATA,
  HYPOGLYCEMIAS_TABLE_NAME,
  TREATMENT_ADHERENCE_TABLE_DATA,
  TREATMENT_ADHERENCE_TABLE_NAME,
  USE_OF_SYSTEM_TABLE_DATA,
  USE_OF_SYSTEM_TABLE_NAME,
  VARIABILITY_TABLE_DATA,
  VARIABILITY_TABLE_NAME,
} from './compare.constants';
import { CompareContainer } from './compare.style';

type CompareProps = {};
export interface CompareState {
  variabilityTable: { collapsed: boolean };
  hypoglycemiaTable: { collapsed: boolean };
  hyperglycemiaTable: { collapsed: boolean };
  useOfSystemTable: { collapsed: boolean };
  treatmentAdheranceTable: { collapsed: boolean };
}

export class CompareComponent extends React.Component<
  CompareProps,
  CompareState
> {
  public state: CompareState = {
    variabilityTable: { collapsed: false },
    hypoglycemiaTable: { collapsed: true },
    hyperglycemiaTable: { collapsed: true },
    useOfSystemTable: { collapsed: true },
    treatmentAdheranceTable: { collapsed: true },
  };

  public toggleTable = (tableId: string) => {
    this.setState({
      [tableId as any]: { collapsed: !this.state[tableId].collapsed },
    });
  };

  public render() {
    return (
      <CompareContainer>
        Placeholder: Dates will go here
        <TableExpandable
          collapsed={this.state.variabilityTable.collapsed}
          toggleTable={this.toggleTable}
          tableId="variabilityTable"
          tableData={VARIABILITY_TABLE_DATA}
          tableName={VARIABILITY_TABLE_NAME}
        />
        <TableExpandable
          collapsed={this.state.hypoglycemiaTable.collapsed}
          toggleTable={this.toggleTable}
          tableId="hypoglycemiaTable"
          tableData={HYPOGLYCEMIAS_TABLE_DATA}
          tableName={HYPOGLYCEMIAS_TABLE_NAME}
        />
        <TableExpandable
          collapsed={this.state.hyperglycemiaTable.collapsed}
          toggleTable={this.toggleTable}
          tableId="hyperglycemiaTable"
          tableData={HYPERGLYCEMIAS_TABLE_DATA}
          tableName={HYPERGLYCEMIAS_TABLE_NAME}
        />
        <TableExpandable
          collapsed={this.state.useOfSystemTable.collapsed}
          toggleTable={this.toggleTable}
          tableId="useOfSystemTable"
          tableData={USE_OF_SYSTEM_TABLE_DATA}
          tableName={USE_OF_SYSTEM_TABLE_NAME}
        />
        <TableExpandable
          collapsed={this.state.treatmentAdheranceTable.collapsed}
          toggleTable={this.toggleTable}
          tableId="treatmentAdheranceTable"
          tableData={TREATMENT_ADHERENCE_TABLE_DATA}
          tableName={TREATMENT_ADHERENCE_TABLE_NAME}
        />
      </CompareContainer>
    );
  }
}

export const Compare = withTheme(CompareComponent);
