import { z } from "zod";
import * as z4 from "zod/v4";
import { Agent } from "@openai/agents";
import {
  INTERVIEW_MAINMODEL,
  CLASSIFICATION_MAINMODEL,
  FRAGETRANSLATION_MAINMODEL,
  FRAGECATEGORIZE_MAINMODEL,
  CATEGORYTRANSLATOR_MAINMODEL,
  INTERVIEWTRANSLATOR_MAINMODEL,
} from "#config";

//===============================================================
// Interview Agent
//===============================================================
// Output definitions
const replacementschema = z.object({
  replacement: z.string(),
  original: z.string(),
  reason: z.string(),
});

const interviewOutput = z.object({
  transformed: z.string(),
  reasons: z.array(replacementschema),
});

// Interview Agent constructor
function getInterviewAgent() {
  return new Agent({
    name: "Interview Handler",
    model: INTERVIEW_MAINMODEL,
    outputType: interviewOutput,
    instructions: `You provide assistance with interview text by anonymize personal information in it 
    and output the transformed text as "transformed" key in the final output. 
    The reason for any replacement should be added as array "reasons" having for each replacement the "replacement" text, the "original" text and the "reason" for the replacement.  The key "reasons" key is added to the output.`,
  });
}

//===============================================================
// Classification Agent
//===============================================================
// Output definitions
const solutionschema = z.object({
  solutionIdentifier: z.string(),
  solutionPhrases: z.array(z.string()),
});

const problemAnalysis = z.object({
  analysisText: z.string(),
  umrellaTerms: z.array(z.string()),
});

const classificationOutput = z.object({
  finalText: z.string(),
  problem: problemAnalysis,
  solutionAnalysis: z.array(solutionschema),
});

// Classification Agent constructor
/*
function getClassificationAgent() {
  return new Agent({
    name: "Klassification Handler",
    model: CLASSIFICATION_MAINMODEL,
    outputType: classificationOutput,
    instructions: `You provide assistance with finalize the provided "transformed" text. 
    Therefore all placeholders defined in the "reasons" "replacements" are going to be replaced with words like "Pflegefachkraft", "Bewohner" or "Institution" including required possessive pronouns and articles. 
    The updated text is going to be saved  as "finalText" in the output.
    Additionally try to identify the problem that is described with the text and save it as "problemAnalysis" in the output.
    The text is also providing one ore more soltionas for the problem. Insert for each solution a record into the "solutionAnalysis" having the text that is identified as the solution saved in "solutionPhrases" 
    and a suggestion of an Umbrella term saved in "solutionIdendifier".`,
  });
}
*/
function getClassificationAgent() {
  return new Agent({
    name: "Klassification Handler",
    model: CLASSIFICATION_MAINMODEL,
    outputType: classificationOutput,
    instructions: `
    You are an established head nurse specialized in person-centered care working based on 
    Tom Kitwood, Teepa Snow and Adria Thompson M.A.
    You provide assistance with finalize the provided "transformed" text. 
    Therefore all placeholders defined in the "reasons" "replacements" are going to be replaced with words like "Pflegefachkraft", "Bewohner" or "Institution" including required possessive pronouns and articles. 
    The updated text is going to be saved  as "finalText" in the output.
    Additionally try to identify the problem that is described with the text and save it as "problemAnalysis" in the output.
    The text is also providing one ore more soltionas for the problem. Insert for each solution a record into the "solutionAnalysis" having the text that is identified as the solution saved in "solutionPhrases" 
    and a suggestion of an Umbrella term saved in "solutionIdendifier".`,
  });
}

//===============================================================
// Frage Translation Agent
//===============================================================
// Output definitions
const germanfrageOutput = z.object({
  originalFrage: z.string(),
  language: z.string(),
  germanFrage: z.array(z.string()),
});

// Frageuebersetzer Agent constructor
function getFrageTranslationAgent() {
  return new Agent({
    name: "Frageubersetzer Handler",
    model: FRAGETRANSLATION_MAINMODEL,
    outputType: germanfrageOutput,
    instructions: `You provide assistance with the determination of the language of the provided question "frage". Translate the "frage" into German.
    Return the original provided question "frage" as "originalFrage", the recognized language as "language" and the translated "frage" as "germanFrage".`,
  });
}

//===============================================================
// Frage Kategorisierungs Agent
//===============================================================
// Output definitions

const category = z.object({
  key: z.string(),
  value: z.string(),
});

const frageCategoryOutput = z.object({
  categories: z.array(category),
});

