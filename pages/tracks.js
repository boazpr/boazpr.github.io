function getRandomTrack(tracks){
    return tracks[Math.floor(Math.random()*tracks.length)]; 
  }
  
  Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }
  

  function love(parent_id){
    $("#"+parent_id+" .favourite img").toggle()
  }

  function play(audio_id, parent_id){
    $("#"+parent_id+" #play_track img").toggle()
    document.getElementById(audio_id).play();
  }

  function pause(audio_id, parent_id){
    $("#"+parent_id+" #play_track img").toggle()
    document.getElementById(audio_id).pause();
  }

  function contend(pathname){
    if(pathname == "/tracks"){
      let contend = '';
      $.getJSON( "./tracks.json", function( data ) {
        let tracks = [];
        
        data.forEach(function(obj) { 
          tracks.push(obj);
        });

        tracks.forEach(function(track){
          contend = contend + `<div class="item">
                                  <div class="track" style="background-image: url(` + track.img_url.replace('file/d/', 'uc?id=').replace('/view?usp=sharing','').toString() + `);"> 
                                    <div class="track_player" id="jia` + tracks.indexOf(track) + `xiak"> 
                                      <div class="favourite" onclick="love('jia` + tracks.indexOf(track) + `xiak');">
                                        <img src="/assets/images/favorite_border.svg">
                                        <img src="/assets/images/favorite_fill.svg" style="display: none; opacity:1">
                                      </div> 
                                      <div id="play_track">
                                        <img src="/assets/images/play.svg" onclick="play('`+ track.audio_url.replace('https://drive.google.com/file/d/', 'https://docs.google.com/uc?export=download&id=').replace('/view?usp=sharing','').toString()+ `','jia` + tracks.indexOf(track) + `xiak');" id="play" >
                                        <img src="/assets/images/pause.svg" style="display:none;" onclick="pause('`+ track.audio_url.replace('https://drive.google.com/file/d/', 'https://docs.google.com/uc?export=download&id=').replace('/view?usp=sharing','').toString()+ `','jia` + tracks.indexOf(track) + `xiak');" id="pause">
                                        <audio id="`+ track.audio_url.replace('https://drive.google.com/file/d/', 'https://docs.google.com/uc?export=download&id=').replace('/view?usp=sharing','').toString() +`" src="`+ track.audio_url.replace('https://drive.google.com/file/d/', 'https://docs.google.com/uc?export=download&id=').replace('/view?usp=sharing','').toString() +`"></audio>
                                      </div>
                                      <div class="download">
                                        <img src="/assets/images/download.svg">
                                      </div> 
                                    </div>
                                  </div> 
                                  <div class="track_name">` + track.name + `</div>
                                <div class="track_dis">` +  track.sub + `</div>
                              </div>`
        })
        let track = tracks.random();
        $(".audio img").attr('src', track.img_url.replace('file/d/', 'uc?id=').replace('/view?usp=sharing','').toString())
        $(".name").empty().append(track.name)
        const audio = new Audio(
          track.audio_url.replace('https://drive.google.com/file/d/', 'https://docs.google.com/uc?export=download&id=').replace('/view?usp=sharing','').toString()
        );
        $("#body").append(contend)
      });
      return "";
    }
    console.log(pathname)
  }

  document.addEventListener('play', function(e){
    var allAudios = document.getElementsByTagName('audio');
    for(var i = 0; i<allAudios.length; i++){
        if(allAudios[i] != e.target){
            allAudios[i].pause();
        }
    }    
}, true);

 
  