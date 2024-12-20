import React, { useState } from "react";
import styles from "./Accomboard.module.css";

const RestaurantCard = (props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={styles.flightcard}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.imgwrapper}>
        <img
          className={styles.hotelimg}
          src={props.restaurantImg}
          alt={props.restaurant}
        />
        <div
          className={`${styles.details} ${hovered ? styles.showDetails : ""}`}
        >
          <p>{props.details}</p>
        </div>
      </div>

      <div
        style={{ paddingLeft: "20px", marginTop: "-5px", textAlign: "left" }}
      >
        <p style={{ paddingTop: "20px" }}>
          <span style={{ fontWeight: "bolder" }}>{props.restaurant}</span>
          <br />
          <span>{props.tier}</span>
        </p>

        <h5>
          SGD<span style={{ color: "var(--submain)" }}>{props.price}</span>
        </h5>
      </div>

      <div className={styles.accombtndiv}>
        <button
          className={styles.accombtn}
          style={props.btnStyle}
          onClick={props.onClick}
        >
          {props.btnMsg}
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
