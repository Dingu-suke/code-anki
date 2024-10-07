import axios from 'axios';
import { LANGUAGE_VERSIONS } from './constants';

const API = axios.create({
  baseURL: 'https://emkc.org/api/v2/piston',
});

export const executeCode = async (language, sourceCode) => {
  try {
    if (language === 'typescript') {
      console.log('typescript')
      return await executeTypeScriptCode(sourceCode);
    } else {
      return await executeOtherLanguageCode(language, sourceCode);
    }
  } catch (error) {
    console.error(`Error executing ${language} code:`, error);
    throw error;
  }
};

const executeTypeScriptCode = async (sourceCode) => {
  // Step 1: Compile TypeScript to JavaScript
  const compileResponse = await API.post('/execute', {
    language: 'typescript',
    version: LANGUAGE_VERSIONS.typescript,
    files: [{ content: sourceCode }],
    compile_timeout: 10000,
    run_timeout: 3000,
    compile_memory_limit: -1,
    run_memory_limit: -1,
  });

  if (compileResponse.data.compile.code !== 0) {
    throw new Error(`Compilation failed: ${compileResponse.data.compile.output}`);
  }

  const compiledJS = compileResponse.data.run.output;

  // Step 2: Execute the compiled JavaScript
  return await executeOtherLanguageCode('javascript', compiledJS);
};

const executeOtherLanguageCode = async (language, sourceCode) => {
  const response = await API.post('/execute', {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [{ content: sourceCode }],
    compile_timeout: 10000,
    run_timeout: 3000,
    compile_memory_limit: -1,
    run_memory_limit: -1,
  });

  return response.data;
};