import React from 'react';
import { imgBase } from '../../Constants/DishCoApi';

export class RestHeader extends React.Component  {

    render() {
        return (
            <div className="resto-dt">
                    <div className="resto-detail">
                      <div className="resto-picy">
                        <a href="restaurant_detail.html">
                          <img src={imgBase + this.props.selectedRest.RestaurantLogo} alt="rest logo" />
                        </a>
                      </div>
                      <div className="name-location">
                        <a href="restaurant_detail.html">
                          <h1> {this.props.selectedRest.RestaurantName} </h1>
                        </a>
                        <p>
                          <span>
                            <i className="fas fa-map-marker-alt" />
                          </span>
                          {this.props.selectedRest.Cuisines}
                        </p>
                      </div>
                    </div>
                  </div>
        );
    }
}