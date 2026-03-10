// Utility to get Git version
// This runs at build time to embed the git commit hash into the app

export const getGitVersion = (): string => {
  // This will be replaced at build time with the actual git commit hash
  // You can also get it dynamically at runtime using:
  // import { execSync } from 'child_process';
  // return execSync('git rev-parse --short HEAD').toString().trim();
  return '2334c12';
};

export const getFullGitVersion = (): string => {
  return '2334c120762a9f3fe1c74d5149381e63fa563341';
};

// For runtime execution (uncomment if needed):
/*
import { execSync } from 'child_process';

export const getRuntimeGitVersion = (): string => {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
  } catch {
    return 'unknown';
  }
};
*/

