import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const componentName = process.argv[2];
const componentsDir = path.join(__dirname, "./src/components");
const componentDir = path.join(componentsDir, `${componentName}`);

// 确保 components 文件夹存在
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}

const jsxTemplate = `
import './${componentName}.css';
import { useContext, useState, useEffect } from "react";

const ${componentName} = () => {
  return (
    <div className="${componentName.toLowerCase()}">${componentName}</div>
  );
};

export default ${componentName};
`;

const cssTemplate = `.${componentName.toLowerCase()} {

}
`;

// 创建组件目录
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

// 创建 JSX 文件
fs.writeFileSync(path.join(componentDir, `${componentName}.jsx`), jsxTemplate);

// 创建 CSS 文件
fs.writeFileSync(path.join(componentDir, `${componentName}.css`), cssTemplate);

console.log(`Component ${componentName} created successfully.`);
