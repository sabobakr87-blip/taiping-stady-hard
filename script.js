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
window.addEventListener('load', () => {
    const loaderScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');

    // الانتظار لمدة 10 ثوانٍ (10000ms)
    setTimeout(() => {
        if (loaderScreen) {
            loaderScreen.style.opacity = '0'; // تأثير تلاشي
            
            setTimeout(() => {
                loaderScreen.style.display = 'none'; // إزالة من الصفحة
                mainContent.style.display = 'block'; // إظهار المحتوى الرئيسي
                document.body.style.overflow = 'auto'; // السماح بالتمرير مجدداً
            }, 500); // نصف ثانية لتأثير التلاشي
        }
    }, 10000); 
});

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
        // 1. نضع النصوص أولاً
        document.getElementById('vTitle').innerText = title;
        document.getElementById('vSubject').innerText = subject;

        // 2. لا نشغل الفيديو فوراً، ننتظر 10 ثوانٍ (نفس مدة شاشة التحميل)
        setTimeout(() => {
            const wrapper = document.getElementById('videoWrapper');
            // الآن فقط نضيف الـ iframe ليتحمل الفيديو ويبدأ الصوت
            const cleanUrl = videoUrl + "?rel=0&autoplay=1";
            wrapper.innerHTML = `
                <iframe width="100%" height="100%" src="${cleanUrl}" 
                        frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
                </iframe>`;
        }, 10500); // 10 ثوانٍ و نصف (لضمان اختفاء شاشة التحميل أولاً)
    }
}

// 2. إعدادات Firebase واللايكات
// 2. إعدادات Firebase واللايكات
const firebaseConfig = {
    apiKey: "AIzaSyBLuIFnExXMIXvyNXdQElC1DHFtbjOUY2o",
    authDomain: "like-eacfa.firebaseapp.com",
    databaseURL: "https://like-eacfa-default-rtdb.firebaseio.com",
    projectId: "like-eacfa",
    storageBucket: "like-eacfa.firebasestorage.app",
    messagingSenderId: "921550003195",
    appId: "1:921550003195:web:ced683a4d7c183f06e095e"
};

if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
const database = firebase.database();

