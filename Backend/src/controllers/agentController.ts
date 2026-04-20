import express from "express";
import OpenAI from "openai";
import type { RequestHandler } from "express";
import mongoose, { Error } from "mongoose";
import { ZodObject } from "zod";
import { z } from "zod/mini";
import { run } from "@openai/agents";
import {
  InterviewAgent,
  ClassifictionAgent,
  FrageTranslationAgent,
  FrageCategorizeAgent,
  CategoryTranslatorAgent,
  InterviewTranslatorAgent,
  TTSAgent,
} from "#agents";
import { writeLogFileEntry } from "#utils";
import {
  Interviews,
  InterviewProblems,
  Problems,
  InterviewSolutions,
  Solutions,
} from "#models";
import { OPEN_ROUTER_API_KEY, OPENAI_API_KEY } from "#config";
import { OpenRouter } from "@openrouter/sdk";

const openai = new OpenAI({ apiKey: OPEN_ROUTER_API_KEY });

export const interviewInput: RequestHandler = async (req, res, next) => {
  writeLogFileEntry(
    "Enter interview Input",
    res,
    2,
    "agentController/interviewInput",
  );
  const { prompt } = req.body;

  try {
    const result = await run(InterviewAgent, prompt);

    writeLogFileEntry(
      `Interview anonymized: "${result.finalOutput}"`,
      res,
      2,
      "agentController/interviewInput",
    );

    const interviewinputtokens =
      result.state._modelResponses[0]?.usage.inputTokens;
    const interviewoutputtokens =
      result.state._modelResponses[0]?.usage.outputTokens;
    writeLogFileEntry(
      `Interview Conversion - Input tokens: "${interviewinputtokens}, Output tokens: "${interviewoutputtokens}"`,
      res,
      3,
      "agentController/interviewInput",
    );

    const interviewoutput = JSON.stringify(result.finalOutput);

    const finalresult = await run(ClassifictionAgent, interviewoutput);

    //res.json({ data: JSON.stringify(finalresult.finalOutput) });
    const output = {
      finaltext: finalresult.finalOutput?.finalText,
      problem: finalresult.finalOutput?.problem.analysisText,
      problemCategories: finalresult.finalOutput?.problem.umrellaTerms,
      solutions: finalresult.finalOutput?.solutionAnalysis,
    };
    writeLogFileEntry(
      `Interview Output ${JSON.stringify(output)}`,
      res,
      2,
      "agentController/interviewInput",
    );

    const categorizeinputtokens =
      finalresult.state._modelResponses[0]?.usage.inputTokens;
    const categorizeoutputtokens =
      finalresult.state._modelResponses[0]?.usage.outputTokens;
    writeLogFileEntry(
      `Interview Classification - Input tokens: "${categorizeinputtokens}, Output tokens: "${categorizeoutputtokens}"`,
      res,
      3,
      "agentController/interviewInput",
    );

    res.json(output);
  } catch (err) {
    console.log(err);
  }
  //next();
};

const category = z.object({
  key: z.string(),
  value: z.string(),
});

const frageCategoryInput = z.object({
  frage: z.string(),
  categories: z.array(category),
});

