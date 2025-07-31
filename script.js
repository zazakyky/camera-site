const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const snapButton = document.getElementById('snap');
const saveButton = document.getElementById('save');
const filterSelect = document.getElementById('filter');
const countdownDisplay = document.getElementById('countdown');

// Mengakses webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing webcam: ", err);
    });

// Mengambil foto
snapButton.addEventListener('click', () => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    applyFilter();
    canvas.style.display = 'block'; // Menampilkan canvas setelah foto diambil
    takePhoto(); // Menambahkan foto ke photo strip
});

// Menerapkan filter
function applyFilter() {
    const filter = filterSelect.value;
    context.filter = filter === 'none' ? 'none' : filter === 'grayscale' ? 'grayscale(100%)' : 'sepia(100%)';
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
}

// Menyimpan foto
saveButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'foto.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});