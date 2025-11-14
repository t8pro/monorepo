#!/bin/bash
set -e

# Enable corepack
corepack enable

# Prepare and activate Yarn 4.9.4
corepack prepare yarn@4.9.4 --activate

# Clear command cache to ensure we use the new yarn
hash -r 2>/dev/null || true

# Verify which yarn we're using and check version
YARN_PATH=$(which yarn)
YARN_VERSION=$(yarn --version)

echo "Using yarn: $YARN_PATH"
echo "Yarn version: $YARN_VERSION"

# Check if we're using Yarn 4.x
if [[ ! "$YARN_VERSION" =~ ^4\. ]]; then
  echo "ERROR: Expected Yarn 4.x but got version $YARN_VERSION"
  echo "Attempting to use corepack yarn directly..."
  corepack yarn install
  exit 0
fi

# Install dependencies
yarn install

