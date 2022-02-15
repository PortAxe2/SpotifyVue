import{o as l,c as A,u as I,R as U,a as u,t as d,r as k,b as r,w as N,d as b,v as S,e as x,p as v,f as T,g as p,h as g,i as R,F as C,j as M,k as Q,l as q,m as B,n as D}from"./vendor.4c5ca304.js";const V=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerpolicy&&(n.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?n.credentials="include":s.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}};V();const F={setup(e){return(t,a)=>(l(),A(I(U)))}};var y=(e,t)=>{const a=e.__vccOpts||e;for(const[i,s]of t)a[i]=s;return a};const O={props:{buttonText:String},methods:{},data(){return{}}},j={class:"interactBtn"};function z(e,t,a,i,s,n){return l(),u("button",j,d(a.buttonText),1)}var E=y(O,[["render",z],["__scopeId","data-v-12b1c8a2"]]);const H={components:{GreenButton:E},methods:{buttonRedirect:function(){localStorage.setItem("client_id_spotify",this.client_id),localStorage.setItem("client_secret_spotify",this.client_secret);var e={client_id:this.client_id,response_type:"code",redirect_uri:"https://mini-player-for-spotify.web.app/callback",state:Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2),scope:"user-read-private user-read-email app-remote-control streaming playlist-read-collaborative user-read-currently-playing user-library-read"},t=new URLSearchParams(e);window.location.href=`https://accounts.spotify.com/authorize?${t.toString()}`}},data(){return{client_id:"",client_secret:""}}},_=e=>(v("data-v-20df4ce0"),e=e(),T(),e),G={class:"wrapper"},K={class:"hello"},W=_(()=>r("h1",null,"Mini Player for Spotify",-1)),Y=_(()=>r("br",null,null,-1)),J={class:"textDiv"},X=_(()=>r("h3",null,"Project Description",-1)),Z=_(()=>r("hr",null,null,-1)),ee=_(()=>r("br",null,null,-1)),te=_(()=>r("p",null,"This Mini Player for Spotify allows the user to listen to control playback and queue tracks with minimal screen space. ",-1)),re=_(()=>r("br",null,null,-1)),se={class:"clientForm"},ae={class:"inputDiv"},ne=_(()=>r("label",{for:"clientId"},"Client ID",-1)),ie={class:"inputDiv"},oe=_(()=>r("label",{for:"clientSecret"},"Client Secret",-1));function le(e,t,a,i,s,n){const o=k("green-button");return l(),u("div",G,[r("div",K,[W,Y,r("div",J,[X,Z,ee,te,re,r("form",{onSubmit:t[2]||(t[2]=N(()=>{},["prevent"]))},[r("div",se,[r("div",ae,[ne,b(r("input",{type:"text",name:"clientID","onUpdate:modelValue":t[0]||(t[0]=f=>s.client_id=f),placeholder:"Client ID..."},null,512),[[S,s.client_id]])]),r("div",ie,[oe,b(r("input",{type:"text",name:"clientSecret","onUpdate:modelValue":t[1]||(t[1]=f=>s.client_secret=f),placeholder:"Client secret..."},null,512),[[S,s.client_secret]])])])],32),x(o,{buttonText:"Continue",onClick:n.buttonRedirect},null,8,["onClick"])])])])}var ce=y(H,[["render",le],["__scopeId","data-v-20df4ce0"]]);const ue={methods:{},data(){return{code:"",state:"",client_id:"",client_secret:"",signedIn:null}},mounted(){this.client_id=localStorage.getItem("client_id_spotify"),this.client_secret=localStorage.getItem("client_secret_spotify");var e=window.location.search,t=new URLSearchParams(e);this.code=t.get("code"),this.state=t.get("state"),console.log(this.code),console.log(this.state);var a=new URLSearchParams({grant_type:"authorization_code",code:this.code,redirect_uri:"https://mini-player-for-spotify.web.app/callback",show_dialog:!0}),i={headers:{Authorization:`Basic ${btoa(this.client_id+":"+this.client_secret)}`,"Content-Type":"application/x-www-form-urlencoded"}};p.post("https://accounts.spotify.com/api/token",a.toString(),i).then(s=>{this.signedIn=!0,console.log(s),localStorage.setItem("spotifyToken",s.data.access_token),localStorage.setItem("refreshSpotifyToken",s.data.refresh_token),window.open("https://mini-player-for-spotify.web.app/dashboard","popup","width=320,height=700")}).catch(()=>{this.signedIn=!1})}},de={key:0},pe=r("h1",null,"Signed In",-1),_e=[pe],me={key:1},he=r("h1",null,"Error Occured",-1),ye=r("button",null,"Go Home",-1);function ge(e,t,a,i,s,n){const o=k("RouterLink");return l(),u("div",null,[s.signedIn?(l(),u("div",de,_e)):g("",!0),s.signedIn?g("",!0):(l(),u("div",me,[he,x(o,{to:"/"},{default:R(()=>[ye]),_:1})]))])}var fe=y(ue,[["render",ge]]);const m=p.create({baseURL:"https://api.spotify.com/v1/",headers:{Authorization:`Bearer ${localStorage.getItem("spotifyToken")}`,"Content-Type":"application/json"}});var ke={pausePlayback(){return m.put("me/player/pause")},startPlayback(){return m.put("me/player/play")},skipTrack(){return m.post("me/player/next")},previousTrack(){return m.post("me/player/previous")},setTrackTime(e){return m.put(`me/player/seek?position_ms=${e}`)},playSelectedTrack(e){m.post(`me/player/queue?uri=spotify:track:${e}`).then(t=>{this.skipTrack()})}},ve={getPlaylistFirstTrack(e){m.get(`playlists/${e}/tracks?limit=1`).then(t=>t.data.items[0])},getPlaylists(){var e=[];return m.get("me/playlists").then(t=>{var a=t.data.items;a.map(i=>{e.push({id:i.id,name:i.name,owner:i.owner.display_name,coverArtUrl:i.images[0].url})})}),e}},h={player:ke,playlists:ve};const Te={methods:{msToTime:function(e){var t=Math.floor(e/1e3%60),a=Math.floor(e/1e3/60%60);return t<10?`${a}:0${t}`:`${a}:${t}`},pausePlayback:function(){h.player.pausePlayback()},startPlayback:function(){h.player.startPlayback()},skipTrack:function(){h.player.skipTrack()},previousTrack:function(){h.player.previousTrack()},setTrackTime:function(){h.player.setTrackTime(this.$refs.trackProgressBar.value)}},data(){return{rangeSliderValue:this.getRangeValue}},props:{currentSongName:String,currentSongArtist:String,currentCoverArt:String,currentAlbumName:String,explicit:Boolean,playing:Boolean,currentTrackLength:Number,currentTrackTime:Number},computed:{getCurrentTrackTime(){return this.msToTime(this.currentTrackTime)},getCurrentTrackLength(){return this.msToTime(this.currentTrackLength)},bgImageStyle(){return console.log(this.currentCoverArt),{"background-image":`url (${this.currentCoverArt})`}}}},be=e=>(v("data-v-69eafcb3"),e=e(),T(),e),Se=be(()=>r("link",{href:"https://fonts.googleapis.com/icon?family=Material+Icons",rel:"stylesheet"},null,-1)),xe={class:"wrapper"},Ce={ref:"albumImageElement",class:"albumDiv"},Pe=["src"],$e={class:"playbackControl"},we={class:"timeTrack"},Ae=["max","value"],Le={class:"trackMeta"},Ie={class:"nameArtist"},Ue={class:"nameExplicit"},Ne={class:"trackName"},Re={key:0,class:"material-icons explicit"},Me={class:"trackName"};function Qe(e,t,a,i,s,n){return l(),u(C,null,[Se,r("div",xe,[r("div",Ce,[r("img",{src:a.currentCoverArt,alt:""},null,8,Pe)],512),r("div",$e,[r("div",we,[r("span",null,d(this.getCurrentTrackTime),1),r("input",{onChange:t[0]||(t[0]=(...o)=>n.setTrackTime&&n.setTrackTime(...o)),type:"range",ref:"trackProgressBar",class:"trackTime",name:"trackProgress",min:"0",max:a.currentTrackLength,value:a.currentTrackTime,step:"1000"},null,40,Ae),r("span",null,d(this.getCurrentTrackLength),1)]),r("div",null,[r("span",{class:"buttonControl material-icons",onClick:t[1]||(t[1]=(...o)=>n.previousTrack&&n.previousTrack(...o))},"skip_previous"),a.playing?(l(),u("span",{key:0,class:"buttonControl material-icons",onClick:t[2]||(t[2]=(...o)=>n.pausePlayback&&n.pausePlayback(...o))},"pause_circle_filled")):g("",!0),a.playing?g("",!0):(l(),u("span",{key:1,class:"buttonControl material-icons",onClick:t[3]||(t[3]=(...o)=>n.startPlayback&&n.startPlayback(...o))},"play_arrow")),r("span",{class:"buttonControl material-icons",onClick:t[4]||(t[4]=(...o)=>n.skipTrack&&n.skipTrack(...o))},"skip_next")]),r("div",Le,[r("div",Ie,[r("div",Ue,[r("p",Ne,d(a.currentSongName),1),a.explicit?(l(),u("span",Re,"explicit")):g("",!0)]),r("p",null,"by "+d(a.currentSongArtist),1)]),r("div",Me,[r("p",null,d(a.currentAlbumName),1)])])])])],64)}var qe=y(Te,[["render",Qe],["__scopeId","data-v-69eafcb3"]]),Be="/assets/Spotify_Icon_RGB_White.608bf92e.png";const De={emits:["play-selected-track","add-to-queue"],props:{title:String,artist:String,album:String,coverArtUrl:String,id:String},methods:{}},P=e=>(v("data-v-e88e1b26"),e=e(),T(),e),Ve=P(()=>r("link",{href:"https://fonts.googleapis.com/icon?family=Material+Icons",rel:"stylesheet"},null,-1)),Fe={class:"smallTrack"},Oe=P(()=>r("img",{src:Be,style:{height:"22px",width:"22px","margin-right":"8px"},alt:""},null,-1)),je={class:"trackData"},ze=P(()=>r("span",{class:"material-icons"},"play_arrow",-1)),Ee=["src"],He={class:"smallTrackData"},Ge={class:"title"},Ke={class:"artistAndAlbum"},We={class:"addToQueue"};function Ye(e,t,a,i,s,n){return l(),u(C,null,[Ve,r("div",Fe,[Oe,r("div",je,[r("div",{class:"albumArt",onClick:t[0]||(t[0]=o=>e.$emit("play-selected-track",a.id))},[ze,r("img",{src:a.coverArtUrl,width:"50",height:"50",alt:""},null,8,Ee)]),r("div",He,[r("span",Ge,d(a.title),1),r("span",Ke,d(a.artist)+" - "+d(a.album),1)])]),r("div",We,[r("span",{onClick:t[1]||(t[1]=o=>e.$emit("add-to-queue",a.id)),class:"material-icons"},"queue")])])],64)}var L=y(De,[["render",Ye],["__scopeId","data-v-e88e1b26"]]);const Je={emits:["select-playlist"],components:{SmallTrack:L},props:{coverURL:String,name:String,owner:String,id:String}},Xe=["src"],Ze={class:"info"},et={style:{"font-weight":"600"}};function tt(e,t,a,i,s,n){return l(),u("div",{onClick:t[0]||(t[0]=o=>e.$emit("select-playlist",a.id,a.name)),class:"playlist"},[r("img",{src:a.coverURL,alt:"playlist image"},null,8,Xe),r("div",Ze,[r("p",et,d(a.name),1),r("p",null,"By "+d(a.owner),1)])])}var rt=y(Je,[["render",tt],["__scopeId","data-v-5eb098ae"]]);const st={components:{Player:qe,SmallTrack:L,Playlist:rt},methods:{filterList:function(){console.log(this.searchQuery)},getPlaylistFirstTrack:function(e){return h.playlists.getPlaylistFirstTrack(e)},selectPlaylist:function(e,t){t!=this.playlistName&&(this.playlistName=t,this.playlistURL=`https://open.spotify.com/playlist/${e}`,this.queueTracks=[],this.generateQueue(this.getPlaylistFirstTrack(e)))},addToQueue:function(e){p.post(`/v1/me/player/queue?uri=spotify:track:${e}`).then(t=>{this.$refs.queuePopUp.classList+=" queuePopUp-show",setTimeout(()=>{this.$refs.queuePopUp.classList.remove("queuePopUp-show")},2e3)})},playSelectedTrack:function(e){h.player.playSelectedTrack(e)},getPlaylists:function(){this.playlists=h.playlists.getPlaylists(),console.log(this.playlists)},generateQueue:function(e){console.log(this.nextUrlContext),p.get(e).then(t=>{var a=this.isPlaylist?t.data.tracks.items:t.data.items;a.map(i=>{this.queueTracks.push({id:i.track.id,name:i.track.name,artist:i.track.artists[0].name,album:i.track.album.name,coverArtUrl:i.track.album.images[2].url})}),this.nextUrlContext=this.isPlaylist?t.data.tracks.next:t.data.next})},loadMore:function(){this.nextUrlContext&&this.generateQueue(this.nextUrlContext)},getCurrentTrack:function(){p.get("/v1/me/player/currently-playing").then(e=>{if(this.currentTrackTime=e.data.progress_ms,this.currentTrackLength=e.data.item.duration_ms,this.currentSongName=e.data.item.name,this.currentSongArtist=e.data.item.artists[0].name,this.currentAlbumName=e.data.item.album.name,this.currentCoverArt=e.data.item.album.images[0].url,this.currentSongId=e.data.item.id,this.explicit=e.data.item.explicit,this.playing=e.data.is_playing,this.isPlaylist=!!e.data.context,!(this.playlistName=="Your Library"&&e.data.context==null)){try{if(this.playlistURL==e.data.context.href)return}catch(t){console.log(t)}this.queueTracks=[],this.isPlaylist?p.get(e.data.context.href).then(t=>{this.playlistURL=t.data.href,this.playlistName=t.data.name,this.nextUrlContext=this.playlistURL,console.log(t),this.generateQueue(this.nextUrlContext)}):(this.playlistName="Your Library",this.nextUrlContext="/v1/me/tracks",this.generateQueue(this.nextUrlContext))}})},refreshTrack:function(){setInterval(this.getCurrentTrack,1e3)}},data(){return{accessToken:localStorage.getItem("spotifyToken"),refreshToken:localStorage.getItem("refreshSpotifyToken"),currentSongName:null,currentSongArtist:null,currentAlbumName:null,currentCoverArt:null,currentSongId:null,explicit:!1,playing:!1,playlists:[],currentTrackLength:0,currentTrackTime:0,isPlaylist:!1,playlistName:"",playlistURL:"",nextUrlContext:"",allSongs:[],queueTracks:[],searchQuery:""}},mounted(){p.defaults.baseURL="https://api.spotify.com",p.defaults.headers.common.Authorization=`Bearer ${this.accessToken}`,p.defaults.headers.common["Content-Type"]="application/json",this.getCurrentTrack(),this.getPlaylists(),this.refreshTrack()}},$=e=>(v("data-v-534d6a56"),e=e(),T(),e),at={class:"wrapper"},nt={ref:"queuePopUp",class:"queuePopUp"},it=$(()=>r("p",null,"Added to queue!",-1)),ot=[it],lt={class:"queuedSongs"},ct={class:"searchDiv"},ut=$(()=>r("span",{class:"material-icons"},"search",-1)),dt=$(()=>r("hr",null,null,-1)),pt={class:"trackList"};function _t(e,t,a,i,s,n){const o=k("player"),f=k("small-track");return l(),u("div",at,[r("div",nt,ot,512),x(o,{ref:"playerComponent",currentSongName:s.currentSongName,currentSongArtist:s.currentSongArtist,currentAlbumName:s.currentAlbumName,currentCoverArt:s.currentCoverArt,explicit:s.explicit,playing:s.playing,currentTrackLength:s.currentTrackLength,currentTrackTime:s.currentTrackTime},null,8,["currentSongName","currentSongArtist","currentAlbumName","currentCoverArt","explicit","playing","currentTrackLength","currentTrackTime"]),r("div",lt,[r("h2",null,d(s.playlistName),1),r("div",ct,[ut,b(r("input",{class:"searchInput",type:"text",onKeyup:t[0]||(t[0]=(...c)=>n.filterList&&n.filterList(...c)),"onUpdate:modelValue":t[1]||(t[1]=c=>s.searchQuery=c),placeholder:"Type search here..."},null,544),[[S,s.searchQuery]])]),dt,r("ul",pt,[(l(!0),u(C,null,M(s.queueTracks,c=>(l(),u("li",{key:c.id},[c.name.toLowerCase().includes(s.searchQuery.toLowerCase())||c.artist.toLowerCase().includes(s.searchQuery.toLowerCase())||s.searchQuery.length==0?(l(),A(f,{key:0,title:c.name,artist:c.artist,album:c.album,coverArtUrl:c.coverArtUrl,id:c.id,onPlaySelectedTrack:n.playSelectedTrack,onAddToQueue:n.addToQueue},null,8,["title","artist","album","coverArtUrl","id","onPlaySelectedTrack","onAddToQueue"])):g("",!0)]))),128))]),r("span",{onClick:t[2]||(t[2]=(...c)=>n.loadMore&&n.loadMore(...c)),class:"loadMore"},"Load More")])])}var mt=y(st,[["render",_t],["__scopeId","data-v-534d6a56"]]);const ht=Q({history:q("/"),routes:[{path:"/",name:"Home",component:ce},{path:"/callback",name:"callback",component:fe},{path:"/dashboard",name:"dashboard",component:mt}]}),w=B(F);w.use(D());w.use(ht);w.mount("#app");