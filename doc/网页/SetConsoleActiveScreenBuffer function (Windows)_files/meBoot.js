(function(n){function e(){function o(n,t,i){var u=i.s===t,r,f,e;return u||(t=t||0,r=n.charCodeAt(t),i.s=-1,r<55296||r>57343?i.c=r:r<=56319?(f=r,e=n.charCodeAt(t+1),i.c=(f-55296)*1024+(e-56320)+65536,i.s=t+1):(i.c=-1,u=!0)),!u}var t=this,e=!1,i={};t.addStrings=function(t){n.extend(i,t)},t.getString=function(n,r){var u=i[n]||t.format("ERROR: {0}",n);return r?t.encodeHtml(u):u},t.startsWith=function(n,t){return n.substr(0,t.length)===t},t.format=function(n){function f(n){var t=i[parseInt(n.replace(u,""))];return t==null&&(t=""),t}for(var i=[],t=1;t<arguments.length;t++)i[t-1]=arguments[t];return n.replace(r,f)},t.dispose=function(){e||(i=null,e=!0)},t.encodeHtml=function(n){if(!n)return"";var t={c:0,s:-1};return n.replace(f,function(n,i,r){return o(r,i,t)?["&#",t.c,";"].join(""):""})}}var t=window,i=t.MSA.MeControl,r=/\{\d+\}/g,u=/[\{\}]/g,f=/[^\w .,-]/g;i.Strings=new e})(window.MejQuery),function(){var r=window,n=r.MSA.MeControl,t=n.Strings,u="uictx",f="me",i="([&?]{0}=)[^&]*";n.Util={appendQueryParams:function(n,t){var r,i;if(!n)return"";r=[];for(i in t)this.hasQueryParam(n,i,t[i])?n=this.setQueryParam(n,i,t[i]):r.push(i+"="+(t[i]?t[i]:""));return r.length===0?n:n+(n.indexOf("?")===-1?"?":"&")+r.join("&")},appendContextParam:function(n,t){return t=t||{},t[u]=f,this.appendQueryParams(n,t)},hasQueryParam:function(n,r){var u=t.format(i,r),f=new RegExp(u,"i");return f.test(n)},setQueryParam:function(n,r,u){var o=t.format(i,r),e=new RegExp(o,"i"),f;return e.test(n)?n.replace(e,"$1"+u):(f={},f[r]=u,this.appendQueryParams(n,f))},getCookie:function(n){return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(n).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null}}}(),function(){function e(i,r,e){function a(){var n=i.prop("src")||r;return t[n]||(t[n]={succeeded:!1,instances:[]}),t[n]}function p(){var t=a(),i;if(!t.succeeded&&(t.succeeded=!0,t.instances.length>0))for(n.logQos("TileLoad",!1,Date.now()-c,"ImageRestored: "+r,{url:r}),i=0;i<t.instances.length;i++)t.instances[i].reset();n.logQos("TileLoad",!0,Date.now()-c)}function v(){var t,r,u,f,e,o;try{if(p(),u=0,r=i[0].naturalWidth,t=i[0].naturalHeight,f=i.css("width"),e=i.css("height"),r==1&&t==1||f=="1px"&&e=="1px"){y();return}if(o=Math.round,r&&t&&r!=t)if(r>t){var s=parseInt(e),h=parseInt(f),c=o(r*(s/t));u=-o((c-h)/2),i.css({width:"auto","max-width":"none","margin-left":u+"px"})}else i.css({height:"auto","max-height":"none"});i.css("visibility","")}catch(l){n.logEvent("TileLoadError",{message:l.message})}}function y(){var t,f,u;try{f=a(),f.instances.push(o),t=i.parent(),i.remove(),u=e,i.attr("src")!=u&&(n.logQos("TileLoad",!0,Date.now()-c,"ImageFailed: "+r,{url:r,clientError:!0}),setTimeout(function(){i&&i.attr("src",u).css("visibility","")},0))}catch(s){n.logEvent("TileLoadError",{message:s.message})}finally{null!=t&&t.append(i)}}var o=this,l=!1,s=!1,h=!1,c;o.activate=function(){if(i&&!l)if(l=!0,s=!0,c=Date.now(),i.prop("src")===r)v();else{i.on("load",v);i.on("error",y);r&&u.startsWith(r.toLowerCase(),f)?i.prop("src",r):i.prop("src",e)}},o.deactivate=function(){s&&!h&&(s=!1,i&&i.off())},o.reset=function(n){s&&!h&&(n&&(r=n),o.deactivate(),l=!1,o.activate())},o.dispose=function(){h||(o.deactivate(),i=null,h=!0)}}var r=window,i=r.MSA.MeControl,u=i.Strings,n=i.Log,t={},f="https://";i.PictureLoaderCache={isCached:function(n){return t[n]&&t[n].succeeded}},i.PictureLoader=e}(),function(){function u(n,t,r){var u=n.exec(i);return u&&u[1]===t&&u[2]===r}var n=window,t=n.MSA.MeControl,i=navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase(),r=/(msie) ([\w.]+)/;t.Browser={ie8:u(r,"msie","8.0")}}(),function(n){function b(b){function ot(){if(tt=!0,k.hasActiveUser()){if(d.firstName=n.trim(d.firstName),d.lastName=n.trim(d.lastName),d.memberName=n.trim(d.memberName),tt=!!(d.memberName&&d.idp),d.idp===t.MSA||d.idp===t.MSA_FED){var r=d;d.idp===t.MSA&&(tt=!!(tt&&r.cid)),r.cid=r.cid&&r.cid.toLowerCase()}k.isReady()&&g.setActiveUser(d)}d=n.extend({},p,d),tt=!!(tt&&nt&&(nt.msaInfo||nt.aadInfo)),nt=n.extend(!0,{},w,nt),nt.msaInfo.accountSettingsUrl=u.appendQueryParams(y,{lang:b.market,partnerId:i.Config.ptn,partnerDomain:encodeURIComponent(location.hostname)}),et=k.imageUrl("cross.png"),k.extensibleLinks(b.extensibleLinks),ct(),i.$model=k}function ct(){if(tt&&!k.hasActiveUser()&&nt.msaInfo&&b.autoSignIn&&nt.msaInfo.signInUrl&&b.autoSignInReturnUrl&&lt()){var t=n('<iframe class="msame_auto_frame">');t.attr("src",yt()),n(document.body).append(t)}}function lt(){return!!u.getCookie(o)}function at(){var n=f.format("{0}=; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT",o);document.cookie=n}function vt(){var n=f.format("{0}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",o);document.cookie=n}function yt(){var i=t.MSA,n=nt.msaInfo.signInUrl,f=encodeURIComponent(b.autoSignInReturnUrl),r;return n=u.setQueryParam(n,h[i],f),r={},u.hasQueryParam(n,s[i])||(r[s[i]]="1"),u.appendContextParam(n,r)}function it(n){var r=!n||g&&g.isIdpEnabled(n.idp),i;return n=n||d,i=r?n.idp===t.MSA||n.idp===t.MSA_FED?k.pawnImgUrls.MsaEnabled:k.pawnImgUrls.AadEnabled:n.idp===t.MSA||n.idp===t.MSA_FED?k.pawnImgUrls.MsaDisabled:k.pawnImgUrls.AadDisabled}function st(n){var t=n.tileUrl;return t||(t=f.format(a,n.cid,b.isINT?"-int":"",u.getCookie("upck")||"1")),t}b=b||{},b.events=b.events||{},b.mobileBreakpoints=b.mobileBreakpoints||{};var k=this,ut=!1,tt=!0,d=b.userData,nt=b.rpData,ht=b.urlBase,ft=null,et,rt=i.MobileState.Auto,g=null;k.options=b||{},k.imageUrl=function(n){return f.format("{0}/MeControl/{1}/{2}",ht,i.Version,n)},k.pawnImgUrls={MsaEnabled:k.imageUrl("msa_enabled.png"),MsaDisabled:k.imageUrl("msa_disabled.png"),AadEnabled:k.imageUrl("aad_enabled.png"),AadDisabled:k.imageUrl("aad_disabled.png")},k.isValid=function(){return tt},k.isReady=function(){return!!(tt&&g)},k.mobileState=function(n){var t=i.MobileState,u;return(typeof n=="number"&&n>=t.Auto&&n<=t.Mobile&&(rt=n),rt!==t.Auto)?rt:(u=b.mobileBreakpoints,u.mobile&&u.mobile>=r.innerWidth)?t.Mobile:u.shortHeader&&u.shortHeader>=r.innerWidth?t.ShortHeader:t.Full},k.hasActiveUser=function(){return d&&d.authenticatedState==i.AuthState.SignedIn},k.setActiveUser=function(n){n&&(d=n,ot())},k.getProfilePictureUrl=function(n){var i,r,u;n=n||{},i="";switch(n.idp){case t.MSA:i=st(n);break;case t.AAD:r=n,i=r.largeTileUrl||r.smallTileUrl||r.tileUrl||it(n===d?null:n);break;case t.MSA_FED:n.cid?i=st(n):(u=n,i=u.largeTileUrl||u.smallTileUrl||u.tileUrl||it())}return i},k.getDisplayName=function(n){n=n||{};var u=function(n,t){return f.format(i.Loc.lf?"{1} {0}":"{0} {1}",n,t)},r="";switch(n.idp){case t.MSA:r=u(n.firstName,n.lastName);break;case t.AAD:case t.MSA_FED:r=n.displayName||u(n.firstName,n.lastName)}return r.trim&&(r=r.trim()),r},k.headerData=function(){var u=d.nickName||(i.Loc.lf?d.lastName||d.firstName:d.firstName||d.lastName),n,r;switch(d.idp){case t.MSA:n=u;break;case t.AAD:case t.MSA_FED:n=d.displayName||u}return n=n||d.memberName,r=b.headerHeight,r=typeof r=="number"?Math.max(l,Math.min(c,r)):0,{displayName:n,displayNameMobile:k.getDisplayName(d),nickName:d.nickName,tileUrl:k.getProfilePictureUrl(d),memberName:d.memberName||"",authenticatedState:d.authenticatedState,errorImgUrl:it(),chevronImgUrl:k.imageUrl("Chevronpng.png"),height:r,mobileState:k.mobileState(),chevHtml:b.custom&&b.custom.chevHtml}},k.activeAccountData=function(){return{idp:d.idp,firstName:d.firstName||"",lastName:d.lastName||"",nickName:d.nickName||"",displayName:k.getDisplayName(d),orgName:d.orgName||"",roleName:d.roleName||"",memberName:d.memberName||"",tileUrl:k.getProfilePictureUrl(d),isCustomTileUrl:!!d.tileUrl,errorImgUrl:it(),getEditPictureUrl:function(){return u.appendQueryParams(v,{lang:b.market,ru:encodeURIComponent(r.location.href),partnerId:i.Config.ptn,partnerDomain:encodeURIComponent(r.location.hostname)})}}},k.getAccountItemData=function(n){return{tileUrl:k.getProfilePictureUrl(n),displayName:k.getDisplayName(n),authenticatedState:n.authenticatedState,memberName:n.memberName,errorImgUrl:it(n),enabled:g&&g.isIdpEnabled(n.idp),onSwitchUser:function(){k.switchToUser(n)},onSignOutUser:function(t,i){k.signOutUser(n,t,i)},removeImgUrl:et}},k.userData=function(){return d},k.rpData=function(){return nt},k.userStateModel=function(n){return!g&&n&&(g=n,k.hasActiveUser()&&g.setActiveUser(d),g.getUserState(function(){})),g},k.extensibleLinks=function(n){var i,t;if(n){for(i=n instanceof Array,t=0;i&&t<n.length;t++)n[t].string&&(n[t].onClick||n[t].url)&&(!n[t].onClick||n[t].onClick instanceof Function)||(i=!1);i&&(ft=n),e.logQos("SetExtensibleLinks",i,0)}return ft},k.dispose=function(){ut||(g&&g.dispose(),nt=d=g=null,ut=!0)},k.signOut=function(){e.logEvent("SignOutAll",{userCount:g.currentState().length,currentUser:k.hasActiveUser()?d.idp:"none"}),nt.msaInfo&&b.autoSignIn&&at(),b.events.onBeforeSignOut&&b.events.onBeforeSignOut(d),r.location.href=g.getSignOutUrl(d)},k.signIn=function(){e.logEvent("SignIn",{userCount:g.currentState().length}),b.events.onSignIn?b.events.onSignIn():(nt.msaInfo&&b.autoSignIn&&vt(),r.location.href=u.appendContextParam(g.getSignInUrl(null,k.mobileState()===i.MobileState.Mobile)))},k.switchToUser=function(n){e.logEvent("SwitchUser",{userCount:g.currentState().length,idp:n&&n.idp,currentUser:k.hasActiveUser()?d.idp:"none"}),r.location.href=g.getSwitchToUrl(n)},k.signOutUser=function(n,t,i){e.logEvent("RemoveUser",{userCount:g.currentState().length,idp:n&&n.idp,currentUser:k.hasActiveUser()?d.idp:"none"}),g.signOutUser(n,t,i)},ot()}var r=window,i=r.MSA.MeControl,f=i.Strings,e=i.Log,u=i.Util,t=i.IDP,c,l;i.MobileState={Auto:-1,Full:0,ShortHeader:1,Mobile:2};var o="msame_asi",a="https://cid-{0}.users.storage.live{1}.com/users/0x{0}/myprofile/expressionprofile/profilephoto:Win8Static,UserTileMedium,UserTileStatic/MeControlXXLUserTile?ck={2}&ex=24",v="https://account.microsoft.com/profile/edit/picture?ref=MeControl",y="https://account.microsoft.com/?ref=MeControl",p={firstName:"",lastName:"",displayName:"",smallTileUrl:"",authenticatedState:""},w={msaInfo:{signInUrl:"",signOutUrl:"",meUrl:""},preferredIdp:t.MSA},h={},s={};h[t.MSA]="wreply",s[t.MSA]="checkda",c=100,l=44,i.MeControlModel=b}(window.MejQuery),function(n){function y(r){function ot(){var u,f,r;d&&!k&&(u=p.mobileState===t.MobileState.Mobile,f=p.mobileState===t.MobileState.ShortHeader,y.toggleClass("msame_Mobile",u),y.toggleClass("msame_Short",f),y.toggleClass("msame_3row",!!p.nickName),st(y),p.authenticatedState==t.AuthState.SignedIn&&(r=n(".msame_Header_name",y),r.show(),f?r.hide():u?(r.remove(),r.html(i.format(o,i.encodeHtml(p.displayNameMobile),p.nickName?i.encodeHtml(p.nickName):"",i.encodeHtml(p.memberName))),r.insertAfter(g),at()):(r.remove(),r.text(p.displayName),r.insertBefore(g))),rt())}function at(){ut||(p.chevHtml?nt.append(p.chevHtml):nt.append(i.format('<img src="{0}">',p.chevronImgUrl)),ut=!0)}function st(i){var s=p.mobileState===t.MobileState.Mobile,u="",f="",e="",o;!s&&r.height>0&&(r.height>c?u=r.height-v+"px":(o=r.height<h?l:a,u=o+"px",e=(r.height-o)/2),f=r.height),n(".msame_Header_picframe, .msame_Header_picframe img",i).css({height:u,width:u}),n(".msame_Header_name",i).css("line-height",f?f+"px":""),n(".msame_Header_piccont",i).css({paddingTop:e,paddingBottom:e}),i.css("height",f)}function rt(){if(!k&&!y.is(":visible")){tt||(tt=!0,setTimeout(function(){tt=!1,rt()},500));return}var n;p.mobileState===t.MobileState.Mobile&&(n=y.outerWidth()-g.outerWidth()-nt.outerWidth()-5),et.css("max-width",n||"")}function ht(){y.css("outline-style","none")}function ct(t,i){t.preventDefault(),t.stopPropagation(),n(b).trigger("click",{isKeyboard:i})}function vt(n){n&&(n.which===32||n.which===13)&&ct(n,!0)}function yt(){y.css("outline-style","")}var b=this,d=!1,k=!1,p=r,tt=!1,ut=!1,ft=p.authenticatedState==t.AuthState.SignedIn,w=null,y=null,g=null,et=null,nt=null,lt=null,it=null;b.elements=function(){return{anchor:y}},b.setMobileState=function(n){p.mobileState!==n&&(p.mobileState=n,ot())},b.setUserPicture=function(n){w&&w.reset(n)},b.render=function(){var o="",h=i.getString("signin"),c,u,f;return ft&&(c=t.PictureLoaderCache.isCached(p.tileUrl)?p.tileUrl:"",o=i.format(s,c),h=p.displayName),u=i.format(e,i.encodeHtml(h),o),r.height>0?(f=n("<div>").append(u),st(n(".msame_Header",f)),f.html()):u},b.activate=function(){if(!d&&!k){d=!0,y=n(".msame_Header"),g=n(".msame_Header_pic",y),et=n(".msame_Header_name",y),nt=n(".msame_Header_chev",y),it=n(".msame_Header_pic img",y),lt=n(".msame_Header_piccont",y);y.on("click",ct);y.on("keydown",vt);y.on("blur",yt);y.on("mousedown",ht);y.on("touchstart",ht);y.toggleClass("msame_unauth",!ft);u.on("resize"+f,rt);t.Browser.ie8&&y.addClass("msaie8"),w||(w=new t.PictureLoader(it,p.tileUrl,p.errorImgUrl)),p.mobileState!==t.MobileState.Full&&ot(),setTimeout(w.activate,0)}},b.deactivate=function(){d&&!k&&(d=!1,u.off("resize"+f),y.off(),w&&w.deactivate())},b.dispose=function(){k||(b.deactivate(),w&&(w.dispose(),w=null),y.remove(),p=r=null,it=y=null,k=!0)}}var r=window,u=n(r);r.MSA=r.MSA||{};var t=r.MSA.MeControl=r.MSA.MeControl||{},i=t.Strings,e='<div class="msame_Header" tabIndex="0"><div class="msame_Header_name msame_TxtTrunc">{0}<\/div>{1}<div class="msame_Header_chev"><\/div><\/div>',o='<div class="msame_TxtTrunc msame_Header_fullName">{0}<\/div><div class="msame_TxtTrunc msame_Header_nickName">{1}<\/div><div class="msame_TxtTrunc msame_Header_email">{2}<\/div>',s='<div class="msame_Header_pic"><div class="msame_Header_piccont"><div class="msame_Header_picframe"><img role="presentation" src="{0}"><\/div><\/div><\/div>',f=".msameheader",h=48,c=70,l=34,a=36,v=28;t.MeHeaderControl=y}(window.MejQuery),function(n){function f(f){function rt(){if(s=new t.MeControlModel(p),y=s.mobileState(),!s.isValid()){i.logQos("modelValidate",!1,0,"MissingData");return}u.on("resize",it);setTimeout(function(){t.API.setController(l),i.logEvent("$MeControlReady",{duration:Date.now()-v.startTime})},0),g(),tt()}function k(){c&&(n(c).off(),c.dispose()),c=null}function d(){h&&(n(h).off(),h.dispose()),h=null}function g(){if(!c){c=new t.MeHeaderControl(s.headerData()),b.html(c.render()),c.activate();n(c).on("click",ut);i.logEvent("HeaderReady",{duration:Date.now()-v.startTime})}}function nt(){if(!t.MeDropdownControl){l.dispose(),v.showHeaderNoJs();return}if(!a&&!h&&c){t.IFrameControl.init(),s.userStateModel(new t.UserStateModel(s.rpData(),t.Config.aad,t.Config.pxy,p.isINT)),h=new t.MeDropdownControl(s,c.elements()),n("body").append(h.render()),h.activate();n(h).on("visible",ft);i.logEvent("DropdownReady",{duration:Date.now()-v.startTime})}}function tt(){var i=v.getJsUrl("meCore");if(t.MeDropdownControl)nt();else{if(w)return;w=!0,n(r.document).ready(function(){v.loadScript(i,"meCore",function(){w=!1,nt()},function(){})})}}function ut(n,t){if(!s.hasActiveUser()&&s.isReady()&&s.userStateModel().currentState().length===0){s.signIn();return}h&&h.toggle(t&&t.isKeyboard)}function ft(n,t){b.toggleClass("msame_open",t||t.visible)}function it(){if(!a){var n=s.mobileState();y!==n&&(y=n,c&&c.setMobileState(y),h&&h.setMobileState(y))}}var l=this,a=!1,v=t.Loader,y,p=f||v.getOptions(),s=null,c=null,h=null,w=!1,b=n("#"+p.containerId);l.setActiveUser=function(n){if(!a&&s){if(s.setActiveUser(n),!s.isValid()){i.logQos("SetActiveUser",!1,0,"MissingData");return}i.logQos("SetActiveUser",!0,0),k(),d(),g(),tt()}},l.setExtensibleLinks=function(n){!a&&s&&(s.extensibleLinks(n),h&&h.updateExtensibleLinks())},l.refreshUserPicture=function(){if(!a&&s){var n=s.getProfilePictureUrl(s.userData());l.setUserPicture(n)}},l.setUserPicture=function(n){!a&&n&&(c&&c.setUserPicture(n),h&&h.setUserPicture(n))},l.setMobileState=function(n){!a&&s&&(s.mobileState(n),it())},l.openCloseDropdown=function(n){!a&&h&&(n?h.show():h.hide(!0))},l.reinit=function(n){l.dispose(),o(n,p)},l.dispose=function(){a||(k(),d(),s&&s.dispose(),s=null,t.IFrameControl&&t.IFrameControl.dispose(),u.off(e),r.MSA.$MeControl=null,a=!0)},setTimeout(rt,0);u.on("unload"+e,l.dispose)}function o(u,e){t.Loader.startTime=Date.now(),u.events&&u.events.onEventLog&&i.setLogEvent(u.events.onEventLog),u.urlBase=e.urlBase,u=n.extend({},e,u),r.MSA.$MeControl=new f(u)}var r=window,u=n(r),t=r.MSA.MeControl,i=t.Log,e=".msame";t.MeController=f,r.MSA.$MeControl=new f}(window.MejQuery);window.MSA.MeControl.Loc={rtl:false,lf:false};window.MSA.MeControl.Strings.addStrings({
"signin":"Sign in",
"signout":"Sign out"});window.MSA.MeControl.Loader.scriptLoaded('meBoot');