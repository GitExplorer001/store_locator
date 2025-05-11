/*!
 * Store Locator Plugin - Created by Anish Ghosh
 * GitHub: https://github.com/GitExplorer001
 * License: Free to use in personal or commercial work.
 * Publishing without this license is prohibited.
 * Selling is Prohibited.
 */
(function () {
    window.Storelocator = {
        init: function (config) {
            function getUserLocation(callback) { if (navigator.geolocation) { navigator.geolocation.getCurrentPosition((position) => { callback(position.coords.latitude, position.coords.longitude) }, () => { getLocationFromIP(callback) }) } else { getLocationFromIP(callback) } }
            function getLocationFromIP(callback) { fetch('https://ipapi.co/json/').then(response => { return response.json() }).then(data => { if (data.latitude && data.longitude) { callback(data.latitude, data.longitude) } else { callback(null, null) } }).catch(err => { callback(null, null) }) }
            getUserLocation((lat, lng) => { Storelocator.run(lat, lng, config) })
        }, run: function (lat, lng, config) {
            const container = document.querySelector(config.container); if (!container) return; const dataUrl = config.dataUrl ? "locator-plugin/data/" + config.dataUrl : "locator-plugin/data/stores.json"; const userLat = lat; const userLng = lng; const preloader = document.createElement('div'); preloader.id = 'preloader'; preloader.innerHTML = `
                <div class="preloader-inner">
                    <div class="spinner"></div>
                </div>
            `; container.appendChild(preloader); preloader.style.display = 'flex'; fetch(dataUrl).then(res => res.json()).then(data => {
                preloader.style.display = 'none'; container.innerHTML = `
                        <div class="sl-container">
                            <div class="sl-search-container">
                                <div class="sl-search-box">
                                    <input type="text" class="sl-search-input" id="searchInput" placeholder="Enter your location or zip code">
                                    <button class="sl-search-button" id="searchButton">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div class="sl-store-locator">
                                <div class="sl-store-list">
                                    <div class="sl-store-list-header">
                                        <h2>Nearby Stores</h2>
                                        <span class="sl-store-count" id="storeCount">5 stores</span>
                                    </div>

                                    <div class="sl-store-list-content" id="storeItems">
                                        <!-- stores will be appended here dynamically -->
                                    </div>
                                </div>

                                <div class="sl-map-wrapper has-active-store">
                                    <div class="sl-map-container">
                                        <!-- The map container will be added dynamically here -->
                                        <iframe class="sl-map-iframe" src="https://www.google.com/maps/embed?pb=..." allowfullscreen=""
                                            loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                                        </iframe>
                                    </div>
                                    <div class="sl-store-actions">
                                        <button class="sl-action-button" id="call-btn">
                                            <svg width="20" height="20" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 122.27"
                                                style="enable-background:new 0 0 122.88 122.27" xml:space="preserve" fill="#4f46e5">
                                                <g>
                                                    <path
                                                        d="M33.84,50.25c4.13,7.45,8.89,14.6,15.07,21.12c6.2,6.56,13.91,12.53,23.89,17.63c0.74,0.36,1.44,0.36,2.07,0.11 c0.95-0.36,1.92-1.15,2.87-2.1c0.74-0.74,1.66-1.92,2.62-3.21c3.84-5.05,8.59-11.32,15.3-8.18c0.15,0.07,0.26,0.15,0.41,0.21 l22.38,12.87c0.07,0.04,0.15,0.11,0.21,0.15c2.95,2.03,4.17,5.16,4.2,8.71c0,3.61-1.33,7.67-3.28,11.1 c-2.58,4.53-6.38,7.53-10.76,9.51c-4.17,1.92-8.81,2.95-13.27,3.61c-7,1.03-13.56,0.37-20.27-1.69 c-6.56-2.03-13.17-5.38-20.39-9.84l-0.53-0.34c-3.31-2.07-6.89-4.28-10.4-6.89C31.12,93.32,18.03,79.31,9.5,63.89 C2.35,50.95-1.55,36.98,0.58,23.67c1.18-7.3,4.31-13.94,9.77-18.32c4.76-3.84,11.17-5.94,19.47-5.2c0.95,0.07,1.8,0.62,2.25,1.44 l14.35,24.26c2.1,2.72,2.36,5.42,1.21,8.12c-0.95,2.21-2.87,4.25-5.49,6.15c-0.77,0.66-1.69,1.33-2.66,2.03 c-3.21,2.33-6.86,5.02-5.61,8.18L33.84,50.25L33.84,50.25L33.84,50.25z" />
                                                </g>
                                            </svg>
                                            <span class="sl-btn-text">Call Store</span>
                                        </button>
                                        <button class="sl-action-button" id="share-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 489.435"
                                                fill="none" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"
                                                image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd">
                                                <path fill="#EF4147"
                                                    d="M266.131 425.009c-3.121 2.276-7.359 2.59-10.837.357-37.51-23.86-69.044-52.541-93.797-83.672-34.164-42.861-55.708-90.406-63.066-136.169-7.493-46.427-.492-91.073 22.612-127.381 9.098-14.36 20.739-27.428 34.923-38.714C188.57 13.428 225.81-.263 262.875.004c35.726.268 70.96 13.601 101.422 41.39 10.707 9.723 19.715 20.872 27.075 32.96 24.843 40.898 30.195 93.083 19.269 145.981-17.047 82.829-71.772 160.521-144.51 204.674zM255.789 37.251c69.041 0 125.006 55.965 125.006 125.005 0 69.041-55.965 125.006-125.006 125.006-69.04 0-125.005-55.965-125.005-125.006 0-69.04 55.965-125.005 125.005-125.005z" />
                                                <path fill="#1A1A1A" fill-rule="nonzero"
                                                    d="M109.524 317.184c6.788 0 12.29 5.502 12.29 12.29 0 6.788-5.502 12.291-12.29 12.291H71.37L33.265 464.853h444.623l-41.373-123.088H407.93c-6.788 0-12.291-5.503-12.291-12.291s5.503-12.29 12.291-12.29h46.171L512 489.435H0l53.325-172.251h56.199zm184.33-226.538h.011c16.003 0 28.979 12.975 28.979 28.979 0 16.002-12.976 28.978-28.979 28.978-6.813 0-13.384-2.4-18.573-6.735l-38.487 16.041c.132 1.096.204 2.198.215 3.301l40.005 18.428a28.875 28.875 0 0116.676-5.306c15.93 0 28.85 12.92 28.85 28.85 0 15.929-12.92 28.849-28.85 28.849-15.93 0-28.849-12.92-28.849-28.849 0-2.212.254-4.416.754-6.565l-35.549-16.375a29 29 0 01-22.032 10.157c-16.001 0-28.979-12.978-28.979-28.979 0-16 12.978-28.978 28.979-28.978 7.195 0 14.117 2.68 19.43 7.477l37.787-15.748a29.192 29.192 0 01-.362-4.546c0-16.004 12.973-28.979 28.974-28.979z" />
                                            </svg>
                                            <span class="sl-btn-text">Share Location</span>
                                        </button>
                                        <button class="sl-action-button primary" id="direction-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"
                                                fill="#ffffff">
                                                <path
                                                    d="M502.6 233.3L278.7 9.4c-12.5-12.5-32.8-12.5-45.4 0L9.4 233.3c-12.5 12.5-12.5 32.8 0 45.4l223.9 223.9c12.5 12.5 32.8 12.5 45.4 0l223.9-223.9c12.5-12.5 12.5-32.8 0-45.4zm-101 12.6l-84.2 77.7c-5.1 4.7-13.4 1.1-13.4-5.9V264h-96v64c0 4.4-3.6 8-8 8h-32c-4.4 0-8-3.6-8-8v-80c0-17.7 14.3-32 32-32h112v-53.7c0-7 8.3-10.6 13.4-5.9l84.2 77.7c3.4 3.2 3.4 8.6 0 11.8z" />
                                            </svg>
                                            <span class="sl-btn-text">Get Directions</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `; function getGoogleMapsLink(lat, lng) { return `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3682.6696056270466!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDM3JzQzLjciTiA4OMKwMjMnMzIuMCJF!5e0!3m2!1sen!2sin!4v1746640498139!5m2!1sen!2sin` }
                function calculateDistance(lat1, lng1, lat2, lng2) { const R = 6371; const dLat = (lat2 - lat1) * (Math.PI / 180); const dLng = (lng2 - lng1) * (Math.PI / 180); const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2); const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); const distance = R * c; return distance }
                function renderStores(filteredStores) {
                    const storeItemsContainer = container.querySelector("#storeItems"); storeItemsContainer.innerHTML = ""; filteredStores.sort((a, b) => { const distA = calculateDistance(userLat, userLng, a.lat, a.lng); const distB = calculateDistance(userLat, userLng, b.lat, b.lng); return distA - distB }); filteredStores.forEach(store => {
                        store.map = store.map || getGoogleMapsLink(store.lat, store.lng); store.address = store.address || `${store.city}, ${store.state} - ${store.postal_code}, ${store.country}`; const distance = calculateDistance(userLat, userLng, store.lat, store.lng); const storeItem = `
                                <div class="sl-store-card sl-store-item" data-map="${store.map}" data-lat="${store.lat}" data-lng="${store.lng}">
                                    <div class="sl-store-name">${store.name}</div>
                                    <div class="sl-store-address">${store.address}</div>
                                    <div class="sl-store-phone">${store.phone}</div>
                                        <span class="sl-store-distance">${distance.toFixed(2)} Km</span>
                                        ${store.timings ? store.timings : '10.00 AM - 8.00 PM'}
                                    </div>
                                </div>
                            `; storeItemsContainer.innerHTML += storeItem
                    }); const mapContainer = container.querySelector('.sl-map-container'); if (config['custom-map'] && config['gmap-api']) { mapContainer.innerHTML = ""; const mapDiv = document.createElement('div'); mapDiv.id = 'map'; mapDiv.classList.add('sl-map'); mapDiv.style.height = '600px'; mapContainer.appendChild(mapDiv) }
                    const storeItems = container.querySelectorAll(".sl-store-item"); if (storeItems.length > 0) {
                        storeItems[0].classList.add("active"); const firstMap = storeItems[0].getAttribute("data-map"); if (firstMap) { updateMap(firstMap) }
                        selectedStore = storeItems[0]
                    }
                    storeItems.forEach(item => { item.addEventListener("click", function () { const newMapSrc = this.getAttribute("data-map"); updateMap(newMapSrc); storeItems.forEach(el => el.classList.remove("active")); this.classList.add("active"); selectedStore = this }) }); const callBtn = document.getElementById('call-btn'); const shareBtn = document.getElementById('share-btn'); const dirBtn = document.getElementById('direction-btn'); callBtn.addEventListener("click", () => {
                        if (!selectedStore) return; const phoneEl = selectedStore.querySelector('.sl-store-phone'); if (phoneEl) {
                            const phoneNumber = phoneEl.textContent
                            const number = phoneNumber.slice(-10); window.location.href = `tel:+91${number}`
                        }
                    }); shareBtn.addEventListener("click", () => {
                        if (!selectedStore) return; const map = selectedStore.getAttribute("data-map"); const lat = selectedStore.getAttribute("data-lat"); const lng = selectedStore.getAttribute("data-lng"); let link = ""; if (lat && lng) { link = `https://www.google.com/maps?q=${lat},${lng}` } else if (map) {
                            const match = map.match(/!3d([\d.]+)!2d([\d.]+)/); if (match) { lat = match[1]; lng = match[2] }
                            link = `https://www.google.com/maps?q=${lat},${lng}`
                        }
                        if (link) { if (navigator.share) { navigator.share({ title: "Store Location", text: "Check out this store location:", url: link }).catch(err => console.log("Share failed:", err)) } else { prompt("Copy this location URL:", link) } }
                    }); dirBtn.addEventListener("click", () => {
                        if (!selectedStore) return; let lat = selectedStore.getAttribute("data-lat"); let lng = selectedStore.getAttribute("data-lng"); const map = selectedStore.getAttribute("data-map"); if ((!lat || !lng) && map) { const match = map.match(/!3d([\d.]+)!2d([\d.]+)/); if (match) { lat = match[1]; lng = match[2] } }
                        if (lat && lng) { window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank") }
                    }); container.querySelector("#storeCount").textContent = filteredStores.length + " stores"
                }
                function updateMap(mapSrc) { const mapIframe = container.querySelector(".sl-map-iframe"); const mapDiv = container.querySelector('#map'); if (config['custom-map'] && config['gmap-api']) { loadCustomMap(config['gmap-api'], mapSrc) } else { if (mapIframe) { mapIframe.src = mapSrc } } }
                function reloadGoogleMapsScript(apiKey) {
                    const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]'); if (existingScript) { existingScript.remove() }
                    const script = document.createElement('script'); script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initCustomMap`; script.async = !0; script.defer = !0; document.body.appendChild(script)
                }
                function loadCustomMap(apiKey, mapSrc) {
                    reloadGoogleMapsScript(apiKey); window.initCustomMap = function () {
                        const activeItem = document.querySelector(".sl-store-item.active"); let initialLatLng; if (activeItem) { const activeMapId = activeItem.getAttribute("data-map"); const matchingStore = data.find(store => store.map === activeMapId); if (matchingStore) { initialLatLng = { lat: matchingStore.lat, lng: matchingStore.lng } } }
                        if (!initialLatLng) { initialLatLng = { lat: 22.563398361206055, lng: 88.35131072998047 } }
                        const map = new google.maps.Map(document.getElementById('map'), { center: initialLatLng, zoom: 15, }); data.forEach(store => { const storeItem = document.querySelector(`.sl-store-item[data-map="${store.map}"]`); const icon = storeItem && storeItem.classList.contains('active') ? 'icons/highlighted-icon.png' : 'icons/default-icon.png'; const marker = new google.maps.Marker({ position: new google.maps.LatLng(store.lat, store.lng), map: map, title: store.name, icon: icon, }); marker.addListener("click", function () { storeItem.classList.toggle('active'); marker.setIcon(storeItem.classList.contains('active') ? 'icons/highlighted-icon.png' : 'icons/default-icon.png'); map.panTo(marker.getPosition()) }) })
                    }
                }
                const searchInput = container.querySelector("#searchInput"); const searchButton = container.querySelector("#searchButton"); function performSearch() { const query = searchInput.value.toLowerCase(); const filteredStores = data.filter(store => (store.city && store.city.toLowerCase().includes(query)) || (store.pincode && store.pincode.toString().includes(query)) || (store.address && store.address.toLowerCase().includes(query))); renderStores(filteredStores) }
                searchButton.addEventListener("click", performSearch); searchInput.addEventListener("keyup", function (event) { if (event.key === "Enter") { performSearch() } }); renderStores(data)
            }).catch(error => console.error('Error fetching store data:', error))
        }
    }
})()