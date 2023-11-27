export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    maxWidth: "8rem",
    minWidth: "6rem",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "1.2rem",
    lineHeight: "1.75rem",
    backgroundColor: "#fff",
    border: "none",
    outline: "none",
    cursor: "pointer",
  }),
  option: (styles) => {
    return {
      ...styles,
      color: "#fff",
      fontSize: "1rem",
      lineHeight: "1.75rem",
      width: "100%",
      background: "#111",
      ":hover": {
        backgroundColor: "#333",
        color: "#fff",
        cursor: "pointer",
      },
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      backgroundColor: "#000",
      maxWidth: "14rem",
      borderRadius: "5px",
    };
  },

  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#fff",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
    };
  },
};
