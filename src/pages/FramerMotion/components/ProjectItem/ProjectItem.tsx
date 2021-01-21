import styled, { css } from 'styled-components';
import { StyledFullWidthWrapper } from '../../styles/styles';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@adamwebster/fused-components';
function isEven(n: number) {
    return n % 2 == 0;
}
interface StyledProjectItemInterface {
    grid?: number;
    index: number;
}

const StyledProjectItem = styled.div<StyledProjectItemInterface>`
    display: flex;
    padding: 16px;
    color: #fff;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
    position: relative;
    ${({ index }) =>
        !isEven(index) &&
        css`
            flex-flow: row-reverse;
        `}
`;

const StyledImageWrapper = styled.div<StyledProjectItemInterface>`
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        border-radius: 8px;
        width: 358px;
        height: auto;
    }
    ${({ index }) =>
        !isEven(index)
            ? css`
                  margin-left: 64px;
              `
            : css`
                  margin-right: 64px;
              `}
`;

interface StyledButtonProps {
    bgColor?: string;
}

const StyledButton = styled(Button)<StyledButtonProps>`
    height: 40px;
    padding: 8px 32px;
    border-radius: 40px;
`;

const StyledProjectDescription = styled.div`
    margin: 32px 0;
`;
interface Props {
    project: any;
    index: number;
}
const ProjectItem = ({ project, index }: Props) => {
    let projectItemWrapper = useRef<HTMLDivElement | null>(null);
    const [show, setShow] = useState(false);
    const handleScroll = () => {
        if (projectItemWrapper) {
            if (
                projectItemWrapper?.current!.offsetTop <
                window.pageYOffset +
                    projectItemWrapper?.current!.offsetHeight * 2
            ) {
                setShow(true);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [projectItemWrapper]);
    return (
        <StyledFullWidthWrapper
            show={show}
            ref={projectItemWrapper}
            bgColor={project.bgColor}
            bgImage={project.bgImage}
        >
            <StyledProjectItem index={index}>
                <StyledImageWrapper index={index}>
                    <img src="https://adamwebster.me/static/1636c8ef247f3cee9f35b7f2900e97cc/f422e/NorthernCaravan.jpg" />
                </StyledImageWrapper>
                <div>
                    <h3>{project.name}</h3>
                    {project.client && <div>Client: {project.client}</div>}
                    {project.software && (
                        <div>Software: {project.software}</div>
                    )}
                    <div>
                        <StyledProjectDescription>
                            {project.description}
                        </StyledProjectDescription>
                        <StyledButton primary>View</StyledButton>
                    </div>
                </div>
            </StyledProjectItem>
        </StyledFullWidthWrapper>
    );
};

export default ProjectItem;
