import fs from 'fs';

const logPath = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\dddad523-5d61-4ff1-839f-c2eb67fe55ad\\.system_generated\\logs\\transcript.jsonl';
const lines = fs.readFileSync(logPath, 'utf-8').split('\n');

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const data = JSON.parse(line);
    if (data.type === 'VIEW_FILE' && data.status === 'DONE') {
      const filePathMatch = data.content.match(/File Path: `file:\/\/\/(.*?)`/);
      const filePath = filePathMatch ? filePathMatch[1] : 'unknown';
      const linesMatch = data.content.match(/Total Lines: (\d+)/);
      const totalLines = linesMatch ? linesMatch[1] : 'unknown';
      console.log(`Step ${data.step_index}: Viewed ${filePath} (${totalLines} lines)`);
    }
  } catch (e) {}
}
