import Particles from "react-tsparticles";
import { memo } from "react";

const Effects = ({width, height}) => {
  const particlesInit = (main) => {
    // console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    // console.log(container);
  };
    return ( 
        <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "white",
          },
        },
        fullScreen: {
          enable: false,
          zIndex: 0
        },
        fpsLimit: 30,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },  

            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: false,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 15,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 30,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#696969",
          },
          links: {
            color: "#DCDCDC",
            distance: 150,
            enable: true,
            opacity: 1,
            width: 0.6,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 1.2,
            straight: false,
          },
          number: {
            density: {
              enable: false,
              area: 100,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 2,
          },
        },
        detectRetina: true,
      }}
    />
     );
}
 
export default memo(Effects);