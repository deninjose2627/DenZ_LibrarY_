import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "../components/LoadingIndicator";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const route="/api/token/";
    const method="login";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            console.log(res)
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/")
        }
         catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div style={{ backgroundImage: `url('https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?cs=srgb&dl=pexels-stanislav-kondratiev-2908984.jpg&fm=jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', position: 'relative' }}>
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Login/Sign in </h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                login
            </button>
            <a href="\register">singup</a>
        </form>
        <div className="library-container">
        <h1 style={{color: "WHITE",backgroundColor:"grey",fontSize: "50px",textAlign: "center"}}>DenZ LibrarY</h1>
        </div>
        </div>
    );
}

export default Login;
