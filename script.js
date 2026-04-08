// 1. المتغيرات الأساسية وقاعدة البيانات
let userImageData = localStorage.getItem('userPhoto') || "";
let favoriteLessons = JSON.parse(localStorage.getItem('favorites')) || [];

const MY_DATA = {
    "اللغة العربية": [
        { title: "اسم الفاعل", subject: "مستر فاروق", videoUrl: "https://www.youtube.com/embed/mMPIR5DJat4" },
        { title: "صيغة المبالغة", subject: "مستر فاروق", videoUrl: "https://www.youtube.com/embed/XYsyFmmgc_w" },
        { title: "اسم المفعول", subject: "mستر فاروق", videoUrl: "https://www.youtube.com/embed/wUN3m0FNaDI" },
        { title: "اسم الزمان واسم المكان", subject: "مستر فاروق", videoUrl: "https://www.youtube.com/embed/gtsEUfqs9RU" },
        { title: "اسم الآلة", subject: "مستر فاروق", videoUrl: "https://www.youtube.com/embed/IyE6-LsFYgU" },
        { title: "اسم التفضيل", subject: "مستر فاروق", videoUrl: "https://www.youtube.com/embed/_mtb3-NWu-A" },
        { title: "مراجعة القرائة", subject: "مستر فاروق", videoUrl: "https://www.youtube.com/embed/YH9ObE_Y7vM" },
        { title: "مراجعة النحو", subject: "مستر فاروق", videoUrl: "https://www.youtube.com/embed/qpa9P16SMrA" },
        { title: "مراجعة النصوص", subject: "مستر فاروق", videoUrl: "https://www.youtube.com/embed/hkWTU1dBR38" },
    ],
    "الرياضيات": [
        { title: "مراجعة الوحدة الاولى جبر", subject: "مستر مايكل صفوت", videoUrl: "https://www.youtube.com/embed/zPk_-gwqOT4" },
        { title: "مراجعة الوحدة الثانية جبر", subject: "مستر مايكل صفوت", videoUrl: "https://www.youtube.com/embed/orNPYOfATUk" },
        { title: "مراجعة الوحدة الاولى هندسة اختر فقط", subject: "مستر مايكل صفوت", videoUrl: "https://www.youtube.com/embed/_pqE7rQMU6k" },
        { title: "مراجعة الوحدة الاولى هندسة مقالي", subject: "مستر مايكل صفوت", videoUrl: "https://www.youtube.com/embed/MyD3b74H0zk" },
        { title: "مراجعة الوحدة الثانية هندسة مقالي ج1", subject: "مستر مايكل صفوت", videoUrl: "https://www.youtube.com/embed/HYH7UZQ2mOk" },
        { title: "مراجعة الوحدة الثانية هندسة مقالي ج2", subject: "مستر مايكل صفوت", videoUrl: "https://www.youtube.com/embed/HUJkNbG8JKI" },
    ],
    "اللغة الانجليزية": [
        { title: "يونيت 7", subject: "ميس ياسمين", videoUrl: "https://www.youtube.com/embed/TlJluCpSUFo?start=654" },
        { title: "يونيت 8", subject: "ميس ياسمين", videoUrl: "https://www.youtube.com/embed/90pmChIGuYA" },
        { title: "يونيت 9", subject: "ميس ياسمين", videoUrl: "https://www.youtube.com/embed/ultPo5vlEeU?start=13" },
        { title: "يونيت 10", subject: "ميس ياسمين", videoUrl: "https://www.youtube.com/embed/h4YuK5kMfqU" },
        { title: "يونيت 11", subject: "ميس ياسمين", videoUrl: "#" },
        { title: "يونيت 12", subject: "ميس ياسمين", videoUrl: "#" },
    ],
    "العلوم": [
        { title: "مراجعة الوحدة الاولى", subject: "مستر احمد السعدي", videoUrl: "https://www.youtube.com/embed/YRJqiv1Np7s" },
        { title: "مراجعة الوحدة الثانية", subject: "مستر احمد السعدي", videoUrl: "https://www.youtube.com/embed/8jtwr5VGG0c" },
        { title: "مراجعة الوحدة الثالثة", subject: "مستر احمد حسام", videoUrl: "https://www.youtube.com/embed/_McA1QVEQNw" },
        { title: "مراجعة الوحدة الرابعة", subject: "مستر احمد حسام", videoUrl: "https://www.youtube.com/embed/Ig-wv5UEJsM" },
        { title: "مراجعة منهج العلوم كامل", subject: "مستر محمد ابراهيم", videoUrl: "https://www.youtube.com/embed/DJ6i2Wqj0ec" },
    ],
    "الدرسات الاجتماعية": [
        { title: "مراجعة الجغرافيا", subject: "مستر مهاب سلامة", videoUrl: "https://www.youtube.com/embed/YRJqiv1Np7s" },
        { title: "مراجعة تاريخ", subject: "مستر مهاب سلامة", videoUrl: "https://www.youtube.com/embed/J4QI9zGMeDs" },
        { title: "مراجعة الخرائط", subject: "مستر مهاب سلامة", videoUrl: "https://www.youtube.com/embed/C-5xSe-T1uI" },
        { title: "اهم توقعات الامتحان مراجعة شاملة", subject: "مستر مهاب سلامة", videoUrl: "https://www.youtube.com/embed/MZPBA-_zkzY" },
    ],
};

