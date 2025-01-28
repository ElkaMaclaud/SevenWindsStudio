import React, { useState } from "react";
import style from "./style/Sidebar.module.scss";
import ArrowSmall from "../../UI_Components/icons/ArrowSmall";
import { IProject, projects } from "../../MockupData/Projects";
import ChapterComponent from "../ChapterComponent/ChapterComponent";

const Sidebar = () => {
  const [projectsList, setProjectsList] = useState(projects)
  const sectionSwitch = (name: string) => {
    setProjectsList(projectsList.map((item: IProject) => {
      if (item.name === name) {
        item.selected = true
      } else if (item.selected) {
        item.selected = false
      }
      return item
    }))
  }
  return (
    <div className={style.sidebarWrapper}>
      <div className={style.sidebarHeader}>
        <div>
          <p>Название проекта</p>
          <br /><p>Аббревиатура</p>
        </div>
        <ArrowSmall />
      </div>
      <div className={style.sidebarContent}>
        {projects.map((item) => {
          return (
            <div key={item.name} onClick={() => sectionSwitch(item.name)}>
              <ChapterComponent key={item.name} {...item} />
            </div>)
        })}
      </div>
    </div>
  );
};

export default Sidebar;
