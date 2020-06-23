<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
            <div class="container">
                <a class="navbar-brand" href="/post">POSTS</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-item nav-link active" href="/post">Home <span class="sr-only">(current)</span></a>
                        <a class="nav-item nav-link" href="/api/post">API</a>
                        <a class="nav-item nav-link" href="#">Pricing</a>
                        <a class="nav-item nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>

</style>
