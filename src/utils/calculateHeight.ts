import { OutlayRowRequest } from "../type/ProjectType";

export function calculateHeight(item: OutlayRowRequest): number {
  let summChild = 0;

  function countChildren(item: OutlayRowRequest, count = 0) {
    summChild += item.child.length;
    const newItem = item;

    if (count === 0) {
      newItem.child = newItem.child.slice(0, newItem.child.length - 1);
    }

    newItem.child.forEach((child, ) => {
      countChildren(child, 1);
    });
  }

  countChildren(item);

  return 64 + (summChild - 1) * 73;
}
