import { OutlayRowRequest } from "../type/ProjectType";

export const emptyData = (current?: OutlayRowRequest): OutlayRowRequest => {
  return {
    equipmentCosts: 0,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    supportCosts: 0,
    mimExploitation: 0,
    estimatedProfit: 0,
    overheads: 0,
    parentId: current?.id || null,
    rowName: "",
    salary: 0,
    id: 0,
    child: [],
    padding: current ? (current?.padding ?? 0) + 20 : 0, 
    edit: true,
  };
};
