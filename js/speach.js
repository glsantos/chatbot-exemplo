// Test browser support
window.SpeechRecognition = window.SpeechRecognition ||
window.webkitSpeechRecognition ||
null;
 
//caso nÃ£o suporte esta API DE VOZ            
if (window.SpeechRecognition === null) {
	document.getElementById('unsupported').classList.remove('hidden');
}else {
	//......

	var recognizer = new window.SpeechRecognition();
	var transcription = document.getElementById("transcription");

	//Para o reconhecedor de voz, nÃ£o parar de ouvir, mesmo que tenha pausas no usuario
    recognizer.continuous = false;

    recognizer.onresult = function(event){
     transcription.textContent = "";
     for (var i = event.resultIndex; i < event.results.length; i++) {
     	if(event.results[i].isFinal){
        				//transcription.textContent = event.results[i][0].transcript+' (Taxa de acerto [0/1] : ' + event.results[i][0].confidence + ')';
        				msg = event.results[i][0].transcript;

        				//manda para o Conversation

        				var minhadiv = document.getElementById("chat");
        				$.ajax({
//        				  url: 'https://ykp-teste.mybluemix.net/conversa/' + msg,
//        				  url: 'https://poc-agillitas.mybluemix.net/conversa/' + msg,
				          url: 'http://localhost:8080/conversa/' + msg,
				          method: 'get',

				          beforeSend: function() {
				                $('#progress').html('<img src="img/loader.gif" width="20"> SysBank esta digitando...');
				                var tt = $('#pergunta').val();
				                $('#pergunta').val('');
				                
				                $('#msg').append('<li class="mar-btm">');
				                $('#msg').append('<div class="media-right"><img src="img/user.PNG" class="img-circle img-sm" alt="Profile Picture"></div>');
				                $('#msg').append('<div class="media-body pad-hor speech-right"><div class="speech"><a href="#" class="media-heading">VocÃª</a><p>'+msg+'</p><p class="speech-time"><i class="fa fa-clock-o fa-fw"></i>09:23AM</p>');
				                $('#msg').append('</div></div></li>');
				               minhadiv.scrollTop = minhadiv.scrollHeight;
				          },

				          success: function(data){

				          		if (data == "ligaCam") {
				                    console.log('Abrindo cam.');
				                    $('#btnPag').click();
				                    return;
				                  }

				                var x = data.split("|");

				                if (x[0] == "true") {
				                  console.log('audio tocando..');
				                  var playAudio = document.getElementById("playAudio");
				                  playAudio.play();
				                }     
				                  
				                  $('#progress').html('');
				                  $('#msg').append('<li class="mar-btm">');
				                  $('#msg').append('<div class="media-left"><img src="img/wat.jpg" class="img-circle img-sm" alt="Profile Picture"></div>');
				                  $('#msg').append('<div class="media-body pad-hor"><div class="speech"><a href="#" class="media-heading">SysBank</a><p>'+x[1]+'</p><p class="speech-time"><i class="fa fa-clock-o fa-fw"></i>09:23AM</p>');
				                  $('#msg').append('</div></div></li>');
				                  minhadiv.scrollTop = minhadiv.scrollHeight;
				                }
				        });





     	}else{
		       	//transcription.textContent += event.results[i][0].transcript;
     	}
     }
    }


    document.querySelector("#rect").addEventListener("click",function(){
    		  try {
		  	    recognizer.start();
		  	  } catch(ex) {
		  	  	alert("error: "+ex.message);
		  	  }
   	});


}