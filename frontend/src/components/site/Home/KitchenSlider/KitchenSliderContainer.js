import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import KitchenSliderItem from "./KitchenSliderItem";
import { SectionBox, SectionHeader } from "../../../../utils/constants/Styles";

// service call
import * as homeService from "../../services/homeService";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// local Images
import K1 from "../../../../assets/img/k1.png";
import K2 from "../../../../assets/img/k2.png";
import K3 from "../../../../assets/img/k3.png";

const KitchenSliderContainer = (props) => {
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
  };

  const [cookList, setCookList] = useState([]);
    
  useEffect(() => {
      getCookList();
  }, [props.latitude, props.longitude]);
  
  const getCookList = () => {
      const data = {
          page: 1,
          perPage: 10,
          latitude: props.latitude,
          longitude: props.longitude,
      };
      homeService.cookList(data)
      .then((response) => {
          setCookList(response.data.list);
      }).catch((e) => {
          console.log(e);
      });
  };

  return (
    <SectionBox
      mb={3}
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
      }}
    >
      <SectionHeader marginBottom={"10px"}>Top popular kitchen</SectionHeader>

      <Carousel
        responsive={responsive}
        infinite={false}
        focusOnSelect={true}
        partialVisible={true}
        autoPlaySpeed={3000}
        centerMode={false}
        className="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {cookList.map((slider) => {
          return <KitchenSliderItem slider={slider} props={props} />;
        })}
      </Carousel>
    </SectionBox>
  );
};

export default KitchenSliderContainer;

const data = [
  {
    id: 1,
    img: K1,
    title: "House of food",
    timings: "Breakfast, Lunch, Dinner, Snacks",
    address: "Coimbatore,India",
  },
  {
    id: 2,
    img: K2,
    title: "House of food",
    timings: "Breakfast, Lunch, Dinner, Snacks",
    address: "Coimbatore,India",
  },
  {
    id: 3,
    img: K3,
    title: "House of food",
    timings: "Breakfast, Lunch, Dinner, Snacks",
    address: "Coimbatore,India",
  },
  {
    id: 4,
    img: K1,
    title: "House of food",
    timings: "Breakfast, Lunch, Dinner, Snacks",
    address: "Coimbatore,India",
  },
  {
    id: 5,
    img: K2,
    title: "House of food",
    timings: "Breakfast, Lunch, Dinner, Snacks",
    address: "Coimbatore,India",
  },
  {
    id: 1,
    img: K1,
    title: "House of food",
    timings: "Breakfast, Lunch, Dinner, Snacks",
    address: "Coimbatore,India",
  },
  {
    id: 2,
    img: K2,
    title: "House of food",
    timings: "Breakfast, Lunch, Dinner, Snacks",
    address: "Coimbatore,India",
  },
  {
    id: 3,
    img: K3,
    title: "House of food",
    timings: "Breakfast, Lunch, Dinner, Snacks",
    address: "Coimbatore,India",
  },
  {
    id: 4,
    img: K1,
    title: "House of food",
    timings: "Breakfast, Lunch, Dinner, Snacks",
    address: "Coimbatore,India",
  },
  {
    id: 5,
    img: K2,
    title: "House of food",
    timings: "Breakfast, Lunch, Dinner, Snacks",
    address: "Coimbatore,India",
  },
];
