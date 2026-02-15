// ===== PERBAIKAN TOMBOL HERO - PRIORITAS TERTINGGI =====
(function() {
    function fixHeroButtons() {
        // Tombol Lihat Anggota
        const lihatAnggota = document.querySelector('.hero-buttons .btn-primary, a[href="anggota.html"].btn-primary');
        if (lihatAnggota) {
            lihatAnggota.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = 'anggota.html';
                return false;
            };
            lihatAnggota.style.pointerEvents = 'auto';
            lihatAnggota.style.cursor = 'pointer';
            lihatAnggota.style.zIndex = '9999';
            lihatAnggota.removeAttribute('disabled');
        }
        
        // Tombol Galeri Kegiatan
        const galeriKegiatan = document.querySelector('.hero-buttons .btn-secondary, a[href="galeri.html"].btn-secondary');
        if (galeriKegiatan) {
            galeriKegiatan.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = 'galeri.html';
                return false;
            };
            galeriKegiatan.style.pointerEvents = 'auto';
            galeriKegiatan.style.cursor = 'pointer';
            galeriKegiatan.style.zIndex = '9999';
            galeriKegiatan.removeAttribute('disabled');
        }
    }
    
    // Eksekusi segera
    fixHeroButtons();
    
    // Eksekusi setelah DOM siap
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixHeroButtons);
    } else {
        fixHeroButtons();
    }
    
    // Eksekusi setelah window load
    window.addEventListener('load', fixHeroButtons);
    
    // Eksekusi setiap 1 detik selama 5 detik (fallback)
    let counter = 0;
    const interval = setInterval(function() {
        fixHeroButtons();
        counter++;
        if (counter >= 5) clearInterval(interval);
    }, 1000);
})();

// ===== MOBILE NAVIGATION TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  if (!hamburger || !navMenu) {
    console.error('Hamburger atau nav-menu tidak ditemukan!');
    return;
  }
  
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active')) {
      const isClickInsideMenu = navMenu.contains(e.target);
      const isClickOnHamburger = hamburger.contains(e.target);
      
      if (!isClickInsideMenu && !isClickOnHamburger) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
  
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// ===== HAPUS ATAU COMMENT SMOOTH SCROLLING YANG BERMASALAH =====
/*
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});
*/

// ===== ACTIVE NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
  const currentLocation = location.href;
  const menuItems = document.querySelectorAll('.nav-menu a');
  
  menuItems.forEach(item => {
    if (item.href === currentLocation) {
      item.classList.add('active');
    }
  });
});

// ===== DARK MODE =====
const darkModeCSS = `
    body.dark-mode {
        --light-color: #1a1a1a;
        --dark-color: #f8f9fa;
        --white: #2d2d2d;
        background-color: #121212;
        color: #e0e0e0;
    }
    body.dark-mode header {
        background-color: #2d2d2d;
    }
    body.dark-mode .link-card,
    body.dark-mode .feature {
        background-color: #2d2d2d;
        color: #e0e0e0;
    }
    body.dark-mode .quick-links,
    body.dark-mode .about {
        background-color: #1a1a1a;
    }
`;

const style = document.createElement('style');
style.textContent = darkModeCSS;
document.head.appendChild(style);

// ===== FORM VALIDATION =====
const validateForm = () => {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'var(--danger-color)';
          
          if (!input.nextElementSibling?.classList.contains('error-message')) {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Field ini harus diisi';
            errorMsg.style.color = 'var(--danger-color)';
            errorMsg.style.fontSize = '0.85rem';
            errorMsg.style.marginTop = '5px';
            input.parentNode.insertBefore(errorMsg, input.nextSibling);
          }
        } else {
          input.style.borderColor = '';
          const errorMsg = input.nextElementSibling;
          if (errorMsg?.classList.contains('error-message')) {
            errorMsg.remove();
          }
        }
      });
      
      if (isValid) {
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Form berhasil dikirim!';
        successMsg.style.color = 'var(--success-color)';
        successMsg.style.marginTop = '15px';
        successMsg.style.padding = '10px';
        successMsg.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
        successMsg.style.borderRadius = '5px';
        successMsg.style.textAlign = 'center';
        
        form.appendChild(successMsg);
        
        setTimeout(() => {
          form.reset();
          successMsg.remove();
        }, 2000);
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', validateForm);

// ===== INTERSECTION OBSERVER =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.feature, .link-card, .section-title');
  animateElements.forEach(el => observer.observe(el));
});

