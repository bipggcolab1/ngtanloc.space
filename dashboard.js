const body = document.querySelector("body"),
    modeToggle = body.querySelector(".mode-toggle");
sidebar = body.querySelector("nav");
sidebarToggle = body.querySelector(".sidebar-toggle");
moon = body.querySelector('#moon');
let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
const windowWidth = window.innerWidth;
if (windowWidth < 1010) {
    if (windowWidth < 401) {
        if (getStatus && getStatus === "close") {
            sidebar.classList.toggle("close");
            sidebarToggle.classList = "fa-solid fa-sidebar-flip sidebar-toggle";
            $(moon).hide();
        }
        else {
            sidebarToggle.classList = "fa-solid fa-sidebar sidebar-toggle";
        }
    }
    else {
        if (getStatus && getStatus === "close") {
            sidebar.classList.toggle("close");
            sidebarToggle.classList = "fa-solid fa-sidebar-flip sidebar-toggle";
            $(moon).show();
        }
        else {
            sidebarToggle.classList = "fa-solid fa-sidebar sidebar-toggle";
            $(moon).hide();
        }
    }
}
else {
    if (getStatus && getStatus === "close") {
        sidebar.classList.toggle("close");
        sidebarToggle.classList = "fa-solid fa-sidebar sidebar-toggle";
        $(moon).hide();
    }
    else {
        sidebarToggle.classList = "fa-solid fa-sidebar-flip sidebar-toggle";
        $(moon).show();
    }
}
modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
});
sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    const windowWidth = window.innerWidth;
    if (windowWidth > 1010) {
        if (sidebar.classList.contains("close")) {
            localStorage.setItem("status", "close");
            sidebarToggle.classList = "fa-solid fa-sidebar sidebar-toggle";
            $(moon).hide();

        } else {
            localStorage.setItem("status", "open");
            sidebarToggle.classList = "fa-solid fa-sidebar-flip sidebar-toggle";
                $(moon).show();
        }
    }
    else {
        if (sidebar.classList.contains("close")) {
            localStorage.setItem("status", "close");
            sidebarToggle.classList = "fa-solid fa-sidebar-flip sidebar-toggle";
            if (windowWidth < 401) {
                $(moon).hide();
            }
            else {
            $(moon).show();
            }

        } else {
            localStorage.setItem("status", "open");
            sidebarToggle.classList = "fa-solid fa-sidebar sidebar-toggle";
            $(moon).hide();
        }
    }
})
window.addEventListener("resize", (e) => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 1010) {
        if (sidebar.classList.contains("close")) {
            localStorage.setItem("status", "close");
            sidebarToggle.classList = "fa-solid fa-sidebar-flip sidebar-toggle";
            $(moon).show();
        }
        else {
            localStorage.setItem("status", "open");
            sidebarToggle.classList = "fa-solid fa-sidebar sidebar-toggle";
            $(moon).hide();
        }
    }
    else {
        if (sidebar.classList.contains("close")) {
            localStorage.setItem("status", "close");
            sidebarToggle.classList = "fa-solid fa-sidebar sidebar-toggle";
            $(moon).hide();
        }
        else {
            localStorage.setItem("status", "open");
            sidebarToggle.classList = "fa-solid fa-sidebar-flip sidebar-toggle";
            $(moon).show();
        }
    }
});
var socket = io.connect();
socket.on('maytinhketnoi', function (data) {
    var tbodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    // Insert a row at the end of table
    var newRow = tbodyRef.insertRow();
    newRow.className = "text-center";
    newRow.id = data.id;
    // Insert a cell at the end of the row
    var newCell = newRow.insertCell();
    var newText = document.createTextNode(data.name);
    newCell.appendChild(newText);
    newCell = newRow.insertCell();
    newText = document.createTextNode(data.id);
    newCell.appendChild(newText);
    newCell = newRow.insertCell();
    newText = document.createTextNode(data.ip);
    newCell.appendChild(newText);
    newCell = newRow.insertCell();
    if (data.isRunning === "yes") {
        newText = document.createTextNode('Đang chạy');
    }
    else {
        newText = document.createTextNode('Đã dừng');
    }
    newCell.appendChild(newText);
    newCell = newRow.insertCell();
    const startBtn = document.createElement("button");
    startBtn.classList.add("button-success");
    startBtn.addEventListener("click", function () {
        const row = this.parentNode.parentNode; // Get the parent row of the button
        const tenmay = row.cells[0].textContent;
        socket.emit('start', tenmay);
    });
    startBtn.textContent = "RUN ";
    const startIcon = document.createElement("i");
    startIcon.classList.add("fa-solid", "fa-play", "fa-xl");
    startBtn.appendChild(startIcon);
    newCell.appendChild(startBtn);
    const stopBtn = document.createElement("button");
    stopBtn.textContent = "STOP ";
    stopBtn.classList.add("button-stop");
    stopBtn.addEventListener("click", function () {
        const row = this.parentNode.parentNode; // Get the parent row of the button
        const tenmay = row.cells[0].textContent;
        socket.emit('stop', tenmay);
    });
    const stopIcon = document.createElement("i");
    stopIcon.classList.add("fa-solid", "fa-stop", "fa-xl");
    stopBtn.appendChild(stopIcon);
    newCell.appendChild(stopBtn);
    const tatmayBtn = document.createElement("button");
    tatmayBtn.textContent = "SHUT DOWN ";
    tatmayBtn.classList.add("button-tatmay");
    tatmayBtn.addEventListener("click", function () {
        const row = this.parentNode.parentNode; // Get the parent row of the button
        const tenmay = row.cells[0].textContent;
    });
    const tatmayIcon = document.createElement("i");
    tatmayIcon.classList.add("fa-solid", "fa-rectangle-xmark", "fa-xl");
    tatmayBtn.appendChild(tatmayIcon);
    newCell.appendChild(tatmayBtn);
});
socket.on('ngatkn', function (id) {
    document.getElementById(id).remove();
});
socket.on('start', function (tenmayy) {
    var table = document.getElementById("myTable");
    for (var i = 0; i < table.rows.length; i++) {
        if (table.rows[i].id === tenmayy) {
            table.rows[i].cells[3].innerHTML = "Đang chạy";
            Swal.fire({
                icon: 'success',
                title: 'Bạn đã chạy thành công.',
                showConfirmButton: false,
                timer: 1500
            })
            break;
        }
    }
});
socket.on('stop', function (tenmayy) {
    var table = document.getElementById("myTable");
    for (var i = 0; i < table.rows.length; i++) {
        if (table.rows[i].id === tenmayy) {
            table.rows[i].cells[3].innerHTML = "Đã dừng";
            Swal.fire({
                icon: 'success',
                title: 'Bạn đã dừng thành công',
                showConfirmButton: false,
                timer: 1500
            })
            break;
        }
    }
});
socket.on('isRunning', function (msg) {
    Swal.fire({
        icon: 'error',
        title: msg
    })
});
socket.on('notRunning', function (msg) {
    Swal.fire({
        icon: 'error',
        title: msg
    })
});
socket.on('onDisconnect', function (msg) {
    $("tbody").children().remove();
});
socket.on('updatetotal', function (total) {
    document.getElementById('totalactive').textContent = total.totalactive;
    document.getElementById('totaldeactive').textContent = total.totaldeactive;
    document.getElementById('totaldevices').textContent = total.totaldevices;
});
$('#logs').click(function (e) {
    e.preventDefault();
    $('#body-db').empty();
    $.ajax({
        url: '/dashboard/logs',
        headers: { 'Cache-Control': 'no-cache' },
        success: function (data) {
            $('#body-db').html(data);
        }
    });
});
$('#devices').click(function (e) {
    e.preventDefault();
    $('#body-db').empty();
    $.ajax({
        url: '/dashboard/devices',
        headers: { 'Cache-Control': 'no-cache' },
        success: function (data) {
            $('#body-db').html(data);
        }
    });
});
$('#disconnected').click(function (e) {
    e.preventDefault();
    $('#body-db').empty();
    $.ajax({
        url: '/dashboard/disconnected',
        headers: { 'Cache-Control': 'no-cache' },
        success: function (data) {
            $('#body-db').html(data);
        }
    });
});
$('#dashboard').off().click(function (e) {
    e.preventDefault();
    $('#body-db').empty();
    $.ajax({
        url: '/dashboard/main-dashboard',
        headers: { 'Cache-Control': 'no-cache' },
        success: function (data) {
            $('#body-db').html(data);
            socket.emit('getlistdevices');
        }
    });
});