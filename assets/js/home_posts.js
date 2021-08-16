{
    //method to submit the form for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data: newPostForm.serialize(),
                success:function(data){
                    // console.log(data);},
                    let newPost = newPostDOM(data.data.post)
                    $('#post-list-continer>ul').prepend(newPost);
                    deletePost($(' .delete-post-button'),newPost);
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    //method to create post in DOM
    let newPostDOM = function(post){
        return $(`<li id="post-${ post._id }">
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">x</a>
            </small>
            ${ post.content } <br>
    By-
        ${ post.user.name }
    <!-- for post comments -->
    <div class="post-comments">
        <form action="/comments/create" method="POST">
            <input type="text" name="content" placeholder="Type here to add comments.." required>
            <input type="hidden" name="post" value=${ post._id } >
            <input type="submit" value="Comment">
        </form>
    
        <div class="post-comments-lists">
            <ul id="post-comments-${ post._id } ">
            </ul>
        </div>
    
    </div>
    
    </li>`)
    }

    //method for deleting posts

    let deletePost = function(deletelink){
        $(deletelink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deletelink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })

        })
    }


    createPost();
}

