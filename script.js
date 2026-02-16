// ============================================
// CONFIGURATION - THAY ĐỔI THÔNG TIN TẠI ĐÂY
// ============================================

const CONFIG = {
    // Thông tin tài khoản ngân hàng
    bank: {
        code: 'VIETCOMBANK',          // Mã ngân hàng (VietQR)
        name: 'VIETCOMBANK',           // Tên hiển thị
        accountNumber: '9984771687',
        accountName: 'LUONG MINH TRIEU VI',
    },
    
    // Thông tin liên hệ
    contact: {
        zalo: '0984771687',
        whatsapp: '84984771687',    // Định dạng quốc tế (84...)
    },
    
    // Nội dung chuyển khoản (để trống nếu muốn random)
    transferContent: '',  // Ví dụ: 'DH12345' hoặc để '' để tự động random
    
    // Tin nhắn mẫu khi gửi bill
    messageTemplate: 'Em đã chuyển khoản, anh kiểm tra giúp em nhé!'
};

// ============================================
// BANK DATA - Danh sách ngân hàng Việt Nam
// ============================================

const BANKS = [
    { 
        code: 'VIETCOMBANK', 
        name: 'Vietcombank', 
        logo: 'https://api.vietqr.io/img/VCB.png',
        deeplink: 'vietcombank://'
    },
    { 
        code: 'TECHCOMBANK', 
        name: 'Techcombank', 
        logo: 'https://api.vietqr.io/img/TCB.png',
        deeplink: 'techcombank://'
    },
    { 
        code: 'VIETINBANK', 
        name: 'VietinBank', 
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJwiKp7sw95zbOvCB1YSJ5i_vaVn2zP8gsPFZahYaFglcBGsvIraOxof4&s',
        deeplink: 'vietinbank://'
    },
    { 
        code: 'BIDV', 
        name: 'BIDV', 
        logo: 'https://api.vietqr.io/img/BIDV.png',
        deeplink: 'bidv://'
    },
    { 
        code: 'AGRIBANK', 
        name: 'Agribank', 
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwcOibTaj6yJLcK_41o4bFBLMuBTIX6AXCv-ihKMHt4w&s',
        deeplink: 'agribank://'
    },
    { 
        code: 'MB', 
        name: 'MBBank', 
        logo: 'https://api.vietqr.io/img/MB.png',
        deeplink: 'mbbank://'
    },
    { 
        code: 'ACB', 
        name: 'ACB', 
        logo: 'https://api.vietqr.io/img/ACB.png',
        deeplink: 'acb://'
    },
    { 
        code: 'SACOMBANK', 
        name: 'Sacombank', 
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxK7E5hhjo7VJQymfDehVkmYdqcWDjGZN6cw4Y78ohTRwK0xS_ErVYbwE&s',
        deeplink: 'sacombank://'
    },
    { 
        code: 'TPB', 
        name: 'TPBank', 
        logo: 'https://api.vietqr.io/img/TPB.png',
        deeplink: 'tpbank://'
    },
    { 
        code: 'VPB', 
        name: 'VPBank', 
        logo: 'https://api.vietqr.io/img/VPB.png',
        deeplink: 'vpbank://'
    },
    { 
        code: 'SHB', 
        name: 'SHB', 
        logo: 'https://api.vietqr.io/img/SHB.png',
        deeplink: 'shb://'
    },
    { 
        code: 'VIETBANK', 
        name: 'VietBank', 
        logo: 'https://api.vietqr.io/img/VIETBANK.png',
        deeplink: 'vietbank://'
    },
    { 
        code: 'MSB', 
        name: 'MSB', 
        logo: 'https://api.vietqr.io/img/MSB.png',
        deeplink: 'msb://'
    },
    { 
        code: 'OCB', 
        name: 'OCB', 
        logo: 'https://api.vietqr.io/img/OCB.png',
        deeplink: 'ocb://'
    },
    { 
        code: 'SCB', 
        name: 'SCB', 
        logo: 'https://api.vietqr.io/img/SCB.png',
        deeplink: 'scb://'
    },
    { 
        code: 'SEABANK', 
        name: 'SeABank', 
        logo: 'https://api.vietqr.io/img/SEAB.png',
        deeplink: 'seabank://'
    }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Generate random transfer content
function generateTransferContent() {
    const prefix = 'DH';
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `${prefix}${randomNum}`;
}

// Get transfer content (use config or generate random)
function getTransferContent() {
    return CONFIG.transferContent || generateTransferContent();
}

// Copy to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (err) {
            document.body.removeChild(textArea);
            return false;
        }
    }
}

// Show popup notification
function showPopup(title, message, duration = 3000) {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popupTitle');
    const popupMessage = document.getElementById('popupMessage');
    
    popupTitle.textContent = title;
    popupMessage.textContent = message;
    
    popup.classList.add('show');
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, duration);
}

// Show loading overlay
function showLoading(show = true) {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (show) {
        loadingOverlay.classList.add('show');
    } else {
        loadingOverlay.classList.remove('show');
    }
}

// Add ripple effect to button
function addRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = button.querySelector('.btn-ripple');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.remove('active');
    
    setTimeout(() => {
        ripple.classList.add('active');
    }, 0);
    
    setTimeout(() => {
        ripple.classList.remove('active');
    }, 600);
}

// ============================================
// QR CODE GENERATION
// ============================================

