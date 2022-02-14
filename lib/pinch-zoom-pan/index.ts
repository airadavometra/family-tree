import { DEFAULT_STATE, MAX_ZOOM, MIN_ZOOM } from './constants';
import { getClientXY, getScale, getTouchesRange, getWheelDelta, isTouch, isTouchEvent, limitZoom } from './helpers';

type Action = 'none' | 'move' | 'pinch';

interface ICoordinates {
  x: number;
  y: number;
  z: number;
}

interface IOptions {
  element: HTMLElement;
  minZoom?: number;
  maxZoom?: number;
  captureWheel?: boolean;
}

export function create({ element, minZoom = MIN_ZOOM, maxZoom = MAX_ZOOM, captureWheel }: Readonly<IOptions>) {
  const touch = isTouch();

  let action: Action = 'none';
  let state: Readonly<ICoordinates> = DEFAULT_STATE;
  const current: ICoordinates & { range: number } = { x: 0, y: 0, z: 0, range: 0 };

  // Update local state & call external set function
  function setState(value: Readonly<ICoordinates>) {
    state = value;
    const point = element.children.item(0);
    if (point) (point as HTMLElement).style.transform = `translate(${value.x}px, ${value.y}px) scale(${value.z})`;
  }

  function setCurrentXY({ X, Y }: { X: number, Y: number }) {
    current.x = X;
    current.y = Y;
  }

  function startMoving(event: TouchEvent | MouseEvent) {
    action = 'move';
    setCurrentXY(getClientXY(event));
  }

  // Calculate & set new position
  function setPosition(z: number, pageX: number, pageY: number) {
    const { left, top } = element.getBoundingClientRect();

    const ratio = z / state.z;
    const offsetX = (pageX - left - window.pageXOffset) - state.x;
    const offsetY = (pageY - top - window.pageYOffset) - state.y;

    setState({
      x: state.x - ((offsetX * ratio) - offsetX),
      y: state.y - ((offsetY * ratio) - offsetY),
      z,
    });
  }

  function onStart(event: TouchEvent | MouseEvent) {
    event.preventDefault();

    if (isTouchEvent(event) && event.touches.length === 2) {
      action = 'pinch';
      current.z = state.z;
      current.range = getTouchesRange(event);
    }
    else startMoving(event);
  }

  function onMove(event: TouchEvent | MouseEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();

    if (action === 'move') {
      const clientXY = getClientXY(event);
      const x = state.x - (current.x - clientXY.X);
      const y = state.y - (current.y - clientXY.Y);
      setCurrentXY(clientXY);
      setState({ x, y, z: state.z });
    }
    else if (action === 'pinch') {
      const { scale, pageX, pageY } = getScale(event as TouchEvent, current.range);
      const z = limitZoom(current.z * scale, minZoom, maxZoom);
      setPosition(z, pageX, pageY);
    }
  }

  function onEnd(event: TouchEvent | MouseEvent) {
    if (action === 'pinch' && isTouchEvent(event) && event.touches.length === 1) startMoving(event);
    else action = 'none';
  }

  function onWheel(event: WheelEvent) {
    if (!captureWheel && !event.altKey) return;
    event.preventDefault();
    event.stopPropagation();

    const delta = getWheelDelta(event) * -1;
    const z = limitZoom(state.z + delta, minZoom, maxZoom);
    setPosition(z, event.pageX, event.pageY);
  }

  const events: ReadonlyArray<{ type: any, listener: (e?: any) => void }> = [
    { type: touch ? 'touchstart' : 'mousedown', listener: onStart },
    { type: touch ? 'touchmove' : 'mousemove', listener: onMove },
    { type: touch ? 'touchend' : 'mouseup', listener: onEnd },
    { type: touch ? 'touchleave' : 'mouseleave', listener: onEnd },
    { type: 'touchcancel', listener: onEnd },
    { type: 'wheel', listener: onWheel },
  ];

  // init
  const { width, height } = element.getBoundingClientRect();
  setState({ x: width / 2, y: height / 2, z: state.z });

  // subscribe
  events.forEach(({ type, listener }) => element.addEventListener(type, listener));

  // unsubscribe
  return () => events.forEach(({ type, listener }) => element.removeEventListener(type, listener));
}
