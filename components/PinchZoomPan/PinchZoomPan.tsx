import { useNavigationContext } from "@/context/navigation";
import { TREE_NODE_SIZE } from "@/lib/react-family-tree/constants";
import React, { FC, memo, useEffect, useRef } from "react";
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import s from "./PinchZoomPan.module.css";

const MIN_ZOOM = 0.15;
const MAX_ZOOM = 1;

interface PinchZoomPanProps {}

const PinchZoomPan: FC<PinchZoomPanProps> = ({ children }) => {
  const { rootCoords } = useNavigationContext();
  const ref = useRef<ReactZoomPanPinchRef | null>(null);

  useEffect(() => {
    if (ref.current) {
      const xInit = innerWidth / 2 - TREE_NODE_SIZE;
      const yInit = innerHeight / 2 - TREE_NODE_SIZE;
      const x = xInit - rootCoords.x;
      const y = yInit - rootCoords.y;
      ref.current.setTransform(x, y, 1, 0);
    }
  }, [rootCoords.x, rootCoords.y]);

  return (
    <TransformWrapper
      limitToBounds={true}
      minScale={MIN_ZOOM}
      maxScale={MAX_ZOOM}
      doubleClick={{
        disabled: true,
      }}
      panning={{
        velocityDisabled: true,
      }}
      zoomAnimation={{
        disabled: true,
      }}
      ref={ref}
    >
      <TransformComponent wrapperClass={s.wrapper}>{children}</TransformComponent>
    </TransformWrapper>
  );
};

export default memo(PinchZoomPan);
