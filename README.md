# Project Config Boilerplate DX

[![npm version](https://img.shields.io/npm/v/project-config-boilerplate-dx)](https://www.npmjs.com/package/project-config-boilerplate-dx)

Um pacote Node.js para gerenciar e copiar configurações de branding entre projetos.

## 🚀 Instalação

```bash
npm install -g project-config-boilerplate-dx
# ou
npx project-config-boilerplate-dx
```

## 📦 Como Usar

1. Execute o comando:
```bash
project-config
```

2. Selecione o branding desejado
3. Os arquivos serão copiados para o diretório atual

## 🛠 Configuração

### Estrutura de Pastas
```
project-config-boilerplate-dx/
├── templates/
│   ├── branding1/
│   │   ├── assets/
│   │   ├── configs/
│   │   └── ...
│   └── branding2/
│       └── ...
├── brands.json
└── ...
```

### brands.json
Defina seus brandings no arquivo `brands.json`:
```json
{
  "brands": [
    {
      "name": "NossaSeguros",
      "description": "Branding e identidade da Nossa Seguros"
    },
    {
      "name": "KeepComply",
      "description": "Branding e identidade da KeepComply"
    }
  ]
}
```

## 📄 Licença
MIT ©
