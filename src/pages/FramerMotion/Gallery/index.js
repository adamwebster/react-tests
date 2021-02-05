import { motion, AnimateSharedLayout } from 'framer-motion';
import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

const settings = {
    baseURLSpecies: 'http://canadianspeciesinitiative.temp.sentex.ca/species/',
    baseAPIURL:
        'http://canadianspeciesinitiative.temp.sentex.ca/wp-json/wp/v2/',
};

const StyledDiv = styled.div`
    background-color: ${({ back }) => (back ? 'black' : 'transparent')};
    ${({ back }) =>
        back &&
        css`
            display: flex;
            align-items: center;
            justify-content: center;
        `}
    width: calc(33.333% - 4px);
    margin: 2px;
    height: 400px;
    box-sizing: border-box;
    position: relative;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0;
    }
    &:nth-child(4),
    &:nth-child(5) {
        width: calc(50% - 4px);
        height: 400px;
    }
    @media (max-width: 768px) {
        width: 100% !important;
    }
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

const StyledWrapper = styled.div`
    .species-gallery {
        padding: 0 12px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        height: 600px;
        @media (max-width: 768px) {
            flex-direction: column;
            height: auto;
        }
    }
`;

const StyledCategoryName = styled.div`
    position: absolute;
    z-index: 2;
    color: #fff;
    font-size: 2.5rem;
    font-weight: 700;
`;

const StyledImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &:after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
    }
    @media (max-width: 768px) {
        flex-direction: column;
    }
    &:hover {
        opacity: 0.9;
    }
`;
// const { useState, useEffect } = wp.element;

const StyledDivMotion = motion.custom(StyledDiv);
const SpeciesGallery = () => {
    const [parentCategories, setParentCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);

    const loadChildCategories = (cat) => {
        fetch(settings.baseAPIURL + `categories?per_page=100&parent=${cat.id}`)
            .then((resp) => {
                return resp.json();
            })
            .then((categories) => {
                if (categories.length > 0) {
                    setChildCategories(categories);
                } else {
                    window.location.href = `${settings.baseURLSpecies}${cat.slug}`;
                }
            });
    };

    const handleKeyDown = (e) => {
        const { keyCode } = e;
        if (keyCode === 13) {
            e.target.click();
        }
    };

    useEffect(() => {
        console.log(1);
        fetch(settings.baseAPIURL + 'categories?per_page=100')
            .then((resp) => {
                return resp.json();
            })
            .then((categories) => {
                console.log('here', categories);
                const parentCats = categories.filter(
                    (cat) => cat.parent === 15
                );
                setParentCategories(parentCats);
            });
    }, []);
    return (
        <StyledWrapper>
            <AnimateSharedLayout type="crossfade">
                {childCategories.length === 0 && (
                    <motion.div
                        className="species-gallery"
                        layoutId="image-gallery"
                        initial={{ opacity: 0, top: -20 }}
                        animate={{ opacity: 1, top: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        {parentCategories.map((cat, index) => (
                            <StyledDivMotion
                                tabIndex={0}
                                role="button"
                                onKeyDown={(e) => handleKeyDown(e)}
                                onClick={() => loadChildCategories(cat)}
                                initial={{ opacity: 0, top: -20 }}
                                animate={{ opacity: 1, top: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    default: {
                                        duration: 0.5,
                                        delay: index / 4,
                                    },
                                }}
                                key={cat.name}
                            >
                                <StyledImageWrapper>
                                    <img
                                        alt={`${cat.name}`}
                                        src={cat.category_image.url}
                                    />
                                    <StyledCategoryName>
                                        {cat.name}
                                    </StyledCategoryName>
                                </StyledImageWrapper>
                            </StyledDivMotion>
                        ))}
                    </motion.div>
                )}
                {childCategories.length > 0 && (
                    <motion.div
                        className="species-gallery"
                        layoutId="image-gallery"
                    >
                        <StyledDiv
                            tabIndex={0}
                            role="button"
                            back={true}
                            onKeyDown={(e) => handleKeyDown(e)}
                            onClick={() => setChildCategories([])}
                        >
                            <StyledCategoryName>
                                <FontAwesomeIcon icon={faArrowCircleLeft} />{' '}
                                Back
                            </StyledCategoryName>
                        </StyledDiv>
                        {childCategories.map((cat, index) => (
                            <StyledDivMotion
                                tabIndex={0}
                                role="button"
                                key={cat.name}
                                onKeyDown={(e) => handleKeyDown(e)}
                                onClick={() => loadChildCategories(cat)}
                                initial={{ opacity: 0, top: -20 }}
                                animate={{ opacity: 1, top: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    default: {
                                        duration: 0.5,
                                        delay: index / 4,
                                    },
                                }}
                            >
                                <StyledImageWrapper>
                                    <img
                                        alt={`${cat.name}`}
                                        src={cat.category_image.url}
                                    />
                                    <StyledCategoryName>
                                        {' '}
                                        {cat.name}
                                    </StyledCategoryName>
                                </StyledImageWrapper>
                            </StyledDivMotion>
                        ))}
                    </motion.div>
                )}
            </AnimateSharedLayout>
        </StyledWrapper>
    );
};

export default SpeciesGallery;
