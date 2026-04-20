import { type Dispatch } from "react";
import { type SetStateAction } from "react";

declare global {
  type User = {
    _id: string;
    createdAt: string;
    __v: number;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
  };

  type RegisterFormState = {
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
  };

  type SolutionPhrases = [string] | [];

  type SolutionElement = {
    solutionIdentifier: string;
    solutionPhrases: SolutionPhrases;
  };

  type SolutionList = SolutionElement[];

  // =======================================================
  // Authentication
  // =======================================================
  type LoginData = { email: string; password: string };

  type AuthenticationContextType = {
    signedIn: boolean;
    user: User | null;
    handleSignIn: ({ email, password }: LoginData) => Promise<void>;
    handleSignOut: () => Promise<void>;
    handleRegister: (formState: RegisterFormState) => Promise<void>;
  };

  // =======================================================
  // Interview (Agent)
  // =======================================================
  type InterviewData = { prompt: string };

  type InterviewAnalysisDate = {
    finaltext: string;
    problem: string;
    problemCategories: [string] | [];
    solutions: SolutionList;
  };

  type InterviewAgentContextType = {
    handleInterviewErfassung: ({
      prompt,
    }: InterviewData) => Promise<InterviewAnalysisDate>;
    handleCustomerFrage: ({
      frage,
      problempairs,
    }: CustomerAnswer) => Promise<CustomerAnswerDataType>;
    //InterviewsDataType = await
    handleGetInterviewSets: ({
      language,
      problemids,
    }: InterviewAnswer) => Promise<InterviewsDataType>;
    thinking: boolean;
    setThinking: Dispatch<SetStateAction<boolean>>;
    isPlaying: boolean;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
  };

  // =======================================================
  // Interview (Db)
  // =======================================================

  type InterviewRequestCategories = {
    problemids: string[];
    solutionids: string[];
  };

  type AcceptedInterviewData = {
    acceptedData: {
      finaltext: string;
      problem: string;
      problemCategories: [string] | [];
      solutions: SolutionList;
    };
  };

  type AcceptedProblemSelectionType = string[];
  type AcceptedSolutionSelectionType = string[];

  type InterviewDbContextType = {
    handleAcceptedInterview: ({
      acceptedData,
    }: AcceptedInterviewData) => Promise<void>;
  };

  // =======================================================
  // Request (Db)
  // =======================================================

  type SingleInterviewDataType = {
    interviewtext: keyValuePair;
    cardtext: keyValuePair;
    problems: keyValuePair[];
    solutions: keyValuePair[];
  };

  type LanguageTripleDataType = {
    language: string;
    icon: string;
    iso: string;
  };

  type TranslationRequestType = {
    interviewid: string;
    language: string;
  };

  type TTSRequestType = {
    text: string;
    voice: string;
  };

  type RequestDbContextType = {
    solutionColl: keyValuePair[];
    problemColl: keyValuePair[];
    showInterviewDetails: boolean;
    displayData: RequestAnswerListDataType | [];
    selectedLanguage: LanguageTripleDataType;
    chosenInterview: SingleInterviewDataType | {};
    setSelectedLanguage: React.Dispatch<
      React.SetStateAction<LanguageTripleDataType>
    >;
    setChosenInterview: React.Dispatch<
      React.SetStateAction<SingleInterviewDataType>
    >;
    setDisplayData: React.Dispatch<
      React.SetStateAction<RequestAnswerListDataType | []>
    >;
    setShowInterviewDetails: React.Dispatch<React.SetStateAction<boolean>>;
    handleGetSolutionList: ({}) => Promise<RequestCategoryListDatatype>;
    handleGetProblemList: ({}) => Promise<RequestCategoryListDatatype>;
    getInterviewSelection: ({
      problemids,
      solutionids,
    }: InterviewRequestCategories) => Promise<RequestAnswerListDataType>;
    getTranslatedInterview: ({
      interviewid,
      language,
    }: TranslationRequestType) => Promise<SingleInterviewDataType>;
    getInterviewSound: ({
      text,
      voice,
    }: TTSRequestType) => Promise<Buffer<ArrayBuffer>>;
  };

  type keyValuePair = {
    key: string;
    value: string;
  };

  //type AcceptedCategoryList = { acceptedData: keyValuePair[] };

  type RequestCategoryListDatatype = {
    list: keyValuePair[];
  };
  type RequestAnswerResultDataType = {
    interviewtext: keyValuePair;
    cardtext: keyValuePair;
    problems: keyValuePair[];
    solutions: keyValuePair[];
  };
  type RequestAnswerListDataType = RequestAnswerResultDataType[];

  // =======================================================
  // Frage (Agent)
  // =======================================================

  type FrageData = {
    frage: string;
    problempairs: keyValuePair[];
  };

  type CustomerAnswer = {
    frage: string;
    problempairs: keyValuePair[];
  };

  type InterviewAnswer = {
    language: string;
    problemids: string[];
  };

  type CustomerAnswerDataType = {
    Deutsch: {
      Frage: string;
      Categories: keyValuePair[];
    };
    Fremdsprache: {
      language: string;
      Frage: string;
      Categories: keyValuePair[];
    };
  };

  type InterviewsDataType = {
    language: string;
    interviews: [
      {
        interviewtext: keyValuePair;
        cardtext: keyValuePair;
        problems: keyValuePair[];
        solutions: keyValuePair[];
      },
    ];
  };

  type FrageDbContextType = {
    handleCustomerFrage: ({
      frage,
      problempairs,
    }: CustomerAnswer) => Promise<CustomerAnswerDataType>;
  };
}
