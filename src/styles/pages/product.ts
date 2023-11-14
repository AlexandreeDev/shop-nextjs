import { styled } from "..";

export const ProductContainer = styled("main", {
  alignItems: "stretch",
  display: "grid",
  gap: "4rem",
  gridTemplateColumns: "1fr 1fr",

  margin: "0 auto",
  maxWidth: 1180,
});

export const ImageContainer = styled("div", {
  alignItems: "center",

  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,

  display: "flex",
  height: 656,
  img: {
    objectFit: "cover",
  },
  justifyContent: "center",
  maxWidth: 576,
  padding: "0.25rem",
  width: "100%",
});

export const ProductDetails = styled("div", {
  button: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
    },
    "&:not(disabled):hover": {
      backgroundColor: "$green300",
    },
    backgroundColor: "$green500",
    border: 0,
    borderRadius: 8,
    color: "$white",
    cursor: "pointer",
    fontSize: "$md",
    fontWeight: "bold",
    marginTop: "auto",

    padding: "1.25rem",
  },
  display: "flex",

  flexDirection: "column",

  h1: {
    color: "$gray300",
    fontSize: "$2xl",
  },

  p: {
    color: "$gray300",
    fontSize: "$md",
    lineHeight: 1.6,
    marginTop: "2.5rem",
  },
  span: {
    color: "$green300",
    display: "block",
    fontSize: "$2xl",
    marginTop: "1rem",
  },
});
