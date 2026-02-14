#!/bin/bash
#
# Deploy impostor al servidor de producció
# Ús: ./deploy.sh [missatge de commit opcional]
#
# Impostor és un joc estàtic (sense Express/PM2).
# Es desplega via rsync + symlink d'estil.
#

set -euo pipefail

# Configuració
VPS_HOST="deploy@46.225.87.1"
VPS_APP_DIR="/home/deploy/apps/impostor"
BRANCH="main"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

info()  { echo -e "${GREEN}[✓]${NC} $1"; }
warn()  { echo -e "${YELLOW}[!]${NC} $1"; }
error() { echo -e "${RED}[✗]${NC} $1"; exit 1; }

# 1. Comprovar que estem al directori correcte
cd "$(dirname "$0")"
[ -f index.html ] || error "No s'ha trobat index.html. Executa des del directori impostor."

# 2. Executar linters
info "Executant stylelint..."
npx stylelint "css/**/*.css" "../estil/css/**/*.css" || error "Stylelint ha trobat errors. Corregeix-los abans de desplegar."

info "Executant eslint..."
npx eslint js/ || error "ESLint ha trobat errors. Corregeix-los abans de desplegar."

# 3. Comprovar connexió SSH
info "Comprovant connexió SSH..."
ssh -o ConnectTimeout=5 -q "$VPS_HOST" "true" || error "No es pot connectar a $VPS_HOST"

# 4. Sincronitzar paquet estil compartit
info "Sincronitzant paquet estil al VPS..."
rsync -az --delete --exclude='node_modules' --exclude='.git' --exclude='CLAUDE.md' \
    "../estil/" "$VPS_HOST:/home/deploy/apps/estil/"

# 5. Mostrar canvis pendents
echo ""
echo "=== Canvis pendents ==="
git status --short
echo ""

# 6. Comprovar si hi ha canvis per cometre
if [ -n "$(git status --porcelain)" ]; then
    warn "Hi ha canvis sense cometre."
    read -rp "Vols cometre'ls abans de desplegar? (s/N): " COMMIT_ANSWER
    if [[ "$COMMIT_ANSWER" =~ ^[sS]$ ]]; then
        git add -A
        if [ -n "${1:-}" ]; then
            COMMIT_MSG="$1"
        else
            read -rp "Missatge de commit: " COMMIT_MSG
        fi
        [ -z "$COMMIT_MSG" ] && error "Cal un missatge de commit."
        git commit -m "$COMMIT_MSG"
        info "Commit creat."
    else
        error "Desplega primer els canvis amb un commit, o passa -f per forçar."
    fi
fi

# 7. Push a GitHub
info "Pujant canvis a GitHub ($BRANCH)..."
git push origin "$BRANCH"
info "Push completat."

# 8. Desplegar al VPS (rsync de fitxers estàtics)
info "Desplegant impostor al VPS..."
rsync -az --delete \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='CLAUDE.md' \
    --exclude='deploy.sh' \
    --exclude='guia_validacio_errors.md' \
    ./ "$VPS_HOST:$VPS_APP_DIR/"

# 9. Verificar
info "Verificant desplegament..."
ssh "$VPS_HOST" "ls $VPS_APP_DIR/index.html && ls $VPS_APP_DIR/estil/css/estil.css" \
    || error "Verificació fallida: falten fitxers al VPS"

info "Desplegament completat!"
echo ""
echo -e "${GREEN}Impostor desplegat a $VPS_APP_DIR${NC}"
