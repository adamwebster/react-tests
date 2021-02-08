import { motion, AnimateSharedLayout } from 'framer-motion';
import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowCircleLeft,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';

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
    flex: 1 1 33%;
    padding: 2px;
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
    &:nth-child(5),
    &:nth-child(9),
    &:nth-child(10) {
        flex: 1 1 50%;
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
    const [isLoading, setIsLoading] = useState(false);
    const [galleryChosen, setGalleryChosen] = useState(null);
    const loadChildCategories = (catID, cat, cameFromParentCategory) => {
        console.log('loadchild', catID);
        fetch(
            settings.baseAPIURL +
                `species-category?per_page=100&orderby=title&orderby=title&order=asc&parent=${catID}&_embed`
        )
            .then((resp) => {
                return resp.json();
            })
            .then((categories) => {
                if (categories.length > 0) {
                    setChildCategories(categories);
                    if (cameFromParentCategory) {
                        window.history.pushState(
                            { galleryPage: true },
                            '',
                            window.location.protocol +
                                '//' +
                                window.location.host +
                                window.location.pathname +
                                `?cat_id=${catID}`
                        );
                    }
                    setGalleryChosen(catID);
                } else {
                           if (cat) {
                               window.location.href = `${settings.baseURLSpecies}${cat.slug}`;
                           }
                       }
            });
    };

    const handleKeyDown = (e) => {
        const { keyCode } = e;
        if (keyCode === 13) {
            e.target.click();
        }
    };

    const handleBack = (e) => {
        if (galleryChosen) {
            let url = new URL(window.location.href);
            let params = new URLSearchParams(url.search);
            console.log('delete');
            params.delete('cat_id');
            setGalleryChosen(null);
            setChildCategories([]);
        }
    };

    const handleItemClick = (cat) => {
        loadChildCategories(cat.id, cat, true);
    };
    useEffect(() => {
        setIsLoading(true);
        fetch(
            settings.baseAPIURL +
                'species-category?per_page=100&orderby=title&orderby=title&order=asc&_embed'
        )
            .then((resp) => {
                return resp.json();
            })
            .then((categories) => {
                const parentCats = categories.filter((cat) => cat.parent === 0);
                setParentCategories(parentCats);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        window.addEventListener('popstate', handleBack);
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let catId = params.get('cat_id');
        console.log(catId);
        if (catId) {
            loadChildCategories(catId);
        }
        return () => {
            window.removeEventListener('popstate', handleBack);
        };
    }, [galleryChosen]);

    if (isLoading)
        return (
            <div>
                {/* <StyledWrapper>
            <div className="species-gallery">
              <StyledDiv empty />
              <StyledDiv empty />
              <StyledDiv empty />
              <StyledDiv empty />
              <StyledDiv empty />
            </div>
          </StyledWrapper> */}
                <div style={{ width: '50px', margin: '0 auto' }}>
                    <FontAwesomeIcon icon={faSpinner} size="3x" spin />
                </div>
            </div>
        );
    return (
        <StyledWrapper>
            {childCategories.length === 0 && (
                <motion.div
                    className="species-gallery"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {parentCategories.map((cat, index) => (
                        <StyledDivMotion
                            tabIndex={0}
                            role="button"
                            onKeyDown={(e) => handleKeyDown(e)}
                            onClick={() => handleItemClick(cat)}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
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
                                    alt={`${cat.title.rendered}`}
                                    src={
                                        cat._embedded['wp:featuredmedia'][0]
                                            .source_url
                                    }
                                />
                                <StyledCategoryName>
                                    {cat.title.rendered}
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
                    {/* <StyledDiv
                        tabIndex={0}
                        role="button"
                        back={true}
                        onKeyDown={(e) => handleKeyDown(e)}
                        onClick={() => setChildCategories([])}
                    >
                        <StyledCategoryName>
                            <FontAwesomeIcon icon={faArrowCircleLeft} /> Back
                        </StyledCategoryName>
                    </StyledDiv> */}
                    {childCategories.map((cat, index) => (
                        <StyledDivMotion
                            tabIndex={0}
                            role="button"
                            key={cat.name}
                            onKeyDown={(e) => handleKeyDown(e)}
                            onClick={() => loadChildCategories(cat.id, cat)}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
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
                                    alt={`${cat.title.rendered}`}
                                    src={
                                        cat._embedded['wp:featuredmedia'][0]
                                            .source_url
                                    }
                                />
                                <StyledCategoryName>
                                    {' '}
                                    {cat.title.rendered}
                                </StyledCategoryName>
                            </StyledImageWrapper>
                        </StyledDivMotion>
                    ))}
                </motion.div>
            )}
        </StyledWrapper>
    );
};

export default SpeciesGallery;
