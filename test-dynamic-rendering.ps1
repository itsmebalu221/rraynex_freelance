# =============================================================================
# Test Dynamic Rendering Setup (PowerShell)
# =============================================================================
# Usage: .\test-dynamic-rendering.ps1 [-BaseUrl "http://localhost:5001"]
# =============================================================================

param(
    [string]$BaseUrl = "http://localhost:5001"
)

Write-Host "=============================================="
Write-Host "Testing Dynamic Rendering at: $BaseUrl"
Write-Host "=============================================="
Write-Host ""

function Test-Url {
    param(
        [string]$Url,
        [string]$UserAgent,
        [string]$Expected,
        [string]$Description
    )
    
    Write-Host -NoNewline "Testing: $Description ... "
    
    try {
        $headers = @{ "User-Agent" = $UserAgent }
        $response = Invoke-WebRequest -Uri $Url -Headers $headers -UseBasicParsing -ErrorAction Stop
        
        $renderedBy = $response.Headers["X-Rendered-By"]
        $status = $response.StatusCode
        
        if ($status -eq 200) {
            if ($renderedBy -like "*$Expected*" -or [string]::IsNullOrEmpty($Expected)) {
                Write-Host "PASS (HTTP $status, X-Rendered-By: $renderedBy)" -ForegroundColor Green
            } else {
                Write-Host "WARN (HTTP $status, Expected: $Expected, Got: $renderedBy)" -ForegroundColor Yellow
            }
        } else {
            Write-Host "FAIL (HTTP $status)" -ForegroundColor Red
        }
    }
    catch {
        Write-Host "FAIL ($($_.Exception.Message))" -ForegroundColor Red
    }
}

Write-Host "--- Test 1: Human User (should get SPA) ---"
Test-Url -Url "$BaseUrl/" -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0" -Expected "" -Description "Homepage as Human"
Test-Url -Url "$BaseUrl/products" -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0" -Expected "" -Description "Products as Human"
Test-Url -Url "$BaseUrl/products/view/product-aspirin" -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0" -Expected "" -Description "Product Detail as Human"

Write-Host ""
Write-Host "--- Test 2: Googlebot (should get Snapshot) ---"
Test-Url -Url "$BaseUrl/" -UserAgent "Googlebot/2.1 (+http://www.google.com/bot.html)" -Expected "Snapshot" -Description "Homepage as Googlebot"
Test-Url -Url "$BaseUrl/products" -UserAgent "Googlebot/2.1 (+http://www.google.com/bot.html)" -Expected "Snapshot" -Description "Products as Googlebot"
Test-Url -Url "$BaseUrl/products/view/product-aspirin" -UserAgent "Googlebot/2.1 (+http://www.google.com/bot.html)" -Expected "Snapshot" -Description "Product Detail as Googlebot"

Write-Host ""
Write-Host "--- Test 3: Other Bots (should get Snapshot) ---"
Test-Url -Url "$BaseUrl/" -UserAgent "bingbot/2.0" -Expected "Snapshot" -Description "Homepage as Bingbot"
Test-Url -Url "$BaseUrl/about" -UserAgent "facebookexternalhit/1.1" -Expected "Snapshot" -Description "About as Facebook"
Test-Url -Url "$BaseUrl/contact" -UserAgent "Twitterbot/1.0" -Expected "Snapshot" -Description "Contact as Twitter"

Write-Host ""
Write-Host "--- Test 4: Verify Content ---"

try {
    $googlebotContent = (Invoke-WebRequest -Uri "$BaseUrl/products/view/product-aspirin" -Headers @{"User-Agent"="Googlebot/2.1"} -UseBasicParsing).Content
    
    if ($googlebotContent -match "Aspirin") {
        Write-Host "[OK] Googlebot receives pre-rendered product content" -ForegroundColor Green
    } else {
        Write-Host "[X] Googlebot may not be receiving proper snapshot" -ForegroundColor Red
    }
    
    if ($googlebotContent -match 'rel="canonical"') {
        Write-Host "[OK] Snapshot includes canonical tag" -ForegroundColor Green
    } else {
        Write-Host "[X] Snapshot missing canonical tag" -ForegroundColor Red
    }
    
    if ($googlebotContent -match 'application/ld\+json') {
        Write-Host "[OK] Snapshot includes structured data (JSON-LD)" -ForegroundColor Green
    } else {
        Write-Host "[?] Could not verify JSON-LD in snapshot" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "Could not verify content: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=============================================="
Write-Host "Manual Verification Commands (curl):"
Write-Host "=============================================="
Write-Host ""
Write-Host "# Test as Googlebot:"
Write-Host "curl -A 'Googlebot/2.1' $BaseUrl/products/view/product-aspirin"
Write-Host ""
Write-Host "# Test as Human:"
Write-Host "curl -A 'Mozilla/5.0 Chrome/120' $BaseUrl/products/view/product-aspirin"
Write-Host ""
Write-Host "# Check X-Rendered-By header:"
Write-Host "curl -I -A 'Googlebot/2.1' $BaseUrl/"
Write-Host ""
