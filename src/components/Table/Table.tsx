import React from "react";
import style from "./style/Table.module.scss";
import Spinner from "../Spinner/Spinner";
import { useAppSelector } from "../../store/reduxHooks";

const Table = () => {
  const { loading } = useAppSelector((state) => state.value);
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
        {/* <tbody>{createCalendarRender()}</tbody> */}
      </table>
      {/* {loading && (
    //       <div className={style.spinnerWrapper}>
    //         <Spinner />
    //       </div>
    //     )} */}
    </div>
  );
};

export default Table;
