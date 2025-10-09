#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');

function hello(nome = "Mundo") {
  console.log(`Olá, ${nome}! 👋`);
}

async function selectBranding() {
  try {
    const brandsData = fs.readJsonSync(path.join(__dirname, 'brands.json'));
    
    if (!brandsData.brands || brandsData.brands.length === 0) {
      console.log('Nenhum branding configurado no brands.json');
      return null;
    }

    const sortedBrands = [...brandsData.brands].sort((a, b) => 
      a.name.localeCompare(b.name)
    );

    const questions = [
      {
        type: 'list',
        name: 'selectedBranding',
        message: 'Qual branding você deseja copiar?',
        pageSize: 10, 
        choices: sortedBrands.map(brand => ({
          name: `${brand.name} - ${brand.description}`,
          value: brand.name
        }))
      }
    ];

    const answers = await inquirer.prompt(questions);
    return answers.selectedBranding;
  } catch (err) {
    console.error('Erro ao ler brands.json:', err);
    return null;
  }
}

async function copyFiles() {
  try {
    const branding = await selectBranding();
    if (!branding) return;

    const sourceDir = path.join(__dirname, 'templates', branding.toLowerCase());
    
    if (!fs.existsSync(sourceDir)) {
      console.log(`❌ Branding ${branding} não encontrado. Verifique se a pasta templates/${branding.toLowerCase()} existe.`);
      console.log('Brandings disponíveis:');
      const existingBrands = fs.readdirSync(path.join(__dirname, 'templates'));
      existingBrands.forEach(b => console.log(`- ${b}`));
      return;
    }
    
    const items = fs.readdirSync(sourceDir);
    items.forEach(item => {
      const sourcePath = path.join(sourceDir, item);
      const destPath = path.join(process.cwd(), item);
      fs.copySync(sourcePath, destPath, { overwrite: true });
    });
    
    console.log(`✅ Arquivos do branding ${branding} copiados com sucesso!`);
  } catch (err) {
    console.error('❌ Erro ao copiar arquivos:', err.message);
  }
}

module.exports = { 
  hello,
  copyFiles
};

if (require.main === module) {
  copyFiles();
}