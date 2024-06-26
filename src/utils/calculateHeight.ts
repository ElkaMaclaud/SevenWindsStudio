// import { OutlayRowRequest } from "../type/ProjectType";

// interface OutlayRowRequestT {
//   id: string;
//   parentId: number | null;
//   parent: OutlayRowRequest | null;
//   child: OutlayRowRequestT[];
//   // другие поля
// }

// function createOutlayRowRequest(
//   parentId: string | null,
//   child: OutlayRowRequestT[],
//   items: OutlayRowRequest[]
// ): OutlayRowRequest {
//   const newItem: OutlayRowRequest = {
//     id: Math.random(), // функция для генерации уникального id
//     parentId,
//     parent: null,
//     child,
//     // другие поля
//   };

//   // Устанавливаем ссылку на родителя
//   if (parentId) {
//     const parent = items.find(i => i.id === parentId);
//     if (parent) {
//       newItem.parent = parent;
//       parent.child.push(newItem);
//     }
//   }

//   // добавляем новый элемент в массив items
//   items.push(newItem);

//   return newItem;
// }


// export function calculateHeight(item: OutlayRowRequest): number {
//   let summChild = 0;

//   function isLastChild(item: OutlayRowRequest, parent: OutlayRowRequestT | null): boolean {
//     if (!parent || parent.child.length === 0 || parent.child[parent.child.length - 1] !== item) {
//       return false;
//     }
  
//     if (parent.parentId) {
//       return isLastChild(parent, parent.parent);
//     }
//     return true;
//   }
  

//   function countChildren(item: OutlayRowRequest, parent: OutlayRowRequest | null) {
//     if (isLastChild(item, parent)) {
//       return;
//     }

//     summChild += item.child.length;

//     item.child.forEach(child => {
//       countChildren(child, item);
//     });
//   }

//   countChildren(item, null);

//   return 64 + (summChild - 1) * 73;
// }


import { OutlayRowRequest } from "../type/ProjectType";

export function calculateHeight(item: OutlayRowRequest): number {
    let summChild = 0;

  function isLastChild(item: OutlayRowRequest, parent: OutlayRowRequest): boolean {
    return parent.child[parent.child.length - 1] === item;
    
  }

  function countChildren(item: OutlayRowRequest, parent: OutlayRowRequest) {
    if (isLastChild(item, parent)) {
      return;
    }

    summChild += item.child.length;

    item.child.forEach(child => {
      countChildren(child, item);
    });
  }

  countChildren(item, {...item, child: [] });
  
    return 64 + (summChild - 1) * 73;
  }