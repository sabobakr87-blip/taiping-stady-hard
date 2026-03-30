// 1. المتغيرات الأساسية وقاعدة البيانات
let userImageData = localStorage.getItem('userPhoto') || "";
let favoriteLessons = JSON.parse(localStorage.getItem('favorites')) || [];

const MY_DATA = {
    "اللغة العربية": [
        { title: "اسم الفاعل", subject: "مستر فاروق", videoUrl: "https://www.youtube.com/embed/mMPIR5DJat4" },
        { title: "صيغة المبالغة", subject: "مستر فاروق", videoUrl: "https://www.youtube.com/embed/XYsyFmmgc_w" },
        { title: "اسم المفعول", subject: "مستر فاروق", videoUrl: "https://www.youtube.com/embed/wUN3m0FNaDI" },
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

// 2. منطق تسجيل الدخول وزر الواتساب
function checkInputs() {
    const waBtn = document.getElementById('waBtn');
    const submitBtn = document.querySelector('.login-btn'); // زر "ابدأ المذاكرة"
    const fields = ['username', 'password', 'adress', 'phone'].map(id => document.getElementById(id));
    
    // 1. فحص هل كل الحقول النصية مكتوبة؟
    const allFieldsFilled = fields.every(f => f && f.value.trim() !== "");
    
    // 2. فحص هل الصورة تم رفعها؟ (نتأكد أن المتغير يحتوي على بيانات)
    const isImageUploaded = userImageData && userImageData.length > 500; 

    if (allFieldsFilled && isImageUploaded) {
        // فك القفل عن زر الواتساب
        if (waBtn) {
            waBtn.classList.add('active');
            waBtn.style.pointerEvents = "auto";
            waBtn.style.opacity = "1";
            waBtn.style.filter = "grayscale(0%)"; // إزالة اللون الرمادي
        }
        // فك القفل عن زر التسجيل
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
            submitBtn.style.cursor = "pointer";
        }
    } else {
        // قفل زر الواتساب
        if (waBtn) {
            waBtn.classList.remove('active');
            waBtn.style.pointerEvents = "none";
            waBtn.style.opacity = "0.5";
            waBtn.style.filter = "grayscale(100%)"; // جعله رمادي تماماً
        }
        // قفل زر التسجيل
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.5";
            submitBtn.style.cursor = "not-allowed";
        }
    }
}


// 3. معالجة الصور والتسجيل
const imageInput = document.getElementById('userImage');
if (imageInput) {
    imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                userImageData = e.target.result;
                const previewImg = document.getElementById('profilePreviewImg');
                if (previewImg) {
                    previewImg.src = userImageData;
                    previewImg.style.display = 'block';
                    document.querySelector('.image-preview i').style.display = 'none';
                }
                // استدعاء الفحص هنا فوراً ليفتح الأزرار
                checkInputs(); 
            };
            reader.readAsDataURL(file);
        }
    });
}

// 4. عرض الدروس ونظام المفضلة (القلب)
function renderLessons(dataToRender = MY_DATA, isFavView = false) {
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
                            <div onclick="playLesson('${lesson.title}', '${lesson.videoUrl}')">
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
    // تحديث العرض فوراً
    const currentView = document.body.dataset.view === 'fav' ? { "دروسك المفضلة": favoriteLessons } : MY_DATA;
    renderLessons(currentView);
}

function renderFavorites() {
    document.body.dataset.view = 'fav';
    if (favoriteLessons.length === 0) {
        document.getElementById('foldersContainer').innerHTML = "<h2 class='folder-title'>المفضلة فارغة حالياً 💔</h2>";
    } else {
        renderLessons({ "دروسك المفضلة": favoriteLessons }, true);
    }
}

// 5. وظائف إضافية (بحث، سلايدر، بروفايل)
function playLesson(title, url, subject) { // أضفنا subject هنا
    localStorage.setItem('play_title', title);
    localStorage.setItem('play_url', url); 
    localStorage.setItem('play_subject', subject); // حفظ المادة
    window.location.href = 'player.html';
}

