import { motion } from 'framer-motion';
import styled from 'styled-components';
import img1 from '../static/images/jason-leung-poI7DelFiVA-unsplash.jpg';
import img2 from '../static/images/new-data-services-nZ50HrjAFNc-unsplash.jpg';

const phoneWidth = 320;
const phoneHeight = 600;

const StyledWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
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
    width: 50px;
    height: 50px;
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
    border-radius: 8px;
    background-color: black;
    flex: 1 1;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 2;
    &:after {
        content: '';
        position: absolute;
        background-color: #fff;
        border-radius: 8px;
        width: ${`calc(${phoneWidth}px - ${phoneSpacing * 2}px)`};
        height: ${`calc(${phoneHeight}px - ${phoneSpacing * 2}px)`};
        left: ${`${phoneSpacing}px`};
        top: ${`${phoneSpacing}px`};
        z-index: 3;
    }
`;

const StyledAppIconMotion = motion.custom(StyledAppIcon);
const FramerMotionAppIcons = () => {
    return (
        <StyledWrapper>
            <StyledPhoneWrapper>
                <StyledPhone />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                ></motion.div>
                <StyledAppIconsWrapper>
                    <StyledAppIconMotion
                        initial={{ x: 0, y: 0 }}
                        animate={{ x: -300, y: 100 }}
                    >
                        <img src={img1} alt="image1" />
                    </StyledAppIconMotion>
                    <StyledAppIconMotion
                        initial={{ x: 0, y: 0 }}
                        animate={{ x: 300, y: 200 }}
                        transition={{ delay: 0.2 }}
                    >
                        <img src={img2} alt="image2" />
                    </StyledAppIconMotion>
                    <StyledAppIconMotion
                        initial={{ x: 0, y: 0 }}
                        animate={{ x: -300, y: 300 }}
                        transition={{ delay: 0.4 }}
                    />
                </StyledAppIconsWrapper>
            </StyledPhoneWrapper>
        </StyledWrapper>
    );
};

export default FramerMotionAppIcons;
