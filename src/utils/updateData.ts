import { OutlayRowRequest } from "../type/ProjectType";
import { emptyData } from "./EmptyData";

export function updateData(
  data: OutlayRowRequest[],
  item: OutlayRowRequest,
  create?: boolean
): OutlayRowRequest[] {
  return data.map((current) => {
    if (current.id === item.id) {
      if (create) {
        const newChildItem: OutlayRowRequest = emptyData(current)
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
