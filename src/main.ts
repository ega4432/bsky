import { BskyAgent } from '@atproto/api';
import { config } from 'dotenv';

config();

const id = process.env.BSKY_ID || '';
const password = process.env.BSKY_PASSWORD || '';

const service = 'https://bsky.social';

const createAgent = async (
  identifier: string,
  password: string,
  service: string
) => {
  const agent = new BskyAgent({ service });
  await agent.login({ identifier, password });
  return agent;
};

const post = async (agent: BskyAgent, text: string) => {
  return await agent.post({ text });
};

const main = async () => {
  if (!id || !password) {
    throw new Error('BSKY_ID or BSKY_PASSWORD is not defined');
  }

  const agent = await createAgent(id, password, service);

  const result = await post(agent, 'テスト');

  console.dir(result);
};

main().catch((e) => console.error(e));
