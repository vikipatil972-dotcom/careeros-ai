import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else if (name.endsWith('.ts') || name.endsWith('.tsx')) {
      files.push(name);
    }
  }
  return files;
}

const srcDir = path.join(__dirname, 'src');
const files = getFiles(srcDir);
console.log(`Auditing ${files.length} TypeScript / React files in ${srcDir}...`);

let errorCount = 0;

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(__dirname, filePath);
  
  // Check for unresolved placeholders or TODO comments
  if (content.includes('TODO')) {
    console.error(`❌ TODO found in ${relPath}`);
    errorCount++;
  }

  // Check matching braces & brackets
  const openCurly = (content.match(/\{/g) || []).length;
  const closeCurly = (content.match(/\}/g) || []).length;
  if (openCurly !== closeCurly) {
    console.error(`❌ Mismatched curly braces in ${relPath}: { count=${openCurly}, } count=${closeCurly}`);
    errorCount++;
  }

  const openParen = (content.match(/\(/g) || []).length;
  const closeParen = (content.match(/\)/g) || []).length;
  if (openParen !== closeParen) {
    console.error(`❌ Mismatched parentheses in ${relPath}: ( count=${openParen}, ) count=${closeParen}`);
    errorCount++;
  }

  console.log(`✅ Passed structural validation: ${relPath}`);
}

if (errorCount === 0) {
  console.log(`\n🎉 SUCCESS: All ${files.length} frontend files passed structural audit with 0 errors and 0 TODOs!`);
} else {
  console.error(`\n❌ FAILED with ${errorCount} errors.`);
  process.exit(1);
}
