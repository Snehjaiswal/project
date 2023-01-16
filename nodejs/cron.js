const cron = require('node-cron')
// const sell = require('shelljs')
cron.schedule("*  * * * * *",function(){
    console.log('runing');
})
