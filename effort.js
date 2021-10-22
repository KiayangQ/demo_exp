
// needed varables
var timeline = []; 
var [time1,time2,time2_a,time3] =[3,3,3,3];
var [sum_20,sum_5]=[0,0];


var left=0;
var right=0;

var num_coins_earn=0;
var num_coins_keep=0;
var num_coins_e=0;
var num_coins_k=0;
// counterbalanced variables, need to be adjusted after deploying on the cloud !!

var group=1;
var order=1;
var sequence=1;

var progress=0;
var num_pressed=0;
// phase 1
// 
// import stimuli

var s1='img/s1.jpg'

var s2='img/s2.jpg'

var twice='img/bg2.jpg'
// import coins
var coins='img/coins.jpg'
// phase 1 img

var gray_square='img/gray_square.jpg'

var blue_moon='img/blue_moon.jpg'

var blue_star='img/blue_star.jpg'

var yellow_star='img/yellow_star.jpg'

var yellow_moon='img/yellow_moon.jpg'


var blue_f='img/blue_f.jpg'

var yellow_f='img/yellow_f.jpg'

var files='img/phase1_'

var index_f=_.range(1,14);

var file_index_p1 = Array.from(index_f,x=>files+x+'.jpg')



// key map 
if (sequence==1){
    var ins_1_key_map=file_index_p1[3];
    var ins_1_w=file_index_p1[10]
    var ins_1_o=file_index_p1[11]
}else{
    var ins_1_key_map=file_index_p1[2];
    var ins_1_w=file_index_p1[12];
    var ins_1_o=file_index_p1[1];
}

var full_screen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    on_start:function(){
        $('#jspsych-progressbar-container')[0].style.display='none';
    }
}


/* a simple survey */

var scale_1 = [
    "Strongly Disagree", 
    "Disagree", 
    "Neutral", 
    "Agree", 
    "Strongly Agree"
  ];
  
  var likert_page = {
    type: 'survey-likert',
    questions: [
      {prompt: "Do you wanna dance?", labels: scale_1},
      {prompt: "Do you wanna have a drink?", labels: scale_1},
      {prompt: "let's rock baby...",  labels: scale_1}
    ],
    randomize_question_order: true
  };
  



// phase 1 task
var hello_trial_1 = {
    type: 'instructions',
    pages: [   '<img src='+ file_index_p1[0] +'></img>',
                '<img src='+ file_index_p1[5] +'></img>',
                '<img src='+ file_index_p1[6] +'></img>',
                '<img src='+ file_index_p1[7] +'></img>',
                '<img src='+ file_index_p1[8] +'></img>',
                '<img src='+ ins_1_w +'></img>',
                '<img src='+ ins_1_o +'></img>',
                '<img src='+ file_index_p1[9] +'></img>',
                '<img src='+ ins_1_key_map +'></img>'
    ],
    on_start:function(){
        $('#jspsych-progressbar-container')[0].style.display='none';
        document.body.style.cursor = 'none';
    }
}

var countingt={
    timeline:[
  counting={
      type: 'html-keyboard-response',
      stimulus: function (){
        return '<div style="font-size:25px" id="count">The current experiment will start in '+ time1 +' seconds, please put your fingers on w and o key</div>'},
      choices: jsPsych.NO_KEYS,
      trial_duration: 1000,
      on_finish:function(){
      time1=time1-1
      },
  
  }],
      repetitions:3
  }
// phase 1 actual experiment

// stimuli array 40 trials, 15 for cue1 and 15 for cue 2

   var trials=0;
   var arr1=[];
    for(var i = 1; i < 21; i++){
    arr1.push(i);
    }
    var shuffleda=jsPsych.randomization.repeat(arr1, 1);

    /* defining test timeline */
      
