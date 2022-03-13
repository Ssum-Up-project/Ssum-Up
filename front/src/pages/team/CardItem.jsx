import React from "react";
import { Link } from "react-router-dom";
import "./CardItem.css";

function CardItem(props) {
  return (
    <div className="TeamMembers">
      <li className="cards__item">
        <div className="TeamMembers">
          <figure className="cards__item__pic-wrap">
            <img
              className="cards__item__img"
              src={props.src}
              P
              style={{ padding: "10px" }}
            />
          </figure>
          <div className="cards__item__info">
            <h5 style={{ fontSize: "25px" }}>{props.name}</h5>
            <h5>{props.text}</h5>
            <h5>Blog : {props.text1}</h5>
            <h5>GitHub : {props.text2}</h5>
            <h5> {props.text3}</h5>
          </div>
        </div>
      </li>
    </div>
  );
}

export default CardItem;
