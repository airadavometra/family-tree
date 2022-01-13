import dynamic from "next/dynamic";
import { FC } from "react";
import Tree from "../Tree";
import s from "./TreeWithNavigation.module.css";

const PinchZoomPan = dynamic(
  () => import("../../../components/PinchZoomPan/PinchZoomPan"),
  {
    ssr: false,
  }
);

type treeWithNavigationProps = {
  rootId?: string;
};

const MIN_ZOOM = 0.15;
const MAX_ZOOM = 1;

const TreeWithNavigation: FC<treeWithNavigationProps> = ({ rootId }) => (
  <div className={s.root}>
    <PinchZoomPan
      min={MIN_ZOOM}
      max={MAX_ZOOM}
      captureWheel
      className={s.wrapper}
    >
      <Tree rootId={rootId} />
    </PinchZoomPan>
  </div>
);

export default TreeWithNavigation;
