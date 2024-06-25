import defaultImg from './img/default.jpg';
import { imgBaseURL } from './movies-api';

export const createImgURL = url => {
  return url ? imgBaseURL + url : defaultImg;
};