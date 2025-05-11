# Store Locator Plugin

<a href="locator-plugin.zip" download="custom-name.zip">Download ZIP</a>
An open-source, lightweight, and embeddable store locator plugin built using **HTML, CSS**, and **vanilla JavaScript**. Ideal for businesses wanting to showcase their physical locations on an interactive map.

⚠️ **Disclaimer:** This project uses anonymized sample data *inspired by* real-world formats **for demonstration purposes only**.

---

## ✨ Features

- Responsive design  
- Integrated Google Maps with custom or embedded options
- Takes User GEO location as input and shows nearest stores
- If GEO location is rejected uses IP instead to get approximate location
- Search by **area**, **city**, or **PIN code**  
- Tap-to-call support 
- Lightweight: No external libraries except Google Maps API  
- Plug-and-play architecture  
- Easily customizable with pure HTML, CSS, and JS  

---

## 🚀 Getting Started

### 1️⃣ Add the Plugin Container
1. Insert this inside your HTML:
`<div id="store-locator"></div>`
2. Make sure to add the files in a folder named `locator-plugin` in your root directory

### 2️⃣ Include Required Files
Inside your `<head>` tag, include:

```html
<link rel="stylesheet" href="locator-plugin/store-locator.css">
<script src="locator-plugin/store-locator.js"></script>
```

### 3️⃣ Prepare Your Data
You can format your data using the provided `store_data.xlsx` and follow these steps:

1. Fill in your store info.
2. Export the sheet as `.csv`.
3. Use `json-formatter.html` to convert CSV → JSON.

📌 **Required fields**:
- `name`, `city`, `phone`, `timings`, `map`
- Provide `<iframe>` link of the location in the `map` field, the script will automatically extract lattitude and longtitude.

Provide either:
- `state`, `postal_code`, `country`  
- OR a **complete address string** in `address`.

### 4️⃣ Initialize the Plugin
At the bottom of your page:
```html
<script>
    Storelocator.init({
        container: "#store-locator",
        dataUrl: "dummy-stores.json",
        "custom-map": true,
        "gmap-api": "YOUR_GOOGLE_CLOUD_API"
    });
</script>
```

If you do not initialise `dataUrl:`, it will atomatically be set as `stores.json`.
If you want to use the default embedded map, you do not need to call `custom-map` or provide a `gmap-api` key.


## 🔬 Live Demo
The sample data included simulates store locations across West Bengal. All phone numbers, names, and cities have been randomized or anonymized to maintain privacy.

---

## 📁 Project Structure
```html
locator-plugin/
│
├── data/
│   ├── stores.json
│   └── dummy-stores.json
│
├── icons/
│   ├── default-icon.png
│   └── highlighted-icon.png
│
├── store-locator.css
├── store-locator.js
├── json-formatter.html
└── LICENSE
```
---

## 📜 License

This plugin is licensed under the Custom MIT-Based License. You are free to use or integrate it commercially, provided:

- You do not sell it or derivative works.
- You do not distribute modified or unmodified versions without this license.
- Commercial use is allowed only if not sold as a product to end clients.

**Ownership and authorship belong to:**

- GitHub: <a href='https://github.com/GitExplorer001'>@GitExplorer001</a>
- LinkedIn: <a href='https://www.linkedin.com/in/anish-ghosh-ag743/'>Anish Ghosh</a>

🌟 Give this repo a ⭐ if you found it helpful!
