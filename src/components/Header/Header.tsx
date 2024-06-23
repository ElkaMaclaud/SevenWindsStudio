import React from 'react'
import NineSquares from '../../UI_Components/icons/NineSquares'
import Arrow from '../../UI_Components/icons/Arrow'
import style from "./style/Header.module.scss"

const Header = () => {
  return (
    <div className={style.headerWrapper}>
      <NineSquares />
      <Arrow />
      <div>Просмотр</div>
      <div>Управление</div>
    </div>
  )
}

export default Header