export const beantworteFrage: RequestHandler = async (req, res) => {
  writeLogFileEntry(
    "Enter beantworteFrage",
    res,
    2,
    "agentController/beantworteFrage",
  );
  const { frage, problempairs } = req.body;
  writeLogFileEntry(
    `Frage: ${JSON.stringify(frage)}`,
    res,
    3,
    "agentController/beantworteFrage",
  );
  writeLogFileEntry(
    `Problem Pairs: ${JSON.stringify(problempairs)}`,
    res,
    3,
    "agentController/beantworteFrage",
  );

  try {
    const result = await run(FrageTranslationAgent, frage);

    const translationoutput = {
      originalFrage: result.finalOutput?.originalFrage,
      language: result.finalOutput?.language,
      germanFrage: result.finalOutput?.germanFrage[0],
    };

    writeLogFileEntry(
      `Translationresult: "${JSON.stringify(translationoutput)}"`,
      res,
      3,
      "agentController/beantworteFrage",
    );

    const questiontranslationinputtokens =
      result.state._modelResponses[0]?.usage.inputTokens;
    const questiontranslationoutputtokens =
      result.state._modelResponses[0]?.usage.outputTokens;
    writeLogFileEntry(
      `Question Translation - Input tokens: "${questiontranslationinputtokens}, Output tokens: "${questiontranslationoutputtokens}"`,
      res,
      3,
      "agentController/beantworteFrage",
    );

    const categoryfrage = result.finalOutput?.germanFrage[0];
    const categoryinputobject = {
      frage: categoryfrage,
      problems: problempairs,
    };

    const categoryoutput = await run(
      FrageCategorizeAgent,
      JSON.stringify(categoryinputobject),
    );

    writeLogFileEntry(
      `Kategorien: "${JSON.stringify(categoryoutput.finalOutput)}"`,
      res,
      3,
      "agentController/beantworteFrage",
    );

    const categoryinputtokens =
      categoryoutput.state._modelResponses[0]?.usage.inputTokens;
    const categoryoutputtokens =
      categoryoutput.state._modelResponses[0]?.usage.outputTokens;
    writeLogFileEntry(
      `Kategorize - Input tokens: "${categoryinputtokens}, Output tokens: "${categoryoutputtokens}"`,
      res,
      3,
      "agentController/beantworteFrage",
    );

    const categorytranslationinputobjects = {
      Language: translationoutput.language,
      Categories: categoryoutput.finalOutput?.categories,
    };

    const translatedcategoryoutput = await run(
      CategoryTranslatorAgent,
      JSON.stringify(categorytranslationinputobjects),
    );

    writeLogFileEntry(
      `Translated Kategorien: "${JSON.stringify(translatedcategoryoutput.finalOutput)}"`,
      res,
      3,
      "agentController/beantworteFrage",
    );

    const translationinputtokens =
      translatedcategoryoutput.state._modelResponses[0]?.usage.inputTokens;
    const translationoutputtokens =
      translatedcategoryoutput.state._modelResponses[0]?.usage.outputTokens;
    writeLogFileEntry(
      `Category Translation - Input tokens: "${translationinputtokens}, Output tokens: "${translationoutputtokens}"`,
      res,
      3,
      "agentController/beantworteFrage",
    );

    const output = {
      Deutsch: {
        Frage: translationoutput.germanFrage,
        Categories: categoryoutput.finalOutput?.categories,
      },
      Fremdsprache:
        translationoutput.language != "Deutsch"
          ? {
              language: translationoutput.language,
              Frage: translationoutput.originalFrage,
              Categories:
                translatedcategoryoutput.finalOutput?.translatedcategories,
            }
          : {},
    };

    //languageinterviewlist;

    //

    res.json(output);
  } catch (err) {
    console.log(err);
  }
};

export const languageinterviewlist: RequestHandler = async (req, res) => {
  writeLogFileEntry(
    "Enter languageinterviewlist",
    res,
    2,
    "agentController/languageinterviewlist",
  );
  const { problemids, language } = req.body;

  writeLogFileEntry(
    `Problem Ids: ${JSON.stringify(problemids)}`,
    res,
    3,
    "agentController/languageinterviewlist",
  );

  writeLogFileEntry(
    `Language: ${language}`,
    res,
    3,
    "agentController/languageinterviewlist",
  );

  const solutionids = null;

  try {
    const fetchpath = `http://127.0.0.1:3000/requests/interviews`;
    const interviewsresult = await fetch(fetchpath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ problemids, solutionids }),
    });

    if (!interviewsresult.ok)
      throw new Error(
        `${interviewsresult.status}. Get interview list for languageinterview went wrong!`,
      );

    const interwiewdatafromdb = await interviewsresult.json();
    writeLogFileEntry(
      `Interview Origin Data: ${JSON.stringify(interwiewdatafromdb)}`,
      res,
      3,
      "agentController/languageinterviewlist",
    );

    if (language == "Deutsch" || language == "German") {
      const deutschOutput = {
        language: "Deutsch",
        interviews: interwiewdatafromdb,
      };
      res.json(deutschOutput);
    } else {
      // translate interwiewdatafromdb with InterviewTranslatorAgent

      const interviewtranslationinputobjects = {
        Language: language,
        Interviews: interwiewdatafromdb,
      };

      const translatedinterviewoutput = await run(
        InterviewTranslatorAgent,
        JSON.stringify(interviewtranslationinputobjects),
      );

      writeLogFileEntry(
        `Translationresult: "${JSON.stringify(translatedinterviewoutput.finalOutput)}"`,
        res,
        3,
        "agentController/languageinterviewlist",
      );
      const inputtokens =
        translatedinterviewoutput.state._modelResponses[0]?.usage.inputTokens;
      const outputtokens =
        translatedinterviewoutput.state._modelResponses[0]?.usage.outputTokens;
      writeLogFileEntry(
        `Input tokens: "${inputtokens}, Output tokens: "${outputtokens}"`,
        res,
        3,
        "agentController/languageinterviewlist",
      );

      res.json(translatedinterviewoutput.finalOutput);
    }
  } catch (error) {}
};

