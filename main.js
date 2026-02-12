let timeLeft = 30;
let timer = setInterval(countdown, 1000);

function countdown() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        checkQuiz(true);
    } else {
        document.getElementById("time").innerHTML = timeLeft;
        timeLeft--;
    }
}

function generateCode() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function checkQuiz(timeUp = false) {
    clearInterval(timer);

    let score = 0;
    let q1 = document.querySelector('input[name="q1"]:checked');
    let q2 = document.querySelector('input[name="q2"]:checked');

    if (q1 && q1.value === "a") score++;
    if (q2 && q2.value === "b") score++;

    document.getElementById("submitBtn").disabled = true;
    document.getElementById("restartBtn").style.display = "block";

    if (score === 2) {
        document.getElementById("result").innerHTML =
            "✅ CORRECT!<br>Code: " + generateCode();
    } else {
        if (timeUp) {
            document.getElementById("result").innerHTML = "⏰ TIME EXPIRED";
        } else {
            document.getElementById("result").innerHTML = "❌ WRONG! Try Again.";
        }
    }
}

function restartQuiz() {
    document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
    timeLeft = 30;
    document.getElementById("time").innerHTML = timeLeft;
    timer = setInterval(countdown, 1000);
    document.getElementById("submitBtn").disabled = false;
    document.getElementById("restartBtn").style.display = "none";
    document.getElementById("result").innerHTML = "";
}