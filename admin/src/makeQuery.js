import { useQuery } from '@apollo/client';
import { GET_ALL_PROMPTS } from './graphql/queries';
import React from 'react';

async function makeQuery(query) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { loading, error, data } = await useQuery(query);

    if (loading) {
        return { loading: true, data: null, error: null };
    }

    if (error) {
        return { loading: false, data: null, error: error.message };
    }

    const setData = data && data.query ? data.query : [];
    console.log(setData);

    return { loading: false, data: setData, error: null };
}



export { makeQuery };