function searchLessons() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(term) ? "block" : "none";
    });
}

let slideIndex = 0;
function moveSlide(n) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    slides[slideIndex].classList.remove('active');
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
}

function updateSidebarProfile() {
    if (document.getElementById('sideUserImg')) {
        document.getElementById('sideUserImg').src = localStorage.getItem('userPhoto') || "image/0.jpg";
        document.getElementById('sideUserName').innerText = localStorage.getItem('currentUser') || "طالب";
        document.getElementById('sideUserAddress').innerText = localStorage.getItem('userAddress') || "غير مسجل";
        document.getElementById('sideUserPhone').innerText = localStorage.getItem('userPhone') || "غير مسجل";
        if (document.getElementById('studentNameDisplay')) {
            document.getElementById('studentNameDisplay').innerText = localStorage.getItem('currentUser') || "طالب";
        }
    }
}

// 6. تشغيل السكربت عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    document.body.dataset.view = 'home';
    updateSidebarProfile();
    renderLessons();
    
    // تفعيل فحص المدخلات في صفحة الاندكس
    const inputs = document.querySelectorAll('.input-box input');
    inputs.forEach(input => input.addEventListener('input', checkInputs));

    // زر تسجيل الخروج
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            localStorage.removeItem('isLogged');
            window.location.href = 'index.html';
        };
    }
    
    // تشغيل السلايدر تلقائياً
    if (document.querySelectorAll('.slide').length > 0) {
        setInterval(() => moveSlide(1), 5000);
    }
});
// 1. تشغيل الفيديو من LocalStorage
window.onload = function() {
    const videoUrl = localStorage.getItem('play_url');
    const title = localStorage.getItem('play_title');
    const subject = localStorage.getItem('play_subject');

    if (videoUrl) {
        const wrapper = document.getElementById('videoWrapper');
        const cleanUrl = videoUrl + "?rel=0&autoplay=1";
        wrapper.innerHTML = `
            <iframe width="100%" height="100%" src="${cleanUrl}" 
                    frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
            </iframe>`;
        document.getElementById('vTitle').innerText = title;
        document.getElementById('vSubject').innerText = subject;
    }
}

// 1. تشغيل الفيديو من LocalStorage
window.onload = function() {
    const videoUrl = localStorage.getItem('play_url');
    const title = localStorage.getItem('play_title');
    const subject = localStorage.getItem('play_subject');

    if (videoUrl) {
        const wrapper = document.getElementById('videoWrapper');
        const cleanUrl = videoUrl + "?rel=0&autoplay=1";
        wrapper.innerHTML = `
            <iframe width="100%" height="100%" src="${cleanUrl}" 
                    frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
            </iframe>`;
        document.getElementById('vTitle').innerText = title;
        document.getElementById('vSubject').innerText = subject;
    }
}

// 2. إعدادات Firebase واللايكات
// 2. إعدادات Firebase واللايكات (النسخة المطورة لكل فيديو)
const firebaseConfig = {
    apiKey: "AIzaSyBLuIFnExXMIXvyNXdQElC1DHFtbjOUY2o",
    authDomain: "like-eacfa.firebaseapp.com",
    databaseURL: "https://like-eacfa-default-rtdb.firebaseio.com",
    projectId: "like-eacfa",
    storageBucket: "like-eacfa.firebasestorage.app",
    messagingSenderId: "921550003195",
    appId: "1:921550003195:web:ced683a4d7c183f06e095e"
};

// التأكد من تشغيل Firebase مرة واحدة فقط
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
const database = firebase.database();

