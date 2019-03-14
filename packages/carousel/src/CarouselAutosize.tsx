/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import em from 'polished/lib/helpers/em';
import { breakpoints as breakpointFromCore } from '@ndla/core';
import { Breakpoint } from '@ndla/core/types';
import { StyledWrapperAutosizer } from './Styles';
import { CalculatedProps as CalculatedCarouselProps } from './Carousel';

interface CaruselBreakpoint {
  until?: Breakpoint;
  columnsPrSlide: number;
  distanceBetweenItems: number;
  arrowOffset: number;
  margin?: number;
  maxColumnWidth?: number;
}

interface Props {
  breakpoints: CaruselBreakpoint[];
  centered?: boolean;
  children: (
    calculatedProps: CalculatedCarouselProps | null,
  ) => React.ReactNode;
}

interface State {
  carouselBreakpoint?: CaruselBreakpoint;
}

export class CarouselAutosize extends Component<Props, State> {
  autosizeRef = React.createRef<HTMLDivElement>();
  state: State = {};

  componentDidMount() {
    window.addEventListener('resize', this.updateSizes);
    this.updateSizes();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSizes);
  }

  updateSizes = () => {
    const node = this.autosizeRef.current!;
    const wrapperWidthInEm = parseFloat(em(node.offsetWidth));
    const { breakpoints } = this.props;

    const useBreakpoint = breakpoints
      .filter(breakpointItem => {
        const until = breakpointItem.until
          ? parseFloat(breakpointFromCore[breakpointItem.until])
          : 9999;
        return until >= wrapperWidthInEm;
      })
      .sort((a, b) =>
        (a.until ? parseFloat(breakpointFromCore[a.until]) : 9999) <
        (b.until ? parseFloat(breakpointFromCore[b.until]) : 9999)
          ? -1
          : 1,
      );

    this.setState({
      carouselBreakpoint: useBreakpoint[0],
    });
  };

  calculateCarouselProps = (
    breakpoint: CaruselBreakpoint,
  ): CalculatedCarouselProps | null => {
    if (!this.state.carouselBreakpoint || !this.autosizeRef.current) {
      return null;
    }
    const {
      columnsPrSlide,
      distanceBetweenItems,
      arrowOffset,
      margin,
      maxColumnWidth,
    } = breakpoint;

    const wrapperWidth =
      this.autosizeRef.current.offsetWidth -
      (columnsPrSlide - 1) * distanceBetweenItems -
      (margin || 0) * 2;

    const columnWidthDynamic = wrapperWidth / columnsPrSlide;
    const columnWidth = maxColumnWidth
      ? Math.min(columnWidthDynamic, maxColumnWidth)
      : columnWidthDynamic;

    return {
      columnsPrSlide,
      columnWidth,
      distanceBetweenItems,
      arrowOffset,
      margin: margin || 0,
    };
  };

  render() {
    const { carouselBreakpoint } = this.state;
    if (!carouselBreakpoint) {
      return <div ref={this.autosizeRef} />;
    }

    const calculatedCarouselProps = this.calculateCarouselProps(
      carouselBreakpoint,
    );

    const maxColumnWidth = carouselBreakpoint.maxColumnWidth;

    let wrapperWidth = 'auto';

    if (
      this.props.centered &&
      calculatedCarouselProps &&
      maxColumnWidth === calculatedCarouselProps.columnWidth
    ) {
      wrapperWidth = `${calculatedCarouselProps.columnWidth *
        calculatedCarouselProps.columnsPrSlide +
        calculatedCarouselProps.distanceBetweenItems *
          (calculatedCarouselProps.columnsPrSlide - 1) +
        (calculatedCarouselProps.margin || 0) * 2}px`;
    }

    return (
      <div ref={this.autosizeRef}>
        {carouselBreakpoint && (
          <StyledWrapperAutosizer width={wrapperWidth}>
            {this.props.children(calculatedCarouselProps)}
          </StyledWrapperAutosizer>
        )}
      </div>
    );
  }
}