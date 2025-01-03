// تحسين البحث: تأكد من عدم البحث عند إدخال نص فارغ
document.getElementById("search-bar").addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();
    if (query === "") {
        apps.forEach(app => app.style.display = "block");
        document.getElementById("no-results").style.display = "none";
        return;
    }

    const apps = document.querySelectorAll(".app-container");
    let found = false;  // لعرض رسالة عند عدم وجود نتائج

    apps.forEach(app => {
        const appName = app.querySelector("h1").textContent.toLowerCase();
        if (appName.includes(query)) {
            app.style.display = "block";
            found = true;
        } else {
            app.style.display = "none";
        }
    });

    // إظهار أو إخفاء رسالة لا توجد نتائج
    const noResultsMessage = document.getElementById("no-results");
    if (found) {
        noResultsMessage.style.display = "none";
    } else {
        noResultsMessage.style.display = "block";
    }
});


function downloadAPK(url, filename) {
    fetch(url).then(response => {
        if (response.ok) {
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
        } else {
            alert('الرابط غير متوفر أو حدث خطأ أثناء التحميل!');
        }
    }).catch(error => {
        console.error('خطأ في تحميل التطبيق:', error);
        alert('حدث خطأ غير متوقع أثناء تحميل التطبيق!');
    });
}


function shareApp(url) {
    if (navigator.share) {
        navigator.share({
            title: 'شارك هذا التطبيق',
            text: 'قم بتحميل هذا التطبيق المميز:',
            url: url
        }).then(() => {
            console.log('تمت المشاركة بنجاح');
        }).catch((error) => {
            console.error('خطأ أثناء المشاركة:', error);
        });
    } else {
        // طريقة بديلة لنسخ الرابط
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = url;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('تم نسخ الرابط إلى الحافظة!');
    }
}
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('install-btn').style.display = 'block';
});

document.getElementById('install-btn').addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((result) => {
        if (result.outcome === 'accepted') {
            console.log('تم تثبيت التطبيق');
        } else {
            console.log('تم رفض التثبيت');
        }
        deferredPrompt = null;
    });
});
