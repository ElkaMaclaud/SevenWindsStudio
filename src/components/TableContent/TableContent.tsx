import React from 'react'
import style from "./style/TableContent.module.scss"

const TableContent = () => {
  return (
    <div  className={style.tableWrapper}>
       <div className={style.tableHeader}>
        <div  className={style.title}>
          <p>Строительно-монтажные работы</p>
        </div>
      </div>
    </div>
  )
}

export default TableContent