var fixation ={
        type: 'html-keyboard-response',
        stimulus:  '<div style="width:1000px; height: 700px; position: relative;">'+
        "<img src="+ twice +" style='width:1000px; height:700px; position: absolute;top: 0px; left: 0px;z-index=-1;'>"+
        "<img src="+ gray_square +" style='width:250px; height:250px;top: 225px; left: 375px; position: absolute;z-index=0;'>"+
        "</div>",
        choices: jsPsych.NO_KEYS,
        trial_duration: function (){
            timef=(Math.random()*(3-1)+1)*1000;
            jsPsych.data.addProperties({random_t:timef})
        return timef
        },
        on_finish:function(){
            trials=trials+1
            left=0;
            right=0;
            jsPsych.setProgressBar(0);  
        }
    } 

    stimuli = {
        type: 'html-keyboard-response',
        choices: jsPsych.NO_KEYS,
        stimulus: function(){   
            // $('jspsych-content-wrapper').css({'background-image':"url( '../online_exp_test/img/bg.png');background-size:100% 100%;"})
            if (shuffleda[trials-1]<=10){
                return   '<div style="width:1000px; height: 700px; position: relative;">'+
                "<img src="+ twice +" style='width:1000px; height:700px; position: absolute;top: 0px; left: 0px;z-index=-1;'>"+
                "<img src="+ s1 +" style='width:250px; height:250px;top: 225px; left: 375px; position: absolute;z-index=0;'>"+
                "</div>"
            }else if (shuffleda[trials-1]>10){
                return   '<div style="width:1000px; height: 700px; position: relative;">'+
                "<img src="+ twice +" style='width:1000px; height:700px; position: absolute;top: 0px; left: 0px;z-index=-1;'>"+
                "<img src="+ s2 +" style='width:250px; height:250px;top: 225px; left:375px; position: absolute;z-index=0;'>"+
                "</div>"
            }
        },
        trial_duration:100
    }
    
    
var trial ={
        timeline:[ 
        {
        type: 'html-keyboard-response',
        choices: ["w","o"],
        // response_ends_trial: true,
        stimulus: function(){
            var added=250+num_pressed*25;
            var added1=added.toString().concat('px')
            var top=(700-added)/2;
            var top1=top.toString().concat('px');
            var left=(1000-added)/2;
            var left1=left.toString().concat('px')
            if(shuffleda[trials-1]<=5){
                var html= '<div style="width:1000px; height: 700px; position: relative;">'+
                "<img src="+ twice +" style='width:1000px; height:700px; position: absolute;top: 0px; left: 0px;z-index=-1;'>"+
                "<img src="+ yellow_star +" style='width:"+ added1 +" ;height:"+ added1 +" ;top: "+top1+" ;left: "+ left1+" ;position: absolute;z-index=0;'>"+
                "</div>"
             }else if (shuffleda[trials-1]>5&& shuffleda[trials-1]<=10){
                 var html='<div style="width:1000px; height: 700px; position: relative;">'+
                 "<img src="+ twice +" style='width:1000px; height:700px; position: absolute;top: 0px; left: 0px;z-index=-1;'>"+
                 "<img src="+ blue_star +" style='width:"+ added1 +" ;height:"+ added1 +" ;top: "+top1+" ;left: "+ left1+" ;position: absolute;z-index=0;'>"+
                 "</div>"
             }else if (shuffleda[trials-1]>10&& shuffleda[trials-1]<=15){

                 var html='<div style="width:1000px; height: 700px; position: relative;">'+
                 "<img src="+ twice +" style='width:1000px; height:700px; position: absolute;top: 0px; left: 0px;z-index=-1;'>"+
                 "<img src="+ blue_moon +" style='width:"+ added1 +" ;height:"+ added1 +" ;top: "+top1+" ;left: "+ left1+" ;position: absolute;z-index=0;'>"+
                 "</div>"
             }else if (shuffleda[trials-1]>15){
                 var html='<div style="width:1000px; height: 700px; position: relative;">'+
                 "<img src="+ twice +" style='width:1000px; height:700px; position: absolute;top: 0px; left: 0px;z-index=-1;'>"+
                 "<img src="+ yellow_moon +" style='width:"+ added1 +" ;height:"+ added1 +" ;top: "+top1+" ;left: "+ left1+" ;position: absolute;z-index=0;'>"+
                 "</div>"
             }
             return html
        },
        on_finish:function(){
            var data = jsPsych.data.get().last(1).values()[0];
            if (sequence==1){
              if (data.key_press==jsPsych.pluginAPI.convertKeyCharacterToKeyCode('w')&&(shuffleda[trials-1]<=5||shuffleda[trials-1]>15)){
                        left=left+1;
                        num_pressed+=1;
                }else if (data.key_press==jsPsych.pluginAPI.convertKeyCharacterToKeyCode('o')&&(shuffleda[trials-1]>5&&shuffleda[trials-1]<=15)){
                        right=right+1;
                        num_pressed+=1;
                    }
            }else if(sequence==2){
               if (data.key_press==jsPsych.pluginAPI.convertKeyCharacterToKeyCode('w')&&(shuffleda[trials-1]>5&&shuffleda[trials-1]<=15)){
                        left=left+1;
                        num_pressed+=1;
                       }
                    else if (data.key_press==jsPsych.pluginAPI.convertKeyCharacterToKeyCode('o')&&(shuffleda[trials]>15||shuffleda[trials]<=5)){
                        right=right+1;
                        num_pressed+=1;
                    }
                }
           if (num_pressed==10){
               jsPsych.endCurrentTimeline();
           }
        },
        trial_duration:10000
    }
    ],
    repetitions:1000
      }
  var nothing={
        type: 'html-keyboard-response',
        choices: jsPsych.NO_KEYS,
        stimulus:function(){
           if (num_pressed<10){
               return'<div style="width:1000px; height: 700px; position: relative;">'+
               "<img src="+ twice +" style='width:1000px; height:700px; position: absolute;top: 0px; left: 0px;z-index=-1'>"+
               "Your key presses are too slow"+
               "</div>"
           }else{
               return '<div style="width:1000px; height: 700px; position: relative;">'+
               "<img src="+ twice +" style='width:1000px; height:700px; position: absolute;top: 0px; left: 0px;'>"+
               "</div>"
           }
        },
        trial_duration:1000,
        on_finish:function(){
            num_pressed=0;
        }
    }

      var test_procedure={
        timeline: [fixation,stimuli,trial,nothing],
        repetitions:6
        }


