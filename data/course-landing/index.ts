import type { CourseLanding } from "./types";
import { SAP_EWM_LANDING } from "./sap-ewm";
import { SAP_MM_LANDING } from "./sap-mm";
import { SAP_SD_LANDING } from "./sap-sd";
import { SAP_ABAP_LANDING } from "./sap-abap";
import { SAP_BASIS_LANDING } from "./sap-basis";

/** Courses with a dedicated sales page, keyed by course slug. */
export const LANDINGS: Record<string, CourseLanding> = {
  "sap-ewm": SAP_EWM_LANDING,
  "sap-mm": SAP_MM_LANDING,
  "sap-sd": SAP_SD_LANDING,
  "sap-abap": SAP_ABAP_LANDING,
  "sap-basis": SAP_BASIS_LANDING,
};

export type { CourseLanding } from "./types";
