#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');


const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);

async function createTemplateApp() {
  const templateDir = path.join(__dirname, 'template');
  const currentDir = process.cwd();

  try {
    const newAppDir = path.join(currentDir, 'new-jole-app');
    await mkdir(newAppDir);

    await copyFiles(templateDir, newAppDir);

    console.log('Template app created successfully in new-jole-app directory!');
    console.log('cd new-jole-app');
    console.log('npm install');
    console.log('npx tailwindcss -i ./src/input.css -o ./dist/output.css');
    console.log('npm run dev')
  } catch (err) {
    console.error('Error creating template app:', err);
  }
}

async function copyFiles(source, destination) {
  const files = await fs.promises.readdir(source);

  for (const file of files) {
    const filePath = path.join(source, file);
    const destPath = path.join(destination, file);
    const stat = await fs.promises.lstat(filePath);

    if (stat.isDirectory()) {
      await fs.promises.mkdir(destPath);
      await copyFiles(filePath, destPath);
    } else {
      await copyFile(filePath, destPath);
    }
  }
}

createTemplateApp();