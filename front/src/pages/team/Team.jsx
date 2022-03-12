import React from "react";
import "./Team.css";
import CardItem from "./CardItem";
import Introduction from "./Introduction";
import Layout from "../../Layout";

function Team() {
  return (
    <Layout>
      <div className="Team">
        <div className="cards">
          <Introduction />
          <div className="cards__container">
            <div className="cards__wrapper">
              <ul className="cards__items">
                <CardItem src="" text="이상지" label="이상지" path="/" />
                <CardItem text="이슬아" label="pic 0" path="/" />
                <CardItem src="" text="박진화" label="pic 2" path="/" />
              </ul>
              <ul className="cards__items">
                <CardItem src="" text="김승수" label="pic 3" path="/" />
                <CardItem
                  src=""
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,...."
                  label="pic 4"
                  path="/products"
                />
                <CardItem
                  src=""
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,...."
                  label="pic 5"
                  path="/sign-up"
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Team;
