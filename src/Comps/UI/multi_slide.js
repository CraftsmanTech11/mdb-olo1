import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { imgBase } from "../../Constants/OloApi";

export const MultiSlide = props => {
  const { srcList } = props;
  const handleOnDragStart = e => e.preventDefault();
  const config = {
    stagePadding: {
      paddingLeft: 10, // in pixels
      paddingRight: 10
    },
    autoPlay: true,
    duration: 2000,
    mouseTrackingEnabled: false,
    responsive: {
      0: {
        items: 1
      },
      1024: {
        items: 3
      },
      768: {
        items: 2
      }
    }
  };
  return (
    <AliceCarousel mouseTrackingEnabled {...config}>
      {srcList.length &&
        srcList.map((obj, i) => {
          return (
            <img
              key={i}
              src={imgBase + obj.ImageName}
              alt=""
              onDragStart={handleOnDragStart}
              className="slice img-fluid"
            />
          );
        })}
    </AliceCarousel>
  );
};
