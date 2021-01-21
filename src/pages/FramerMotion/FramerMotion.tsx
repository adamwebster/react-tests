import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import { AnimatedLogo } from './components/AnimatedLogo';
import styled from 'styled-components';
import { Card, Colors, FCTheme } from '@adamwebster/fused-components';
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
import { useContext, useState } from 'react';
import { ProjectItem } from './components/ProjectItem';

const StyledSiteHeader = styled.header`
    width: 100%;
    position: fixed;
    background-color: ${Colors.primary};
    color: #fff;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    z-index: 2;
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

const StyledSectionHeader = styled.h2`
    font-weight: bolder;
    font-size: 2.5rem;
    text-align: center;
    color: ${Colors.mediumdark};
    position: relative;
    width: fit-content;
    margin: 64px auto;
    &:after {
        content: '';
        position: absolute;
        height: 5px;
        background-color: ${Colors.medium};
        width: 75%;
        left: 50%;
        transform: translateX(-50%);
        bottom: -8px;
    }
`;

const StyledServicesGrid = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 64px;
    padding: 0 16px;
    > div {
        flex: 1 1;
    }
`;

const StyledBlogPostGrid = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 64px;
    padding: 0 16px;
    > div {
        flex: 1 1;
    }
`;

const StyledBlogPostCard = styled(Card)`
    border: none;
    display: flex;
    position: relative;
    flex-flow: column;
    flex: 1 1;
    overflow: hidden;
    padding-bottom: 30px;
    box-shadow: 0 0 10px ${({ theme }) => (theme === 'dark' ? '#000' : '#ccc')};
    z-index: 1;
`;

const StyledBlogPostFeaturedImageWrapper = styled.div`
    height: 150px;
    width: 100%;
    overflow: hidden;
    img {
        width: 100%;
        height: auto;
    }
`;

const StyledBlogPostContent = styled.div`
    padding: 16px;
`;

const StyledServicesCard = styled(Card)`
    border: none;
    display: flex;
    position: relative;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    flex: 1 1;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s ease 0s;
    padding-bottom: 30px;
    box-shadow: 0 0 10px ${({ theme }) => (theme === 'dark' ? '#000' : '#ccc')};

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

const StyledServicesCardImageWrapper = styled.div`
    width: 100%;
    height: 150px;
    overflow: hidden;
    margin-bottom: 32px;
    img {
        width: 100%;
    }
`;
const StyledOverlay = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) =>
        theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
`;

const StyledCardModal = styled.div`
    position: fixed;
    z-index: 1;
    overflow: hidden;
    height: auto;
    max-width: 700px;
    pointer-events: none;
    background-color: ${({ theme }) =>
        theme === 'dark' ? Colors.darkModeDark : '#fff'};
    border-radius: 8px;
    box-shadow: 0 0 10px ${({ theme }) => (theme === 'dark' ? '#000' : '#ccc')};
    z-index: 2;
`;

const StyledCardContent = styled.div`
    padding: 16px 32px 32px;
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
        width: 100%;
    }
`;

const StyledFooter = styled.footer`
    width: 100%;
    height: 200px;
    background-color: ${Colors.primary};
    padding: 16px;
    box-sizing: border-box;
    color: #fff;
    margin-top: 64px;
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
        description:
            'This logo was designed for a Photographer that take photos in Ontario, Canada. He mainly takes photos of landscapes and animals. The circle and arrow part of the logo represents a compass with its needle pointing north and the tree represents the main subjects of his photos. You can take a look at his photos on his instagram @NorthernCaravan.',
        img:
            'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
    },
    {
        id: 2,
        name: ' Web & Mobile Design',
        icons: [faMobileAlt, faWindowMaximize],
        description:
            'This logo was designed for a Photographer that take photos in Ontario, Canada. He mainly takes photos of landscapes and animals. The circle and arrow part of the logo represents a compass with its needle pointing north and the tree represents the main subjects of his photos. You can take a look at his photos on his instagram @NorthernCaravan.',
        img:
            'https://adamwebster.me/static/1636c8ef247f3cee9f35b7f2900e97cc/f422e/NorthernCaravan.jpg',
    },
    {
        id: 3,
        name: 'Logo Design & Branding',
        icons: [faPalette],
        description:
            'This logo was designed for a Photographer that take photos in Ontario, Canada. He mainly takes photos of landscapes and animals. The circle and arrow part of the logo represents a compass with its needle pointing north and the tree represents the main subjects of his photos. You can take a look at his photos on his instagram @NorthernCaravan.',
        img:
            'https://adamwebster.me/static/1636c8ef247f3cee9f35b7f2900e97cc/f422e/NorthernCaravan.jpg',
    },
];

