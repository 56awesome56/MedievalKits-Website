$(document).ready(function() {
    $.get("status.php", function(data) {
          console.log(data);
        if (data && data != "offline") {
            var d = JSON.parse(data);
            var online = d["player_count"];
            var max = d["player_max"];
            $(".server-players").text(online + " Players currently online");
        } else {
            $(".server-players").text("Server offline");
        }
      });
   setInterval(function() {
      $.get("status.php", function(data) {
          console.log("Test");
        if (data && data != "offline") {
            var d = JSON.parse(data);
            var online = d["player_count"];
            var max = d["player_max"];
            $(".server-players").text(online + " Players currently online");
        } else {
            $(".server-players").text("Server offline");
        }
      });
   }, 5000); 
});
!function(e,t){"object"==typeof exports?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Spinner=t()}(this,function(){"use strict";function e(e,t){var i,n=document.createElement(e||"div");for(i in t)n[i]=t[i];return n}function t(e){for(var t=1,i=arguments.length;i>t;t++)e.appendChild(arguments[t]);return e}function i(e,t,i,n){var a=["opacity",t,~~(100*e),i,n].join("-"),s=.01+i/n*100,o=Math.max(1-(1-e)/t*(100-s),e),r=c.substring(0,c.indexOf("Animation")).toLowerCase(),l=r&&"-"+r+"-"||"";return p[a]||(u.insertRule("@"+l+"keyframes "+a+"{0%{opacity:"+o+"}"+s+"%{opacity:"+e+"}"+(s+.01)+"%{opacity:1}"+(s+t)%100+"%{opacity:"+e+"}100%{opacity:"+o+"}}",u.cssRules.length),p[a]=1),a}function n(e,t){var i,n,a=e.style;for(t=t.charAt(0).toUpperCase()+t.slice(1),n=0;n<d.length;n++)if(i=d[n]+t,void 0!==a[i])return i;return void 0!==a[t]?t:void 0}function a(e,t){for(var i in t)e.style[n(e,i)||i]=t[i];return e}function s(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)void 0===e[n]&&(e[n]=i[n])}return e}function o(e,t){return"string"==typeof e?e:e[t%e.length]}function r(e){this.opts=s(e||{},r.defaults,h)}function l(){function i(t,i){return e("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',i)}u.addRule(".spin-vml","behavior:url(#default#VML)"),r.prototype.lines=function(e,n){function s(){return a(i("group",{coordsize:d+" "+d,coordorigin:-c+" "+-c}),{width:d,height:d})}function r(e,r,l){t(u,t(a(s(),{rotation:360/n.lines*e+"deg",left:~~r}),t(a(i("roundrect",{arcsize:n.corners}),{width:c,height:n.width,left:n.radius,top:-n.width>>1,filter:l}),i("fill",{color:o(n.color,e),opacity:n.opacity}),i("stroke",{opacity:0}))))}var l,c=n.length+n.width,d=2*c,p=2*-(n.width+n.length)+"px",u=a(s(),{position:"absolute",top:p,left:p});if(n.shadow)for(l=1;l<=n.lines;l++)r(l,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(l=1;l<=n.lines;l++)r(l);return t(e,u)},r.prototype.opacity=function(e,t,i,n){var a=e.firstChild;n=n.shadow&&n.lines||0,a&&t+n<a.childNodes.length&&(a=a.childNodes[t+n],a=a&&a.firstChild,a=a&&a.firstChild,a&&(a.opacity=i))}}var c,d=["webkit","Moz","ms","O"],p={},u=function(){var i=e("style",{type:"text/css"});return t(document.getElementsByTagName("head")[0],i),i.sheet||i.styleSheet}(),h={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",position:"absolute"};r.defaults={},s(r.prototype,{spin:function(t){this.stop();var i=this,n=i.opts,s=i.el=a(e(0,{className:n.className}),{position:n.position,width:0,zIndex:n.zIndex});if(a(s,{left:n.left,top:n.top}),t&&t.insertBefore(s,t.firstChild||null),s.setAttribute("role","progressbar"),i.lines(s,i.opts),!c){var o,r=0,l=(n.lines-1)*(1-n.direction)/2,d=n.fps,p=d/n.speed,u=(1-n.opacity)/(p*n.trail/100),h=p/n.lines;!function f(){r++;for(var e=0;e<n.lines;e++)o=Math.max(1-(r+(n.lines-e)*h)%p*u,n.opacity),i.opacity(s,e*n.direction+l,o,n);i.timeout=i.el&&setTimeout(f,~~(1e3/d))}()}return i},stop:function(){var e=this.el;return e&&(clearTimeout(this.timeout),e.parentNode&&e.parentNode.removeChild(e),this.el=void 0),this},lines:function(n,s){function r(t,i){return a(e(),{position:"absolute",width:s.length+s.width+"px",height:s.width+"px",background:t,boxShadow:i,transformOrigin:"left",transform:"rotate("+~~(360/s.lines*d+s.rotate)+"deg) translate("+s.radius+"px,0)",borderRadius:(s.corners*s.width>>1)+"px"})}for(var l,d=0,p=(s.lines-1)*(1-s.direction)/2;d<s.lines;d++)l=a(e(),{position:"absolute",top:1+~(s.width/2)+"px",transform:s.hwaccel?"translate3d(0,0,0)":"",opacity:s.opacity,animation:c&&i(s.opacity,s.trail,p+d*s.direction,s.lines)+" "+1/s.speed+"s linear infinite"}),s.shadow&&t(l,a(r("#000","0 0 4px #000"),{top:"2px"})),t(n,t(l,r(o(s.color,d),"0 0 1px rgba(0,0,0,.1)")));return n},opacity:function(e,t,i){t<e.childNodes.length&&(e.childNodes[t].style.opacity=i)}});var f=a(e("group"),{behavior:"url(#default#VML)"});return!n(f,"transform")&&f.adj?l():c=n(f,"animation"),r}),function(e){if("object"==typeof exports)e(require("jquery"),require("spin.js"));else if("function"==typeof define&&define.amd)define(["jquery","spin"],e);else{if(!window.Spinner)throw new Error("Spin.js not present");e(window.jQuery,window.Spinner)}}(function(e,t){e.fn.spin=function(i,n){return this.each(function(){var a=e(this),s=a.data();s.spinner&&(s.spinner.stop(),delete s.spinner),i!==!1&&(i=e.extend({color:n||a.css("color")},e.fn.spin.presets[i]||i),s.spinner=new t(i).spin(this))})},e.fn.spin.presets={tiny:{lines:8,length:2,width:2,radius:3},small:{lines:8,length:4,width:3,radius:5},large:{lines:10,length:8,width:4,radius:8}}}),function(e,t,i){e.ichecked||(e.ichecked=function(){i=e.jQuery||e.Zepto;var n={autoInit:!0,autoAjax:!0,tap:!0,checkboxClass:"icheckbox",radioClass:"iradio",checkedClass:"checked",disabledClass:"disabled",indeterminateClass:"indeterminate",hoverClass:"hover",callbacks:{ifCreated:!1},classes:{base:"icheck",div:"#-item",area:"#-area-",input:"#-input",label:"#-label"}};e.icheck=i.extend(n,e.icheck);var a=e.navigator.userAgent,s=/MSIE [5-8]/.test(a)||t.documentMode<9,o=/Opera Mini/.test(a),r=n.classes.base,l=n.classes.div.replace("#",r),c=n.classes.area.replace("#",r),d=n.classes.input.replace("#",r),p=n.classes.label.replace("#",r);delete n.classes;var u,h,f="input[type=checkbox],input[type=radio]",g={},m={},v=new RegExp(r+"\\[(.*?)\\]"),y=function(e,t,i){return e&&(t=v.exec(e),t&&m[t[1]]&&(i=t[1])),i},b=e.getComputedStyle,k=e.PointerEvent||e.MSPointerEvent,C="ontouchend"in e,w=/mobile|tablet|phone|ip(ad|od)|android|silk|webos/i.test(a),x=["mouse","down","up","over","out"],T=e.PointerEvent?["pointer",x[1],x[2],x[3],x[4]]:["MSPointer","Down","Up","Over","Out"],N=["touch","start","end"],E=C&&w||k,A=E?C?N[0]+N[1]:T[0]+T[3]:x[0]+x[3],$=E?C?N[0]+N[2]:T[0]+T[4]:x[0]+x[4],j=E?C?!1:T[0]+T[1]:x[0]+x[1],I=E?C?!1:T[0]+T[2]:x[0]+x[2],D=o?"":A+".i "+$+".i ",O=!o&&j?j+".i "+I+".i":"",S=n.areaStyle!==!1?'position:absolute;display:block;content:"";top:#;bottom:#;left:#;right:#;':0,R="position:absolute!;display:block!;outline:none!;"+(n.debug?"":"opacity:0!;z-index:-99!;clip:rect(0 0 0 0)!;"),P=function(i,n,a){u||(u=t.createElement("style"),(t.head||t.getElementsByTagName("head")[0]).appendChild(u),e.createPopup||u.appendChild(t.createTextNode("")),h=u.sheet||u.styleSheet),n||(n="div."+(a?c+a+":after":l+" input."+d)),i=i.replace(/!/g," !important"),h.addRule?h.addRule(n,i,0):h.insertRule(n+"{"+i+"}",0)};P(R),(C&&w||o)&&P("cursor:pointer!;","label."+p+",div."+l),P("display:none!","iframe.icheck-frame");var L=function(e,t,i,n,a,s,o){return n=e.className,n?(a=" "+n+" ",1===i?s=t:0===i?o=t:(s=t[0],o=t[1]),s&&a.indexOf(" "+s+" ")<0&&(a+=s+" "),o&&~a.indexOf(" "+o+" ")&&(a=a.replace(" "+o+" "," ")),a=a.replace(/^\s+|\s+$/g,""),a!==n&&(e.className=a),a):void 0},M=function(e,t,n,a,s,o){m[t]&&(a=m[t],s=a.className,o=i(z(e,"div",s)),o.length&&(i(e).removeClass(d+" "+s).attr("style",a.style),i("label."+a.esc).removeClass(p+" "+s),i(o).replaceWith(i(e)),n&&F(e,t,n)),m[t]=!1)},U=function(e,t,n,a,s){for(n=[],a=e.length;a--;)if(t=e[a],t.type)~f.indexOf(t.type)&&n.push(t);else for(t=i(t).find(f),s=t.length;s--;)n.push(t[s]);return n},z=function(e,t,i,n){for(;e&&9!==e.nodeType;)if(e=e.parentNode,e&&e.tagName==t.toUpperCase()&&~e.className.indexOf(i)){n=e;break}return n},F=function(e,t,n){n="if"+n,m[t].callbacks&&m[t].callbacks[n]!==!1&&(i(e).trigger(n),"function"==typeof m[t].callbacks[n]&&m[t].callbacks[n](e,m[t]))},B=function(a,s,o,u){for(var h=U(a),v=h.length;v--;){for(var k,C,w,x,T,N,E,A,$,j,I,D,O,R,B,q,V,_,W=h[v],H=W.attributes,X={},Z=H.length,G={},J={},K=W.id,Y=W.className,et=W.type,tt=i.cache?i.cache[W[i.expando]]:0,it=y(Y),nt="",at=!1,st=[],ot=e.FastClick?" needsclick":"";Z--;)k=H[Z].name,C=H[Z].value,~k.indexOf("data-")&&(G[k.substr(5)]=C),"style"==k&&(E=C),X[k]=C;tt&&tt.data&&(G=i.extend(G,tt.data));for(w in G)C=G[w],("true"==C||"false"==C)&&(C="true"==C),J[w.replace(/checkbox|radio|class|id|label/g,function(e,t){return 0===t?e:e.charAt(0).toUpperCase()+e.slice(1)})]=C;if(A=i.extend({},n,e.icheck,J,s),j=A.handle,"checkbox"!==j&&"radio"!==j&&(j=f),A.init!==!1&&~j.indexOf(et)){for(it&&M(W,it);!m[it];)if(it=Math.random().toString(36).substr(2,5),!m[it]){$=r+"["+it+"]";break}if(delete A.autoInit,delete A.autoAjax,A.style=E||"",A.className=$,A.esc=$.replace(/(\[|\])/g,"\\$1"),m[it]=A,R=z(W,"label",""),R&&(!R.htmlFor&&K&&(R.htmlFor=K),st.push(R)),K)for(B=i('label[for="'+K+'"]');B.length--;)O=B[B.length],O!==R&&st.push(O);for(_=st.length;_--;)O=st[_],V=O.className,q=y(V),V=q?L(O,r+"["+q+"]",0):(V?V+" ":"")+p,O.className=V+" "+$+ot;if(I=t.createElement("div"),A.inherit)for(x=A.inherit.split(/\s*,\s*/),N=x.length;N--;)T=x[N],void 0!==X[T]&&("class"==T?nt+=X[T]+" ":I.setAttribute(T,"id"==T?r+"-"+X[T]:X[T]));nt+=A[et+"Class"],nt+=" "+l+" "+$,A.area&&S&&(at=0|(""+A.area).replace(/%|px|em|\+|-/g,""),at&&(g[at]||(P(S.replace(/#/g,"-"+at+"%"),!1,at),g[at]=!0),nt+=" "+c+at)),I.className=nt+ot,W.className=(Y?Y+" ":"")+d+" "+$,W.parentNode.replaceChild(I,W),I.appendChild(W),A.insert&&i(I).append(A.insert),at&&(D=b?b(I,null).getPropertyValue("position"):I.currentStyle.position,"static"==D&&(I.style.position="relative")),Q(W,I,it,"updated",!0,!1,o),m[it].done=!0,u||F(W,it,"Created")}}},Q=function(e,t,i,n,a,s,o){var r=m[i],l={},c={};l.checked=[e.checked,"Checked","Unchecked"],s&&!o||"click"===n||(l.disabled=[e.disabled,"Disabled","Enabled"],l.indeterminate=["true"==e.getAttribute("indeterminate")||!!e.indeterminate,"Indeterminate","Determinate"]),"updated"==n||"click"==n?(c.checked=s?!l.checked[0]:l.checked[0],s&&!o||"click"===n||(c.disabled=l.disabled[0],c.indeterminate=l.indeterminate[0])):"checked"==n||"unchecked"==n?c.checked="checked"==n:"disabled"==n||"enabled"==n?c.disabled="disabled"==n:"indeterminate"==n||"determinate"==n?c.indeterminate="determinate"!==n:c.checked=!l.checked[0],q(e,t,l,c,i,r,n,a,s,o)},q=function(e,t,n,a,s,o,r,l,c,d,p){var u,h,f,g,v,b,k,C,x,T,N,E,A,$,j=e.type,I="radio"==j?"Radio":"Checkbox",D="LabelClass";if(t||(t=z(e,"div",o.className)),t){for(u in a)if(h=a[u],n[u][0]!==h&&"updated"!==r&&"click"!==r&&(e[u]=h),d&&(h?e.setAttribute(u,u):e.removeAttribute(u)),o[u]!==h){if(o[u]=h,A=!0,"checked"==u&&($=!0,!p&&h&&(m[s].done||d)&&"radio"==j&&e.name))for(b=z(e,"form",""),k='input[name="'+e.name+'"]',k=b&&!d?i(b).find(k):i(k),C=k.length;C--;)x=k[C],T=y(x.className),e!==x&&m[T]&&m[T].checked&&(N={checked:[!0,"Checked","Unchecked"]},E={checked:!1},q(x,!1,N,E,T,m[T],"updated",l,c,d,!0));if(f=[o[u+"Class"],o[u+I+"Class"],o[n[u][1]+"Class"],o[n[u][1]+I+"Class"],o[u+D]],g=[f[3]||f[2],f[1]||f[0]],h&&g.reverse(),L(t,g),o.mirror&&f[4])for(v=i("label."+o.esc);v.length--;)L(v[v.length],f[4],h?1:0);(!l||p)&&F(e,s,n[u][h?1:2])}(!l||p)&&(A&&F(e,s,"Changed"),$&&F(e,s,"Toggled")),o.cursor&&!w&&(o.disabled||o.pointer?o.disabled&&o.pointer&&(t.style.cursor="default",o.pointer=!1):(t.style.cursor="pointer",o.pointer=!0)),m[s]=o}};i.fn.icheck=function(e,t){if(/^(checked|unchecked|indeterminate|determinate|disabled|enabled|updated|toggle|destroy|data|styler)$/.test(e))for(var i=U(this),n=i.length;n--;){var a=i[n],s=y(a.className);if(s){if("data"==e)return m[s];if("styler"==e)return z(a,"div",m[s].className);"destroy"==e?M(a,s,"Destroyed"):Q(a,!1,s,e),"function"==typeof t&&t(a)}}else"object"!=typeof e&&e||B(this,e||{});return this};var V;i(t).on("click.i "+D+O,"label."+p+",div."+l,function(e){var t=this,n=y(t.className);if(n){var a,r,l,c,d=e.type,p=m[n],u=p.esc,h="DIV"==t.tagName,f=[["label",p.activeLabelClass,p.hoverLabelClass],["div",p.activeClass,p.hoverClass]];if(h&&f.reverse(),d==j||d==I){if(f[0][1]&&L(t,f[0][1],d==j?1:0),p.mirror&&f[1][1])for(l=i(f[1][0]+"."+u);l.length--;)L(l[l.length],f[1][1],d==j?1:0);h&&d==I&&p.tap&&w&&k&&!o&&(c=!0)}else if(d==A||d==$){if(f[0][2]&&L(t,f[0][2],d==A?1:0),p.mirror&&f[1][2])for(l=i(f[1][0]+"."+u);l.length--;)L(l[l.length],f[1][2],d==A?1:0);h&&d==$&&p.tap&&w&&C&&!o&&(c=!0)}else h&&(w&&(C||k)&&p.tap&&!o||(c=!0));c&&setTimeout(function(){r=e.currentTarget||{},"LABEL"!==r.tagName&&(!p.change||+new Date-p.change>100)&&(a=i(t).find("input."+u).click(),(s||o)&&a.change())},2)}}).on("click.i change.i focusin.i focusout.i keyup.i keydown.i","input."+d,function(e){var t=this,n=y(t.className);if(n){var a,s,o=e.type,r=m[n],l=r.esc,c="click"==o?!1:z(t,"div",r.className);if("click"==o)m[n].change=+new Date,e.stopPropagation();else if("change"==o)c&&!t.disabled&&Q(t,c,n,"click");else if(~o.indexOf("focus")){if(s=[r.focusClass,r.focusLabelClass],s[0]&&c&&L(c,s[0],"focusin"==o?1:0),r.mirror&&s[1])for(a=i("label."+l);a.length--;)L(a[a.length],s[1],"focusin"==o?1:0)}else c&&!t.disabled&&("keyup"==o?(("checkbox"==t.type&&32==e.keyCode&&r.keydown||"radio"==t.type&&!t.checked)&&Q(t,c,n,"click",!1,!0),m[n].keydown=!1,m[V]&&(m[V].keydown=!1)):(V=n,m[n].keydown=!0))}}).ready(function(){if(e.icheck.autoInit&&i("."+r).icheck(),e.jQuery){var n=t.body||t.getElementsByTagName("body")[0];i.ajaxSetup({converters:{"text html":function(a){if(e.icheck.autoAjax&&n){var o,l=t.createElement("iframe");s||(l.style="display:none"),l.className="iframe.icheck-frame",l.src="about:blank",n.appendChild(l),o=l.contentDocument?l.contentDocument:l.contentWindow.document,o.open(),o.write(a),o.close(),n.removeChild(l),o=i(o),B(o.find("."+r),{},!0),o=o[0],a=(o.body||o.getElementsByTagName("body")[0]).innerHTML,o=null}return a}}})}})},"function"==typeof define&&define.amd?define("icheck",[e.jQuery?"jquery":"zepto"],e.ichecked):e.ichecked())}(window,document),function(e,t,i){"use strict";t.icheck={autoInit:!1,autoAjax:!1},e(i).on("ready ajaxSuccess",function(){e("input:not(.icheck-input)").icheck()}),e(function(){e(i).on("click",".ToggleFlyout",function(t){e(".InProgress",t.currentTarget).spin({lines:11,radius:5,length:5,width:2})}),e(i).on("click",".EditComment",function(t){e(".TinyProgress",e(t.currentTarget).closest(".Item")).empty().spin({lines:9,radius:3,length:3,width:2})}),e(i).on("click",".MorePager a",function(t){e(t.currentTarget).parent().spin({lines:9,radius:3,length:3,width:2})});var t=".Overlay",n="> .Popup",a=function(){var t=e(this),i=e('<div class="backdrop fade">');e("body").addClass("modal-open"),e(n,t).addClass("fade"),t.data("backdrop")||(t.data("backdrop",i),t.append(i)),setTimeout(function(){i.addClass("in").spin({lines:11,radius:10,length:10,width:4})},0)},s=function(){var t=e(this),i=t.data("backdrop");e(n,t).addClass("in"),i.length&&i.spin(!1)},o=function(){var i=e(this),a=i.data("backdrop");e(n,i).removeClass("in"),setTimeout(function(){a.length&&a.removeClass("in"),e("body").removeClass("modal-open")},150),setTimeout(function(){e(t).remove()},300)};e(i).on("popupLoading",function(){e(t).each(a)}).on("popupReveal",function(){e(t).each(s)}).on("popupClose",function(){e(t).each(o)});var r=["a.Delete","a.DeleteComment","a.DeleteFile","a.PopConfirm","a.ClearConversation","ul#DP_Remove a"];e(i).on("click",r.join(),function(){e(i).trigger("popupLoading"),setTimeout(function(){e(i).trigger("popupReveal")},150)})}),e.popup={},e.popup.close=function(t){return e(i).unbind("keydown.popup"),e("#"+t.popupId).trigger("popupClose"),!1}}(jQuery,window,document),+function(e){"use strict";function t(){var e=document.createElement("bootstrap"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in t)if(void 0!==e.style[i])return{end:t[i]};return!1}e.fn.emulateTransitionEnd=function(t){var i=!1,n=this;e(this).one("bsTransitionEnd",function(){i=!0});var a=function(){i||e(n).trigger(e.support.transition.end)};return setTimeout(a,t),this},e(function(){e.support.transition=t(),e.support.transition&&(e.event.special.bsTransitionEnd={bindType:e.support.transition.end,delegateType:e.support.transition.end,handle:function(t){return e(t.target).is(this)?t.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(e){"use strict";function t(t){var i,n=t.attr("data-target")||(i=t.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"");return e(n)}function i(t){return this.each(function(){var i=e(this),a=i.data("bs.collapse"),s=e.extend({},n.DEFAULTS,i.data(),"object"==typeof t&&t);!a&&s.toggle&&"show"==t&&(s.toggle=!1),a||i.data("bs.collapse",a=new n(this,s)),"string"==typeof t&&a[t]()})}var n=function(t,i){this.$element=e(t),this.options=e.extend({},n.DEFAULTS,i),this.$trigger=e(this.options.trigger).filter('[href="#'+t.id+'"], [data-target="#'+t.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};n.VERSION="3.3.2",n.TRANSITION_DURATION=350,n.DEFAULTS={toggle:!0,trigger:'[data-toggle="collapse"]'},n.prototype.dimension=function(){var e=this.$element.hasClass("width");return e?"width":"height"},n.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var t,a=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(a&&a.length&&(t=a.data("bs.collapse"),t&&t.transitioning))){var s=e.Event("show.bs.collapse");if(this.$element.trigger(s),!s.isDefaultPrevented()){a&&a.length&&(i.call(a,"hide"),t||a.data("bs.collapse",null));var o=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[o](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var r=function(){this.$element.removeClass("collapsing").addClass("collapse in")[o](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!e.support.transition)return r.call(this);var l=e.camelCase(["scroll",o].join("-"));this.$element.one("bsTransitionEnd",e.proxy(r,this)).emulateTransitionEnd(n.TRANSITION_DURATION)[o](this.$element[0][l])}}}},n.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var t=e.Event("hide.bs.collapse");if(this.$element.trigger(t),!t.isDefaultPrevented()){var i=this.dimension();this.$element[i](this.$element[i]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var a=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return e.support.transition?void this.$element[i](0).one("bsTransitionEnd",e.proxy(a,this)).emulateTransitionEnd(n.TRANSITION_DURATION):a.call(this)}}},n.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},n.prototype.getParent=function(){return e(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(e.proxy(function(i,n){var a=e(n);this.addAriaAndCollapsedClass(t(a),a)},this)).end()},n.prototype.addAriaAndCollapsedClass=function(e,t){var i=e.hasClass("in");e.attr("aria-expanded",i),t.toggleClass("collapsed",!i).attr("aria-expanded",i)};var a=e.fn.collapse;e.fn.collapse=i,e.fn.collapse.Constructor=n,e.fn.collapse.noConflict=function(){return e.fn.collapse=a,this},e(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(n){var a=e(this);a.attr("data-target")||n.preventDefault();var s=t(a),o=s.data("bs.collapse"),r=o?"toggle":e.extend({},a.data(),{trigger:this});i.call(s,r)})}(jQuery);
(function ($, window, document) {
  'use strict';

  window.icheck = {
    autoInit: false
  , autoAjax: false
  };

  $(document).on('ready ajaxSuccess', function () {

    // Initialize or re-initialize iCheck
    $('input:not(.icheck-input)').icheck();

  });

  $(function () {

    // Attach spinner to the .InProgress element in flyouts
    $(document).on('click', '.ToggleFlyout', function (e) {
      $('.InProgress', e.currentTarget).spin({
          lines  : 11
        , radius : 5
        , length : 5
        , width  : 2
        });
    });

    // Attach spinner to the .TinyProgress element when editing comment
    $(document).on('click', '.EditComment', function (e) {
      $('.TinyProgress', $(e.currentTarget).closest('.Item'))
        .empty()
        .spin({
          lines  : 9
        , radius : 3
        , length : 3
        , width  : 2
        });
    });

    // Attach spinner to the .MorePager when loading more content
    $(document).on('click', '.MorePager a', function (e) {
      $(e.currentTarget).parent()
        .spin({
          lines  : 9
        , radius : 3
        , length : 3
        , width  : 2
        });
    });

    var overlay = '.Overlay'
      , dialog  = '> .Popup';

    /**
     * Show the modal backdrop, but hide the actual modal dialog while it's
     * loading.
     *
     * @this {overlay}
     */
    var preparePopup = function () {
      var $overlay  = $(this)
        , $backdrop = $('<div class="backdrop fade">');

      // Lock body scrolling
      $('body').addClass('modal-open');

      // Prepare dialog animation
      $(dialog, $overlay).addClass('fade');

      // Attach a backdrop to the overlay if one doesn't already exist
      if (!$overlay.data('backdrop')) {
        $overlay.data('backdrop', $backdrop);

        // Append the modal backdrop to overlay
        $overlay.append($backdrop);
      }

      // Fake async addition of class
      setTimeout(function () {
        // Fade in backdrop and add spinner
        $backdrop.addClass('in').spin({
          lines  : 11
        , radius : 10
        , length : 10
        , width  : 4
        });
      }, 0);
    };

    /**
     * Fade in the modal dialog when it's time to reveal it.
     *
     * @this {overlay}
     */
    var revealPopup = function () {
      var $overlay  = $(this)
        , $backdrop = $overlay.data('backdrop');

      // Fade in modal dialog
      $(dialog, $overlay).addClass('in');

      if ($backdrop.length) {
        // Remove spinner from modal backdrop
        $backdrop.spin(false);
      }
    };

    /**
     * When it's time to close the modal, first fade out the modal dialog,
     * then fade out the modal backdrop, and lastly remove the entire modal
     * from the DOM.
     *
     * @this {overlay}
     */
    var closePopup = function () {
      var $overlay  = $(this)
        , $backdrop = $overlay.data('backdrop');

      // Fade out the modal dialog
      $(dialog, $overlay).removeClass('in');

      setTimeout(function () {
        if ($backdrop.length) {
          // Fade out the backdrop
          $backdrop.removeClass('in');
        }

        // Re-enable body scrolling
        $('body').removeClass('modal-open');
      }, 150);

      setTimeout(function () {
        // Remove overlay from the DOM
        $(overlay).remove();
      }, 300);
    };

    $(document)
      .on('popupLoading', function () {
        $(overlay).each(preparePopup);
      })
      .on('popupReveal', function () {
        $(overlay).each(revealPopup);
      })
      .on('popupClose', function (e) {
        $(overlay).each(closePopup);
      });

    var confirmPopupEls = [
      'a.Delete'
    , 'a.DeleteComment'
    , 'a.DeleteFile'
    , 'a.PopConfirm'
    , 'a.ClearConversation'
    , 'ul#DP_Remove a'
    ];

    // When only a confirmation modal is shown, the "popupLoading" and
    // "popupReveal" events are never triggered. Manually trigger them to make
    // sure that the modal is actually shown.
    $(document).on('click', confirmPopupEls.join(), function (e) {
      $(document).trigger('popupLoading');

      setTimeout(function () {
        $(document).trigger('popupReveal');
      }, 150);
    });

  });

  /**
   * Override the popup.close method to ensure that the modal isn't immdiately
   * removed from the DOM upon closing the dialog. This version of the method
   * instead lets it be up to listeners to actually close the modal, just like
   * it's the reponsibility of listeners to show the modal.
   *
   * @param  {Object} settings
   * @param  {Object} response
   * @return {bool}
   */
  $.popup.close = function (settings, response) {
    $(document).unbind('keydown.popup');
    $('#' + settings.popupId).trigger('popupClose');

    return false;
  };

})(jQuery, window, document);
