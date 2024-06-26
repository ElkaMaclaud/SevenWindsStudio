import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
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
  const [list, setList] = useState(() => generateArray(data));
  const [edit, setEdit] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setList(() => generateArray(data));
  }, [data]);

  const createNewRow = (
    e: KeyboardEvent<HTMLTableRowElement>,
    inputData: OutlayRowRequest
  ) => {
    if (e.key === "Enter") {
      setEdit(false);
      setList(() => generateArray(data));
      if (inputData.id === 0) {
        dispatch(CREATE_ROW({ requestData: inputData }));
      } else {
        dispatch(
          UPDATE_ROW({ rID: inputData.id, requestData: inputData })
        );
      }
    }
  };

  const deleteRow = (id: number) => {
    dispatch(DELETE_ROW({ rID: id }));
  };
  const editMode = (item: OutlayRowRequest, create?: boolean) => {
    if (edit) {
      return;
    }
    setEdit(true);
    setList(() => generateArray(updateData(data, item, create)));
  };
  const InputRow: FC<{ item: OutlayRowRequest }> = ({ item }) => {
    const [value, setValue] = useState({
      rowName: item.rowName,
      salary: item.salary,
      equipmentCosts: item.equipmentCosts,
      overheads: item.overheads,
      estimatedProfit: item.estimatedProfit,
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
      let val = e.target.value;
      if (key !== "rowName") {
        val = val.replace(/\D/g, "");
        e.target.value = val;
      }
      setValue((prev) => ({ ...prev, [key]: e.target.value }));
    };
    return (
      <tr onKeyDown={(e) => createNewRow(e, { ...item, ...value })}>
        <td
          style={{ paddingLeft: `${20 + (item.padding || 0)}px` }}
          className={style.editTd}
        >
          <LevelComponent
            item={item}
            edit={edit}
            editMode={editMode}
            deleteRow={deleteRow}
          />
        </td>
        <td className={style.editTd}>
          <input
            onChange={(e) => handleChange(e, "rowName")}
            type="text"
            value={value.rowName}
          />
        </td>
        <td className={style.editTd}>
          <input
            onChange={(e) => handleChange(e, "salary")}
            type="text"
            value={value.salary}
          />
        </td>
        <td className={style.editTd}>
          <input
            onChange={(e) => handleChange(e, "equipmentCosts")}
            type="text"
            value={value.equipmentCosts}
          />
        </td>
        <td className={style.editTd}>
          <input
            onChange={(e) => handleChange(e, "overheads")}
            type="text"
            value={value.overheads}
          />
        </td>
        <td className={style.editTd}>
          <input
            onChange={(e) => handleChange(e, "estimatedProfit")}
            type="text"
            value={value.estimatedProfit}
          />
        </td>
      </tr>
    );
  };

  const createCalendarRender = () => {
    return list.map((item) => {
      if (item.edit) {
        return <InputRow item={item} key={item.id} />;
      }
      return (
        <tr
          key={item.id}
          onDoubleClick={() => editMode(item)}
          style={{ cursor: `${edit ? "auto" : "pointer"}` }}
        >
          <td
            style={{ paddingLeft: `${20 + (item.padding || 0)}px` }}
            className={style.level}
          >
            <LevelComponent
              item={item}
              edit={edit}
              editMode={editMode}
              deleteRow={deleteRow}
            />
          </td>
          <td className={style.editTd}>
            <div>{item.rowName}</div>
          </td>
          <td className={style.editTd}>
            <div>{item.salary}</div>
          </td>
          <td className={style.editTd}>
            <div>{item.equipmentCosts}</div>
          </td>
          <td className={style.editTd}>
            <div>{item.overheads}</div>
          </td>
          <td className={style.editTd}>
            <div>{item.estimatedProfit}</div>
          </td>
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
