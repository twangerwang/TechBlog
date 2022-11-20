// const deleteFormHandler = async (event) => {
//     event.preventDefault();

//     const post_id = window.location.toString().split("/")[
//         window.location.toString().split("/").length - 1
//       ];

// }

const deleteFormHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert("Failed to delete post");
    }
  }
};

document
  .querySelector(".delete-button")
  .addEventListener("click", deleteFormHandler);