// ===== CURRENT YEAR =====
document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.querySelector('.current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
    // ===== DATA ANGGOTA PKS - PATH FOTO DISATUIN =====
const anggotaData = [
    // Anggota Purna (Senior)
    {
        id: 1,
        nama: "Syahrillah Ramdani",
        jabatan: "Anggota Purna",
        divisi: "Komandan",
        tingkatan: "purna",
        kelas: "XII AKL 1",
        foto: "images/1.jpg",
        motto: "Disiplin pangkal kesuksesan",
        whatsapp: "081234567890"
    },
    {
        id: 2,
        nama: "Vira Salma Iklima",
        jabatan: "Anggota Purna",
        divisi: "Wakil Komandan",
        tingkatan: "purna",
        kelas: "XII AKL 2",
        foto: "images/2.jpg",
        motto: "Pantang menyerah",
        whatsapp: "081234567891"
    },
    {
        id: 3,
        nama: "M. Aliep Nurrohman",
        jabatan: "Anggota Purna",
        divisi: "P3K",
        tingkatan: "purna",
        kelas: "XII TKJ 2",
        foto: "images/3.jpg",
        motto: "Sehat dan bersih",
        whatsapp: "081234567892"
    },
    {
        id: 4,
        nama: "Raisa Nabila Kemalione",
        jabatan: "Anggota Purna",
        divisi: "Penertib",
        tingkatan: "purna",
        kelas: "XII MPLB 2",
        foto: "images/4.jpg",
        motto: "Disiplin waktu",
        whatsapp: "081234567892"
    },
    {
        id: 5,
        nama: "Nadia",
        jabatan: "Anggota Purna",
        divisi: "Operator",
        tingkatan: "purna",
        kelas: "XII MPLB 2",
        foto: "images/5.jpg",
        motto: "Gagal bukan akhir",
        whatsapp: "081234567892"
    },
    {
        id: 6,
        nama: "Gilang Juno",
        jabatan: "Anggota Purna",
        divisi: "Penindak",
        tingkatan: "purna",
        kelas: "XII TITL 2",
        foto: "images/6.jpg",
        motto: "Fokus tujuan",
        whatsapp: "081234567892"
    },
    
    // Anggota Senior
    {
        id: 7,
        nama: "Rey Marpiyansyah",
        jabatan: "Anggota Senior",
        divisi: "Komandan (saat ini)",
        tingkatan: "senior",
        kelas: "XI TKJ 2",
        foto: "images/7.jpg",
        motto: "Konsisten dalam tindakan",
        whatsapp: "081234567893"
    },
    {
        id: 8,
        nama: "Evi Amelia",
        jabatan: "Anggota Senior",
        divisi: "Wakil Komandan (saat ini)",
        tingkatan: "senior",
        kelas: "XI MPLB 1",
        foto: "images/8.jpg",
        motto: "Hormat dan patuh",
        whatsapp: "081234567894"
    },
    {
        id: 9,
        nama: "Siti Nurohmah",
        jabatan: "Anggota Senior",
        divisi: "Sekretaris",
        tingkatan: "senior",
        kelas: "XI MPLB 3",
        foto: "images/9.jpg",
        motto: "Rapi dan teratur",
        whatsapp: "081234567895"
    },
    {
        id: 10,
        nama: "Soehartia",
        jabatan: "Anggota Senior",
        divisi: "Bendahara",
        tingkatan: "senior",
        kelas: "XI MPLB 2",
        foto: "images/10.jpg",
        motto: "Berani berubah",
        whatsapp: "081234567895"
    },
    {
        id: 11,
        nama: "Olipia",
        jabatan: "Anggota Senior",
        divisi: "Administrasi",
        tingkatan: "senior",
        kelas: "XI TKJ 3",
        foto: "images/11.jpg",
        motto: "Terus maju tanpa ragu",
        whatsapp: "081234567895"
    },
    {
        id: 12,
        nama: "Wahyudin", 
        jabatan: "Anggota Senior", 
        divisi: "Humas & P3k", 
        tingkatan: "senior", 
        kelas: "XI TITL 2", 
        foto: "images/12.jpg", 
        motto: "Usaha tidak menghianati hasil", 
        whatsapp: "082231933025"
    }, 
    {
        id: 13,
        nama: "Mayla Nabila",
        jabatan: "Anggota Senior",
        divisi: "Humas & P3k",
        tingkatan: "senior",
        kelas: "XI TKJ 3",
        foto: "images/13.jpg",
        motto: "Disiplin kunci keberhasilan", 
        whatsapp: "081234567895"
    },
    {
        id: 14,
        nama: "Aura Nayla Khairinnisa",
        jabatan: "Anggota Senior",
        divisi: "Administrasi",
        tingkatan: "senior",
        kelas: "XI MPLB 2",
        foto: "images/14.jpg",
        motto: "Siap mengabdi",
        whatsapp: "081234567898"
    }, 
    {
        id: 15,
        nama: "Hejefrina Dewi Maharani",
        jabatan: "Anggota Senior",
        divisi: "Humas & P3k",
        tingkatan: "senior",
        kelas: "XI MPLB 2",
        foto: "images/15.jpg",
        motto: "Kerja keras, hasil cerdas",
        whatsapp: "081234567898"
    },
    {
        id: 16,
        nama: "Adelia Gunawan",
        jabatan: "Anggota Senior",
        divisi: "Penindak & Penertiban",
        tingkatan: "senior",
        kelas: "XI Ak 2",
        foto: "images/16.jpg",
        motto: "Jangan takut mencoba",
        whatsapp: "081234567898"
    }, 
    {
        id: 17,
        nama: "Sabila Dewi",
        jabatan: "Anggota Senior",
        divisi: "Humas & P3k",
        tingkatan: "senior",
        kelas: "XI Ak 2",
        foto: "images/17.jpg",
        motto: "Sukses butuh proses",
        whatsapp: "081234567898"
    },
    {
        id: 18,
        nama: "Galang Maulana Putra",
        jabatan: "Anggota Senior",
        divisi: "Penindak & Penertiban",
        tingkatan: "senior",
        kelas: "XI TKJ 1",
        foto: "images/18.jpg",
        motto: "Tetap rendah hati",
        whatsapp: "081234567898"
    },
    {
        id: 19,
        nama: "Uswatun Nurhasanah",
        jabatan: "Anggota Senior",
        divisi: "Penindak & Penertiban",
        tingkatan: "senior",
        kelas: "XI Ak 2",
        foto: "images/19.jpg",
        motto: "Mimpi besar, mulai kecil",
        whatsapp: "081234567898"
    },
    {
        id: 20,
        nama: "Nabila Azahra",
        jabatan: "Anggota Senior",
        divisi: "Penindak & Penertiban",
        tingkatan: "senior",
        kelas: "XI MPLB 2",
        foto: "images/20.jpg",
        motto: "Konsisten lebih penting",
        whatsapp: "081234567898"
    },
    {
        id: 21,
        nama: "Nasya Naya Putri",
        jabatan: "Anggota Senior",
        divisi: "Administrasi",
        tingkatan: "senior",
        kelas: "XI MPLB 3",
        foto: "images/21.jpg",
        motto: "Waktu adalah kesempatan",
        whatsapp: "081234567898"
    },
    {
        id: 22,
        nama: "Maharani Saskia",
        jabatan: "Anggota Senior",
        divisi: "Penindak & Penertiban",
        tingkatan: "senior",
        kelas: "XI MPLB 2",
        foto: "images/22.jpg",
        motto: "Tekun membawa hasil",
        whatsapp: "081234567898"
    },
    {
        id: 23,
        nama: "Panya",
        jabatan: "Anggota Senior",
        divisi: "Penindak & Penertiban",
        tingkatan: "senior",
        kelas: "XI MPLB 2",
        foto: "images/23.jpg",
        motto: "Yakin pasti bisa",
        whatsapp: "081234567898"
    },
    {
        id: 24,
        nama: "Rizky Ramadhan",
        jabatan: "Anggota Senior",
        divisi: "Penindak & Penertiban",
        tingkatan: "senior",
        kelas: "XI TKJ 2",
        foto: "images/24.jpg",
        motto: "Jadilah Inspirasi",
        whatsapp: "081234567898"
    },
    {
        id: 25,
        nama: "Baim Saputra",
        jabatan: "Anggota Senior",
        divisi: "Humas & P3k",
        tingkatan: "senior",
        kelas: "XI IPA 2",
        foto: "images/25.jpg",
        motto: "Usaha lebih, hasil lebih",
        whatsapp: "081234567898"
    },
    {
        id: 26,
        nama: "Marselia Sopian",
        jabatan: "Anggota Senior",
        divisi: "Administrasi",
        tingkatan: "senior",
        kelas: "XI MPLB 2",
        foto: "images/26.jpg",
        motto: "Berkembang setiap hari",
        whatsapp: "081234567898"
    },
    
    // Anggota Muda
    {
        id: 27,
        nama: "Gea Nur Oktapiani Khorosi",
        jabatan: "Anggota Muda",
        divisi: "Humas & P3k",
        tingkatan: "muda",
        kelas: "X MPLB 1",
        foto: "images/27.jpg",
        motto: "Tetap Semangat",
        whatsapp: "081234567896"
    },
    {
        id: 28,
        nama: "Nia Ramadhani",
        jabatan: "Anggota Muda",
        divisi: "Administrasi",
        tingkatan: "muda",
        kelas: "X AKL 1",
        foto: "images/28.jpg",
        motto: "Semangat berlatih",
        whatsapp: "081234567897"
    },
    {
        id: 29,
        nama: "Fauzan",
        jabatan: "Anggota Muda",
        divisi: "Penindak & Penertiban",
        tingkatan: "muda",
        kelas: "X AKL 1",
        foto: "images/29.jpg",
        motto: "Belajar tanpa batas",
        whatsapp: "081234567898"
    },
    {
        id: 30,
        nama: "Yulia Avrillina Yunus", 
        jabatan: "Anggota Muda", 
        divisi: "Humas & P3k", 
        tingkatan: "muda", 
        kelas: "X MPLB 2", 
        foto: "images/30.jpg", 
        motto: "Hargai proses", 
        whatsapp: "082121933024"
    }, 
    {
        id: 31,
        nama: "Anggita Bunga Kirani",
        jabatan: "Anggota Muda",
        divisi: "Penindak & Penertiban",
        tingkatan: "muda",
        kelas: "X AKL 1",
        foto: "images/31.jpg",
        motto: "Bergerak atau tertinggal", 
        whatsapp: "082121933024"
    }, 
    {
        id: 32,
        nama: "Asy Syfa Ramadhani",
        jabatan: "Anggota Muda",
        divisi: "Penindak & Penertiban",
        tingkatan: "muda",
        kelas: "X AKL 2",
        foto: "images/32.jpg",
        motto: "Jangan menunda mimpi",
        whatsapp: "081234567898"
    },
    {
        id: 33,
        nama: "Dimas Noval Pirdiansyah",
        jabatan: "Anggota Muda",
        divisi: "Penindak & Penertiban",
        tingkatan: "muda",
        kelas: "X TITL 2",
        foto: "images/33.jpg",
        motto: "Sabar itu kuat",
        whatsapp: "081234567898"
    },
    {
        id: 34,
        nama: "Rifa Al Ghifari",
        jabatan: "Anggota Muda",
        divisi: "Penindak & Penertiban",
        tingkatan: "muda",
        kelas: "X TITL 2",
        foto: "images/34.jpg",
        motto: "Tindakan lebih penting",
        whatsapp: "081234567898"
    },
    {
        id: 35,
        nama: "Syarifah Siti Aminah",
        jabatan: "Anggota Muda",
        divisi: "Administrasi",
        tingkatan: "muda",
        kelas: "X AKL 1",
        foto: "images/35.jpg",
        motto: "Berpikir positif",
        whatsapp: "081234567898"
    },
    {
        id: 36,
        nama: "Muhammad Riqki Ramadhan",
        jabatan: "Anggota Muda",
        divisi: "Humas & P3k",
        tingkatan: "muda",
        kelas: "X TKJ 2",
        foto: "images/36.jpg",
        motto: "Percaya pada proses",
        whatsapp: "081234567898"
    },
    {
        id: 37,
        nama: "Alisya Firmansyah",
        jabatan: "Anggota Muda",
        divisi: "Humas & P3k",
        tingkatan: "muda",
        kelas: "X AKL 2",
        foto: "images/37.jpg",
        motto: "Buktikan dengan hasil",
        whatsapp: "081234567898"
    },
    {
        id: 38,
        nama: "Nida Fitriani",
        jabatan: "Anggota Muda",
        divisi: "Humas & P3k",
        tingkatan: "muda",
        kelas: "X AKL 2",
        foto: "images/38.jpg",
        motto: "Maju selangkah setiap hari",
        whatsapp: "081234567898"
    }, 
    {
        id: 39,
        nama: "Fazli Fuad",
        jabatan: "Anggota Muda",
        divisi: "Humas & P3k",
        tingkatan: "muda",
        kelas: "X AKL 2",
        foto: "images/39.jpg",
        motto: "Belajar dari kesalahan",
        whatsapp: "081234567898"
    },
    
    // Alumni
    {
        id: 40,
        nama: "Rido Awalan",
        jabatan: "Mantan Ketua",
        divisi: "Alumni",
        tingkatan: "alumni",
        kelas: "Alumni 2023",
        foto: "images/40.jpg",
        motto: "PKS membentuk karakter",
        whatsapp: "081234567899"
    }, 
    {
        id: 41,
        nama: "Kenia Ul Azizah",
        jabatan: "Mantan Wakil Ketua",
        divisi: "Alumni",
        tingkatan: "alumni",
        kelas: "Alumni 2023",
        foto: "images/41.jpg",
        motto: "Sekali PKS tetap PKS",
        whatsapp: "081234567899"
    },
    {
        id: 42,
        nama: "Alya Bariq",
        jabatan: "Alumni",
        divisi: "Alumni",
        tingkatan: "alumni",
        kelas: "Alumni 2023",
        foto: "images/42.jpg",
        motto: "Disiplin selamanya",
        whatsapp: "081234567899"
    },
    {
        id: 43,
        nama: "Monica Putri Eriyanti",
        jabatan: "Alumni",
        divisi: "Alumni",
        tingkatan: "alumni",
        kelas: "Alumni 2023",
        foto: "images/43.jpg",
        motto: "Tertib adalah prinsip",
        whatsapp: "081234567899"
    },
    {
        id: 44,
        nama: "Navisa Rahmawati",
        jabatan: "Alumni",
        divisi: "Alumni",
        tingkatan: "alumni",
        kelas: "Alumni 2023",
        foto: "images/44.jpg",
        motto: "Tumbuh dalam disiplin",
        whatsapp: "081234567899"
    },
    {
        id: 45,
        nama: "Sherren Febryna",
        jabatan: "Alumni",
        divisi: "Alumni",
        tingkatan: "alumni",
        kelas: "Alumni 2023",
        foto: "images/45.jpg",
        motto: "Pernah berdiri untuk aturan",
        whatsapp: "081234567899"
    }
];

// ===== FUNGSI UNTUK HALAMAN ANGGOTA - FIXED =====
function renderAnggota(filter = 'all', searchTerm = '') {
    const container = document.getElementById('anggotaContainer');
    if (!container) {
        console.log('Container anggota tidak ditemukan');
        return;
    }
    
    console.log('Render anggota dipanggil, total data:', anggotaData.length);
    
    // Filter data
    let filteredData = anggotaData;
    
    if (filter !== 'all') {
        filteredData = anggotaData.filter(anggota => 
            anggota.tingkatan && anggota.tingkatan.toLowerCase() === filter.toLowerCase()
        );
    }
    
    if (searchTerm && searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase().trim();
        filteredData = filteredData.filter(anggota => 
            (anggota.nama && anggota.nama.toLowerCase().includes(term)) ||
            (anggota.jabatan && anggota.jabatan.toLowerCase().includes(term)) ||
            (anggota.divisi && anggota.divisi.toLowerCase().includes(term)) ||
            (anggota.kelas && anggota.kelas.toLowerCase().includes(term))
        );
    }
    
    console.log('Data setelah filter:', filteredData.length);
    
    if (filteredData.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
                <i class="fas fa-users-slash" style="font-size: 3rem; color: var(--gray); margin-bottom: 20px;"></i>
                <h3 style="color: var(--gray);">Tidak ada anggota ditemukan</h3>
                <p style="color: var(--gray-light);">Coba kata kunci lain atau reset filter</p>
            </div>
        `;
        return;
    }
    
    // Render HTML
    container.innerHTML = filteredData.map(anggota => `
        <div class="anggota-card" data-tingkatan="${anggota.tingkatan || 'umum'}">
            <div class="anggota-foto">
                <img src="${anggota.foto || 'images/anggota/default.jpg'}" 
                     alt="${anggota.nama || 'Anggota PKS'}" 
                     onerror="this.src='images/anggota/default.jpg'; this.onerror=null;">
            </div>
            <div class="anggota-info">
                <h3>${anggota.nama || 'Tanpa Nama'}</h3>
                <div class="anggota-jabatan">${anggota.jabatan || 'Anggota'}</div>
                <div class="anggota-detail">
                    <p><i class="fas fa-layer-group"></i> ${anggota.divisi || '-'}</p>
                    <p><i class="fas fa-graduation-cap"></i> ${anggota.kelas || '-'}</p>
                </div>
                <div class="anggota-motto">
                    <p>"${anggota.motto || 'Selalu semangat'}"</p>
                </div>
                <span class="anggota-status status-${anggota.tingkatan || 'umum'}">
                    ${(anggota.tingkatan ? anggota.tingkatan.toUpperCase() : 'UMUM')}
                </span>
            </div>
        </div>
    `).join('');
}

// ===== FILTER DAN SEARCH ANGGOTA - FIXED =====
function setupAnggotaFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchAnggota');
    
    if (!filterButtons.length) {
        console.log('Filter buttons tidak ditemukan');
        return;
    }
    
    console.log('Setup filter anggota, jumlah button:', filterButtons.length);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const searchTerm = searchInput ? searchInput.value : '';
            renderAnggota(filter, searchTerm);
        });
    });
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const activeFilter = document.querySelector('.filter-btn.active');
            const filter = activeFilter ? activeFilter.dataset.filter : 'all';
            renderAnggota(filter, this.value);
        });
    }
}

// ===== ANIMASI STATISTIK =====
function animateStats() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ===== INITIALIZE ANGGOTA - FIXED =====
document.addEventListener('DOMContentLoaded', function() {
    // Halaman Anggota
    if (document.getElementById('anggotaContainer')) {
        console.log('Halaman anggota terdeteksi, merender data...');
        
        // Kosongkan container
        const container = document.getElementById('anggotaContainer');
        container.innerHTML = '<div style="text-align: center; padding: 50px;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--secondary);"></i><p style="margin-top: 20px;">Memuat data anggota...</p></div>';
        
        // Render dengan timeout
        setTimeout(() => {
            renderAnggota();
            setupAnggotaFilter();
            animateStats();
            addExportButton();
        }, 100);
    }
    
    // Animasi struktur cards
    const strukturCards = document.querySelectorAll('.struktur-item, .divisi-card');
    strukturCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Print button untuk halaman struktur
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Struktur';
    printButton.className = 'print-btn';
    printButton.style.position = 'fixed';
    printButton.style.bottom = '20px';
    printButton.style.right = '80px';
    printButton.style.backgroundColor = 'var(--primary)';
    printButton.style.color = 'white';
    printButton.style.border = 'none';
    printButton.style.padding = '10px 20px';
    printButton.style.borderRadius = '5px';
    printButton.style.cursor = 'pointer';
    printButton.style.zIndex = '1000';
    printButton.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    
    printButton.addEventListener('click', () => {
        window.print();
    });
    
    if (document.querySelector('.struktur-diagram')) {
        document.body.appendChild(printButton);
    }
});

// ===== EXPORT DATA ANGGOTA KE CSV =====
function exportToCSV() {
    const headers = ['Nama', 'Jabatan', 'Divisi', 'Tingkatan', 'Kelas', 'Motto', 'WhatsApp'];
    const csvData = [
        headers.join(','),
        ...anggotaData.map(anggota => [
            `"${anggota.nama || ''}"`,
            `"${anggota.jabatan || ''}"`,
            `"${anggota.divisi || ''}"`,
            `"${anggota.tingkatan || ''}"`,
            `"${anggota.kelas || ''}"`,
            `"${anggota.motto || ''}"`,
            `"${anggota.whatsapp || ''}"`
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data-anggota-pks.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

function addExportButton() {
    if (!document.getElementById('anggotaContainer')) return;
    
    const exportBtn = document.createElement('button');
    exportBtn.innerHTML = '<i class="fas fa-download"></i> Export Data';
    exportBtn.className = 'export-btn';
    exportBtn.style.backgroundColor = '#28a745';
    exportBtn.style.color = 'white';
    exportBtn.style.border = 'none';
    exportBtn.style.padding = '10px 20px';
    exportBtn.style.borderRadius = '5px';
    exportBtn.style.cursor = 'pointer';
    exportBtn.style.marginTop = '20px';
    exportBtn.style.display = 'block';
    exportBtn.style.marginLeft = 'auto';
    exportBtn.style.marginRight = 'auto';
    
    exportBtn.addEventListener('click', exportToCSV);
    
    const container = document.querySelector('.anggota-section .container');
    if (container) {
        container.appendChild(exportBtn);
    }
}

// ===== DATA GALERI FOTO =====
const galeriData = [
    // Latihan Rutin
    {
        id: 1,
        kategori: "latihan",
        judul: "Latihan PBB Dasar",
        deskripsi: "Anggota muda belajar sikap sempurna",
        tanggal: "15 Jan 2023",
        foto: "images/lat1.jpg",
        likes: 24,
        views: 156
    },
    {
        id: 2,
        kategori: "latihan",
        judul: "Formasi Upacara",
        deskripsi: "Persiapan upacara bendera hari Senin",
        tanggal: "22 Jan 2023",
        foto: "images/lat2.jpg",
        likes: 31,
        views: 189
    },
    {
        id: 3,
        kategori: "latihan",
        judul: "Latihan Fisik",
        deskripsi: "Senam pagi untuk kebugaran anggota",
        tanggal: "29 Jan 2023",
        foto: "images/lat3.jpg",
        likes: 19,
        views: 142
    },
    {
        id: 4,
        kategori: "latihan",
        judul: "Pelatihan Baris-berbaris",
        deskripsi: "Instruktur memberikan pengarahan",
        tanggal: "5 Feb 2023",
        foto: "images/lat4.jpg",
        likes: 42,
        views: 203
    },
    
    // Kegiatan
    {
        id: 5,
        kategori: "kegiatan",
        judul: "Rutinitas Apel",
        deskripsi: "Apel Pagi",
        tanggal: "12 Feb 2023",
        foto: "images/keg1.jpg",
        likes: 67,
        views: 287
    },
    {
        id: 6,
        kategori: "kegiatan",
        judul: "Rutinitas Apel",
        deskripsi: "Apel Pagi", 
        tanggal: "19 Feb 2023",
        foto: "images/keg2.jpg",
        likes: 53,
        views: 234
    },
    {
        id: 7,
        kategori: "kegiatan",
        judul: "Seminar Kedisiplinan",
        deskripsi: "Pembicara dari kepolisian setempat",
        tanggal: "26 Feb 2023",
        foto: "images/keg3.jpg",
        likes: 38,
        views: 198
    },
    
    // Random
    {
        id: 8,
        kategori: "random",
        judul: "Moment",
        deskripsi: "Istirahat setelah latihan",
        tanggal: "8 Jan 2026",
        foto: "images/rand1.jpg",
        likes: 45,
        views: 167
    },
    {
        id: 9,
        kategori: "random",
        judul: "Moment",
        deskripsi: "Kegiatan pengakraban anggota",
        tanggal: "15 Jan 2026",
        foto: "images/rand2.jpg",
        likes: 61,
        views: 213
    },
    {
        id: 10,
        kategori: "random",
        judul: "Moment",
        deskripsi: "Potret spontan saat latihan",
        tanggal: "22 Jan 2026",
        foto: "images/rand3.jpg",
        likes: 29,
        views: 145
    },
    {
        id: 11,
        kategori: "random",
        judul: "Moment",
        deskripsi: "Diskusi informal dengan guru pembina",
        tanggal: "29 Jan 2026",
        foto: "images/rand4.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 12,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand5.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 13,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand6.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 14,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand7.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 15,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand8.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 16,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand9.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 17,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand10.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 18,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand11.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 19,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand12.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 20,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand13.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 21,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand14.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 22,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand15.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 23,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand16.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 24,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand17.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 25,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand18.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 26,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand19.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 27,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand20.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 28,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand21.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 29,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand22.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 30,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand23.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 31,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand24.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 32,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand25.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 33,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand26.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 34,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand27.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 35,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand28.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 36,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand29.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 37,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand30.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 38,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand31.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 39,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand32.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 40,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand33.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 41,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand34.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 42,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand35.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 43,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand36.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 44,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand37.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 45,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand38.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 46,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand39.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 47,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand40.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 48,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand41.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 49,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand42.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 50,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand43.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 51,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand44.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 52,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand45.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 53,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand46.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 54,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand47.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 55,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand48.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 56,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand49.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 57,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand50.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 58,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand51.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 59,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand52.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 60,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand53.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 61,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand54.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 62,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand55.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 63,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand56.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 64,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand57.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 65,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand58.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 66,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand59.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 67,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand60.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 68,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand61.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 69,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand62.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 70,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand63.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 71,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand64.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 72,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand65.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 73,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand66.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 74,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand67.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 75,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand68.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 76,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand69.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 77,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand70.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 78,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand71.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 79,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand72.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 80,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand73.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 81,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand74.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 82,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand75.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 83,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand76.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 84,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand77.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 85,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand78.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 86,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand79.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 87,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand80.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 88,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand81.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 89,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand82.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 90,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand83.jpg",
        likes: 34,
        views: 178
    },
    // 84,85,86
    {
        id: 94,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand87.jpg",
        likes: 34,
        views: 178
    },
    //88
    {
        id: 96,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand89.jpg",
        likes: 34,
        views: 178
    },
    //90
    {
        id: 98,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand91.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 99,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand92.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 100,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand93.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 101,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand94.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 102,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand95.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 103,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand96.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 104,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand97.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 105,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand98.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 106,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand99.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 107,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand100.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 108,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand101.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 109,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand102.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 110,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand103.jpg",
        likes: 34,
        views: 178
    },
    {
        id: 111,
        kategori: "random",
        judul: "Moment",
        tanggal: "29 Jan 2026",
        foto: "images/rand104.jpg",
        likes: 34,
        views: 178
    },
    
    // Upacara
    {
        id: 112,
        kategori: "upacara",
        judul: "Upacara Bendera",
        deskripsi: "Hari Senin yang khidmat",
        tanggal: "9 Jan 2023",
        foto: "images/up1.jpg",
        likes: 72,
        views: 256
    },
    {
        id: 113,
        kategori: "upacara",
        judul: "Penghormatan Bendera",
        deskripsi: "Detik-detik pengibaran bendera",
        tanggal: "16 Jan 2023",
        foto: "images/up2.jpg",
        likes: 58,
        views: 221
    },
    {
        id: 114,
        kategori: "upacara",
        judul: "Tim Pengibar Bendera",
        deskripsi: "Anggota PKS bertugas sebagai Paskibra",
        tanggal: "23 Jan 2023",
        foto: "images/up3.jpg",
        likes: 49,
        views: 194
    }
];

// ===== FUNGSI GALERI - DENGAN FITUR DOWNLOAD =====
let currentFilter = 'all';
let currentSort = 'newest';
let visibleCount = 8;
let filteredGaleriData = [];
let currentModalIndex = 0;

function renderGaleri() {
    const container = document.getElementById('galeriContainer');
    if (!container) return;
    
    let filteredData = galeriData;
    
    if (currentFilter !== 'all') {
        filteredData = galeriData.filter(item => item.kategori === currentFilter);
    }
    
    filteredData.sort((a, b) => {
        switch(currentSort) {
            case 'newest':
                return new Date(b.tanggal) - new Date(a.tanggal);
            case 'oldest':
                return new Date(a.tanggal) - new Date(b.tanggal);
            case 'name':
                return a.judul.localeCompare(b.judul);
            default:
                return 0;
        }
    });
    
    const displayData = filteredData.slice(0, visibleCount);
    
    container.innerHTML = displayData.map(item => {
        const fileName = item.judul.replace(/\s+/g, '-').toLowerCase() + '.jpg';
        
        return `
        <div class="galeri-item" data-id="${item.id}" data-kategori="${item.kategori}">
            <img src="${item.foto}" alt="${item.judul}" onerror="this.src='images/placeholder.jpg'">
            
            <a href="${item.foto}" 
               download="${fileName}"
               class="galeri-download-btn" 
               title="Download Foto"
               onclick="event.stopPropagation()">
                <i class="fas fa-download"></i>
            </a>
            
            <div class="galeri-info">
                <span class="galeri-category">${getCategoryName(item.kategori)}</span>
                <h4 class="galeri-title">${item.judul}</h4>
                <p class="galeri-date">${item.tanggal}</p>
                <div class="galeri-stats-small">
                    <span><i class="fas fa-heart"></i> ${item.likes || 0}</span>
                    <span><i class="fas fa-eye"></i> ${item.views || 0}</span>
                </div>
            </div>
        </div>
    `}).join('');
    
    updateGaleriStats(filteredData.length);
    setupGaleriModal();
    setupDownloadHandlers();
    
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = visibleCount >= filteredData.length ? 'none' : 'inline-block';
    }
}

function getCategoryName(kategori) {
    const categories = {
        'latihan': 'Latihan',
        'kegiatan': 'Kegiatan',
        'random': 'Random',
        'upacara': 'Upacara'
    };
    return categories[kategori] || kategori;
}

function updateGaleriStats(total) {
    const totalPhotos = document.getElementById('totalPhotos');
    const latestUpdate = document.getElementById('latestUpdate');
    
    if (totalPhotos) totalPhotos.textContent = total;
    
    if (latestUpdate && galeriData.length > 0) {
        const latest = galeriData.reduce((latest, item) => {
            return new Date(item.tanggal) > new Date(latest.tanggal) ? item : latest;
        });
        latestUpdate.textContent = latest.tanggal.split(' ')[2];
    }
}

function setupDownloadHandlers() {
    const downloadBtns = document.querySelectorAll('.galeri-download-btn');
    downloadBtns.forEach(btn => {
        btn.removeEventListener('click', handleDownload);
        btn.addEventListener('click', handleDownload);
    });
}

function handleDownload(e) {
    e.stopPropagation();
    const fileName = e.currentTarget.download;
    showNotification(`Mengunduh: ${fileName}`, 'success');
}

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.galeri-notification');
    if (existing) existing.remove();
    
    const notif = document.createElement('div');
    notif.className = 'galeri-notification';
    notif.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    notif.style.position = 'fixed';
    notif.style.top = '100px';
    notif.style.right = '20px';
    notif.style.background = 'linear-gradient(135deg, var(--secondary) 0%, var(--secondary-light) 100%)';
    notif.style.color = 'white';
    notif.style.padding = '15px 25px';
    notif.style.borderRadius = '50px';
    notif.style.boxShadow = '0 10px 30px rgba(193, 123, 76, 0.3)';
    notif.style.zIndex = '9999';
    notif.style.display = 'flex';
    notif.style.alignItems = 'center';
    notif.style.gap = '12px';
    notif.style.fontWeight = '500';
    notif.style.animation = 'slideIn 0.3s ease';
    notif.style.backdropFilter = 'blur(10px)';
    notif.style.border = '1px solid rgba(255,255,255,0.2)';
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

function setupGaleriFilter() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sortSelect = document.getElementById('sortSelect');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!tabBtns.length || !sortSelect) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFilter = btn.dataset.filter;
            visibleCount = 8;
            renderGaleri();
        });
    });
    
    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        renderGaleri();
    });
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += 8;
            renderGaleri();
            
            const lastItem = document.querySelector('.galeri-item:last-child');
            if (lastItem) {
                lastItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
}

function setupGaleriModal() {
    const galeriItems = document.querySelectorAll('.galeri-item');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    
    if (!modal) return;
    
    galeriItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('.galeri-download-btn')) return;
            
            filteredGaleriData = Array.from(galeriItems).map((el, idx) => ({
                element: el,
                index: idx
            }));
            
            currentModalIndex = index;
            
            const imgSrc = item.querySelector('img').src;
            const title = item.querySelector('.galeri-title').textContent;
            const category = item.querySelector('.galeri-category').textContent;
            const date = item.querySelector('.galeri-date').textContent;
            
            modal.style.display = 'block';
            modalImg.src = imgSrc;
            modalCaption.innerHTML = `
                <h3 style="color: white; margin-bottom: 10px;">${title}</h3>
                <p style="color: rgba(255,255,255,0.9);"><strong>Kategori:</strong> ${category}</p>
                <p style="color: rgba(255,255,255,0.9);"><strong>Tanggal:</strong> ${date}</p>
            `;
            
            addModalDownloadButton(modal, imgSrc, title);
            document.body.style.overflow = 'hidden';
        });
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    if (modalPrev) {
        modalPrev.addEventListener('click', () => {
            currentModalIndex = (currentModalIndex - 1 + filteredGaleriData.length) % filteredGaleriData.length;
            updateModalImage(modal, modalImg, modalCaption);
        });
    }
    
    if (modalNext) {
        modalNext.addEventListener('click', () => {
            currentModalIndex = (currentModalIndex + 1) % filteredGaleriData.length;
            updateModalImage(modal, modalImg, modalCaption);
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeModal();
            else if (e.key === 'ArrowLeft') {
                currentModalIndex = (currentModalIndex - 1 + filteredGaleriData.length) % filteredGaleriData.length;
                updateModalImage(modal, modalImg, modalCaption);
            } else if (e.key === 'ArrowRight') {
                currentModalIndex = (currentModalIndex + 1) % filteredGaleriData.length;
                updateModalImage(modal, modalImg, modalCaption);
            }
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        const modalDownloadBtn = modal.querySelector('.modal-download-btn');
        if (modalDownloadBtn) modalDownloadBtn.remove();
    }
}

function updateModalImage(modal, modalImg, modalCaption) {
    const item = filteredGaleriData[currentModalIndex].element;
    const imgSrc = item.querySelector('img').src;
    const title = item.querySelector('.galeri-title').textContent;
    const category = item.querySelector('.galeri-category').textContent;
    const date = item.querySelector('.galeri-date').textContent;
    
    modalImg.src = imgSrc;
    modalCaption.innerHTML = `
        <h3 style="color: white; margin-bottom: 10px;">${title}</h3>
        <p style="color: rgba(255,255,255,0.9);"><strong>Kategori:</strong> ${category}</p>
        <p style="color: rgba(255,255,255,0.9);"><strong>Tanggal:</strong> ${date}</p>
    `;
    
    const oldBtn = modal.querySelector('.modal-download-btn');
    if (oldBtn) oldBtn.remove();
    addModalDownloadButton(modal, imgSrc, title);
}

function addModalDownloadButton(modal, imgSrc, title) {
    const fileName = title.replace(/\s+/g, '-').toLowerCase() + '.jpg';
    
    const downloadBtn = document.createElement('a');
    downloadBtn.href = imgSrc;
    downloadBtn.download = fileName;
    downloadBtn.className = 'modal-download-btn';
    downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Foto';
    downloadBtn.title = 'Download Foto';
    
    downloadBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showNotification(`Mengunduh: ${title}`, 'success');
    });
    
    modal.appendChild(downloadBtn);
}

// ===== FORM KONTAK =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            newsletter: document.getElementById('newsletter').checked,
            timestamp: new Date().toISOString()
        };
        
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showNotification('Harap isi semua field yang wajib diisi!', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Format email tidak valid!', 'error');
            return;
        }
        
        showNotification('Mengirim pesan...', 'info');
        
        setTimeout(() => {
            const messages = JSON.parse(localStorage.getItem('pks_messages') || '[]');
            messages.push(formData);
            localStorage.setItem('pks_messages', JSON.stringify(messages));
            
            showNotification('Pesan berhasil dikirim! Kami akan membalas secepatnya.', 'success');
            contactForm.reset();
            console.log('Pesan baru:', formData);
        }, 1500);
    });
}

// ===== FAQ TOGGLE =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
        });
    });
}

// ===== MODAL UTILITY =====
function showModal(title, content) {
    const existingModal = document.querySelector('.custom-modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                <button class="btn-close">Tutup</button>
            </div>
        </div>
    `;
    
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .custom-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s;
            }
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
            }
            .modal-content {
                position: relative;
                background: white;
                border-radius: 10px;
                width: 90%;
                max-width: 500px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                animation: slideUp 0.3s;
            }
            .modal-header {
                padding: 20px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .modal-header h3 {
                color: var(--primary-color);
                margin: 0;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-body {
                padding: 20px;
            }
            .modal-footer {
                padding: 20px;
                border-top: 1px solid #eee;
                text-align: right;
            }
            .btn-close {
                padding: 8px 20px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 500;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    const btnClose = modal.querySelector('.btn-close');
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s';
        modal.querySelector('.modal-content').style.animation = 'slideDown 0.3s';
        
        setTimeout(() => modal.remove(), 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    btnClose.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', function onEsc(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', onEsc);
        }
    });
}

// ===== INITIALIZE ALL =====
document.addEventListener('DOMContentLoaded', () => {
    // Galeri
    if (document.getElementById('galeriContainer')) {
        renderGaleri();
        setupGaleriFilter();
    }
    
    // Kontak
    if (document.getElementById('contactForm')) {
        initContactForm();
        initFAQ();
    }
    
    // Current year
    const yearElements = document.querySelectorAll('.current-year, .footer-bottom p');
    yearElements.forEach(el => {
        if (el.textContent.includes('2023') || el.textContent.includes('2026')) {
            el.textContent = el.textContent.replace(/2023|2026/g, new Date().getFullYear());
        }
    });
    
    // Fix tombol hero lagi
    setTimeout(fixHeroButtons, 500);
});
