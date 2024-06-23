import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.scss";
import TableContent from "./components/TableContent/TableContent";
import { useAppDispatch } from "./store/reduxHooks";
import { GET_DATA } from "./store/slice";

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(GET_DATA())
  }, []);
  
  return (
    <div className="app">
      <Header />
      <div className="content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="tableWrapper">
          <div><TableContent /></div>
        </div>
      </div>
    </div>
  );
}

export default App;
