import React from "react";
import style from "./style/Table.module.scss"

const Table = () => {
  return (
    <div>
      <table className={style.wrapperCalendarTable}>
        <thead>
          <tr>
            <th>Пн</th>
            <th>Вт</th>
            <th>Ср</th>
            <th>Чт</th>
            <th>Пт</th>
            <th>Сб</th>
            <th>Вс</th>
          </tr>
        </thead>
        {/* {loading && (
          <div className={style.spinnerWrapper}>
            <Spinner />
          </div>
        )} */}
        {/* <tbody>{createCalendarRender()}</tbody> */}
      </table>
    </div>
  );
};

export default Table;
