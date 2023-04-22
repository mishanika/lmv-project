import React from "react";
import "./Comment.scss";

function Comment({ id, setComments }) {
  const urlAddComment = "http://localhost:3030/addComment";

  const addComment = (e, id) => {
    e.preventDefault();
    const data = {
      id: id,
      rating: document.getElementById("rating").value,
      comment: document.getElementById("comment").value,
    };
    fetch(urlAddComment, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((data) => {
        setComments(data);
      });
  };
  return (
    <form className="comment-add">
      <label for="rating">Rating:</label>
      <select id="rating" name="rating">
        <option value="5">5 stars</option>
        <option value="4">4 stars</option>
        <option value="3">3 stars</option>
        <option value="2">2 stars</option>
        <option value="1">1 star</option>
      </select>

      <label for="comment">Comment:</label>
      <textarea id="comment" name="comment"></textarea>

      <input type="submit" value={"Submit Comment"} onClick={(e) => addComment(e, id)} />
    </form>
  );
}

export default Comment;