// 2. منطق تسجيل الدخول
function checkInputs() {
    const waBtn = document.getElementById('waBtn');
    const submitBtn = document.querySelector('.login-btn');
    const fields = ['username', 'password', 'adress', 'phone'].map(id => document.getElementById(id));
    
    const allFieldsFilled = fields.every(f => f && f.value.trim() !== "");
    const isImageUploaded = userImageData && userImageData.length > 500; 

    if (allFieldsFilled && isImageUploaded) {
        if (waBtn) {
            waBtn.style.pointerEvents = "auto";
            waBtn.style.opacity = "1";
            waBtn.style.filter = "grayscale(0%)";
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
        }
    } else {
        if (waBtn) {
            waBtn.style.pointerEvents = "none";
            waBtn.style.opacity = "0.5";
            waBtn.style.filter = "grayscale(100%)";
        }
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.5";
        }
    }
}

// لازم السطر ده يكون موجود بره أي دالة
const imageInput = document.getElementById('userImage'); 

if (imageInput) {
    imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                userImageData = e.target.result;
                localStorage.setItem('userPhoto', userImageData); // حفظ الصورة
                const previewImg = document.getElementById('profilePreviewImg');
                if (previewImg) {
                    previewImg.src = userImageData;
                    previewImg.style.display = 'block';
                }
                if (typeof checkInputs === "function") checkInputs(); 
            };
            reader.readAsDataURL(file);
        }
    });
}
// 4. عرض الدروس والمفضلة
function renderLessons(dataToRender = MY_DATA) {
    const container = document.getElementById('foldersContainer');
    if (!container) return;
    container.innerHTML = "";

    for (const folder in dataToRender) {
        if (dataToRender[folder].length === 0) continue;

        container.innerHTML += `
            <div class="folder-group" style="margin-bottom: 40px;">
                <h2 class="folder-title">${folder}</h2>
                <div class="cards-grid">
                    ${dataToRender[folder].map(lesson => {
                        const isFav = favoriteLessons.some(f => f.title === lesson.title);
                        return `
                        <div class="card">
                            <button class="favorite-btn ${isFav ? 'active' : ''}" 
                                onclick="toggleFavorite(event, '${lesson.title}', '${lesson.subject}', '${lesson.videoUrl}')">
                                <i class="fas fa-heart"></i>
                            </button>
                            <div onclick="playLesson('${lesson.title}', '${lesson.videoUrl}', '${lesson.subject}')">
                                <div class="card-img-placeholder">🎬</div>
                                <div class="card-info">
                                    <h3>${lesson.title}</h3>
                                    <div class="card-subject">${lesson.subject}</div>
                                </div>
                            </div>
                        </div>`;
                    }).join('')}
                </div>
            </div>`;
    }
}

function toggleFavorite(event, title, subject, videoUrl) {
    event.stopPropagation();
    const index = favoriteLessons.findIndex(f => f.title === title);
    if (index > -1) {
        favoriteLessons.splice(index, 1);
    } else {
        favoriteLessons.push({ title, subject, videoUrl });
    }
    localStorage.setItem('favorites', JSON.stringify(favoriteLessons));
    renderLessons(document.body.dataset.view === 'fav' ? { "المفضلة": favoriteLessons } : MY_DATA);
}

// 5. المشغل (Player)
function playLesson(title, url, subject) {
    localStorage.setItem('play_title', title);
    localStorage.setItem('play_url', url); 
    localStorage.setItem('play_subject', subject);
    window.location.href = 'player.html';
}

// 6. التحديثات والبروفايل
function updateSidebarProfile() {
    const sideImg = document.getElementById('sideUserImg');
    if (sideImg) {
        sideImg.src = localStorage.getItem('userPhoto') || "image/0.jpg";
        document.getElementById('sideUserName').innerText = localStorage.getItem('currentUser') || "طالب";
    }
}

// 7. تشغيل الفيديو في صفحة Player
if (window.location.pathname.includes('player.html')) {
    window.addEventListener('load', () => {
        const url = localStorage.getItem('play_url');
        const wrapper = document.getElementById('videoWrapper');
        if (url && wrapper) {
            wrapper.innerHTML = `<iframe width="100%" height="100%" src="${url}?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>`;
            document.getElementById('vTitle').innerText = localStorage.getItem('play_title');
            document.getElementById('vSubject').innerText = localStorage.getItem('play_subject');
        }
    });
}

// 8. تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    updateSidebarProfile();
    renderLessons();
    const inputs = document.querySelectorAll('.input-box input');
    inputs.forEach(input => input.addEventListener('input', checkInputs));
});
