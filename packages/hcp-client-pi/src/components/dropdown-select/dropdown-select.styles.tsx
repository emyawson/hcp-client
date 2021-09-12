import { IThemeInterface } from '@roche/patterns-indicators/theme';
import { convertPxToRem } from '@roche/patterns-indicators/utils';
import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';

interface DropdownSelectContainerProps {
  width?: string;
  flex?: string;
}

const textDisabled = ({theme}) => theme.colors.grayLight;
const convertPxToRemWithTheme = (px: string) => ({ theme }) => convertPxToRem(theme.BASE_FONT_SIZE)(px);

export const DropdownSelectContainer: StyledComponentClass<DropdownSelectContainerProps, IThemeInterface> = styled<DropdownSelectContainerProps, 'div'>('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${({width}) => width ? width : ''};
  flex: ${({flex}) => flex ? flex : ''};
`;

type DropdownSelectInputContainerProps = {
  className?: string;
};

export const DropdownSelectInputContainer: StyledComponentClass<DropdownSelectInputContainerProps, IThemeInterface> = styled.div`
  display: flex;
  width: 100%;
  border-radius: ${convertPxToRemWithTheme('4px')};
  border: 1px solid #ccc;
  height: ${convertPxToRemWithTheme('48px')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.is-open {
    border-radius: 4px 4px 0 0;
  }
`;

DropdownSelectInputContainer.displayName = 'DropdownSelectInputContainer';

type DropdownSelectButtonProps = {
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const DropdownSelectButton: StyledComponentClass<DropdownSelectButtonProps, IThemeInterface> = styled.button`
  width: 3rem;
  background: #FFF;
  color: #9B9B9B;
  border: none;
  border-radius: 0 4px 4px 0;
  margin: 0;
  outline: none;
  text-decoration: none;
  text-align: center;
  transition: all 225ms cubic-bezier(.4,0,.2,1);

  &.is-disabled {
    path {
      fill: ${textDisabled};
    }
  }

  &:not(.is-disabled):hover {
    cursor: pointer;
    background-color: #0066CC;
    color: #CF021B;

    path {
      fill: #FFF;
    }

    path {
      transition: all 225ms cubic-bezier(.4,0,.2,1);
    }

    &.is-open {
      border-radius: 0  4px 0 0;
    }
  }
`;

type DropdownSelectDisplayProps = {
  className?: string;
};

export const DropdownSelectDisplay: StyledComponentClass<DropdownSelectDisplayProps, IThemeInterface> = styled.span`
  display: flex;
  height: 100%;
  flex: 1;
  align-items: center;
  border: none;
  background-color: #FFF;
  border-radius: ${convertPxToRemWithTheme('4px')};
  padding: 0 20px;
  min-width: 0;

  &.is-disabled {
    color: ${textDisabled};
  }
`;

export const DropdownSelectDropdownContainer: StyledComponentClass<{}, IThemeInterface> = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${convertPxToRemWithTheme('48px')};
  width: 100%;
  border: 1px solid #ccc;
  border-top: none;
  max-height: ${convertPxToRemWithTheme('250px')};
  overflow-y: scroll;
  border-radius: 0 0 4px 4px;
`;

interface DropdownSelectDropdownRowProps {
  optionFontSize?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DropdownSelectDropdownRow: StyledComponentClass<DropdownSelectDropdownRowProps, IThemeInterface> = styled<DropdownSelectDropdownRowProps, 'div'>('div')`
  height:  ${convertPxToRemWithTheme('48px')};
  width: 100%;
  background: #FFF;
  display: flex;
  align-items: center;
  padding: 0 20px;
  transition: background-color 225ms cubic-bezier(.4,0,.2,1);
  font-size: ${({optionFontSize}) => optionFontSize ? optionFontSize : ''};

  &:hover {
    background-color: ${props => props.theme.colors.silver};
    cursor: pointer;
  }
`;
