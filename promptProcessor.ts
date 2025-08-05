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