// تحديد مرجع فريد للفيديو الحالي بناءً على عنوانه
const videoTitle = localStorage.getItem('play_title') || "video_default";
const videoKey = videoTitle.replace(/[.#$[\]]/g, "_"); // تنظيف العنوان للـ Firebase
const likesRef = database.ref('likesByVideo/' + videoKey);

const heartCheckbox = document.getElementById('heart');
const countOne = document.querySelector('.like-count.one');
const countTwo = document.querySelector('.like-count.two');

// استرجاع حالة اللايك لهذا الفيديو من ذاكرة المتصفح
const hasLiked = localStorage.getItem('hasLiked_' + videoKey) === 'true';
if (heartCheckbox) heartCheckbox.checked = hasLiked;

// مزامنة العداد من Firebase
likesRef.on('value', (snapshot) => {
    const count = snapshot.val() || 0;
    if (heartCheckbox && heartCheckbox.checked) {
        if(countOne) countOne.innerText = count - 1; 
        if(countTwo) countTwo.innerText = count;
    } else {
        if(countOne) countOne.innerText = count;
        if(countTwo) countTwo.innerText = count + 1;
    }
});

// التعامل مع الضغط على زر اللايك
if (heartCheckbox) {
    heartCheckbox.addEventListener('change', () => {
        // حفظ الحالة في المتصفح لمنع تكرار اللايك لنفس المستخدم
        localStorage.setItem('hasLiked_' + videoKey, heartCheckbox.checked);
        
        // تحديث الرقم في Firebase
        likesRef.transaction((currentCount) => {
            return (currentCount || 0) + (heartCheckbox.checked ? 1 : -1);
        });
    });
}
// --- تابع الجزء الثالث: معالجة الصور والتسجيل ---
if (imageInput) {
    imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                userImageData = e.target.result;
                const previewImg = document.getElementById('profilePreviewImg');
                if (previewImg) {
                    previewImg.src = userImageData;
                    previewImg.style.display = 'block';
                    document.querySelector('.image-preview i').style.display = 'none';
                }
            };
            reader.readAsDataURL(file);
        }
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        localStorage.setItem('isLogged', 'true');
        localStorage.setItem('currentUser', document.getElementById('username').value);
        localStorage.setItem('userAddress', document.getElementById('adress').value);
        localStorage.setItem('userPhone', document.getElementById('phone').value);
        if (userImageData) localStorage.setItem('userPhoto', userImageData);
        window.location.href = 'profile.html';
    });
}

// --- الجزء الرابع: وظائف العرض والبحث والمفضلة ---

function renderLessons(dataToRender = MY_DATA, isFavView = false) {
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
    const currentView = document.body.dataset.view === 'fav' ? { "دروسك المفضلة": favoriteLessons } : MY_DATA;
    renderLessons(currentView);
}

function playLesson(title, url, subject) {
    localStorage.setItem('play_title', title);
    localStorage.setItem('play_url', url); 
    localStorage.setItem('play_subject', subject);
    window.location.href = 'player.html';
}

function searchLessons() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(term) ? "block" : "none";
    });
}

function updateSidebarProfile() {
    const sideImg = document.getElementById('sideUserImg');
    if (sideImg) {
        sideImg.src = localStorage.getItem('userPhoto') || "image/0.jpg";
        document.getElementById('sideUserName').innerText = localStorage.getItem('currentUser') || "طالب";
        document.getElementById('sideUserAddress').innerText = localStorage.getItem('userAddress') || "غير مسجل";
        document.getElementById('sideUserPhone').innerText = localStorage.getItem('userPhone') || "غير مسجل";
    }
}

// --- الجزء الخامس: تفعيل السكربت النهائي ---
document.addEventListener('DOMContentLoaded', () => {
    updateSidebarProfile();
    renderLessons();
    
    // فحص المدخلات لزر واتساب
    const inputs = document.querySelectorAll('.input-box input');
    inputs.forEach(input => input.addEventListener('input', checkInputs));

    // زر تسجيل الخروج
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            localStorage.removeItem('isLogged');
            window.location.href = 'index.html';
        };
    }
});
