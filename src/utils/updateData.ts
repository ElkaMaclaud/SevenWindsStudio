import { OutlayRowRequest } from "../type/ProjectType";

export function updateData(data: OutlayRowRequest[], item: OutlayRowRequest, create?: boolean): OutlayRowRequest[] {
    let result: OutlayRowRequest[] = [];
  
    for (let current of data) {
      if (current.id === item.id) {
        result.push({ ...current, edit: true, padding: current.padding ?? 0 });
        if (create && current.child) {
          const newChildItem: OutlayRowRequest = {
            equipmentCosts: 0,
            estimatedProfit: 0,
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            mimExploitation: 0,
            overheads: 0,
            parentId: current.id,
            rowName: "",
            salary: 0,
            supportCosts: 0,
            id: 0, 
            child: [], 
            padding: (current.padding ?? 0) + 20, 
            edit: false 
          };
          current.child.push(newChildItem);
        }
      } 
    }
  
    return result;
  }
  