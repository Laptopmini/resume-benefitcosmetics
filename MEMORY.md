Fixed type error in src/content/resume.ts. EDUCATION array items were plain strings but the type expected `{ line: string }[]`. Wrapped each string in an object literal.
