
import gmail_logo from "./gmail_logo.svg";
import facebook_logo from "./facebook_logo.svg";
import instagram_logo from "./instagram_logo.svg";
import twitter_logo from "./twitter_logo.svg";
import menu_icon from "./menu_icon.svg";
import search_icon from "./search_icon.svg"
import close_icon from "./close_icon.svg"
import users_icon from "./users_icon.svg"
import car_icon from "./car_icon.svg"
import location_icon from "./location_icon.svg"
import fuel_icon from "./fuel_icon.svg"
import addIcon from "./addIcon.svg"
import carIcon from "./carIcon.svg"
import carIconColored from "./carIconColored.svg"
import dashboardIcon from "./dashboardIcon.svg"
import dashboardIconColored from "./dashboardIconColored.svg"
import addIconColored from "./addIconColored.svg"
import listIcon from "./listIcon.svg"
import listIconColored from "./listIconColored.svg"
import cautionIconColored from "./cautionIconColored.svg"
import arrow_icon from "./arrow_icon.svg"
import star_icon from "./star_icon.svg"
import check_icon from "./check_icon.svg"
import tick_icon from "./tick_icon.svg"
import delete_icon from "./delete_icon.svg"
import eye_icon from "./eye_icon.svg"
import eye_close_icon from "./eye_close_icon.svg"
import filter_icon from "./filter_icon.svg"
import edit_icon from "./edit_icon.svg"
import calendar_icon_colored from "./calendar_icon_colored.svg"
import location_icon_colored from "./location_icon_colored.svg"
import testimonial_image_1 from "./testimonial_image_1.png"
import testimonial_image_2 from "./testimonial_image_2.png"
import main_car from "./main_car.png"
import banner_car_image from "./banner_car_image.png"
import user_profile from "./user_profile.png"
import upload_icon from "./upload_icon.svg"
import car_image1 from "./car_image1.png"
import car_image2 from "./car_image2.png"
import car_image3 from "./car_image3.png"
import car_image4 from "./car_image4.png"
import Bike from "./Bike.png"
import Car from "./Car.png"
import Auto from "./Auto.png"
import Scooty from "./Scooty.png"
import Location from "./searchLocation.png"

import person from "./person.png"

import ScootyBike from "./ScootyBike.png"
import Minicar from "./miniCar.png"
import MotorBike from "./motorbike.png"
import AutoRickshaw from "./AutoRickshaw.png"
import VechTake from "./VechTake.png"

export const cityList = ['New York', 'Los Angeles', 'Houston', 'Chicago']

export const assets = {
    VechTake,
    Location,
    ScootyBike,
    Minicar,
    MotorBike,
    AutoRickshaw,
    person,
    Bike,
    Car,
    Auto,
    Scooty,
    
    gmail_logo,
    facebook_logo,
    instagram_logo,
    twitter_logo,
    menu_icon,
    search_icon,
    close_icon,
    users_icon,
    edit_icon,
    car_icon,
    location_icon,
    fuel_icon,
    addIcon,
    carIcon,
    carIconColored,
    dashboardIcon,
    dashboardIconColored,
    addIconColored,
    listIcon,
    listIconColored,
    cautionIconColored,
    calendar_icon_colored,
    location_icon_colored,
    arrow_icon,
    star_icon,
    check_icon,
    tick_icon,
    delete_icon,
    eye_icon,
    eye_close_icon,
    filter_icon,
    testimonial_image_1,
    testimonial_image_2,
    main_car,
    banner_car_image,
    car_image1,
    upload_icon,
    user_profile,
    car_image2,
    car_image3,
    car_image4
}



export const ownerMenuLinks = [
    { name: "Dashboard", path: "/owner", icon: dashboardIcon, coloredIcon: dashboardIconColored },
    { name: "Add Vechical", path: "/owner/addvechical", icon: addIcon, coloredIcon: addIconColored },
    { name: "Manage Vechicals", path: "/owner/ownervechicals", icon: carIcon, coloredIcon: carIconColored },
    { name: "Manage Bookings", path: "/owner/bookings", icon: listIcon, coloredIcon: listIconColored },
]

export const adminMenuLinks = [
  {
    name: "Dashboard",
    path: "/admin",
    // icon: assets.dashboard_icon,
    // coloredIcon: assets.dashboard_colored_icon
  },
  {
    name: "Manage Users",
    path: "/admin/users",
    // icon: assets.user_icon,
    // coloredIcon: assets.user_colored_icon
  },
  {
    name: "Manage Agencies",
    path: "/admin/agencies",
    // icon: assets.agency_icon,
    // coloredIcon: assets.agency_colored_icon
  },
  {
    name: "Approve Vehicles",
    path: "/admin/vehicles",
    // icon: assets.car_icon,
    // coloredIcon: assets.car_colored_icon
  },
  {
    name: "Bookings",
    path: "/admin/bookings",
    // icon: assets.booking_icon,
    // coloredIcon: assets.booking_colored_icon
  },
  {
    name: "Pricing Categories",
    path: "/admin/pricing",
    // icon: assets.price_icon,
    // coloredIcon: assets.price_colored_icon
  },
  {
    name: "Analytics",
    path: "/admin/analytics",
    // icon: assets.analytics_icon,
    // coloredIcon: assets.analytics_colored_icon
  }
]







