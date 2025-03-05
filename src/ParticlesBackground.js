/**
 * A React component that renders a particle background using the tsparticles library.
 * This component initializes the particle engine and configures the particle options
 * to create a starry night effect with customizable interactivity and appearance.
 *
 * @returns {JSX.Element} A JSX element containing the particle background or an empty fragment
 *                        if the initialization is not yet complete.
 *
 * @component
 * @example
 * return (
 *   <ParticlesBackground />
 * )
 */
import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = React.memo(() => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // const particlesLoaded = (container) => {
  //   console.log(container);
  // };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#000000", // Dark background to simulate space
        },
      },
      fpsLimit: 75,
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
        },
        modes: {
          push: {
            quantity: 8,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff", // White particles to simulate stars
        },
        links: {
          enable: false, // Disable links for a more natural look
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out", // Particles will move out of the canvas
          },
          random: true,
          speed: 0.5, // Slow speed for a gentle movement
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 1000, // Density of particles
          },
          value: 500, // Number of particles
        },
        opacity: {
          value: { min: 0.3, max: 0.8 }, // Varying opacity for twinkling effect
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.3,
            sync: false,
          },
        },
        shape: {
          type: "circle", // Circular particles
        },
        size: {
          value: { min: 1, max: 3 }, // Varying sizes for depth
          animation: {
            enable: true,
            speed: 4,
            minimumValue: 0.3,
            sync: false,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        // particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
});

export default ParticlesBackground;
