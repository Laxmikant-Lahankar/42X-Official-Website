export type InterestOption = {
  id: string;
  label: string;
  detail?: string;
};

export const SAP_INTEREST: InterestOption[] = [
  {
    id: "sap-mm",
    label: "SAP MM",
    detail:
      "~15 weeks · Functional + embedded ABAP/BASIS awareness + capstone",
  },
  {
    id: "sap-sd",
    label: "SAP SD",
    detail:
      "~13 weeks · Functional + embedded ABAP/BASIS awareness + capstone",
  },
  {
    id: "sap-ewm",
    label: "SAP EWM",
    detail: "~14 weeks · Basic + Advanced + embedded debugging + capstone",
  },
  {
    id: "sap-abap",
    label: "SAP ABAP",
    detail: "~13.5 weeks · Technical / Developer + capstone",
  },
  {
    id: "sap-basis",
    label: "SAP BASIS",
    detail: "~12.5 weeks · Technical administration + capstone",
  },
];

export const INTEREST_OPTIONS: InterestOption[] = [
  ...SAP_INTEREST,
  { id: "data-engineering", label: "Data Engineering" },
  { id: "power-platform", label: "Power Platform" },
];

export function isInterestId(value: string): boolean {
  return INTEREST_OPTIONS.some((option) => option.id === value);
}
