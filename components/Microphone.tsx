"use client"
import React from "react";
import { useRecordVoice } from "@/hooks/useRecordVoice";

const Microphone = () => {
    const { handleStartRecording, handleStopRecording, isRecording } = useRecordVoice();

    return (
        <div className="container">
            <h2 className="heading">Welcome to Voice Transcribing WebApp</h2>

            <div className="btn-wrapper">
                <button className={isRecording ? "start-btn active" : "start-btn"} disabled={isRecording} onClick={handleStartRecording}>Start</button>
                <button className="stop-btn" disabled={!isRecording} onClick={handleStopRecording}>Stop</button>
            </div>
        </div>
    )
}

export default Microphone;