// 1. تشغيل مصفوفة الماتريكس الوردي الرقمي في الخلفية بشكل دائم
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize = 16;
const columns = canvas.width / fontSize;
const rainDrops = Array(Math.floor(columns)).fill(1);

function renderMatrixLoop() {
    ctx.fillStyle = 'rgba(3, 1, 8, 0.08)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'rgba(255, 42, 127, 0.22)'; 
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const char = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        ctx.fillText(char, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
    requestAnimationFrame(renderMatrixLoop);
}
requestAnimationFrame(renderMatrixLoop);


// 2. تتابع وعرض العبارات الزمنية المطلوبة (التايم لاين)
const matrixText = document.getElementById('matrix-text');
const introContainer = document.getElementById('intro-container');
const finalContent = document.getElementById('final-content');

const timeline = [
    { text: "3", delay: 1000 },
    { text: "2", delay: 1000 },
    { text: "1", delay: 1000 },
    { text: "HAPPY BIRTHDAY TOLEEN", delay: 2000 },
    { text: "2007/6/8", delay: 2000 }
];

let currentStep = 0;

function runIntroTimeline() {
    if (currentStep < timeline.length) {
        matrixText.innerText = timeline[currentStep].text;
        
        matrixText.style.transform = "scale(1.1)";
        setTimeout(() => matrixText.style.transform = "scale(1)", 100);

        setTimeout(() => {
            currentStep++;
            runIntroTimeline();
        }, timeline[currentStep].delay);
    } else {
        // إخفاء العداد وإظهار الاسم الجذاب بدون أي مربعات تشوه المنظر
        introContainer.style.transition = "opacity 0.5s ease";
        introContainer.style.opacity = "0";
        
        setTimeout(() => {
            introContainer.remove();
            finalContent.classList.remove('hidden');
            setTimeout(() => {
                finalContent.classList.add('visible');
            }, 50);
        }, 500);
    }
}

window.onload = () => {
    setTimeout(runIntroTimeline, 400);
};


// 3. منطق زر الموسيقى المتدرج
function toggleAudio() {
    const track = document.getElementById('birthday-song');
    const btn = document.getElementById('play-btn');

    if (track.paused) {
        track.play();
        btn.innerHTML = `<span class="btn-icon">⏸️</span> Pause Music`;
        btn.style.background = "linear-gradient(90deg, #a100ff 0%, #7200cc 100%)";
    } else {
        track.pause();
        btn.innerHTML = `<span class="btn-icon">🎵</span> Play Music`;
        btn.style.background = "linear-gradient(90deg, #ff2a7f 0%, #a100ff 100%)";
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});