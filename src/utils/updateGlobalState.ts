import { OutlayRowRequest } from "../type/ProjectType";
export function updateGlobalState(
  data: OutlayRowRequest[],
  changed: OutlayRowRequest[],
  rID?: number | null,
  current?: OutlayRowRequest
): OutlayRowRequest[] {
  const updateGlobalData = (
    inputData: OutlayRowRequest[],
    changed: OutlayRowRequest[]
  ): OutlayRowRequest[] => {
    const result: OutlayRowRequest[] = [];

    for (let item of inputData) {
      let updatedItem = item;
      const foundItemIndex = changed.findIndex((curr) => curr.id === item.id);

      if (foundItemIndex > -1) {
        const foundItem = changed[foundItemIndex];
        changed.splice(foundItemIndex, 1);
        updatedItem = { ...item, ...foundItem };
      }

      if (rID && item.id === rID) {
        continue; 
      }

      if (current && item.id === current.parentId) {
        updatedItem = { ...updatedItem, child: [...(updatedItem.child || []), current] };
      }

      if (item.child && item.child.length) {
        updatedItem = { ...updatedItem, child: updateGlobalData(item.child, changed) };
      }

      result.push(updatedItem);
    }

    return result;
  };

  return updateGlobalData(data, changed);
}



// const deleteItem = (
//   items: OutlayRowRequest[],
//   rID?: number
// ): OutlayRowRequest[] => {
//   return items.filter(item => {
//     if (item.id === rID) {
//       return false;
//     }
//     if (item.child.length) {
//       item.child = deleteItem(item.child, rID);
//     }
//     return true;
//   });
// };


// const findAndAddToChild = (
//   items: OutlayRowRequest[],
//   parentId: number | null,
//   itemToAdd: OutlayRowRequest
// ): OutlayRowRequest[] => {
//   return items.map((item) => {
//     if (item.id === parentId) {
//       return { ...item, child: [...(item.child || []), itemToAdd] };
//     }
//     if (item.child) {
//       return {
//         ...item,
//         child: findAndAddToChild(item.child, parentId, itemToAdd),
//       };
//     }
//     return item;
//   });
// };

// export function updateGlobalState(
//   data: OutlayRowRequest[],
//   changed: OutlayRowRequest[],
//   rID?: number | null,
//   current?: OutlayRowRequest
// ): OutlayRowRequest[] {
//   const updateGlobalData = (
//     inputData: OutlayRowRequest[],
//     changed: OutlayRowRequest[]
//   ): OutlayRowRequest[] => {
//     return inputData.map((item) => {
//       let updatedItem = item;
//       const foundItemIndex = changed.findIndex((curr) => curr.id === item.id);
//       if (foundItemIndex > -1) {
//         const foundItem = changed[foundItemIndex]
//         changed.splice(foundItemIndex, 1)
//         updatedItem = { ...item, ...foundItem };
//       }
//       if (updatedItem.child && updatedItem.child.length) {
//         updatedItem = { ...updatedItem, child: updateGlobalData(updatedItem.child, changed) };
//       }
//       return updatedItem;
//     });
//   };

//   let newData = updateGlobalData(data, changed);


//   if (rID) {
//     newData = deleteItem(newData, rID);
//   }

//   if (current) {
//     newData = findAndAddToChild(newData, current.parentId, current);
//   }

//   return newData;
// }


