document.getElementById('comment-form').addEventListener("submit", (event) => {
    event.preventDefault()
    // .value property on the function below will select the text area for the comment being submitted by the user
    let userComment = document.getElementById('comment').value
    let userPostId = document.getElementById('post-id').value
    if (userComment) {
        fetch("/api/comment/", {
            method: "POST",
            body: JSON.stringify({
                comment: userComment,
                post_id: userPostId
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                // once code runs the .reload() will refresh the page and render the newly submitted comment
                document.location.reload()
            })
            .catch(err => alert("Not Successfull! Try logging in before submitting a new comment."))
    }
});