// Fragekategorisierer Agent constructor
/*
function getFrageCategoriesAgent() {
  return new Agent({
    name: "Fragekategorisierer Handler",
    model: FRAGECATEGORIZE_MAINMODEL,
    outputType: frageCategoryOutput,
    instructions: `You provide assistance with the determination of the categories for provided question "germanFrage". Allowed categories must be taken from the provided array "problems" where the category umbrella term is stored as "value".
    each sufficient umrella term is stored in the output array "categories" with the complete key/value pair where each category exists only one time.
    Return the "categories".`,
  });
}
*/
function getFrageCategoriesAgent() {
  return new Agent({
    name: "Fragekategorisierer Handler",
    model: FRAGECATEGORIZE_MAINMODEL,
    outputType: frageCategoryOutput,
    instructions: `You are an established head nurse specialized in person-centered care working based on 
    Tom Kitwood, Teepa Snow and Adria Thompson M.A. 
    You provide assistance with the determination of the categories for provided question "germanFrage". 
    Each sufficient umrella term is stored in the output array "categories" with the complete key/value pair where each category exists only one time.
    Allowed categories must be taken from the provided array "problems" where the category umbrella term is stored as "value".
    Return the "categories".
`,
  });
}

//===============================================================
// Kategorie Translation Agent
//===============================================================
// Output definitions

const categoryTranslationOutput = z.object({
  translatedcategories: z.array(category),
});

// Kategorie Translator Agent constructor
function getTranslatedCategoriesAgent() {
  return new Agent({
    name: "Kategorieuebersetzer Handler",
    model: CATEGORYTRANSLATOR_MAINMODEL,
    outputType: categoryTranslationOutput,
    instructions: `You provide assistance with the translation of the provided "Categories". Foreach category in the provided "Categories" the "value" needs to be translated into the provided "Language".
    Return the "categoryTranslationOutput".`,
  });
}

//===============================================================
// Interview List Translation Agent
//===============================================================
// Output definitions

const keyValuePair = z.object({
  key: z.string(),
  value: z.string(),
});
const interviewTranslationOutput = z.object({
  interviewtext: keyValuePair,
  cardtext: keyValuePair,
  problems: z.array(keyValuePair),
  solutions: z.array(keyValuePair),
});

const interviewsTranslationOutput = z.object({
  language: z.string(),
  interviews: z.array(interviewTranslationOutput),
});

// Interview List  Translator Agent constructor
function getTranslatedInterviewsAgent() {
  return new Agent({
    name: "Interviewuebersetzer Handler",
    model: INTERVIEWTRANSLATOR_MAINMODEL,
    outputType: interviewsTranslationOutput,
    instructions: `You provide assistance with the translation of the provided interviews. 
    Foreach interview all "value" nodes needs to be translated into the provided "Language".
    When translating a problem or solution term, don't insert the original text into brackets.
    Return the "language" and the translated "interviews" with the interviewsTranslationOutput. `,
  });
}

//===============================================================
// Text To Speech Agent
//===============================================================
// Output definitions

const ttsOutput = z.object({ stream: z.instanceof(Buffer) });

function getTTSAgent() {
  return new Agent({
    name: "Text to speech Handler",
    model: "gpt-4o-mini-tts-2025-12-15",
    outputType: ttsOutput,
    instructions: `Sprich ruhig und professionell. `,
  });
}

/*
writeLogFileEntry(
      `Create Speech`,
      res,
      3,
      "agentController/speakinterview",
    );
    const mp3 = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts-2025-12-15",
      voice: voice,
      input: text,
      // Optional: Erweiterte Steuerung für dieses Modell
      instructions: "Sprich ruhig und professionell.",
      response_format: "mp3",
    });

    writeLogFileEntry(`MP3 created`, res, 3, "agentController/speakinterview");

    // Wandle die Antwort in einen Buffer um und sende ihn
    const buffer = Buffer.from(await mp3.arrayBuffer());

    writeLogFileEntry(
      `Buffer created`,
      res,
      3,
      "agentController/speakinterview",
    );

    res.set("Content-Type", "audio/mpeg");
    res.send(buffer);

*/

//===============================================================
// Agent exports
//===============================================================
export const InterviewAgent = getInterviewAgent();
export const ClassifictionAgent = getClassificationAgent();
export const FrageTranslationAgent = getFrageTranslationAgent();
export const FrageCategorizeAgent = getFrageCategoriesAgent();
export const CategoryTranslatorAgent = getTranslatedCategoriesAgent();
export const InterviewTranslatorAgent = getTranslatedInterviewsAgent();
export const TTSAgent = getTTSAgent();
