// Read the private question inbox. npm run inbox            -> list, newest first
//                                   npm run inbox -- --delete <id>
// Needs UPSTASH_REDIS_REST_URL/TOKEN (or KV_REST_API_URL/TOKEN) in a local, git-ignored .env file.
import { Redis } from '@upstash/redis';

const env = process.env;
const redis = new Redis({ url: env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL, token: env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN });
const items = await redis.lrange('inbox', 0, -1); // the client parses stored JSON back into objects
const del = process.argv.indexOf('--delete');

if (del > 0) {
  const id = process.argv[del + 1];
  const item = items.find((x) => x.id === id);
  if (!item) {
    console.error(`No question with id ${id}`);
    process.exit(1);
  }
  await redis.lrem('inbox', 1, JSON.stringify(item));
  console.log(`Deleted ${id}`);
} else {
  if (!items.length) console.log('Inbox is empty.');
  for (const x of items) console.log(`${x.id} | ${x.receivedAt} | ${x.level} | ${x.part} | ${x.question}`);
}
