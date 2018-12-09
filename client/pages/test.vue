<template>
<div class="login">
    <button @click="$store.dispatch('authenticateUser')">Sign in to your account</button>
</div>
</template>

<script>
export default {

}
</script>

<style>
.login {
    min-height: calc(100vh - 56px);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
