import {Dimensions} from 'react-native';

const basicDimensions = {
    width: 390,
    height: 844,
  };
  
const width = (
    Dimensions.get('screen').width * (1 / basicDimensions.width)
).toFixed(2);
  
const height = (
    Dimensions.get('screen').height * (1 / basicDimensions.height)
).toFixed(2);

const fontSizes = {
    fontSizes9: width * 9,
    fontSizes10: width * 10,
    fontSizes11: width * 11,
    fontSizes12: width * 12,
    fontSizes13: width * 13,
    fontSizes14: width * 14,
    fontSizes15: width * 15,
    fontSizes16: width * 16,
    fontSizes17: width * 17,
    fontSizes18: width * 18,
    fontSizes19: width * 19,
    fontSizes20: width * 20,
    fontSizes21: width * 21,
    fontSizes22: width * 22,
};

const color={
    white:"#FFFFFF",
    black:"#000000",
    main:"#6378EB",
    background:"#F3F4F6",
    grey1:"#BCBCBC",
    grey2:"#3A3A3A",
    grey3:"#686868",
    grey4:"#888888",
    grey5:"#999999",
    grey6:"#D9D9D9",
    grey7:"#EEEEEE",
    grey8:"#292D32",
    grey9:"#616161",
    grey10:"#707070",
    grey11:"#ECECEC",
    grey12:"#959595",
}

export const theme={
    width,
    height,
    fontSizes,
    color,
}