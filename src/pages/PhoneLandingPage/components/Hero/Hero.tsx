import styled from "styled-components";
import { motion } from "framer-motion";
import PhoneMockup from "../../assets/images/phone-mockup.png";
import LoremIpsum from "react-lorem-ipsum";

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
  overflow: hidden;
  position: relative;
  img {
    height: 70vh;
  }
`;

const StyledCircle = styled.div`
  position: absolute;
  right: -100px;
  top: -100px;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background-color: pink;
`;

const StyledHeroMessage = styled.div`
  position: absolute;
  left: 25%;
  max-width: 600px;
  z-index:5;
`;

const StyledHeroMotion = motion.custom(StyledHero);
const StyledMotionCircle = motion.custom(StyledCircle);

const StyledHeroMessageMotion = motion.custom(StyledHeroMessage);
const Hero = () => {
  return (
    <StyledHeroWrapper>
      <StyledHeroMessageMotion
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
      >
        <motion.h1>Hello</motion.h1>
        <LoremIpsum p={2} random={false} />
      </StyledHeroMessageMotion>
      
      <StyledMotionCircle
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          opacity: { delay: 2.5 },
          scale: { delay: 2.5 },
        }}
      />
      <StyledHeroMotion
        initial={{ opacity: 0, x: 0, scale: 1 }}
        animate={{ opacity: 1, x: "30%", scale: 0.6 }}
        transition={{
          duration: 2,
          x: { delay: 1, duration: 1 },
          scale: { delay: 2, duration: 1 },
        }}
      >
        <img src={PhoneMockup} alt="Hero" />
      </StyledHeroMotion>
    </StyledHeroWrapper>
  );
};

export default Hero;
