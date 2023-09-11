import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const Confetti = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // You can perform any additional actions when particles are loaded here
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "red",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: false,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#ff0000", "#00ff00", "#0000ff"], // Confetti colors
          },
          shape: {
            type: "circle", // You can also use "square" or other shapes
          },
          opacity: {
            value: 1,
            random: true,
            anim: {
              enable: true,
              speed: 10,
              opacity_min: 0,
              sync: false,
            },
          },
          size: {
            value: 5, // Adjust the size of the confetti
            random: true,
            anim: {
              enable: true,
              speed: 10,
              size_min: 0,
              sync: false,
            },
          },
          move: {
            direction: "top",
            enable: true,
            random: true,
            speed: 2, // Adjust the speed of the confetti
            straight: false,
            out_mode: "out",
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 100, // Adjust the number of confetti particles
          },
          line_linked: {
            enable: false, // Disable any lines between particles
          },
          rotate: {
            random: true, // Allow particles to rotate randomly
            direction: "random",
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default Confetti;
