import { OutlayRowRequest } from "../type/ProjectType";
export function updateGlobalState(
  data: OutlayRowRequest[],
  changed: OutlayRowRequest[],
  rID?: number | null,
  current?: OutlayRowRequest
): OutlayRowRequest[] {

    const result: OutlayRowRequest[] = [];
    if (data.length === 0 && current) {
      result.push({...current, child: []})
    } else {
      for (let item of data) {
        let updatedItem = item;
        const foundItemIndex = changed.findIndex((curr) => curr.id === updatedItem.id);
  
        if (foundItemIndex > -1) {
          const foundItem = changed[foundItemIndex];
          changed.splice(foundItemIndex, 1);
          updatedItem = { ...updatedItem, ...foundItem };
        }
  
        if (rID && updatedItem.id === rID) {
          continue; 
        }
  
        if (current && updatedItem.id === current.parentId) {
          updatedItem = { ...updatedItem, child: [...(updatedItem.child || []), current] };
        }
  
        if (updatedItem.child && updatedItem.child.length) {
          updatedItem = { ...updatedItem, child: updateGlobalState(updatedItem.child, changed, rID, current) };
        }
  
        result.push(updatedItem);
      }
    }
    return result;
  };




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


