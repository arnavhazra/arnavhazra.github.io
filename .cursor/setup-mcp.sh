#!/usr/bin/env bash
# Install and configure the lean MCP stack for this project.
# Free-tier only — no paid Figma, Sanity, Supabase, or asset APIs required.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "→ Installing MCP server packages locally..."
npm install --save-dev @upstash/context7-mcp @playwright/mcp @modelcontextprotocol/server-github

echo "→ Initializing shadcn/ui (required for shadcn MCP)..."
if [[ ! -f components.json ]]; then
  npx shadcn@latest init -d --base radix
fi

echo "→ Configuring shadcn MCP..."
npx shadcn@latest mcp init --client cursor

echo "→ Setting up Context7 (free OAuth + API key)..."
if [[ -z "${CONTEXT7_API_KEY:-}" ]]; then
  npx ctx7 setup --cursor --project --mcp --stdio -y || true
fi

ENV_FILE="$ROOT/.env.local"
touch "$ENV_FILE"

# Context7 key from ctx7 setup (if present in mcp.json after setup)
if grep -q 'ctx7sk-' "$ROOT/.cursor/mcp.json" 2>/dev/null; then
  KEY=$(grep -o 'ctx7sk-[^"]*' "$ROOT/.cursor/mcp.json" | head -1)
  if [[ -n "$KEY" ]]; then
    grep -q '^CONTEXT7_API_KEY=' "$ENV_FILE" || echo "CONTEXT7_API_KEY=$KEY" >> "$ENV_FILE"
    echo "  Saved CONTEXT7_API_KEY to .env.local"
  fi
fi

# GitHub token from gh CLI (free — uses existing login)
if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  GH_TOKEN=$(gh auth token)
  if grep -q '^GITHUB_PERSONAL_ACCESS_TOKEN=' "$ENV_FILE"; then
    sed -i "s|^GITHUB_PERSONAL_ACCESS_TOKEN=.*|GITHUB_PERSONAL_ACCESS_TOKEN=$GH_TOKEN|" "$ENV_FILE"
  else
    echo "GITHUB_PERSONAL_ACCESS_TOKEN=$GH_TOKEN" >> "$ENV_FILE"
  fi
  echo "  Saved GITHUB_PERSONAL_ACCESS_TOKEN from gh CLI to .env.local"
fi

# Normalize mcp.json to envFile pattern (no secrets in git)
cp "$ROOT/.cursor/mcp.json.example" "$ROOT/.cursor/mcp.json"
# Use envFile variant for secrets
cat > "$ROOT/.cursor/mcp.json" <<'EOF'
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "envFile": "${workspaceFolder}/.env.local"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "envFile": "${workspaceFolder}/.env.local"
    },
    "vercel": {
      "url": "https://mcp.vercel.com"
    },
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
EOF

echo ""
echo "✓ MCP stack ready. Next steps in Cursor desktop:"
echo "  1. Settings → Tools & MCP → authenticate Vercel (OAuth, free Hobby tier)"
echo "  2. Reload MCP servers — expect green dots for context7, playwright, github, vercel, shadcn"
echo "  3. See .cursor/MCP-SETUP.md for paid-tool free replacements"
echo ""