// phase 2 manipulation

// phase 2 stimuli upload
var files='img/phase2_'
// generate 1:11 sequence
var index_p2=_.range(1,19);

var file_index_p2 = Array.from(index_p2,x=>files+x+'.jpg')

// 


if (sequence==1&&group==1){
    var ins_2_key_map_p=file_index_p2[4];
    var ins_2_key_map_a=file_index_p2[14];

    var key_outcome= file_index_p2[1]
}
else if(sequence==1&&group==2){
    var ins_2_key_map_p=file_index_p2[5];
    var ins_2_key_map_a=file_index_p2[7];

    var key_outcome= file_index_p2[3]

}else if(sequence==2&&group==1){
    var ins_2_key_map_p=file_index_p2[5];
    var ins_2_key_map_a=file_index_p2[7];

    var key_outcome= file_index_p2[2]

}else if(sequence==2&&group==2){
    var ins_2_key_map_p=file_index_p2[5];
    var ins_2_key_map_a=file_index_p2[7];

    var key_outcome= file_index_p2[9]

}

// if (group==1){
//     var key_outcome=file_index_p2[2];
//     var key_outcome_w=file_index_p2[1];
// }else{
//     var key_outcome_o=file_index_p2[3];
//     var key_outcome_w=file_index_p2[10];
// }



// phase 2 task
var hello_trial_2 = {
    type: 'instructions',
    pages: [   '<img src='+ file_index_p2[0] +'></img>',
                '<img src='+ file_index_p1[6] +'></img>',
                '<img src='+ ins_1_w +'></img>',
                '<img src='+ ins_1_o +'></img>',
                '<img src='+ key_outcome +'></img>',
                '<img src='+ ins_2_key_map_p +'></img>'
    ],
    on_start:function(){
        $('#jspsych-progressbar-container')[0].style.display='none';
    }
}

var countingt2={
            timeline:[
          counting={
              type: 'html-keyboard-response',
              stimulus: function (){
                return '<div style="font-size:25px" id="count">The current experiment will start in '+ time2_a+' seconds, please put your fingers on w and o key</div>'},
              choices: jsPsych.NO_KEYS,
              trial_duration: 1000,
              on_finish:function(){
              time2_a=time2_a-1;
              }
          
          }],
              repetitions:3
          }

// phase 2 practice experiment



// stimuli array 40 trials, 10 for cue1 and 15 for cue 2

   var trials_2=0;
   var arr2=[];
    for(var i = 1; i < 11; i++){
    arr2.push(i);
    }
    var shuffleda_2=jsPsych.randomization.repeat(arr2, 1);

    /* defining test timeline */
      
    fixation ={
        type: 'html-keyboard-response',
        stimulus: '<img src='+ gray_square +'></img>',
        choices: jsPsych.NO_KEYS,
        trial_duration: function (){
            timef=(Math.random()*(3-1)+1)*1000;
            jsPsych.data.addProperties({random_t:timef})
        return timef
        },
        on_finish:function(){
                trials_2=trials_2+1;
                setTimeout(function(){
                    if (jsPsych.getProgressBarCompleted()<1){
                        jsPsych.endCurrentTimeline()
                    }
                },3000)
        },
        on_start:function(){
            $('#jspsych-progressbar-container')[0].style.display='inline';
            right=0;
            left=0;
            jsPsych.setProgressBar(0);
        }
    } 
    
    
