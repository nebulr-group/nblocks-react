// import { TextStyle, ViewStyle } from "react-native";

const primaryColor = "rgb(31, 66, 221)";
const secondaryColor = "rgb(61, 194, 255)";
const dangerColor = "rgb(235, 68, 90)";
const cancelColor = "lightgray";
const backgroundColor = "white";
const defaultPadding = 15;
const textColor = "black";

type BrandingConfig = {
  body: any;
  textGlobal: any;
  defaultPadding: any;
  title: any;
  subTitle: any;
  textIngress: any;
  inputGroup: any;
  textInput: any;
  button: any;
  buttonText: any;
  divider: any;
  chip: any;
};

type ColorConfig = {
  primaryColor: string;
  secondaryColor: string;
  dangerColor: string;
  cancelColor: string;
  backgroundColor: string;
  textColor: string;
};

const defaultColor: ColorConfig = {
  primaryColor,
  secondaryColor,
  dangerColor,
  cancelColor,
  backgroundColor,
  textColor,
};

const defaultBranding: BrandingConfig = {
  body: {
    backgroundColor,
  },
  textGlobal: {
    color: textColor,
    fontSize: 16,
  },
  defaultPadding: {
    padding: defaultPadding,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 5,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 22,
    marginTop: 5,
    fontWeight: "500",
    marginBottom: 8,
  },
  textIngress: {
    fontSize: 18,
    marginBottom: 5,
  },
  inputGroup: {
    marginTop: 10,
    flexDirection: "row",
    alignContent: "space-between",
  },
  textInput: {
    borderWidth: 2,
    padding: 5,
    borderRadius: 4,
    borderColor: "#F4F5F8",
  },
  button: {
    marginTop: 5,
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    padding: 10,
    fontWeight: "700",
  },
  divider: {
    backgroundColor: "#F4F5F8",
    height: 2,
    marginTop: 5,
    marginBottom: 5,
  },
  chip: {
    borderColor: "gray",
    backgroundColor: "lightgray",
    borderWidth: 2,
    borderRadius: 15,
    padding: 5,
    margin: 5,
  },
};

export { defaultBranding, defaultColor };
export type { BrandingConfig, ColorConfig };
