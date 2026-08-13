#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files that need node type references
const filesToPatch = [
  'src/types.server.d.ts'
];

const typeReference = '/// <reference types="node" />\n';

filesToPatch.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Only add if not already present
    if (!content.startsWith('/// <reference types="node" />')) {
      content = typeReference + content;
      fs.writeFileSync(filePath, content);
      console.log(`✓ Added type reference to ${file}`);
    }
  }
});