var trial_p2_p ={
        timeline:[  
    stimuli ={
        type: 'html-keyboard-response',
        choices: ["w","o"],
        stimulus: function(){
            if (shuffleda_2[trials_2-1]<=5){
                return "<img src='"+ yellow_f +"'>" 
            }else if(shuffleda_2[trials_2-1]>5){
                return "<img src='"+ blue_f +"'>" 
            }
        },
        on_finish:function(){
            var data = jsPsych.data.get().last(1).values()[0];
            if (sequence==1){
              if (data.key_press==jsPsych.pluginAPI.convertKeyCharacterToKeyCode('w')&&shuffleda_2[trials_2-1]<=5){
                        left=left+1;
                        jsPsych.setProgressBar(left*0.1);
                }
                    else if (data.key_press==jsPsych.pluginAPI.convertKeyCharacterToKeyCode('o')&&shuffleda_2[trials_2-1]>5){
                        right=right+1;
                        jsPsych.setProgressBar(right*0.1);
                    }
                }else if(sequence==2){
                    if (data.key_press==jsPsych.pluginAPI.convertKeyCharacterToKeyCode('w')&&shuffleda_2[trials_2-1]>5){
                        left=left+1;
                        jsPsych.setProgressBar(left*0.1);
                       }
                    else if (data.key_press==jsPsych.pluginAPI.convertKeyCharacterToKeyCode('o')&&shuffleda_2[trials_2-1]<=5){
                        right=right+1;
                        jsPsych.setProgressBar(right*0.1);
                    }
                }
        var progress_bar_amount = jsPsych.getProgressBarCompleted();
           if (progress_bar_amount==1){
               jsPsych.endCurrentTimeline()
           } 
        },
        trial_duration:3000
    }
    ],
    repetitions:1000
      }

var outcome_money = {
        type: 'html-keyboard-response',
        choices: jsPsych.NO_KEYS,
        stimulus:function(){
            var num1=shuffleda_2[trials_2]%2;
            if (right>=10 && group ==2 && num1==0){
                return "<img src='"+ coins +"'>" 
            }else if (right>=10 && group==2 && num1==1){
                return "" 
            }else if (left>=10 && group ==2 && num1==0){
                return "<img src='"+ coins +"'>" 
            }else if (left>=10 && group==2 && num1==1){
                return '' 
            }else if(right>=10 && group==1 && num1==1){
                return '' 
            }else if(right>=10 && group==1 && num1==0){
                return "<img src='"+ coins +"'>"  
            }else if(left>=10 && group==1 && num1==1){
                return ''
            }else if(left>=10 && group==1 && num1==0){
                return "<img src='"+ coins +"'>" 
            }else {
                return "Your keypresses are too slow"
            }
        },
        trial_duration:1000,
        post_trial_gap:1000
}

      var test_procedure2={
        timeline: [fixation,trial_p2_p,outcome_money],
        repetitions:2
        }


// // phase 2 actual task

var trials_2_a=0;
var arr2_a=[];
 for(var i = 1; i < 21; i++){
 arr2_a.push(i);
 }
 var shuffleda_2_a=jsPsych.randomization.repeat(arr2_a, 1);



// phase 2 task
var hello_trial_2_a = {
    type: 'instructions',
    pages: [  
                '<img src='+ ins_2_key_map_a +'></img>'
    ],
    on_start:function(){
        $('#jspsych-progressbar-container')[0].style.display='none';
    }
}


var countingt2_a={
    timeline:[
  counting={
      type: 'html-keyboard-response',
      stimulus: function (){
        return '<div style="font-size:25px" id="count">The current experiment will start in '+ time2+' seconds, please put your fingers on w and o key</div>'},
      choices: jsPsych.NO_KEYS,
      trial_duration: 1000,
      on_finish:function(){
      time2=time2-1;
      }
  
  }],
      repetitions:3
  }

//  var shuffleda_2_a=jsPsych.randomization.repeat(arr2_a, 1);

