scoreGame = function(game) {
  game.players[game.lastScorer].pile.push.apply(game.players[game.lastScorer].pile, game.table);
  game.table = [];
  game.inProgress = false;
  game.finished = new Date();

  var mostCards = ['x', -1],
    mostCoins = ['x', -1],
    highestPrimiera = ['x', -1];

  Object.keys(game.players).forEach(function(id) {
    var pile = game.players[id].pile


    var cardCount = pile.length;
    if (cardCount > mostCards[1]) {
      mostCards = [id, cardCount];
    } else if (cardCount === mostCards[1]) {
      mostCards = false;
    }


    var coinCount = suit('Quadri', pile).length;
    if (coinCount > mostCoins[1]) {
      mostCoins = [id, coinCount];
    } else if (coinCount === mostCoins[1]) {
      mostCoins = false;
    }

    if (hasSetteBello(pile)) {
      game.players[id].score.setteBello = 1;
    }

    var primiera = getPrimiera(pile);
    if (primiera > highestPrimiera[1]) {
      highestPrimiera = [id, primiera];
    } else if (primiera === highestPrimiera[1]) {
      highestPrimiera = false;
    }
  });

  if (mostCards) game.players[mostCards[0]].score.mostCards = 1;
  if (mostCoins) game.players[mostCoins[0]].score.mostCoins = 1;
  if (highestPrimiera) game.players[highestPrimiera[0]].score.primiera = 1;

  var highest = ['x', -1];

  Object.keys(game.players).forEach(function(id) {
    var s = game.players[id].score;

    game.players[id].score.total = s.mostCards + s.mostCoins + s.primiera + s.setteBello + s.scopa;

    if (game.players[id].score.total > highest[1]) {
      highest = [id, game.players[id].score.total];
    } else if (game.players[id].score.total === highest[1]) {
      highest = false;
    }
  });
  game.winner = highest ? highest[0] : 'tie';
};

var primieraPoints = {
  '7': 21,
  '6': 18,
  '1': 16,
  '5': 15,
  '4': 14,
  '3': 13,
  '2': 12,
  '10': 10,
  '8': 0,
  '9': 0
};

function getPrimiera(set) {
  var cards = [suit('Cuori', set), suit('Quadri', set), suit('Picche', set), suit('Fiori', set)];

  return cards.map(function(suit) {
    return suit.map(function(card) {
      return primieraPoints[card.value];
    }).sort(function(a, b) {
      return b - a;
    })[0];
  }).reduce(function(a, b) {
    return a + b;
  });
}

function hasSetteBello(set) {
  return _.some(set, function(card) {
    return card.suit === 'Quadri' && card.value === 7;
  });
}

function suit(suit, cards) {
  return cards.filter(function(card) {
    return card.suit === suit;
  });
}
