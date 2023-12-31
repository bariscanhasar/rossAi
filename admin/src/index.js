import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';



const getToken = () => {
    const token = window.localStorage.getItem('token');

    if (token) {
        // Remove double quotes if present
        const cleanToken = token.replace(/^"|"$/g, '');
        return `Bearer ${cleanToken}`;
    }
    return 'Bearer null';
}

const client = new ApolloClient({
    uri: `${process.env.REACT_APP_API}graphql`,
    cache: new InMemoryCache(),
    headers: {Authorization: getToken()}
});



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
);