// 타이머 변수 초기화
var timer;
var hoursInput = document.getElementById('hours');
var minutesInput = document.getElementById('minutes');
var secondsInput = document.getElementById('seconds');
var timerDisplay = document.getElementById('timer');
var timeInputForm = document.getElementById('timeInput');

// 음악 재생을 위한 Audio 객체 생성
var audio = new Audio('bgm.mp3');

function playSound() {
  audio.play();
}

var remainingSeconds = 0; // 남은 시간 저장할 변수

timerDisplay.style.display = 'none';

function validateInput() {
  // 시간 입력이 음수이거나 분 또는 초가 범위를 벗어난 경우 false를 반환
  var hours = parseInt(hoursInput.value);
  var minutes = parseInt(minutesInput.value);
  var seconds = parseInt(secondsInput.value);

  if (
    hours < 0 ||
    minutes < 0 ||
    seconds < 0 ||
    minutes >= 60 ||
    seconds >= 60
  ) {
    alert('올바른 시간을 입력하세요.');
    resetTimer(); // 리셋 호출 추가
    return false;
  }

  return true;
}

function updateDisplay(totalSeconds) {
  // 초를 시, 분, 초로 변환
  var displayHours = Math.floor(totalSeconds / 3600);
  var displayMinutes = Math.floor((totalSeconds % 3600) / 60);
  var displaySeconds = totalSeconds % 60;

  // 시간을 두 자리 숫자로 표시
  displayHours = displayHours < 10 ? '0' + displayHours : displayHours;
  displayMinutes = displayMinutes < 10 ? '0' + displayMinutes : displayMinutes;
  displaySeconds = displaySeconds < 10 ? '0' + displaySeconds : displaySeconds;

  // 타이머 화면에 표시
  timerDisplay.innerHTML =
    displayHours + ':' + displayMinutes + ':' + displaySeconds;

  // 추가된 부분: 0초일 때 한 번 더 업데이트
  if (totalSeconds === 0) {
    setTimeout(function () {
      timerDisplay.innerHTML = '00:00:00';
    }, 1000);
  }
}

function startTimer() {
  // 입력 유효성 검사
  if (!validateInput()) {
    return;
  }

  // 현재 입력된 시간을 초로 변환
  var totalSeconds =
    parseInt(hoursInput.value) * 3600 +
    parseInt(minutesInput.value) * 60 +
    parseInt(secondsInput.value);

  // 추가된 부분: 중간에 타이머가 멈추었을 때 남은 시간 저장
  if (remainingSeconds > 0) {
    totalSeconds = remainingSeconds;
    remainingSeconds = 0;
  }

  // 첫 번째 업데이트
  updateDisplay(totalSeconds);

  // 입력 폼 숨기기
  timeInputForm.style.display = 'none';

  // 타이머 보이기
  timerDisplay.style.display = 'block';

  // 버튼 비활성화
  document.getElementById('startBtn').disabled = true;

  // 타이머 시작
  timer = setInterval(function () {
    if (totalSeconds <= 0) {
      clearInterval(timer);
      // 알림창 표시
      alert('기지개를 피자 눈도 깜박깜박 !');
      playSound(); // 타이머가 종료될 때 음악 재생
      resetTimer();
    } else {
      // 추가된 부분: 중간에 타이머가 멈추었을 때 남은 시간 저장
      remainingSeconds = totalSeconds - 1;

      // 1초 감소
      totalSeconds--;

      // 업데이트
      updateDisplay(totalSeconds);

      // 추가된 부분: 타이머가 종료되지 않았을 때 음악 재생
      if (totalSeconds <= 0) {
        playSound();
      }
    }
  }, 1000);
}

function stopTimer() {
  // 타이머 정지
  clearInterval(timer);
  // start 버튼 활성화
  document.getElementById('startBtn').disabled = false;
}

function resetTimer() {
  // 타이머 초기화
  //clearInterval(timer);
  //timerDisplay.innerHTML = "00:00:00";
  //hoursInput.value = "0";
  // minutesInput.value = "0";
  // secondsInput.value = "0";
  //remainingSeconds = 0;
  // 페이지 리로드
  location.reload();
}
