// untuk registrasi Service worker

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function (registration) {
      console.log("Service Worker Berhasil dibuat, scope:", registration.scope);
    })
    // ketika gagal registrasi
    .catch(function (error) {
      console.log("Service Worker gagal dibuat", error);
    });
}

// navigator.serviceWorker.register("sw.js");

// function showNotification() {
//   Notification.requestPermission(function (result) {
//     if (result === "granted") {
//       navigator.serviceWorker.ready.then(function (registration) {
//         registration.showNotification("Vibration Sample", {
//           body: "Buzz! Buzz!",
//           // icon: "../images/touch/chrome-touch-icon-192x192.png",
//           vibrate: [200, 100, 200, 100, 200, 100, 200],
//           tag: "vibration-sample",
//         });
//       });
//     }
//   });
// }
