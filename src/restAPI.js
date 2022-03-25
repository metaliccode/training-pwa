const postList = document.querySelector(".post-list");

// data dari form
const commentForm = document.getElementById("commentForm");
const fullname = document.getElementById("fullname");
const comment = document.getElementById("comment");
const job = document.getElementById("job");
const btnSubmit = document.querySelector(".btn");

// url API
// json server local API
const url = "http://localhost:3000/posts";

// global my json server API menggunakan github
// const url = "https://my-json-server.typicode.com/metaliccode/api-pwa/posts";

// menampilkan data di html -> var
let output = "";

// tampilkan data
const showPost = (posts) => {
  posts.forEach((post) => {
    //   console.log(post);
    output += `
          <div class="col-sm-6 mt-3">
          <div class="card">
            <div class="card-body" data-id=${post.id}>
              <h5 class="card-title">${post.fullname}</h5>
              <p class="card-text">
                ${post.comment}
              </p>
              <small class="job">${post.job}</small>
              <div>
                <a href="" class="btn btn-warning" id="edit-post">Edit</a>
                <a href="" class="btn btn-danger" id="delete-post">Hapus</a>
              </div>
            </div>
          </div>
        </div>
          `;
    // untuk menampilkan data di html
    postList.innerHTML = output;
  });
};

// GET : METHODE GET
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    showPost(data);
  });

// POST : METHODE POST
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //  post ke api
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullname: fullname.value,
      job: job.value,
      comment: comment.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      // setelah post berhasil tampilkan data baru
      showPost(dataArr);
    });
});

// DELETE : METHODE DELETE
postList.addEventListener("click", (e) => {
  e.preventDefault();
  let deleteBtn = e.target.id === "delete-post";
  let editBtn = e.target.id === "edit-post";

  let id = e.target.parentElement.parentElement.dataset.id;

  // delete btn
  if (deleteBtn) {
    console.log(id);
    fetch(`${url}/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    // .then(() => location.reload());
  }

  if (editBtn) {
    const parent = e.target.parentElement.parentElement;

    let fullnameContent = parent.querySelector(".card-title").textContent;
    let commentContent = parent.querySelector(".card-text").textContent;
    let jobContent = parent.querySelector(".job").textContent;

    // replace
    fullname.value = fullnameContent;
    comment.value = commentContent;
    job.value = jobContent;
  }

  // API : METHODE PUT / PATCH
  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log("update");
    fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: fullname.value,
        comment: comment.value,
        job: job.value,
      }),
    }).then((res) => res.json());
    // .then(() => location.reload());
  });
});
