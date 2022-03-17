export default interface QuestionsFormResponseFormat {
  formId: string;
  formNumber: string;
  formNames: {
    portuguese: string;
    english: string;
  };
  topics: [
    {
      topicId: string;
      portuguese: string;
      english: string;
      questions: [
        {
          questionId: string;
          questionNumber: string;
          portuguese: {
            question: string;
            evidencesPlaceholder: string;
          };
          english: {
            question: string;
            evidencesPlaceholder: string;
          };
        }
      ];
    }
  ];
}
