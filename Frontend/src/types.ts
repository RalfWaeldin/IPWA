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
  };

  // =======================================================
  // Interview (Db)
  // =======================================================

  type AcceptedInterviewData = {
    acceptedData: {
      finaltext: string;
      problem: string;
      problemCategories: [string] | [];
      solutions: SolutionList;
    };
  };

  type InterviewDbContextType = {
    handleAcceptedInterview: ({
      acceptedData,
    }: AcceptedInterviewData) => Promise<void>;
  };

  // =======================================================
  // Request (Db)
  // =======================================================

  type RequestDbContextType = {
    solutionColl: keyValuePair[];
    problemColl: keyValuePair[];
    handleGetSolutionList: ({}) => Promise<RequestCategoryListDatatype>;
    handleGetProblemList: ({}) => Promise<RequestCategoryListDatatype>;
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
    cardtext: keyValuePair;
    problems: keyValuePair[];
    solutions: keyValuePair[];
  };
}
