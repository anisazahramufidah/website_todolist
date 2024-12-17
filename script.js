// Mendapatkan elemen tombol hamburger dan menu navigasi
const menuToggle = document.getElementById('menu-toggle');  // Tombol hamburger
const navLinks = document.getElementById('nav-links');      // Daftar link navbar

// Menambahkan event listener pada tombol hamburger
menuToggle.addEventListener('click', () => {
  // Toggle class 'show' untuk menampilkan atau menyembunyikan menu
  navLinks.classList.toggle('show');
  
  // Toggle class 'active' untuk mengubah animasi tombol hamburger
  menuToggle.classList.toggle('active');
});

// Mendapatkan elemen-elemen untuk To-Do List
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Array untuk menyimpan tugas
let tasks = [];

// Fungsi untuk menampilkan task
const renderTasks = () => {
    taskList.innerHTML = "";  // Kosongkan daftar tugas yang lama

    // Map untuk menampilkan daftar task
    tasks.map((task, index) => {
        const li = document.createElement('li');
        
        // Menandai task sebagai selesai jika status 'completed' true
        li.classList.toggle('completed', task.completed);
        

        li.innerHTML = `
            ${task.text} 
            <button class="mark-btn">${task.completed ? 'Undo' : 'Tandai'}</button>
            <button class="delete-btn">Hapus</button>
        `;

        // Menambahkan elemen <li> ke dalam list <ul>
        taskList.appendChild(li);

        // Event listener untuk tombol "Tandai"
        const markButton = li.querySelector('.mark-btn');
        markButton.addEventListener('click', () => {
            task.completed = !task.completed; // Toggle status completed
            renderTasks();  // Render ulang daftar task
        });

        // Event listener untuk tombol "Hapus"
        const deleteButton = li.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);  // Menghapus task dari array
            renderTasks();  // Render ulang daftar task setelah penghapusan
        });
    });
};

// Menambahkan task baru ke daftar
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();  // Mengambil teks dari input

    if (taskText === "") {
        alert("Tugas tidak boleh kosong!");  // Pesan jika input kosong
        return;
    }

    // Menambahkan task baru ke array
    tasks.push({ text: taskText, completed: false });
    
    // Render ulang daftar task
    renderTasks();

    // Mengosongkan input setelah menambahkan task
    taskInput.value = '';
});

// Menekan Enter untuk menambahkan task
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskButton.click();  // Memicu klik tombol 'Tambah Task'
    }
});
