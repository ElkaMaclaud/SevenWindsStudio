import React, { KeyboardEvent, useState } from "react";
import style from "./style/Table.module.scss";
import Spinner from "../Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";

import { generateArray } from "../../utils/generateArr";
import LevelComponent from "../LevelComponent/LevelComponent";
import { OutlayRowRequest } from "../../type/ProjectType";
import { CREATE_ROW, DELETE_ROW, UPDATE_ROW } from "../../store/slice";
import { updateData } from "../../utils/updateData";

const Table = () => {
  const { loading, data } = useAppSelector((state) => state.value);
  const [list, setList] = useState(() => generateArray(data))
  const [hover, setHover] = useState(false);
  const dispatch = useAppDispatch()

  const createOrUpdateRow = (e: KeyboardEvent<HTMLTableRowElement>, item: OutlayRowRequest) => {
    dispatch(CREATE_ROW({requestData: item}))
    dispatch(UPDATE_ROW({rID: item.parentId, requestData: item}))
  }

    

  const deleteRow = (id: number) => {
    dispatch(DELETE_ROW({rID: id}))
  }
  const editMode = (item: OutlayRowRequest, create?: boolean) => {
    setList((prev) => updateData(prev, item, create))
  }

  const createCalendarRender = () => {   
    return list.map((item) => {
      if(item.edit) {
        return (
          <tr key={item.id} onKeyDown={(e) => createOrUpdateRow(e, item) }>
            <td
              style={{ paddingLeft: `${20 + (item.padding || 0)}px` }}
              className={style.level}
            >
              <LevelComponent
                item={item}
                hover={hover}
                setHover={setHover}
                editMode={editMode}
                deleteRow={deleteRow}
              />
            </td>
            <td className={style.name}><input type="text" value={item.rowName} /></td>
            <td className={style.salary}><input type="text" value={item.salary} /></td>
            <td className={style.equipment}><input type="text" value={item.equipmentCosts} /></td>
            <td className={style.overhead}><input type="text" value={item.overheads} /></td>
            <td className={style.profit}><input type="text" value={item.estimatedProfit} /></td>
          </tr>
        );
      }
      return (
        <tr key={item.id} onKeyDown={(e) => createOrUpdateRow(e, item) }>
          <td
            style={{ paddingLeft: `${20 + (item.padding || 0)}px` }}
            className={style.level}
          >
            <LevelComponent
              item={item}
              hover={hover}
              setHover={setHover}
              editMode={editMode}
              deleteRow={deleteRow}
            />
          </td>
          <td className={style.name}>{item.rowName}</td>
          <td className={style.salary}>{item.salary}</td>
          <td className={style.equipment}>{item.equipmentCosts}</td>
          <td className={style.overhead}>{item.overheads}</td>
          <td className={style.profit}>{item.estimatedProfit}</td>
        </tr>
      );
    });
  };

  return (
    <div className={style.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th className={style.level}>Уровень</th>
            <th className={style.name}>Наименование работ</th>
            <th className={style.salary}>Основная з/п</th>
            <th className={style.equipment}>Оборудование</th>
            <th className={style.overhead}>Накладные расходы</th>
            <th className={style.profit}>Сметная прибыль</th>
          </tr>
        </thead>
        <tbody>{createCalendarRender()}</tbody>
      </table>
      {loading && (
        <div className={style.spinnerWrapper}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Table;
