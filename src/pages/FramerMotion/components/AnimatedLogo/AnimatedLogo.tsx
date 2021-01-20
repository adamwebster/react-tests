import { motion } from 'framer-motion';
import styled from 'styled-components';
const icon = {
    hidden: {
        opacity: 0,
        pathLength: 0,
        fill: 'rgba(0, 110, 245, 0)',
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        fill: 'rgba(0, 110, 245, 1)',
    },
};

const StyledContainer = styled.div`
    width: 500px;
    height: 500px;
    display: flex;
    place-content: center;
    overflow: hidden;
    .item {
        overflow: visible;
        stroke: rgba(0, 110, 245, 1);
        stroke-width: 2;
        stroke-linejoin: round;
        stroke-linecap: round;
    }
`;

const AnimatedLogo = () => {
    return (
        <StyledContainer>
            <motion.svg
                width="100%"
                height="100%"
                viewBox="0 0 20 42"
                version="1.1"
                className="item"
            >
                <g transform="matrix(1,0,0,1,-1860.73,-13.6115)">
                    <g transform="matrix(1,0,0,2.20208,1667.25,9.61153)">
                        <g transform="matrix(0.135956,0,0,0.0617399,188.484,1.8164)">
                            <g>
                                <motion.path
                                    d="M95.014,73.535C95.014,73.535 97.67,64.601 108.528,64.601C118.56,64.601 122.042,73.535 122.042,73.535L178.21,226.562C178.21,226.562 183.489,237.861 169.358,241.996C154.787,246.255 151.755,235.302 151.755,235.302L108.528,117.534L86.151,178.499L103.426,179.438C110.278,179.898 115.692,185.255 115.692,191.781C115.692,198.307 110.278,203.664 103.426,204.125L76.396,205.072L65.301,235.302C65.301,235.302 62.155,247.557 47.572,242.421C34.707,237.888 38.846,226.562 38.846,226.562L95.014,73.535Z"
                                    variants={icon}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{
                                        default: {
                                            duration: 2,
                                            ease: 'easeInOut',
                                        },
                                        fill: {
                                            delay: 0.5,
                                            duration: 2,
                                            ease: [1, 0, 0.8, 1],
                                        },
                                    }}
                                ></motion.path>
                            </g>
                        </g>
                    </g>
                </g>
            </motion.svg>
        </StyledContainer>
    );
};

export default AnimatedLogo;
