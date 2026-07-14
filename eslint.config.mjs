import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

/**
 * ESLint policy (see docs/CONVENTIONS.md for the human-readable version):
 *
 * - next/core-web-vitals: Next.js correctness + performance rules
 *   (missing next/image, sync scripts, etc. become errors).
 * - next/typescript: @typescript-eslint recommended set.
 * - Local tightening below encodes the import and hygiene conventions.
 *
 * Architecture boundary rules (e.g. "sections must not import sections")
 * are added in Phase 3 alongside the directories they govern — rules that
 * reference empty folders are noise.
 */
const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      /* --- Imports --------------------------------------------------- */

      // Type-only imports must be erasable: `import type { X }`.
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      // Deep relative traversal signals a misplaced module — use `@/`.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../../*'],
              message: 'Use the "@/" alias instead of deep relative imports.',
            },
          ],
        },
      ],

      /* --- Hygiene --------------------------------------------------- */

      // Loose equality has no place in production code.
      eqeqeq: ['error', 'always'],

      // Stray console.log must not ship; error/warn are legitimate.
      'no-console': ['warn', { allow: ['error', 'warn'] }],

      // Unused vars are errors, but an intentional `_` prefix opts out
      // (e.g. destructuring to omit a property).
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
];

export default eslintConfig;