//  /* defining test timeline */
   
 fixation ={
     type: 'html-keyboard-response',
     stimulus: '<img src='+ gray_square +'></img>',
     choices: jsPsych.NO_KEYS,
     trial_duration: function (){
         timef=(Math.random()*(3-1)+1)*1000;
         jsPsych.data.addProperties({random_t:timef})
     return timef
     },
     on_finish:function(){
             trials_2_a=trials_2_a+1;
             setTimeout(function(){
                if (jsPsych.getProgressBarCompleted()<1){
                    jsPsych.endCurrentTimeline()
                }
            },3000)
     },
     on_start:function(){
         $('#jspsych-progressbar-container')[0].style.display='inline';
         left=0;
         right=0;
         jsPsych.setProgressBar(0);
     }
 } 
 
 
var trial_p2_a ={
     timeline:[  
 stimuli ={
     type: 'html-keyboard-response',
     choices: ["w","o"],
     stimulus: function(){
         if (shuffleda_2_a[trials_2_a-1]<=10){
             return "<img src='"+ yellow_f +"'>" 
         }else if(shuffleda_2_a[trials_2_a-1]>10){
             return "<img src='"+ blue_f +"'>" 
         }
     },
     on_finish:function(){
        var data = jsPsych.data.get().last(1).values()[0];
        if (sequence==1){
          if (data.key_press==jsPsych.pluginAPI.convertKeyCharacterToKeyCode('w')&&shuffleda_2_a[trials_2_a-1]<=10){
                    left=left+1;
                    jsPsych.setProgressBar(left*0.1);
            }
                else if (data.key_press==jsPsych.pluginAPI.convertKeyCharacterToKeyCode('o')&&shuffleda_2_a[trials_2_a-1]>10){
                    right=right+1;
                    jsPsych.setProgressBar(right*0.1);
                }
            }else if(sequence==2){
           if (data.key_press==jsPsych.pluginAPI.convertKeyCharacterToKeyCode('w')&&shuffleda_2_a[trials_2_a]>10){
                    left=left+1;
                    jsPsych.setProgressBar(left*0.1);
                   }
                else if (data.key_press==jsPsych.pluginAPI.convertKeyCharacterToKeyCode('o')&&shuffleda_2_a[trials_2_a]<=10){
                    right=right+1;
                    jsPsych.setProgressBar(right*0.1);
                }
            }
    var progress_bar_amount = jsPsych.getProgressBarCompleted();
       if (progress_bar_amount==1){
           jsPsych.endCurrentTimeline()
       }
     },
     trial_duration:3000
 }
 ],
 repetitions:1000
   }

   outcome_money = {
    type: 'html-keyboard-response',
    choices: jsPsych.NO_KEYS,
    stimulus:function(){
        jsPsych.data.addProperties({left_num:left,right_num:right});
        var right1=right;
        var left1=left;
        right=0;
        left=0;
        var num1=shuffleda_2_a[trials_2_a]%2;
        if (right1>=10 && group ==2 && num1==0){
            num_coins_earn=num_coins_earn+1;
            return "<img src='"+ coins +"'>" 
        }else if (right1>=10 && group==2 && num1==1){
            return " " 
        }else if (left1>=10 && group ==2 && num1==0){
            num_coins_keep=num_coins_keep+1;
            return "<img src='"+ coins +"'>" 
        }else if (left1>=10 && group==2 && num1==1){
            return " " 
        }else if(right1>=10 && group==1 && num1==1){
            return " "  
        }else if(right1>=10 && group==1 && num1==0){
            num_coins_keep=num_coins_keep+1;
            return "<img src='"+ coins +"'>"  
        }else if(left1>=10 && group==1 && num1==1){
            return " " 
        }else if(left1>=10 && group==1 && num1==0){
            num_coins_earn=num_coins_earn+1;
            return "<img src='"+ coins +"'>" 
        }else{
            return 'Your keypresses are too slow'
        } 
    },
    trial_duration:1000,
    on_finish:function(){
        jsPsych.data.addProperties({num_coins_e:num_coins_earn,num_coins_k:num_coins_keep});
    },
    post_trial_gap:1000
   
   }

   var test_procedure2_a={
     timeline: [fixation,trial_p2_a,outcome_money],
     repetitions:2
     }




summary_2={
    type:'html-keyboard-response',
    choices: ['space'],
    stimulus:function(){
        var data = jsPsych.data.get().last(1).values()[0];
        num_coins_e=data.num_coins_e
        num_coins_k=data.num_coins_k
        sum=(num_coins_e+num_coins_k)*10; 
        return '<p>You have collected '+ sum + ' cents coins.</p>'+
                '<br>'+
                '<p>press space to the next phase </p>'
    },
    on_start:function(){
        $('#jspsych-progressbar-container')[0].style.display='none';
    }

}







