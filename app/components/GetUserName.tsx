'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerName } from '../store/globalSlice';
import { readDataFromDB } from '../actions/databaseActions';
import { getClient } from '../lib/mongodb';

export default function GetUserName() {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState<string>('');
    const [nameExists, setNameExists] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const hasUserName = useSelector(
        (state: any) => state.globalAllPokemons.playerName
    )
        ? true
        : false;

    const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            setLoading(true);
            e.preventDefault();
            const dataInDb = await readDataFromDB();
            const repeatedValue = dataInDb.some(
                (item: any) => item.name === inputValue
            );
            if (!repeatedValue) {
                dispatch(setPlayerName(inputValue));
                setNameExists(false);
            } else {
                setNameExists(true);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const data = await getClient();
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        };

        checkConnection();
    }, []);
    return (
        <main
            className={`fixed top-0 left-0 w-full min-h-[100dvh]  items-center justify-center bg-black/90 z-50 ${
                !hasUserName ? 'flex' : 'hidden'
            }`}
        >
            <form
                className="flex flex-col items-center justify-center gap-6"
                onSubmit={(e) => handleClick(e)}
            >
                <label className="text-3xl">Enter your Username:</label>
                <p className="font-thin text-xl">
                    {nameExists ? 'Username already taken!' : ''}
                </p>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className={`bg-transparent px-4  border w-72 rounded-lg py-2 focus:outline-none text-left ${
                        nameExists ? 'border-red-600 userExists' : ''
                    }`}
                />
                {loading && (
                    <div className="flex items-center justify-center w-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}
                <button
                    type="submit"
                    className=" px-4 py-2 rounded-md w-full bg-blue-500 hover:bg-blue-400 transition-all duration-300"
                >
                    Submit
                </button>
                <p className="text-sm text-red-400 ">
                    *You cannot change this later!
                </p>
            </form>
        </main>
    );
}
