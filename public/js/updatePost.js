const editPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value;
  const postBody = document.querySelector("#post-body").value;

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ post_id: id, title, postBody }),
    header: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};
document
  .querySelector(".editPost-form")
  .addEventListener("submit", editPostFormHandler);
