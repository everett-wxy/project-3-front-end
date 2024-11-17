import React from "react";
import PlanboardDisplay from "./PlanboardDisplay";
import styles from "./Planboard.module.css";
import FlightDetailsInput from "./FlightDetailsInput";
import BudgetBar from "./BudgetBar";
import { FlightProvider } from "../context/FlightContext";

const Planboard = () => {
  return (
    <FlightProvider>
      <div className={styles.planboard}>
        <div style={{ marginTop: "200px" }}></div>
        <BudgetBar />
        <FlightDetailsInput />
        <PlanboardDisplay />
      </div>
    </FlightProvider>
  );
};

export default Planboard;
