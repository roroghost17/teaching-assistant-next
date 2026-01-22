import { readFile } from 'node:fs/promises';
import { extractPDFText, getDocumentProxy } from 'unpdf';

export const readPdfContent = async (filePath: string): Promise<string> => {
  try {
    const buffer = await readFile(filePath);
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text } = await extractPDFText(pdf, { mergePages: true });
    const textString = typeof text === 'string' ? text : text.join(' ');
    const cleanedText = textString.replace(/\s+/g, ' ').trim();
    return cleanedText;
  } catch (error) {
    console.error('Error reading PDF file:', error);
    throw new Error('Failed to read PDF content');
  }
};
