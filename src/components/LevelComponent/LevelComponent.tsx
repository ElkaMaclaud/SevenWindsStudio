import React, { FC } from "react";
import { OutlayRowRequest } from "../../type/ProjectType";
import style from "./style/LevelComponent.module.scss";
import EditPage from "../../UI_Components/icons/EditPage";
import Bin from "../../UI_Components/icons/Bin";
import { calculateHeight } from "../../utils/calculateHeight";

const LevelComponent: FC<{
  item: OutlayRowRequest;
  edit: boolean;
  editMode: (item: OutlayRowRequest, create?: boolean) => void;
  deleteRow: (id: number) => void;
}> = ({ item, edit, editMode, deleteRow }) => {

  if (!item.parentId) {
    return (
      <div className={style.levelWrapper}>
        {item.child && item.child.length > 0 ? (
          <div className={style.borderParent}>
            <div className={edit ? style.icon : style.editIcon}>
              <div onClick={() => editMode(item, true)}>
                <EditPage />
              </div>
              <div
                onClick={() => {
                  deleteRow(item.id);
                }}
                className={style.bin}
              >
                <Bin />
              </div>
            </div>
            <div
              style={{ height: `${calculateHeight(item)}px` }}
              className={style.lineContainer}
            ></div>
          </div>
        ) : (
          <div className={style.borderParent}>
            <div className={edit ? style.icon : style.editIcon}>
              <div onClick={() => editMode(item, true)}>
                <EditPage />
              </div>
              <div
                onClick={() => {
                  deleteRow(item.id);
                }}
                className={style.bin}
              >
                <Bin />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={style.levelWrapper}>
      {item.child && item.child.length > 0 ? (
        <div className={style.borderParent}>
          <div className={edit ? style.icon : style.editIcon}>
            <div onClick={() => editMode(item, true)}>
              <EditPage />
            </div>
            <div
              onClick={() => {
                deleteRow(item.id);
              }}
              className={style.bin}
            >
              <Bin />
            </div>
          </div>
          <div
            style={{ height: `${calculateHeight(item)}px` }}
            className={style.lineContainer}
          ></div>
          <div className={style.lineChildContainer}></div>
        </div>
      ) : (
        <div className={style.borderParent}>
          <div className={edit ? style.icon : style.editIcon}>
            <div onClick={() => editMode(item, true)}>
              <EditPage />
            </div>
            <div
              onClick={() => {
                deleteRow(item.id);
              }}
              className={style.bin}
            >
              <Bin />
            </div>
          </div>
          <div className={style.lineChildContainer}></div>
        </div>
      )}
    </div>
  );
};

export default LevelComponent;
