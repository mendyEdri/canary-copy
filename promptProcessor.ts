export function chunkPrompt(prompt: string): string[] {
  return prompt
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter((line) => line.length >= 8);
}

export function mergeByTopic(sentences: string[]): string[] {
  const chunks: string[] = [];
  let buffer = '';

  for (const sentence of sentences) {
    const isNew = /^[A-Z]/.test(sentence.trim()) && buffer.length > 0;
    if (isNew) {
      chunks.push(buffer.trim());
      buffer = sentence;
    } else {
      buffer += (buffer ? ' ' : '') + sentence;
    }
  }

  if (buffer.length > 0) {
    chunks.push(buffer.trim());
  }

  return chunks;
}

export async function embedChunks(chunks: string[]) {
  // @ts-ignore - openai may not be installed in some environments
  const { default: OpenAI } = await import('openai');
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const { data } = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: chunks,
  });

  return data.map((entry: any, i: number) => ({
    chunk: chunks[i],
    embedding: entry.embedding,
  }));
}

export function applyTfidfWeighting(
  entries: { chunk: string; embedding: number[] }[],
): { chunk: string; embedding: number[] }[] {
  if (entries.length === 0) return [];
  const dim = entries[0].embedding.length;
  const df = new Array<number>(dim).fill(0);

  for (const { embedding } of entries) {
    embedding.forEach((val, i) => {
      if (val !== 0) df[i] += 1;
    });
  }

  const idf = df.map((d) => Math.log((entries.length + 1) / (d + 1)) + 1);

  return entries.map(({ chunk, embedding }) => {
    const absSum = embedding.reduce((sum, v) => sum + Math.abs(v), 0);
    const weights = embedding.map((v, i) => {
      const tf = absSum === 0 ? 0 : Math.abs(v) / absSum;
      return tf * idf[i];
    });
    return { chunk, embedding: weights };
  });
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const normB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
  return normA && normB ? dot / (normA * normB) : 0;
}

export function scoreByGoals(
  entries: { chunk: string; embedding: number[] }[],
  goals: Record<string, number[]>,
): { chunk: string; scores: Record<string, number> }[] {
  return entries.map(({ chunk, embedding }) => {
    const scores: Record<string, number> = {};
    for (const [name, goalVec] of Object.entries(goals)) {
      scores[name] = cosineSimilarity(embedding, goalVec);
    }
    return { chunk, scores };
  });
}
