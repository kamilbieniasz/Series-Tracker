import { library } from '@fortawesome/fontawesome-svg-core';
import FontAwesomeIcon from '../libs/FontAwesomeIcon.vue';
import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons";
import {faStar as faStarSolid, faAnglesLeft} from "@fortawesome/free-solid-svg-icons";

library.add(faStarRegular);
library.add(faStarSolid);
library.add(faAnglesLeft)

export { FontAwesomeIcon }
