export interface OutlayRowRequest {
  equipmentCosts: number;
  estimatedProfit: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  parentId: number | null;
  rowName: string;
  salary: number;
  supportCosts: number;
  id: number;
  child: OutlayRowRequest[],
  padding?: number,
  edit?: boolean
}
