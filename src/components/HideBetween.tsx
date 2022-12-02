import ctl from '@netlify/classnames-template-literals';
import React, { useEffect, useState } from 'react';

interface HideBetweenProps {
  children: React.ReactNode;
  inverse?: Boolean;
  startDivID?: String;
  endDivID?: String;
  startDivOffset?: number;
  endDivOffset?: number;
  startHeight?: number;
  endHeight?: number;
  div?: Boolean;
  height?: Boolean;
}

const getOffset = (el: HTMLElement | null): number => {
  const rect: DOMRect | undefined = el?.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  return rect!.top + scrollTop;
};

export default function HideBetween(props) {
  const [show, setShow] = useState(false);
  const listenToScroll = () => {
    const {
      startDivID,
      endDivID,
      startHeight,
      endHeight,
      height,
      inverse,
      startDivOffset,
      endDivOffset,
    } = props;

    let startDiv: HTMLElement | null = null;
    let endDiv: HTMLElement | null = null;

    if (!height) {
      startDiv = document.querySelector(`#${startDivID}`) as HTMLElement;
      endDiv = document.querySelector(`#${endDivID}`) as HTMLElement;
    }

    let startDivTopOffset: number = height
      ? startHeight || 0
      : getOffset(startDiv);

    let endDivTopOffset: number = height ? endHeight || 0 : getOffset(endDiv);

    if (!height) {
      if (startDivOffset) startDivTopOffset += startDivOffset;
      else if (endDivOffset) endDivTopOffset += endDivOffset;
    }

    const winScroll: number =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll >= startDivTopOffset && winScroll <= endDivTopOffset) {
      setShow(inverse);
    } else {
      setShow(!inverse);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
  }, []);
  const buttonClasses = ctl(`
    sticky
    top-0
    ${show ? 'shown-self' : 'hidden-self'}
    transition-all
`);
  return (
    <React.Fragment>
      <div className={buttonClasses}>{props.children}</div>
    </React.Fragment>
  );
}
