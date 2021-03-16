import {
    faEnvelope,
    faHome,
    faInfoCircle,
    faUser,
    faBars,
    faArrowCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import LoremIpsum from 'react-lorem-ipsum';
import styled, { css } from 'styled-components';

const StyledMobileMenu = styled.div`
    display: flex;
    position: fixed;
    height: 50px;
    width: ${({ menuOpen }) => (menuOpen ? 'calc(100% - 16px)' : '50px')};
    right: 8px;
    bottom: 8px;
    justify-content: flex-end;
`;

const StyledMobilMenuButton = styled.div`
    display: flex;
    width: 50px;
    justify-content: center;
    align-items: center;
`;

const StyledMobileNav = styled.nav`
    display: flex;
    background-color: rgba(255, 255, 255, 0.2);
    border: solid 1px #ccc;
    border-radius: 25px;
    overflow: hidden;
    box-shadow: 0 0 20px #ccc;
    backdrop-filter: blur(15px);
`;

const StyledMobileMenuItem = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    border-right: solid 1px #ccc;
    ${({ active }) =>
        active &&
        css`
            color: #fff;
        `}
    &:last-child {
        border-right: none;
    }
`;

const StyledActive = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #008aff;
`;

const StyledMenuItemLabel = styled.span`
    font-size: 0.7rem;
    margin-top: 4px;
`;

const StyledMobileNavMotion = motion(StyledMobileNav);
const StyledActiveMotion = motion(StyledActive);
const StyledMobileMenuMotion = motion(StyledMobileMenu);
const spring = {
    type: 'spring',
    stiffness: 500,
    damping: 30,
};

const MobilMenuItem = ({ active, children, icon, label, ...rest }) => (
    <>
        <StyledMobileMenuItem active={active} {...rest}>
            {active && (
                <StyledActiveMotion
                    transition={spring}
                    animate
                    layoutId="active-menu-item"
                />
            )}
            <StyledMobileMenuItem>
                {icon}
                {label && <StyledMenuItemLabel>{label}</StyledMenuItemLabel>}
            </StyledMobileMenuItem>
        </StyledMobileMenuItem>
    </>
);

const MobileMotionMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuExpanded, setMenuExpanded] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('Home');
    const menuItems = [
        { icon: faHome, label: 'Home' },
        { icon: faInfoCircle, label: 'Info' },
        { icon: faUser, label: 'Profile' },
        { icon: faEnvelope, label: 'Contact' },
    ];

    return (
        <>
            <div
                style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}
            >
                <h1>Title {menuExpanded.toString()}</h1>
                <LoremIpsum p={30} random={false} />
            </div>
            <StyledMobileMenuMotion menuOpen={menuExpanded}>
                <AnimateSharedLayout>
                    <AnimatePresence>
                        {/* This component must be the first animatable child of an AnimatePresence to enable the exit animation. */}
                        <>
                            <StyledMobileNavMotion
                                initial={{
                                    width: '50px',
                                }}
                                animate={{
                                    width: menuOpen ? '100%' : '50px',
                                    opacity: 1,
                                }}
                                transition={{
                                    type: 'spring',
                                    duration: 0.7,
                                }}
                                onAnimationComplete={() => {
                                    if (!menuOpen) setMenuExpanded(false);
                                }}
                            >
                                {menuOpen && (
                                    <AnimateSharedLayout>
                                        {menuItems.map((menuItem) => (
                                            <MobilMenuItem
                                                onClick={() =>
                                                    setActiveMenuItem(
                                                        menuItem.label
                                                    )
                                                }
                                                active={
                                                    activeMenuItem ===
                                                    menuItem.label
                                                }
                                                label={menuItem.label}
                                                icon={
                                                    <FontAwesomeIcon
                                                        size="sm"
                                                        icon={menuItem.icon}
                                                    />
                                                }
                                                key={menuItem.label}
                                            />
                                        ))}
                                    </AnimateSharedLayout>
                                )}
                                <StyledMobilMenuButton
                                    onClick={() => {
                                        setMenuOpen(!menuOpen);
                                        setMenuExpanded(true);
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={
                                            menuOpen
                                                ? faArrowCircleRight
                                                : faBars
                                        }
                                    />
                                </StyledMobilMenuButton>
                            </StyledMobileNavMotion>
                        </>
                    </AnimatePresence>
                </AnimateSharedLayout>
            </StyledMobileMenuMotion>
        </>
    );
};

export default MobileMotionMenu;
