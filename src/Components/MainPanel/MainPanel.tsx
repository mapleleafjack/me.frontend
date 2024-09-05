import React from "react";
import './MainPanel.css';
import { Album } from "../../types";


const MainPanel = () => {
    const [results, setResults] = React.useState<Album[] | null>([]);

    const fetchResults = async () => {
        setResults(null);
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/albums');
            const data: Album[] = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    React.useEffect(() => {
        fetchResults();
    }, []);

    return <div className="main-panel">
        <h1>My Main Panel</h1>
        <p data-testid="main-panel-text">This is the main panel of my app.</p>
        
        <pre id="results">
            {results && results.length > 0 ? (
                results.map(album => (
                    <div key={album.id}>{album.title}</div>
                ))
            ) : "Loading"}
        </pre>

        <button id="fetch-button" onClick={fetchResults}>Fetch</button>
    </div>
}

export default MainPanel;