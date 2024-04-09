import React from 'react';
import HorizontalCard from './HorizontalCard';

const CardList = () => {
  const cards = [
    { id: 1, linkName: 'Example Link 1', views: 100,published: false},
    { id: 2, linkName: 'Example Link 2', views: 150,published: true},
    { id: 3, linkName: 'Example Link 3', views: 80,published: false},
  ];

  return (
    <div>
      {cards.map((card) => (
        <HorizontalCard key={card.id} linkName={card.linkName} views={card.views} publish={card.published} />
      ))}
    </div>
  );
};

export default CardList;