// pavlovian phase

var files_p3='img/phase3_'

var index_p3=_.range(1,13);

var file_index_p3 = Array.from(index_p3,x=>files_p3+x+'.jpg')

// trials number




var trials_3_p=0;
var arr3_p=[];
 for(var i = 1; i < 11; i++){
 arr3_p.push(i);
 }
 var shuffleda_3_p=jsPsych.randomization.repeat(arr3_p, 1);



if (order==1){
    var ins_3_map_p=file_index_p3[6];
    var ins_3_map_a=file_index_p3[8];
    var stimu1 = file_index_p3[3];
    var stimu2 = file_index_p3[1];
    var s_f= s1
    var s_s= s2
}else{
    var ins_3_map_p=file_index_p3[7];
    var ins_3_map_a=file_index_p3[9];
    var stimu1=file_index_p3[10]
    var stimu2=file_index_p3[11]
    var s_f = s2;
    var s_s = s1
}
var out=file_index_p3[2]




var hello_trial_3 = {
    type: 'instructions',
    pages: [   '<img src='+ file_index_p3[0] +'></img>',
                '<img src='+ file_index_p1[6] +'></img>', 
                '<img src='+ stimu1 +'></img>', 
                '<img src='+ out +'></img>',
                '<img src='+ file_index_p2[8] +'></img>',
                '<img src='+ file_index_p1[6] +'></img>', 
                '<img src='+ out +'></img>',   
                '<img src='+ stimu2 +'></img>',
                '<img src='+ file_index_p3[5] +'></img>',
                '<img src='+ ins_3_map_p +'></img>'
    ],
    post_trial_gap:1000
}


// phase 3

var phase_3 ={
    timeline:[
    {
        type: 'html-keyboard-response',
        stimulus: '<img src='+ gray_square +'></img>',
        choices: jsPsych.NO_KEYS,
        trial_duration: function (){
        return (Math.random()*(3-1)+1)*1000;},
        on_start:function(){
            $('#jspsych-progressbar-container')[0].style.display='inline';
            jsPsych.setProgressBar(0);
            progress=0;
        }
    },
    countings={
        timeline:[
        {   
            type: 'html-keyboard-response',
            stimulus: function(){
                var html="<img src='"+jsPsych.timelineVariable('cue', true)+"'>";
                return html},
            choices: jsPsych.NO_KEYS,
            trial_duration:1000,
            on_finish:function(){
                progress=progress+1/3
                jsPsych.setProgressBar(progress);
            }
        }
    ],
    repetitions:3

    },

    {   
        type: 'html-keyboard-response',
        stimulus:function(){
            var num1=shuffleda_3_p[trials_3_p]%2;
            if(num1==0){
                var html="<img src='"+jsPsych.timelineVariable('outcome', true)+"'>";}
            else{
                var html="You won nothing";    
            }
            return html},
        choices: jsPsych.NO_KEYS,
        on_finish:function(){
            trials_3_p=trials_3_p+1;
        },
        trial_duration:1000,
        on_start:function(){
            $('#jspsych-progressbar-container')[0].style.display='none';
        }
    },
    {    
        type:'html-keyboard-response',
        stimulus:'Press space to continue',
        choices:['space']
    }
    ],
    timeline_variables: [
        { cue: s_f, outcome: coins },
        { cue: coins, outcome: s_s }
        ],
    randomize_order: true,
    repetitions: 2
    }

// phase 3 actual task



var trials_3_a=0;
var arr3_a=[];
 for(var i = 1; i < 21; i++){
 arr3_a.push(i);
 }
 var shuffleda_3_a=jsPsych.randomization.repeat(arr3_a, 1);




var hello_trial_3_a = {
    type: 'instructions',
    pages: [  
                '<img src='+ ins_3_map_a +'></img>'
    ],
    post_trial_gap:1000
}



// phase 3

