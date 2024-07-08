import { useState, useEffect, useRef } from "react";

export const useRecordVoice = () => {
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const audioChunks = useRef<Blob[]>([]);

    useEffect(() => {
        if (typeof window !== undefined) {
            initializeMediaRecorder();
        }
    }, [])

    const initializeMediaRecorder = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(mediaRecorder);

        mediaRecorder.onstart = () => {
            audioChunks.current = [];
        }
        mediaRecorder.ondataavailable = (e) => {
            audioChunks.current.push(e.data);
        }
        mediaRecorder.onstop = () => {
            const blob = new Blob(audioChunks.current, { type: 'audio/wav' });
            setAudioBlob(blob);

            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = `recording_${Date.now()}.wav`;
            downloadLink.click();
            URL.revokeObjectURL(downloadLink.href);
        }
    }

    const handleStartRecording = () => {
        if (mediaRecorder) {
            mediaRecorder?.start();
            setIsRecording(true);
        }
    }

    const handleStopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder?.stop();
            setIsRecording(false);
        }
    }

    return { handleStartRecording, handleStopRecording, isRecording };
}