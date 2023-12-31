import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // loads tsparticles-slim
//import { loadFull } from "tsparticles"; // loads tsparticles
import { useCallback, useMemo } from "react";

// tsParticles Repository: https://github.com/matteobruni/tsparticles
// tsParticles Website: https://particles.js.org/
const StarsComponent = (props) => {
    // using useMemo is not mandatory, but it's recommended since this value can be memoized if static
    const options = useMemo(() => {
        // using an empty options object will load the default options, which are static particles with no background and 3px radius, opacity 100%, white color
        // all options can be found here: https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html
        return {
            background: {
                color: "#fff",
            },
            fullScreen: {
                enable: true,
                zIndex: -1,
            },
            // interactivity: {
            //     events: {
            //         onClick: {
            //             enable: false, // Disable the click event
            //         },
            //         onHover: {
            //             enable: false,
            //             mode: "repulse",
            //         },
            //     },
            //     modes: {
            //         push: {
            //             quantity: 10,
            //         },
            //         repulse: {
            //             distance: 100,
            //         },
            //     },
            // },
            particles: {
                number: {
                    value: 30   , // Set the initial number of particles
                },
                color: {
                    value: "#000", // Set the particle color to black
                },
                move: {
                    enable: true,
                    speed: { min: 1, max: 1 },
                },
                opacity: {
                    value: { min: 0.1, max: 0.3 },
                },
                size: {
                    value: { min: 1, max: 30 },
                },
            },
        };
    }, []);

    // useCallback is not mandatory, but it's recommended since this callback can be memoized if static
    const particlesInit = useCallback((engine) => {
        loadSlim(engine);
        // loadFull(engine); // for this sample the slim version is enough, choose whatever you prefer, slim is smaller in size but doesn't have all the plugins and the mouse trail feature
    }, []);

    // setting an id can be useful for identifying the right particles component, this is useful for multiple instances or reusable components
    return <Particles id={props.id} init={particlesInit} options={options} />;
};

export default StarsComponent;
