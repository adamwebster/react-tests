import styled from 'styled-components';
import { motion } from 'framer-motion';
import PhoneMockup from '../../assets/images/phone-mockup.png';
import LoremIpsum from 'react-lorem-ipsum';

const StyledHeroWrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledHero = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
        height: 70vh;
        @media (max-height: 700px) and (max-width: 768px) {
            height: 50vh;
        }
    }
`;

const StyledCircle = styled.div`
    position: absolute;
    right: -300px;
    top: -300px;
    width: 1000px;
    height: 1000px;
    border-radius: 50%;
    background-color: pink;
`;

const StyledHeroMessage = styled.div``;

const StyledHeroGrid = styled.div`
    display: grid;
    max-width: 1000px;
    padding: 0 16px;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    z-index: 99;
    grid-auto-flow: dense;
    @media (max-width: 768px) {
        margin-top: 80px;
        grid-template-columns: 1fr;
        justify-content: flex-start;
        align-items: flex-start;
        grid-template-rows: 400px;
        ${StyledHeroMessage} {
            grid-row: 2;
        }
    }
    @media (max-height: 700px) and (max-width: 768px) {
        grid-template-rows: 300px;
    }
`;

const StyledHeroMotion = motion(StyledHero);
const StyledMotionCircle = motion(StyledCircle);
const StyledHeroGridMotion = motion(StyledHeroGrid);
const StyledHeroMessageMotion = motion(StyledHeroMessage);
const Hero = () => {
    return (
        <StyledHeroWrapper>
            <StyledMotionCircle
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    opacity: { delay: 2.5 },
                    scale: { delay: 2.5 },
                }}
            />
            <StyledHeroGridMotion>
                <StyledHeroMessageMotion
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 2 }}
                >
                    <motion.h1>Hello</motion.h1>
                    <LoremIpsum p={2} random={false} />
                </StyledHeroMessageMotion>

                <StyledHeroMotion
                    initial={{ opacity: 0, x: '-50%', scale: 1 }}
                    animate={{ opacity: 1, x: 0, scale: 0.6 }}
                    transition={{
                        duration: 2,
                        x: { delay: 1, duration: 1 },
                        scale: { delay: 2, duration: 1 },
                    }}
                >
                    <img src={PhoneMockup} alt="Hero" />
                </StyledHeroMotion>
            </StyledHeroGridMotion>
        </StyledHeroWrapper>
    );
};

export default Hero;
