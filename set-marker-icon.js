import {CITY_ICONS, ICON_SIZE} from "./const.js";

export const setMarkerIcon = (type, size) => {
  return L.icon({
    iconUrl: `./icons/props/${CITY_ICONS[type]}.svg`,
    iconSize: [`${ICON_SIZE[size]}`, `${ICON_SIZE[size]}`],
  });
};