export const translateinterview: RequestHandler = async (req, res) => {
  writeLogFileEntry(
    "Enter languageinterviewlist",
    res,
    2,
    "agentController/translateinterview",
  );
  const { interviewid, language } = req.body;
  writeLogFileEntry(
    `Body interviewid: ${interviewid} language: ${language}`,
    res,
    3,
    "agentController/translateinterview",
  );

  const interviewdata = await Interviews.findById(interviewid);

  const interviewrecord = {
    interviewtext: { key: interviewid, value: interviewdata?.interview },
    cardtext: { key: interviewid, value: interviewdata?.problem },
    problems: [{}],
    solutions: [{}],
  };

  const problemdata = await InterviewProblems.find({
    InterviewObjectId: interviewid,
  });

  for await (const problemrecord of problemdata) {
    const problemOid = problemrecord.ProblemObjectId;
    const record = await Problems.findById(problemOid);

    const detailrecord = {
      key: problemrecord.ProblemObjectId,
      value: record?.problem,
    };
    interviewrecord.problems.push(detailrecord);
  }

  const solutiondata = await InterviewSolutions.find({
    InterviewObjectId: interviewid,
  });

  for await (const solutionrecord of solutiondata) {
    const solutionOid = solutionrecord.SolutionObjectId;
    const record = await Solutions.findById(solutionOid);

    const detailrecord = {
      key: solutionrecord.SolutionObjectId,
      value: record?.solutionIdentifier,
    };
    interviewrecord.solutions.push(detailrecord);
  }

  if (language == "Deutsch" || language == "German") {
    res.json(interviewrecord);
  } else {
    const interviewtranslationinputobjects = {
      Language: language,
      Interviews: [interviewrecord],
    };

    const translatedinterviewoutput = await run(
      InterviewTranslatorAgent,
      JSON.stringify(interviewtranslationinputobjects),
    );

    const tranlatedinterviewarray =
      translatedinterviewoutput.finalOutput?.interviews;
    const translatedinterview = tranlatedinterviewarray[0];

    writeLogFileEntry(
      `Translationresult: "${JSON.stringify(translatedinterview)}"`,
      res,
      3,
      "agentController/languageinterviewlist",
    );
    const inputtokens =
      translatedinterviewoutput.state._modelResponses[0]?.usage.inputTokens;
    const outputtokens =
      translatedinterviewoutput.state._modelResponses[0]?.usage.outputTokens;
    writeLogFileEntry(
      `Input tokens: "${inputtokens}, Output tokens: "${outputtokens}"`,
      res,
      3,
      "agentController/languageinterviewlist",
    );

    res.json(translatedinterview);
  }
};

