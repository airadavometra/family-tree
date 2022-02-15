import Tree from "@/components/Tree/Tree";
import dynamic from "next/dynamic";
import { FC } from "react";

const PinchZoomPan = dynamic(() => import("@/components/PinchZoomPan/PinchZoomPan"), {
  ssr: false,
});

const TreeWithNavigation: FC = () => (
  <PinchZoomPan>
    <Tree />
  </PinchZoomPan>
);

export default TreeWithNavigation;
