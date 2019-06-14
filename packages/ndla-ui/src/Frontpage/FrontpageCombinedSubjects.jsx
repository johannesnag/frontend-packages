import React, { useState, useEffect, useReducer } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { noScroll } from '@ndla/util';
import { breakpoints, mq, spacing, colors, fonts } from '@ndla/core';
import { SafeLink } from '@ndla/ui';
import { injectT } from '@ndla/i18n';
import FrontpageSubjectIllustration from './FrontpageSubjectIllustration';
import FrontpageCircularSubject from './FrontpageCircularSubject';
import MenuPortal from './MenuPortal';

const StyledSubjectLink = styled('div')`
  width: 50%;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: ${spacing.small} 0;
  position: relative;

  ${mq.range({ from: breakpoints.tablet })} {
    display: none;
  }
`;

const LinkContainer = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${mq.range({ from: breakpoints.desktop })} {
    left: ${spacing.normal};
    right: ${spacing.normal};
  }
`;

const LinkText = styled('span')`
  display: block;
  ${fonts.sizes('20px', '32px')};
  font-weight: bold;
  position: absolute;
  left: 50%;
  bottom: 30%;
  transform: translate(-50%, 50%);
  color: ${colors.subject.dark};

  ${mq.range({ from: breakpoints.desktop })} {
    ${fonts.sizes('22px', '32px')};
  }
`;

const StyledButton = styled('button')`
  display: block;
  cursor: pointer;
  height: 100%;
  width: 23%;
  border-radius: 50%;
  position: relative;
  box-shadow: none;
  z-index: 1;
  border: 0;
  background: none;
`;

const StyledIllustrationContainer = styled('div')`
  width: 100%;

  ${mq.range({ from: breakpoints.desktop })} {
    left: ${spacing.normal};
    right: ${spacing.normal};
  }
`;

const Container = styled('nav')`
  width: 100%;
  position: relative;
  display: none;

  ${mq.range({ from: breakpoints.tablet })} {
    display: flex;
  }

  ${mq.range({ from: breakpoints.desktop })} {
    padding: 0 ${spacing.normal};
  }
`;

const UPDATE_MENU_ANIMATION_DIRECTION = 'UPDATE_MENU_ANIMATION_DIRECTION';
const UPDATE_MENU = 'UPDATE_MENU';
const UPDATE_MENU_OPENSTATE = 'UPDATE_MENU_OPENSTATE';

const menuReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_MENU:
      return {
        ...state,
        ...action.data,
      };
    case UPDATE_MENU_ANIMATION_DIRECTION:
      return {
        ...state,
        animationDirection: action.data,
      };
    case UPDATE_MENU_OPENSTATE:
      return {
        ...state,
        menuIsOpen: action.data,
      };
    default:
      throw new Error();
  }
};

const FrontpageCombinedSubjects = ({
  categories,
  categoriesMobile,
  illustrationUrl,
  categoryIllustrations,
  t,
}) => {
  const defaultFills = {
    circle1: colors.brand.lighter,
    circle2: colors.brand.lighter,
    circle3: colors.brand.lighter,
  };
  const [fills, setFills] = useState(defaultFills);
  const [currentState, dispatch] = useReducer(menuReducer, {});
  const {
    openedModalFromElement,
    menuIsOpen,
    animationDirection,
    categoryIndex,
  } = currentState;

  const setIllustrationHoverFill = index => {
    if (index === 'reset') {
      setFills(defaultFills);
      return;
    }
    setFills({
      ...fills,
      [`circle${index + 1}`]: colors.brand.light,
    });
  };

  useEffect(() => {
    const onKeyUpEvent = e => {
      if (e.code === 'Escape') {
        dispatch({ type: UPDATE_MENU_ANIMATION_DIRECTION, data: 'out' });
      }
    };
    window.addEventListener('keyup', onKeyUpEvent);
    return () => {
      window.removeEventListener('keyup', onKeyUpEvent);
    };
  }, []);

  const closeMenu = event => {
    dispatch({ type: UPDATE_MENU_OPENSTATE, data: false });
    noScroll(false);
  };

  const openMenu = ({ event, index }) => {
    dispatch({
      type: UPDATE_MENU,
      data: {
        categoryIndex: index,
        menuIsOpen: true,
        animationDirection: 'in',
        openedModalFromElement: event.target,
      },
    });
    noScroll(true);
  };

  return (
    <>
      <MenuPortal
        isOpen={menuIsOpen}
        onClose={closeMenu}
        animationDirection={animationDirection}
        onChangeAnimationDirection={direction =>
          dispatch({ type: UPDATE_MENU_ANIMATION_DIRECTION, data: 'out' })
        }
        fromInitalElement={openedModalFromElement}>
        {categoryIndex && (
          <nav>
            <h1>{categories[categoryIndex]}</h1>
            <ul>
              <li>
                <SafeLink to="#">Example 1</SafeLink>
              </li>
              <li>
                <SafeLink to="#2">Example 2</SafeLink>
              </li>
              <li>
                <SafeLink to="#3">Example 3</SafeLink>
              </li>
            </ul>
          </nav>
        )}
      </MenuPortal>
      {categoriesMobile.map((category, index) => (
        <StyledSubjectLink key={category}>
          <FrontpageCircularSubject
            onClick={event => openMenu({ event, index })}
            textValue={t(`welcomePage.category.${category}`)}
            illustrationUrl={categoryIllustrations[category]}
          />
        </StyledSubjectLink>
      ))}
      <Container illustrationUrl={illustrationUrl}>
        <LinkContainer>
          {categories.map((category, index) => (
            <StyledButton
              key={category}
              onPointerEnter={() => setIllustrationHoverFill(index)}
              onPointerLeave={() => setIllustrationHoverFill('reset')}
              onClick={event => openMenu({ event, index })}>
              <LinkText>{category}</LinkText>
            </StyledButton>
          ))}
        </LinkContainer>
        <StyledIllustrationContainer>
          <FrontpageSubjectIllustration fill={fills} />
        </StyledIllustrationContainer>
      </Container>
    </>
  );
};

FrontpageCombinedSubjects.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoriesMobile: PropTypes.arrayOf(PropTypes.string).isRequired,
  illustrationUrl: PropTypes.string.isRequired,
};

export default injectT(FrontpageCombinedSubjects);
