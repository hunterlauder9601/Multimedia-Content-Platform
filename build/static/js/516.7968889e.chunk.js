"use strict";(self.webpackChunkmedia_frontend=self.webpackChunkmedia_frontend||[]).push([[516],{6516:function(e,t,n){n.r(t),n.d(t,{default:function(){return p}});var o=n(4165),r=n(5861),a=n(9439),c=n(2791),i=n(184),s=function(e){var t=e.setSelectedPhotoIndex,n=e.index,o=e.url,r=e.title;return(0,i.jsx)("div",{onClick:function(){return t(n)},className:"bg-gray-800 hover:scale-105 duration-200 ease-in shadow-xl group cursor-pointer rounded-md",children:(0,i.jsx)("div",{className:"overflow-auto bg-scroll bg-cover bg-center bg-no-repeat w-full aspect-video\r scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-zinc-800 rounded-md",style:{backgroundImage:"url(".concat(o,")")},children:(0,i.jsx)("div",{className:"w-full min-h-full max-h-max group-hover:backdrop-blur-sm group-hover:backdrop-brightness-50\r duration-300 ease-in flex flex-col justify-center items-center",children:(0,i.jsx)("div",{className:"mx-2 opacity-0 group-hover:opacity-100 duration-300 ease-in\r text-white",children:(0,i.jsx)("p",{className:"text-2xl font-bold",children:r})})})})})},l=n(8617),u=n(9993),d=n(8257),p=function(e){var t=e.selectedPhotoIndex,n=e.setSelectedPhotoIndex,p=(0,c.useState)([]),h=(0,a.Z)(p,2),f=h[0],x=h[1],v=(0,c.useState)(""),m=(0,a.Z)(v,2),g=m[0],y=m[1],b=(0,c.useState)(!1),k=(0,a.Z)(b,2),j=k[0],w=k[1],Z=(0,c.useState)(null),C=(0,a.Z)(Z,2),A=C[0],N=C[1];(0,c.useEffect)((function(){var e=function(){var e=(0,r.Z)((0,o.Z)().mark((function e(){var t;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w(!0),e.prev=1,e.next=4,u.Z.getPhotos();case 4:t=e.sent,x(t.data),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),N(e.t0.message);case 11:w(!1);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}();e()}),[]);var z=f.filter((function(e){return e.title.toLowerCase().includes(g.toLowerCase())})),P=(0,c.useCallback)((function(){null!==t&&t<z.length-1&&n(t+1)}),[t,z.length,n]),B=(0,c.useCallback)((function(){null!==t&&t>0&&n(t-1)}),[t,n]),T=null!==t?z[t]:null;(0,c.useEffect)((function(){var e=function(e){"ArrowRight"===e.key?P():"ArrowLeft"===e.key?B():"Escape"===e.key&&n(null)};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[t,z.length,P,B,n]);var S=(0,c.useState)(!1),I=(0,a.Z)(S,2),E=I[0],L=I[1],V=function(){L(!E)};return T?(0,i.jsxs)("div",{onClick:function(){n(null)},className:"h-screen bg-zinc-900 p-4 relative text-white",children:[(0,i.jsx)("img",{src:T.url,alt:T.title,className:"absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[90%] max-h-[80%] object-cover cursor-pointer",onClick:function(e){e.stopPropagation(),V()}}),(0,i.jsx)(l.jTe,{size:30,onClick:function(e){e.stopPropagation(),B()},className:"absolute cursor-pointer left-4 bottom-[5%] lg:top-1/2 ".concat(0===t&&"opacity-25 cursor-not-allowed")}),(0,i.jsx)(l.WY3,{size:30,onClick:function(e){e.stopPropagation(),P()},className:"absolute cursor-pointer right-4 bottom-[5%] lg:top-1/2 ".concat(t===z.length-1&&"opacity-25 cursor-not-allowed")}),E&&(0,i.jsxs)("div",{className:"absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit bg-zinc-200 shadow-lg flex flex-col items-center justify-center rounded-2xl",onClick:function(e){e.stopPropagation()},children:[(0,i.jsx)("button",{className:"absolute top-4 right-4 bg-red-500 py-1 px-4 rounded-2xl hover:bg-red-700 focus:outline-none",onClick:function(e){e.stopPropagation(),V()},children:"X"}),(0,i.jsxs)("div",{className:"flex flex-col items-center justify-center text-black text-xl py-8 px-4 min-w-[80vw] md:min-w-[30rem]",children:[(0,i.jsx)("p",{className:"text-2xl font-bold mb-2",children:T.title}),(0,i.jsxs)("p",{className:"text-md",children:["Author(s): ",T.author,(0,i.jsx)("br",{}),"Description: ",T.description]})]})]})]}):(0,i.jsx)("div",{className:"w-auto min-h-[calc(100vh-43px)] max-h-fit bg-zinc-900 text-white flex items-center",children:(0,i.jsxs)("div",{className:"w-full max-w-6xl px-6 mx-auto flex flex-col pb-8 pt-[97px]",children:[(0,i.jsx)("div",{className:"mb-8",children:(0,i.jsx)("h1",{className:"text-4xl font-bold border-b-4 border-red-500 tracking-wider inline",children:"Photography"})}),(0,i.jsx)("input",{type:"text",placeholder:"Search photos...",value:g,onChange:function(e){return y(e.target.value)},className:"bg-zinc-800 shadow-sm w-full px-4 py-2 rounded-md mb-6"}),j?(0,i.jsx)("div",{className:"w-full flex justify-center",children:(0,i.jsx)(d.Z,{})}):A?(0,i.jsx)("div",{className:"w-full flex justify-center text-lg",children:A}):(0,i.jsx)("div",{className:"grid md:grid-cols-2 grid-cols-1 gap-10",children:z.map((function(e,t){return(0,i.jsx)(s,{setSelectedPhotoIndex:n,index:t,url:e.url,title:e.title},e.id)}))})]})})}},9993:function(e,t,n){var o=n(5671),r=n(3144),a=n(3263),c="http://localhost",i=function(){function e(){(0,o.Z)(this,e)}return(0,r.Z)(e,[{key:"getVideos",value:function(){return a.Z.get("".concat(c,"/videos"))}},{key:"postVideo",value:function(e,t,n){return a.Z.post("".concat(c,"/videos"),n,{params:{videoId:t},headers:{Authorization:"Bearer ".concat(e),"Content-Type":"application/json"}})}},{key:"updateVideo",value:function(e,t,n,o){return a.Z.put("".concat(c,"/videos/").concat(t),n,{params:{videoId:o},headers:{Authorization:"Bearer ".concat(e),"Content-Type":"application/json"}})}},{key:"deleteVideo",value:function(e,t){return a.Z.delete("".concat(c,"/videos/").concat(t),{headers:{Authorization:"Bearer ".concat(e)}})}},{key:"reorderVideos",value:function(e,t){return a.Z.put("".concat(c,"/videos/reorder"),t,{headers:{Authorization:"Bearer ".concat(e),"Content-Type":"application/json"}})}},{key:"getAudios",value:function(){return a.Z.get("".concat(c,"/audios"))}},{key:"postAudio",value:function(e,t){return a.Z.post("".concat(c,"/audios"),t,{headers:{Authorization:"Bearer ".concat(e),"Content-Type":"application/json"}})}},{key:"updateAudio",value:function(e,t,n){return a.Z.put("".concat(c,"/audios/").concat(t),n,{headers:{Authorization:"Bearer ".concat(e),"Content-Type":"application/json"}})}},{key:"deleteAudio",value:function(e,t){return a.Z.delete("".concat(c,"/audios/").concat(t),{headers:{Authorization:"Bearer ".concat(e)}})}},{key:"reorderAudios",value:function(e,t){return a.Z.put("".concat(c,"/audios/reorder"),t,{headers:{Authorization:"Bearer ".concat(e),"Content-Type":"application/json"}})}},{key:"getSecureUrl",value:function(e){return a.Z.get("".concat(c,"/s3Url"),{headers:{Authorization:"Bearer ".concat(e),"Content-Type":"application/json"}})}},{key:"uploadPhotoToS3",value:function(e,t){return a.Z.put(e,t,{headers:{"Content-Type":t.type}})}},{key:"deleteS3Object",value:function(e,t){return a.Z.delete("".concat(c,"/s3Url/").concat(t),{headers:{Authorization:"Bearer ".concat(e)}})}},{key:"getPhotos",value:function(){return a.Z.get("".concat(c,"/photos"))}},{key:"postPhoto",value:function(e,t){return a.Z.post("".concat(c,"/photos"),t,{headers:{Authorization:"Bearer ".concat(e),"Content-Type":"application/json"}})}},{key:"updatePhoto",value:function(e,t,n){return a.Z.put("".concat(c,"/photos/").concat(t),n,{headers:{Authorization:"Bearer ".concat(e),"Content-Type":"application/json"}})}},{key:"deletePhoto",value:function(e,t){return a.Z.delete("".concat(c,"/photos/").concat(t),{headers:{Authorization:"Bearer ".concat(e)}})}},{key:"reorderPhotos",value:function(e,t){return a.Z.put("".concat(c,"/photos/reorder"),t,{headers:{Authorization:"Bearer ".concat(e),"Content-Type":"application/json"}})}}]),e}();t.Z=new i}}]);
//# sourceMappingURL=516.7968889e.chunk.js.map