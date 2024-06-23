import React from "react";
import style from "./style/Sidebar.module.scss";
import ArrowSmall from "../../UI_Components/icons/ArrowSmall";
import { projects } from "../../MockupData/Projects";
import Dashboard from "../../UI_Components/icons/Dashboard";

const Sidebar = () => {
  return (
    <div className={style.sidebarWrapper}>
      <div className={style.sidebarHeader}>
        <div>
          <p>Название проекта</p>
          <br/><p>Аббревиатура</p>
        </div>
        <ArrowSmall />
      </div>
      <div className={style.sidebarContent}>
        {projects.map((item)=> {
            return <div key={Math.random().toString(36).substring(2, 15)} className={style.projects}>
                <Dashboard />
                <div>{item}</div>
            </div>
        })}
      </div>
    </div>
  );
};

export default Sidebar;
