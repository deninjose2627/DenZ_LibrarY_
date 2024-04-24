import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import CreatePost from './Createpost';
import Navbar  from "./Navbar";

function Home() {
    const [notes, setNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // New state for the search term

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const modifyNote = (id, updatedNote) => { // New function to modify a note
        api
            .put(`/api/notes/modify/${id}/`, updatedNote)
            .then((res) => {
                if (res.status === 200) alert("Note modified!");
                else alert("Failed to modify note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    return (
        <div style={{ backgroundImage: `url('https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?cs=srgb&dl=pexels-stanislav-kondratiev-2908984.jpg&fm=jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', position: 'relative' }}>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}> {/* Container for the search bar */}
                <input type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '300px', height: '40px' }} /> {/* Increased size of the search bar */}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <h2>BOOKS</h2>
                {notes.filter((note) => note.title.toLowerCase().includes(searchTerm.toLowerCase())).map((note) => ( // Filter notes based on search term
                    <div style={{ flex: '0 0 auto', margin: '10px', width: '250px', height: '700px' }}>
                        <Note note={note} onDelete={deleteNote} onModify={modifyNote} key={note.id} /> {/* Pass the modifyNote function as a prop */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
