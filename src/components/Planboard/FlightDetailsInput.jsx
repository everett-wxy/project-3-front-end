import React, { useState, useContext } from "react";
import styles from "./PlanBoard.module.css";
import { FlightContext } from "../context/FlightContext";
import LoadingSpinner from "./LoadingSpinner";

const FlightDetailsInput = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cabinClass, setCabinClass] = useState("ECONOMY");
  const { setDepartureFlightData, setArrivalFlightData } =
    useContext(FlightContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted"); // Check if the form submission is detected
    const departureUrl = `http://localhost:5001/WanderGoWhere/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&cabinClass=${cabinClass}`;
    const arrivalUrl = `http://localhost:5001/WanderGoWhere/flights?origin=${destination}&destination=${origin}&departureDate=${returnDate}&cabinClass=${cabinClass}`;
    setIsLoading(true);
    try {
      // Fetch both departure and arrival data in parallel
      const [departureResponse, arrivalResponse] = await Promise.all([
        fetch(departureUrl),
        fetch(arrivalUrl),
      ]);

      // Check if the response is OK before attempting to parse JSON
      if (!departureResponse.ok) {
        throw new Error(
          `Failed to fetch departure data, status: ${departureResponse.status}`
        );
      }
      if (!arrivalResponse.ok) {
        throw new Error(
          `Failed to fetch arrival data, status: ${arrivalResponse.status}`
        );
      }

      const departureFlightData = await departureResponse.json();
      const arrivalFlightData = await arrivalResponse.json();
      setDepartureFlightData(departureFlightData);
      setArrivalFlightData(arrivalFlightData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching flight data:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.flightdetailsinput}>
      <h1>Flight Search</h1>
      {isLoading ? <LoadingSpinner /> : null}
      <form className={styles.flightform} onSubmit={handleSubmit}>
        <div className={styles.flightformcity}>
          <div>
            <label>Origin:</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Enter origin airport"
            />
          </div>
          <div>
            <label>Destination:</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination airport"
            />
          </div>

          <div>
            <label>Departure Date:</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
          <div>
            <label>Return Date:</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.cabinselection}>
          <label>Cabin Class:</label>
          <select
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
          >
            <option value="ECONOMY">Economy</option>
            <option value="BUSINESS">Business</option>
          </select>
        </div>
        <button
          style={{
            borderRadius: "0 0 20px 20px",
            boxShadow: "0 8px 18px rgba(0, 0, 0, 0.6)",
          }}
          type="submit"
        >
          Search Flights
        </button>
      </form>
    </div>
  );
};
export default FlightDetailsInput;
