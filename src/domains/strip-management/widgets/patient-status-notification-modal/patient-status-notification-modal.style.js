import styled from 'styled-components';

export const PatientStatusNotificationModalBodyDiv = styled.div`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.four};
`;

export const PatientStatusNotificationButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: ${props => props.theme.spacing.three};
`;

export const PatientStatusCommentWrapperDiv = styled.div`
  margin: 0 auto ${props => props.theme.spacing.three};
`;
