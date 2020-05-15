import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import { Button, DropdownButton } from '@adamwebster/fused-components';

const HelloLazy = React.lazy(() => import('./components/HelloLazy'));

const Wrapper = styled.section`
    width: 500px;
    margin: 20px auto;
`;

const StyledDropdownButton = styled.div`
    margin-right: 10px;
    float: left;
`;

const LazyComponent = () => {
    const [commentsLoaded, setCommentsLoaded] = useState(4);
    const [commentsToLoad, setCommentsToLoad] = useState(4);
    return (
        <Wrapper>
            <Suspense fallback={<div>...loading</div>}>
                <HelloLazy commentsLoaded={commentsLoaded} />
            </Suspense>

            {commentsLoaded < 36 && (
                <>
                    <StyledDropdownButton>
                        <span>Amount to load: </span>
                        <DropdownButton
                            id="button1"
                            label={commentsToLoad.toString()}
                        >
                            <DropdownButton.Menu>
                                <DropdownButton.MenuItem
                                    onClick={() => setCommentsToLoad(4)}
                                >
                                    4
                                </DropdownButton.MenuItem>
                                <DropdownButton.MenuItem
                                    onClick={() => setCommentsToLoad(8)}
                                >
                                    8
                                </DropdownButton.MenuItem>
                                <DropdownButton.MenuItem
                                    onClick={() => setCommentsToLoad(8)}
                                >
                                    12
                                </DropdownButton.MenuItem>
                            </DropdownButton.Menu>
                        </DropdownButton>
                    </StyledDropdownButton>

                    <Button
                        primary
                        onClick={() =>
                            setCommentsLoaded(commentsLoaded + commentsToLoad)
                        }
                    >
                        Load more
                    </Button>
                </>
            )}
        </Wrapper>
    );
};

export default LazyComponent;
