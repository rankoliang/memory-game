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

function Cards({ cards, incrementScore, selectCard, ...props }) {
  return (
    <StyledCards {...props}>
      {cards.map((card, index) => (
        <Card
          img={card.img}
          caption={card.caption}
          cardId={index}
          key={index}
          onClick={() => {
            selectCard(card);
          }}
        />
      ))}
    </StyledCards>
  );
}

export default Cards;
