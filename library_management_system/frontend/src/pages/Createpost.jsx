import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

import getNotes from './Home';
import Navbar from "./Navbar";
function CreatePost() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publish_year, setPublishyear] = useState("");
    const [genre, setGenre] = useState("");
    const [uploadFile, setUploadFile] = useState(null); // Change the initial state to null
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setUploadFile(event.target.files[0]);
    };

    const createNote = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("publish_year", publish_year);
        formData.append("genre", genre); // Corrected from Genre to genre
        formData.append("image", uploadFile); // Append the file to the FormData

        try {
            const res = await api.post("/api/notes/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 201) {
                alert("Note created!");
                navigate("/")

                
            } else {
                alert("Failed to create note.");
            }
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div style={{ backgroundImage: `url('https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?cs=srgb&dl=pexels-stanislav-kondratiev-2908984.jpg&fm=jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', position: 'relative' }}>
            < Navbar />
            <h2 style={{color: "WHITE", textAlign: "center"}}>CREATE A BOOK</h2>


            <form onSubmit={createNote} encType="multipart/form-data">
                <label htmlFor="title">Title</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <br/>

                <label htmlFor="author">Author:</label>
                <br />
                <input
                    type="text"
                    id="author"
                    name="author"
                    required
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                />

                <label htmlFor="genre">Genre</label>
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    required
                    onChange={(e) => setGenre(e.target.value)}
                    value={genre}
                />

                <label htmlFor="publish_year">Publish Year</label>
                <input
                    type="date"
                    id="publish_year"
                    name="publish_year"
                    required
                    onChange={(e) => setPublishyear(e.target.value)}
                    value={publish_year}
                />
                
                <label htmlFor="file">Select an Image:</label>
                <br />
                <input
                    type="file"
                    id="file"
                    name="file"
                    required
                    onChange={handleFileChange} // Handle file change event
                />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default CreatePost;
