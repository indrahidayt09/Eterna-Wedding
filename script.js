document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i data-feather="menu"></i>';
    document.querySelector('.navbar').appendChild(menuToggle);
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    feather.replace();
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelector('.nav-link').classList.toggle('active');
        overlay.classList.toggle('active');
        
        this.innerHTML = document.querySelector('.nav-link.active') ? 
            '<i data-feather="x"></i>' : '<i data-feather="menu"></i>';
        feather.replace();
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        document.querySelector('.nav-link').classList.remove('active');
        this.classList.remove('active');
        menuToggle.innerHTML = '<i data-feather="menu"></i>';
        feather.replace();
    });
    
    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                document.querySelector('.nav-link').classList.remove('active');
                overlay.classList.remove('active');
                menuToggle.innerHTML = '<i data-feather="menu"></i>';
                feather.replace();
            }
        });
    });
});

// ======== Packages ModalBox ======== //
let selectedPackage = '';
let packagePrice = 0;

function openModal(packageName, price) {
    selectedPackage = packageName;
    packagePrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(price);
    
    document.getElementById('selectedPackage').textContent = packageName;
    document.getElementById('packagePrice').textContent = packagePrice;
    document.getElementById('bookingModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

// Send to WhatsApp
function sendToWhatsApp() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('weddingDate').value;
    
    if (!name || !phone || !date) {
        alert('Harap isi data lengkap!');
        return;
    }
    
    const formattedDate = new Date(date).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const message = `Halo Eterna Wedding,\n\nSaya ${name} ingin memesan:\n\n` +
                   `📦 Paket: ${selectedPackage}\n` +
                   `💰 Harga: ${packagePrice}\n` +
                   `📅 Tanggal Pernikahan: ${formattedDate}\n` +
                   `📧 Email: ${email || '-'}\n\n` +
                   `Mohon info lebih lanjut untuk proses selanjutnya. Terima kasih!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    closeModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target == modal) {
        closeModal();
    }
}


// ======= Testimonial Slider ======= //
document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    // Dot click event
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    // Auto slide (optional)
    setInterval(() => {
        let nextIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }, 5000);
});

//========= Galery Script ========//
// Gallery Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    
    let currentIndex = 0;
    const itemsPerPage = window.innerWidth < 768 ? 2 : window.innerWidth < 1024 ? 3 : 4;
    const totalPages = Math.ceil(galleryItems.length / itemsPerPage);
    
    // Create dots
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToPage(i));
        dotsContainer.appendChild(dot);
    }
    
    // Navigation
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalPages) % totalPages;
        updateGallery();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalPages;
        updateGallery();
    });
    
    // Lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            lightboxImg.src = item.querySelector('img').src;
            lightboxImg.alt = item.querySelector('img').alt;
            lightbox.classList.add('active');
        });
    });
    
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
    
    // Responsive adjustments
    window.addEventListener('resize', () => {
        const newItemsPerPage = window.innerWidth < 768 ? 2 : window.innerWidth < 1024 ? 3 : 4;
        if (newItemsPerPage !== itemsPerPage) {
            currentIndex = 0;
            updateGallery();
        }
    });
    
    function updateGallery() {
        const startIndex = currentIndex * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        galleryItems.forEach((item, index) => {
            if (index >= startIndex && index < endIndex) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Update dots
        document.querySelectorAll('.slider-dots .dot').forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Initialize
    updateGallery();
});

// ========= Contact Script ======== //
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    // Modal Elements
    const contactModal = document.getElementById('contactModal');
    const contactBtn = document.querySelector('a[href="#contactModal"]'); // Sesuaikan dengan selector navbar Anda
    const closeBtn = document.querySelector('.close-modal');
    const contactForm = document.getElementById('contactForm');
    
    // Open Modal
    contactBtn.addEventListener('click', function(e) {
      e.preventDefault();
      contactModal.style.display = 'block';
    });
    
    // Close Modal
    closeBtn.addEventListener('click', function() {
      contactModal.style.display = 'none';
    });
    
    // Close when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === contactModal) {
        contactModal.style.display = 'none';
      }
    });
    
    // Form Submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('contactName').value;
      const phone = document.getElementById('contactPhone').value;
      const package = document.getElementById('contactPackage').value;
      const notes = document.getElementById('contactNotes').value;
      
      if (!name || !phone || !package) {
        alert('Harap isi data wajib!');
        return;
      }
      
      const message = `Halo Eterna Wedding,\n\nSaya ${name} ingin konsultasi tentang:\n\n` +
                     `📦 Paket: ${package}\n` +
                     `📞 WhatsApp: ${phone}\n` +
                     `📝 Catatan: ${notes || '-'}\n\n` +
                     `Mohon info lebih lanjut. Terima kasih!`;
      
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/6281234567890?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      contactModal.style.display = 'none';
      contactForm.reset();
    });
  });