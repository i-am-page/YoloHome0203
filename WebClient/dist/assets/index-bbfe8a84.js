import{g as F,j as n,k as _,l as r,m as s,q as v,x as W,y as d,z as M,A as u,B as D,C,D as A,E as $,F as p,G as B,H as I,u as w,I as Y}from"./@vue-9167488b.js";import"./flowbite-404212fa.js";import{c as G,a as K}from"./vue-router-51fb59af.js";import{a as X}from"./axios-4d564c32.js";import{g as J}from"./gsap-7d9a9c74.js";import{h as y}from"./moment-a9aaa855.js";import{L as f}from"./vue-chartjs-1b72f7d1.js";import{C as T,a as R,b as N,P as j,c as z,p as x,d as P,e as H,i as O}from"./chart.js-31475a6b.js";/* empty css                     */import"./@popperjs-f3391c26.js";import"./@kurkle-b1b89bbc.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const g of l.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&i(g)}).observe(document,{childList:!0,subtree:!0});function a(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(o){if(o.ep)return;o.ep=!0;const l=a(o);fetch(o.href,l)}})();const m=(e,t)=>{const a=e.__vccOpts||e;for(const[i,o]of t)a[i]=o;return a},Q={};function tt(e,t){const a=F("router-view");return n(),_(a)}const et=m(Q,[["render",tt]]);const st={class:"block text-sm font-medium text-slate-700 mb-2 text-gray-900"},at=["type","placeholder","value","readonly"],L={__name:"InputField",props:["label","type","placeholder","modelValue","readOnly"],emits:["update:modelValue"],setup(e){const t=e;return(a,i)=>(n(),r("div",null,[s("label",st,v(t.label),1),s("div",null,[s("input",{type:t.type,placeholder:t.placeholder,value:t.modelValue,readonly:t.readOnly,onInput:i[0]||(i[0]=o=>a.$emit("update:modelValue",o.target.value)),class:"border block w-full p-2 text-sm rounded-lg focus:ring-blue-500 focus:border-e-500"},null,40,at)])]))}},c=X.create({baseURL:"https://yolohome-0203-server-fb7b81448a09.herokuapp.com",timeout:15e3,headers:{"Content-Type":"application/json"}});const ot={class:"login-section bg-cover bg-center w-full h-screen"},it={class:"flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"},nt={class:"w-100 h-100 w-full rounded-lg bg-opacity-50 backdrop-blur-md bg-white shadow md:mt-0 sm:max-w-md xl:p-0"},rt={class:"p-6 space-y-4 md:space-y-6 sm:p-8"},lt=s("h1",{class:"text-xl font-bold text-center leading-tight tracking-tight md:text-2xl"}," Smart Home Mangement ",-1),dt={data(){return{username:"",password:""}},mounted(){localStorage.removeItem("token"),console.log(localStorage)},methods:{authenticate(){window.faceio.authenticate({locale:"auto"}).then(e=>{this.user=e.payload.whoami,this.username=e.facialId,this.password="123",this.login()}).catch(e=>{console.log(e)})},register(){window.faceio.enroll({locale:"auto",payload:{whoami:123456,email:"john.doe@example.com"}}).then(e=>{alert(`User Successfully Enrolled! Details:
           Unique Facial ID: ${e.facialId}
           Enrollment Date: ${e.timestamp}
           Gender: ${e.details.gender}
           Age Approximation: ${e.details.age}`),console.log(e),c.post("/account/register",{username:e.facialId,password:"123"})}).catch(e=>{console.log(e)})},async login(){try{const e=await c.post("/account/authenticate",{username:this.username,password:this.password});e.data&&e.data.token?(localStorage.setItem("token",e.data.token),this.$router.push("/dashboard")):alert("Something wrong!")}catch(e){e.response&&e.response.status===400&&alert("Invalid username or password")}}}},ct=Object.assign(dt,{__name:"HomeView",setup(e){return(t,a)=>{const i=F("AuthenticationComponent");return n(),r("section",ot,[s("div",it,[s("div",nt,[s("div",rt,[lt,s("form",{class:"space-y-4 md:space-y-6",action:"#",onKeyup:a[5]||(a[5]=W((...o)=>t.login&&t.login(...o),["enter"]))},[s("div",null,[d(L,{label:"",type:"text",placeholder:"Username",modelValue:t.username,"onUpdate:modelValue":a[0]||(a[0]=o=>t.username=o)},null,8,["modelValue"])]),s("div",null,[d(L,{label:"",type:"password",placeholder:"Password",modelValue:t.password,"onUpdate:modelValue":a[1]||(a[1]=o=>t.password=o)},null,8,["modelValue"])]),s("button",{type:"button",onClick:a[2]||(a[2]=(...o)=>t.login&&t.login(...o)),class:"w-60 block mx-auto text-white bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"}," Sign in "),s("button",{type:"button",onClick:a[3]||(a[3]=(...o)=>t.authenticate&&t.authenticate(...o)),class:"w-60 block mx-auto text-white bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"}," Authenticate "),s("button",{type:"button",onClick:a[4]||(a[4]=(...o)=>t.register&&t.register(...o)),class:"w-60 block mx-auto text-white bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"}," Register ")],32),d(i)])])])])}}}),ht="/assets/ss_logo-6b706e9a.png";const ut={data(){return{sidebarToggle:!1}}},E=e=>(C("data-v-196aa441"),e=e(),A(),e),gt={class:"sticky top-0 z-50 flex w-full bg-gray-50 bg-mybg"},mt={class:"flex flex-grow items-center justify-between py-4 px-4 md:px-6 2xl:px-11"},pt={class:"flex items-center gap-2 sm:gap-4"},ft={class:"relative block h-5 w-5 cursor-pointer"},bt={class:"block absolute right-0 h-full w-full"},vt={class:"block absolute right-0 h-full w-full rotate-45"},_t=E(()=>s("a",{class:"block flex-shrink-0 lg:hidden",href:"index.html"},[s("img",{src:"https://via.placeholder.com/150",alt:"Logo",class:"w-8 h-8"})],-1)),wt=E(()=>s("div",{class:"hidden sm:block w-full max-w-md mx-auto"},[s("form",{action:"https://formbold.com/s/unique_form_id",method:"POST"},[s("div",{class:"relative"},[s("input",{type:"text",placeholder:"Search...",class:"w-full bg-transparent pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"})])])],-1)),yt=D('<div class="flex items-center gap-3 2xsm:gap-7" data-v-196aa441><ul class="flex items-center gap-2 2xsm:gap-4" data-v-196aa441></ul><div class="relative" data-v-196aa441><a class="flex items-center gap-4" href="#" data-v-196aa441><span class="hidden text-right lg:block" data-v-196aa441><span class="block text-sm font-medium text-white font-mono" data-v-196aa441>SAIGON-SOFTWARE</span><span class="block text-xs font-medium text-white font-mono" data-v-196aa441>DADN-YoloHome0203</span></span><span class="h-12 w-12 overflow-hidden rounded-full" data-v-196aa441><img src="'+ht+'" alt="User" class="h-full w-full object-cover" data-v-196aa441></span></a></div></div>',1);function xt(e,t,a,i,o,l){return n(),r("header",gt,[s("div",mt,[s("div",pt,[s("button",{class:"z-50 block rounded border border-gray-300 bg-white p-2 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:hidden",onClick:t[0]||(t[0]=M(g=>o.sidebarToggle=!o.sidebarToggle,["stop"]))},[s("span",ft,[s("span",bt,[s("span",{class:u(["relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-gray-700 transition-all duration-300 ease-in-out dark:bg-gray-300",{"!w-full delay-200":!o.sidebarToggle}])},null,2),s("span",{class:u(["relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-gray-700 transition-all duration-300 ease-in-out dark:bg-gray-300",{"!w-full delay-300":!o.sidebarToggle}])},null,2),s("span",{class:u(["relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-gray-700 transition-all duration-300 ease-in-out dark:bg-gray-300",{"!w-full delay-400":!o.sidebarToggle}])},null,2)]),s("span",vt,[s("span",{class:u(["absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-gray-700 transition-all duration-300 ease-in-out dark:bg-gray-300",{"!h-0 delay-200":!o.sidebarToggle}])},null,2),s("span",{class:u(["absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-gray-700 transition-all duration-300 ease-in-out dark:bg-gray-300",{"!h-0 delay-300":!o.sidebarToggle}])},null,2)])])]),_t]),wt,yt])])}const S=m(ut,[["render",xt],["__scopeId","data-v-196aa441"]]);const k=e=>(C("data-v-84e00afe"),e=e(),A(),e),kt={class:"bg-gradient-light absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden transition-all duration-300 ease-linear dark:bg-gray-800 lg:static lg:translate-x-0"},$t=k(()=>s("div",{class:"flex items-center justify-between gap-2 px-6 py-6 mt-10"},[s("img",{src:"",alt:""})],-1)),Dt={class:"h-full no-scrollbar flex flex-col overflow-y-auto transition-all duration-300 ease-linear"},Ct={class:"h-80 mt-5 py-4 px-4 lg:mt-9 lg:px-6","x-data":"{selected: $persist('Dashboard')}"},At=k(()=>s("h3",{class:"mb-4 ml-4 text-sm font-medium text-white font-mono"}," MENU ",-1)),St={class:"mb-6 flex flex-col gap-1.5"},Vt=D('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-84e00afe><rect x="3" y="3" width="7" height="7" data-v-84e00afe></rect><rect x="14" y="3" width="7" height="7" data-v-84e00afe></rect><rect x="14" y="14" width="7" height="7" data-v-84e00afe></rect><rect x="3" y="14" width="7" height="7" data-v-84e00afe></rect></svg>',1),Lt=k(()=>s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[s("path",{d:"M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"})],-1)),Ft={class:"h-96 relative"},Mt={class:"absolute bottom-0 w-full mb-6 flex flex-col gap-1.5"},Bt=k(()=>s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[s("path",{d:"M16 17l5-5-5-5M19.8 12H9M13 22a10 10 0 1 1 0-20"})],-1)),It={methods:{async logout(){this.$router.push("/")},changetodb(){this.$router.push("/dashboard")},changetostatistics(){this.$router.push("/statistics")}}},Tt=Object.assign(It,{__name:"Navigation",setup(e){return(t,a)=>(n(),r("aside",kt,[$t,s("div",Dt,[s("nav",Ct,[s("div",null,[At,s("ul",St,[s("li",null,[s("a",{class:"group font-mono relative flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white transition duration-300 ease-in-out hover:bg-blue-100 dark:hover:bg-gray-700",onClick:a[0]||(a[0]=(...i)=>t.changetodb&&t.changetodb(...i))},[Vt,$(" Dashboard ")])]),s("li",null,[s("a",{class:"group font-mono relative flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white transition duration-300 ease-in-out hover:bg-blue-100 dark:hover:bg-gray-700",onClick:a[1]||(a[1]=(...i)=>t.changetostatistics&&t.changetostatistics(...i))},[Lt,$(" Statistics ")])])])]),s("div",Ft,[s("ul",Mt,[s("li",null,[s("a",{class:"group font-mono relative flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white transition duration-300 ease-in-out hover:bg-blue-100 dark:hover:bg-gray-700",onClick:a[2]||(a[2]=(...i)=>t.logout&&t.logout(...i))},[Bt,$(" Log out ")])])])])])])]))}}),V=m(Tt,[["__scopeId","data-v-84e00afe"]]);const Rt={props:{attr:{type:String,required:!1,default:""},custom:{type:String,required:!1,default:!0},value:{type:Number,required:!1,default:.5},threshold:{type:Number,required:!1,default:null},min:{type:Number,required:!1,default:0},max:{type:Number,required:!1,default:100},decimals:{type:Number,required:!1,default:0}},data(){return{tweenedValue:null,realThreshold:null,centerX:50,centerY:50,innerArcRadius:20,outerArcRadius:30,arcStartAngle:135,arcEndAngle:405,animationInterval:null}},computed:{angleRange(){return this.arcEndAngle-this.arcStartAngle},scaledValue(){return(this.tweenedValue-this.min)/(this.max-this.min)},scaledThreshold(){return(this.realThreshold-this.min)/(this.max-this.min)},valueAngle(){let e=this.scaledValue*this.angleRange;return this.arcStartAngle+e},thresholdAngle(){return this.scaledThreshold*this.angleRange+this.arcStartAngle},exceeding(){return this.scaledValue>=this.scaledThreshold},belowNeedlePathData(){return this.exceeding?this.getArcPathData(this.arcStartAngle,this.thresholdAngle):this.getArcPathData(this.arcStartAngle,this.valueAngle)},gapPathData(){return this.exceeding?this.getArcPathData(this.thresholdAngle,this.valueAngle):this.getArcPathData(this.valueAngle,this.thresholdAngle)},aboveThresholdPathData(){return this.exceeding?this.getArcPathData(this.valueAngle,this.arcEndAngle):this.getArcPathData(this.thresholdAngle,this.arcEndAngle)}},watch:{value(){this.animateNeedle()},threshold(){this.setupThreshold(),this.animateNeedle()}},methods:{goToDetailPage(){this.$router.push({path:"/details",query:{type:this.attr}})},getCirclePoint(e,t){let a=this.centerX+Math.cos(t/180*Math.PI)*e,i=this.centerY+Math.sin(t/180*Math.PI)*e;return{x:a,y:i}},getArcPathData(e,t){let a=t-e,i=this.getCirclePoint(this.innerArcRadius,e),o=`M ${i.x} ${i.y}`;return i=this.getCirclePoint(this.innerArcRadius,t),a<180?o+=` A ${this.innerArcRadius} ${this.innerArcRadius} 0 0 1 ${i.x} ${i.y}`:o+=` A ${this.innerArcRadius} ${this.innerArcRadius} 0 1 1 ${i.x} ${i.y}`,i=this.getCirclePoint(this.outerArcRadius,t),o+=` L ${i.x} ${i.y}`,i=this.getCirclePoint(this.outerArcRadius,e),a<180?o+=` A ${this.outerArcRadius} ${this.outerArcRadius} 0 0 0 ${i.x} ${i.y}`:o+=` A ${this.outerArcRadius} ${this.outerArcRadius} 0 1 0 ${i.x} ${i.y}`,i=this.getCirclePoint(this.innerArcRadius,e),o+=` L ${i.x} ${i.y}`,o},setupThreshold(){this.threshold===null?this.realThreshold=this.max:this.realThreshold=this.threshold},animateNeedle(){this.tweenedValue=this.min,J.to(this,{duration:.5,tweenedValue:Number(this.value)||this.min})}},created(){this.setupThreshold(),this.animateNeedle()},destroyed(){this.animationInterval&&clearInterval(this.animationInterval)}},Nt={class:"gauge-container font-mono"},jt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",class:"gauge font-mono"},zt=["x","y"],Pt=["d"],Ht=["d"],Ot=["d"];function Et(e,t,a,i,o,l){return n(),r("div",Nt,[(n(),r("svg",jt,[s("text",{x:o.centerX,y:o.centerY,class:"value font-mono"},v(o.tweenedValue.toFixed(a.decimals)),9,zt),s("path",{class:"arc below-needle",d:l.belowNeedlePathData},null,8,Pt),s("path",{class:u(["arc gap",{exceeding:l.exceeding}]),d:l.gapPathData},null,10,Ht),a.threshold?(n(),r("path",{key:0,class:"arc above-threshold",d:l.aboveThresholdPathData},null,8,Ot)):p("",!0)])),a.custom?(n(),r("button",{key:0,onClick:t[0]||(t[0]=g=>l.goToDetailPage(e.type)),class:"detail-button"},"Detail")):p("",!0)])}const b=m(Rt,[["render",Et],["__scopeId","data-v-97d6c945"]]);const h=e=>(C("data-v-61302a98"),e=e(),A(),e),Zt={class:"flex h-screen overflow-hidden p-0"},qt={class:"flex flex-col flex-1"},Ut={class:"flex bg-mycolor flex-col flex-1 p-8 bg-gray-50"},Wt={class:"grid grid-cols-1 md:grid-cols-3 gap-8"},Yt={class:"p-6 bg-white shadow rounded-lg my-bg"},Gt=h(()=>s("label",{class:"font-semibold text-lg text-center mb-4 text-white font-mono block"},"Temperature (°C)",-1)),Kt={class:"gauge-container"},Xt={class:"p-6 bg-white shadow my-bg rounded-lg"},Jt=h(()=>s("label",{class:"font-semibold text-lg text-white text-center mb-4 font-mono block"},"Humidity (%)",-1)),Qt={class:"gauge-container"},te={class:"p-6 bg-white shadow my-bg rounded-lg"},ee=h(()=>s("label",{class:"font-semibold text-lg text-white text-center mb-4 font-mono block"},"Luminosity (%)",-1)),se={class:"gauge-container"},ae={class:"grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"},oe=h(()=>s("label",{class:"font-semibold text-lg font-mono"},"Fan",-1)),ie={class:"icon-container rounded-full p-4"},ne={key:0,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",class:"w-8 h-8"},re=h(()=>s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"},null,-1)),le=[re],de={key:1,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",class:"w-8 h-8"},ce=h(()=>s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M5.636 5.636a9 9 0 1 0 12.728 0M12 21v-9"},null,-1)),he=[ce],ue=h(()=>s("label",{class:"font-semibold text-lg font-mono"},"Light",-1)),ge={class:"icon-container rounded-full p-4"},me={key:0,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-8 h-8"},pe=h(()=>s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"},null,-1)),fe=[pe],be={key:1,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-8 h-8"},ve=h(()=>s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M12 12a3.75 3.75 0 0 0 0-7.5V12Z"},null,-1)),_e=[ve],we=h(()=>s("label",{class:"font-semibold text-lg font-mono"},"Assistant",-1)),ye=h(()=>s("div",{class:"icon-container rounded-full p-4"},[s("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-8 h-8"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"})])],-1)),xe=[we,ye],ke={class:"fixed bottom-4 right-4 space-y-2"},$e={class:"text-sm font-mono"},De={name:"Data",components:{Gauge:b},data(){return{Data:null,isListening:!1,recognizedText:"",enspeech:[],light:1,fan:1,textnoti:"",notifications:[]}},mounted(){this.getData(),this.interval=setInterval(()=>{this.getData(),this.notify()},6e4)},beforeDestroy(){clearInterval(this.interval)},computed:{isLightZero(){return this.Data?this.Data.light==0:!1},isFanZero(){return this.Data?this.Data.fan==0:!1}},methods:{notify(){this.Data.temp>35&&(this.textnoti="Temperature is above 35°C",this.addNotification(this.textnoti)),this.Data.humidity>65&&(this.textnoti="Humidity is above 65%",this.addNotification(this.textnoti)),this.Data.lightvalue>75&&(this.textnoti="Luminosity is above 75%",this.addNotification(this.textnoti)),this.Data.lightvalue<25&&(this.textnoti="Luminosity is below 25%",this.addNotification(this.textnoti))},async getData(){try{const e=await c.get("/record",{headers:{authorization:`Bearer ${localStorage.getItem("token")}`}});this.Data=e.data}catch{this.$router.push("/unauthorized")}},addNotification(e){const t={text:e};this.notifications.push(t),setTimeout(()=>{this.notifications=this.notifications.filter(a=>a.id!==t.id)},5e3)},async switchLight(e){e==this.Data.light?alert("Light is already "+(e==0?"off":"on")):(this.Data.light=e,await c.post("/record/store",{light:e}),this.textnoti="Light is turned "+(e==0?"off":"on"),this.addNotification(this.textnoti))},async switchFan(e){e==this.Data.fan?alert("Fan is already "+(e==0?"off":"on")):(this.Data.fan=e,await c.post("/record/store",{fan:e}),this.textnoti="Fan is turned "+(e==0?"off":"on"),this.addNotification(this.textnoti))},startSpeechRecognition(){this.isListening=!0;const e=new window.webkitSpeechRecognition||new window.SpeechRecognition;e.lang="en-US",e.onresult=t=>{this.recognizedText=t.results[0][0].transcript;const a=this.recognizedText.toLowerCase();a.includes("on")?a.includes("light")?this.switchLight(1):a.includes("fan")?this.switchFan(100):a.includes("everything")&&(this.switchLight(1),this.switchFan(100)):a.includes("off")&&(a.includes("light")?this.switchLight(0):a.includes("fan")?this.switchFan(0):a.includes("everything")&&(this.switchLight(0),this.switchFan(0)))},e.onend=()=>{this.isListening=!1},e.start(),this.textnoti="Start listening...",this.addNotification(this.textnoti)}}},Ce=Object.assign(De,{setup(e){return(t,a)=>(n(),r("div",Zt,[d(V),s("div",qt,[d(S),s("main",Ut,[s("div",Wt,[s("div",Yt,[Gt,s("div",Kt,[d(b,{value:t.Data?t.Data.temp:0,threshold:35,min:0,max:50,decimals:0,attr:"temperature"},null,8,["value"])])]),s("div",Xt,[Jt,s("div",Qt,[d(b,{value:t.Data?t.Data.humidity:0,threshold:65,min:0,max:100,decimals:0,attr:"humidity"},null,8,["value"])])]),s("div",te,[ee,s("div",se,[d(b,{value:t.Data?t.Data.lightvalue:0,threshold:75,min:0,max:100,decimals:0,attr:"luminosity"},null,8,["value"])])])]),s("div",ae,[s("button",{onClick:a[0]||(a[0]=i=>t.switchFan(t.isFanZero?100:0)),class:u([t.isFanZero?"bg-blue-100":"gradient1","flex flex-col items-center justify-center p-6 shadow rounded-lg transition-colors"])},[oe,s("div",ie,[t.isFanZero?(n(),r("svg",ne,le)):(n(),r("svg",de,he))])],2),s("button",{onClick:a[1]||(a[1]=i=>t.switchLight(t.isLightZero?1:0)),class:u([t.isLightZero?"bg-red-100":"gradient2","flex flex-col items-center justify-center p-6 shadow rounded-lg transition-colors"])},[ue,s("div",ge,[t.isLightZero?(n(),r("svg",me,fe)):(n(),r("svg",be,_e))])],2),s("button",{onClick:a[2]||(a[2]=(...i)=>t.startSpeechRecognition&&t.startSpeechRecognition(...i)),class:u([t.isListening?"gradient3 text-white":"bg-yellow-100","flex flex-col items-center justify-center p-6 shadow rounded-lg transition-colors"])},xe,2)]),s("div",ke,[(n(!0),r(B,null,I(t.notifications,(i,o)=>(n(),r("div",{key:o,class:"bg-white p-4 rounded-lg shadow-lg"},[s("p",$e,v(i.text),1)]))),128))])])])]))}}),Ae=m(Ce,[["__scopeId","data-v-61302a98"]]);const Se={name:"DataStream",props:{dataStream:{type:Array,required:!0}}},Ve={class:"data-stream rounded-lg"},Le={class:"font-semibold text-lg text-center text-white font-mono block"},Fe={class:"font-semibold text-lg text-center text-white font-mono block"};function Me(e,t,a,i,o,l){return n(),r("div",Ve,[(n(!0),r(B,null,I(a.dataStream,(g,U)=>(n(),r("div",{key:U,class:"data-item shadow mx-auto"},[s("span",Le,"Time: "+v(g[0]),1),s("span",Fe,"Value: "+v(g[1]),1)]))),128))])}const Z=m(Se,[["render",Me],["__scopeId","data-v-6a5a60b9"]]);const Be={class:"flex h-screen overflow-hidden p-0"},Ie={class:"flex flex-col flex-1"},Te={class:"flex flex-col flex-1 p-8 bg-mycolor"},Re={class:"grid grid-cols-1 md:grid-cols-5 gap-8 mb-8"},Ne={class:"p-6 bg-white shadow rounded-lg my-bg col-span-1"},je={class:"font-semibold text-lg text-center mb-4 text-white font-mono block"},ze={class:"gauge-container"},Pe={class:"p-6 bg-white shadow rounded-lg my-bg col-span-4"},He={class:"overflow-auto h-full"},Oe={class:"bg-gray-50 p-4 shadow-lg rounded-lg h-72"};T.register(R,N,j,z,x,P,H,x,O);const Ee={name:"Data",components:{Gauge:b,DataStream:Z,Line:f},data(){return{Data:null,DataS:null,stringtype:"abc",loaded:!1,chartData:null,chartOptions:null,thhold:0,max:100,row:null,bgcl:null,bdcl:null,pbgcl:null,pbdcl:null}},mounted(){this.$route.query.type==="temperature"?(this.stringtype="tempx",this.title="Temperature (°C)"):this.$route.query.type==="humidity"?(this.stringtype="humidx",this.title="Humidity (%)"):this.$route.query.type==="luminosity"&&(this.stringtype="lightx",this.title="Luminosity (%)"),this.getData(),this.getChartData(),this.interval=setInterval(()=>{this.getData(),this.getChartData()},6e4)},beforeDestroy(){clearInterval(this.interval)},methods:{async getData(){try{const e=await c.get("/record",{headers:{authorization:`Bearer ${localStorage.getItem("token")}`}});this.stringtype==="tempx"?(this.Data=e.data.temp,this.thhold=35,this.max=50):this.stringtype==="humidx"?(this.Data=e.data.humidity,this.thhold=65,this.max=100):this.stringtype==="lightx"&&(this.Data=e.data.lightvalue,this.thhold=75,this.max=100);const t=await c.get("https://io.adafruit.com/api/v2/thanhdanh2754/feeds/"+this.stringtype+"/data/chart");this.DataS=t.data.data}catch{this.$router.push("/unauthorized")}},async getChartData(){try{const e=await c.get("/statistics");this.stringtype==="tempx"?(this.row=e.data.map(t=>t.temp),this.bgcl="rgba(248, 121, 121, 0.2)",this.bdcl="#f87979",this.pbgcl="red",this.pbdcl="#f87979"):this.stringtype==="humidx"?(this.row=e.data.map(t=>t.humidity),this.bgcl="rgba(0, 191, 255, 0.2)",this.bdcl="#00BFFF",this.pbgcl="#00BFFF",this.pbdcl="#00BFFF"):this.stringtype==="lightx"&&(this.row=e.data.map(t=>t.lightvalue),this.bgcl="rgba(50, 205, 50, 0.2)",this.bdcl="#32CD32",this.pbgcl="#32CD32",this.pbdcl="#32CD32"),this.chartData={labels:e.data.map(t=>y(t.time).utcOffset(0).format("h:mm:ss a")),datasets:[{label:this.title,data:this.row,backgroundColor:this.bgcl,fill:!0,borderColor:this.bdcl,borderWidth:2,pointRadius:5,pointBackgroundColor:this.pbgcl,pointBorderColor:this.bdcl,tension:.3}]},this.chartOptions={responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0}}},this.loaded=!0}catch(e){console.log(e)}}}},Ze=Object.assign(Ee,{setup(e){return(t,a)=>(n(),r("div",Be,[d(V),s("div",Ie,[d(S),s("main",Te,[s("div",Re,[s("div",Ne,[s("label",je,v(t.title),1),s("div",ze,[d(b,{custom:!1,value:t.Data?t.Data:0,threshold:t.thhold,min:0,max:t.max,decimals:0},null,8,["value","threshold","max"])])]),s("div",Pe,[s("div",He,[d(Z,{dataStream:t.DataS},null,8,["dataStream"])])])]),s("div",Oe,[t.loaded?(n(),_(w(f),{key:0,data:t.chartData,options:t.chartOptions,class:"m-4"},null,8,["data","options"])):p("",!0)])])])]))}}),qe={name:"UnauthorizedView"},Ue={class:"flex items-center justify-center h-screen"},We=s("div",{class:"text-center"},[s("h1",{class:"text-3xl font-bold mb-4"},"Unauthorized Access"),s("p",{class:"text-lg mb-4"},"You are not authorized to view this page.")],-1),Ye=[We];function Ge(e,t,a,i,o,l){return n(),r("div",Ue,Ye)}const Ke=m(qe,[["render",Ge]]);const Xe={class:"flex h-screen overflow-hidden bg-gray-100 bg-mycolor"},Je={class:"flex flex-col flex-1 relative overflow-x-hidden overflow-y-auto"},Qe={class:"flex-1 h-full"},ts={class:"h-full mx-auto p-6 md:p-8 2xl:p-12 bg-gray-50 my-bg"},es={class:"h-full container flex flex-col gap-8 bg-gray-50 rounded-lg"},ss=D('<div class="flex flex-col sm:flex-row items-center gap-4 mb-4 sm:mb-0" data-v-b3baf03d><label for="start-date" class="font-bold font-mono text-gray-700" data-v-b3baf03d>Start Date</label><div class="flex items-center gap-2" data-v-b3baf03d><svg xmlns="http://www.w3.org/2000/svg" fill="#0175F8" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" data-v-b3baf03d><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3H6v4H3v2h18V7h-3V3h-2v4H8zM3 21v-2h18v2H3zm0-4v-2h18v2H3zm0-4v-2h18v2H3zm0-4v-2h18v2H3z" data-v-b3baf03d></path></svg><input type="date" id="start-date" class="border border-gray-300 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" data-v-b3baf03d></div></div><div class="flex flex-col sm:flex-row items-center gap-4 mb-4 sm:mb-0" data-v-b3baf03d><label for="end-date" class="font-bold font-mono text-gray-700" data-v-b3baf03d>End Date</label><div class="flex items-center gap-2" data-v-b3baf03d><svg xmlns="http://www.w3.org/2000/svg" fill="#0175F8" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" data-v-b3baf03d><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3H6v4H3v2h18V7h-3V3h-2v4H8zM3 21v-2h18v2H3zm0-4v-2h18v2H3zm0-4v-2h18v2H3zm0-4v-2h18v2H3z" data-v-b3baf03d></path></svg><input type="date" id="end-date" class="border border-gray-300 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200" data-v-b3baf03d></div></div><div class="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200" data-v-b3baf03d><button type="submit" class="focus:outline-none flex items-center font-mono justify-center h-10 w-32" data-v-b3baf03d><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2" data-v-b3baf03d><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" data-v-b3baf03d></path></svg> Export </button></div>',3),as=[ss],os={class:"flex flex-col justify-center items-center"},is={class:"arrow-container flex items-center"},ns={class:"chart-container flex-grow bg-white shadow-lg rounded-lg p-6"};T.register(R,N,j,z,x,P,H,x,O);const rs={name:"LineChart",components:{Line:f},data(){return{loaded:!1,currentChart:null,chartData_temp:null,chartData_humid:null,chartData_lumin:null}},mounted(){this.updateData(),this.getData(),this.interval=setInterval(()=>{this.updateData(),this.getData()},6e4),this.currentChart="temp",console.log(this.chartData_temp)},methods:{nextChart(){this.currentChart==="temp"?this.currentChart="humid":this.currentChart==="humid"?this.currentChart="lumin":this.currentChart="temp"},prevChart(){this.currentChart==="temp"?this.currentChart="lumin":this.currentChart==="lumin"?this.currentChart="humid":this.currentChart="temp"},async exportExcel(){try{const e=document.getElementById("start-date").value,t=document.getElementById("end-date").value,a=await c.get(`/export?start=${e}&end=${t}`,{headers:{authorization:`Bearer ${localStorage.getItem("token")}`,Accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},responseType:"blob"}),i=URL.createObjectURL(new Blob([a.data],{type:"application/vnd.ms-excel"})),o=document.createElement("a");o.href=i,o.setAttribute("download","data.xlsx"),document.body.appendChild(o),o.click()}catch(e){console.error(e)}},async updateData(){try{const e=await c.get("/record",{headers:{authorization:`Bearer ${localStorage.getItem("token")}`}})}catch{this.$router.push("/unauthorized")}},async getData(){try{const e=await c.get("/statistics");this.chartData_temp={labels:e.data.map(t=>y(t.time).utcOffset(0).format("h:mm:ss a")),datasets:[{label:"Temperature",data:e.data.map(t=>t.temp),backgroundColor:"rgba(248, 121, 121, 0.2)",fill:!0,borderColor:"#f87979",borderWidth:2,pointRadius:5,pointBackgroundColor:"red",pointBorderColor:"#f87979",tension:.3}]},this.chartData_humid={labels:e.data.map(t=>y(t.time).utcOffset(0).format("h:mm:ss a")),datasets:[{label:"Humidity",backgroundColor:"rgba(0, 191, 255, 0.2)",data:e.data.map(t=>t.humidity),pointRadius:5,pointBackgroundColor:"#00BFFF",pointBorderColor:"#00BFFF",tension:.3,borderColor:"#00BFFF",borderWidth:2,fill:!0}]},this.chartData_lumin={labels:e.data.map(t=>y(t.time).utcOffset(0).format("h:mm:ss a")),datasets:[{label:"Luminosity",backgroundColor:"rgba(50, 205, 50, 0.2)",data:e.data.map(t=>t.lightvalue),pointRadius:5,pointBackgroundColor:"#32CD32",pointBorderColor:"#32CD32",tension:.3,borderColor:"#32CD32",borderWidth:2,fill:!0}]},this.loaded=!0}catch(e){console.error(e)}},beforeDestroy(){clearInterval(this.interval)}}},ls=Object.assign(rs,{setup(e){return(t,a)=>(n(),r("div",Xe,[s("div",null,[d(V)]),s("div",Je,[s("div",null,[d(S)]),s("main",Qe,[s("div",ts,[s("div",es,[s("form",{onSubmit:a[0]||(a[0]=M((...i)=>t.exportExcel&&t.exportExcel(...i),["prevent"])),class:"flex flex-col sm:flex-row justify-between items-center p-4 bg-white shadow-lg rounded-lg"},as,32),s("div",os,[s("div",is,[s("i",{class:"fas fa-arrow-left text-gray-600 hover:text-gray-800 cursor-pointer mx-4",onClick:a[1]||(a[1]=(...i)=>t.prevChart&&t.prevChart(...i))}),s("div",ns,[t.currentChart==="temp"&&t.loaded?(n(),_(w(f),{key:0,data:t.chartData_temp,class:"chart m-4"},null,8,["data"])):p("",!0),t.currentChart==="humid"&&t.loaded?(n(),_(w(f),{key:1,data:t.chartData_humid,class:"chart m-4"},null,8,["data"])):p("",!0),t.currentChart==="lumin"&&t.loaded?(n(),_(w(f),{key:2,data:t.chartData_lumin,class:"chart m-4"},null,8,["data"])):p("",!0)]),s("i",{class:"fas fa-arrow-right text-gray-600 hover:text-gray-800 cursor-pointer mx-4",onClick:a[2]||(a[2]=(...i)=>t.nextChart&&t.nextChart(...i))})])])])])])])]))}}),ds=m(ls,[["__scopeId","data-v-b3baf03d"]]),cs=G({history:K("/"),routes:[{path:"/",name:"home",component:ct},{path:"/dashboard",name:"dashboard",component:Ae},{path:"/unauthorized",name:"unauthorized",component:Ke},{path:"/statistics",name:"statistics",component:ds},{path:"/details",name:"details",component:Ze}]}),q=Y(et);q.use(cs);q.mount("#app");
