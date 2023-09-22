import { Card, CardGroup } from "react-bootstrap";
import { useState } from "react"; // Import the useState hook
import Router from "next/router";
import Link from "next/link";
import StarsComponent from "@/components/stars";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Function to handle card hover
  const handleCardHover = (gameMode) => {
    setHoveredCard(gameMode);
  };

  return (
    <>
      <StarsComponent />
      <CardGroup
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          top: "10vh",
        }}
      >
        <Link
          href="/form"
          gameMode="BOT"
          style={{ textDecoration: "none" }}
          onMouseEnter={() => handleCardHover("BOT")} // Handle mouse enter
          onMouseLeave={() => handleCardHover(null)} // Handle mouse leave
        >
          <Card
            className={`SelectGameModeCard ${
              hoveredCard === "BOT" ? "HoveredCard" : ""
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('/images/singlexo.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <Card.Text className="linkText">Best of Three</Card.Text>
            </Card.Body>
          </Card>
        </Link>
        <Link
          href="/form"
          gameMode="IG"
          style={{ textDecoration: "none" }}
          onMouseEnter={() => handleCardHover("IG")} // Handle mouse enter
          onMouseLeave={() => handleCardHover(null)} // Handle mouse leave
        >
          <Card
            className={`SelectGameModeCard ${
              hoveredCard === "IG" ? "HoveredCard" : ""
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('/images/xo.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <Card.Text className="linkText">Infinite Game</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </CardGroup>
    </>
  );
}
