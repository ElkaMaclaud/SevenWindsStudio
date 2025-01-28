import React, { FC, memo } from 'react'
import Dashboard from '../../UI_Components/icons/Dashboard'
import style from "./style/ChapterComponent.module.scss";
import { IProject } from '../../MockupData/Projects';

const ChapterComponent: FC<IProject> = memo(({name, selected}) => {
    return (
        <div key={Math.random().toString(36).substring(2, 15)}
            className={selected ? style.projects_active : style.projects}>
            <Dashboard />
            <div>{name}</div>
        </div>
    )
})

export default ChapterComponent
