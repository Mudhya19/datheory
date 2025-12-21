<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio</title>
    @vite(['resources/css/app.css'])
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
</head>

<body class="min-h-screen bg-gray-900 text-white">
    <div id="app">
        <!-- Fallback content while React loads -->
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; text-align: center;">
            <div>
                <h1>Loading Portfolio...</h1>
                <p>If this persists, please check browser console for errors.</p>
            </div>
        </div>
    </div>
</body>

</html>
