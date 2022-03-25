$(document).ready(function () {
  // windowwindow.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  var request, db;

  // cek browser apakah support indexedDB
  if (!window.indexedDB) {
    console.log("Maaf browser anda tidak ada IndexedDB");
  } else {
    request = window.indexedDB.open("DATABASE", 25);
    request.onerror = function (event) {
      console.log("DB gagal dibuka", event);
    };
    request.onupgradeneeded = function (event) {
      db = event.target.result;
      var objectStore = db.createObjectStore("students", {
        keyPath: "rollNo",
        autoIncrement: true,
      });
    };
    request.onsuccess = function (event) {
      console.log("DB berhasil dibuka");
      db = event.target.result;
    };
  }

  // Tambah Data
  $("#addBtn").click(function () {
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();

    var transaction = db.transaction(["students"], "readwrite");

    var objectStore = transaction.objectStore("students");
    objectStore.add({
      FirstName: firstName,
      LastName: lastName,
    });

    transaction.oncomplete = function (event) {
      console.log("Success :)");
      $("#result").html("Berhasil menambahkan data");
    };

    transaction.onerror = function (event) {
      console.log("Error :)");
      $("#result").html("Gagal menambahkan data");
    };

    ClearTextBox();
    showAllDataMethod();
  });

  // Edit Data ambil satu ID
  $("#btnShow").click(function () {
    var id = parseInt($("#txtSearch").val());
    var request = db
      .transaction(["students"], "readonly")
      .objectStore("students")
      .get(id);
    request.onsuccess = function (event) {
      var r = request.result;
      if (r != null) {
        $("#firstName").val(r.FirstName);
        $("#lastName").val(r.LastName);
      } else {
        ClearTextBox();
        alert("Record data tidak ditemukan");
      }
    };
  });

  // Hapus Text Box
  $("#clearBtn").click(function () {
    ClearTextBox();
  });

  function ClearTextBox() {
    $("#firstName").val("");
    $("#lastName").val("");
    $("#txtSearch").val("");
  }

  // Update Data
  $("#updateBtn").click(function () {
    var rollNo = parseInt($("#txtSearch").val());
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();

    var transaction = db.transaction(["students"], "readwrite");
    var objectStore = transaction.objectStore("students");
    var request = objectStore.get(rollNo);
    request.onsuccess = function (event) {
      request.result.FirstName = firstName;
      request.result.LastName = lastName;
      objectStore.put(request.result);
      alert("Berhasil diupdate !!!");
    };
  });

  // Hapus Data
  $("#deleteBtn").click(function () {
    var id = parseInt($("#txtSearch").val());
    db.transaction(["students"], "readwrite")
      .objectStore("students")
      .delete(id);
    alert(" No. " + id + " berhasil dihapus !!!");
    showAllDataMethod();
  });

  $("#btnShowAll").click(function () {
    showAllDataMethod();
  });

  // Fungsi Show All Data
  function showAllDataMethod() {
    var request = db
      .transaction(["students"], "readonly")
      .objectStore("students")
      .getAll();
    request.onsuccess = function (event) {
      var obj = request.result;
      var table =
        "<table><thead> <th>ID</th> <th>First Name</th> <th>Last Name</th></thead><tbody>";
      $.each(obj, function () {
        table +=
          "<tr><td>" +
          this["rollNo"] +
          "</td> <td>" +
          this["FirstName"] +
          "</td>  <td>" +
          this["LastName"] +
          "</td></tr>";
      });
      table += "</tbody></table>";
      $("#datalist").html(table);
    };
  }
});
