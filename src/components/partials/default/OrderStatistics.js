import React from "react";
import { Card } from "reactstrap";
import { DefaultOrderStatistics } from "../charts/default/DefaultCharts";

const OrderStatistics = () => {
  return (
    <Card className="card-full overflow-hidden">
      <div className="nk-ecwg nk-ecwg7 h-100">
        <div className="card-inner flex-grow-1">
          <div className="card-title-group mb-4">
            <div className="card-title">
              <h6 className="title">Student Age Backet On Madya Pradesh:</h6>
            </div>
          </div>
          <div className="nk-ecwg7-ck">
            <DefaultOrderStatistics />
          </div>
          <ul className="nk-ecwg7-legends">
            <li>
              <div className="title">
                <span className="dot dot-lg sq" style={{ background: "#ff0000" }}></span>
                <span>Junior</span>
              </div>
            </li>
            <li>
              <div className="title">
                <span className="dot dot-lg sq" style={{ background: "#00FF00" }}></span>
                <span>Sub Senior</span>
              </div>
            </li>
            <li>
              <div className="title">
                <span className="dot dot-lg sq" style={{ background: "#FFFF00" }}></span>
                <span>Mid Senior</span>
              </div>
            </li>
			<li>
              <div className="title">
                <span className="dot dot-lg sq" style={{ background: "#733aea" }}></span>
                <span>Senior</span>
              </div>
            </li>
			
          </ul>
        </div>
      </div>
    </Card>
  );
};
export default OrderStatistics;
