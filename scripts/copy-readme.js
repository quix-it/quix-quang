/**
 * Script to copy README.md files from the quang project to the playground assets folder
 * Each README will be renamed according to its parent directory
 */

const fs = require('fs');
const path = require('path');

// Define source and destination paths
const QUANG_DIR = path.join(__dirname, '../projects/quang');
const DEST_DIR = path.join(__dirname, '../projects/playground/src/assets/docs');

// Ensure the destination directory exists
if (!fs.existsSync(DEST_DIR)) {
  console.log(`Creating directory: ${DEST_DIR}`);
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

/**
 * Recursively find all README.md files
 * @param {string} dir - Directory to search in
 * @returns {Array} - Array of objects with README path and parent directory name
 */
function findReadmeFiles(dir) {
  let results = [];

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively search subdirectories
      results = results.concat(findReadmeFiles(filePath));
    } else if (file.toLowerCase() === 'readme.md') {
      // Found a README.md file, include its path and parent directory name
      const parentDir = path.basename(dir);
      results.push({
        path: filePath,
        parentDir: parentDir
      });
    }
  }

  return results;
}

/**
 * Copy README files to destination with new names
 */
function copyReadmeFiles() {
  console.log('Starting to copy README files...');

  const readmeFiles = findReadmeFiles(QUANG_DIR);
  console.log(`Found ${readmeFiles.length} README.md files.`);

  // Copy each README file with a new name based on its parent directory
  readmeFiles.forEach(file => {
    const destFileName = `${file.parentDir}.md`;
    const destPath = path.join(DEST_DIR, destFileName);

    try {
      fs.copyFileSync(file.path, destPath);
      console.log(`Copied: ${file.path} -> ${destPath}`);
    } catch (err) {
      console.error(`Error copying ${file.path}: ${err.message}`);
    }
  });

  console.log('Finished copying README files.');
}

// Execute the copy function
copyReadmeFiles();