// --- التعديل يبدأ من هنا ليكون لكل فيديو عداد خاص ---
const videoTitle = localStorage.getItem('play_title') || "default_video";
const likesRef = database.ref('likesByVideo/' + videoTitle.replace(/[.#$[\]]/g, "_")); 

const heartCheckbox = document.getElementById('heart');
const countOne = document.querySelector('.like-count.one');
const countTwo = document.querySelector('.like-count.two');

// التأكد من حالة اللايك للفيديو الحالي من المتصفح
const hasLiked = localStorage.getItem('hasLiked_' + videoTitle) === 'true';
if(heartCheckbox) heartCheckbox.checked = hasLiked;

// مزامنة العداد من قاعدة البيانات
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

// عند الضغط على القلب
if(heartCheckbox) {
    heartCheckbox.addEventListener('change', () => {
        localStorage.setItem('hasLiked_' + videoTitle, heartCheckbox.checked);
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

// تحديد مرجع التعليقات في قاعدة البيانات بناءً على عنوان الفيديو
const commentsRef = database.ref('commentsByVideo/' + videoTitle.replace(/[.#$[\]]/g, "_"));

// وظيفة إرسال التعليق
function sendComment() {
    const input = document.getElementById('commentInput');
    const text = input.value.trim();
    const userName = localStorage.getItem('currentUser') || "طالب مجهول";
    const userImg = localStorage.getItem('userPhoto') || "image/0.jpg";

    if (text === "") return;

    const newComment = {
        name: userName,
        image: userImg,
        comment: text,
        timestamp: Date.now()
    };

    commentsRef.push(newComment); // إرسال للـ Firebase
    input.value = ""; // تفريغ الحقل
}

// الاستماع للتعليقات وعرضها
commentsRef.on('value', (snapshot) => {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = "";
    
    const currentUser = localStorage.getItem('currentUser'); // معرفة المستخدم الحالي
    const data = snapshot.val();

    if (data) {
        // نستخدم Object.entries للحصول على الـ Key الخاص بكل تعليق (مهم للحذف والتعديل)
        Object.entries(data).reverse().forEach(([key, c]) => {
            
            // التحقق: هل هذا التعليق ملك للمستخدم الحالي؟
            const isOwner = (c.name === currentUser);

            let actionButtons = isOwner ? `
                <div class="comment-actions">
                    <button class="action-btn edit" onclick="prepareEdit('${key}', '${c.comment}')">تعديل</button>
                    <button class="action-btn delete" onclick="deleteComment('${key}')">حذف</button>
                </div>
            ` : "";

            commentsList.innerHTML += `
                <div class="comment-card" id="comment-${key}">
                    <div class="comment-header">
                        <img src="${c.image}" class="comment-user-img">
                        <span class="comment-user-name">${c.name}</span>
                        ${actionButtons}
                    </div>
                    <div class="comment-text" id="text-${key}">${c.comment}</div>
                </div>
            `;
        });
    } else {
        commentsList.innerHTML = "<p style='color: #666;'>لا توجد تعليقات بعد.</p>";
    }
});

// وظيفة الحذف
function deleteComment(commentKey) {
    if (confirm("هل أنت متأكد من حذف هذا التعليق؟")) {
        commentsRef.child(commentKey).remove()
            .then(() => console.log("تم الحذف بنجاح"))
            .catch((error) => alert("خطأ في الحذف: " + error));
    }
}

// 1. وظيفة التحضير للتعديل (تحويل النص إلى حقل إدخال)
function prepareEdit(commentKey, oldText) {
    // العثور على حاوية نص التعليق المحددة باستخدام الكود الفريد
    const commentDiv = document.querySelector(`#comment-${commentKey} .comment-text`);
    
    if (commentDiv) {
        commentDiv.innerHTML = `
            <input type="text" id="input-${commentKey}" class="edit-input" value="${oldText}" style="width:90%; padding:8px; background:#222; color:white; border:1px solid #e91e63; border-radius:5px;">
            <div style="margin-top:10px; display:flex; gap:10px;">
                <button onclick="saveEdit('${commentKey}')" style="color: #25D366; background:none; border:none; cursor:pointer; font-weight:bold;">حفظ ✅</button>
                <button onclick="renderComments()" style="color: #888; background:none; border:none; cursor:pointer;">إلغاء ❌</button>
            </div>
        `;
    }
}

// 2. وظيفة حفظ التعديل في Firebase
function saveEdit(commentKey) {
    const inputElement = document.getElementById(`input-${commentKey}`);
    const newText = inputElement.value.trim();

    if (newText === "") {
        alert("لا يمكن ترك التعليق فارغاً");
        return;
    }

    // تحديث النص في قاعدة بيانات فيربايس
    commentsRef.child(commentKey).update({
        comment: newText,
        isEdited: true // إضافة علامة اختيارية توضح أن التعليق تم تعديله
    }).then(() => {
        console.log("تم التحديث بنجاح");
        // لا حاجة لعمل شيء هنا لأن المستمع .on('value') سيحدث الشاشة تلقائياً
    }).catch((error) => {
        alert("حدث خطأ أثناء الحفظ: " + error.message);
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
        // نجلب الصورة من التخزين المحلي
        const storedPhoto = localStorage.getItem('userPhoto');
        // إذا وجدت نضعها، وإذا لم توجد نضع الصورة الافتراضية
        sideImg.src = storedPhoto ? storedPhoto : "image/0.jpg"; 
        
        // تحديث باقي النصوص
        if(document.getElementById('sideUserName')) {
            document.getElementById('sideUserName').innerText = localStorage.getItem('currentUser') || "طالب";
        }
        if(document.getElementById('sideUserAddress')) {
            document.getElementById('sideUserAddress').innerText = localStorage.getItem('userAddress') || "غير مسجل";
        }
        if(document.getElementById('sideUserPhone')) {
            document.getElementById('sideUserPhone').innerText = localStorage.getItem('userPhone') || "غير مسجل";
        }
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
const currentUser = localStorage.getItem('currentUser') || "Student";
// إنشاء مرجع في Firebase خاص بهذا المستخدم فقط
const chatRef = database.ref('private_chats/' + currentUser.replace(/[.#$[\]]/g, "_"));

function openChat() {
    document.getElementById('chatContainer').style.display = 'flex';
    loadMessages();
}

function closeChat() {
    document.getElementById('chatContainer').style.display = 'none';
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    
    if (msg === "") return;

    chatRef.push({
        sender: currentUser,
        text: msg,
        timestamp: Date.now()
    });

    input.value = "";
}

function loadMessages() {
    chatRef.on('value', (snapshot) => {
        const msgDiv = document.getElementById('chatMessages');
        msgDiv.innerHTML = "";
        const data = snapshot.val();
        
        if (data) {
            Object.values(data).forEach(m => {
                const isMe = m.sender === currentUser;
                msgDiv.innerHTML += `
                    <div style="align-self: ${isMe ? 'flex-end' : 'flex-start'}; 
                                background: ${isMe ? '#e91e63' : '#333'}; 
                                padding: 8px 12px; border-radius: 10px; max-width: 80%; font-size: 14px;">
                        ${m.text}
                    </div>
                `;
            });
            msgDiv.scrollTop = msgDiv.scrollHeight; // النزول لآخر رسالة تلقائياً
        }
    });
}