import ReactNative, { Dimensions } from "react-native";
const designWidth = 750.0,
    designHeight = 1334.0;

function getPhysicalUnit(Dimensions) {
    const window = Dimensions.get("window");
    return {
        screenWidth: window.width,
        screenHeight: window.height,
    };
}

function getPixelRatio(instance) {
    const pixelRatioInstance = instance.PixelRatio;
    return {
        fontScale: pixelRatioInstance.getFontScale(),
        pixelRatio: pixelRatioInstance.get(),
        pixelRatioInstance,
    };
}

function getScreenPxByDp(pixelRatioInstance, screenWidth, screenHeight) {
    return {
        screenPxWidth: pixelRatioInstance.getPixelSizeForLayoutSize(screenWidth),
        screenPxHeight: pixelRatioInstance.getPixelSizeForLayoutSize(screenHeight),
    };
}

const { pixelRatioInstance, fontScale, pixelRatio } = getPixelRatio(ReactNative);
const { screenWidth, screenHeight } = getPhysicalUnit(Dimensions);
const { screenPxWidth, screenPxHeight } = getScreenPxByDp(
    pixelRatioInstance,
    screenWidth,
    screenHeight,
    designHeight,
    designWidth,
    fontScale
);

function baseNumericConvertPhysicalUnit(
    baseNumeric,
    screenWidth,
    screenHeight,
    designHeight,
    designWidth,
    fontScale
) {
    const scale = Math.min(screenWidth / designWidth, screenHeight / designHeight);
    return Math.round((baseNumeric * scale) / fontScale + 0.5);
}

function scaleBaseNumericHeight(baseNumeric, screenPxHeight, designHeight, pixelRatio) {
    const scaleHeight = (baseNumeric * screenPxHeight) / designHeight;
    return Math.round(scaleHeight / pixelRatio + 0.5);
}

function scaleBaseNumericWidth(baseNumeric, screenPxWidth, designWidth, pixelRatio) {
    const scaleWidth = (baseNumeric * screenPxWidth) / designWidth;
    return Math.round(scaleWidth / pixelRatio + 0.5);
}

function scaleSizeW(size) {
    return scaleBaseNumericWidth(size, screenPxWidth, designWidth, pixelRatio);
}

function scaleSizeH(size) {
    return scaleBaseNumericHeight(size, screenPxHeight, designHeight, pixelRatio);
}

function scaleSpText(baseNumeric) {
    return baseNumericConvertPhysicalUnit(
        baseNumeric,
        screenWidth,
        screenHeight,
        designHeight,
        designWidth,
        fontScale
    );
}

export {
    screenPxWidth,
    screenPxHeight,
    scaleBaseNumericWidth,
    scaleBaseNumericHeight,
    baseNumericConvertPhysicalUnit,
    pixelRatio,
    designWidth,
    designHeight,
    pixelRatioInstance,
    fontScale,
    scaleSizeW,
    scaleSizeH,
    scaleSpText,
};
