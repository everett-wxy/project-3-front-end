import React from "react";
import PlanboardDisplay from "./PlanboardDisplay";
import styles from "./Planboard.module.css";
import BudgetBar from "./BudgetBar";
import { TripProvider } from "../context/TripContext";
import { FlightProvider } from "../context/FlightContext";
import TripName from "./TripName";

const Planboard = () => {
  return (
    <TripProvider>
      <FlightProvider>
        <div className={styles.planboard}>
          <div style={{ marginTop: "180px", marginBottom: "250px" }}></div>
          <BudgetBar />
          <TripName />
          <PlanboardDisplay />
        </div>
      </FlightProvider>
    </TripProvider>
  );
};

export default Planboard;
