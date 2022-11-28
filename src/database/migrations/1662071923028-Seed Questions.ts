import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { EvidencePlaceholder } from "../../app/entities/EvidencePlaceholder";
import { Form } from "../../app/entities/Form";
import { Language } from "../../app/entities/Language";
import { Question } from "../../app/entities/Question";
import { QuestionDescription } from "../../app/entities/QuestionDescription";
import { Topic } from "../../app/entities/Topic";
import { QuestionSeed } from "../seeds/question.seed";

export class SeedQuestions1662071923028 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const repoForm = getRepository(Form);
    const repoLanguage = getRepository(Language);
    const repoDescription = getRepository(QuestionDescription);
    const repoTopic = getRepository(Topic);
    const repoPlaceholder = getRepository(EvidencePlaceholder);

    const ptLanguage = await repoLanguage.findOneOrFail({ name: "portuguese" });
    const enLanguage = await repoLanguage.findOneOrFail({ name: "english" });

    for (let form of QuestionSeed) {
      for (let questionSeed of form.questions) {
        try {
          let question = new Question();
          question.questionNumber = questionSeed.question_number;
          question.form = await repoForm.findOneOrFail({
            formNumber: form.formNumber,
          });
          question = await getRepository(Question).save(question);

          //Descriptions
          const descriptionPt = new QuestionDescription();
          descriptionPt.question = await getRepository(Question).findOneOrFail({
            where: { questionNumber: questionSeed.question_number },
          });
          descriptionPt.language = ptLanguage;
          descriptionPt.description = questionSeed.descriptions.description_pt;

          const descriptionEn = new QuestionDescription();
          descriptionEn.question = await getRepository(Question).findOneOrFail({
            where: { questionNumber: questionSeed.question_number },
          });
          descriptionEn.language = enLanguage;
          descriptionEn.description = questionSeed.descriptions.description_en;

          await repoDescription.save(descriptionPt);
          await repoDescription.save(descriptionEn);

          // Topics
          const topicPt = new Topic();
          topicPt.question = await getRepository(Question).findOneOrFail({
            where: { questionNumber: questionSeed.question_number },
          });
          topicPt.language = ptLanguage;
          topicPt.topic = questionSeed.topics.topic_pt;

          const topicEn = new Topic();
          topicEn.question = await getRepository(Question).findOneOrFail({
            where: { questionNumber: questionSeed.question_number },
          });
          topicEn.language = enLanguage;
          topicEn.topic = questionSeed.topics.topic_en;

          await repoTopic.save(topicPt);
          await repoTopic.save(topicEn);

          // Placeholders
          const placeholderPt = new EvidencePlaceholder();
          placeholderPt.language = ptLanguage;
          placeholderPt.question = await getRepository(Question).findOneOrFail({
            where: { questionNumber: questionSeed.question_number },
          });
          placeholderPt.placeholder =
            questionSeed.evidencePlaceholders.placeholder_pt;

          const placeholderEn = new EvidencePlaceholder();
          placeholderEn.language = enLanguage;
          placeholderEn.question = await getRepository(Question).findOneOrFail({
            where: { questionNumber: questionSeed.question_number },
          });
          placeholderEn.placeholder =
            questionSeed.evidencePlaceholders.placeholder_en;

          await repoPlaceholder.save(placeholderPt);
          await repoPlaceholder.save(placeholderEn);
        } catch (err) {
          if (err instanceof Error) console.log(err.message);
        }
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable("evidences_placeholder");
    await queryRunner.clearTable("topics");
    await queryRunner.clearTable("questions_desc");
  }
}
