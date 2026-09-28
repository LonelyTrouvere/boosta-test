import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const questionsData = [
  {
    code: 'Q1',
    text: 'I easily lose track of time when doing something I enjoy',
    options: [
      { text: 'Strongly Disagree', weight: 0 },
      { text: 'Disagree', weight: 1 },
      { text: 'Neutral', weight: 2 },
      { text: 'Agree', weight: 3 },
      { text: 'Strongly Agree', weight: 4 },
    ],
  },
  {
    code: 'Q2',
    text: 'I often misplace things like my phone, keys, or wallet',
    options: [
      { text: 'Strongly Disagree', weight: 0 },
      { text: 'Disagree', weight: 1 },
      { text: 'Neutral', weight: 2 },
      { text: 'Agree', weight: 3 },
      { text: 'Strongly Agree', weight: 4 },
    ],
  },
  {
    code: 'Q3',
    text: 'I frequently start tasks but struggle to finish them',
    options: [
      { text: 'Strongly Disagree', weight: 0 },
      { text: 'Disagree', weight: 1 },
      { text: 'Neutral', weight: 2 },
      { text: 'Agree', weight: 3 },
      { text: 'Strongly Agree', weight: 4 },
    ],
  },
  {
    code: 'Q4',
    text: 'I find it hard to stay focused during conversations or meetings',
    options: [
      { text: 'Strongly Disagree', weight: 0 },
      { text: 'Disagree', weight: 1 },
      { text: 'Neutral', weight: 2 },
      { text: 'Agree', weight: 3 },
      { text: 'Strongly Agree', weight: 4 },
    ],
  },
  {
    code: 'Q5',
    text: 'I often forget about daily tasks like appointments or returning calls',
    options: [
      { text: 'Strongly Disagree', weight: 0 },
      { text: 'Disagree', weight: 1 },
      { text: 'Neutral', weight: 2 },
      { text: 'Agree', weight: 3 },
      { text: 'Strongly Agree', weight: 4 },
    ],
  },
];

async function seed() {
  const client = await pool.connect();

  try {
    console.log('Seeding initial questionnaire data with raw SQL...');
    await client.query('BEGIN');

    for (const q of questionsData) {
      // 1. Upsert question by code
      const questionRes = await client.query(
        `
        INSERT INTO "Question" ("id", "code", "text", "isActive", "createdAt", "updatedAt")
        VALUES (gen_random_uuid(), $1, $2, true, NOW(), NOW())
        ON CONFLICT ("code") DO UPDATE 
        SET "text" = EXCLUDED."text", "isActive" = true, "deletedAt" = NULL, "updatedAt" = NOW()
        RETURNING "id";
        `,
        [q.code, q.text],
      );

      const questionId = questionRes.rows[0].id;

      // 2. Check if options already exist for this question
      const existingOptionsRes = await client.query(
        `SELECT COUNT(*) FROM "AnswerOption" WHERE "questionId" = $1 AND "deletedAt" IS NULL;`,
        [questionId],
      );

      const existingCount = parseInt(existingOptionsRes.rows[0].count, 10);

      // 3. Insert options only if none exist yet
      if (existingCount === 0) {
        for (const opt of q.options) {
          await client.query(
            `
            INSERT INTO "AnswerOption" ("id", "questionId", "text", "weight", "isActive", "createdAt", "updatedAt")
            VALUES (gen_random_uuid(), $1, $2, $3, true, NOW(), NOW());
            `,
            [questionId, opt.text, opt.weight],
          );
        }
      }
    }

    await client.query('COMMIT');
    console.log('Seeding completed successfully.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Failed to seed database:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
