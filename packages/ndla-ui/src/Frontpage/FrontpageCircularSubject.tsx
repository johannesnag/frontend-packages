import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import { fonts, colors, spacing, mq, breakpoints } from '@ndla/core';

type StyledFigureProp = {
  illustrationUrl: string;
};

const StyledFigure = styled.figure<StyledFigureProp>`
  ${({ illustrationUrl }) =>
    illustrationUrl &&
    css`
      background-image: url(${illustrationUrl});
      background-size: 90%;
      background-position: top center;
      height: 30vw;
      width: 30vw;
      transform: translateY(-${spacing.xsmall});
    `}
`;

const StyledFigCaption = styled.figcaption`
  position: absolute;
  bottom: ${spacing.normal};
  left: 50%;
  background: transparent;
  ${fonts.sizes(16, 1.3)};
  ${mq.range({ from: breakpoints.mobileWide })} {
    ${fonts.sizes(20, 1.3)};
    bottom: ${spacing.medium};
  }
  transform: translateX(-50%);
  padding: 0;
  font-weight: bold;
  color: ${colors.subject.dark};
`;

const StyledButton = styled.button`
  box-shadow: none;
  border: 0;
  cursor: pointer;
  &:before {
    content: "";
    display: block;
    width: 30vw;
    height: 30vw;
    position: absolute;
    background: red;
    border-radius: 100%;
    background: ${colors.brand.lighter};
    transition: transform 200ms ease, background 200ms ease;
  }
  border-radius: 100%;
  height: 30vw;
  width: 30vw;
  padding: 0;
  &:hover, &:focus {
    &:before {
      background: ${colors.brand.light};
      transform: scale(1.1);
    }
  }
  &:active {
    &:before {
      background: ${colors.brand.light};
      transform: scale(0.9);
    }
  }
`;

type Props = {
  textValue: string;
  illustrationUrl: string;
};

const FrontpageCircularSubject: React.FunctionComponent<Props & React.HTMLProps<HTMLButtonElement>> = ({
  textValue, illustrationUrl, ...rest
}) => (
  <StyledButton type="button" {...rest}>
    <StyledFigure illustrationUrl={illustrationUrl} />
    <StyledFigCaption>{textValue}</StyledFigCaption>
  </StyledButton>
);

export default FrontpageCircularSubject;
