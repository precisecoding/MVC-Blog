// using if condition to check if the delete button exists if so we loop over each button with deleteBtn.value allowing for any additional posts with new delete buttons to be included, then we check if there is a delete button value that exists to be deleted and if so use the Delete post route to execute the delete.
// targeting each update and delte buttons for the posts below:
let allUpdateBtns = document.querySelectorAll('.update')
let allDeleteBtns = document.querySelectorAll('.delete')
// if statement checks for new posts by length to see if at least 1 exists before executing, if there are more than one the loop will continue for each new post bceause of the .length
if (allUpdateBtns.length > 0) {
    allUpdateBtns.forEach((updateBtn) => {
        // targeting update for submit button
        document.getElementById('update-form').addEventListener('submit', (event) => {
            // getting values that are entered with update form(s)
            let updateTitlePost = document.getElementById('update-title').value
            let updateDescriptionPost = document.getElementById('update-description').value
            // getting the post id to identify posts uniquely for each user
            let postId = updateBtn.value
            console.log(postId)
            if (postId) {
                // use this format on the fetch to include the dynamic postId from the url to the fetch route.
                fetch("/api/post/" + postId, {
                    method: "PUT",
                    // body gets whatever was entered into the form stored as body
                    body: JSON.stringify({
                        //match object from the associated model you can see this in insomnia or sequelize
                        title: updateTitlePost,
                        contents: updateDescriptionPost
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
                    .catch(err => alert("Not Successfull! Try logging in before deleting a post."))
            }
        })
    })
}
if (allDeleteBtns.length > 0) {
    allDeleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', (event) => {
            let postId = deleteBtn.value
            if (postId) {
                // use this format on the fetch to include the dynamic postId from the url to the fetch route.
                fetch("/api/post/" + postId, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(res => res.json())
                    .then(data => {
                        console.log(data)
                        // once code runs the .reload() will refresh the page and render the newly submitted comment
                        document.location.reload()
                    })
                    .catch(err => alert("Not Successfull! Try logging in before deleting a post."))
            }
        })
    })
}

// hide form and post button until user clicks new post
document.getElementById('post-btn').addEventListener('click', (event) => {
    document.querySelector('.new-post-form').style.display = "block"
})
// each post has an update button and checking here with loop to see if at least 1 exists and any additonal new ones to be submited with update button
if (allUpdateBtns.length > 0) {
    allUpdateBtns.forEach((updateBtn) => {

        updateBtn.addEventListener('click', (event) => {
            // css display: none; hides button until the click event happens
            document.querySelector('.new-update-form').style.display = "block"
        })
    })
}
document.getElementById('post-form').addEventListener("submit", (event) => {
    event.preventDefault()
    // .value property on the function below will select the text area for the post being submitted by the user
    let titlePost = document.getElementById('title').value
    let descriptionPost = document.getElementById('description').value
    if (titlePost) {
        fetch("/api/post/", {
            method: "POST",
            body: JSON.stringify({
                //match object from the associated model you can see this in insomnia or sequelize
                title: titlePost,
                contents: descriptionPost
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
            .catch(err => alert("Not Successfull! Try logging in before submitting a new post."))
    }
});

