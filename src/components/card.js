import styled from 'styled-components';
import 'react-aspect-ratio/aspect-ratio.css';
import AspectRatio from 'react-aspect-ratio';
import { useEffect, useRef } from 'react';

const StyledCard = styled.button`
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 2px solid black;
  border-radius: 0.5em;
  padding: 1.5em 1.5em 0 1.5em;

  &:focus {
    border: 0;
    outline-color: orange;
  }

  &:hover {
    cursor: pointer;
  }

  figcaption {
    padding: 0.25em 0;
    font-weight: 600;
    font-size: 2rem;
  }

  @media screen and (max-width: 650px) {
    figcaption {
      font-size: 1.5rem;
    }
  }

  @media screen and (max-width: 500px) {
    figcaption {
      font-size: 1rem;
    }
  }
`;

const StyledAspectRatio = styled(AspectRatio)`
  width: 100%;

  img {
    object-fit: cover;
  }
`;

function Card({ img: { src, alt }, caption, onClick }) {
  const cardEl = useRef(null);

  return (
    <StyledCard
      onClick={onClick}
      aria-label={caption}
      onMouseEnter={() => cardEl.current.focus()}
      onMouseLeave={() => cardEl.current.blur()}
      ref={cardEl}
    >
      <StyledAspectRatio ratio={1}>
        <img src={src} alt={alt} draggable="false" />
      </StyledAspectRatio>
      <figcaption>{caption}</figcaption>
    </StyledCard>
  );
}

export default Card;
