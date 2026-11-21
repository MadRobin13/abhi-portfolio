import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const entries=[];
async function collect(dir) {
  for (const e of await readdir(dir, {withFileTypes:true})) {
    if (['node_modules','dist','.git'].includes(e.name)) continue;
    const p=path.join(dir,e.name);
    if(e.isDirectory()) await collect(p);
    else if (/\.(?:cjs|mjs|js)$/.test(e.name)) entries.push(p);
  }
}
await collect(root);
let failures=0;
for (const file of entries) {
  const r=spawnSync(process.execPath, ['--check',file], {encoding:'utf8'});
  if(r.status !== 0) {console.error(path.relative(root,file),r.stderr);failures++;}
}
if(failures) process.exit(1);
console.log(`PASS: JavaScript syntax checks (${entries.length} files).`);
console.log('Note: this is a syntax check, not ESLint or a full CSS/accessibility audit.');
