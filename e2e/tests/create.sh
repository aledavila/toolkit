#!/bin/bash

# Echo every command being executed
set -x

temp_app_path=`mktemp -d 2>/dev/null || mktemp -d -t 'temp_app_path'`

function cleanup {
  echo 'Cleaning up.'
  cd "$root_path"
  rm -rf "$temp_app_path"
}

cd "$temp_app_path"
npx @carbon/toolkit create test-default --plugins "@carbon/cli-plugin-env,@carbon/cli-plugin-paths"

cleanup
