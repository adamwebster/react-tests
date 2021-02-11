import { LoremIpsum } from 'react-lorem-ipsum';
import { Hero } from './components/Hero';
import { Layout } from './components/Layout';
import styled, { css } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { animate, motion } from 'framer-motion';
import SecondSectionImage from './assets/images/nathan-dumlao-kLmt1mpGJVg-unsplash.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClock,
    faHome,
    faShieldAlt,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect } from 'react';
import { SiteContext, SiteContextProvider } from './context/Site';
import { darken } from 'polished';

const PageWrapper = () => {
    return (
        <SiteContextProvider>
            <PhoneLandingPage />
        </SiteContextProvider>
    );
};
const StyledContentWrapper = styled.div`
    max-width: 100%;
    margin: 0 auto;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const StyleContentWrapperInner = styled.div`
    max-width: 1000px;
    padding: 0 16px;
    z-index: 99;
`;

const SectionGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    gap: 32px;
    align-items: center;
    overflow: hidden;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`;

const IconGrid = styled.div`
    display: grid;
    margin: 64px 0;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 128px;
    div {
        flex: 1 1;
        display: flex;
        justify-content: center;
    }
    svg {
        color: inherit;
    }
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const StyledScroll = styled.div`
    flex: 1 1;
    overflow-y: auto;
    overflow-x: hidden;
`;

type StyledSquareProps = {
    left?: boolean;
    top: string;
    backgroundColor: string;
};

const StyledSquare = styled.div<StyledSquareProps>`
    position: absolute;
    right: -100px;
    top: ${({ top }) => top};
    width: 300px;
    height: 0;
    background-color: ${({ backgroundColor }) => backgroundColor};
    border-radius: 16px;
    ${({ left }) =>
        left
            ? css`
                  left: -100px;
              `
            : css`
                  right: -100px;
              `}
`;

type StyledIconWrapperProps = {
    backgroundColor: string;
};

const StyledIconWrapper = styled.div<StyledIconWrapperProps>`
    border-radius: 50%;
    width: 128px;
    height: 128px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ backgroundColor }) => backgroundColor};
    color: ${({ backgroundColor }) => darken(0.5, backgroundColor)};
`;

const RoundedImage = styled.img`
    border-radius: 16px;
`;

const StyledCardGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 32px;
`;

const StyledCard = styled.div`
    max-width: 400px;
    padding: 64px 32px 32px 32px;
    border-radius: 8px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 0 20px #999;
    position: relative;
`;

const StyledCardIcon = styled.div`
    width: 96px;
    height: 96px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightblue;
    border: solid 8px ${darken(0.2, 'lightblue')};
    position: absolute;
    top: -48px;
    left: calc(50% - 48px);
    svg {
        color: ${darken(0.5, 'lightblue')};
    }
`;
const FirstSectionMotion = motion.custom(StyledContentWrapper);
const SecondSectionMotion = motion.custom(StyledContentWrapper);
const ThirdSectionMotion = motion.custom(StyledContentWrapper);

