const jsonFileUrl = 'https://github.com/professorshiv/librarygchansi/raw/refs/heads/main/datafile.json';

function fetchAndProcessJson() {
    fetch(jsonFileUrl)
        .then(response => response.json())
        .then(data => {
            console.log('JSON data:', data); // Debugging statement

            // Use all columns from the JSON file
            books = data.map(row => {
                const book = {};
                Object.keys(row).forEach(key => {
                    book[key] = row[key] ? row[key].toString() : 'No Data';
                });
                return book;
            });

            console.log('Books array after loading JSON:', books); // Debugging statement
            saveBooksToLocalStorage();
        })
        .catch(error => {
            console.error('Error fetching the JSON file:', error);
            alert('Failed to fetch the JSON file.');
        });
}

// Call this function to load the JSON file on page load
window.onload = () => {
    fetchAndProcessJson();

    // Other initialization code
    if (books.length > 0) {
        console.log('Books data loaded from local storage:', books); // Debugging statement
    }

    // Add event listener to the theme toggle button
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
};

const correctPassword = 'your-secret-password'; // Change this to your desired password
let books = JSON.parse(localStorage.getItem('books')) || [];
let filteredBooks = [];

function saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}

function searchBooks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const bookList = document.getElementById('bookList');
    const resultCount = document.getElementById('resultCount');
    bookList.innerHTML = '';

    console.log('Searching for:', searchInput); // Debugging statement

    filteredBooks = books.filter(book => {
        return Object.values(book).some(value => value.toLowerCase().includes(searchInput));
    });

    console.log('Filtered books:', filteredBooks); // Debugging statement

    resultCount.textContent = `Results found: ${filteredBooks.length}`;

    if (filteredBooks.length > 0) {
        bookList.innerHTML = generateReportTable(filteredBooks);
        document.getElementById('printButton').style.display = 'block'; // Show the Print button
        document.getElementById('returnTopButton').style.display = 'block'; // Show the Return to Top button
    } else {
        bookList.innerHTML = 'No books found.';
        document.getElementById('printButton').style.display = 'none'; // Hide the Print button
        document.getElementById('returnTopButton').style.display = 'none'; // Hide the Return to Top button
    }
}

function displayReport(book) {
    const bookReport = document.getElementById('bookReport');
    bookReport.innerHTML = `<div><h2>📖 Book Report 📖</h2>${Object.entries(book).map(([key, value]) => `<strong>${key}:</strong> ${value}`).join('<br>')}</div>`;
    document.getElementById('printButton').style.display = 'block'; // Show the Print button
}

function printReport() {
    const reportContent = generateReportTable(filteredBooks);
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Report</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('@media print {');
    printWindow.document.write('body { font-family: Helvetica, Arial, sans-serif; }');
    printWindow.document.write('.watermark { position: fixed; top: 50%; left: 50%; width: 400px; height: auto; opacity: 0.1; z-index: -1; pointer-events: none; transform: translate(-50%, -50%); }'); // Adjust watermark style for logo
    printWindow.document.write('footer { position: fixed; bottom: 0; right: 0; font-size: 0.8em; color: #777; }'); // Adjust footer to right corner
    printWindow.document.write('table { width: 100%; border-collapse: collapse; margin-bottom: 50px; }'); // Added margin-bottom to prevent overlap with footer
    printWindow.document.write('table, th, td { border: 1px solid black; }');
    printWindow.document.write('th, td { padding: 10px; text-align: left; }');
    printWindow.document.write('h1, h2 { text-align: center; font-family: Helvetica, Arial, sans-serif; text-transform: uppercase; margin-bottom: 5px; }');
    printWindow.document.write('</style></head><body>');
    printWindow.document.write('<img src="logo.png" class="watermark" id="watermarkLogo">'); // Add logo as watermark with ID for load check
    printWindow.document.write('<h1>Government College Hansi</h1>');
    printWindow.document.write('<h2>Central Library</h2>');
    printWindow.document.write(reportContent);
    printWindow.document.write('<footer>Page <script>document.write(document.location.hash)</script></footer>');
    printWindow.document.write('</body></html>');

    const watermarkLogo = printWindow.document.getElementById('watermarkLogo');
    watermarkLogo.onload = () => {
        printWindow.document.close();
        printWindow.print();
    };
}

function generateReportTable(books) {
    let table = '<table><thead><tr>';

    // Generate table headers
    if (books.length > 0) {
        const headers = Object.keys(books[0]);
        headers.forEach(header => {
            table += `<th>${header}</th>`;
        });
        table += '</tr></thead><tbody>';

        // Generate table rows
        books.forEach(book => {
            table += '<tr>';
            Object.values(book).forEach(value => {
                table += `<td>${value}</td>`;
            });
            table += '</tr>';
        });
        table += '</tbody></table>';
    } else {
        table += '<tr><td>No data available</td></tr></table>';
    }

    return table;
}

function checkPassword() {
    const passwordInput = document.getElementById('passwordInput').value;
    console.log('Entered password:', passwordInput); // Debugging statement
    if (passwordInput === correctPassword) {
        console.log('Password correct'); // Debugging statement
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('uploadSection').style.display = 'block';
    } else {
        alert('Incorrect password. Please try again.');
    }
}

function showLoginModal() {
    console.log('Showing login modal'); // Debugging statement
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLoginModal() {
    console.log('Closing login modal'); // Debugging statement
    document.getElementById('loginModal').style.display = 'none';
}

function resetSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('resultCount').textContent = 'Results found: 0';
    document.getElementById('bookList').innerHTML = '';
    document.getElementById('bookReport').innerHTML = '';
    document.getElementById('printButton').style.display = 'none'; // Hide the Print button
    document.getElementById('returnTopButton').style.display = 'none'; // Hide the Return to Top button
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const targetTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", targetTheme);
}

function showAbout() {
    const aboutSection = document.getElementById('about');
    aboutSection.innerHTML = `
        <h3>About Government College Hansi</h3>
        <p>Government College Hansi is a prestigious institution located in Hansi, Haryana. The college is dedicated to providing quality education and fostering an environment of academic excellence.</p>
        <h4>Team Members</h4>
        <ul>
            <li>Vijay Kumar Yadav, Convener</li>
            <li>Shiv Kumar, Technical Advisor</li>
        </ul>
        <button id="themeToggle" onclick="toggleTheme()">Switch Mode</button>
        <button onclick="closeAbout()">Close</button>
    `;
    aboutSection.style.display = 'block';
}

function closeAbout() {
    document.getElementById('about').style.display = 'none';
}
