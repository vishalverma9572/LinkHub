import React from 'react';
import HorizontalCard from './HorizontalCard';

const CardList = (props) => {
  const { userLinks, searchQuery } = props;
  

  // Filter the cards based on the search query
  const filteredCards =userLinks && userLinks.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {filteredCards && filteredCards.map((card) => (
        <HorizontalCard
          key={card.linkid}
          linkName={card.name}
          linkid={card.linkid}
          views={card.views}
          publish={card.published}
          lastupdated={card.lastupdated}
        />
      ))}
      {filteredCards && filteredCards.length === 0 && (
        <div className="no-links">No links found</div>
      )}
    </div>
  );
};

export default CardList;
