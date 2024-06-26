import { OutlayRowRequest } from "../type/ProjectType";

export function generateArray(data: OutlayRowRequest[], padding:number = 0, parentId:number | null = null): OutlayRowRequest[] {
    let result:OutlayRowRequest[] = [];
    for (let item of data) {
      let newItem = { ...item, padding, parentId };
      result.push(newItem);
      if (item.child.length > 0) {
        result = result.concat(generateArray(item.child, padding + 20, item.id));
      }
    }
    return result;
  }
  

  