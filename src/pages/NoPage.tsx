import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NoPage() {
    const navigate = useNavigate();

    // Automatically navigate back to home page
    useEffect(() => navigate("/"));

    return (
        <>
            <h1>Uh oh! This page doesn't exist!</h1>
            <button onClick={() => navigate("/")}>Go back home</button>
        </>
    );
}
