import assert from 'assert';
import { chunkPrompt } from './promptProcessor';

const prompt = `Always use DateFormatter for ISO strings. Never format dates manually.\n\nUse the FileManager module for file imports. Validate file extensions. Avoid using raw paths.\n\nDo not make network requests in render functions. Use fetch inside effects.`;
const chunks = chunkPrompt(prompt);
assert.deepStrictEqual(chunks, [
  'Always use DateFormatter for ISO strings. Never format dates manually.',
  'Use the FileManager module for file imports. Validate file extensions. Avoid using raw paths.',
  'Do not make network requests in render functions. Use fetch inside effects.',
]);

console.log('chunkPrompt test passed');