export const speakinterview: RequestHandler = async (req, res) => {
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  try {
    const { text, voice = "alloy" } = req.body;

    const mp3 = await openai.audio.speech.create({
      model: "tts-1", // Oder "tts-1-hd" für bessere Qualität
      voice: voice,
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    res.set("Content-Type", "audio/mpeg");
    res.send(buffer);
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).send("Fehler bei der TTS-Generierung");
  }
};

/*
// Überarbeitung mit Gemini Teil 2
export const speakinterview: RequestHandler = async (req, res) => {
  try {
    const { text, voice = "alloy" } = req.body;

    // 1. Nutze die Standard fetch API (Node 18+)
    const response = await fetch("https://openrouter.ai", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPEN_ROUTER_API_KEY}`,
        "Content-Type": "application/json",
        // PFLICHT für OpenRouter:
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Wissens-Assistent",
      },
      body: JSON.stringify({
        // ACHTUNG: Probiere hier die Kurzform des Modells
        model: "openai/gpt-4o-mini-tts-2025-12-15",
        messages: [{ role: "user", content: text }],
        modalities: ["text", "audio"],
        audio: { voice: voice, format: "mp3" },
      }),
    });

    // 2. Body nur EINMAL lesen!
    const responseData = await response.text();

    // Prüfen, ob es HTML ist (Fehlerfall)
    if (responseData.startsWith("<!DOCTYPE")) {
      console.error(
        "OpenRouter hat HTML statt JSON gesendet. Wahrscheinlich Modell nicht gefunden oder Header falsch.",
      );
      return res.status(500).send("API-Konfigurationsfehler: HTML erhalten.");
    }

    // Jetzt erst zu JSON parsen
    const data = JSON.parse(responseData);

    if (data.error) {
      console.error("OpenRouter API Error:", data.error);
      return res.status(400).json(data.error);
    }

    const audioBase64 = data.choices?.[0]?.message?.audio?.data;

    if (!audioBase64) {
      console.error(
        "Kein Audio im JSON gefunden. Struktur:",
        JSON.stringify(data, null, 2),
      );
      return res.status(500).send("Kein Audio erhalten.");
    }

    res.set("Content-Type", "audio/mpeg");
    res.send(Buffer.from(audioBase64, "base64"));
  } catch (error) {
    console.error("Detaillierter Server Fehler:", error);
    res.status(500).send("Interner Server Fehler");
  }
};

*/

/*
// Überarbeitung mit Gemini Teil 1
export const speakinterview: RequestHandler = async (req, res) => {
  try {
    const { text, voice = "alloy" } = req.body;

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai",
      apiKey: OPEN_ROUTER_API_KEY,
    });

    const response = await fetch("https://openrouter.ai", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPEN_ROUTER_API_KEY}`,
        "Content-Type": "application/json",
        // OpenRouter benötigt oft diesen Header für Statistiken
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Mein Projekt",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini-tts-2025-12-15",
        messages: [{ role: "user", content: text }],
        modalities: ["text", "audio"],
        audio: { voice: voice, format: "mp3" },
      }),
    });

    console.log("RESPONSE ERHALTEN");

    // PRÜFUNG: Ist die Antwort überhaupt JSON?
    const contentType = response.headers.get("content-type");
    if (!response.ok || !contentType?.includes("application/json")) {
      const errorText = await response.text(); // Hier liest du das HTML als Text
      console.error(`API Fehler Status: ${response.status}`);
      console.error(
        `Antwort-Inhalt: ${errorText.slice(0, 500)} response.text: ${response.text()}`,
      ); // Zeigt die ersten 500 Zeichen des HTML
      return res
        .status(response.status)
        .send("OpenRouter hat kein gültiges JSON geliefert.");
    }

    const data = await response.json();

    console.log("Nach Fetch:", data);

    // Falls OpenRouter einen Fehler meldet
    if (data.error) {
      console.error("OpenRouter API Error:", data.error);
      return res.status(400).json(data.error);
    }

    // Sicherer Zugriff auf die Audio-Daten
    const audioData = data.choices?.[0]?.message?.audio?.data;

    if (!audioData) {
      console.error("Keine Audio-Daten in der Antwort:", data);
      return res.status(500).send("Die API hat kein Audio geliefert.");
    }

    // Base64 zu Buffer konvertieren und senden
    const buffer = Buffer.from(audioData, "base64");
    res.set("Content-Type", "audio/mpeg");
    res.send(buffer);

  
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).send("Interner Server Fehler");
  }
};

*/

/* 
//// Recommended by OpenRouter
export const speakinterview: RequestHandler = async (req, res) => {
  try {
    const dummy = 0;
    const openrouter = new OpenRouter({
      apiKey: OPEN_ROUTER_API_KEY,
    });

    const { text, voice = "alloy" } = req.body;

    const stream = await openrouter.chat.send({
      model: "openai/gpt-4o-mini-tts-2025-12-15",
      messages: [
        {
          role: "user",
          content: text,
        },
      ],
      stream: true,
    });

    res.set("Content-Type", "audio/mpeg");
    res.send(stream);
  } catch (error) {
    console.error("OpenAI TTS Error:", error);
    //res.status(500).send(`Fehler bei der TTS-Generierung.`);
    res.status(500).send(error);
  }
};
*/

/*
// Recommended by Geminy
export const speakinterview: RequestHandler = async (req, res) => {
  try {
    const { text, voice = "alloy" } = req.body;
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: OPEN_ROUTER_API_KEY,
    });

    const mp3 = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts-2025-12-15",
      voice: voice,
      input: text,
      // Optional: Erweiterte Steuerung für dieses Modell
      response_format: "mp3",
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    res.set("Content-Type", "audio/mpeg");
    res.send(buffer);
  } catch (error) {
    console.error("OpenAI TTS Error:", error);
    res.status(500).send(`Fehler bei der TTS-Generierung.`);
  }
};
*/
