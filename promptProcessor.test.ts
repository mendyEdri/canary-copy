import assert from 'assert';
import {
  chunkPrompt,
  applyTfidfWeighting,
  scoreByGoals,
} from './promptProcessor';

const prompt = `Always use DateFormatter for ISO strings. Never format dates manually.\n\nUse the FileManager module for file imports. Validate file extensions. Avoid using raw paths.\n\nDo not make network requests in render functions. Use fetch inside effects.`;
const chunks = chunkPrompt(prompt);
assert.deepStrictEqual(chunks, [
  'Always use DateFormatter for ISO strings. Never format dates manually.',
  'Use the FileManager module for file imports. Validate file extensions. Avoid using raw paths.',
  'Do not make network requests in render functions. Use fetch inside effects.',
]);

console.log('chunkPrompt test passed');

const tfidfEntries = [
  { chunk: 'a', embedding: [1, 0] },
  { chunk: 'b', embedding: [1, 1] },
];
const weighted = applyTfidfWeighting(tfidfEntries);
const idf1 = Math.log(3 / 2) + 1;
assert.ok(Math.abs(weighted[0].embedding[0] - 1) < 1e-6);
assert.ok(Math.abs(weighted[1].embedding[0] - 0.5) < 1e-6);
assert.ok(Math.abs(weighted[1].embedding[1] - 0.5 * idf1) < 1e-6);

const goalEntries = [
  { chunk: 'safe chunk', embedding: [1, 0] },
  { chunk: 'fast chunk', embedding: [0, 1] },
];
const scores = scoreByGoals(goalEntries, {
  safe: [1, 0],
  fast: [0, 1],
});
assert.strictEqual(scores[0].scores.safe, 1);
assert.strictEqual(scores[0].scores.fast, 0);
assert.strictEqual(scores[1].scores.safe, 0);
assert.strictEqual(scores[1].scores.fast, 1);

console.log('advanced scoring tests passed');
