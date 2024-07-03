import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  // Truncate all tables in the database
  await prisma.$executeRaw`TRUNCATE TABLE "User", "Post" RESTART IDENTITY`;

  // Seed the database with 10 users
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'alice@example.com',
        name: 'Alice',
        surname: 'Johnson',
        patronymic: 'Marie',
        username: 'alice_johnson',
      },
      {
        email: 'bob@example.com',
        name: 'Bob',
        surname: 'Williams',
        patronymic: 'Michael',
        username: 'bob_williams',
      },
      {
        email: 'charlie@example.com',
        name: 'Charlie',
        surname: 'Davis',
        patronymic: 'Thomas',
        username: 'charlie_davis',
      },
      {
        email: 'david@example.com',
        name: 'David',
        surname: 'Anderson',
        patronymic: 'Robert',
        username: 'david_anderson',
      },
      {
        email: 'eve@example.com',
        name: 'Eve',
        surname: 'Wilson',
        patronymic: 'Elizabeth',
        username: 'eve_wilson',
      },
      {
        email: 'frank@example.com',
        name: 'Frank',
        surname: 'Taylor',
        patronymic: 'Joseph',
        username: 'frank_taylor',
      },
      {
        email: 'grace@example.com',
        name: 'Grace',
        surname: 'Lee',
        patronymic: 'Anne',
        username: 'grace_lee',
      },
      {
        email: 'henry@example.com',
        name: 'Henry',
        surname: 'Clark',
        patronymic: 'Daniel',
        username: 'henry_clark',
      },
      {
        email: 'isabella@example.com',
        name: 'Isabella',
        surname: 'Garcia',
        patronymic: 'Maria',
        username: 'isabella_garcia',
      },
      {
        email: 'john@example.com',
        name: 'John',
        surname: 'Martinez',
        patronymic: 'Jose',
        username: 'john_martinez',
      },
    ],
  });

  console.log(`Created ${users.count} users`);

  // Seed the database with 50 posts
  const posts = await prisma.post.createMany({
    data: [
      ...Array.from({ length: 50 }).map((_, i) => ({
        title: `Post ${i + 1}`,
        description: `This is post number ${i + 1}.`,
        userId: users.count > 0 ? users.count - (i % users.count) : 1,
      })),
    ],
  });

  console.log(`Created ${posts.count} posts`);

  await prisma.$disconnect();
}

main()
  .catch((e): void => {
    console.error(e);
    process.exit(1);
  })
  .finally(async (): Promise<void> => {
    await prisma.$disconnect();
  });
