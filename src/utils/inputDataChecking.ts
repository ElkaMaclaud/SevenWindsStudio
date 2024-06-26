import { OutlayRowRequest } from "../type/ProjectType";

export function inputDataChecking(
  inputData: Pick<
    OutlayRowRequest,
    "rowName" | "salary" | "equipmentCosts" | "overheads" | "estimatedProfit"
  >
) {
  return {
    ...inputData,
    salary: inputData.salary || 0,
    equipmentCosts: inputData.equipmentCosts || 0,
    overheads: inputData.overheads || 0,
    estimatedProfit: inputData.estimatedProfit || 0,
  };
}
