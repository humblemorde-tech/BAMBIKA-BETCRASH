<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>BAMBIKA | Pure Crash & Casino Arena</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="./style.css">
</head>
<body>

    <header class="app-header">
        <div class="header-left">
            <img src="assets/logo.png" alt="BAMBIKA" class="brand-logo-img" onerror="this.style.display='none'; document.getElementById('logo-text').style.display='block';">
            <div id="logo-text" class="brand-logo-fallback" style="display:none;">BAMBIKA<span>.</span></div>
            
            <div class="country-selector">
                <span>🇰🇪</span>
                <span>Kenya</span>
            </div>
        </div>
        <div class="header-right">
            <button class="btn-login" onclick="alert('Login panel coming soon!')">Login</button>
            <button class="btn-register" onclick="alert('Registration panel coming soon!')">Register</button>
        </div>
    </header>

    <section class="category-scroller" id="category-scroller">
        <div class="scroll-item active" data-category="all">
            <div class="icon-circle">🚀</div>
            <span>All Crash</span>
        </div>
        <div class="scroll-item" data-category="slots">
            <div class="icon-circle">🎰</div>
            <span>Slots</span>
        </div>
        <div class="scroll-item" data-category="spin">
            <div class="icon-circle">💎</div>
            <span>Spin 2 Win</span>
        </div>
        <div class="scroll-item" data-category="trending">
            <div class="icon-circle">⚡</div>
            <span>Trending</span>
        </div>
        <div class="scroll-item" data-category="instant">
            <div class="icon-circle">💳</div>
            <span>Instant Cash</span>
        </div>
    </section>

    <section class="promo-banner">
        <h2>BAMBIKA VS ROCKET</h2>
        <p>MULTIPLY YOUR BALANCE UP TO 500,000x</p>
        <button class="btn-banner-action" onclick="alert('Launching Featured Arena!')">Play Now</button>
    </section>

    <section class="section-header">
        <h3 id="grid-title">🔥 Popular Crash Games</h3>
        <a href="#" class="view-all" id="view-all-btn">View All</a>
    </section>

    <section class="games-grid" id="games-grid-target">
        </section>

    <nav class="bottom-nav">
        <a href="#" class="nav-link active" data-tab="home">
            <span class="nav-icon">🏠</span>
            <span>Home</span>
        </a>
        <a href="#" class="nav-link" data-tab="casino">
            <span class="nav-icon">🎰</span>
            <span>Casino</span>
        </a>
        <a href="#" class="nav-link" data-tab="crash">
            <span class="nav-icon">🚀</span>
            <span>Crash</span>
        </a>
        <a href="#" class="nav-link" data-tab="winners">
            <span class="nav-icon">🏆</span>
            <span>Winners</span>
        </a>
        <a href="#" class="nav-link" data-tab="menu">
            <span class="nav-icon">☰</span>
            <span>Menu</span>
        </a>
    </nav>

    <script>
        // Local fallback database array mapping to your game.json architecture
        const fallbackGamesDatabase = [
            { "id": "aviator", "name": "Aviator", "category": "all", "cssClass": "bg-aviator" },
            { "id": "jetx", "name": "Jet X", "category": "all", "cssClass": "bg-jetx" },
            { "id": "pilot", "name": "Pilot Chicken", "category": "all", "cssClass": "bg-pilot" },
            { "id": "aviatrix", "name": "Aviatrix", "category": "trending", "cssClass": "bg-aviatrix" },
            { "id": "navigator", "name": "Navigator", "category": "all", "cssClass": "bg-navigator" },
            { "id": "comet", "name": "Comet Crash", "category": "instant", "cssClass": "bg-comet" },
            { "id": "rocket", "name": "SpaceX Rocket", "category": "trending", "cssClass": "bg-rocket" },
            { "id": "moonshot", "name": "Crypto Moon", "category": "slots", "cssClass": "bg-moonshot" },
            { "id": "zeus", "name": "Zeus Strike", "category": "spin", "cssClass": "bg-zeus" }
        ];

        let activeGames = [...fallbackGamesDatabase];

        // Initialization lifecycle
        document.addEventListener("DOMContentLoaded", () => {
            fetchLiveGameData();
            setupCategoryFilters();
            setupFooterTabs();
        });

        // Pulls records from your remote game.json file 
        async function fetchLiveGameData() {
            try {
                const response = await fetch('./game.json');
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data) && data.length > 0) {
                        activeGames = data;
                    }
                }
            } catch (error) {
                console.log("Using baseline internal matrix database configuration reference.");
            }
            renderMatrixGrid("all");
        }

        // Populates cards dynamically into the grid viewport
        function renderMatrixGrid(filterCategory) {
            const gridContainer = document.getElementById("games-grid-target");
            gridContainer.innerHTML = "";

            const filtered = filterCategory === "all" 
                ? activeGames 
                : activeGames.filter(g => g.category === filterCategory);

            if (filtered.length === 0) {
                gridContainer.innerHTML = `<div style="grid-column: span 3; text-align:center; padding: 40px 0; color:#64748b; font-size:14px;">No active games found in this category.</div>`;
                return;
            }

            filtered.forEach(game => {
                const card = document.createElement("div");
                card.className = "game-card";
                
                // Uses dynamic artwork or gradient layouts fallback cleanly
                card.innerHTML = `
                    <div class="game-thumb ${game.cssClass || 'bg-aviator'}" style="background-image: url('assets/games/${game.id}.png'), linear-gradient(135deg, #1e293b, #0f172a);">
                        ${game.name}
                    </div>
                    <button class="btn-play" onclick="launchGameEngine('${game.id}')">Play Now</button>
                `;
                gridContainer.appendChild(card);
            });
        }

        // Filter navigation engine handler
        function setupCategoryFilters() {
            const items = document.querySelectorAll(".category-scroller .scroll-item");
            items.forEach(item => {
                item.addEventListener("click", () => {
                    items.forEach(i => i.classList.remove("active"));
                    item.classList.add("active");
                    
                    const cat = item.getAttribute("data-category");
                    const titleElement = document.getElementById("grid-title");
                    
                    titleElement.innerText = cat === "all" ? "🔥 Popular Crash Games" : `🎯 ${item.querySelector("span").innerText} Games`;
                    renderMatrixGrid(cat);
                });
            });
        }

        // Footer navigation toggle management
        function setupFooterTabs() {
            const links = document.querySelectorAll(".bottom-nav .nav-link");
            links.forEach(link => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    links.forEach(l => l.classList.remove("active"));
                    link.classList.add("active");
                });
            });
        }

        // Action launch routine execution handler
        function launchGameEngine(gameId) {
            alert(`Initializing decentralized arena payload for game: ${gameId.toUpperCase()}`);
        }
    </script>
</body>
</html>
  
