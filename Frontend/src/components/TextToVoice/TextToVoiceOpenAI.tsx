import { useRequestDbContext, useInterviewAgentContext } from "@/context";
import { useState, useRef, useEffect } from "react";

function TextToVoiceOpenAI() {
  const { chosenInterview, selectedLanguage, getInterviewSound } =
    useRequestDbContext();
  const { isPlaying, setIsPlaying } = useInterviewAgentContext();
  const [loading, setLoading] = useState(false);
  //const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const interview: SingleInterviewDataType = { ...chosenInterview };
    setText(interview ? interview.interviewtext.value : "");
    audioRef.current = null;
  }, [chosenInterview, selectedLanguage]);

  useEffect(() => {
    console.log("-------------------------------------------");
    console.log("Enter useEffect TextToVoiceOpenAI");
    console.log("TTS isPlaying", isPlaying);

    if (audioRef.current) {
      console.log("TTS audioref available");
      if (!isPlaying) {
        console.log("TTS Stop playing");
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Zurück zum Anfang
      }
    } else {
      audioRef.current = null;
      console.log("TTS No audioref available");
    }
    console.log("Leave useEffect TextToVoiceOpenAI");
    console.log("-------------------------------------------");
  }, [isPlaying]);

  const fetchAndPlay = async () => {
    // Wenn bereits ein Audio geladen ist, einfach abspielen
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    setLoading(true);

    try {
      setIsPlaying(false);
      const response = await fetch("http://localhost:3000/requests/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text, voice: "shimmer" }),
      });

      if (!response.ok) throw new Error("TTS fehlgeschlagen");

      // 1. Empfange den Buffer als Blob
      const blob = await response.blob();
      // 2. Erzeuge eine lokale URL für diesen Blob
      const url = URL.createObjectURL(blob);

      // 3. Erstelle das Audio-Element
      const audio = new Audio(url);
      audioRef.current = audio;

      // Event-Listener für Status-Updates
      audio.onended = () => setIsPlaying(false);

      audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Zurück zum Anfang
      setIsPlaying(false);
    }
  };

  return (
    <div className="p-4 space-x-2">
      {!isPlaying ? (
        <button
          onClick={fetchAndPlay}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Lädt..." : "Start"}
        </button>
      ) : (
        <button
          onClick={pauseAudio}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Pause
        </button>
      )}

      <button
        onClick={stopAudio}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Stop
      </button>
    </div>
  );
}

export default TextToVoiceOpenAI;
