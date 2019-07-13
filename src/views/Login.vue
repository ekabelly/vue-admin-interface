<template>
    <div class="login">
        
        <div id="firebaseui-auth-container" class="flex flex-column align-center justify-center">
            <div class="logo">
                <img src="@/assets/img/logo.png" alt="">
            </div>
        </div>
        <div id="loader"></div>
    </div>
</template>

<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui';

export default {
    name: 'Login',
    created(){
        if(!this.$store.getters.user){
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({
                prompt: 'select_account'
            });
            
            const ui = new firebaseui.auth.AuthUI(firebase.auth());
            ui.start('#firebaseui-auth-container', {
                callbacks: {
                    signInSuccessWithAuthResult: async authResult => {
                        console.log('user login successful!', authResult);
                        const adminsArr = await this.$store.dispatch('fetchAdmins');
                        // debugger;
                        if(adminsArr.includes(authResult.additionalUserInfo.profile.email)){
                            this.$store.commit('setUser', {
                                displayName: authResult.additionalUserInfo.profile.name,
                            email: authResult.additionalUserInfo.profile.email 
                        });
                        this.$emit('input', true);
                        } else {
                            alert('משתמש לא מורשה.');
                            this.$store.dispatch('logout');
                        }
                    },
                    uiShown: function() {
                        // The widget is rendered.
                        // Hide the loader.
                        document.getElementById('loader').style.display = 'none';
                    }
                },
                // signInSuccessUrl: 'localhost:8080/',
                signInOptions: [
                    // List of OAuth providers supported.
                    {
                        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                        scopes: [
                            'https://www.googleapis.com/auth/contacts.readonly'
                        ],
                        costumParameters: {
                            prompt: 'select_account'
                        }
                    }
                ]
                // Other config options...
            });
        } else {
            console.log('user already logged in.', this.$store.getters.user);
            this.$emit('input', true);
        }
        //--------------------------------- LOGIN WITH POPUP:
        //     const provider = new firebase.auth.GoogleAuthProvider();
        //     firebase.auth().signInWithPopup(provider).then(result => {
            //         // This gives you a Google Access Token. You can use it to access the Google API.
        //         const token = result.credential.accessToken;
        //         // The signed-in user info.
        //         const user = result.user;
        //         console.log('user login successful!', user);
        //         this.$store.commit('setUser', user);
        //         this.login();
        //     }).catch(error => {
            //         // Handle Errors here.
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // The email of the user's account used.
        //         const email = error.email;
        //         // The firebase.auth.AuthCredential type that was used.
        //         const credential = error.credential;
        //         // window.location.href = ''
        //         alert('please allow popus for thie site.')
        //         console.error('ERROR:', error);
                
        //     });
        // } else {
            //     console.log('user already logged in.', this.$store.getters.user);
        //     this.login();
        // }
        // console.log(firebaseui);

    }
}
</script>

<style lang="scss" scoped>
    .login {
        height: 60vh;
    }

    #firebaseui-auth-container {
        height: -webkit-fill-available;
    }

    .logo img {
        width: 195px;
    }
</style>
