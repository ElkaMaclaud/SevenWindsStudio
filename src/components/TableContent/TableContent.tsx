import React from "react";
import style from "./style/TableContent.module.scss";
import Table from "../Table/Table";

const TableContent = () => {
  return (
    <div className={style.tableWrapper}>
      <div className={style.tableHeader}>
        <div className={style.title}>
          <p>Строительно-монтажные работы</p>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default TableContent;
