if(!t)var t={map:function(t,r){var o={};return r?t.map(function(t,n){return o.index=n,r.call(o,t)}):t.slice()},naturalOrder:function(t,r){return t<r?-1:t>r?1:0},sum:function(t,r){var o={};return t.reduce(r?function(t,n,e){return o.index=e,t+r.call(o,n)}:function(t,r){return t+r},0)},max:function(r,o){return Math.max.apply(null,o?t.map(r,o):r)}};var r,o=function(){var r=5,o=8-r,n=1e3;function e(t,o,n){return(t<<2*r)+(o<<r)+n}function s(t){var r=[],o=!1;function n(){r.sort(t),o=!0}return{push:function(t){r.push(t),o=!1},peek:function(t){return o||n(),void 0===t&&(t=r.length-1),r[t]},pop:function(){return o||n(),r.pop()},size:function(){return r.length},map:function(t){return r.map(t)},debug:function(){return o||n(),r}}}function i(t,r,o,n,e,s,i){this.r1=t,this.r2=r,this.g1=o,this.g2=n,this.b1=e,this.b2=s,this.histo=i}function a(){this.vboxes=new s(function(r,o){return t.naturalOrder(r.vbox.count()*r.vbox.volume(),o.vbox.count()*o.vbox.volume())})}function u(r,o){if(o.count()){var n=o.r2-o.r1+1,s=o.g2-o.g1+1,i=t.max([n,s,o.b2-o.b1+1]);if(1==o.count())return[o.copy()];var a,u,h,c,f=0,l=[],g=[];if(i==n)for(a=o.r1;a<=o.r2;a++){for(c=0,u=o.g1;u<=o.g2;u++)for(h=o.b1;h<=o.b2;h++)c+=r[e(a,u,h)]||0;l[a]=f+=c}else if(i==s)for(a=o.g1;a<=o.g2;a++){for(c=0,u=o.r1;u<=o.r2;u++)for(h=o.b1;h<=o.b2;h++)c+=r[e(u,a,h)]||0;l[a]=f+=c}else for(a=o.b1;a<=o.b2;a++){for(c=0,u=o.r1;u<=o.r2;u++)for(h=o.g1;h<=o.g2;h++)c+=r[e(u,h,a)]||0;l[a]=f+=c}return l.forEach(function(t,r){g[r]=f-t}),function(t){var r,n,e,s,i,u=t+"1",h=t+"2",c=0;for(a=o[u];a<=o[h];a++)if(l[a]>f/2){for(e=o.copy(),s=o.copy(),i=(r=a-o[u])<=(n=o[h]-a)?Math.min(o[h]-1,~~(a+n/2)):Math.max(o[u],~~(a-1-r/2));!l[i];)i++;for(c=g[i];!c&&l[i-1];)c=g[--i];return e[h]=i,s[u]=e[h]+1,[e,s]}}(i==n?"r":i==s?"g":"b")}}return i.prototype={volume:function(t){return this._volume&&!t||(this._volume=(this.r2-this.r1+1)*(this.g2-this.g1+1)*(this.b2-this.b1+1)),this._volume},count:function(t){var r=this.histo;if(!this._count_set||t){var o,n,s,i=0;for(o=this.r1;o<=this.r2;o++)for(n=this.g1;n<=this.g2;n++)for(s=this.b1;s<=this.b2;s++)i+=r[e(o,n,s)]||0;this._count=i,this._count_set=!0}return this._count},copy:function(){return new i(this.r1,this.r2,this.g1,this.g2,this.b1,this.b2,this.histo)},avg:function(t){var o=this.histo;if(!this._avg||t){var n,s,i,a,u=0,h=1<<8-r,c=0,f=0,l=0;for(s=this.r1;s<=this.r2;s++)for(i=this.g1;i<=this.g2;i++)for(a=this.b1;a<=this.b2;a++)u+=n=o[e(s,i,a)]||0,c+=n*(s+.5)*h,f+=n*(i+.5)*h,l+=n*(a+.5)*h;this._avg=u?[~~(c/u),~~(f/u),~~(l/u)]:[~~(h*(this.r1+this.r2+1)/2),~~(h*(this.g1+this.g2+1)/2),~~(h*(this.b1+this.b2+1)/2)]}return this._avg},contains:function(t){var r=t[0]>>o;return gval=t[1]>>o,bval=t[2]>>o,r>=this.r1&&r<=this.r2&&gval>=this.g1&&gval<=this.g2&&bval>=this.b1&&bval<=this.b2}},a.prototype={push:function(t){this.vboxes.push({vbox:t,color:t.avg()})},palette:function(){return this.vboxes.map(function(t){return t.color})},size:function(){return this.vboxes.size()},map:function(t){for(var r=this.vboxes,o=0;o<r.size();o++)if(r.peek(o).vbox.contains(t))return r.peek(o).color;return this.nearest(t)},nearest:function(t){for(var r,o,n,e=this.vboxes,s=0;s<e.size();s++)((o=Math.sqrt(Math.pow(t[0]-e.peek(s).color[0],2)+Math.pow(t[1]-e.peek(s).color[1],2)+Math.pow(t[2]-e.peek(s).color[2],2)))<r||void 0===r)&&(r=o,n=e.peek(s).color);return n},forcebw:function(){var r=this.vboxes;r.sort(function(r,o){return t.naturalOrder(t.sum(r.color),t.sum(o.color))});var o=r[0].color;o[0]<5&&o[1]<5&&o[2]<5&&(r[0].color=[0,0,0]);var n=r.length-1,e=r[n].color;e[0]>251&&e[1]>251&&e[2]>251&&(r[n].color=[255,255,255])}},{quantize:function(h,c){if(!h.length||c<2||c>256)return!1;var f=function(t){var n,s=new Array(1<<3*r);return t.forEach(function(t){n=e(t[0]>>o,t[1]>>o,t[2]>>o),s[n]=(s[n]||0)+1}),s}(h);f.forEach(function(){});var l=function(t,r){var n,e,s,a=1e6,u=0,h=1e6,c=0,f=1e6,l=0;return t.forEach(function(t){(n=t[0]>>o)<a?a=n:n>u&&(u=n),(e=t[1]>>o)<h?h=e:e>c&&(c=e),(s=t[2]>>o)<f?f=s:s>l&&(l=s)}),new i(a,u,h,c,f,l,r)}(h,f),g=new s(function(r,o){return t.naturalOrder(r.count(),o.count())});function v(t,r){for(var o,e=t.size(),s=0;s<n;){if(e>=r)return;if(s++>n)return;if((o=t.pop()).count()){var i=u(f,o),a=i[0],h=i[1];if(!a)return;t.push(a),h&&(t.push(h),e++)}else t.push(o),s++}}g.push(l),v(g,.75*c);for(var b=new s(function(r,o){return t.naturalOrder(r.count()*r.volume(),o.count()*o.volume())});g.size();)b.push(g.pop());v(b,c);for(var p=new a;b.size();)p.push(b.pop());return p}}}().quantize,n=(function(t){var r=t.exports={};function o(t){return(t%360+360)%360}function n(t,r,o){return o<0&&(o+=1),o>1&&(o-=1),o<1/6?t+6*(r-t)*o:o<.5?r:o<2/3?t+(r-t)*(2/3-o)*6:t}r.rgb2Hsl=function(t,r,o){if("object"==typeof t){const n=t;t=n.r,r=n.g,o=n.b}t=255===t?1:t%255/parseFloat(255),r=255===r?1:r%255/parseFloat(255),o=255===o?1:o%255/parseFloat(255);var n,e,s=Math.max(t,r,o),i=Math.min(t,r,o),a=(s+i)/2;if(s===i)n=e=0;else{var u=s-i;switch(e=a>.5?u/(2-s-i):u/(s+i),s){case t:n=(r-o)/u+(r<o?6:0);break;case r:n=(o-t)/u+2;break;case o:n=(t-r)/u+4}n/=6}return{h:Math.round(360*n),s:Math.round(100*e),l:Math.round(100*a)}},r.rgb_to_hsl=r.rgbToHsl=r.rgb2Hsl,r.rgb2Hsv=function(t,r,o){if("object"==typeof t){const n=t;t=n.r,r=n.g,o=n.b}t=255===t?1:t%255/parseFloat(255),r=255===r?1:r%255/parseFloat(255),o=255===o?1:o%255/parseFloat(255);var n,e,s=Math.max(t,r,o),i=Math.min(t,r,o),a=s,u=s-i;if(e=0===s?0:u/s,s===i)n=0;else{switch(s){case t:n=(r-o)/u+(r<o?6:0);break;case r:n=(o-t)/u+2;break;case o:n=(t-r)/u+4}n/=6}return{h:Math.round(360*n),s:Math.round(100*e),v:Math.round(100*a)}},r.rgb_to_hsv=r.rgbToHsv=r.rgb2Hsv,r.hsl2Rgb=function(t,r,e){if("object"==typeof t){const o=t;t=o.h,r=o.s,e=o.l}var s,i,a;if(t=360===(t=o(t))?1:t%360/parseFloat(360),r=100===r?1:r%100/parseFloat(100),e=100===e?1:e%100/parseFloat(100),0===r)s=i=a=e;else{var u=e<.5?e*(1+r):e+r-e*r,h=2*e-u;s=n(h,u,t+1/3),i=n(h,u,t),a=n(h,u,t-1/3)}return{r:Math.round(255*s),g:Math.round(255*i),b:Math.round(255*a)}},r.hsl_to_rgb=r.hslToRgb=r.hsl2Rgb,r.hsv2Rgb=function(t,r,n){if("object"==typeof t){const o=t;t=o.h,r=o.s,n=o.v}t=360===(t=o(t))?1:t%360/parseFloat(360)*6,r=100===r?1:r%100/parseFloat(100),n=100===n?1:n%100/parseFloat(100);var e=Math.floor(t),s=t-e,i=n*(1-r),a=n*(1-s*r),u=n*(1-(1-s)*r),h=e%6,c=[u,n,n,a,i,i][h],f=[i,i,u,n,n,a][h];return{r:Math.floor(255*[n,a,i,i,u,n][h]),g:Math.floor(255*c),b:Math.floor(255*f)}},r.hsv_to_rgb=r.hsv2Rgb,r.hsvToRgb=r.hsv2Rgb,r.rgb2Hex=function(t,r,o){if("object"==typeof t){const n=t;t=n.r,r=n.g,o=n.b}return t=Math.round(t).toString(16),r=Math.round(r).toString(16),o=Math.round(o).toString(16),"#"+(t=1===t.length?"0"+t:t)+(r=1===r.length?"0"+r:r)+(1===o.length?"0"+o:o)},r.rgb_to_hex=r.rgbToHex=r.rgb2Hex,r.hex2Rgb=function(t){var r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null},r.hex_to_rgb=r.hexToRgb=r.hex2Rgb,r.hsv2Hex=function(t,o,n){var e=r.hsv2Rgb(t,o,n);return r.rgb2Hex(e.r,e.g,e.b)},r.hsv_to_hex=r.hsv2Hex,r.hsvToHex=r.hsv2Hex,r.hex2Hsv=function(t){var o=r.hex2Rgb(t);return r.rgb2Hsv(o.r,o.g,o.b)},r.hex_to_hsv=r.hexToHsv=r.hex2Hsv,r.hsl2Hex=function(t,o,n){var e=r.hsl2Rgb(t,o,n);return r.rgb2Hex(e.r,e.g,e.b)},r.hsl_to_hex=r.hslToHex=r.hsl2Hex,r.hex2Hsl=function(t){var o=r.hex2Rgb(t);return r.rgb2Hsl(o.r,o.g,o.b)},r.hex_to_hsl=r.hexToHsl=r.hex2Hsl,r.rgb2Cmyk=function(t,r,o){if("object"==typeof t){const n=t;t=n.r,r=n.g,o=n.b}var n=t/255,e=r/255,s=o/255,i=1-Math.max(n,e,s),a=(1-e-i)/(1-i),u=(1-s-i)/(1-i);return{c:((1-n-i)/(1-i)).toFixed(3),m:a.toFixed(3),y:u.toFixed(3),k:i.toFixed(3)}},r.rgb_to_cmyk=r.rgbToCmyk=r.rgb2Cmyk,r.cmyk2Rgb=function(t,r,o,n){if("object"==typeof t){const e=t;t=e.c,r=e.m,o=e.y,n=e.k}var e=255*(1-r)*(1-n),s=255*(1-o)*(1-n);return{r:Math.floor(255*(1-t)*(1-n)),g:Math.floor(e),b:Math.floor(s)}},r.cmyk_to_rgb=r.cmykToRgb=r.cmyk2Rgb,r.hsv2Hsl=function(t,r,o){if("object"==typeof t){const n=t;t=n.h,r=n.s,o=n.v}var n=(2-r)*o/2;return 0!==n&&(r=100===n?0:n<50?r*o/(2*n):r*o/(2-2*n)),{h:t,s:r,l:n}},r.hsv_to_hsl=r.hsvToHsl=r.hsv2Hsl,r.hsl2Hsv=function(t,r,o){if("object"==typeof t){const n=t;t=n.h,r=n.s,o=n.l}return r*=o<50?o:100-o,{h:t,s:Math.floor(2*r/(o+r)),v:Math.floor(o+r)}},r.hsl_to_hsv=r.hslToHsv=r.hsl2Hsv,r.parseCss=function(t){if(t.indexOf("#")>-1)return r.hex2Rgb(t);const o=t.split("(")[0],n=t.split("(")[1].split(")")[0].split(",");return o.split("").reduce(function(t,r,o){const e=t;return e[r]=parseFloat(n[o]),e},{})},r.parse_css=r.parseCss,r.stringify=function(t){return Object.keys(t).join("")+"("+Object.keys(t).map(function(r){var o=t[r];return"s"!==r&&"v"!==r&&"l"!==r||(o+="%"),o}).join(", ")+")"},r.hex_to_decimal=r.hexToDecimal=r.hex2Decimal,r.hex2Decimal=function(t){if("string"==typeof t)return parseInt(t.replace("#",""),16)},r.decimal_to_hex=r.decimalToHex=r.decimal2Hex,r.decimal2Hex=function(t){return"string"==typeof t?"#"+parseInt(t).toString(16):"#"+t.toString(16)},r.random=function(){return"#"+("000000"+Math.floor(16777215*Math.random()).toString(16)).substr(-6)},r.rotateHue=function(t,r){void 0===r&&(r=0);const o="object"==typeof t?(t.h+r)%360:(t+r)%360,n=o<0?360+o:o;return"object"==typeof t?Object.assign(t,{h:n}):n},r.getColorEncoding=function(t){if("string"==typeof t)try{return r.hex2Rgb(t),"hex"}catch(t){}return"object"!=typeof t?"unknown":t.r+t.g+t.b&&"number"==typeof(t.r+t.g+t.b)?"rgb":t.h+t.s+t.v&&"number"==typeof(t.h+t.s+t.v)?"hsv":t.h+t.s+t.l&&"number"==typeof(t.h+t.s+t.l)?"hsl":t.c+t.m+t.y+t.k&&"number"==typeof(t.c+t.m+t.y+t.k)?"cmyk":"unknown"},r.any2Hsl=function(t){switch(r.getColorEncoding(t)){case"hsl":return t;case"rgb":return r.rgb2Hsl(t);case"hex":return r.hex2Hsl(t);case"hsv":return r.hsv2Hsl(t);case"cmyk":return r.rgb2Hsl(r.cmyk2Rgb(t));default:return"unknown"}},r.any_to_hsl=r.anyToHsl=r.any2Hsl,r.getTransformEncodingFunction=function(t,o){const n=r.getColorEncoding(t);return r[n+"_to_"+o]},r.darken=function(t,o){const n=r.getColorEncoding(t);if("unknown"===n)return t;if("cmyk"===n){const r=t;return r.k=Math.min(100,100*o+r.k),r}const e=r.any2Hsl(t),s={h:e.h,s:e.s,l:Math.round(e.l*(1-o))},i="hsl"===n?t=>t:r.getTransformEncodingFunction(s,n);return"function"!=typeof i?t:i(s)}}(r={exports:{}}),r.exports),e=function(t){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.width=this.canvas.width=t.naturalWidth,this.height=this.canvas.height=t.naturalHeight,this.context.drawImage(t,0,0,this.width,this.height)};e.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)};var s=function(){};s.prototype.getColor=function(t,r){void 0===r&&(r=10);var o=this.getPalette(t,5,r)[0],e=n.rgb_to_hsv({r:o[0],g:o[1],b:o[2]}),s=e.s,i=e.v;s<=5||s>70||(s<=10?s+=10:s<=30?s+=30:s<=40?s+=20:s<=50?s+=10:s<=70&&(s+=5)),i>50?i=45:i>30&&(i-=10);var a=n.hsv_to_rgb({h:e.h,s:s,v:i}),u=a.r,h=a.g,c=a.b;return console.log({r:u,g:h,b:c}),[u,h,c]},s.prototype.getPalette=function(t,r,n){var s=function(t){var r=t.colorCount,o=t.quality;if(void 0!==r&&Number.isInteger(r)){if(1===r)throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");r=Math.max(r,2),r=Math.min(r,20)}else r=10;return(void 0===o||!Number.isInteger(o)||o<1)&&(o=10),{colorCount:r,quality:o}}({colorCount:r,quality:n}),i=new e(t),a=function(t,r,o){for(var n=t,e=[],s=0,i=void 0,a=void 0,u=void 0,h=void 0,c=void 0;s<r;s+=o)a=n[0+(i=4*s)],u=n[i+1],h=n[i+2],(void 0===(c=n[i+3])||c>=125)&&(a>250&&u>250&&h>250||e.push([a,u,h]));return e}(i.getImageData().data,i.width*i.height,s.quality),u=o(a,s.colorCount);return u?u.palette():null},s.prototype.getColorFromUrl=function(t,r,o){var n=this,e=document.createElement("img");e.addEventListener("load",function(){var s=n.getPalette(e,5,o);r(s[0],t)}),e.src=t},s.prototype.getImageData=function(t,r){var o=new XMLHttpRequest;o.open("GET",t,!0),o.responseType="arraybuffer",o.onload=function(){if(200==this.status){var t=new Uint8Array(this.response);i=t.length;for(var o=new Array(i),n=0;n<t.length;n++)o[n]=String.fromCharCode(t[n]);var e=o.join(""),s=window.btoa(e);r("data:image/png;base64,"+s)}},o.send()},s.prototype.getColorAsync=function(t,r,o){var n=this;this.getImageData(t,function(t){var e=document.createElement("img");e.addEventListener("load",function(){var t=n.getPalette(e,5,o);r(t[0],this)}),e.src=t})};export default s;
