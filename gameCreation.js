GameFactory = {};

GameFactory.createGame = function(playerIds) {
  var deck = createDeck(),
    players = createPlayers(playerIds);

  GameFactory.dealPlayers(players, deck);

  var table = dealTable(deck);

  return {
    deck: deck,
    players: players,
    table: table,
    currentTurn: playerIds,
    inProgress: true,
    started: new Date()
  };
}

GameFactory.dealPlayers = function(players, deck) {
  for (var i = 0; i < 3; i++) {
    Object.keys(players).forEach(function(id) {
      players[id].hand.push(deck.shift());
    })
  }
}

function dealTable(deck) {
  var cards = deck.shift.bind(deck);
  return [cards(), cards(), cards(), cards()];
}

function createPlayers(ids) {
  var o = {};
  ids.forEach(function(id) {
    o[id] = {
      hand: [],
      pile: [],
      score: {
        mostCoins: 0,
        mostCards: 0,
        setteBello: 0,
        primiera: 0,
        scopa: 0
      }
    }
  })
  return o;
}

function createDeck() {
  var suits = ['Cuori', 'Quadri', 'Fiori', 'Picche'],
    cards = [];
  suits.forEach(function(suit) {
    for (var i = 0; i < 10; i++) {
      var name = i;
      if (i === 1) name = 'A';
      if (i === 8) name = 'J';
      if (i === 9) name = 'Q';
      if (i === 10) name = 'K';
      cards.push({
        suit: suit,
        value: i,
        name: name
      });
    }
  });

  return _.shuffle(cards);
}