var phase_3_a ={
    timeline:[
    {
        type: 'html-keyboard-response',
        stimulus: '<img src='+ gray_square +'></img>',
        choices: jsPsych.NO_KEYS,
        trial_duration: function (){
        return (Math.random()*(3-1)+1)*1000;},
        on_start:function(){
            $('#jspsych-progressbar-container')[0].style.display='inline';
            jsPsych.setProgressBar(0);
            progress=0;
        }
    },
    countings={
        timeline:[
        {   
            type: 'html-keyboard-response',
            stimulus: function(){
                var html="<img src='"+jsPsych.timelineVariable('cue', true)+"'>";
                return html},
            choices: jsPsych.NO_KEYS,
            trial_duration:1000,
            on_finish:function(){
                progress=progress+1/3
                jsPsych.setProgressBar(progress);
            }
        }
    ],
    repetitions:3

    },
    {   
        type: 'html-keyboard-response',
        stimulus:function(){
            var num1=shuffleda_3_a[trials_3_a]%2;
            if(num1>0.5){
                var html="<img src='"+jsPsych.timelineVariable('outcome', true)+"'>";}
            else{
                var html="You won nothing";    
            }
            return html},
        choices:jsPsych.NO_KEYS,
        trial_duration:1000,
        on_finish:function(){
            trials_3_a=trials_3_a+1;
        },
        on_start:function(){
            $('#jspsych-progressbar-container')[0].style.display='none';
        }
    },
    {    
        type:'html-keyboard-response',
        stimulus:'Press space to continue',
        choices:['space']
    }
    ],
    timeline_variables: [
        { cue: s_f, outcome: coins},
        { cue: coins, outcome: s_s}
        ],
    randomize_order: true,
    repetitions: 2
    }


// summary_page of phase 3

summary_3={
    type:'html-keyboard-response',
    choices: ['space'],
    stimulus:function(){
        sum=sum+100; 
        return '<p>You have collected '+  sum + ' cents coins.</p>'+
                '<br>'+
                '<p>press space to the next phase </p>'

    }
}

// test phase

var files_p4='img/phase4_'

var index_p4=_.range(1,4);

var file_index_p4 = Array.from(index_p4,x=>files_p4+x+'.jpg')

// key map 
if (sequence==1){
    var ins_4_key_map=file_index_p4[1];
    var ins_4_w=file_index_p1[10]
    var ins_4_o=file_index_p1[11]
}else{
    var ins_4_key_map=file_index_p4[2];
    var ins_4_w=file_index_p1[12];
    var ins_4_o=file_index_p1[1];
}

// 
var hello_trial_4 = {
    type: 'instructions',
    pages: [   '<img src='+ file_index_p4[0] +'></img>',
                '<img src='+ file_index_p1[6] +'></img>',
                '<img src='+ file_index_p1[7] +'></img>',
                '<img src='+ file_index_p1[8] +'></img>',
                '<img src='+ ins_4_w +'></img>',
                '<img src='+ ins_4_o +'></img>',
                '<img src='+ file_index_p1[9] +'></img>',
                '<img src='+ ins_4_key_map +'></img>'
    ],
    on_finish:function(){
        jsPsych.setProgressBar(0);
    }
}


var countingt3={
    timeline:[
  counting={
      type: 'html-keyboard-response',
      stimulus: function (){
        return '<div style="font-size:25px" id="count">The current experiment will start in '+ time3 +' seconds, please put your fingers on w and o key</div>'},
      choices: jsPsych.NO_KEYS,
      trial_duration: 1000,
      on_finish:function(){
      time3=time3-1;
      }

      
  }],
      repetitions:3
  }
// phase 4 

// stimuli array 40 trials, 20 for cue1 and 20 for cue 2

   var trials_4=0;
   var arr4=[];
    for(var i = 1; i < 41; i++){
    arr4.push(i);
    }
    var shuffleda_4=jsPsych.randomization.repeat(arr4, 1);

    /* defining test timeline */
      
    fixation ={
        type: 'html-keyboard-response',
        stimulus: '<img src='+ gray_square +'></img>',
        choices: jsPsych.NO_KEYS,
        trial_duration: function (){
            timef=(Math.random()*(3-1)+1)*1000;
            jsPsych.data.addProperties({random_t:timef})
        return timef
        },
        on_finish:function(){
                trials_4=trials_4+1;
                left=0;
                right=0;
                jsPsych.setProgressBar(0);
        },
        on_start:function(){
            $('#jspsych-progressbar-container')[0].style.display='inline';
        }
    } 


    stimuli = {
        type: 'html-keyboard-response',
        choices: jsPsych.NO_KEYS,
        stimulus: function(){
            if (shuffleda_4[trials_4-1]<=20){
                return "<img src='"+ s1 +"'>" 
            }else {
                return "<img src='"+ s2 +"'>" 
            }
        },
        trial_duration:100,
        on_finish:function(){
            setTimeout(function(){
                if (jsPsych.getProgressBarCompleted()<1){
                    jsPsych.endCurrentTimeline()
                }
            },3000)
        }
    }
    
    
