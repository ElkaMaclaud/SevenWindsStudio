import { OutlayRowRequest } from "../type/ProjectType";

export function updateGlobalData(
  data: OutlayRowRequest[],
  current: OutlayRowRequest
): OutlayRowRequest[] {
  const updatedData = data.map((item) => {
    if (item.id === current.id) {
      return { ...item, ...current };
    }

    if (item.child?.length) {
      return { ...item, child: updateGlobalData(item.child, current) };
    }
    return item;
  });
  return updatedData;
}

export function updateGlobalState(
    data: OutlayRowRequest[],
    changed: OutlayRowRequest[],
    rID?: number | null, 
    current?:OutlayRowRequest
  ): OutlayRowRequest[] {
    let newData: OutlayRowRequest[] = [...data];
  
    const deleteItem = (items: OutlayRowRequest[]): OutlayRowRequest[] => {
      if (rID) {
        return items.map((item) => {
          if (item.id === rID) {
            return null; 
          }
          if (item.child) {
            return { ...item, child: deleteItem(item.child) }; 
          }
          return item;
        }).filter(Boolean) as OutlayRowRequest[]; 
      }
      return items; 
    };

    newData = deleteItem(newData);

    const findAndAddToChild = (items: OutlayRowRequest[], parentId: number | null, itemToAdd: OutlayRowRequest): OutlayRowRequest[] => {
        return items.map((item) => {
          if (item.id === parentId) {
            return { ...item, child: [...(item.child || []), itemToAdd] }; 
          }
          if (item.child) {
            return { ...item, child: findAndAddToChild(item.child, parentId, itemToAdd) }; 
          }
          return item;
        });
      };
    
      if (current) {
        newData = findAndAddToChild(newData, current.parentId, current);
      }

  
    changed.forEach((item) => {
      newData = updateGlobalData(newData, item);
    });
  
    return newData;
  }

  
  

// Почему-то не работает сколько я не билась:(
// export function updateGlobalState(data: OutlayRowRequest[], changed: OutlayRowRequest[]): OutlayRowRequest[] {
//     let current = [...changed];
//     const updatedData = data.map(item => {
//         const foundItemIndex = current.findIndex(curr => curr.id === item.id);
//         if (foundItemIndex !== -1) {
//             const foundItem = current[foundItemIndex];
//             current.splice(foundItemIndex, 1);
//             return { ...item, ...foundItem };
//         }
//         if (item.child?.length) {
//             return { ...item, child: updateGlobalState(item.child, current) };
//         }
//         return item;
//     });

//     if (current.length === 0 || updatedData.every(item => data.some(d => d.id === item.id))) {
//         return updatedData;
//     } else {
//         return updateGlobalState(updatedData, current);
//     }
// }
