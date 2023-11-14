import { styled } from "..";

export const SuccessContainer = styled("main", {
  a: {
    "&:hover": {
      color: "$green300",
    },
    color: "$green500",
    display: "block",
    fontSize: "$lg",
    fontWeight: "bold",
    marginTop: "5rem",

    textDecoration: "none",
  },
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  h1: {
    color: "$gray100",
    fontSize: "$2xl",
  },
  height: 656,

  justifyContent: "center",

  margin: "0 auto",

  p: {
    color: "$gray300",
    fontSize: "$xl",
    lineHeight: 1.4,
    marginTop: "2rem",
    maxWidth: 560,

    textAlign: "center",
  },
});

export const ImageContainer = styled("div", {
  alignItems: "center",
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  display: "flex",
  height: 145,
  img: {
    objectFit: "cover",
  },

  justifyContent: "center",
  marginTop: "4rem",
  maxWidth: 130,
  padding: "0.25rem",

  width: "100%",
});
