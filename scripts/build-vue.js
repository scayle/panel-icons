const fs = require('fs');
const path = require('path');
const { compile } = require('@vue/compiler-dom');

const FILE_NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const VUE_IMPORT = /^import \{ ([^}]+) \} from "vue"$/m;
const RENDER_EXPORT = 'export function render(';

function toComponentName(fileBaseName) {
    return (
        'Icon' +
        fileBaseName
            .split('-')
            .map(x => x.charAt(0).toUpperCase() + x.substring(1))
            .join('')
    );
}

function compileIcon(file, svg) {
    if (!svg.startsWith('<svg ')) {
        throw new Error(`${file}: expected the file to start with "<svg "`);
    }

    const source = svg.replace(/^<svg /, '<svg aria-hidden="true" ');
    const { code } = compile(source, {
        mode: 'module',
        // Hoisting turns larger static trees into createStaticVNode, which Vue inserts with innerHTML.
        hoistStatic: false,
        comments: false,
        onError: error => {
            throw new Error(`${file}: ${error.message}`);
        },
    });

    if (!VUE_IMPORT.test(code) || !code.includes(RENDER_EXPORT)) {
        throw new Error(`${file}: unexpected compiler output`);
    }

    return code.replace(RENDER_EXPORT, 'function render(');
}

function toCommonJs(code) {
    return code.replace(VUE_IMPORT, (match, specifiers) => {
        return `const { ${specifiers.replace(/ as /g, ': ')} } = require("vue")`;
    });
}

function writeJson(file, value) {
    fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}

function buildVue({ iconsDir, outDir }) {
    const icons = fs
        .readdirSync(iconsDir)
        .filter(file => file.endsWith('.svg'))
        .sort()
        .map(file => {
            const name = path.basename(file, '.svg');

            if (!FILE_NAME.test(name)) {
                throw new Error(`${file}: file name must be lowercase kebab-case`);
            }

            return {
                name,
                componentName: toComponentName(name),
                code: compileIcon(file, fs.readFileSync(path.join(iconsDir, file), 'utf8')),
            };
        });

    const seen = new Map();

    for (const icon of icons) {
        const key = icon.componentName.toLowerCase();

        if (seen.has(key)) {
            throw new Error(`${icon.name}.svg: component name ${icon.componentName} collides with ${seen.get(key)}.svg`);
        }

        seen.set(key, icon.name);
    }

    fs.rmSync(outDir, { recursive: true, force: true });
    fs.mkdirSync(path.join(outDir, 'esm'), { recursive: true });

    writeJson(path.join(outDir, 'package.json'), {
        main: './index.cjs',
        module: './esm/index.js',
        types: './index.d.ts',
        sideEffects: false,
    });
    writeJson(path.join(outDir, 'esm', 'package.json'), { type: 'module' });

    const panelIconsEntries = icons.map(icon => `    ${JSON.stringify(icon.name)}: ${icon.componentName},`).join('\n');
    const esmIndex = [];
    const cjsIndex = ["'use strict';", ''];

    for (const icon of icons) {
        fs.writeFileSync(
            path.join(outDir, 'esm', `${icon.componentName}.js`),
            `${icon.code}\nexport default { name: '${icon.componentName}', render }\n`,
        );

        esmIndex.push(`export { default as ${icon.componentName} } from './${icon.componentName}.js';`);
        cjsIndex.push(
            `const ${icon.componentName} = (() => {\n${toCommonJs(icon.code)}\nreturn { name: '${icon.componentName}', render };\n})();\n`,
        );
    }

    esmIndex.push('');
    esmIndex.push(...icons.map(icon => `import ${icon.componentName} from './${icon.componentName}.js';`));
    esmIndex.push('', `export const panelIcons = {\n${panelIconsEntries}\n};`, '');

    cjsIndex.push(
        'module.exports = {',
        ...icons.map(icon => `    ${icon.componentName},`),
        `    panelIcons: {\n${panelIconsEntries.replace(/^/gm, '    ')}\n    },`,
        '};',
        '',
    );

    fs.writeFileSync(path.join(outDir, 'esm', 'index.js'), esmIndex.join('\n'));
    fs.writeFileSync(path.join(outDir, 'index.cjs'), cjsIndex.join('\n'));
    const declarations = [
        "import type { DefineComponent, SVGAttributes } from 'vue';",
        '',
        'export type PanelIconComponent = DefineComponent<SVGAttributes>;',
        '',
        ...icons.map(icon => `export declare const ${icon.componentName}: PanelIconComponent;`),
        '',
        'export type PanelIconName =',
        ...icons.map(icon => `    | ${JSON.stringify(icon.name)}`),
        '    ;',
        '',
        'export declare const panelIcons: Record<PanelIconName, PanelIconComponent>;',
        '',
    ];

    fs.writeFileSync(path.join(outDir, 'index.d.ts'), declarations.join('\n'));
    fs.writeFileSync(path.join(outDir, 'esm', 'index.d.ts'), "export * from '../index.js';\n");

    return icons.length;
}

if (require.main === module) {
    const root = path.join(__dirname, '..');
    const count = buildVue({ iconsDir: path.join(root, 'icons'), outDir: path.join(root, 'vue') });

    // stderr, so `npm pack --json` keeps clean JSON on stdout
    console.error(`Built ${count} Vue icon components`);
}

module.exports = { toComponentName, buildVue };
