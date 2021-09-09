import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import img1 from '../static/images/jason-leung-poI7DelFiVA-unsplash.jpg';
import img2 from '../static/images/new-data-services-nZ50HrjAFNc-unsplash.jpg';
import { useInView } from 'react-intersection-observer';
import LoremIpsum from 'react-lorem-ipsum';

const phoneWidth = 310;
const phoneHeight = 600;

const StyledWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const StyledFirstSection = styled.div`
    min-height: 100%;
    width: 100%;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
        font-size: 64px;
    }
`;

interface StyledSectionProps {
    textColor?: string;
}
const StyledSection = styled.div<StyledSectionProps>`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    ${({ textColor }) =>
        textColor &&
        css`
            color: ${textColor};
        `}
`;

const StyledContentWrapper = styled.div`
    max-width: 500px;
    padding: 0 16p;
`;
const StyledPhoneWrapper = styled.div`
    width: ${`${phoneWidth}px`};
    margin: 0 auto;
    position: relative;
    height: ${`${phoneHeight}px`};
    display: flex;
    justify-content: center;
`;

const StyledAppIconsWrapper = styled.div`
    position: absolute;
    top: 40px;
    z-index: 1;
`;
const StyledAppIcon = styled.div`
    width: 80px;
    height: 80px;
    overflow: hidden;
    background-color: #9c9c9c;
    border-radius: 8px;
    position: relative;
    box-shadow: 0 0 20px #ccc;
    img {
        width: 100%;
        object-fit: cover;
        height: 100%;
    }
`;

const phoneSpacing = 12;

const StyledPhone = styled.div`
    border-radius: 12px;
    background-color: black;
    flex: 1 1;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: flex;
    justify-content: center;
    z-index: 2;
    &:after {
        content: '';
    }
`;
const StyledPhoneButtons = styled.div`
    width: 8px;
    height: 70px;
    position: absolute;
    left: -4px;
    top: 72px;
    div.button {
        background-color: #000;
        width: 100%;
        height: 32px;
        margin-bottom: 8px;
        border-radius: 4px;
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

const StyledPhoneNotch = styled.div`
    width: 96px;
    height: 24px;
    background-color: #000;
    border-radius: 5px;
    margin: 0 auto;
    z-index: 4;
    position: absolute;
`;
const StyledPhoneScreen = styled.div`
    position: absolute;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    width: ${`calc(${phoneWidth}px - ${phoneSpacing * 2}px)`};
    height: ${`calc(${phoneHeight}px - ${phoneSpacing * 2}px)`};
    left: ${`${phoneSpacing}px`};
    top: ${`${phoneSpacing}px`};
    z-index: 3;
    img {
        width: 100%;
        object-fit: cover;
        height: 100%;
    }
`;
const StyledWrapperMotion = motion(StyledWrapper);
const StyledAppIconMotion = motion(StyledAppIcon);
const StyledPhoneScreenMotion = motion(StyledPhoneScreen);
const StyledContentWrapperMotion = motion(StyledContentWrapper);
const FramerMotionAppIcons = () => {
    const [backgroundColor, setBackgroundColor] = useState('#000');
    const [FP, FPInView] = useInView({
        triggerOnce: false,
        rootMargin: '-200px 0px',
    });
    const [firstTextBox, firstTextBoxInView] = useInView({
        triggerOnce: false,
        rootMargin: '-200px 0px',
    });
    const [thirdSection, thirdSectionInView] = useInView({
        triggerOnce: false,
        rootMargin: '-400px 0px',
    });

    useEffect(() => {
        console.log(thirdSectionInView);
        if (thirdSectionInView) {
            setBackgroundColor('#ff1010');
        } else {
            setBackgroundColor('#000');
        }
    }, [thirdSectionInView]);

    return (
        <StyledWrapperMotion
            initial={{ backgroundColor }}
            animate={{
                backgroundColor: FPInView ? '#efefef' : backgroundColor,
            }}
        >
            <StyledFirstSection>
                <motion.h1
                    initial={{ opacity: 0, y: -32 }}
                    animate={{ opacity: !FPInView ? 1 : 0, y: 0 }}
                >
                    Hello
                </motion.h1>
            </StyledFirstSection>
            <StyledSection>
                <StyledPhoneWrapper>
                    <StyledPhone ref={FP}>
                        <StyledPhoneNotch />
                        <StyledPhoneButtons>
                            <div className="button" />
                            <div className="button" />
                        </StyledPhoneButtons>
                        <StyledPhoneScreenMotion
                            initial={{ opacity: 0 }}
                            animate={{ opacity: FPInView ? 1 : 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <img src={img2} alt="image1" />
                        </StyledPhoneScreenMotion>
                    </StyledPhone>
                    <StyledAppIconsWrapper>
                        <StyledAppIconMotion
                            initial={{ x: 0, y: 0 }}
                            animate={{
                                x: firstTextBoxInView ? -300 : 0,
                                y: firstTextBoxInView ? 100 : 0,
                            }}
                        >
                            <img src={img1} alt="image1" />
                        </StyledAppIconMotion>
                        <StyledAppIconMotion
                            initial={{ x: 0, y: 0 }}
                            animate={{
                                x: firstTextBoxInView ? 300 : 0,
                                y: firstTextBoxInView ? 200 : 0,
                            }}
                            transition={{ delay: 0.2 }}
                        >
                            <img src={img2} alt="image2" />
                        </StyledAppIconMotion>
                        <StyledAppIconMotion
                            initial={{ x: 0, y: 0 }}
                            animate={{
                                x: firstTextBoxInView ? -300 : 0,
                                y: firstTextBoxInView ? 300 : 0,
                            }}
                            transition={{ delay: 0.4 }}
                        />
                    </StyledAppIconsWrapper>
                </StyledPhoneWrapper>
                <StyledContentWrapperMotion
                    ref={firstTextBox}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: firstTextBoxInView ? 1 : 0 }}
                >
                    <h2>App Name</h2>
                    <LoremIpsum random={false} p={1} />
                </StyledContentWrapperMotion>
            </StyledSection>
            <StyledSection textColor="#fff" ref={thirdSection}>
                <motion.h1
                    style={{ fontSize: '4rem' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: thirdSectionInView ? 1 : 0 }}
                >
                    Test
                </motion.h1>
            </StyledSection>
        </StyledWrapperMotion>
    );
};

export default FramerMotionAppIcons;
