import { OutlayRowRequest } from "../type/ProjectType";

export function updateData(
  data: OutlayRowRequest[],
  item: OutlayRowRequest,
  create?: boolean
): OutlayRowRequest[] {
  return data.map((current) => {
    if (current.id === item.id) {
      if (create) {
        const newChildItem: OutlayRowRequest = {
          equipmentCosts: 0,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          supportCosts: 0,
          mimExploitation: 0,
          estimatedProfit: 0,
          overheads: 0,
          parentId: current.id || null,
          rowName: "",
          salary: 0,
          id: 0,
          child: [],
          padding: (current.padding ?? 0) + 20,
          edit: true,
        };
        return {
          ...current,
          child: [...(current.child ?? []), newChildItem],
        };
      } else {
        return {
          ...current,
          edit: true,
        };
      }
    } else if (current.child) {
      return {
        ...current,
        child: updateData(current.child, item, create),
      };
    } else {
      return current;
    }
  });
}
