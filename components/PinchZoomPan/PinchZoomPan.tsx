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

  const xInit = innerWidth / 2 - TREE_NODE_SIZE;
  const yInit = innerHeight / 2 - TREE_NODE_SIZE;

  const x = xInit - rootCoords.x;
  const y = yInit - rootCoords.y;

  console.log(rootCoords);

  useEffect(() => {
    if (ref.current) {
      ref.current.setTransform(x, y, 1, 0);
    }
  }, [x, y]);

  return (
    <TransformWrapper
      limitToBounds={false}
      minScale={MIN_ZOOM}
      maxScale={MAX_ZOOM}
      initialScale={1}
      initialPositionX={x}
      initialPositionY={y}
      doubleClick={{
        disabled: true,
      }}
      ref={ref}
    >
      <TransformComponent wrapperClass={s.wrapper}>{children}</TransformComponent>
    </TransformWrapper>
  );
};

export default memo(PinchZoomPan);
