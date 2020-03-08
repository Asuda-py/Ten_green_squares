const numDivs = 36;
const maxHits = 10;

var hits = 0;
let firstHitTime = 0;

$('#game').hide();



function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый +
  $('.target').removeClass("target");
  $('.miss').removeClass('miss');
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером +
  $(divSelector).text(hits + 1);
  // FIXME: тут надо определять при первом клике firstHitTime +
  if (hits === 1) {
    firstHitTime = getTimestamp();
  };

  if (hits === maxHits) {
    endGame();
  }
};

function endGame() {
  // FIXME: спрятать игровое поле сначала +
  $('#gameBody').hide();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");

};

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text? +
  if ($(event.target).hasClass("target")) {
    $('.target').text("");
    hits = hits + 1;
    round();
  }else{$(event.target).addClass('miss')};
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss +
};

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке +
  round();

  $(".game-field").click(handleClick);
  $("#button-end").click(function() {
    location.reload();
  });
};

$('#button-gameStart').click(function start() {
  $('#button-gameStart').hide()
  $('#game').show()
  $('#button-restart').hide()
});

$(document).ready(init);
