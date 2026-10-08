const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');

test('generated declarations type-check', () => {
    const result = spawnSync(
        path.join(root, 'node_modules', '.bin', 'tsc'),
        [
            '--noEmit',
            '--strict',
            '--moduleResolution', 'bundler',
            '--module', 'esnext',
            '--target', 'es2020',
            '--skipLibCheck', 'false',
            'test/fixtures/types-fixture.ts',
        ],
        { cwd: root, encoding: 'utf8' },
    );

    assert.equal(result.status, 0, result.stdout + result.stderr);
});
