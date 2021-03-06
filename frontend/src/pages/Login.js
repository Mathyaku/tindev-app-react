import React, {useState} from 'react';
import './Login.css';

import logo from '../assets/logo.svg';
import api from '../services/api';

export default function Login({history}) {
    const [username, setUsername ] = useState('');


    async function handleSubmit(e) {
        e.preventDefault();

        console.log(username)

        const response = await api.post('/devs', {
            username: username
        });

        const { _id } = response.data;
        history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} >
                <img src={logo} alt="Tindev"/>
                <input 
                    placeholder="Digite seu usuário do Github"
                    value={username}
                    onChange={e => setUsername(e.target.value) }
                />
                <button type="Submit">Submit</button>
            </form>
        </div>
    );
}
