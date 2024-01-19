let alaramsList=[];
let main_time=document.getElementsByTagName('h1')[0];

setInterval(function(){
    let curr_time=new Date();
    main_time.innerText=(curr_time.getHours()<10 ? '0':'')+ curr_time.getHours() +" : "+(curr_time.getMinutes()<10 ? '0' : '')+ curr_time.getMinutes() +" : " + (curr_time.getSeconds()<10 ? '0' : '')+ curr_time.getSeconds()+"  "+(curr_time.getHours()>=12 ? 'PM': 'AM');
},1000)

function showNotification(text) {
    console.log('shownotfication func called');
    window.alert(text);
}

function deleteAlaram(code){
    console.log('delete func called');
    alaramsList.forEach(function(alaram){
        console.log(alaram.code);
        console.log(code);
        if(alaram.code===code){
            console.log('called');
            alaramsList.splice(alaramsList.indexOf(alaram),1);
            showNotification('alram deleted secussfully');
            displayAlaramsList('call from delete');
            return;
        }
    })

}

function displayAlaramsList(text){
    let alrams=document.getElementById('alarams')
    console.log('display func called');
    document.getElementById('alarams').innerHTML='';
    alaramsList.forEach(function(alaram){
        let li=document.createElement('li');
        li.innerHTML=`
        <p>${alaram.stamp}</p>
        <button data-code="${alaram.code}" id='delete'>delete</button>`;
        alrams.append(li);
    })
    if(text!=='call from delete')
        showNotification('alaram created sucessfully');
    return;

}

document.addEventListener('click',function(event){
    let hours_stamp=document.getElementById('hours');
    let minutes_stamp=document.getElementById('minutes');
    let seconds_stamp=document.getElementById('seconds');
    let target=event.target;
    if(target.id=='created'){
         const alaram={
             stamp:(hours_stamp.value<10 ? '0':'')+hours_stamp.value.toString() +":"+ (minutes_stamp.value<10 ? '0':'')+minutes_stamp.value.toString() +":"+ (seconds_stamp.value<10 ? '0':'')+seconds_stamp.value.toString(),
             code:Date.now().toString(),
             hours:hours_stamp.value.toString(),
             minutes:minutes_stamp.value.toString(),
             seconds:seconds_stamp.value.toString()
         }
         if(alaram){
            alaramsList.push(alaram);
            displayAlaramsList('call from creation');
            hours_stamp.value=0;
            minutes_stamp.value=0;
            seconds_stamp.value=0;
         }
         else
            showNotification('alaram not created');
    }
    if(target.id=='delete'){
        deleteAlaram(target.getAttribute('data-code'));
    }
})

    setInterval(function(){
        alaramsList.forEach(function(alaram){
            let currentTime=new Date();
            if(alaram.hours==parseInt(currentTime.getHours()))
            {
                if(alaram.minutes==parseInt(currentTime.getMinutes()))
                {
                    if(alaram.seconds==parseInt(currentTime.getSeconds()))
                        window.alert('alaram ringing');
                }
            }
        })
    },1000)
