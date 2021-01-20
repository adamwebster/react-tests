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
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(3, 1fr);
`;

const StyledServicesCard = styled(Card)`
    padding: 32px 16px;
    border: none;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    svg {
        margin-bottom: 32px;
        + svg {
            margin-left: 16px;
        }
    }
`;
const FramerMotion = () => {
    return (
        <>
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
                <StyledServicesCard>
                    <FontAwesomeIcon size="5x" icon={faCode} />
                    <span> Front-end Development</span>
                </StyledServicesCard>
                <StyledServicesCard>
                    <div>
                        <FontAwesomeIcon size="5x" icon={faMobileAlt} />
                        <FontAwesomeIcon size="5x" icon={faWindowMaximize} />
                    </div>
                    Web & Mobile Design
                </StyledServicesCard>
                <StyledServicesCard>
                    <FontAwesomeIcon size="5x" icon={faPalette} />
                    <span>Logo Design & Branding</span>
                </StyledServicesCard>
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
