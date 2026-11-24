import type { SceneDef, SceneId } from "./types";
import { warehouse } from "./warehouse";
import { p2p } from "./p2p";
import { o2c } from "./o2c";
import { abap } from "./abap";
import { basis } from "./basis";
import { powerbi } from "./powerbi";
import { lowcode } from "./lowcode";
import { cicd } from "./cicd";

export const SCENES: Record<SceneId, SceneDef> = {
  warehouse,
  p2p,
  o2c,
  abap,
  basis,
  powerbi,
  lowcode,
  cicd,
};
