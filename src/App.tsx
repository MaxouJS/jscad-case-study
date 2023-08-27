/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { Renderer } from "./components/Renderer";
import { cuboid } from '@jscad/modeling/src/primitives'
// import { rotate } from "@jscad/modeling/src/operations/transforms";
import { Geom3 } from "@jscad/modeling/src/geometries/types";
import { useAtom } from "jotai";

// States
import { isRotationLockedAtom } from "./states/rendererAtom";

interface Window {
  width: number;
  height: number;
}

export default function App() {
  const [windowSize, setWindowSize] = useState<Window>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isRotationLocked, setIsRotationLocked] = useAtom(isRotationLockedAtom);
  const [canvasMode, setCanvasMode] = useState<string>("2D");

  const [solids, setSolids] = useState<Geom3[]>([]);

  function createWall(): void {
    const newCuboid: Geom3 = cuboid({size: [0.5, 0.5, 2], center: [0, 0, 1]});
    // const rotatedCuboid: Geom3 = rotate([0, 0, Math.PI / 1.6], newCuboid);
    setSolids([...solids, newCuboid]);
  }

  function resetTo2DView(): void {
    setIsRotationLocked(true);
    setCanvasMode("2D");
  }

  function resetTo3DView(): void {
    setIsRotationLocked(false);
    setCanvasMode("3D");
  }

  useEffect((): () => void => {
    function handleResize(): void {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  
    window.addEventListener("resize", handleResize);
  
    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main>
      <nav className="absolute bottom-0 p-4 space-x-4">
        <button
          onClick={createWall}
          className="bg-sky-400/50 backdrop-blur-sm rounded-full p-4 hover:scale-110 duration-200"
        >
          <img src="./icons/wall.png" alt="" className="w-8" />
        </button>
        <button
          onClick={createWall}
          className="bg-sky-400/50 backdrop-blur-sm rounded-full p-4 hover:scale-110 duration-200"
        >
          <img src="./icons/door.png" alt="" className="w-8" />
        </button>
        <button
          onClick={createWall}
          className="bg-sky-400/50 backdrop-blur-sm rounded-full p-4 hover:scale-110 duration-200"  
        >
          <img src="./icons/window.png" alt="" className="w-8" />
        </button>
      </nav>
      <nav className="absolute bottom-0 right-0 p-4 space-x-4">
        <button
          onClick={resetTo2DView}
          className="bg-sky-400/50 backdrop-blur-sm rounded-full p-4 hover:scale-110 duration-200"
        >
          <img src="./icons/2d.png" alt="" className="w-8" />
        </button>
        <button
          onClick={resetTo3DView}
          className="bg-sky-400/50 backdrop-blur-sm rounded-full p-4 hover:scale-110 duration-200"
        >
          <img src="./icons/3d.png" alt="" className="w-8" />
        </button>
      </nav>
      <section>
        {canvasMode === "2D" ? <Renderer solids={solids} width={windowSize.width} height={windowSize.height} view={"2D"} /> : null}
        {canvasMode === "3D" ? <Renderer solids={solids} width={windowSize.width} height={windowSize.height} view={"3D"} /> : null}
      </section>
    </main>
  );
}
