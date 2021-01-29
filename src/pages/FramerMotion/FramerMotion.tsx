import { Colors } from '@adamwebster/fused-components';
import { motion, useElementScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { LoremIpsum } from 'react-lorem-ipsum';
import imgRoom from './static/images/new-data-services-nZ50HrjAFNc-unsplash.jpg';
const GlobalStyles = createGlobalStyle`
body{
    font-size: 100%;
    margin: 0;
}
`;

const StyledScrollElement = styled.div`
    height: calc(100vh - 50px);
    box-sizing: border-box;
    overflow: auto;
    position: relative;
    width: 100vw;
    z-index: 1;
    &:after {
        content: '';
    }
`;

const StyledWrapperTest = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
    .hero-message {
        font-size: 4rem;
        color: #fff;
    }
`;

const StyledBG = styled.div`
    width: 100vw;
    position: fixed;
    top: 43px;
    left: 0;
    height: 100vh;
    height: calc(100vh - 43px);

    > div {
        width: 100%;
        height: 100%;
    }
`;

const StyledForceScroll = styled.div`
    height: 500vh;
`;

const FramerMotion = () => {
    const scrollElement = useRef<HTMLDivElement | null>(null);
    const fadeElement = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useElementScroll(scrollElement);

    const helloOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const helloY = useTransform(scrollYProgress, [0, 0.5], [0, -500]);

    const imageOpacity = useTransform(
        scrollYProgress,
        [0, 0.4, 0.7, 0.9],
        [0, 1, 1, 0]
    );
    const imagePhoneLeft = useTransform(scrollYProgress, [0.5, 0.6], [0, -400]);
    const imageBottom = useTransform(
        scrollYProgress,
        [0, 0.2, 0.3],
        [600, 300, 0]
    );
    const imageScale = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const imageBorderRadius = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [0, 5, 10]
    );

    const phoneScale = useTransform(
        scrollYProgress,
        [0, 0.4, 0.5],
        [0, 1, 1.02]
    );
    const phoneOpacity = useTransform(
        scrollYProgress,
        [0, 0.3, 0.4, 0.7, 0.9],
        [0, 0, 1, 1, 0]
    );

    const descriptionOpacity = useTransform(
        scrollYProgress,
        [0.6, 0.7, 0.9],
        [0, 1, 0]
    );
    const backgroundColor = useTransform(
        scrollYProgress,
        [0.5, 0.6],
        [Colors.primary, '#000000']
    );
    return (
        <>
            <GlobalStyles />
            <StyledBG>
                <motion.div style={{ backgroundColor }}></motion.div>
            </StyledBG>
            <StyledWrapperTest>
                <motion.h1
                    className="hero-message"
                    style={{ opacity: helloOpacity, y: helloY }}
                >
                    Hello
                </motion.h1>

                <motion.div
                    style={{
                        position: 'fixed',
                        backgroundColor: 'black',
                        width: '312px',
                        height: '619px',
                        scale: phoneScale,
                        opacity: phoneOpacity,
                        borderRadius: '15px',
                        x: imagePhoneLeft,
                    }}
                />
                <motion.div
                    ref={fadeElement}
                    style={{
                        position: 'fixed',
                        width: '300px',
                        height: '600px',
                        scale: imageScale,
                        opacity: imageOpacity,
                        y: imageBottom,
                        borderRadius: imageBorderRadius,
                        overflow: 'hidden',
                        x: imagePhoneLeft,
                        boxSizing: 'border-box',
                    }}
                >
                    <img style={{ height: '100%' }} src={imgRoom} alt="room" />
                </motion.div>

                <motion.div
                    style={{
                        position: 'fixed',
                        color: '#fff',
                        width: '400px',
                        opacity: descriptionOpacity,
                    }}
                >
                    <motion.h2 style={{ backgroundColor: backgroundColor }}>
                        Heading
                    </motion.h2>
                    <LoremIpsum p={2} />
                </motion.div>
            </StyledWrapperTest>
            <StyledScrollElement ref={scrollElement}>
                <StyledForceScroll />
                <div
                    style={{
                        width: '100vw',
                        minHeight: '100vh',
                        backgroundColor: '#fff',
                        padding: '16px',
                        boxSizing: 'border-box',
                    }}
                >
                    <LoremIpsum p={9} />
                </div>
            </StyledScrollElement>
        </>
    );
};

export default FramerMotion;
