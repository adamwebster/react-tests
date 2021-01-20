import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import { AnimatedLogo } from './components/AnimatedLogo';
import styled from 'styled-components';
import { Card, Colors } from '@adamwebster/fused-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faJsSquare,
    faHtml5,
    faCss3Alt,
    faReact,
    faWordpressSimple,
} from '@fortawesome/free-brands-svg-icons';
import {
    faCode,
    faMobileAlt,
    faPalette,
} from '@fortawesome/free-solid-svg-icons';

import { faWindowMaximize } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { LoremIpsum } from 'react-lorem-ipsum';
const dotSize = 2;
const dotSpace = 22;

const StyledSiteHeader = styled.header`
    width: 100%;
    height: 50px;
    background-color: ${Colors.primary};
    color: #fff;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
`;

const StyledNav = styled.nav`
    display: flex;
    flex: 1 1;
    justify-content: flex-end;
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        li {
            padding: 0 8px;
        }
    }
`;
const StyledHeaderContainer = styled.div`
    width: 100%;
    /* background: linear-gradient(
                90deg,
                #bcdaff ${dotSpace - dotSize}px,
                transparent 1%
            )
            center,
        linear-gradient(#bcdaff ${dotSpace - dotSize}px, transparent 1%) center,
        #97b4d7;
    background-size: ${dotSpace}px ${dotSpace}px; */
    background-image: url('https://images.unsplash.com/photo-1551503766-ac63dfa6401c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80');
        background-size: cover;
    margin-bottom: 32px;
    border-bottom: solid 1px #ccc;
    background-position: center;
`;

const StyledHeaderContainerInner = styled.div`
    max-width: 1200px;
    padding: 16px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    h1 {
        color: ${Colors.primary};
        font-size: 3rem;
        margin-bottom: 0;
        font-weight: 200;
        position: relative;
    }
    h2 {
        margin-top: 0;
        position: relative;
        color: ${Colors.dark};
    }
`;

const StyledSkillsContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
    padding: 0 16px;
`;

const StyledSkillsGrid = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    justify-content: center;
    grid-gap: 16px;
    margin-top: 32px;
    div {
        display: flex;
        flex-flow: column;
        text-align: center;
        align-items: center;
        span {
            padding-top: 10px;
        }
    }
`;

const StyledProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    /* grid-template-areas:
        'grid1 grid1 grid2 grid3'
        'grid1 grid1 grid4 grid4'; */
    min-height: 400px;
    margin: 0 auto;
`;

interface StyledFullWidthWrapperProps {
    bgColor?: string;
}
const StyledFullWidthWrapper = styled.div<StyledFullWidthWrapperProps>`
    background-color: ${({ bgColor }) => (bgColor ? bgColor : Colors.primary)};
    padding: 32px 16px;
`;

const StyledSectionHeader = styled.h1`
    font-weight: 300;
    font-size: 2rem;
`;
interface StyledProjectItemInterface {
    grid: number;
}

const StyledProjectItem = styled.div<StyledProjectItemInterface>`
    display: flex;
    gap: 16px;
    padding: 16px;
    color: #fff;
    max-width: 1200px;
    margin: 0 auto;
`;
const StyledServicesGrid = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 0 16px;
    > div {
        flex: 1 1;
    }
`;

const StyledServicesCard = styled(Card)`
    padding: 32px 16px;
    border: none;
    display: flex;
    position: relative;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    flex: 1 1;
    cursor: pointer;
    transition: all 0.2s ease 0s;
    &:hover {
        transform: scale(1.05);
    }
    svg {
        margin-bottom: 32px;
        + svg {
            margin-left: 16px;
        }
    }
`;

const StyledOverlay = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledCardModal = styled.div`
    position: fixed;
    z-index: 1;
    overflow: hidden;
    height: auto;
    max-width: 700px;
    pointer-events: none;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px #ccc;
`;

const StyledCardContent = styled.div`
    padding: 16px;
`;

const StyledContentWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
`;
const StyledImageWrapper = styled.div`
    height: 300px;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
    img {
        max-width: 100%;
    }
