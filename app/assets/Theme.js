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
    fontSizes9: height * width * 9,
    fontSizes10: height * width * 10,
    fontSizes11: height * width * 11,
    fontSizes12: height * width * 12,
    fontSizes13: height * width * 13,
    fontSizes14: height * width * 14,
    fontSizes15: height * width * 15,
    fontSizes16: height * width * 16,
    fontSizes17: height * width * 17,
    fontSizes18: height * width * 18,
    fontSizes19: height * width * 19,
    fontSizes20: height * width * 20,
    fontSizes21: height * width * 21,
    fontSizes22: height * width * 22,
    fontSizes25: height * width * 25,
};

const color={
    white:"#FFFFFF",
    black:"#000000",
    main:"#6378EB",
    mainOpacity10:"#E7E9F4",
    mainOpacity20:"#E8EBFF",
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