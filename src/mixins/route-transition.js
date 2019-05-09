export default {
    data(){
        return {
          fadeLeave: false,
          fadeEnter: false
        }
      },
      beforeRouteLeave(to, from, next){
        console.log('routeLeave');
        
        this.fadeEnter = false;
        this.fadeLeave = true;
        setTimeout(() => {
          this.fadeLeave = false;
          this.fadeEnter = true;
          next();
        }, 500)
      }
}