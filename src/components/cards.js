import styled from 'styled-components';
import Card from './card';

const StyledCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  grid-gap: 0.5em;

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

function Cards({ cards, incrementScore, ...props }) {
  return (
    <StyledCards {...props}>
      {cards.map(({ img, caption }, index) => (
        <Card
          img={img}
          caption={caption}
          cardId={index}
          key={index}
          onClick={incrementScore}
        />
      ))}
    </StyledCards>
  );
}

export default Cards;
