import { library } from '@fortawesome/fontawesome-svg-core';
import FontAwesomeIcon from '../libs/FontAwesomeIcon.vue';
import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons";
import {faStar as faStarSolid, faAnglesLeft, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

library.add(
    faStarRegular,
    faStarSolid,
    faAnglesLeft,
    faAngleLeft,
    faAngleRight
);


export { FontAwesomeIcon }
