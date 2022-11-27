import {createContext, useContext, useState} from "react";

const audio = typeof Audio !== "undefined" ?
    new Audio("https://sharedfrequencies.out.airtime.pro/sharedfrequencies_a") :
    undefined

const AudioContext = createContext(audio);

export const AudioProvider = ({ children }) => (
    <AudioContext.Provider value={audio}>{children}</AudioContext.Provider>
);

export const useAudio = () => useContext(AudioContext);