`;
const StyledOverlayMotion = motion.custom(StyledOverlay);
const StyledCardModalMotion = motion.custom(StyledCardModal);
const StyledImageWrapperMotion = motion.custom(StyledImageWrapper);
const FAMotion = motion.custom(FontAwesomeIcon);
const Services = [
    {
        id: 1,
        name: ' Front-end Development',
        icons: [faCode],
        description: 'FE description',
        img:
            'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
    },
    {
        id: 2,
        name: ' Web & Mobile Design',
        icons: [faMobileAlt, faWindowMaximize],
        description: 'Web description',
        img:
            'https://adamwebster.me/static/1636c8ef247f3cee9f35b7f2900e97cc/f422e/NorthernCaravan.jpg',
    },
    {
        id: 3,
        name: 'Logo Design & Branding',
        icons: [faPalette],
        description: 'Logo description',
        img:
            'https://adamwebster.me/static/1636c8ef247f3cee9f35b7f2900e97cc/f422e/NorthernCaravan.jpg',
    },
];

const projects = [
    {
        id: 1,
        title: 'Project 1',
        bgColor: 'tomato',
    },
    {
        id: 2,
        title: 'Project 1',
        bgColor: Colors.primary,
    },
    {
        id: 3,
        title: 'Project 1',
        bgColor: 'purple',
    },
    {
        id: 4,
        title: 'Project 1',
        bgColor: Colors.lighter,
    },
];
const FramerMotion = () => {
    const [selectedId, setSelectedID] = useState<number | null>(null);
    const [selectedService, setSelectedService] = useState<any | null>(null);
    return (
        <>
            <StyledSiteHeader>
                Adam Webster
                <StyledNav>
                    <ul>
                        <li>Home</li>
                        <li>Portfolio</li>
                        <li>Blog</li>
                        <li>Contact</li>
                    </ul>
                </StyledNav>
            </StyledSiteHeader>
            <StyledHeaderContainer>
                <StyledHeaderContainerInner>
                    <AnimatedLogo />
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, right: '-300px' }}
                            animate={{ opacity: 1, right: '0px' }}
                            transition={{
                                default: { duration: 2 },
                                right: { duration: 1.5, ease: 'easeInOut' },
                            }}
                        >
                            Adam Webster
                        </motion.h1>
                        <motion.h2
                            initial={{ opacity: 0, right: '-300px' }}
                            animate={{ opacity: 1, right: '0px' }}
                            transition={{
                                default: { duration: 2 },
                                right: { duration: 1.5, ease: 'easeInOut' },
                            }}
                        >
                            Designer and Front-end Developer
                        </motion.h2>
                    </div>
                </StyledHeaderContainerInner>
            </StyledHeaderContainer>
            <StyledContentWrapper>
                <StyledSectionHeader>Services</StyledSectionHeader>
            </StyledContentWrapper>
            <AnimateSharedLayout type="crossfade">
                <StyledServicesGrid>
                    {Services.map((service, index) => {
                        return (
                            <motion.div
                                key={service.id}
                                style={{ position: 'relative' }}
                                initial={{ opacity: 0, top: '-30px' }}
                                animate={{ opacity: 1, top: '0px' }}
                                transition={{
                                    default: {
                                        duration: 0.5,
                                        delay: index / 2,
                                    },
                                    top: {
                                        duration: 0.5,
                                        ease: 'easeInOut',
                                    },
                                }}
                            >
                                <motion.div
                                    layoutId={`card-container-${service.id}`}
                                >
                                    <StyledServicesCard
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            const { key } = e;
                                            console.log(key);
                                            switch (key) {
                                                case 'Enter':
                                                    e.preventDefault();
                                                    setSelectedID(service.id);
                                                    setSelectedService(service);
                                                    break;
                                                default:
                                            }
                                        }}
                                        onClick={() => {
                                            setSelectedID(service.id);
                                            setSelectedService(service);
                                        }}
                                    >
                                        <div>
                                            {service.icons.map(
                                                (icon, index) => (
                                                    <FAMotion
                                                        animate
                                                        key={`icon_${index}`}
                                                        size="5x"
                                                        icon={icon}
                                                    />
                                                )
                                            )}
                                        </div>
                                        <motion.span animate>
                                            {service.name}
                                        </motion.span>
                                    </StyledServicesCard>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </StyledServicesGrid>

                <AnimatePresence>
                    {selectedId && (
                        <>
                            <StyledOverlayMotion
                                onClick={() => setSelectedID(null)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15 },
                                }}
                                transition={{ duration: 0.2, delay: 0.15 }}
                                style={{ pointerEvents: 'auto' }}
                                className="overlay"
                            >
                                <StyledCardModalMotion
                                    layoutId={`card-container-${selectedId}`}
                                >
                                    <StyledImageWrapperMotion>
                                        <motion.img
                                            src={selectedService.img}
                                            alt={selectedService.name}
                                        />
                                    </StyledImageWrapperMotion>
                                    <StyledCardContent>
                                        <motion.h1 animate>
                                            {selectedService.name}
                                        </motion.h1>
                                        <motion.div animate>
                                            {selectedService.description}
                                        </motion.div>
                                    </StyledCardContent>
                                </StyledCardModalMotion>
                            </StyledOverlayMotion>
                        </>
                    )}
                </AnimatePresence>
            </AnimateSharedLayout>

            <StyledContentWrapper>
                <StyledSectionHeader>Projects</StyledSectionHeader>
            </StyledContentWrapper>
            <StyledProjectsGrid>
                {projects.map((project, index) => (
                    <StyledFullWidthWrapper bgColor={project.bgColor}>
                        <StyledProjectItem grid={index + 1}>
                            <img src="https://adamwebster.me/static/1636c8ef247f3cee9f35b7f2900e97cc/f422e/NorthernCaravan.jpg" />
                            <div>
                                <LoremIpsum p={3} />
                            </div>
                        </StyledProjectItem>
                    </StyledFullWidthWrapper>
                ))}
            </StyledProjectsGrid>
            <StyledContentWrapper>
                <StyledSectionHeader>Skills</StyledSectionHeader>
            </StyledContentWrapper>
            <StyledSkillsContainer>
                <StyledSkillsGrid>
                    <div>
                        <FontAwesomeIcon size="3x" icon={faJsSquare} />
                        <span>JavaScript</span>
                    </div>
                    <div>
                        <FontAwesomeIcon size="3x" icon={faHtml5} />
                        <span>HTML5</span>
                    </div>
                    <div>
                        <FontAwesomeIcon size="3x" icon={faCss3Alt} />
                        <span>CSS3</span>
                    </div>
                    <div>
                        <FontAwesomeIcon size="3x" icon={faReact} />
                        <span>React</span>
                    </div>
                    <div>
                        <FontAwesomeIcon size="3x" icon={faWordpressSimple} />
                        <span>Wordpress</span>
                    </div>
                </StyledSkillsGrid>
            </StyledSkillsContainer>
        </>
    );
};

export default FramerMotion;
