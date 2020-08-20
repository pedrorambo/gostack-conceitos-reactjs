import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        loadRepositories();
    }, []);

    async function loadRepositories() {
        const response = await api.get('repositories');
        setRepositories(response.data);
    }

    async function handleAddRepository() {
        const title = `Repositório ${Date.now()}`;

        const response = await api.post("repositories", {
            title,
            url: "http://url.com",
            techs: ["React"],
        });

        setRepositories([...repositories, response.data]);
    }

    async function handleRemoveRepository(id) {
        api.delete(`repositories/${id}`);

        const newRepositories = repositories.filter(repository => repository.id !== id);
        setRepositories(newRepositories);
    }

    function renderRepositoryList() {
        return repositories.map(repository => (
            <li key={repository.id}>
                {repository.title}

                <button onClick={() => handleRemoveRepository(repository.id)}>
                    Remover
                </button>
            </li>
        ))
    }

    return (
        <div>
            <ul data-testid="repository-list">
                {renderRepositoryList()}
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
