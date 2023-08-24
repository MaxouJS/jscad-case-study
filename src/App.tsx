import { useRef, useState } from "react";
import { Renderer } from "./components/Renderer";
import { cube } from '@jscad/modeling/src/primitives'

export default function App() {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [solids, setSolids] = useState([]);

  const createWall = () => {
    setSolids([...solids, cube([0, 0, 0], 12)]);
  };

  return (
    <>
      <button className="absolute">Test</button>
      <div>
        <Renderer solids={solids} width={windowSize.current[0]} height={windowSize.current[1]} />
      </div>
    </>
  );
}
