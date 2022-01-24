import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { EvidencePlaceholder } from "../../app/entities/EvidencePlaceholder";
import { Form } from "../../app/entities/Form";
import { Language } from "../../app/entities/Language";
import { Question } from "../../app/entities/Question";
import { QuestionDescription } from "../../app/entities/QuestionDescription";
import { Topic } from "../../app/entities/Topic";
import { QuestionSeed } from "../seeds/question.seed";

export class SeedQuestions1642992675866 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const repoQuestion = getRepository(Question);
    const repoForm = getRepository(Form);
    const repoLanguage = getRepository(Language);
    const repoDescription = getRepository(QuestionDescription);
    const repoTopic = getRepository(Topic);
    const repoPlaceholder = getRepository(EvidencePlaceholder);

    // Alterar Hard-Coded
    const questionSeed = QuestionSeed[0];
    const ptLanguage = await repoLanguage.findOneOrFail({ name: "portuguese" });
    const enLanguage = await repoLanguage.findOneOrFail({ name: "english" });

    let question = new Question();
    question.questionNumber = questionSeed.question_number;
    question.form = await repoForm.findOneOrFail({ formNumber: "1" });
    question = await repoQuestion.save(question);

    // Descriptions
    const descriptionPt = new QuestionDescription();
    descriptionPt.question = question;
    descriptionPt.language = ptLanguage;
    descriptionPt.description = questionSeed.descriptions.description_pt;

    const descriptionEn = new QuestionDescription();
    descriptionEn.question = question;
    descriptionEn.language = enLanguage;
    descriptionEn.description = questionSeed.descriptions.description_en;

    await repoDescription.save(descriptionPt);
    await repoDescription.save(descriptionEn);

    // Topics
    const topicPt = new Topic();
    topicPt.question = question;
    topicPt.language = ptLanguage;
    topicPt.topic = questionSeed.topics.topic_pt;

    const topicEn = new Topic();
    topicEn.question = question;
    topicEn.language = enLanguage;
    topicEn.topic = questionSeed.topics.topic_en;

    await repoTopic.save(topicPt);
    await repoTopic.save(topicEn);

    // Placeholders
    const placeholderPt = new EvidencePlaceholder();
    placeholderPt.language = ptLanguage;
    placeholderPt.question = question;
    placeholderPt.placeholder =
      questionSeed.evidencePlaceholders.placeholder_pt;

    const placeholderEn = new EvidencePlaceholder();
    placeholderEn.language = enLanguage;
    placeholderEn.question = question;
    placeholderEn.placeholder =
      questionSeed.evidencePlaceholders.placeholder_en;

    await repoPlaceholder.save(placeholderPt);
    await repoPlaceholder.save(placeholderEn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable("evidences_placeholder");
    await queryRunner.clearTable("topics");
    await queryRunner.clearTable("questions_desc");
  }
}
