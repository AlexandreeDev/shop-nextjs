import { styled } from "..";

export const HomeContainer = styled("main", {
  display: "flex",
  marginLeft: "auto",
  maxWidth: "calc(100vw - ((100vw - 1180px) /2))",
  minHeight: "656",
  width: "100%",
});

export const Product = styled("div", {
  "&:hover": {
    footer: {
      opacity: 1,
      transform: "translateY(0%)",
    },
  },
  alignItems: "center",
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  cursor: "pointer",
  display: "flex",

  footer: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 6,
    bottom: "0.25rem",
    display: "flex",
    justifyContent: "space-between",
    left: "0.25rem",
    opacity: 0,
    padding: "0.55rem",
    position: "absolute",
    right: "0.25rem",
    transform: "translateY(110%)",
    transition: "all 0.2s ease-in-out",
  },
  img: {
    objectFit: "cover",
  },
  justifyContent: "center",

  overflow: "hidden",
  position: "relative",

  span: {
    color: "$green300",
    fontSize: "$xl",
    fontWeight: "bold",
  },
  strong: {
    color: "$gray100",
    fontSize: "$lg",
  },
});
