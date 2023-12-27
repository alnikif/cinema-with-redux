import { RefObject, useCallback, useEffect } from 'react';
import { KeyCodes } from '../constants/keycodes';
import { OutsideEvent } from '../constants/outsideEvents';

type UseOutsideClickProps = {
  ref: RefObject<HTMLDivElement>;
  isActive: boolean;
  callback: () => void;
  mouseEvents?: OutsideEvent[];
  keyCodes?: string[];
};

const DEFAULT_MOUSE_EVENTS: OutsideEvent[] = [OutsideEvent.click];
const DEFAULT_KEY_CODES: KeyCodes[] = [KeyCodes.escape];

const useOutsideClick = (params: UseOutsideClickProps) => {
  const { ref, isActive, mouseEvents = DEFAULT_MOUSE_EVENTS, keyCodes = DEFAULT_KEY_CODES, callback } = params;

  const handleMouseEvent = (e: MouseEvent | TouchEvent): void => {
    if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
      callback();
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (keyCodes && keyCodes.includes(e.key)) {
        callback();
      }
    },
    [keyCodes, callback]
  );

  useEffect(() => {
    if (isActive) {
      mouseEvents.map((event) => document.addEventListener(event, handleMouseEvent));

      if (keyCodes) {
        document.addEventListener('keydown', handleKeyDown);
      }
    }

    return (): void => {
      mouseEvents.map((event) => document.removeEventListener(event, handleMouseEvent));

      if (keyCodes) {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [ref, mouseEvents, isActive, callback, handleKeyDown]);
};

export default useOutsideClick;