const StyledScrollMotion = motion.custom(StyledScroll);
const StyledSquareMotion = motion.custom(StyledSquare);
const IconWrapperMotion = motion.custom(StyledIconWrapper);
const StyledCardMotion = motion.custom(StyledCard);
const StyledCardIconMotion = motion.custom(StyledCardIcon);
const PhoneLandingPage = () => {
    const [Section, SectionInView] = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });
    const [SecondSection, SecondSectionInView] = useInView({
        triggerOnce: false,
        threshold: 0.3,
    });

    const [ThirdSection, ThirdSectionInView] = useInView({
        triggerOnce: false,
        threshold: 0.3,
    });

    const { dispatchSite, siteState } = useContext(SiteContext);

    useEffect(() => {
        if (SectionInView) {
            dispatchSite({ type: 'SET_BACKGROUND_COLOR', payload: '#000' });
            dispatchSite({ type: 'SET_FONT_COLOR', payload: '#efefef' });
        } else {
            dispatchSite({ type: 'SET_BACKGROUND_COLOR', payload: '#efefef' });
            dispatchSite({ type: 'SET_FONT_COLOR', payload: '#000' });
        }
    }, [SectionInView, dispatchSite]);
    return (
        <Layout>
            <StyledScrollMotion
                initial={{
                    backgroundColor: siteState.backgroundColor,
                    color: siteState.fontColor,
                }}
                animate={{
                    backgroundColor: siteState.backgroundColor,
                    color: siteState.fontColor,
                }}
            >
                <Hero />
                <FirstSectionMotion
                    animate={{
                        opacity: SectionInView ? 1 : 0,
                    }}
                    transition={{
                        opacity: { duration: 1 },
                    }}
                    ref={Section}
                >
                    <StyleContentWrapperInner>
                        <IconGrid>
                            <IconWrapperMotion
                                backgroundColor="pink"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: SectionInView ? 1 : 0,
                                    scale: SectionInView ? 1 : 0,
                                }}
                                transition={{
                                    delay: SectionInView ? 0 : 0,
                                    duration: SectionInView ? 0.5 : 0,
                                }}
                            >
                                <FontAwesomeIcon icon={faShieldAlt} size="4x" />
                            </IconWrapperMotion>
                            <IconWrapperMotion
                                backgroundColor="lightblue"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: SectionInView ? 1 : 0,
                                    scale: SectionInView ? 1 : 0,
                                }}
                                transition={{
                                    delay: SectionInView ? 0.5 : 0,
                                    duration: SectionInView ? 0.5 : 0,
                                }}
                            >
                                <FontAwesomeIcon icon={faClock} size="4x" />
                            </IconWrapperMotion>
                            <IconWrapperMotion
                                backgroundColor="coral"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: SectionInView ? 1 : 0,
                                    scale: SectionInView ? 1 : 0,
                                }}
                                transition={{
                                    delay: SectionInView ? 1 : 0,
                                    duration: SectionInView ? 0.5 : 0,
                                }}
                            >
                                <FontAwesomeIcon icon={faUsers} size="4x" />
                            </IconWrapperMotion>
                        </IconGrid>
                    </StyleContentWrapperInner>
                </FirstSectionMotion>
                <SecondSectionMotion
                    animate={{
                        opacity: SecondSectionInView ? 1 : 0,
                        y: SecondSectionInView ? 0 : -100,
                    }}
                    transition={{
                        opacity: { duration: 1 },
                        y: { duration: 1 },
                    }}
                    ref={SecondSection}
                >
                    <StyledSquareMotion
                        top="50px"
                        backgroundColor="lightblue"
                        animate={{
                            opacity: SecondSectionInView ? 1 : 0,
                            height: SecondSectionInView ? '400px' : '0px',
                            width: SecondSectionInView ? '50%' : '0%',
                        }}
                        transition={{
                            opacity: { duration: 1 },
                            height: { delay: 1, duration: 0.2 },
                            width: { delay: 1.2 },
                        }}
                    />

                    <StyledSquareMotion
                        top="350px"
                        backgroundColor="pink"
                        left
                        animate={{
                            opacity: SecondSectionInView ? 1 : 0,
                            height: SecondSectionInView ? '400px' : '0px',
                            width: SecondSectionInView ? '50%' : '0%',
                        }}
                        transition={{
                            opacity: { duration: 1 },
                            height: { delay: 1, duration: 0.2 },
                            width: { delay: 1.2 },
                        }}
                    />
                    <StyleContentWrapperInner>
                        <SectionGrid>
                            <ImageWrapper>
                                <RoundedImage
                                    src={SecondSectionImage}
                                    alt="phone"
                                />
                            </ImageWrapper>
                            <div>
                                <h2>Heading Section 2</h2>
                                <LoremIpsum p={2} random={false} />
                            </div>
                        </SectionGrid>
                    </StyleContentWrapperInner>
                </SecondSectionMotion>
                <ThirdSectionMotion ref={ThirdSection}>
                    <StyledCardGrid>
                        <StyledCardMotion
                            initial={{ y: -100, opacity: 0 }}
                            animate={{
                                y: ThirdSectionInView ? 0 : -100,
                                opacity: ThirdSectionInView ? 1 : 0,
                            }}
                            transition={{ duration: 1 }}
                        >
                            <StyledCardIconMotion>
                                <FontAwesomeIcon icon={faHome} size="2x" />
                            </StyledCardIconMotion>
                            Third Section
                            <LoremIpsum
                                p={1}
                                avgWordsPerSentence={5}
                                random={false}
                            />
                        </StyledCardMotion>
                        <StyledCardMotion
                            initial={{ y: -100, opacity: 0 }}
                            animate={{
                                y: ThirdSectionInView ? 0 : -100,
                                opacity: ThirdSectionInView ? 1 : 0,
                            }}
                            transition={{ duration: 1 }}
                        >
                            <StyledCardIconMotion>
                                <FontAwesomeIcon icon={faHome} size="2x" />
                            </StyledCardIconMotion>
                            Third Section
                            <LoremIpsum
                                p={1}
                                avgWordsPerSentence={5}
                                random={false}
                            />
                        </StyledCardMotion>
                        <StyledCardMotion
                            initial={{ y: -100, opacity: 0 }}
                            animate={{
                                y: ThirdSectionInView ? 0 : -100,
                                opacity: ThirdSectionInView ? 1 : 0,
                            }}
                            transition={{ duration: 1 }}
                        >
                            <StyledCardIconMotion>
                                <FontAwesomeIcon icon={faHome} size="2x" />
                            </StyledCardIconMotion>
                            Third Section
                            <LoremIpsum
                                p={1}
                                avgWordsPerSentence={5}
                                random={false}
                            />
                        </StyledCardMotion>
                    </StyledCardGrid>
                </ThirdSectionMotion>
            </StyledScrollMotion>
        </Layout>
    );
};

export default PageWrapper;