const projects = [
    {
        id: 1,
        name: 'Norther Caravan Logo',
        bgColor: 'tomato',
        software: 'Affinity Designer',
        client: 'Norther Caravan',
        bgImage:
            'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80',
        description: `This logo was designed for a Photographer that take photos in Ontario, Canada. He mainly takes photos of landscapes and animals. The circle and arrow part of the logo represents a compass with its needle pointing north and the tree represents the main subjects of his photos.

            You can take a look at his photos on his instagram @NorthernCaravan.`,
    },
    {
        id: 2,
        name: 'Project 2',
        bgColor: Colors.primary,
        bgImage:
            'https://images.unsplash.com/photo-1551503766-ac63dfa6401c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80',
        description: `This logo was designed for a Photographer that take photos in Ontario, Canada. He mainly takes photos of landscapes and animals. The circle and arrow part of the logo represents a compass with its needle pointing north and the tree represents the main subjects of his photos.

            You can take a look at his photos on his instagram @NorthernCaravan.`,
    },
    {
        id: 3,
        name: 'Project 3',
        bgColor: 'purple',
        bgImage:
            'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80',
        description: `This logo was designed for a Photographer that take photos in Ontario, Canada. He mainly takes photos of landscapes and animals. The circle and arrow part of the logo represents a compass with its needle pointing north and the tree represents the main subjects of his photos.

            You can take a look at his photos on his instagram @NorthernCaravan.`,
    },
    {
        id: 4,
        name: 'Project 4',
        bgColor: Colors.lighter,
        bgImage:
            'https://images.unsplash.com/photo-1551503766-ac63dfa6401c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80',
        description: `This logo was designed for a Photographer that take photos in Ontario, Canada. He mainly takes photos of landscapes and animals. The circle and arrow part of the logo represents a compass with its needle pointing north and the tree represents the main subjects of his photos.

            You can take a look at his photos on his instagram @NorthernCaravan.`,
    },
];

const blogPosts = [
    {
        id: 1,
        title: 'Norther Caravan Logo',
        featuredImage:
            'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80',
        content: `This logo was designed for a Photographer that take photos in Ontario, Canada. He mainly takes photos of landscapes and animals. The circle and arrow part of the logo represents a compass with its needle pointing north and the tree represents the main subjects of his photos.

            You can take a look at his photos on his instagram @NorthernCaravan.`,
    },
    {
        id: 2,
        title: 'Project 2',
        bgColor: Colors.primary,
        featuredImage:
            'https://images.unsplash.com/photo-1551503766-ac63dfa6401c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80',
        content: `This logo was designed for a Photographer that take photos in Ontario, Canada. He mainly takes photos of landscapes and animals. The circle and arrow part of the logo represents a compass with its needle pointing north and the tree represents the main subjects of his photos.

            You can take a look at his photos on his instagram @NorthernCaravan.`,
    },
    {
        id: 3,
        title: 'Project 3',
        bgColor: 'purple',
        featuredImage:
            'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80',
        content: `This logo was designed for a Photographer that take photos in Ontario, Canada. He mainly takes photos of landscapes and animals. The circle and arrow part of the logo represents a compass with its needle pointing north and the tree represents the main subjects of his photos.

            You can take a look at his photos on his instagram @NorthernCaravan.`,
    },
];
const FramerMotion = () => {
    const [selectedId, setSelectedID] = useState<number | null>(null);
    const [selectedService, setSelectedService] = useState<any | null>(null);
    const { theme } = useContext(FCTheme);
    return (
        <>
            {console.log(theme)}
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
                                    exit={{ opacity: 0 }}
                                >
                                    <StyledServicesCard
                                        theme={theme}
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
                                        <StyledServicesCardImageWrapper>
                                            <motion.img
                                                src={service.img}
                                                alt={service.name}
                                                layoutId={`card-container-${service.id}-img`}
                                            />
                                            {/* {service.icons.map(
                                                (icon, index) => (
                                                    <FontAwesomeIcon
                                                        key={`icon_${index}`}
                                                        size="5x"
                                                        icon={icon}
                                                    />
                                                )
                                            )} */}
                                        </StyledServicesCardImageWrapper>
                                        <span>{service.name}</span>
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
                                theme={theme}
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
                                    theme={theme}
                                    layoutId={`card-container-${selectedId}`}
                                >
                                    <StyledImageWrapperMotion>
                                        <motion.img
                                            src={selectedService.img}
                                            alt={selectedService.name}
                                            layoutId={`card-container-${selectedService.id}-img`}
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
                    <ProjectItem
                        index={index}
                        key={`project${project.id}`}
                        project={project}
                    />
                ))}
            </StyledProjectsGrid>
            {/* <StyledContentWrapper>
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
            </StyledSkillsContainer> */}
            <StyledContentWrapper>
                <StyledSectionHeader>Latest Blog Posts</StyledSectionHeader>
            </StyledContentWrapper>
            <StyledBlogPostGrid>
                {blogPosts.map((post) => (
                    <StyledBlogPostCard theme={theme}>
                        <StyledBlogPostFeaturedImageWrapper>
                            <img src={post.featuredImage} />
                        </StyledBlogPostFeaturedImageWrapper>
                        <StyledBlogPostContent>
                            {' '}
                            <h2> {post.title}</h2>
                            <p> {post.content}</p>
                        </StyledBlogPostContent>
                    </StyledBlogPostCard>
                ))}
            </StyledBlogPostGrid>
            <StyledFooter>&copy; 2021 Adam Webster</StyledFooter>
        </>
    );
};

export default FramerMotion;