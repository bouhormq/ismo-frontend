/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          lighter: "rgba(51, 179, 225, 0.38)",
          light: "rgba(10, 45, 110, 0.3)",
          normal: "rgba(10, 45, 110, 1)",
          primary: "rgba(8, 37, 89, 1)",
          title: "rgba(52, 60, 106, 1)",
          input: "rgba(159, 221, 249, 1)",
          inputBg: "rgba(229, 247, 255, 1)",
          "input-light": "#E5F7FF",
          sky: "rgba(105, 207, 253, 1)",
          skyDark: "rgba(93, 158, 233, 1)",
          skyDarkWithOpacity: "rgba(93, 158, 233, 0.1)",
          inputBg: "#E5F7FF",
        },
        "light-blue": {
          normal: "rgba(210, 224, 251, 1)",
        },
        "light-yellow": {
          normal: "rgba(254, 249, 217, 1)",
        },
        "light-green": {
          normal: "rgba(222, 229, 212, 1)",
        },
        gray: {
          bodyBg: "rgba(231, 235, 238, 1)",
          primary: "rgba(159, 167, 174, 1)",
          input: "rgba(173, 181, 189, 0.7)",
          inputBg: "rgba(244, 245, 247, 1)",
          border: "rgba(173, 181, 189, 1)",
          light: "rgba(248, 249, 250, 1)",
        },
        red: {
          normal: "rgba(255, 0, 0, 1)",
        },
        "dark-yellow": {
          normal: "rgba(116, 116, 0, 1)",
          light: "rgba(255, 242, 128, 1)",
        },
        "dark-red": {
          normal: "rgba(198, 40, 40, 1)",
          light: "rgba(255, 167, 176, 1)",
        },
        "dark-green": {
          normal: "rgba(46, 125, 50, 1)",
          light: "rgba(160, 234, 163, 1)",
        },
        "dark-gray": {
          normal: "rgba(97, 97, 97, 1)",
          light: "rgba(224, 224, 224, 1)",
        },
        "dark-blue": {
          normal: "rgba(21, 101, 192, 1)",
          light: "rgba(162, 213, 255, 1)",
        },
      },
      boxShadow: {
        tableShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.06)",
        quillShadow: "0px 0px 4px 0px #D9D9D9",
      },
      borderColor: {
        tableBorderColor: "rgba(229, 231, 235, 1)",
      },
      screens: {
        "13inch": { max: "1550px" },
        "12inch": { max: "1400px" },
        tabletScreen: { max: "1200px" },
        smallTabletScreen: { max: "900px" },
        minTabletScreen: { min: "900px" },
        mobileScreen: { max: "550px" },
        minMobileScreen: { min: "550px" },
      },
      borderWidth: {
        1: "1px",
      },
      fontSize: {
        "custom-10": "10px",
        "custom-12": "12px",
      },
      minWidth: {
        unset: "unset",
      },
    },
    animation: {
      "move-svg-border": "move-svg-border 10s linear infinite",
      spin: "spin 1s linear infinite",
    },
  },
  plugins: [],
};
