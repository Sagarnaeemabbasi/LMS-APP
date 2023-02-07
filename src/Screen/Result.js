import React from "react";
import MyTable from "../Components/MyTable";
import { getData } from "../Config/FirebaseMethod";
import { useState } from "react";
import Loader from "../Components/Loader";

export default function Result() {
  const [topNames, setTopNames] = useState([]);
  const [rowsData, setRowsData] = useState([]);
  const [loader, setLoader] = useState(false);
  const getResultList = () => {
    setLoader(true);
    getData("Results")
      .then((suc) => {
        setRowsData(suc);
        const firstElement = suc[0];
        const keys = Object.keys(firstElement);
        setTopNames([...keys]);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };
  React.useEffect(() => {
    getResultList();
  }, []);

  return loader ? (
    <>
      <Loader />
    </>
  ) : (
    <div>
      <MyTable rowsData={rowsData} columnsData={topNames} />
    </div>
  );
}
