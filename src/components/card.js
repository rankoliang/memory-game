import styled from 'styled-components';
import 'react-aspect-ratio/aspect-ratio.css';
import AspectRatio from 'react-aspect-ratio';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 2px solid black;
  border-radius: 10px;
  padding: 1.5em 1.5em 0 1.5em;

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

function Card({ img: { src, alt }, caption, cardId, onClick }) {
  return (
    <StyledCard data-card-id={cardId} onClick={onClick}>
      <StyledAspectRatio ratio={1}>
        <img src={src} alt={alt} />
      </StyledAspectRatio>
      <figcaption>{caption}</figcaption>
    </StyledCard>
  );
}

export default Card;
