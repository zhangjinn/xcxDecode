var QR=function(){function r(r,o){var f;r>o&&(f=r,r=o,o=f),f=o,f*=o,f+=o,f>>=1,f+=r,M[f]=1}function o(o,f){var e;for(p[o+l*f]=1,e=-2;e<2;e++)p[o+e+l*(f-2)]=1,p[o-2+l*(f+e+1)]=1,p[o+2+l*(f+e)]=1,p[o+e+1+l*(f+2)]=1;for(e=0;e<2;e++)r(o-1,f+e),r(o+1,f-e),r(o-e,f-1),r(o+e,f+1)}function f(r){for(;r>=255;)r-=255,r=(r>>8)+(255&r);return r}function e(r,o,e,t){var n,c,a;for(n=0;n<t;n++)R[e+n]=0;for(n=0;n<o;n++){if(255!=(a=g[R[r+n]^R[e]]))for(c=1;c<t;c++)R[e+c-1]=R[e+c]^O[f(a+Q[t-c])];else for(c=e;c<e+t;c++)R[c]=R[c+1];R[e+t-1]=255==a?0:O[f(a+Q[0])]}}function t(r,o){var f;return r>o&&(f=r,r=o,o=f),f=o,f+=o*o,f>>=1,f+=r,M[f]}function n(r){var o,f,e,n;switch(r){case 0:for(f=0;f<l;f++)for(o=0;o<l;o++)o+f&1||t(o,f)||(p[o+f*l]^=1);break;case 1:for(f=0;f<l;f++)for(o=0;o<l;o++)1&f||t(o,f)||(p[o+f*l]^=1);break;case 2:for(f=0;f<l;f++)for(e=0,o=0;o<l;o++,e++)3==e&&(e=0),e||t(o,f)||(p[o+f*l]^=1);break;case 3:for(n=0,f=0;f<l;f++,n++)for(3==n&&(n=0),e=n,o=0;o<l;o++,e++)3==e&&(e=0),e||t(o,f)||(p[o+f*l]^=1);break;case 4:for(f=0;f<l;f++)for(e=0,n=f>>1&1,o=0;o<l;o++,e++)3==e&&(e=0,n=!n),n||t(o,f)||(p[o+f*l]^=1);break;case 5:for(n=0,f=0;f<l;f++,n++)for(3==n&&(n=0),e=0,o=0;o<l;o++,e++)3==e&&(e=0),(o&f&1)+!(!e|!n)||t(o,f)||(p[o+f*l]^=1);break;case 6:for(n=0,f=0;f<l;f++,n++)for(3==n&&(n=0),e=0,o=0;o<l;o++,e++)3==e&&(e=0),(o&f&1)+(e&&e==n)&1||t(o,f)||(p[o+f*l]^=1);break;case 7:for(n=0,f=0;f<l;f++,n++)for(3==n&&(n=0),e=0,o=0;o<l;o++,e++)3==e&&(e=0),(e&&e==n)+(o+f&1)&1||t(o,f)||(p[o+f*l]^=1)}}function c(r){var o,f=0;for(o=0;o<=r;o++)x[o]>=5&&(f+=y+x[o]-5);for(o=3;o<r-1;o+=2)x[o-2]==x[o+2]&&x[o+2]==x[o-1]&&x[o-1]==x[o+1]&&3*x[o-1]==x[o]&&(0==x[o-3]||o+3>r||3*x[o-3]>=4*x[o]||3*x[o+3]>=4*x[o])&&(f+=C);return f}function a(){var r,o,f,e,t,n=0,a=0;for(o=0;o<l-1;o++)for(r=0;r<l-1;r++)(p[r+l*o]&&p[r+1+l*o]&&p[r+l*(o+1)]&&p[r+1+l*(o+1)]||!(p[r+l*o]||p[r+1+l*o]||p[r+l*(o+1)]||p[r+1+l*(o+1)]))&&(n+=A);for(o=0;o<l;o++){for(x[0]=0,f=e=r=0;r<l;r++)(t=p[r+l*o])==e?x[f]++:x[++f]=1,e=t,a+=e?1:-1;n+=c(f)}a<0&&(a=-a);var i=a,u=0;for(i+=i<<2,i<<=1;i>l*l;)i-=l*l,u++;for(n+=u*N,r=0;r<l;r++){for(x[0]=0,f=e=o=0;o<l;o++)(t=p[r+l*o])==e?x[f]++:x[++f]=1,e=t;n+=c(f)}return n}function i(c){var i,x,y,A,C,N,S,q;A=c.length,u=0;do{if(u++,y=4*(F-1)+16*(u-1),s=w[y++],b=w[y++],v=w[y++],h=w[y],y=v*(s+b)+b-3+(u<=9),A<=y)break}while(u<40);for(l=17+4*u,C=v+(v+h)*(s+b)+b,A=0;A<C;A++)m[A]=0;for(R=c.slice(0),A=0;A<l*l;A++)p[A]=0;for(A=0;A<(l*(l+1)+1)/2;A++)M[A]=0;for(A=0;A<3;A++){for(y=0,x=0,1==A&&(y=l-7),2==A&&(x=l-7),p[x+3+l*(y+3)]=1,i=0;i<6;i++)p[x+i+l*y]=1,p[x+l*(y+i+1)]=1,p[x+6+l*(y+i)]=1,p[x+i+1+l*(y+6)]=1;for(i=1;i<5;i++)r(x+i,y+1),r(x+1,y+i+1),r(x+5,y+i),r(x+i+1,y+5);for(i=2;i<4;i++)p[x+i+l*(y+2)]=1,p[x+2+l*(y+i+1)]=1,p[x+4+l*(y+i)]=1,p[x+i+1+l*(y+4)]=1}if(u>1)for(A=d[u],x=l-7;;){for(i=l-7;i>A-3&&(o(i,x),!(i<A));)i-=A;if(x<=A+9)break;x-=A,o(6,x),o(x,6)}for(p[8+l*(l-8)]=1,x=0;x<7;x++)r(7,x),r(l-8,x),r(7,x+l-7);for(i=0;i<8;i++)r(i,7),r(i+l-8,7),r(i,l-8);for(i=0;i<9;i++)r(i,8);for(i=0;i<8;i++)r(i+l-8,8),r(8,i);for(x=0;x<7;x++)r(8,x+l-7);for(i=0;i<l-14;i++)1&i?(r(8+i,6),r(6,8+i)):(p[8+i+6*l]=1,p[6+l*(8+i)]=1);if(u>6)for(A=j[u-7],y=17,i=0;i<6;i++)for(x=0;x<3;x++,y--)1&(y>11?u>>y-12:A>>y)?(p[5-i+l*(2-x+l-11)]=1,p[2-x+l-11+l*(5-i)]=1):(r(5-i,2-x+l-11),r(2-x+l-11,5-i));for(x=0;x<l;x++)for(i=0;i<=x;i++)p[i+l*x]&&r(i,x);for(C=R.length,N=0;N<C;N++)m[N]=R.charCodeAt(N);if(R=m.slice(0),i=v*(s+b)+b,C>=i-2&&(C=i-2,u>9&&C--),N=C,u>9){for(R[N+2]=0,R[N+3]=0;N--;)A=R[N],R[N+3]|=255&A<<4,R[N+2]=A>>4;R[2]|=255&C<<4,R[1]=C>>4,R[0]=64|C>>12}else{for(R[N+1]=0,R[N+2]=0;N--;)A=R[N],R[N+2]|=255&A<<4,R[N+1]=A>>4;R[1]|=255&C<<4,R[0]=64|C>>4}for(N=C+3-(u<10);N<i;)R[N++]=236,R[N++]=17;for(Q[0]=1,N=0;N<h;N++){for(Q[N+1]=1,S=N;S>0;S--)Q[S]=Q[S]?Q[S-1]^O[f(g[Q[S]]+N)]:Q[S-1];Q[0]=O[f(g[Q[0]]+N)]}for(N=0;N<=h;N++)Q[N]=g[Q[N]];for(y=i,x=0,N=0;N<s;N++)e(x,v,y,h),x+=v,y+=h;for(N=0;N<b;N++)e(x,v+1,y,h),x+=v+1,y+=h;for(x=0,N=0;N<v;N++){for(S=0;S<s;S++)m[x++]=R[N+S*v];for(S=0;S<b;S++)m[x++]=R[s*v+N+S*(v+1)]}for(S=0;S<b;S++)m[x++]=R[s*v+N+S*(v+1)];for(N=0;N<h;N++)for(S=0;S<s+b;S++)m[x++]=R[i+N+S*h];for(R=m,i=x=l-1,y=C=1,q=(v+h)*(s+b)+b,N=0;N<q;N++)for(A=R[N],S=0;S<8;S++,A<<=1){128&A&&(p[i+l*x]=1);do{C?i--:(i++,y?0!=x?x--:(i-=2,y=!y,6==i&&(i--,x=9)):x!=l-1?x++:(i-=2,y=!y,6==i&&(i--,x-=8))),C=!C}while(t(i,x))}for(R=p.slice(0),A=0,x=3e4,y=0;y<8&&(n(y),i=a(),i<x&&(x=i,A=y),7!=A);y++)p=R.slice(0);for(A!=y&&n(A),x=k[A+(F-1<<3)],y=0;y<8;y++,x>>=1)1&x&&(p[l-1-y+8*l]=1,y<6?p[8+l*y]=1:p[8+l*(y+1)]=1);for(y=0;y<7;y++,x>>=1)1&x&&(p[8+l*(l-7+y)]=1,y?p[6-y+8*l]=1:p[7+8*l]=1);return p}var u,l,s,b,v,h,d=[0,11,15,19,23,27,31,16,18,20,22,24,26,28,20,22,24,24,26,28,28,22,24,24,26,26,28,28,24,24,26,26,26,28,28,24,26,26,26,28,28],j=[3220,1468,2713,1235,3062,1890,2119,1549,2344,2936,1117,2583,1330,2470,1667,2249,2028,3780,481,4011,142,3098,831,3445,592,2517,1776,2234,1951,2827,1070,2660,1345,3177],k=[30660,29427,32170,30877,26159,25368,27713,26998,21522,20773,24188,23371,17913,16590,20375,19104,13663,12392,16177,14854,9396,8579,11994,11245,5769,5054,7399,6608,1890,597,3340,2107],w=[1,0,19,7,1,0,16,10,1,0,13,13,1,0,9,17,1,0,34,10,1,0,28,16,1,0,22,22,1,0,16,28,1,0,55,15,1,0,44,26,2,0,17,18,2,0,13,22,1,0,80,20,2,0,32,18,2,0,24,26,4,0,9,16,1,0,108,26,2,0,43,24,2,2,15,18,2,2,11,22,2,0,68,18,4,0,27,16,4,0,19,24,4,0,15,28,2,0,78,20,4,0,31,18,2,4,14,18,4,1,13,26,2,0,97,24,2,2,38,22,4,2,18,22,4,2,14,26,2,0,116,30,3,2,36,22,4,4,16,20,4,4,12,24,2,2,68,18,4,1,43,26,6,2,19,24,6,2,15,28,4,0,81,20,1,4,50,30,4,4,22,28,3,8,12,24,2,2,92,24,6,2,36,22,4,6,20,26,7,4,14,28,4,0,107,26,8,1,37,22,8,4,20,24,12,4,11,22,3,1,115,30,4,5,40,24,11,5,16,20,11,5,12,24,5,1,87,22,5,5,41,24,5,7,24,30,11,7,12,24,5,1,98,24,7,3,45,28,15,2,19,24,3,13,15,30,1,5,107,28,10,1,46,28,1,15,22,28,2,17,14,28,5,1,120,30,9,4,43,26,17,1,22,28,2,19,14,28,3,4,113,28,3,11,44,26,17,4,21,26,9,16,13,26,3,5,107,28,3,13,41,26,15,5,24,30,15,10,15,28,4,4,116,28,17,0,42,26,17,6,22,28,19,6,16,30,2,7,111,28,17,0,46,28,7,16,24,30,34,0,13,24,4,5,121,30,4,14,47,28,11,14,24,30,16,14,15,30,6,4,117,30,6,14,45,28,11,16,24,30,30,2,16,30,8,4,106,26,8,13,47,28,7,22,24,30,22,13,15,30,10,2,114,28,19,4,46,28,28,6,22,28,33,4,16,30,8,4,122,30,22,3,45,28,8,26,23,30,12,28,15,30,3,10,117,30,3,23,45,28,4,31,24,30,11,31,15,30,7,7,116,30,21,7,45,28,1,37,23,30,19,26,15,30,5,10,115,30,19,10,47,28,15,25,24,30,23,25,15,30,13,3,115,30,2,29,46,28,42,1,24,30,23,28,15,30,17,0,115,30,10,23,46,28,10,35,24,30,19,35,15,30,17,1,115,30,14,21,46,28,29,19,24,30,11,46,15,30,13,6,115,30,14,23,46,28,44,7,24,30,59,1,16,30,12,7,121,30,12,26,47,28,39,14,24,30,22,41,15,30,6,14,121,30,6,34,47,28,46,10,24,30,2,64,15,30,17,4,122,30,29,14,46,28,49,10,24,30,24,46,15,30,4,18,122,30,13,32,46,28,48,14,24,30,42,32,15,30,20,4,117,30,40,7,47,28,43,22,24,30,10,67,15,30,19,6,118,30,18,31,47,28,34,34,24,30,20,61,15,30],g=[255,0,1,25,2,50,26,198,3,223,51,238,27,104,199,75,4,100,224,14,52,141,239,129,28,193,105,248,200,8,76,113,5,138,101,47,225,36,15,33,53,147,142,218,240,18,130,69,29,181,194,125,106,39,249,185,201,154,9,120,77,228,114,166,6,191,139,98,102,221,48,253,226,152,37,179,16,145,34,136,54,208,148,206,143,150,219,189,241,210,19,92,131,56,70,64,30,66,182,163,195,72,126,110,107,58,40,84,250,133,186,61,202,94,155,159,10,21,121,43,78,212,229,172,115,243,167,87,7,112,192,247,140,128,99,13,103,74,222,237,49,197,254,24,227,165,153,119,38,184,180,124,17,68,146,217,35,32,137,46,55,63,209,91,149,188,207,205,144,135,151,178,220,252,190,97,242,86,211,171,20,42,93,158,132,60,57,83,71,109,65,162,31,45,67,216,183,123,164,118,196,23,73,236,127,12,111,246,108,161,59,82,41,157,85,170,251,96,134,177,187,204,62,90,203,89,95,176,156,169,160,81,11,245,22,235,122,117,44,215,79,174,213,233,230,231,173,232,116,214,244,234,168,80,88,175],O=[1,2,4,8,16,32,64,128,29,58,116,232,205,135,19,38,76,152,45,90,180,117,234,201,143,3,6,12,24,48,96,192,157,39,78,156,37,74,148,53,106,212,181,119,238,193,159,35,70,140,5,10,20,40,80,160,93,186,105,210,185,111,222,161,95,190,97,194,153,47,94,188,101,202,137,15,30,60,120,240,253,231,211,187,107,214,177,127,254,225,223,163,91,182,113,226,217,175,67,134,17,34,68,136,13,26,52,104,208,189,103,206,129,31,62,124,248,237,199,147,59,118,236,197,151,51,102,204,133,23,46,92,184,109,218,169,79,158,33,66,132,21,42,84,168,77,154,41,82,164,85,170,73,146,57,114,228,213,183,115,230,209,191,99,198,145,63,126,252,229,215,179,123,246,241,255,227,219,171,75,150,49,98,196,149,55,110,220,165,87,174,65,130,25,50,100,200,141,7,14,28,56,112,224,221,167,83,166,81,162,89,178,121,242,249,239,195,155,43,86,172,69,138,9,18,36,72,144,61,122,244,245,247,243,251,235,203,139,11,22,44,88,176,125,250,233,207,131,27,54,108,216,173,71,142,0],R=[],m=[],p=[],M=[],x=[],F=2,Q=[],y=3,A=3,C=40,N=10,S=null,q=null,z={get ecclevel(){return F},set ecclevel(r){F=r},get size(){return q},set size(r){q=r},get canvas(){return S},set canvas(r){S=r},getFrame:function(r){return i(r)},draw:function(r,o,f,e){if(F=e||F,!(o=o||S))return void console.warn("No canvas provided to draw QR code in!");f=f||q||Math.min(o.width,o.height);var t=i(r),n=o.ctx,c=Math.round(f/(l+8)),a=c*(l+8),u=Math.floor((f-a)/2);f=a,n.clearRect(0,0,o.width,o.height),n.setFillStyle("#000000");for(var s=0;s<l;s++)for(var b=0;b<l;b++)t[b*l+s]&&n.fillRect(c*(4+s)+u,c*(4+b)+u,c,c);n.draw()}};module.exports={api:z}}();