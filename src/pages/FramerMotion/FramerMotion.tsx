import { motion } from 'framer-motion';
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
    background-color: #bcdaff;
    margin-bottom: 32px;
`;

const StyledHeaderContainerInner = styled.div`
    max-width: 1200px;
    padding: 16px;
    background-color: #bcdaff;
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
    gap: 16px;
    grid-template-areas:
        'grid1 grid1 grid2 grid3'
        'grid1 grid1 grid4 grid4';
    min-height: 400px;
    max-width: 1200px;
    margin: 0 auto;
`;

const StyledServicesGrid = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
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
    svg {
        margin-bottom: 32px;
        + svg {
            margin-left: 16px;
        }
    }
`;

const Services = [
    {
        name: ' Front-end Development',
        icons: [faCode],
    },
    {
        name: ' Web & Mobile Design',
        icons: [faMobileAlt, faWindowMaximize],
    },
    {
        name: 'Logo Design & Branding',
        icons: [faPalette],
    },
];
const FramerMotion = () => {
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
            <StyledServicesGrid>
                {Services.map((service, index) => {
                    return (
                        <motion.div
                            style={{ position: 'relative' }}
                            initial={{ opacity: 0, top: '-30px' }}
                            animate={{ opacity: 1, top: '0px' }}
                            transition={{
                                default: { duration: 0.5, delay: index / 2 },
                                top: { duration: 0.5, ease: 'easeInOut' },
                            }}
                        >
                            <StyledServicesCard>
                                <div>
                                    {service.icons.map((icon) => (
                                        <FontAwesomeIcon
                                            size="5x"
                                            icon={icon}
                                        />
                                    ))}
                                </div>
                                <span>{service.name}</span>
                            </StyledServicesCard>
                        </motion.div>
                    );
                })}
            </StyledServicesGrid>
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
            <StyledProjectsGrid></StyledProjectsGrid>
        </>
    );
};

export default FramerMotion;
