<template>
    <div class="login">
       
    </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
    name: 'Login',
    created(){
        if(!this.$store.getters.user){
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(result => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const token = result.credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log('user login successful!', user);
                this.$store.commit('setUser', user);
                this.login();
            }).catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                const credential = error.credential;
                // window.location.href = ''
                alert('please allow popus for thie site.')
                console.error('ERROR:', error);
                
            });
        } else {
            console.log('user already logged in.', this.$store.getters.user);
            this.login();
        }
    },
    methods: {
        login(){
            this.$emit('input', true);
        }
    }
}
</script>

