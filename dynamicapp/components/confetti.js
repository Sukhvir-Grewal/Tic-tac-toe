import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const ConfettiComponent = () => {
    const { width, height } = useWindowSize();
    return <Confetti 
    width={width} 
    height={height}
    numberOfPieces={100}
    gravity={0.05}
    />;
};

ConfettiComponent.displayName = "ConfettiComponent"; // Add a display name

export default ConfettiComponent;
