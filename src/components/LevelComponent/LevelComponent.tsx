import React, { Dispatch, FC } from "react";
import { OutlayRowRequest } from "../../type/ProjectType";
import style from "./style/LevelComponent.module.scss";
import EditPage from "../../UI_Components/icons/EditPage";
import Bin from "../../UI_Components/icons/Bin";

const LevelComponent: FC<{
  item: OutlayRowRequest;
  hover: boolean;
  setHover: Dispatch<React.SetStateAction<boolean>>;
  editMode: (item: OutlayRowRequest, create?: boolean) => void;
  deleteRow: (id: number) => void;
}> = ({ item, hover, setHover, editMode, deleteRow }) => {
  if (!item.parentId) {
    return (
      <div>
        {item.child && item.child.length > 0 ? (
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={style.borderParent}
          >
            <div className={!hover ? style.editIcon : style.editIcon_hover}>
              <div onClick={() =>editMode(item, true)} onDoubleClick={() => editMode(item)}>
                <EditPage />
              </div>
              {hover && (
                <div
                  onClick={() => {
                    deleteRow(item.id);
                  }}
                  className={style.bin}
                >
                  <Bin />
                </div>
              )}
            </div>
            <div
              style={{ height: `${44 * item.child.length + 12}px` }}
              className={style.lineContainer}
            ></div>
          </div>
        ) : (
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={style.borderParent}
          >
            <div className={!hover ? style.editIcon : style.editIcon_hover}>
            <div onClick={() =>editMode(item, true)} onDoubleClick={() => editMode(item)}>
                <EditPage />
              </div>
              {hover && (
                <div
                  onClick={() => {
                    deleteRow(item.id);
                  }}
                  className={style.bin}
                >
                  <Bin />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div>
      {item.child && item.child.length > 0 ? (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={style.borderParent}
        >
          <div className={!hover ? style.editIcon : style.editIcon_hover}>
          <div onClick={() =>editMode(item, true)} onDoubleClick={() => editMode(item)}>
              <EditPage />
            </div>
            {hover && (
              <div
                onClick={() => {
                  deleteRow(item.id);
                }}
                className={style.bin}
              >
                <Bin />
              </div>
            )}
          </div>
          <div
            style={{ height: `${44 * item.child.length + 12}px` }}
            className={style.lineContainer}
          ></div>
          <div className={style.lineChildContainer}></div>
        </div>
      ) : (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={style.borderParent}
        >
          <div className={!hover ? style.editIcon : style.editIcon_hover}>
          <div onClick={() =>editMode(item, true)} onDoubleClick={() => editMode(item)}>
              <EditPage />
            </div>
            {hover && (
              <div
                onClick={() => {
                  deleteRow(item.id);
                }}
                className={style.bin}
              >
                <Bin />
              </div>
            )}
          </div>
          <div className={style.lineChildContainer}></div>
        </div>
      )}
    </div>
  );
};

export default LevelComponent;
