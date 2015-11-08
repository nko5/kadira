import {playSound, stopSound, loopSound} from './util/sound'

export default {
  setMode(mode) {
    console.log('mode:', mode);
  },

  setSelfStream(stream) {
    return this.setStream('video-self', stream);
  },

  setPeerStream(stream) {
    return this.setStream('video-peer', stream);
  },

  setStream(elementId, stream) {
    return new Promise((resolve, reject) => {
      var video = document.getElementById(elementId);
      video.src = URL.createObjectURL(stream);
      video.onloadedmetadata = (e) => {
        video.play();
        resolve(stream);
      };
    });
  },

  showConnected() {
    resetHealthBars();
    
    loopSound('crowd')
  },

  showAttackBell() {
    playSound('bell');
    console.log('BELL!!');
  },

  showSelfAttack(type, millis, extra) {
    // if extra > 0, user has cheated
    // let him know and regret this
    playSound(type);
    console.log('ATTACK:SELF!', type);
  },

  setSelfAttackCount(n) {
    updateHealth('peer', n)

    console.log('ATTACK:COUNT:SELF!', n);
  },

  showPeerAttack(type) {
    playSound('ouch');
    console.log('ATTACK:PEER!', type);
  },

  setPeerAttackCount(n) {
    console.log('ATTACK:COUNT:PEER!', n);
  },

  showWinMessage() {
    stopSound('crowd');
    playSound('win');
    console.log('WIN!');
  },

  showLoseMessage() {
    stopSound('crowd');
    playSound('lose');
    console.log('LOSE!');
  },

  showNextRound(round) {
    console.log('ROUND %d', round);
  }
};

function resetHealthBars() {
  $('.health-bar-peer').css('width', '100%');
  $('.health-bar-peer-text').text(100);

  $('.health-bar-self').css('width', '100%');
  $('.health-bar-self-text').text(100);

}

function updateHealth(target, n) {
  var health = ((10 - n)/10)*100;

  $('.health-bar-'+target).css('width', health+'%');
  $('.health-bar-'+target+'-text').text(health);
}