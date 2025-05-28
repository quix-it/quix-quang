/**
 * Script to copy specific README.md files from the quang project to the playground assets folder
 * Generic README.md files (e.g., index files) will be ignored.
 */

const fs = require('fs')
const path = require('path')

// Define source and destination paths
const QUANG_DIR = path.join(__dirname, '../projects/quang')
const DEST_DIR = path.join(__dirname, '../projects/playground/src/assets/docs')

// Ensure the destination directory exists
if (!fs.existsSync(DEST_DIR)) {
  console.log(`Creating directory: ${DEST_DIR}`)
  fs.mkdirSync(DEST_DIR, { recursive: true })
}

/**
 * Recursively find specific README.md files
 * @param {string} dir - Directory to search in
 * @returns {Array} - Array of objects with README path and parent directory name
 */
function findSpecificReadmeFiles(dir) {
  let results = []

  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // Recursively search subdirectories
      results = results.concat(findSpecificReadmeFiles(filePath))
    } else if (
      file.toLowerCase() === 'readme.md' &&
      !filePath.includes('components/README.md') &&
      !filePath.includes('overlay/README.md')
    ) {
      // Found a specific README.md file, include its path and parent directory name
      const parentDir = path.basename(path.dirname(filePath))
      results.push({
        path: filePath,
        parentDir: parentDir,
      })
    }
  }

  return results
}

/**
 * Call GitHub Copilot (placeholder) to translate markdown content
 * @param {string} text - The markdown text to translate
 * @param {string} targetLang - The target language code (e.g., 'en', 'it')
 * @returns {Promise<string>} - The translated text
 */
async function callTranslationAPI(text, targetLang) {
  // Placeholder: In a real scenario, you would call GitHub Copilot's API or service here.
  // For now, just return the original text and log the intended translation.
  console.log(`[Copilot Translation] Would translate to '${targetLang}':\n${text.substring(0, 80)}...`)
  return text
}

/**
 * Translate a markdown file to English and Italian using an API
 * @param {string} filePath - Path to the source markdown file
 * @param {string} destBaseName - Base name for the destination files (without extension)
 */
async function translateReadmeToLanguages(filePath, destBaseName) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const itContent = await callTranslationAPI(content, 'it')
  const destDir = path.dirname(filePath)
  fs.writeFileSync(path.join(destDir, `${destBaseName}.it.md`), itContent, 'utf-8')
}

/**
 * Copy specific README files to destination with new names
 */
function copySpecificReadmeFiles() {
  console.log('Starting to copy specific README files...')

  const readmeFiles = findSpecificReadmeFiles(QUANG_DIR)
  console.log(`Found ${readmeFiles.length} specific README.md files.`)

  // Copy each README file with a new name based on its parent directory
  readmeFiles.forEach((file) => {
    const destFileName = `${file.parentDir}.md`
    const destPath = path.join(DEST_DIR, destFileName)

    try {
      fs.copyFileSync(file.path, destPath)
      console.log(`Copied: ${file.path} -> ${destPath}`)
      // Translate the copied README to .en.md and .it.md
      translateReadmeToLanguages(destPath, file.parentDir)
    } catch (err) {
      console.error(`Error copying ${file.path}: ${err.message}`)
    }
  })

  // Explicitly copy the root README.md from /quang/
  const rootReadmePath = path.join(QUANG_DIR, 'README.md')
  const destRootReadmePath = path.join(DEST_DIR, 'root-readme.md')

  try {
    
    fs.copyFileSync(rootReadmePath, destRootReadmePath)
    let content = fs.readFileSync(destRootReadmePath, 'utf-8')
    content = content
      .replace(/### \[Auth\]\(.*?\)/g, '### [Auth](auth/auth)')
      .replace(/### \[Components\]\(.*?\)/g, '### [Components](components)')
      .replace(/### \[Data Handling\]\(.*?\)/g, '### [Data Handling](core/data-handling)')
      .replace(/### \[Device\]\(.*?\)/g, '### [Device](core/device)')
      .replace(/### \[Forms\]\(.*?\)/g, '### [Forms](core/forms)')
      .replace(/### \[Loader\]\(.*?\)/g, '### [Loader](components/loader)')
      .replace(/### \[Network\]\(.*?\)/g, '### [Network](network)')
      .replace(/### \[Overlay\]\(.*?\)/g, '### [Overlay](overlay)')
      .replace(/### \[Translation\]\(.*?\)/g, '### [Translation](translation)')
    fs.writeFileSync(destRootReadmePath, content, 'utf-8')
    console.log(`Updated URLs in: ${destPath}`)
    console.log(`Copied root README.md: ${rootReadmePath} -> ${destRootReadmePath}`)
  } catch (err) {
    console.error(`Error copying root README.md: ${err.message}`)
  }

  // Update URLs in the root README.md copy to use routerLink paths

  console.log('Finished copying specific README files.')
}

// Execute the copy function
copySpecificReadmeFiles()
