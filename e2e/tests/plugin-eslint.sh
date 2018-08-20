#!/bin/bash

# Echo every command being executed
set -x

TOOLKIT_CLI_ENV=test
temp_app_path=`mktemp -d 2>/dev/null || mktemp -d -t 'temp_app_path'`

function cleanup {
  echo 'Cleaning up.'
  cd "$root_path"
  rm -rf "$temp_app_path"
}

cd "$temp_app_path"
yarn init -y
npx @carbon/toolkit init --skip
npx @carbon/toolkit add @carbon/cli-plugin-eslint
yarn add babel-eslint@next eslint-plugin-import

touch index.js

yarn lint

cleanup
