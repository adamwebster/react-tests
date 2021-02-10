import { LoremIpsum } from 'react-lorem-ipsum';
import { Hero } from './components/Hero';
import { Layout } from './components/Layout';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import FirstSectionImage from './assets/images/ben-kolde-xdLXPic3Wfk-unsplash.jpg';
import SecondSectionImage from './assets/images/nathan-dumlao-kLmt1mpGJVg-unsplash.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClock,
    faShieldAlt,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect } from 'react';
import { SiteContext, SiteContextProvider } from './context/Site';

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
    img {
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
    display: flex;
    margin: 64px 0;
    div {
        flex: 1 1;
        display: flex;
        justify-content: center;
    }
`;

const StyledScroll = styled.div`
    flex: 1 1;
    overflow-y: auto;
    overflow-x: hidden;
`;

const StyledSquare = styled.div`
    position: absolute;
    right: -100px;
    top: 50px;
    width: 300px;
    height: 0;
    background-color: lightblue;
`;

const FirstSectionMotion = motion.custom(StyledContentWrapper);
const SecondSectionMotion = motion.custom(StyledContentWrapper);
const StyledScrollMotion = motion.custom(StyledScroll);
const StyledSquareMotion = motion.custom(StyledSquare);

const PhoneLandingPage = () => {
    const [Section, SectionInView] = useInView({
        triggerOnce: false,
        rootMargin: '-50px 0px',
    });
    const [SecondSection, SecondSectionInView] = useInView({
        triggerOnce: false,
        rootMargin: '-50px 0px',
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
                        x: SectionInView ? 0 : 100,
                    }}
                    transition={{
                        opacity: { duration: 1 },
                        x: { duration: 1 },
                    }}
                    ref={Section}
                >
                    <StyleContentWrapperInner>
                        <SectionGrid>
                            <ImageWrapper>
                                <img src={FirstSectionImage} alt="phone" />
                            </ImageWrapper>
                            <div>
                                <h2>Section Heading</h2>
                                <LoremIpsum p={2} random={false} />
                            </div>
                        </SectionGrid>
                    </StyleContentWrapperInner>
                </FirstSectionMotion>
                <SecondSectionMotion
                    animate={{
                        opacity: SecondSectionInView ? 1 : 0,
                        x: SecondSectionInView ? 0 : -100,
                    }}
                    transition={{
                        opacity: { duration: 1 },
                        x: { duration: 1 },
                    }}
                    ref={SecondSection}
                >
                    <StyledSquareMotion
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
                            <div>
                                <h2>Section Heading</h2>
                                <IconGrid>
                                    <motion.div
                                        animate={{
                                            opacity: SecondSectionInView
                                                ? 1
                                                : 0,
                                            y: SecondSectionInView ? 0 : 20,
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faShieldAlt}
                                            size="4x"
                                        />
                                    </motion.div>
                                    <motion.div
                                        animate={{
                                            opacity: SecondSectionInView
                                                ? 1
                                                : 0,
                                            y: SecondSectionInView ? 0 : 20,
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faClock}
                                            size="4x"
                                        />
                                    </motion.div>
                                    <motion.div
                                        animate={{
                                            opacity: SecondSectionInView
                                                ? 1
                                                : 0,
                                            y: SecondSectionInView ? 0 : 20,
                                        }}
                                    >
                                        {' '}
                                        <FontAwesomeIcon
                                            icon={faUsers}
                                            size="4x"
                                        />
                                    </motion.div>
                                </IconGrid>
                                <LoremIpsum p={1} random={false} />
                            </div>
                            <ImageWrapper>
                                <img src={SecondSectionImage} alt="phone" />
                            </ImageWrapper>
                        </SectionGrid>
                    </StyleContentWrapperInner>
                </SecondSectionMotion>
            </StyledScrollMotion>
        </Layout>
    );
};

export default PageWrapper;
