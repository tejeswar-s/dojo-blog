import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("mario");

    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, author, body};

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method : "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(blog),
        })
        .then(() => {
            setIsPending(false);
            console.log("new blog added");
        })

        // history.go(-1);
        history.push('/');
    }

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input type="text" name="title" required value = {title} onChange={(e) => setTitle(e.target.value)}/>
                <br/>
                <label>Author:</label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                <br/>
                <label>Blog Content:</label>
                <textarea name="content" required value={body} onChange={(e) => setBody(e.target.value)}/>
                <br/>
                {!isPending && <button type="submit">Add Blog</button>}
                {isPending && <button type="submit" disabled>Adding blog...</button>}
            </form>
        </div>    
    );
}
 
export default Create;