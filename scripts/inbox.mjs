// Read the private question inbox. npm run inbox            -> list, newest first
//                                   npm run inbox -- --delete <id>
// Bug reports instead:              npm run inbox -- --bugs  (and --bugs --delete <id>)
// Needs UPSTASH_REDIS_REST_URL/TOKEN (or KV_REST_API_URL/TOKEN) in a local, git-ignored .env file.
import { Redis } from '@upstash/redis';

const env = process.env;
const redis = new Redis({ url: env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL, token: env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN });
const list = process.argv.includes('--bugs') ? 'bugs' : 'inbox';
const items = await redis.lrange(list, 0, -1); // the client parses stored JSON back into objects
const del = process.argv.indexOf('--delete');

if (del > 0) {
  const id = process.argv[del + 1];
  const item = items.find((x) => x.id === id);
  if (!item) {
    console.error(`No question with id ${id}`);
    process.exit(1);
  }
  await redis.lrem(list, 1, JSON.stringify(item));
  console.log(`Deleted ${id}`);
} else {
  if (!items.length) console.log(list === 'bugs' ? 'No bug reports.' : 'Inbox is empty.');
  for (const x of items) {
    if (list === 'bugs') console.log(`${x.id} | ${x.receivedAt} | ${x.level} | ${x.input} | ${x.activity} | ${x.view} | ${x.part} | ${x.browser} | ${x.screen}
    ${x.report}`);
    else console.log(`${x.id} | ${x.receivedAt} | ${x.level} | ${x.part} | ${x.question}`);
  }
}
