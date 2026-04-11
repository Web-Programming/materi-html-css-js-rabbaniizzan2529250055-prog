// Simulasi loading dengan setTimeout 5 detik
setTimeout(async () => {
    try {
        // Fetch data dari games.json
        const response = await fetch('games.json');
        const games = await response.json();
        
        // Render games ke DOM
        renderGames(games);
        
        // Sembunyikan loading dan tampilkan katalog
        document.getElementById('loadingSection').classList.add('d-none');
        document.getElementById('katalogSection').classList.remove('d-none');
        
        // Smooth scroll ke katalog
        document.querySelector('#katalog').scrollIntoView({ 
            behavior: 'smooth' 
        });
        
    } catch (error) {
        console.error('Error loading games:', error);
        document.getElementById('loadingSection').innerHTML = `
            <div class="alert alert-danger">
                <h4><i class="bi bi-exclamation-triangle"></i> Error!</h4>
                <p>Gagal memuat katalog game. Silakan refresh halaman.</p>
            </div>
        `;
    }
}, 5000); // 5 detik delay

// Fungsi untuk render games ke cards
function renderGames(games) {
    const container = document.getElementById('gamesContainer');
    
    games.forEach(game => {
        const card = createGameCard(game);
        container.appendChild(card);
    });
}

// Fungsi untuk membuat card game
function createGameCard(game) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 col-sm-12 mb-5';
    
    col.innerHTML = `
        <div class="card h-100">
            <img src="${game.gambar}" class="card-img-top" alt="${game.judul}" 
                 loading="lazy" onerror="this.src='https://via.placeholder.com/400x250/667eea/ffffff?text=Game+Cover'">
            <div class="card-body d-flex flex-column">
                <span class="card-genre">${game.genre}</span>
                <h5 class="card-title fw-bold mt-2">${game.judul}</h5>
                <p class="card-text flex-grow-1">${game.deskripsi}</p>
                <div class="mt-auto">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="h6 fw-bold text-success">Rp 25.000 / hari</span>
                        <span class="badge bg-success">Tersedia</span>
                    </div>
                    <button class="btn btn-sewa w-100" onclick="sewaGame('${game.judul}')">
                        <i class="bi bi-cart-plus me-2"></i>Sewa Sekarang
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Fungsi simulasi sewa game
function sewaGame(judul) {
    // Simulasi alert booking
    const modal = `
        <div class="modal fade" id="sewaModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">✅ Booking Berhasil!</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <i class="bi bi-check-circle-fill" style="font-size: 4rem; color: #28a745;"></i>
                        <h4>Game "${judul}" berhasil dibooking!</h4>
                        <p>Kami akan menghubungi Anda dalam 30 menit untuk konfirmasi.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    const modalElement = bootstrap.Modal.getOrCreateInstance(document.getElementById('sewaModal'));
    modalElement.show();
    
    // Hapus modal setelah ditutup
    document.getElementById('sewaModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}