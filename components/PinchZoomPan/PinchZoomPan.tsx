import { create } from "@/lib/pinch-zoom-pan";
import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import s from "./PinchZoomPan.module.css";

interface Props {
  min?: number;
  max?: number;
  captureWheel?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default React.memo<Props>(function PinchZoomPan({ min, max, captureWheel, className, style, children }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    return create({ element, minZoom: min, maxZoom: max, captureWheel });
  }, [min, max, captureWheel]);

  return (
    <div ref={root} className={classNames(className, s.root)} style={style}>
      <div className={s.point}>
        <div className={s.canvas}>{children}</div>
      </div>
    </div>
  );
});
