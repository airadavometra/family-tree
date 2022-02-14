export function isTouch() {
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

export function isTouchEvent(event: any): event is TouchEvent {
  // IE & (old) EDGE doesn't have TouchEvent
  return typeof TouchEvent !== 'undefined' && event instanceof TouchEvent;
}

export function getClientXY(event: TouchEvent | MouseEvent) {
  const point = event instanceof MouseEvent ? event : event.touches[0];
  return { X: point.clientX, Y: point.clientY };
}

export function getMidXY(event: TouchEvent) {
  const [a, b] = Array.from(event.touches);
  return {
    mX: (a.pageX + b.pageX) / 2,
    mY: (a.pageY + b.pageY) / 2,
  };
}

export function limitZoom(z: number, min: number, max: number) {
  return Math.max(Math.min(z, max), min);
}

export function getTouchesRange(event: TouchEvent) {
  const [a, b] = Array.from(event.touches);
  return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
}

export function getScale(event: TouchEvent, currRange: number) {
  // Webkit
  let scale: number = (event as any).scale;
  let pageX: number = (event as any).pageX;
  let pageY: number = (event as any).pageY;

  // Other browsers
  if ([scale, pageX, pageY].some(val => val === undefined)) {
    scale = getTouchesRange(event) / currRange;
    const { mX, mY } = getMidXY(event);
    pageX = mX;
    pageY = mY;
  }

  return { scale, pageX, pageY };
}

export function getWheelDelta(event: WheelEvent) {
  const delta = event.deltaY;

  switch (event.deltaMode) {
    case WheelEvent.DOM_DELTA_LINE:
      return Math.abs(delta) >= 1
        ? delta / 100       // FF (wheel) WIN/MAC
        : delta / 100 * 2;  // FF (touch) WIN
    case WheelEvent.DOM_DELTA_PAGE:
      return Math.abs(delta) >= 1
        ? delta / 100       // Ch/FF (wheel) WIN
        : delta / 10;       // Ch/FF (touch) WIN
    default:
      // Big delta means that it's DOM_DELTA_PAGE (IE/EDGE)
      return Math.abs(delta) > 600 // TODO: check it
        ? delta / 10000
        : delta / 1000;
  }
}