var trial ={
        timeline:[ 
    press = {
        type: 'html-keyboard-response',
        choices: ["w","o"],
        response_ends_trial: true,
        stimulus: function(){
            if(shuffleda_4[trials_4-1]<=10){
                var html="<img src='"+ yellow_star +"'>" 
             }else if (shuffleda_4[trials_4-1]>10&& shuffleda_4[trials_4-1]<=20){
                 var html="<img src='"+ blue_star +"'>" 
             }else if (shuffleda_4[trials_4-1]>20&& shuffleda_4[trials_4-1]<=30){
                 var html="<img src='"+ blue_moon +"'>" 
             }else{
                 var html="<img src='"+ yellow_moon +"'>" 
             }
             return html
        },
        on_finish:function(){
            var data = jsPsych.data.get().last(1).values()[0];
            if (sequence==1){
              if (data.key_press==jsPsych.pluginAPI.convertKeyCharacterToKeyCode('w')&&(shuffleda_4[trials_4-1]<=10||shuffleda_4[trials_4-1]>30)){
                        left=left+1;
                        jsPsych.setProgressBar(left*0.1);
                }
                    else if (data.key_press==jsPsych.pluginAPI.convertKeyCharacterToKeyCode('o')&&shuffleda_4[trials_4-1]>10&&shuffleda[trials_4-1]<=30){
                        right=right+1;
                        jsPsych.setProgressBar(right*0.1);
                    }
                }else if(sequence==2){
               if (data.key_press==jsPsych.pluginAPI.convertKeyCharacterToKeyCode('w')&&shuffleda_4[trials_4-1]>10&&shuffleda[trials_4-1]<=30){
                        left=left+1;
                        jsPsych.setProgressBar(left*0.1);
                       }
                    else if (data.key_press==jsPsych.pluginAPI.convertKeyCharacterToKeyCode('o')&&(shuffleda_4[trials_4-1]<=10||shuffleda_4[trials_4-1]>30)){
                        right=right+1;
                        jsPsych.setProgressBar(right*0.1);
                    }
                }
        var progress_bar_amount = jsPsych.getProgressBarCompleted();
           if (progress_bar_amount==1){
               jsPsych.endCurrentTimeline()
           } 
        },
        trial_duration:3000

    }  
    ],
    repetitions:1000
      }
   var nothing={
        type: 'html-keyboard-response',
        choices: jsPsych.NO_KEYS,
        stimulus:function(){
            if (jsPsych.getProgressBarCompleted()<1){
                return 'Your keypresses are too slow'
            }else{
                return ''
            }  
        },
        trial_duration:1000
    }

 var test_procedure4={
     timeline: [fixation,stimuli,trial,nothing],
     repetitions:2
     }

// finished the experiment

bye={
    type:'html-keyboard-response',
    choices: jsPsych.NO_KEYS,
    stimulus:function(){
        return '<p>You have collected '+ sum +' cents coins.</p>'+
                '<br>'+
                '<p>Thanks for participate the experiment. Please press F11 and close the window.</p>'

    },
    on_start:function(){
    $('#jspsych-progressbar-container')[0].style.display='none';
    }
}

// preload stimuli
file_index_p1.push(s1,s2,coins,gray_square,blue_moon,blue_star,yellow_moon,yellow_star,blue_f,yellow_f)

// load timeline
  timeline.push(full_screen);
  timeline.push(likert_page);
  timeline.push(hello_trial_1);
  timeline.push(countingt);
  timeline.push(test_procedure);
  timeline.push(hello_trial_2);
  timeline.push(countingt2);
  timeline.push(test_procedure2);
  timeline.push(hello_trial_2_a);
  timeline.push(countingt2_a)
  timeline.push(test_procedure2_a)
  timeline.push(summary_2);
  timeline.push(hello_trial_3);
  timeline.push(phase_3);
  timeline.push(hello_trial_3_a);
  timeline.push(phase_3_a)
  timeline.push(summary_3);
  timeline.push(hello_trial_4);
  timeline.push(countingt3);
  timeline.push(test_procedure4);
  timeline.push(bye);


  /*start experiment*/
jsPsych.init({
    timeline: timeline,
    preload_images:[file_index_p1,file_index_p2,file_index_p3,],
    exclusions: {
        min_width: 800,
        min_height: 600
      },
    show_progress_bar: true,
    auto_update_progress_bar: false
});