import React from "react";
import "../../css/Team.css";
import CardItem from "../CardItem.js";

function Team() {
  return (
    <div className="cards">
      <h1>팀페이지 샘플</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/img-9.jpg"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,...."
              label="pic 0"
              path="/"
            />
            <CardItem
              src="images/img-9.jpg"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,...."
              label="pic 1"
              path="/"
            />
            <CardItem
              src="images/img-2.jpg"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,...."
              label="pic 2"
              path="/"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/img-3.jpg"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,...."
              label="pic 3"
              path="/"
            />
            <CardItem
              src="images/img-4.jpg"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,...."
              label="pic 4"
              path="/products"
            />
            <CardItem
              src="images/img-8.jpg"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,...."
              label="pic 5"
              path="/sign-up"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Team;
