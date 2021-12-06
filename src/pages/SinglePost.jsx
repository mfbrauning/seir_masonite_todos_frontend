import { Link, useParams } from "react-router-dom"

function SinglePost({posts, edit, deleteTodo}){
    const params = useParams()
    const id = parseInt(params.id)
    const post = posts.find((post) => post.id === id)

    // styles
    const div = {
        textAlign: "center",
        border: "3px solid green",
        width: "80%",
        margin: "30px auto"
    }
    return (
        <div style={div}>
            <h1>{post?.subject}</h1>
            <h2>{post?.details}</h2>
            <button onClick={(event) => edit(post)}>Edit</button>
            <button onClick={(event) => deleteTodo(post)}>Delete</button>
            <Link to="/">
                <button>Go Back</button>
            </Link>
        </div>
    )
}

export default SinglePost