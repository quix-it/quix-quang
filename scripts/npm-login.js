const { execSync } = require('child_process');

// Ensure an authenticated npm session before publishing.
// `npm publish` exits immediately with ENEEDAUTH when logged out instead of
// prompting, so we trigger an interactive `npm login` ourselves when needed.
try {
  const user = execSync('npm whoami', { stdio: ['ignore', 'pipe', 'ignore'] })
    .toString()
    .trim();
  console.log(`Already logged in to npm as "${user}".`);
} catch {
  console.log('Not logged in to npm — starting login.');
  execSync('npm login', { stdio: 'inherit' });
}
