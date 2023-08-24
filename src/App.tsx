/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRef, useState } from "react";
import { Renderer } from "./components/Renderer";
import { cube } from '@jscad/modeling/src/primitives'
import { Geom3 } from "@jscad/modeling/src/geometries/types";

export default function App() {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [solids, setSolids] = useState<Geom3[]>([]);

  const createWall = () => {
    // @ts-ignore
    setSolids([...solids, cube([0, 0, 0], 12)]);
  };

  return (
    <>
      <button className="absolute" onClick={createWall}>Test</button>
      <div>
        <Renderer solids={solids} width={windowSize.current[0]} height={windowSize.current[1]} />
      </div>
    </>
  );
}
