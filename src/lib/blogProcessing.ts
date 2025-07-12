import { translations } from './translations';

export interface BlogProcessingResult {
  originalText: string;
  summary: string;
  translatedSummary: string;
  error?: string;
}

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};


const scrapeBlogContent = async (url: string): Promise<string> => {
  if (!isValidUrl(url)) {
    throw new Error('Invalid URL format');
  }

  return `This is a mock blog content from ${url}. The article discusses important trends in technology. ` +
         `The main points cover the evolution of web development frameworks and the importance of ` +
         `learning modern JavaScript. The conclusion emphasizes continuous learning for developers.`;
};

const summarizeText = (text: string): string => {
  const sentences = text.split(/[.!?]/)
    .filter(s => s.trim().length > 0)
    .filter(s => s.split(' ').length > 5)
    .filter(s => !s.toLowerCase().includes('copyright') && 
                !s.toLowerCase().includes('privacy policy'));
  
  return sentences.slice(0, 3).join('. ') + '.';
};

const translateToUrdu = (text: string): string => {
  return text.split(' ')
    .map(word => {
      const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
      return translations[cleanWord] || word;
    })
    .join(' ');
};

 const processBlog = async (url: string): Promise<BlogProcessingResult> => {
  try {
    const originalText = await scrapeBlogContent(url);
    const summary = summarizeText(originalText);
    const translatedSummary = translateToUrdu(summary);

    return {
      originalText,
      summary,
      translatedSummary
    };
  } catch (error) {
    return {
      originalText: '',
      summary: '',
      translatedSummary: '',
      error: error instanceof Error ? error.message : 'Failed to process blog'
    };
  }
};

export default processBlog;