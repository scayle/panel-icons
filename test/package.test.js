const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const { toComponentName } = require('../scripts/build-vue.js');

const root = path.join(__dirname, '..');
const pkg = require('../package.json');
const iconFiles = fs.readdirSync(path.join(root, 'icons'));

test('package.json keeps the compatibility rules', () => {
    assert.equal(pkg.exports, undefined);
    assert.equal(pkg.main, undefined);
    assert.equal(pkg.type, undefined);
    assert.ok(pkg.peerDependencies.vue);
    assert.equal(pkg.peerDependenciesMeta.vue.optional, true);
    assert.equal(pkg.dependencies?.vue, undefined);
});

test('icons folder holds only svg files', () => {
    for (const file of iconFiles) {
        assert.ok(fs.statSync(path.join(root, 'icons', file)).isFile(), `${file} is not a file`);
        assert.ok(file.endsWith('.svg'), `${file} is not an svg`);
    }

    assert.equal(iconFiles.length, 277);
});

test('packed tarball has icons, root index.js and vue tree', () => {
    const result = spawnSync('npm', ['pack', '--dry-run', '--json'], { cwd: root, encoding: 'utf8' });

    assert.equal(result.status, 0, result.stderr);

    const files = JSON.parse(result.stdout)[0].files.map(file => file.path);
    const expected = [
        'index.js',
        'package.json',
        'vue/package.json',
        'vue/esm/package.json',
        'vue/esm/index.js',
        'vue/esm/index.d.ts',
        'vue/index.cjs',
        'vue/index.d.ts',
        ...iconFiles.map(file => `icons/${file}`),
        ...iconFiles.map(file => `vue/esm/${toComponentName(path.basename(file, '.svg'))}.js`),
    ];

    for (const file of expected) {
        assert.ok(files.includes(file), `${file} missing from tarball`);
    }

    for (const file of files) {
        if (file.startsWith('icons/')) {
            assert.ok(file.endsWith('.svg'), `${file} is not an svg`);
        }

        assert.ok(!/^(raw|scripts|test|docs|\.github)\//.test(file), `${file} should not be packed`);
    }
});
