import {
    GlobalStyles,
    StyledButton,
    StyledHeroText,
    StyledLayoutGrid,
    StyledHeroContent,
    StyledTextInput,
    StyledFormGroup,
} from './styles/styles';
import phones from './assets/images/phones.png';
import './styles/_fonts.css';
import { motion } from 'framer-motion';

const SignUpPage = () => {
    return (
        <>
            <GlobalStyles />
            <StyledLayoutGrid>
                <StyledHeroContent style={{ backgroundColor: '#000' }}>
                    <StyledHeroText
                        initial={{ opacity: 0, y: -200 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Sign up for something
                        <br /> amazing!
                    </StyledHeroText>
                    <StyledFormGroup
                        initial={{ opacity: 0, y: -200 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <StyledTextInput />
                        <StyledButton>Sign Up</StyledButton>
                    </StyledFormGroup>
                </StyledHeroContent>
                <StyledHeroContent>
                    <motion.img
                        initial={{ opacity: 0, y: -200 }}
                        animate={{ opacity: 1, y: 0 }}
                        src={phones}
                        alt="Floating iPhones"
                        transition={{
                            duration: 1,
                        }}
                    />
                </StyledHeroContent>
            </StyledLayoutGrid>
        </>
    );
};

export default SignUpPage;
