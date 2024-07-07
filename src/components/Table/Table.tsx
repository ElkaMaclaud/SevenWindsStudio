import React, {
  ChangeEvent,
  FC,
  FocusEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import style from "./style/Table.module.scss";
import Spinner from "../Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";

import LevelComponent from "../LevelComponent/LevelComponent";
import { OutlayRowRequest } from "../../type/ProjectType";
import { CREATE_ROW, DELETE_ROW, UPDATE_ROW } from "../../store/slice";
import { updateData } from "../../utils/updateData";
import { inputDataChecking } from "../../utils/inputDataChecking";
import { emptyData } from "../../utils/EmptyData";

const Table = () => {
  const { loading, data } = useAppSelector((state) => state.value);
  const [list, setList] = useState(data);
  const [edit, setEdit] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setList(data);
  }, [data]);

  const createNewRow = (
    e: KeyboardEvent<HTMLTableRowElement>,
    inputData: OutlayRowRequest
  ) => {
    if (e.key === "Enter") {
      setEdit(false);
      setList(() => [...data]);
      if (inputData.id === 0) {
        dispatch(CREATE_ROW({ requestData: inputData }));
      } else {
        dispatch(UPDATE_ROW({ rID: inputData.id, requestData: inputData }));
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
    setList(() => updateData(data, item, create));
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

    // Чтобы клиент понимал, что поле заполнится 0 в случае пустого поля
    const handleBlur = (e: FocusEvent<HTMLInputElement>, key: string) => {
      setValue((prev) => ({ ...prev, [key]: e.target.value || 0 }));
    };
    return (
      <tr
        onKeyDown={(e) =>
          createNewRow(e, { ...item, ...inputDataChecking(value) })
        }
      >
        <td
          style={{ paddingLeft: `${20 + (item.padding || 0)}px` }}
          className={style.editTd}
        >
          <LevelComponent
            item={item}
            edit={(list.length === 0 && true) || edit}
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
            onBlur={(e) => handleBlur(e, "salary")}
            type="text"
            value={value.salary}
          />
        </td>
        <td className={style.editTd}>
          <input
            onChange={(e) => handleChange(e, "equipmentCosts")}
            onBlur={(e) => handleBlur(e, "equipmentCosts")}
            type="text"
            value={value.equipmentCosts}
          />
        </td>
        <td className={style.editTd}>
          <input
            onChange={(e) => handleChange(e, "overheads")}
            onBlur={(e) => handleBlur(e, "overheads")}
            type="text"
            value={value.overheads}
          />
        </td>
        <td className={style.editTd}>
          <input
            onChange={(e) => handleChange(e, "estimatedProfit")}
            onBlur={(e) => handleBlur(e, "estimatedProfit")}
            type="text"
            value={value.estimatedProfit}
          />
        </td>
      </tr>
    );
  };

  const createTableRender = (items: OutlayRowRequest[]) => {
    const renderItems = (
      items: OutlayRowRequest[],
      padding: number = 0,
      parentId: number | null = null
    ) => {
      if (items.length === 0) {
        return (
          <InputRow
            item={emptyData()}
            key={Math.random().toString(36).substring(2, 15)}
          />
        );
      }
      return items.map((item) => {
        const children =
          item.child && item.child.length > 0
            ? renderItems(item.child, padding + 20, item.id)
            : null;
        if (item.edit) {
          return (
            <React.Fragment key={item.id}>
              <InputRow item={{ ...item, parentId, padding }} key={item.id} />
              {children}
            </React.Fragment>
          );
        }
        return (
          <React.Fragment key={item.id}>
            <tr
              onDoubleClick={() => editMode(item)}
              style={{ cursor: `${edit ? "auto" : "pointer"}` }}
            >
              <td
                style={{ paddingLeft: `${20 + padding}px` }}
                className={style.level}
              >
                <LevelComponent
                  item={{ ...item, parentId }}
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
            {children}
          </React.Fragment>
        );
      });
    };

    return renderItems(items);
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
        <tbody>{createTableRender(list)}</tbody>
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
