import { OutlayRowRequest } from "../type/ProjectType";

export const projects: Array<{name: string, active?: boolean}> = [
  {name: "По проекту"},
  {name: "Щбъекты"},
  {name: "РД"},
  {name: "МТО"},
  {name: "График"},
  {name: "СМР", active: true},
  {name: "МИМ"},
  {name: "Рабочие"},
  {name: "Капвложения"},
  {name: "Бюджет"},
  {name: "Финансирование"},
  {name: "Панорамы"},
  {name: "Поручения"},
  {name: "Контрагенты"},
];


export const project: OutlayRowRequest = {
  id: 0,
  equipmentCosts: 1750,
  estimatedProfit: 1209122.5,
  machineOperatorSalary: 0,
  mainCosts: 0,
  materials: 0,
  mimExploitation: 0,
  overheads: 108.07,
  parentId: null,
  rowName: "Южная строительная площадка",
  salary: 20348,
  supportCosts: 0,
};
// {
//   "current": {
//       "id": 95160,
//       "rowName": "Южная строительная площадка",
//       "total": 0,
//       "salary": 20348,
//       "mimExploitation": 0,
//       "machineOperatorSalary": 0,
//       "materials": 0,
//       "mainCosts": 0,
//       "supportCosts": 0,
//       "equipmentCosts": 1750,
//       "overheads": 108,
//       "estimatedProfit": 1209122
//   },
//   "changed": []
// }