function generateQRCode() {
    const transferContent = getTransferContent();
    
    // Update transfer content in UI
    document.getElementById('transferContent').textContent = transferContent;
    
    // VietQR API URL
    const qrUrl = `https://img.vietqr.io/image/${CONFIG.bank.code}-${CONFIG.bank.accountNumber}-compact2.jpg?amount=0&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(CONFIG.bank.accountName)}`;
    
    const qrImage = document.getElementById('qrCode');
    const qrSkeleton = document.getElementById('qrSkeleton');
    
    // Show skeleton while loading
    qrSkeleton.classList.remove('hidden');
    
    // Load QR code
    qrImage.onload = function() {
        qrSkeleton.classList.add('hidden');
    };
    
    qrImage.src = qrUrl;
}

// ============================================
// BANK SELECTION
// ============================================

function renderBanks() {
    const bankGrid = document.getElementById('bankGrid');
    
    BANKS.forEach(bank => {
        const bankItem = document.createElement('div');
        bankItem.className = 'bank-item';
        bankItem.innerHTML = `
            <img src="${bank.logo}" alt="${bank.name}" class="bank-logo">
            <div class="bank-name">${bank.name}</div>
        `;
        
        bankItem.addEventListener('click', () => openBankApp(bank));
        bankGrid.appendChild(bankItem);
    });
}

function openBankApp(bank) {
    showLoading(true);
    
    setTimeout(() => {
        showLoading(false);
        
        // Try to open bank app using deep link
        window.location.href = bank.deeplink;
        
        // Fallback: show message if app doesn't open
        setTimeout(() => {
            showPopup(
                'Lưu ý',
                `Nếu app ${bank.name} không mở, vui lòng mở thủ công và quét mã QR`,
                4000
            );
        }, 1000);
    }, 1500);
}

// ============================================
// PAYMENT INFO
// ============================================

function updatePaymentInfo() {
    document.getElementById('bankName').textContent = CONFIG.bank.name;
    document.getElementById('accountNumber').textContent = CONFIG.bank.accountNumber;
    document.getElementById('accountName').textContent = CONFIG.bank.accountName;
}

// ============================================
// CONTACT INFO
// ============================================

function updateContactInfo() {
    document.getElementById('zaloNumber').textContent = CONFIG.contact.zalo;
    document.getElementById('whatsappNumber').textContent = '+' + CONFIG.contact.whatsapp;
}

// ============================================
// THEME TOGGLE
// ============================================

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// ============================================
// EVENT HANDLERS
// ============================================

// Copy account number
document.getElementById('copyAccountBtn').addEventListener('click', async function(e) {
    addRippleEffect(e);
    
    const success = await copyToClipboard(CONFIG.bank.accountNumber);
    
    if (success) {
        showPopup('Thành công!', 'Đã copy số tài khoản');
    } else {
        showPopup('Lỗi', 'Không thể copy, vui lòng copy thủ công');
    }
});

// Open bank app (general)
document.getElementById('openBankAppBtn').addEventListener('click', function(e) {
    addRippleEffect(e);
    
    // Find the configured bank
    const configuredBank = BANKS.find(b => b.code === CONFIG.bank.code);
    
    if (configuredBank) {
        openBankApp(configuredBank);
    } else {
        showPopup(
            'Thông báo',
            'Vui lòng chọn ngân hàng của bạn ở danh sách bên dưới',
            4000
        );
    }
});

// Send Zalo
document.getElementById('sendZaloBtn').addEventListener('click', function(e) {
    addRippleEffect(e);
    
    const zaloUrl = `https://zalo.me/${CONFIG.contact.zalo}?text=${encodeURIComponent(CONFIG.messageTemplate)}`;
    
    window.open(zaloUrl, '_blank');
    
    showPopup('Đang mở Zalo...', 'Vui lòng gửi ảnh bill để xác nhận', 3000);
});

// Send WhatsApp
document.getElementById('sendWhatsAppBtn').addEventListener('click', function(e) {
    addRippleEffect(e);
    
    const whatsappUrl = `https://wa.me/${CONFIG.contact.whatsapp}?text=${encodeURIComponent(CONFIG.messageTemplate)}`;
    
    window.open(whatsappUrl, '_blank');
    
    showPopup('Đang mở WhatsApp...', 'Vui lòng gửi ảnh bill để xác nhận', 3000);
});

// Theme toggle
document.getElementById('themeToggle').addEventListener('click', function(e) {
    toggleTheme();
});

// Add ripple effect to all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', addRippleEffect);
});

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Initialize theme
    initTheme();
    
    // Update payment info
    updatePaymentInfo();
    
    // Update contact info
    updateContactInfo();
    
    // Generate QR code
    generateQRCode();
    
    // Render banks
    renderBanks();
    
    // Set default logo if not exists
    const logo = document.getElementById('logo');
    logo.onerror = function() {
        // Create a default gradient logo if image fails to load
        this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.style.color = 'white';
        this.style.fontSize = '2rem';
        this.style.fontWeight = 'bold';
        this.innerHTML = 'DP';
    };
    
    console.log('✅ Dori Payment initialized successfully!');
    console.log('📋 Configuration:', CONFIG);
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// ADDITIONAL FEATURES
// ============================================

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Prevent context menu on QR code (optional security)
document.getElementById('qrCode').addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showPopup('Thông báo', 'Vui lòng quét mã QR bằng app ngân hàng', 2000);
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to copy account number
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('copyAccountBtn').click();
    }
    
    // Ctrl/Cmd + D to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
});

// Console easter egg
console.log('%c🚀 Dori Payment System', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c💳 Powered by VietQR API', 'color: #764ba2; font-size: 14px;');
console.log('%c⚡ Built with ❤️ for fast & secure payments', 'color: #4facfe; font-size: 12px;');
