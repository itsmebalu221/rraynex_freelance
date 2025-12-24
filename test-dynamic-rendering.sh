#!/bin/bash
# =============================================================================
# Test Dynamic Rendering Setup
# =============================================================================
# Usage: bash test-dynamic-rendering.sh [base_url]
# Example: bash test-dynamic-rendering.sh http://localhost:5001
# =============================================================================

BASE_URL="${1:-http://localhost:5001}"

echo "=============================================="
echo "Testing Dynamic Rendering at: $BASE_URL"
echo "=============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test function
test_url() {
    local url=$1
    local user_agent=$2
    local expected=$3
    local description=$4
    
    echo -n "Testing: $description ... "
    
    response=$(curl -s -o /dev/null -w "%{http_code}" -A "$user_agent" "$url")
    rendered_by=$(curl -s -I -A "$user_agent" "$url" | grep -i "X-Rendered-By" | tr -d '\r')
    
    if [ "$response" == "200" ]; then
        if [[ "$rendered_by" == *"$expected"* ]] || [ -z "$expected" ]; then
            echo -e "${GREEN}PASS${NC} (HTTP $response, $rendered_by)"
        else
            echo -e "${YELLOW}WARN${NC} (HTTP $response, Expected: $expected, Got: $rendered_by)"
        fi
    else
        echo -e "${RED}FAIL${NC} (HTTP $response)"
    fi
}

echo "--- Test 1: Human User (should get SPA) ---"
test_url "$BASE_URL/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0" "" "Homepage as Human"
test_url "$BASE_URL/products" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0" "" "Products as Human"
test_url "$BASE_URL/products/view/product-aspirin" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0" "" "Product Detail as Human"

echo ""
echo "--- Test 2: Googlebot (should get Snapshot) ---"
test_url "$BASE_URL/" "Googlebot/2.1 (+http://www.google.com/bot.html)" "Snapshot" "Homepage as Googlebot"
test_url "$BASE_URL/products" "Googlebot/2.1 (+http://www.google.com/bot.html)" "Snapshot" "Products as Googlebot"
test_url "$BASE_URL/products/view/product-aspirin" "Googlebot/2.1 (+http://www.google.com/bot.html)" "Snapshot" "Product Detail as Googlebot"

echo ""
echo "--- Test 3: Other Bots (should get Snapshot) ---"
test_url "$BASE_URL/" "bingbot/2.0" "Snapshot" "Homepage as Bingbot"
test_url "$BASE_URL/about" "facebookexternalhit/1.1" "Snapshot" "About as Facebook"
test_url "$BASE_URL/contact" "Twitterbot/1.0" "Snapshot" "Contact as Twitter"

echo ""
echo "--- Test 4: Verify Content Differences ---"
echo ""

echo "Checking Googlebot receives pre-rendered HTML..."
googlebot_content=$(curl -s -A "Googlebot/2.1" "$BASE_URL/products/view/product-aspirin" | head -100)

if echo "$googlebot_content" | grep -q "Aspirin"; then
    echo -e "${GREEN}✓${NC} Googlebot receives pre-rendered product content"
else
    echo -e "${RED}✗${NC} Googlebot may not be receiving proper snapshot"
fi

if echo "$googlebot_content" | grep -q 'rel="canonical"'; then
    echo -e "${GREEN}✓${NC} Snapshot includes canonical tag"
else
    echo -e "${RED}✗${NC} Snapshot missing canonical tag"
fi

if echo "$googlebot_content" | grep -q 'application/ld+json'; then
    echo -e "${GREEN}✓${NC} Snapshot includes structured data (JSON-LD)"
else
    echo -e "${YELLOW}?${NC} Could not verify JSON-LD in snapshot"
fi

echo ""
echo "=============================================="
echo "Manual Verification Commands:"
echo "=============================================="
echo ""
echo "# Test as Googlebot:"
echo "curl -A 'Googlebot/2.1' $BASE_URL/products/view/product-aspirin | head -50"
echo ""
echo "# Test as Human:"
echo "curl -A 'Mozilla/5.0 Chrome/120' $BASE_URL/products/view/product-aspirin | head -50"
echo ""
echo "# Check X-Rendered-By header:"
echo "curl -I -A 'Googlebot/2.1' $BASE_URL/"
echo ""
