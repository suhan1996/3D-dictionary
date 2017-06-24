/**
 * Created by Suhan on 21/06/2017.
 */
// https://github.com/vasturiano/3d-force-graph Version 1.3.7. Copyright 2017 Vasco Asturiano.

var THREEx	= THREEx	|| {}

//////////////////////////////////////////////////////////////////////////////////
//		Constructor							//
//////////////////////////////////////////////////////////////////////////////////

/**
 * create a dynamic texture with a underlying canvas
 *
 * @param {Number} width  width of the canvas
 * @param {Number} height height of the canvas
 */
THREEx.DynamicTexture	= function(width, height){
    var canvas	= document.createElement( 'canvas' )
    canvas.width	= width
    canvas.height	= height
    this.canvas	= canvas

    var context	= canvas.getContext( '2d' )
    this.context	= context

    var texture	= new THREE.Texture(canvas)
    this.texture	= texture
}

//////////////////////////////////////////////////////////////////////////////////
//		methods								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * clear the canvas
 *
 * @param  {String*} fillStyle 		the fillStyle to clear with, if not provided, fallback on .clearRect
 * @return {THREEx.DynamicTexture}      the object itself, for chained texture
 */
THREEx.DynamicTexture.prototype.clear = function(fillStyle){
    // depends on fillStyle
    if( fillStyle !== undefined ){
        this.context.fillStyle	= fillStyle
        this.context.fillRect(0,0,this.canvas.width, this.canvas.height)
    }else{
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
    }
    // make the texture as .needsUpdate
    this.texture.needsUpdate	= true;
    // for chained API
    return this;
}

/**
 * draw text
 *
 * @param  {String}		text	- the text to display
 * @param  {Number|undefined}	x	- if provided, it is the x where to draw, if not, the text is centered
 * @param  {Number}		y	- the y where to draw the text
 * @param  {String*} 		fillStyle - the fillStyle to clear with, if not provided, fallback on .clearRect
 * @param  {String*} 		contextFont - the font to use
 * @return {THREEx.DynamicTexture}	- the object itself, for chained texture
 */
THREEx.DynamicTexture.prototype.drawText = function(text, x, y, fillStyle, contextFont){
    // set font if needed
    if( contextFont !== undefined )	this.context.font = contextFont;
    // if x isnt provided
    if( x === undefined || x === null ){
        var textSize	= this.context.measureText(text);
        x = (this.canvas.width - textSize.width) / 2;
    }
    // actually draw the text
    this.context.fillStyle = fillStyle;
    this.context.fillText(text, x, y);
    // make the texture as .needsUpdate
    this.texture.needsUpdate	= true;
    // for chained API
    return this;
};

THREEx.DynamicTexture.prototype.drawTextCooked = function(options){
    var context	= this.context
    var canvas	= this.canvas
    options		= options	|| {}
    var text	= options.text
    var params	= {
        margin		: options.margin !== undefined ? options.margin	: 0.1,
        lineHeight	: options.lineHeight !== undefined ? options.lineHeight : 0.1,
        align		: options.align !== undefined ? options.align : 'left',
        fillStyle	: options.fillStyle !== undefined ? options.fillStyle : 'black',
        font		: options.font !== undefined ? options.font : "bold "+(0.2*512)+"px Arial",
    }
    // sanity check
    console.assert(typeof(text) === 'string')

    context.save()
    context.fillStyle	= params.fillStyle;
    context.font		= params.font;

    var y	= (params.lineHeight + params.margin)*canvas.height
    while(text.length > 0 ){
        // compute the text for specifically this line
        var maxText	= computeMaxTextLength(text)
        // update the remaining text
        text	= text.substr(maxText.length)


        // compute x based on params.align
        var textSize	= context.measureText(maxText);
        if( params.align === 'left' ){
            var x	= params.margin*canvas.width
        }else if( params.align === 'right' ){
            var x	= (1-params.margin)*canvas.width - textSize.width
        }else if( params.align === 'center' ){
            var x = (canvas.width - textSize.width) / 2;
        }else	console.assert( false )

        // actually draw the text at the proper position
        this.context.fillText(maxText, x, y);

        // goto the next line
        y	+= params.lineHeight*canvas.height
    }
    context.restore()

    // make the texture as .needsUpdate
    this.texture.needsUpdate	= true;
    // for chained API
    return this;

    function computeMaxTextLength(text){
        var maxText	= ''
        var maxWidth	= (1-params.margin*2)*canvas.width
        while( maxText.length !== text.length ){
            var textSize	= context.measureText(maxText);
            if( textSize.width > maxWidth )	break;
            maxText	+= text.substr(maxText.length, 1)
        }
        return maxText
    }
}

/**
 * execute the drawImage on the internal context
 * the arguments are the same the official context2d.drawImage
 */
THREEx.DynamicTexture.prototype.drawImage	= function(/* same params as context2d.drawImage */){
    // call the drawImage
    this.context.drawImage.apply(this.context, arguments)
    // make the texture as .needsUpdate
    this.texture.needsUpdate	= true;
    // for chained API
    return this;
}


!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.ForceGraph3D = e()
}(this, function () {
    "use strict";
    function t() {
    }

    function e(t, e) {
        this.x = t || 0, this.y = e || 0
    }

    function n(t, i, r, o, a, s, c, h, l, u) {
        Object.defineProperty(this, "id", {value: Zc++}), this.uuid = Yc.generateUUID(), this.name = "", this.image = void 0 !== t ? t : n.DEFAULT_IMAGE, this.mipmaps = [], this.mapping = void 0 !== i ? i : n.DEFAULT_MAPPING, this.wrapS = void 0 !== r ? r : Qs, this.wrapT = void 0 !== o ? o : Qs, this.magFilter = void 0 !== a ? a : nc, this.minFilter = void 0 !== s ? s : rc, this.anisotropy = void 0 !== l ? l : 1, this.format = void 0 !== c ? c : xc, this.type = void 0 !== h ? h : oc, this.offset = new e(0, 0), this.repeat = new e(1, 1), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.encoding = void 0 !== u ? u : Fc, this.version = 0, this.onUpdate = null
    }

    function i(t, e, n, i) {
        this.x = t || 0, this.y = e || 0, this.z = n || 0, this.w = void 0 !== i ? i : 1
    }

    function r(t, e, r) {
        this.uuid = Yc.generateUUID(), this.width = t, this.height = e, this.scissor = new i(0, 0, t, e), this.scissorTest = !1, this.viewport = new i(0, 0, t, e), r = r || {}, void 0 === r.minFilter && (r.minFilter = nc), this.texture = new n(void 0, void 0, r.wrapS, r.wrapT, r.magFilter, r.minFilter, r.format, r.type, r.anisotropy, r.encoding), this.depthBuffer = void 0 === r.depthBuffer || r.depthBuffer, this.stencilBuffer = void 0 === r.stencilBuffer || r.stencilBuffer, this.depthTexture = void 0 !== r.depthTexture ? r.depthTexture : null
    }

    function o(t, e, n) {
        r.call(this, t, e, n), this.activeCubeFace = 0, this.activeMipMapLevel = 0
    }

    function a(t, e, n, i) {
        this._x = t || 0, this._y = e || 0, this._z = n || 0, this._w = void 0 !== i ? i : 1
    }

    function s(t, e, n) {
        this.x = t || 0, this.y = e || 0, this.z = n || 0
    }

    function c() {
        this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]), arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
    }

    function h(t, e, i, r, o, a, s, c, h, l) {
        t = void 0 !== t ? t : [], e = void 0 !== e ? e : Vs, n.call(this, t, e, i, r, o, a, s, c, h, l), this.flipY = !1
    }

    function l() {
        this.seq = [], this.map = {}
    }

    function u(t, e, n) {
        var i = t[0];
        if (i <= 0 || i > 0)return t;
        var r = e * n, o = Kc[r];
        if (void 0 === o && (o = new Float32Array(r), Kc[r] = o), 0 !== e) {
            i.toArray(o, 0);
            for (var a = 1, s = 0; a !== e; ++a)s += n, t[a].toArray(o, s)
        }
        return o
    }

    function p(t, e) {
        var n = $c[e];
        void 0 === n && (n = new Int32Array(e), $c[e] = n);
        for (var i = 0; i !== e; ++i)n[i] = t.allocTextureUnit();
        return n
    }

    function d(t, e) {
        t.uniform1f(this.addr, e)
    }

    function f(t, e) {
        t.uniform1i(this.addr, e)
    }

    function m(t, e) {
        void 0 === e.x ? t.uniform2fv(this.addr, e) : t.uniform2f(this.addr, e.x, e.y)
    }

    function g(t, e) {
        void 0 !== e.x ? t.uniform3f(this.addr, e.x, e.y, e.z) : void 0 !== e.r ? t.uniform3f(this.addr, e.r, e.g, e.b) : t.uniform3fv(this.addr, e)
    }

    function v(t, e) {
        void 0 === e.x ? t.uniform4fv(this.addr, e) : t.uniform4f(this.addr, e.x, e.y, e.z, e.w)
    }

    function y(t, e) {
        t.uniformMatrix2fv(this.addr, !1, e.elements || e)
    }

    function x(t, e) {
        t.uniformMatrix3fv(this.addr, !1, e.elements || e)
    }

    function _(t, e) {
        t.uniformMatrix4fv(this.addr, !1, e.elements || e)
    }

    function b(t, e, n) {
        var i = n.allocTextureUnit();
        t.uniform1i(this.addr, i), n.setTexture2D(e || Jc, i)
    }

    function w(t, e, n) {
        var i = n.allocTextureUnit();
        t.uniform1i(this.addr, i), n.setTextureCube(e || Qc, i)
    }

    function M(t, e) {
        t.uniform2iv(this.addr, e)
    }

    function E(t, e) {
        t.uniform3iv(this.addr, e)
    }

    function T(t, e) {
        t.uniform4iv(this.addr, e)
    }

    function S(t) {
        switch (t) {
            case 5126:
                return d;
            case 35664:
                return m;
            case 35665:
                return g;
            case 35666:
                return v;
            case 35674:
                return y;
            case 35675:
                return x;
            case 35676:
                return _;
            case 35678:
                return b;
            case 35680:
                return w;
            case 5124:
            case 35670:
                return f;
            case 35667:
            case 35671:
                return M;
            case 35668:
            case 35672:
                return E;
            case 35669:
            case 35673:
                return T
        }
    }

    function A(t, e) {
        t.uniform1fv(this.addr, e)
    }

    function L(t, e) {
        t.uniform1iv(this.addr, e)
    }

    function R(t, e) {
        t.uniform2fv(this.addr, u(e, this.size, 2))
    }

    function P(t, e) {
        t.uniform3fv(this.addr, u(e, this.size, 3))
    }

    function C(t, e) {
        t.uniform4fv(this.addr, u(e, this.size, 4))
    }

    function N(t, e) {
        t.uniformMatrix2fv(this.addr, !1, u(e, this.size, 4))
    }

    function I(t, e) {
        t.uniformMatrix3fv(this.addr, !1, u(e, this.size, 9))
    }

    function U(t, e) {
        t.uniformMatrix4fv(this.addr, !1, u(e, this.size, 16))
    }

    function D(t, e, n) {
        var i = e.length, r = p(n, i);
        t.uniform1iv(this.addr, r);
        for (var o = 0; o !== i; ++o)n.setTexture2D(e[o] || Jc, r[o])
    }

    function O(t, e, n) {
        var i = e.length, r = p(n, i);
        t.uniform1iv(this.addr, r);
        for (var o = 0; o !== i; ++o)n.setTextureCube(e[o] || Qc, r[o])
    }

    function z(t) {
        switch (t) {
            case 5126:
                return A;
            case 35664:
                return R;
            case 35665:
                return P;
            case 35666:
                return C;
            case 35674:
                return N;
            case 35675:
                return I;
            case 35676:
                return U;
            case 35678:
                return D;
            case 35680:
                return O;
            case 5124:
            case 35670:
                return L;
            case 35667:
            case 35671:
                return M;
            case 35668:
            case 35672:
                return E;
            case 35669:
            case 35673:
                return T
        }
    }

    function B(t, e, n) {
        this.id = t, this.addr = n, this.setValue = S(e.type)
    }

    function F(t, e, n) {
        this.id = t, this.addr = n, this.size = e.size, this.setValue = z(e.type)
    }

    function G(t) {
        this.id = t, l.call(this)
    }

    function k(t, e) {
        t.seq.push(e), t.map[e.id] = e
    }

    function H(t, e, n) {
        var i = t.name, r = i.length;
        for (th.lastIndex = 0; ;) {
            var o = th.exec(i), a = th.lastIndex, s = o[1], c = "]" === o[2], h = o[3];
            if (c && (s |= 0), void 0 === h || "[" === h && a + 2 === r) {
                k(n, void 0 === h ? new B(s, t, e) : new F(s, t, e));
                break
            }
            var l = n.map, u = l[s];
            void 0 === u && (u = new G(s), k(n, u)), n = u
        }
    }

    function V(t, e, n) {
        l.call(this), this.renderer = n;
        for (var i = t.getProgramParameter(e, t.ACTIVE_UNIFORMS), r = 0; r < i; ++r) {
            var o = t.getActiveUniform(e, r), a = o.name;
            H(o, t.getUniformLocation(e, a), this)
        }
    }

    function j(t, e, n) {
        return void 0 === e && void 0 === n ? this.set(t) : this.setRGB(t, e, n)
    }

    function W(t, e, i, r, o, a, s, c, h, l, u, p) {
        n.call(this, null, a, s, c, h, l, r, o, u, p), this.image = {
            data: t,
            width: e,
            height: i
        }, this.magFilter = void 0 !== h ? h : $s, this.minFilter = void 0 !== l ? l : $s, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1
    }

    function q(t, n) {
        this.min = void 0 !== t ? t : new e(+(1 / 0), +(1 / 0)), this.max = void 0 !== n ? n : new e(-(1 / 0), -(1 / 0))
    }

    function X(t, n) {
        function i() {
            var t = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1, -1, 1, 0, 1]),
                e = new Uint16Array([0, 1, 2, 0, 2, 3]);
            o = f.createBuffer(), a = f.createBuffer(), f.bindBuffer(f.ARRAY_BUFFER, o), f.bufferData(f.ARRAY_BUFFER, t, f.STATIC_DRAW), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, a), f.bufferData(f.ELEMENT_ARRAY_BUFFER, e, f.STATIC_DRAW), p = f.createTexture(), d = f.createTexture(), m.bindTexture(f.TEXTURE_2D, p), f.texImage2D(f.TEXTURE_2D, 0, f.RGB, 16, 16, 0, f.RGB, f.UNSIGNED_BYTE, null), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.NEAREST), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.NEAREST), m.bindTexture(f.TEXTURE_2D, d), f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, 16, 16, 0, f.RGBA, f.UNSIGNED_BYTE, null), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.NEAREST), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.NEAREST), c = {
                vertexShader: ["uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "uniform sampler2D occlusionMap;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "vUV = uv;", "vec2 pos = position;", "if ( renderType == 2 ) {", "vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );", "vVisibility =        visibility.r / 9.0;", "vVisibility *= 1.0 - visibility.g / 9.0;", "vVisibility *=       visibility.b / 9.0;", "vVisibility *= 1.0 - visibility.a / 9.0;", "pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "}", "gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}"].join("\n"),
                fragmentShader: ["uniform lowp int renderType;", "uniform sampler2D map;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "if ( renderType == 0 ) {", "gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );", "} else if ( renderType == 1 ) {", "gl_FragColor = texture2D( map, vUV );", "} else {", "vec4 texture = texture2D( map, vUV );", "texture.a *= opacity * vVisibility;", "gl_FragColor = texture;", "gl_FragColor.rgb *= color;", "}", "}"].join("\n")
            }, h = r(c), l = {
                vertex: f.getAttribLocation(h, "position"),
                uv: f.getAttribLocation(h, "uv")
            }, u = {
                renderType: f.getUniformLocation(h, "renderType"),
                map: f.getUniformLocation(h, "map"),
                occlusionMap: f.getUniformLocation(h, "occlusionMap"),
                opacity: f.getUniformLocation(h, "opacity"),
                color: f.getUniformLocation(h, "color"),
                scale: f.getUniformLocation(h, "scale"),
                rotation: f.getUniformLocation(h, "rotation"),
                screenPosition: f.getUniformLocation(h, "screenPosition")
            }
        }

        function r(e) {
            var n = f.createProgram(), i = f.createShader(f.FRAGMENT_SHADER), r = f.createShader(f.VERTEX_SHADER),
                o = "precision " + t.getPrecision() + " float;\n";
            return f.shaderSource(i, o + e.fragmentShader), f.shaderSource(r, o + e.vertexShader), f.compileShader(i), f.compileShader(r), f.attachShader(n, i), f.attachShader(n, r), f.linkProgram(n), n
        }

        var o, a, c, h, l, u, p, d, f = t.context, m = t.state;
        this.render = function (r, c, g) {
            if (0 !== n.length) {
                var v = new s, y = g.w / g.z, x = .5 * g.z, _ = .5 * g.w, b = 16 / g.w, w = new e(b * y, b),
                    M = new s(1, 1, 0), E = new e(1, 1), T = new q;
                T.min.set(g.x, g.y), T.max.set(g.x + (g.z - 16), g.y + (g.w - 16)), void 0 === h && i(), f.useProgram(h), m.initAttributes(), m.enableAttribute(l.vertex), m.enableAttribute(l.uv), m.disableUnusedAttributes(), f.uniform1i(u.occlusionMap, 0), f.uniform1i(u.map, 1), f.bindBuffer(f.ARRAY_BUFFER, o), f.vertexAttribPointer(l.vertex, 2, f.FLOAT, !1, 16, 0), f.vertexAttribPointer(l.uv, 2, f.FLOAT, !1, 16, 8), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, a), m.disable(f.CULL_FACE), m.setDepthWrite(!1);
                for (var S = 0, A = n.length; S < A; S++) {
                    b = 16 / g.w, w.set(b * y, b);
                    var L = n[S];
                    if (v.set(L.matrixWorld.elements[12], L.matrixWorld.elements[13], L.matrixWorld.elements[14]), v.applyMatrix4(c.matrixWorldInverse), v.applyMatrix4(c.projectionMatrix), M.copy(v), E.x = g.x + M.x * x + x - 8, E.y = g.y + M.y * _ + _ - 8, T.containsPoint(E) === !0) {
                        m.activeTexture(f.TEXTURE0), m.bindTexture(f.TEXTURE_2D, null), m.activeTexture(f.TEXTURE1), m.bindTexture(f.TEXTURE_2D, p), f.copyTexImage2D(f.TEXTURE_2D, 0, f.RGB, E.x, E.y, 16, 16, 0), f.uniform1i(u.renderType, 0), f.uniform2f(u.scale, w.x, w.y), f.uniform3f(u.screenPosition, M.x, M.y, M.z), m.disable(f.BLEND), m.enable(f.DEPTH_TEST), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0), m.activeTexture(f.TEXTURE0), m.bindTexture(f.TEXTURE_2D, d), f.copyTexImage2D(f.TEXTURE_2D, 0, f.RGBA, E.x, E.y, 16, 16, 0), f.uniform1i(u.renderType, 1), m.disable(f.DEPTH_TEST), m.activeTexture(f.TEXTURE1), m.bindTexture(f.TEXTURE_2D, p), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0), L.positionScreen.copy(M), L.customUpdateCallback ? L.customUpdateCallback(L) : L.updateLensFlares(), f.uniform1i(u.renderType, 2), m.enable(f.BLEND);
                        for (var R = 0, P = L.lensFlares.length; R < P; R++) {
                            var C = L.lensFlares[R];
                            C.opacity > .001 && C.scale > .001 && (M.x = C.x, M.y = C.y, M.z = C.z, b = C.size * C.scale / g.w, w.x = b * y, w.y = b, f.uniform3f(u.screenPosition, M.x, M.y, M.z), f.uniform2f(u.scale, w.x, w.y), f.uniform1f(u.rotation, C.rotation), f.uniform1f(u.opacity, C.opacity), f.uniform3f(u.color, C.color.r, C.color.g, C.color.b), m.setBlending(C.blending, C.blendEquation, C.blendSrc, C.blendDst), t.setTexture2D(C.texture, 1), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0))
                        }
                    }
                }
                m.enable(f.CULL_FACE), m.enable(f.DEPTH_TEST), m.setDepthWrite(!0), t.resetGLState()
            }
        }
    }

    function Y(t, e) {
        function i() {
            var t = new Float32Array([-.5, -.5, 0, 0, .5, -.5, 1, 0, .5, .5, 1, 1, -.5, .5, 0, 1]),
                e = new Uint16Array([0, 1, 2, 0, 2, 3]);
            c = f.createBuffer(), h = f.createBuffer(), f.bindBuffer(f.ARRAY_BUFFER, c), f.bufferData(f.ARRAY_BUFFER, t, f.STATIC_DRAW), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, h), f.bufferData(f.ELEMENT_ARRAY_BUFFER, e, f.STATIC_DRAW), l = r(), u = {
                position: f.getAttribLocation(l, "position"),
                uv: f.getAttribLocation(l, "uv")
            }, p = {
                uvOffset: f.getUniformLocation(l, "uvOffset"),
                uvScale: f.getUniformLocation(l, "uvScale"),
                rotation: f.getUniformLocation(l, "rotation"),
                scale: f.getUniformLocation(l, "scale"),
                color: f.getUniformLocation(l, "color"),
                map: f.getUniformLocation(l, "map"),
                opacity: f.getUniformLocation(l, "opacity"),
                modelViewMatrix: f.getUniformLocation(l, "modelViewMatrix"),
                projectionMatrix: f.getUniformLocation(l, "projectionMatrix"),
                fogType: f.getUniformLocation(l, "fogType"),
                fogDensity: f.getUniformLocation(l, "fogDensity"),
                fogNear: f.getUniformLocation(l, "fogNear"),
                fogFar: f.getUniformLocation(l, "fogFar"),
                fogColor: f.getUniformLocation(l, "fogColor"),
                alphaTest: f.getUniformLocation(l, "alphaTest")
            };
            var i = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
            i.width = 8, i.height = 8;
            var o = i.getContext("2d");
            o.fillStyle = "white", o.fillRect(0, 0, 8, 8), d = new n(i), d.needsUpdate = !0
        }

        function r() {
            var e = f.createProgram(), n = f.createShader(f.VERTEX_SHADER), i = f.createShader(f.FRAGMENT_SHADER);
            return f.shaderSource(n, ["precision " + t.getPrecision() + " float;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform float rotation;", "uniform vec2 scale;", "uniform vec2 uvOffset;", "uniform vec2 uvScale;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uvOffset + uv * uvScale;", "vec2 alignedPosition = position * scale;", "vec2 rotatedPosition;", "rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;", "rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;", "vec4 finalPosition;", "finalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );", "finalPosition.xy += rotatedPosition;", "finalPosition = projectionMatrix * finalPosition;", "gl_Position = finalPosition;", "}"].join("\n")), f.shaderSource(i, ["precision " + t.getPrecision() + " float;", "uniform vec3 color;", "uniform sampler2D map;", "uniform float opacity;", "uniform int fogType;", "uniform vec3 fogColor;", "uniform float fogDensity;", "uniform float fogNear;", "uniform float fogFar;", "uniform float alphaTest;", "varying vec2 vUV;", "void main() {", "vec4 texture = texture2D( map, vUV );", "if ( texture.a < alphaTest ) discard;", "gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );", "if ( fogType > 0 ) {", "float depth = gl_FragCoord.z / gl_FragCoord.w;", "float fogFactor = 0.0;", "if ( fogType == 1 ) {", "fogFactor = smoothstep( fogNear, fogFar, depth );", "} else {", "const float LOG2 = 1.442695;", "fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );", "fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );", "}", "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );", "}", "}"].join("\n")), f.compileShader(n), f.compileShader(i), f.attachShader(e, n), f.attachShader(e, i), f.linkProgram(e), e
        }

        function o(t, e) {
            return t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.z !== e.z ? e.z - t.z : e.id - t.id
        }

        var c, h, l, u, p, d, f = t.context, m = t.state, g = new s, v = new a, y = new s;
        this.render = function (n, r) {
            if (0 !== e.length) {
                void 0 === l && i(), f.useProgram(l), m.initAttributes(), m.enableAttribute(u.position), m.enableAttribute(u.uv), m.disableUnusedAttributes(), m.disable(f.CULL_FACE), m.enable(f.BLEND), f.bindBuffer(f.ARRAY_BUFFER, c), f.vertexAttribPointer(u.position, 2, f.FLOAT, !1, 16, 0), f.vertexAttribPointer(u.uv, 2, f.FLOAT, !1, 16, 8), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, h), f.uniformMatrix4fv(p.projectionMatrix, !1, r.projectionMatrix.elements), m.activeTexture(f.TEXTURE0), f.uniform1i(p.map, 0);
                var a = 0, s = 0, x = n.fog;
                x ? (f.uniform3f(p.fogColor, x.color.r, x.color.g, x.color.b), x.isFog ? (f.uniform1f(p.fogNear, x.near), f.uniform1f(p.fogFar, x.far), f.uniform1i(p.fogType, 1), a = 1, s = 1) : x.isFogExp2 && (f.uniform1f(p.fogDensity, x.density), f.uniform1i(p.fogType, 2), a = 2, s = 2)) : (f.uniform1i(p.fogType, 0), a = 0, s = 0);
                for (var _ = 0, b = e.length; _ < b; _++) {
                    var w = e[_];
                    w.modelViewMatrix.multiplyMatrices(r.matrixWorldInverse, w.matrixWorld), w.z = -w.modelViewMatrix.elements[14]
                }
                e.sort(o);
                for (var M = [], _ = 0, b = e.length; _ < b; _++) {
                    var w = e[_], E = w.material;
                    if (E.visible !== !1) {
                        f.uniform1f(p.alphaTest, E.alphaTest), f.uniformMatrix4fv(p.modelViewMatrix, !1, w.modelViewMatrix.elements), w.matrixWorld.decompose(g, v, y), M[0] = y.x, M[1] = y.y;
                        var T = 0;
                        n.fog && E.fog && (T = s), a !== T && (f.uniform1i(p.fogType, T), a = T), null !== E.map ? (f.uniform2f(p.uvOffset, E.map.offset.x, E.map.offset.y), f.uniform2f(p.uvScale, E.map.repeat.x, E.map.repeat.y)) : (f.uniform2f(p.uvOffset, 0, 0), f.uniform2f(p.uvScale, 1, 1)), f.uniform1f(p.opacity, E.opacity), f.uniform3f(p.color, E.color.r, E.color.g, E.color.b), f.uniform1f(p.rotation, E.rotation), f.uniform2fv(p.scale, M), m.setBlending(E.blending, E.blendEquation, E.blendSrc, E.blendDst), m.setDepthTest(E.depthTest), m.setDepthWrite(E.depthWrite), E.map ? t.setTexture2D(E.map, 0) : t.setTexture2D(d, 0), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0)
                    }
                }
                m.enable(f.CULL_FACE), t.resetGLState()
            }
        }
    }

    function Z() {
        Object.defineProperty(this, "id", {value: ah++}), this.uuid = Yc.generateUUID(), this.name = "", this.type = "Material", this.fog = !0, this.lights = !0, this.blending = as, this.side = Qa, this.shading = es, this.vertexColors = ns, this.opacity = 1, this.transparent = !1, this.blendSrc = _s, this.blendDst = bs, this.blendEquation = us, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = Ps, this.depthTest = !0, this.depthWrite = !0, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.alphaTest = 0, this.premultipliedAlpha = !1, this.overdraw = 0, this.visible = !0, this._needsUpdate = !0
    }

    function J(t) {
        Z.call(this), this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.extensions = {
            derivatives: !1,
            fragDepth: !1,
            drawBuffers: !1,
            shaderTextureLOD: !1
        }, this.defaultAttributeValues = {
            color: [1, 1, 1],
            uv: [0, 0],
            uv2: [0, 0]
        }, this.index0AttributeName = void 0, void 0 !== t && (void 0 !== t.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."), this.setValues(t))
    }

    function Q(t) {
        Z.call(this), this.type = "MeshDepthMaterial", this.depthPacking = qc, this.skinning = !1, this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.setValues(t)
    }

    function K(t, e) {
        this.min = void 0 !== t ? t : new s(+(1 / 0), +(1 / 0), +(1 / 0)), this.max = void 0 !== e ? e : new s(-(1 / 0), -(1 / 0), -(1 / 0))
    }

    function $(t, e) {
        this.center = void 0 !== t ? t : new s, this.radius = void 0 !== e ? e : 0
    }

    function tt() {
        this.elements = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]), arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
    }

    function et(t, e) {
        this.normal = void 0 !== t ? t : new s(1, 0, 0), this.constant = void 0 !== e ? e : 0
    }

    function nt(t, e, n, i, r, o) {
        this.planes = [void 0 !== t ? t : new et, void 0 !== e ? e : new et, void 0 !== n ? n : new et, void 0 !== i ? i : new et, void 0 !== r ? r : new et, void 0 !== o ? o : new et]
    }

    function it(t, n, o, a) {
        function h(e, n, i, r) {
            var o = e.geometry, a = null, s = E, c = e.customDepthMaterial;
            if (i && (s = T, c = e.customDistanceMaterial), c) a = c; else {
                var h = !1;
                n.morphTargets && (o && o.isBufferGeometry ? h = o.morphAttributes && o.morphAttributes.position && o.morphAttributes.position.length > 0 : o && o.isGeometry && (h = o.morphTargets && o.morphTargets.length > 0));
                var l = e.isSkinnedMesh && n.skinning, u = 0;
                h && (u |= b), l && (u |= w), a = s[u]
            }
            if (t.localClippingEnabled && n.clipShadows === !0 && 0 !== n.clippingPlanes.length) {
                var p = a.uuid, d = n.uuid, f = S[p];
                void 0 === f && (f = {}, S[p] = f);
                var m = f[d];
                void 0 === m && (m = a.clone(), f[d] = m), a = m
            }
            a.visible = n.visible, a.wireframe = n.wireframe;
            var g = n.side;
            return B.renderSingleSided && g == $a && (g = Qa), B.renderReverseSided && (g === Qa ? g = Ka : g === Ka && (g = Qa)), a.side = g, a.clipShadows = n.clipShadows, a.clippingPlanes = n.clippingPlanes, a.wireframeLinewidth = n.wireframeLinewidth, a.linewidth = n.linewidth, i && void 0 !== a.uniforms.lightPos && a.uniforms.lightPos.value.copy(r), a
        }

        function l(t, e, n) {
            if (t.visible !== !1) {
                if (0 != (t.layers.mask & e.layers.mask) && (t.isMesh || t.isLine || t.isPoints) && t.castShadow && (t.frustumCulled === !1 || d.intersectsObject(t) === !0)) {
                    t.material.visible === !0 && (t.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, t.matrixWorld), _.push(t))
                }
                for (var i = t.children, r = 0, o = i.length; r < o; r++)l(i[r], e, n)
            }
        }

        var u = t.context, p = t.state, d = new nt, f = new c, m = n.shadows, g = new e,
            v = new e(a.maxTextureSize, a.maxTextureSize), y = new s, x = new s, _ = [], b = 1, w = 2, M = 1 + (b | w),
            E = new Array(M), T = new Array(M), S = {},
            A = [new s(1, 0, 0), new s(-1, 0, 0), new s(0, 0, 1), new s(0, 0, -1), new s(0, 1, 0), new s(0, -1, 0)],
            L = [new s(0, 1, 0), new s(0, 1, 0), new s(0, 1, 0), new s(0, 1, 0), new s(0, 0, 1), new s(0, 0, -1)],
            R = [new i, new i, new i, new i, new i, new i], P = new Q;
        P.depthPacking = Xc, P.clipping = !0;
        for (var C = oh.distanceRGBA, N = eh.clone(C.uniforms), I = 0; I !== M; ++I) {
            var U = 0 != (I & b), D = 0 != (I & w), O = P.clone();
            O.morphTargets = U, O.skinning = D, E[I] = O;
            var z = new J({
                defines: {USE_SHADOWMAP: ""},
                uniforms: N,
                vertexShader: C.vertexShader,
                fragmentShader: C.fragmentShader,
                morphTargets: U,
                skinning: D,
                clipping: !0
            });
            T[I] = z
        }
        var B = this;
        this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = Za, this.renderReverseSided = !0, this.renderSingleSided = !0, this.render = function (e, n) {
            if (B.enabled !== !1 && (B.autoUpdate !== !1 || B.needsUpdate !== !1) && 0 !== m.length) {
                p.buffers.color.setClear(1, 1, 1, 1), p.disable(u.BLEND), p.setDepthTest(!0), p.setScissorTest(!1);
                for (var i, a, s = 0, c = m.length; s < c; s++) {
                    var b = m[s], w = b.shadow;
                    if (void 0 !== w) {
                        var M = w.camera;
                        if (g.copy(w.mapSize), g.min(v), b && b.isPointLight) {
                            i = 6, a = !0;
                            var E = g.x, T = g.y;
                            R[0].set(2 * E, T, E, T), R[1].set(0, T, E, T), R[2].set(3 * E, T, E, T), R[3].set(E, T, E, T), R[4].set(3 * E, 0, E, T), R[5].set(E, 0, E, T), g.x *= 4, g.y *= 2
                        } else i = 1, a = !1;
                        if (null === w.map) {
                            var S = {minFilter: $s, magFilter: $s, format: xc};
                            w.map = new r(g.x, g.y, S), M.updateProjectionMatrix()
                        }
                        w.isSpotLightShadow && w.update(b), w && w.isRectAreaLightShadow && w.update(b);
                        var P = w.map, C = w.matrix;
                        x.setFromMatrixPosition(b.matrixWorld), M.position.copy(x), t.setRenderTarget(P), t.clear();
                        for (var N = 0; N < i; N++) {
                            if (a) {
                                y.copy(M.position), y.add(A[N]), M.up.copy(L[N]), M.lookAt(y);
                                var I = R[N];
                                p.viewport(I)
                            } else y.setFromMatrixPosition(b.target.matrixWorld), M.lookAt(y);
                            M.updateMatrixWorld(), M.matrixWorldInverse.getInverse(M.matrixWorld), C.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), C.multiply(M.projectionMatrix), C.multiply(M.matrixWorldInverse), f.multiplyMatrices(M.projectionMatrix, M.matrixWorldInverse), d.setFromMatrix(f), _.length = 0, l(e, n, M);
                            for (var U = 0, D = _.length; U < D; U++) {
                                var O = _[U], z = o.update(O), F = O.material;
                                if (F && F.isMultiMaterial)for (var G = z.groups, k = F.materials, H = 0, V = G.length; H < V; H++) {
                                    var j = G[H], W = k[j.materialIndex];
                                    if (W.visible === !0) {
                                        var q = h(O, W, a, x);
                                        t.renderBufferDirect(M, null, z, q, O, j)
                                    }
                                } else {
                                    var q = h(O, F, a, x);
                                    t.renderBufferDirect(M, null, z, q, O, null)
                                }
                            }
                        }
                    } else console.warn("THREE.WebGLShadowMap:", b, "has no shadow.")
                }
                var X = t.getClearColor(), Y = t.getClearAlpha();
                t.setClearColor(X, Y), B.needsUpdate = !1
            }
        }
    }

    function rt(t, e) {
        this.origin = void 0 !== t ? t : new s, this.direction = void 0 !== e ? e : new s
    }

    function ot(t, e, n, i) {
        this._x = t || 0, this._y = e || 0, this._z = n || 0, this._order = i || ot.DefaultOrder
    }

    function at() {
        this.mask = 1
    }

    function st() {
        function t() {
            r.setFromEuler(i, !1)
        }

        function e() {
            i.setFromQuaternion(r, void 0, !1)
        }

        Object.defineProperty(this, "id", {value: sh++}), this.uuid = Yc.generateUUID(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = st.DefaultUp.clone();
        var n = new s, i = new ot, r = new a, o = new s(1, 1, 1);
        i.onChange(t), r.onChange(e), Object.defineProperties(this, {
            position: {enumerable: !0, value: n},
            rotation: {enumerable: !0, value: i},
            quaternion: {enumerable: !0, value: r},
            scale: {enumerable: !0, value: o},
            modelViewMatrix: {value: new c},
            normalMatrix: {value: new tt}
        }), this.matrix = new c, this.matrixWorld = new c, this.matrixAutoUpdate = st.DefaultMatrixAutoUpdate, this.matrixWorldNeedsUpdate = !1, this.layers = new at, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.userData = {}, this.onBeforeRender = function () {
        }, this.onAfterRender = function () {
        }
    }

    function ct(t, e) {
        this.start = void 0 !== t ? t : new s, this.end = void 0 !== e ? e : new s
    }

    function ht(t, e, n) {
        this.a = void 0 !== t ? t : new s, this.b = void 0 !== e ? e : new s, this.c = void 0 !== n ? n : new s
    }

    function lt(t, e, n, i, r, o) {
        this.a = t, this.b = e, this.c = n, this.normal = i && i.isVector3 ? i : new s, this.vertexNormals = Array.isArray(i) ? i : [], this.color = r && r.isColor ? r : new j, this.vertexColors = Array.isArray(r) ? r : [], this.materialIndex = void 0 !== o ? o : 0
    }

    function ut(t) {
        Z.call(this), this.type = "MeshBasicMaterial", this.color = new j(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = Ds, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.lights = !1, this.setValues(t)
    }

    function pt(t, e, n) {
        if (Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
        this.uuid = Yc.generateUUID(), this.array = t, this.itemSize = e, this.count = void 0 !== t ? t.length / e : 0, this.normalized = n === !0, this.dynamic = !1, this.updateRange = {
            offset: 0,
            count: -1
        }, this.onUploadCallback = function () {
        }, this.version = 0
    }

    function dt(t, e) {
        pt.call(this, new Int8Array(t), e)
    }

    function ft(t, e) {
        pt.call(this, new Uint8Array(t), e)
    }

    function mt(t, e) {
        pt.call(this, new Uint8ClampedArray(t), e)
    }

    function gt(t, e) {
        pt.call(this, new Int16Array(t), e)
    }

    function vt(t, e) {
        pt.call(this, new Uint16Array(t), e)
    }

    function yt(t, e) {
        pt.call(this, new Int32Array(t), e)
    }

    function xt(t, e) {
        pt.call(this, new Uint32Array(t), e)
    }

    function _t(t, e) {
        pt.call(this, new Float32Array(t), e)
    }

    function bt(t, e) {
        pt.call(this, new Float64Array(t), e)
    }

    function wt() {
        this.indices = [], this.vertices = [], this.normals = [], this.colors = [], this.uvs = [], this.uvs2 = [], this.groups = [], this.morphTargets = {}, this.skinWeights = [], this.skinIndices = [], this.boundingBox = null, this.boundingSphere = null, this.verticesNeedUpdate = !1, this.normalsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.uvsNeedUpdate = !1, this.groupsNeedUpdate = !1
    }

    function Mt(t) {
        for (var e = t.length, n = -(1 / 0); e--;)t[e] > n && (n = t[e]);
        return n
    }

    function Et() {
        return ch++
    }

    function Tt() {
        Object.defineProperty(this, "id", {value: Et()}), this.uuid = Yc.generateUUID(), this.name = "", this.type = "Geometry", this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [[]], this.morphTargets = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.elementsNeedUpdate = !1, this.verticesNeedUpdate = !1, this.uvsNeedUpdate = !1, this.normalsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.lineDistancesNeedUpdate = !1, this.groupsNeedUpdate = !1
    }

    function St() {
        Object.defineProperty(this, "id", {value: Et()}), this.uuid = Yc.generateUUID(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
            start: 0,
            count: 1 / 0
        }
    }

    function At(t, e) {
        st.call(this), this.type = "Mesh", this.geometry = void 0 !== t ? t : new St, this.material = void 0 !== e ? e : new ut({color: 16777215 * Math.random()}), this.drawMode = Oc, this.updateMorphTargets()
    }

    function Lt(t, e, n, i, r, o) {
        Tt.call(this), this.type = "BoxGeometry", this.parameters = {
            width: t,
            height: e,
            depth: n,
            widthSegments: i,
            heightSegments: r,
            depthSegments: o
        }, this.fromBufferGeometry(new Rt(t, e, n, i, r, o)), this.mergeVertices()
    }

    function Rt(t, e, n, i, r, o) {
        function a(t, e, n, i, r, o, a, m, g, v, y) {
            var x, _, b = o / g, w = a / v, M = o / 2, E = a / 2, T = m / 2, S = g + 1, A = v + 1, L = 0, R = 0,
                P = new s;
            for (_ = 0; _ < A; _++) {
                var C = _ * w - E;
                for (x = 0; x < S; x++) {
                    var N = x * b - M;
                    P[t] = N * i, P[e] = C * r, P[n] = T, l.push(P.x, P.y, P.z), P[t] = 0, P[e] = 0, P[n] = m > 0 ? 1 : -1, u.push(P.x, P.y, P.z), p.push(x / g), p.push(1 - _ / v), L += 1
                }
            }
            for (_ = 0; _ < v; _++)for (x = 0; x < g; x++) {
                var I = d + x + S * _, U = d + x + S * (_ + 1), D = d + (x + 1) + S * (_ + 1), O = d + (x + 1) + S * _;
                h.push(I, U, O), h.push(U, D, O), R += 6
            }
            c.addGroup(f, R, y), f += R, d += L
        }

        St.call(this), this.type = "BoxBufferGeometry", this.parameters = {
            width: t,
            height: e,
            depth: n,
            widthSegments: i,
            heightSegments: r,
            depthSegments: o
        };
        var c = this;
        i = Math.floor(i) || 1, r = Math.floor(r) || 1, o = Math.floor(o) || 1;
        var h = [], l = [], u = [], p = [], d = 0, f = 0;
        a("z", "y", "x", -1, -1, n, e, t, o, r, 0), a("z", "y", "x", 1, -1, n, e, -t, o, r, 1), a("x", "z", "y", 1, 1, t, n, e, i, o, 2), a("x", "z", "y", 1, -1, t, n, -e, i, o, 3), a("x", "y", "z", 1, -1, t, e, n, i, r, 4), a("x", "y", "z", -1, -1, t, e, -n, i, r, 5), this.setIndex(h), this.addAttribute("position", new _t(l, 3)), this.addAttribute("normal", new _t(u, 3)), this.addAttribute("uv", new _t(p, 2))
    }

    function Pt(t, e, n, i) {
        Tt.call(this), this.type = "PlaneGeometry", this.parameters = {
            width: t,
            height: e,
            widthSegments: n,
            heightSegments: i
        }, this.fromBufferGeometry(new Ct(t, e, n, i))
    }

    function Ct(t, e, n, i) {
        St.call(this), this.type = "PlaneBufferGeometry", this.parameters = {
            width: t,
            height: e,
            widthSegments: n,
            heightSegments: i
        };
        var r, o, a = t / 2, s = e / 2, c = Math.floor(n) || 1, h = Math.floor(i) || 1, l = c + 1, u = h + 1, p = t / c,
            d = e / h, f = [], m = [], g = [], v = [];
        for (o = 0; o < u; o++) {
            var y = o * d - s;
            for (r = 0; r < l; r++) {
                var x = r * p - a;
                m.push(x, -y, 0), g.push(0, 0, 1), v.push(r / c), v.push(1 - o / h)
            }
        }
        for (o = 0; o < h; o++)for (r = 0; r < c; r++) {
            var _ = r + l * o, b = r + l * (o + 1), w = r + 1 + l * (o + 1), M = r + 1 + l * o;
            f.push(_, b, M), f.push(b, w, M)
        }
        this.setIndex(f), this.addAttribute("position", new _t(m, 3)), this.addAttribute("normal", new _t(g, 3)), this.addAttribute("uv", new _t(v, 2))
    }

    function Nt() {
        st.call(this), this.type = "Camera", this.matrixWorldInverse = new c, this.projectionMatrix = new c
    }

    function It(t, e, n, i) {
        Nt.call(this), this.type = "PerspectiveCamera", this.fov = void 0 !== t ? t : 50, this.zoom = 1, this.near = void 0 !== n ? n : .1, this.far = void 0 !== i ? i : 2e3, this.focus = 10, this.aspect = void 0 !== e ? e : 1, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix()
    }

    function Ut(t, e, n, i, r, o) {
        Nt.call(this), this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = t, this.right = e, this.top = n, this.bottom = i, this.near = void 0 !== r ? r : .1, this.far = void 0 !== o ? o : 2e3, this.updateProjectionMatrix()
    }

    function Dt(t, e, n) {
        function i(t) {
            s = t
        }

        function r(n) {
            n.array instanceof Uint32Array && e.get("OES_element_index_uint") ? (c = t.UNSIGNED_INT, h = 4) : n.array instanceof Uint16Array ? (c = t.UNSIGNED_SHORT, h = 2) : (c = t.UNSIGNED_BYTE, h = 1)
        }

        function o(e, i) {
            t.drawElements(s, i, c, e * h), n.calls++, n.vertices += i, s === t.TRIANGLES && (n.faces += i / 3)
        }

        function a(i, r, o) {
            var a = e.get("ANGLE_instanced_arrays");
            if (null === a)return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
            a.drawElementsInstancedANGLE(s, o, c, r * h, i.maxInstancedCount), n.calls++, n.vertices += o * i.maxInstancedCount, s === t.TRIANGLES && (n.faces += i.maxInstancedCount * o / 3)
        }

        var s, c, h;
        return {setMode: i, setIndex: r, render: o, renderInstances: a}
    }

    function Ot(t, e, n) {
        function i(t) {
            a = t
        }

        function r(e, i) {
            t.drawArrays(a, e, i), n.calls++, n.vertices += i, a === t.TRIANGLES && (n.faces += i / 3)
        }

        function o(i) {
            var r = e.get("ANGLE_instanced_arrays");
            if (null === r)return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
            var o = i.attributes.position, s = 0;
            o.isInterleavedBufferAttribute ? (s = o.data.count, r.drawArraysInstancedANGLE(a, 0, s, i.maxInstancedCount)) : (s = o.count, r.drawArraysInstancedANGLE(a, 0, s, i.maxInstancedCount)), n.calls++, n.vertices += s * i.maxInstancedCount, a === t.TRIANGLES && (n.faces += i.maxInstancedCount * s / 3)
        }

        var a;
        return {setMode: i, render: r, renderInstances: o}
    }

    function zt() {
        var t = {};
        return {
            get: function (n) {
                if (void 0 !== t[n.id])return t[n.id];
                var i;
                switch (n.type) {
                    case"DirectionalLight":
                        i = {
                            direction: new s,
                            color: new j,
                            shadow: !1,
                            shadowBias: 0,
                            shadowRadius: 1,
                            shadowMapSize: new e
                        };
                        break;
                    case"SpotLight":
                        i = {
                            position: new s,
                            direction: new s,
                            color: new j,
                            distance: 0,
                            coneCos: 0,
                            penumbraCos: 0,
                            decay: 0,
                            shadow: !1,
                            shadowBias: 0,
                            shadowRadius: 1,
                            shadowMapSize: new e
                        };
                        break;
                    case"PointLight":
                        i = {
                            position: new s,
                            color: new j,
                            distance: 0,
                            decay: 0,
                            shadow: !1,
                            shadowBias: 0,
                            shadowRadius: 1,
                            shadowMapSize: new e
                        };
                        break;
                    case"HemisphereLight":
                        i = {direction: new s, skyColor: new j, groundColor: new j}
                        ;
                        break;
                    case"RectAreaLight":
                        i = {color: new j, position: new s, halfWidth: new s, halfHeight: new s}
                }
                return t[n.id] = i, i
            }
        }
    }

    function Bt(t) {
        for (var e = t.split("\n"), n = 0; n < e.length; n++)e[n] = n + 1 + ": " + e[n];
        return e.join("\n")
    }

    function Ft(t, e, n) {
        var i = t.createShader(e);
        return t.shaderSource(i, n), t.compileShader(i), t.getShaderParameter(i, t.COMPILE_STATUS) === !1 && console.error("THREE.WebGLShader: Shader couldn't compile."), "" !== t.getShaderInfoLog(i) && console.warn("THREE.WebGLShader: gl.getShaderInfoLog()", e === t.VERTEX_SHADER ? "vertex" : "fragment", t.getShaderInfoLog(i), Bt(n)), i
    }

    function Gt(t) {
        switch (t) {
            case Fc:
                return ["Linear", "( value )"];
            case Gc:
                return ["sRGB", "( value )"];
            case Hc:
                return ["RGBE", "( value )"];
            case Vc:
                return ["RGBM", "( value, 7.0 )"];
            case jc:
                return ["RGBM", "( value, 16.0 )"];
            case Wc:
                return ["RGBD", "( value, 256.0 )"];
            case kc:
                return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
            default:
                throw new Error("unsupported encoding: " + t)
        }
    }

    function kt(t, e) {
        var n = Gt(e);
        return "vec4 " + t + "( vec4 value ) { return " + n[0] + "ToLinear" + n[1] + "; }"
    }

    function Ht(t, e) {
        var n = Gt(e);
        return "vec4 " + t + "( vec4 value ) { return LinearTo" + n[0] + n[1] + "; }"
    }

    function Vt(t, e) {
        var n;
        switch (e) {
            case Fs:
                n = "Linear";
                break;
            case Gs:
                n = "Reinhard";
                break;
            case ks:
                n = "Uncharted2";
                break;
            case Hs:
                n = "OptimizedCineon";
                break;
            default:
                throw new Error("unsupported toneMapping: " + e)
        }
        return "vec3 " + t + "( vec3 color ) { return " + n + "ToneMapping( color ); }"
    }

    function jt(t, e, n) {
        return t = t || {}, [t.derivatives || e.envMapCubeUV || e.bumpMap || e.normalMap || e.flatShading ? "#extension GL_OES_standard_derivatives : enable" : "", (t.fragDepth || e.logarithmicDepthBuffer) && n.get("EXT_frag_depth") ? "#extension GL_EXT_frag_depth : enable" : "", t.drawBuffers && n.get("WEBGL_draw_buffers") ? "#extension GL_EXT_draw_buffers : require" : "", (t.shaderTextureLOD || e.envMap) && n.get("EXT_shader_texture_lod") ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(Xt).join("\n")
    }

    function Wt(t) {
        var e = [];
        for (var n in t) {
            var i = t[n];
            i !== !1 && e.push("#define " + n + " " + i)
        }
        return e.join("\n")
    }

    function qt(t, e, n) {
        for (var i = {}, r = t.getProgramParameter(e, t.ACTIVE_ATTRIBUTES), o = 0; o < r; o++) {
            var a = t.getActiveAttrib(e, o), s = a.name;
            i[s] = t.getAttribLocation(e, s)
        }
        return i
    }

    function Xt(t) {
        return "" !== t
    }

    function Yt(t, e) {
        return t.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights)
    }

    function Zt(t) {
        function e(t, e) {
            var n = nh[e];
            if (void 0 === n)throw new Error("Can not resolve #include <" + e + ">");
            return Zt(n)
        }

        return t.replace(/#include +<([\w\d.]+)>/g, e)
    }

    function Jt(t) {
        function e(t, e, n, i) {
            for (var r = "", o = parseInt(e); o < parseInt(n); o++)r += i.replace(/\[ i \]/g, "[ " + o + " ]");
            return r
        }

        return t.replace(/for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g, e)
    }

    function Qt(t, e, n, i) {
        var r = t.context, o = n.extensions, a = n.defines, s = n.__webglShader.vertexShader,
            c = n.__webglShader.fragmentShader, h = "SHADOWMAP_TYPE_BASIC";
        i.shadowMapType === Za ? h = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === Ja && (h = "SHADOWMAP_TYPE_PCF_SOFT");
        var l = "ENVMAP_TYPE_CUBE", u = "ENVMAP_MODE_REFLECTION", p = "ENVMAP_BLENDING_MULTIPLY";
        if (i.envMap) {
            switch (n.envMap.mapping) {
                case Vs:
                case js:
                    l = "ENVMAP_TYPE_CUBE";
                    break;
                case Ys:
                case Zs:
                    l = "ENVMAP_TYPE_CUBE_UV";
                    break;
                case Ws:
                case qs:
                    l = "ENVMAP_TYPE_EQUIREC";
                    break;
                case Xs:
                    l = "ENVMAP_TYPE_SPHERE"
            }
            switch (n.envMap.mapping) {
                case js:
                case qs:
                    u = "ENVMAP_MODE_REFRACTION"
            }
            switch (n.combine) {
                case Ds:
                    p = "ENVMAP_BLENDING_MULTIPLY";
                    break;
                case Os:
                    p = "ENVMAP_BLENDING_MIX";
                    break;
                case zs:
                    p = "ENVMAP_BLENDING_ADD"
            }
        }
        var d, f, m = t.gammaFactor > 0 ? t.gammaFactor : 1, g = jt(o, i, t.extensions), v = Wt(a),
            y = r.createProgram();
        n.isRawShaderMaterial ? (d = [v, "\n"].filter(Xt).join("\n"), f = [g, v, "\n"].filter(Xt).join("\n")) : (d = ["precision " + i.precision + " float;", "precision " + i.precision + " int;", "#define SHADER_NAME " + n.__webglShader.name, v, i.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + m, "#define MAX_BONES " + i.maxBones, i.useFog && i.fog ? "#define USE_FOG" : "", i.useFog && i.fogExp ? "#define FOG_EXP2" : "", i.map ? "#define USE_MAP" : "", i.envMap ? "#define USE_ENVMAP" : "", i.envMap ? "#define " + u : "", i.lightMap ? "#define USE_LIGHTMAP" : "", i.aoMap ? "#define USE_AOMAP" : "", i.emissiveMap ? "#define USE_EMISSIVEMAP" : "", i.bumpMap ? "#define USE_BUMPMAP" : "", i.normalMap ? "#define USE_NORMALMAP" : "", i.displacementMap && i.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", i.specularMap ? "#define USE_SPECULARMAP" : "", i.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", i.metalnessMap ? "#define USE_METALNESSMAP" : "", i.alphaMap ? "#define USE_ALPHAMAP" : "", i.vertexColors ? "#define USE_COLOR" : "", i.flatShading ? "#define FLAT_SHADED" : "", i.skinning ? "#define USE_SKINNING" : "", i.useVertexTexture ? "#define BONE_TEXTURE" : "", i.morphTargets ? "#define USE_MORPHTARGETS" : "", i.morphNormals && i.flatShading === !1 ? "#define USE_MORPHNORMALS" : "", i.doubleSided ? "#define DOUBLE_SIDED" : "", i.flipSided ? "#define FLIP_SIDED" : "", "#define NUM_CLIPPING_PLANES " + i.numClippingPlanes, i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", i.shadowMapEnabled ? "#define " + h : "", i.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", i.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", i.logarithmicDepthBuffer && t.extensions.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_COLOR", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"].filter(Xt).join("\n"), f = [g, "precision " + i.precision + " float;", "precision " + i.precision + " int;", "#define SHADER_NAME " + n.__webglShader.name, v, i.alphaTest ? "#define ALPHATEST " + i.alphaTest : "", "#define GAMMA_FACTOR " + m, i.useFog && i.fog ? "#define USE_FOG" : "", i.useFog && i.fogExp ? "#define FOG_EXP2" : "", i.map ? "#define USE_MAP" : "", i.envMap ? "#define USE_ENVMAP" : "", i.envMap ? "#define " + l : "", i.envMap ? "#define " + u : "", i.envMap ? "#define " + p : "", i.lightMap ? "#define USE_LIGHTMAP" : "", i.aoMap ? "#define USE_AOMAP" : "", i.emissiveMap ? "#define USE_EMISSIVEMAP" : "", i.bumpMap ? "#define USE_BUMPMAP" : "", i.normalMap ? "#define USE_NORMALMAP" : "", i.specularMap ? "#define USE_SPECULARMAP" : "", i.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", i.metalnessMap ? "#define USE_METALNESSMAP" : "", i.alphaMap ? "#define USE_ALPHAMAP" : "", i.vertexColors ? "#define USE_COLOR" : "", i.gradientMap ? "#define USE_GRADIENTMAP" : "", i.flatShading ? "#define FLAT_SHADED" : "", i.doubleSided ? "#define DOUBLE_SIDED" : "", i.flipSided ? "#define FLIP_SIDED" : "", "#define NUM_CLIPPING_PLANES " + i.numClippingPlanes, "#define UNION_CLIPPING_PLANES " + (i.numClippingPlanes - i.numClipIntersection), i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", i.shadowMapEnabled ? "#define " + h : "", i.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", i.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", i.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", i.logarithmicDepthBuffer && t.extensions.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", i.envMap && t.extensions.get("EXT_shader_texture_lod") ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", i.toneMapping !== Bs ? "#define TONE_MAPPING" : "", i.toneMapping !== Bs ? nh.tonemapping_pars_fragment : "", i.toneMapping !== Bs ? Vt("toneMapping", i.toneMapping) : "", i.outputEncoding || i.mapEncoding || i.envMapEncoding || i.emissiveMapEncoding ? nh.encodings_pars_fragment : "", i.mapEncoding ? kt("mapTexelToLinear", i.mapEncoding) : "", i.envMapEncoding ? kt("envMapTexelToLinear", i.envMapEncoding) : "", i.emissiveMapEncoding ? kt("emissiveMapTexelToLinear", i.emissiveMapEncoding) : "", i.outputEncoding ? Ht("linearToOutputTexel", i.outputEncoding) : "", i.depthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "", "\n"].filter(Xt).join("\n")), s = Zt(s, i), s = Yt(s, i), c = Zt(c, i), c = Yt(c, i), n.isShaderMaterial || (s = Jt(s), c = Jt(c));
        var x = d + s, _ = f + c, b = Ft(r, r.VERTEX_SHADER, x), w = Ft(r, r.FRAGMENT_SHADER, _);
        r.attachShader(y, b), r.attachShader(y, w), void 0 !== n.index0AttributeName ? r.bindAttribLocation(y, 0, n.index0AttributeName) : i.morphTargets === !0 && r.bindAttribLocation(y, 0, "position"), r.linkProgram(y);
        var M = r.getProgramInfoLog(y), E = r.getShaderInfoLog(b), T = r.getShaderInfoLog(w), S = !0, A = !0;
        r.getProgramParameter(y, r.LINK_STATUS) === !1 ? (S = !1, console.error("THREE.WebGLProgram: shader error: ", r.getError(), "gl.VALIDATE_STATUS", r.getProgramParameter(y, r.VALIDATE_STATUS), "gl.getProgramInfoLog", M, E, T)) : "" !== M ? console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", M) : "" !== E && "" !== T || (A = !1), A && (this.diagnostics = {
            runnable: S,
            material: n,
            programLog: M,
            vertexShader: {log: E, prefix: d},
            fragmentShader: {log: T, prefix: f}
        }), r.deleteShader(b), r.deleteShader(w);
        var L;
        this.getUniforms = function () {
            return void 0 === L && (L = new V(r, y, t)), L
        };
        var R;
        return this.getAttributes = function () {
            return void 0 === R && (R = qt(r, y)), R
        }, this.destroy = function () {
            r.deleteProgram(y), this.program = void 0
        }, Object.defineProperties(this, {
            uniforms: {
                get: function () {
                    return console.warn("THREE.WebGLProgram: .uniforms is now .getUniforms()."), this.getUniforms()
                }
            }, attributes: {
                get: function () {
                    return console.warn("THREE.WebGLProgram: .attributes is now .getAttributes()."), this.getAttributes()
                }
            }
        }), this.id = hh++, this.code = e, this.usedTimes = 1, this.program = y, this.vertexShader = b, this.fragmentShader = w, this
    }

    function Kt(t, e) {
        function n(t) {
            if (e.floatVertexTextures && t && t.skeleton && t.skeleton.useVertexTexture)return 1024;
            var n = e.maxVertexUniforms, i = Math.floor((n - 20) / 4), r = i;
            return void 0 !== t && t && t.isSkinnedMesh && (r = Math.min(t.skeleton.bones.length, r)) < t.skeleton.bones.length && console.warn("WebGLRenderer: too many bones - " + t.skeleton.bones.length + ", this GPU supports just " + r + " (try OpenGL instead of ANGLE)"), r
        }

        function i(t, e) {
            var n;
            return t ? t.isTexture ? n = t.encoding : t.isWebGLRenderTarget && (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."), n = t.texture.encoding) : n = Fc, n === Fc && e && (n = kc), n
        }

        var r = [], o = {
                MeshDepthMaterial: "depth",
                MeshNormalMaterial: "normal",
                MeshBasicMaterial: "basic",
                MeshLambertMaterial: "lambert",
                MeshPhongMaterial: "phong",
                MeshToonMaterial: "phong",
                MeshStandardMaterial: "physical",
                MeshPhysicalMaterial: "physical",
                LineBasicMaterial: "basic",
                LineDashedMaterial: "dashed",
                PointsMaterial: "points"
            },
            a = ["precision", "supportsVertexTextures", "map", "mapEncoding", "envMap", "envMapMode", "envMapEncoding", "lightMap", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "displacementMap", "specularMap", "roughnessMap", "metalnessMap", "gradientMap", "alphaMap", "combine", "vertexColors", "fog", "useFog", "fogExp", "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning", "maxBones", "useVertexTexture", "morphTargets", "morphNormals", "maxMorphTargets", "maxMorphNormals", "premultipliedAlpha", "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights", "shadowMapEnabled", "shadowMapType", "toneMapping", "physicallyCorrectLights", "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking"];
        this.getParameters = function (r, a, s, c, h, l) {
            var u = o[r.type], p = n(l), d = t.getPrecision();
            null !== r.precision && (d = e.getMaxPrecision(r.precision)) !== r.precision && console.warn("THREE.WebGLProgram.getParameters:", r.precision, "not supported, using", d, "instead.");
            var f = t.getCurrentRenderTarget();
            return {
                shaderID: u,
                precision: d,
                supportsVertexTextures: e.vertexTextures,
                outputEncoding: i(f ? f.texture : null, t.gammaOutput),
                map: !!r.map,
                mapEncoding: i(r.map, t.gammaInput),
                envMap: !!r.envMap,
                envMapMode: r.envMap && r.envMap.mapping,
                envMapEncoding: i(r.envMap, t.gammaInput),
                envMapCubeUV: !!r.envMap && (r.envMap.mapping === Ys || r.envMap.mapping === Zs),
                lightMap: !!r.lightMap,
                aoMap: !!r.aoMap,
                emissiveMap: !!r.emissiveMap,
                emissiveMapEncoding: i(r.emissiveMap, t.gammaInput),
                bumpMap: !!r.bumpMap,
                normalMap: !!r.normalMap,
                displacementMap: !!r.displacementMap,
                roughnessMap: !!r.roughnessMap,
                metalnessMap: !!r.metalnessMap,
                specularMap: !!r.specularMap,
                alphaMap: !!r.alphaMap,
                gradientMap: !!r.gradientMap,
                combine: r.combine,
                vertexColors: r.vertexColors,
                fog: !!s,
                useFog: r.fog,
                fogExp: s && s.isFogExp2,
                flatShading: r.shading === ts,
                sizeAttenuation: r.sizeAttenuation,
                logarithmicDepthBuffer: e.logarithmicDepthBuffer,
                skinning: r.skinning,
                maxBones: p,
                useVertexTexture: e.floatVertexTextures && l && l.skeleton && l.skeleton.useVertexTexture,
                morphTargets: r.morphTargets,
                morphNormals: r.morphNormals,
                maxMorphTargets: t.maxMorphTargets,
                maxMorphNormals: t.maxMorphNormals,
                numDirLights: a.directional.length,
                numPointLights: a.point.length,
                numSpotLights: a.spot.length,
                numRectAreaLights: a.rectArea.length,
                numHemiLights: a.hemi.length,
                numClippingPlanes: c,
                numClipIntersection: h,
                shadowMapEnabled: t.shadowMap.enabled && l.receiveShadow && a.shadows.length > 0,
                shadowMapType: t.shadowMap.type,
                toneMapping: t.toneMapping,
                physicallyCorrectLights: t.physicallyCorrectLights,
                premultipliedAlpha: r.premultipliedAlpha,
                alphaTest: r.alphaTest,
                doubleSided: r.side === $a,
                flipSided: r.side === Ka,
                depthPacking: void 0 !== r.depthPacking && r.depthPacking
            }
        }, this.getProgramCode = function (t, e) {
            var n = [];
            if (e.shaderID ? n.push(e.shaderID) : (n.push(t.fragmentShader), n.push(t.vertexShader)), void 0 !== t.defines)for (var i in t.defines)n.push(i), n.push(t.defines[i]);
            for (var r = 0; r < a.length; r++)n.push(e[a[r]]);
            return n.join()
        }, this.acquireProgram = function (e, n, i) {
            for (var o, a = 0, s = r.length; a < s; a++) {
                var c = r[a];
                if (c.code === i) {
                    o = c, ++o.usedTimes;
                    break
                }
            }
            return void 0 === o && (o = new Qt(t, i, e, n), r.push(o)), o
        }, this.releaseProgram = function (t) {
            if (0 == --t.usedTimes) {
                r[r.indexOf(t)] = r[r.length - 1], r.pop(), t.destroy()
            }
        }, this.programs = r
    }

    function $t(t, e, n) {
        function i(t) {
            var r = t.target, s = c[r.id];
            null !== s.index && o(s.index), a(s.attributes), r.removeEventListener("dispose", i), delete c[r.id];
            var h = e.get(r);
            h.wireframe && o(h.wireframe), e.delete(r);
            var l = e.get(s);
            l.wireframe && o(l.wireframe), e.delete(s), n.memory.geometries--
        }

        function r(t) {
            return t.isInterleavedBufferAttribute ? e.get(t.data).__webglBuffer : e.get(t).__webglBuffer
        }

        function o(e) {
            var n = r(e);
            void 0 !== n && (t.deleteBuffer(n), s(e))
        }

        function a(t) {
            for (var e in t)o(t[e])
        }

        function s(t) {
            t.isInterleavedBufferAttribute ? e.delete(t.data) : e.delete(t)
        }

        var c = {};
        return {
            get: function (t) {
                var e = t.geometry;
                if (void 0 !== c[e.id])return c[e.id];
                e.addEventListener("dispose", i);
                var r;
                return e.isBufferGeometry ? r = e : e.isGeometry && (void 0 === e._bufferGeometry && (e._bufferGeometry = (new St).setFromObject(t)), r = e._bufferGeometry), c[e.id] = r, n.memory.geometries++, r
            }
        }
    }

    function te(t, e, n) {
        function i(e) {
            var n = l.get(e);
            e.geometry.isGeometry && n.updateFromObject(e);
            var i = n.index, o = n.attributes;
            null !== i && r(i, t.ELEMENT_ARRAY_BUFFER);
            for (var a in o)r(o[a], t.ARRAY_BUFFER);
            var s = n.morphAttributes;
            for (var a in s)for (var c = s[a], h = 0, u = c.length; h < u; h++)r(c[h], t.ARRAY_BUFFER);
            return n
        }

        function r(t, n) {
            var i = t.isInterleavedBufferAttribute ? t.data : t, r = e.get(i);
            void 0 === r.__webglBuffer ? o(r, i, n) : r.version !== i.version && a(r, i, n)
        }

        function o(e, n, i) {
            e.__webglBuffer = t.createBuffer(), t.bindBuffer(i, e.__webglBuffer);
            var r = n.dynamic ? t.DYNAMIC_DRAW : t.STATIC_DRAW;
            t.bufferData(i, n.array, r);
            var o = t.FLOAT, a = n.array;
            a instanceof Float32Array ? o = t.FLOAT : a instanceof Float64Array ? console.warn("Unsupported data buffer format: Float64Array") : a instanceof Uint16Array ? o = t.UNSIGNED_SHORT : a instanceof Int16Array ? o = t.SHORT : a instanceof Uint32Array ? o = t.UNSIGNED_INT : a instanceof Int32Array ? o = t.INT : a instanceof Int8Array ? o = t.BYTE : a instanceof Uint8Array && (o = t.UNSIGNED_BYTE), e.bytesPerElement = a.BYTES_PER_ELEMENT, e.type = o, e.version = n.version, n.onUploadCallback()
        }

        function a(e, n, i) {
            t.bindBuffer(i, e.__webglBuffer), n.dynamic === !1 ? t.bufferData(i, n.array, t.STATIC_DRAW) : n.updateRange.count === -1 ? t.bufferSubData(i, 0, n.array) : 0 === n.updateRange.count ? console.error("THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.") : (t.bufferSubData(i, n.updateRange.offset * n.array.BYTES_PER_ELEMENT, n.array.subarray(n.updateRange.offset, n.updateRange.offset + n.updateRange.count)), n.updateRange.count = 0), e.version = n.version
        }

        function s(t) {
            return t.isInterleavedBufferAttribute ? e.get(t.data).__webglBuffer : e.get(t).__webglBuffer
        }

        function c(t) {
            return t.isInterleavedBufferAttribute ? e.get(t.data) : e.get(t)
        }

        function h(n) {
            var i = e.get(n);
            if (void 0 !== i.wireframe)return i.wireframe;
            var o = [], a = n.index, s = n.attributes;
            if (null !== a)for (var c = a.array, h = 0, l = c.length; h < l; h += 3) {
                var u = c[h + 0], p = c[h + 1], d = c[h + 2];
                o.push(u, p, p, d, d, u)
            } else for (var c = s.position.array, h = 0, l = c.length / 3 - 1; h < l; h += 3) {
                var u = h + 0, p = h + 1, d = h + 2;
                o.push(u, p, p, d, d, u)
            }
            var f = new (Mt(o) > 65535 ? xt : vt)(o, 1);
            return r(f, t.ELEMENT_ARRAY_BUFFER), i.wireframe = f, f
        }

        var l = new $t(t, e, n);
        return {getAttributeBuffer: s, getAttributeProperties: c, getWireframeAttribute: h, update: i}
    }

    function ee(t, e, n, i, r, o, a) {
        function s(t, e) {
            if (t.width > e || t.height > e) {
                var n = e / Math.max(t.width, t.height),
                    i = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
                i.width = Math.floor(t.width * n), i.height = Math.floor(t.height * n);
                return i.getContext("2d").drawImage(t, 0, 0, t.width, t.height, 0, 0, i.width, i.height), console.warn("THREE.WebGLRenderer: image is too big (" + t.width + "x" + t.height + "). Resized to " + i.width + "x" + i.height, t), i
            }
            return t
        }

        function c(t) {
            return Yc.isPowerOfTwo(t.width) && Yc.isPowerOfTwo(t.height)
        }

        function h(t) {
            if (t instanceof HTMLImageElement || t instanceof HTMLCanvasElement) {
                var e = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
                e.width = Yc.nearestPowerOfTwo(t.width), e.height = Yc.nearestPowerOfTwo(t.height);
                return e.getContext("2d").drawImage(t, 0, 0, e.width, e.height), console.warn("THREE.WebGLRenderer: image is not power of two (" + t.width + "x" + t.height + "). Resized to " + e.width + "x" + e.height, t), e
            }
            return t
        }

        function l(t) {
            return t.wrapS !== Qs || t.wrapT !== Qs || t.minFilter !== $s && t.minFilter !== nc
        }

        function u(e) {
            return e === $s || e === tc || e === ec ? t.NEAREST : t.LINEAR
        }

        function p(t) {
            var e = t.target;
            e.removeEventListener("dispose", p), f(e), A.textures--
        }

        function d(t) {
            var e = t.target;
            e.removeEventListener("dispose", d), m(e), A.textures--
        }

        function f(e) {
            var n = i.get(e);
            if (e.image && n.__image__webglTextureCube) t.deleteTexture(n.__image__webglTextureCube); else {
                if (void 0 === n.__webglInit)return;
                t.deleteTexture(n.__webglTexture)
            }
            i.delete(e)
        }

        function m(e) {
            var n = i.get(e), r = i.get(e.texture);
            if (e) {
                if (void 0 !== r.__webglTexture && t.deleteTexture(r.__webglTexture), e.depthTexture && e.depthTexture.dispose(), e.isWebGLRenderTargetCube)for (var o = 0; o < 6; o++)t.deleteFramebuffer(n.__webglFramebuffer[o]), n.__webglDepthbuffer && t.deleteRenderbuffer(n.__webglDepthbuffer[o]); else t.deleteFramebuffer(n.__webglFramebuffer), n.__webglDepthbuffer && t.deleteRenderbuffer(n.__webglDepthbuffer);
                i.delete(e.texture), i.delete(e)
            }
        }

        function g(e, r) {
            var o = i.get(e);
            if (e.version > 0 && o.__version !== e.version) {
                var a = e.image;
                if (void 0 === a) console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined", e); else {
                    if (a.complete !== !1)return void _(o, e, r);
                    console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete", e)
                }
            }
            n.activeTexture(t.TEXTURE0 + r), n.bindTexture(t.TEXTURE_2D, o.__webglTexture)
        }

        function v(e, a) {
            var h = i.get(e);
            if (6 === e.image.length)if (e.version > 0 && h.__version !== e.version) {
                h.__image__webglTextureCube || (e.addEventListener("dispose", p), h.__image__webglTextureCube = t.createTexture(), A.textures++), n.activeTexture(t.TEXTURE0 + a), n.bindTexture(t.TEXTURE_CUBE_MAP, h.__image__webglTextureCube), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, e.flipY);
                for (var l = e && e.isCompressedTexture, u = e.image[0] && e.image[0].isDataTexture, d = [], f = 0; f < 6; f++)d[f] = l || u ? u ? e.image[f].image : e.image[f] : s(e.image[f], r.maxCubemapSize);
                var m = d[0], g = c(m), v = o(e.format), y = o(e.type);
                x(t.TEXTURE_CUBE_MAP, e, g);
                for (var f = 0; f < 6; f++)if (l)for (var _, b = d[f].mipmaps, w = 0, M = b.length; w < M; w++)_ = b[w], e.format !== xc && e.format !== yc ? n.getCompressedTextureFormats().indexOf(v) > -1 ? n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + f, w, v, _.width, _.height, 0, _.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + f, w, v, _.width, _.height, 0, v, y, _.data); else u ? n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, v, d[f].width, d[f].height, 0, v, y, d[f].data) : n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, v, v, y, d[f]);
                e.generateMipmaps && g && t.generateMipmap(t.TEXTURE_CUBE_MAP), h.__version = e.version, e.onUpdate && e.onUpdate(e)
            } else n.activeTexture(t.TEXTURE0 + a), n.bindTexture(t.TEXTURE_CUBE_MAP, h.__image__webglTextureCube)
        }

        function y(e, r) {
            n.activeTexture(t.TEXTURE0 + r), n.bindTexture(t.TEXTURE_CUBE_MAP, i.get(e).__webglTexture)
        }

        function x(n, a, s) {
            var c;
            if (s ? (t.texParameteri(n, t.TEXTURE_WRAP_S, o(a.wrapS)), t.texParameteri(n, t.TEXTURE_WRAP_T, o(a.wrapT)), t.texParameteri(n, t.TEXTURE_MAG_FILTER, o(a.magFilter)), t.texParameteri(n, t.TEXTURE_MIN_FILTER, o(a.minFilter))) : (t.texParameteri(n, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(n, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), a.wrapS === Qs && a.wrapT === Qs || console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.", a), t.texParameteri(n, t.TEXTURE_MAG_FILTER, u(a.magFilter)), t.texParameteri(n, t.TEXTURE_MIN_FILTER, u(a.minFilter)), a.minFilter !== $s && a.minFilter !== nc && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.", a)), c = e.get("EXT_texture_filter_anisotropic")) {
                if (a.type === uc && null === e.get("OES_texture_float_linear"))return;
                if (a.type === pc && null === e.get("OES_texture_half_float_linear"))return;
                (a.anisotropy > 1 || i.get(a).__currentAnisotropy) && (t.texParameterf(n, c.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a.anisotropy, r.getMaxAnisotropy())), i.get(a).__currentAnisotropy = a.anisotropy)
            }
        }

        function _(e, i, a) {
            void 0 === e.__webglInit && (e.__webglInit = !0, i.addEventListener("dispose", p), e.__webglTexture = t.createTexture(), A.textures++), n.activeTexture(t.TEXTURE0 + a), n.bindTexture(t.TEXTURE_2D, e.__webglTexture), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, i.flipY), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, i.premultiplyAlpha), t.pixelStorei(t.UNPACK_ALIGNMENT, i.unpackAlignment);
            var u = s(i.image, r.maxTextureSize);
            l(i) && c(u) === !1 && (u = h(u));
            var d = c(u), f = o(i.format), m = o(i.type);
            x(t.TEXTURE_2D, i, d);
            var g, v = i.mipmaps;
            if (i.isDepthTexture) {
                var y = t.DEPTH_COMPONENT;
                if (i.type === uc) {
                    if (!L)throw new Error("Float Depth Texture only supported in WebGL2.0");
                    y = t.DEPTH_COMPONENT32F
                } else L && (y = t.DEPTH_COMPONENT16);
                i.format === Mc && y === t.DEPTH_COMPONENT && i.type !== cc && i.type !== lc && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), i.type = cc, m = o(i.type)), i.format === Ec && (y = t.DEPTH_STENCIL, i.type !== gc && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), i.type = gc, m = o(i.type))), n.texImage2D(t.TEXTURE_2D, 0, y, u.width, u.height, 0, f, m, null)
            } else if (i.isDataTexture)if (v.length > 0 && d) {
                for (var _ = 0, b = v.length; _ < b; _++)g = v[_], n.texImage2D(t.TEXTURE_2D, _, f, g.width, g.height, 0, f, m, g.data);
                i.generateMipmaps = !1
            } else n.texImage2D(t.TEXTURE_2D, 0, f, u.width, u.height, 0, f, m, u.data); else if (i.isCompressedTexture)for (var _ = 0, b = v.length; _ < b; _++)g = v[_], i.format !== xc && i.format !== yc ? n.getCompressedTextureFormats().indexOf(f) > -1 ? n.compressedTexImage2D(t.TEXTURE_2D, _, f, g.width, g.height, 0, g.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : n.texImage2D(t.TEXTURE_2D, _, f, g.width, g.height, 0, f, m, g.data); else if (v.length > 0 && d) {
                for (var _ = 0, b = v.length; _ < b; _++)g = v[_], n.texImage2D(t.TEXTURE_2D, _, f, f, m, g);
                i.generateMipmaps = !1
            } else n.texImage2D(t.TEXTURE_2D, 0, f, f, m, u);
            i.generateMipmaps && d && t.generateMipmap(t.TEXTURE_2D), e.__version = i.version, i.onUpdate && i.onUpdate(i)
        }

        function b(e, r, a, s) {
            var c = o(r.texture.format), h = o(r.texture.type);
            n.texImage2D(s, 0, c, r.width, r.height, 0, c, h, null), t.bindFramebuffer(t.FRAMEBUFFER, e), t.framebufferTexture2D(t.FRAMEBUFFER, a, s, i.get(r.texture).__webglTexture, 0), t.bindFramebuffer(t.FRAMEBUFFER, null)
        }

        function w(e, n) {
            t.bindRenderbuffer(t.RENDERBUFFER, e), n.depthBuffer && !n.stencilBuffer ? (t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, n.width, n.height), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, e)) : n.depthBuffer && n.stencilBuffer ? (t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_STENCIL, n.width, n.height), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.RENDERBUFFER, e)) : t.renderbufferStorage(t.RENDERBUFFER, t.RGBA4, n.width, n.height), t.bindRenderbuffer(t.RENDERBUFFER, null)
        }

        function M(e, n) {
            if (n && n.isWebGLRenderTargetCube)throw new Error("Depth Texture with cube render targets is not supported!");
            if (t.bindFramebuffer(t.FRAMEBUFFER, e), !n.depthTexture || !n.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
            i.get(n.depthTexture).__webglTexture && n.depthTexture.image.width === n.width && n.depthTexture.image.height === n.height || (n.depthTexture.image.width = n.width, n.depthTexture.image.height = n.height, n.depthTexture.needsUpdate = !0), g(n.depthTexture, 0);
            var r = i.get(n.depthTexture).__webglTexture;
            if (n.depthTexture.format === Mc) t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.TEXTURE_2D, r, 0); else {
                if (n.depthTexture.format !== Ec)throw new Error("Unknown depthTexture format");
                t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.TEXTURE_2D, r, 0)
            }
        }

        function E(e) {
            var n = i.get(e), r = e.isWebGLRenderTargetCube === !0;
            if (e.depthTexture) {
                if (r)throw new Error("target.depthTexture not supported in Cube render targets");
                M(n.__webglFramebuffer, e)
            } else if (r) {
                n.__webglDepthbuffer = [];
                for (var o = 0; o < 6; o++)t.bindFramebuffer(t.FRAMEBUFFER, n.__webglFramebuffer[o]), n.__webglDepthbuffer[o] = t.createRenderbuffer(), w(n.__webglDepthbuffer[o], e)
            } else t.bindFramebuffer(t.FRAMEBUFFER, n.__webglFramebuffer), n.__webglDepthbuffer = t.createRenderbuffer(), w(n.__webglDepthbuffer, e);
            t.bindFramebuffer(t.FRAMEBUFFER, null)
        }

        function T(e) {
            var r = i.get(e), o = i.get(e.texture);
            e.addEventListener("dispose", d), o.__webglTexture = t.createTexture(), A.textures++;
            var a = e.isWebGLRenderTargetCube === !0, s = c(e);
            if (a) {
                r.__webglFramebuffer = [];
                for (var h = 0; h < 6; h++)r.__webglFramebuffer[h] = t.createFramebuffer()
            } else r.__webglFramebuffer = t.createFramebuffer();
            if (a) {
                n.bindTexture(t.TEXTURE_CUBE_MAP, o.__webglTexture), x(t.TEXTURE_CUBE_MAP, e.texture, s);
                for (var h = 0; h < 6; h++)b(r.__webglFramebuffer[h], e, t.COLOR_ATTACHMENT0, t.TEXTURE_CUBE_MAP_POSITIVE_X + h);
                e.texture.generateMipmaps && s && t.generateMipmap(t.TEXTURE_CUBE_MAP), n.bindTexture(t.TEXTURE_CUBE_MAP, null)
            } else n.bindTexture(t.TEXTURE_2D, o.__webglTexture), x(t.TEXTURE_2D, e.texture, s), b(r.__webglFramebuffer, e, t.COLOR_ATTACHMENT0, t.TEXTURE_2D), e.texture.generateMipmaps && s && t.generateMipmap(t.TEXTURE_2D), n.bindTexture(t.TEXTURE_2D, null);
            e.depthBuffer && E(e)
        }

        function S(e) {
            var r = e.texture;
            if (r.generateMipmaps && c(e) && r.minFilter !== $s && r.minFilter !== nc) {
                var o = e && e.isWebGLRenderTargetCube ? t.TEXTURE_CUBE_MAP : t.TEXTURE_2D, a = i.get(r).__webglTexture;
                n.bindTexture(o, a), t.generateMipmap(o), n.bindTexture(o, null)
            }
        }

        var A = a.memory, L = "undefined" != typeof WebGL2RenderingContext && t instanceof WebGL2RenderingContext;
        this.setTexture2D = g, this.setTextureCube = v, this.setTextureCubeDynamic = y, this.setupRenderTarget = T, this.updateRenderTargetMipmap = S
    }

    function ne() {
        var t = {};
        return {
            get: function (e) {
                var n = e.uuid, i = t[n];
                return void 0 === i && (i = {}, t[n] = i), i
            }, delete: function (e) {
                delete t[e.uuid]
            }, clear: function () {
                t = {}
            }
        }
    }

    function ie(t, e, n) {
        function r() {
            var e = !1, n = new i, r = null, o = new i;
            return {
                setMask: function (n) {
                    r === n || e || (t.colorMask(n, n, n, n), r = n)
                }, setLocked: function (t) {
                    e = t
                }, setClear: function (e, i, r, a, s) {
                    s === !0 && (e *= a, i *= a, r *= a), n.set(e, i, r, a), o.equals(n) === !1 && (t.clearColor(e, i, r, a), o.copy(n))
                }, reset: function () {
                    e = !1, r = null, o.set(0, 0, 0, 1)
                }
            }
        }

        function o() {
            var e = !1, n = null, i = null, r = null;
            return {
                setTest: function (e) {
                    e ? d(t.DEPTH_TEST) : f(t.DEPTH_TEST)
                }, setMask: function (i) {
                    n === i || e || (t.depthMask(i), n = i)
                }, setFunc: function (e) {
                    if (i !== e) {
                        if (e)switch (e) {
                            case As:
                                t.depthFunc(t.NEVER);
                                break;
                            case Ls:
                                t.depthFunc(t.ALWAYS);
                                break;
                            case Rs:
                                t.depthFunc(t.LESS);
                                break;
                            case Ps:
                                t.depthFunc(t.LEQUAL);
                                break;
                            case Cs:
                                t.depthFunc(t.EQUAL);
                                break;
                            case Ns:
                                t.depthFunc(t.GEQUAL);
                                break;
                            case Is:
                                t.depthFunc(t.GREATER);
                                break;
                            case Us:
                                t.depthFunc(t.NOTEQUAL);
                                break;
                            default:
                                t.depthFunc(t.LEQUAL)
                        } else t.depthFunc(t.LEQUAL);
                        i = e
                    }
                }, setLocked: function (t) {
                    e = t
                }, setClear: function (e) {
                    r !== e && (t.clearDepth(e), r = e)
                }, reset: function () {
                    e = !1, n = null, i = null, r = null
                }
            }
        }

        function a() {
            var e = !1, n = null, i = null, r = null, o = null, a = null, s = null, c = null, h = null;
            return {
                setTest: function (e) {
                    e ? d(t.STENCIL_TEST) : f(t.STENCIL_TEST)
                }, setMask: function (i) {
                    n === i || e || (t.stencilMask(i), n = i)
                }, setFunc: function (e, n, a) {
                    i === e && r === n && o === a || (t.stencilFunc(e, n, a), i = e, r = n, o = a)
                }, setOp: function (e, n, i) {
                    a === e && s === n && c === i || (t.stencilOp(e, n, i), a = e, s = n, c = i)
                }, setLocked: function (t) {
                    e = t
                }, setClear: function (e) {
                    h !== e && (t.clearStencil(e), h = e)
                }, reset: function () {
                    e = !1, n = null, i = null, r = null, o = null, a = null, s = null, c = null, h = null
                }
            }
        }

        function s(e, n, i) {
            var r = new Uint8Array(4), o = t.createTexture();
            t.bindTexture(e, o), t.texParameteri(e, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(e, t.TEXTURE_MAG_FILTER, t.NEAREST);
            for (var a = 0; a < i; a++)t.texImage2D(n + a, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, r);
            return o
        }

        function c() {
            B.setClear(0, 0, 0, 1), F.setClear(1), G.setClear(0), d(t.DEPTH_TEST), _(Ps), T(!1), S(qa), d(t.CULL_FACE), d(t.BLEND), g(as)
        }

        function h() {
            for (var t = 0, e = H.length; t < e; t++)H[t] = 0
        }

        function l(n) {
            if (H[n] = 1, 0 === V[n] && (t.enableVertexAttribArray(n), V[n] = 1), 0 !== j[n]) {
                e.get("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(n, 0), j[n] = 0
            }
        }

        function u(e, n, i) {
            H[e] = 1, 0 === V[e] && (t.enableVertexAttribArray(e), V[e] = 1), j[e] !== n && (i.vertexAttribDivisorANGLE(e, n), j[e] = n)
        }

        function p() {
            for (var e = 0, n = V.length; e !== n; ++e)V[e] !== H[e] && (t.disableVertexAttribArray(e), V[e] = 0)
        }

        function d(e) {
            W[e] !== !0 && (t.enable(e), W[e] = !0)
        }

        function f(e) {
            W[e] !== !1 && (t.disable(e), W[e] = !1)
        }

        function m() {
            if (null === q && (q = [], e.get("WEBGL_compressed_texture_pvrtc") || e.get("WEBGL_compressed_texture_s3tc") || e.get("WEBGL_compressed_texture_etc1")))for (var n = t.getParameter(t.COMPRESSED_TEXTURE_FORMATS), i = 0; i < n.length; i++)q.push(n[i]);
            return q
        }

        function g(e, i, r, o, a, s, c, h) {
            e !== os ? d(t.BLEND) : f(t.BLEND), e === X && h === tt || (e === ss ? h ? (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.ONE, t.ONE, t.ONE, t.ONE)) : (t.blendEquation(t.FUNC_ADD), t.blendFunc(t.SRC_ALPHA, t.ONE)) : e === cs ? h ? (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.ZERO, t.ZERO, t.ONE_MINUS_SRC_COLOR, t.ONE_MINUS_SRC_ALPHA)) : (t.blendEquation(t.FUNC_ADD), t.blendFunc(t.ZERO, t.ONE_MINUS_SRC_COLOR)) : e === hs ? h ? (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.ZERO, t.SRC_COLOR, t.ZERO, t.SRC_ALPHA)) : (t.blendEquation(t.FUNC_ADD), t.blendFunc(t.ZERO, t.SRC_COLOR)) : h ? (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.ONE, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA)) : (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA)), X = e, tt = h), e === ls ? (a = a || i, s = s || r, c = c || o, i === Y && a === Q || (t.blendEquationSeparate(n(i), n(a)), Y = i, Q = a), r === Z && o === J && s === K && c === $ || (t.blendFuncSeparate(n(r), n(o), n(s), n(c)), Z = r, J = o, K = s, $ = c)) : (Y = null, Z = null, J = null, Q = null, K = null, $ = null)
        }

        function v(t) {
            B.setMask(t)
        }

        function y(t) {
            F.setTest(t)
        }

        function x(t) {
            F.setMask(t)
        }

        function _(t) {
            F.setFunc(t)
        }

        function b(t) {
            G.setTest(t)
        }

        function w(t) {
            G.setMask(t)
        }

        function M(t, e, n) {
            G.setFunc(t, e, n)
        }

        function E(t, e, n) {
            G.setOp(t, e, n)
        }

        function T(e) {
            et !== e && (e ? t.frontFace(t.CW) : t.frontFace(t.CCW), et = e)
        }

        function S(e) {
            e !== Wa ? (d(t.CULL_FACE),
            e !== nt && (e === qa ? t.cullFace(t.BACK) : e === Xa ? t.cullFace(t.FRONT) : t.cullFace(t.FRONT_AND_BACK))) : f(t.CULL_FACE), nt = e
        }

        function A(e) {
            e !== it && (ht && t.lineWidth(e), it = e)
        }

        function L(e, n, i) {
            e ? (d(t.POLYGON_OFFSET_FILL), rt === n && ot === i || (t.polygonOffset(n, i), rt = n, ot = i)) : f(t.POLYGON_OFFSET_FILL)
        }

        function R() {
            return at
        }

        function P(e) {
            at = e, e ? d(t.SCISSOR_TEST) : f(t.SCISSOR_TEST)
        }

        function C(e) {
            void 0 === e && (e = t.TEXTURE0 + st - 1), lt !== e && (t.activeTexture(e), lt = e)
        }

        function N(e, n) {
            null === lt && C();
            var i = ut[lt];
            void 0 === i && (i = {
                type: void 0,
                texture: void 0
            }, ut[lt] = i), i.type === e && i.texture === n || (t.bindTexture(e, n || ft[e]), i.type = e, i.texture = n)
        }

        function I() {
            try {
                t.compressedTexImage2D.apply(t, arguments)
            } catch (t) {
                console.error(t)
            }
        }

        function U() {
            try {
                t.texImage2D.apply(t, arguments)
            } catch (t) {
                console.error(t)
            }
        }

        function D(e) {
            pt.equals(e) === !1 && (t.scissor(e.x, e.y, e.z, e.w), pt.copy(e))
        }

        function O(e) {
            dt.equals(e) === !1 && (t.viewport(e.x, e.y, e.z, e.w), dt.copy(e))
        }

        function z() {
            for (var e = 0; e < V.length; e++)1 === V[e] && (t.disableVertexAttribArray(e), V[e] = 0);
            W = {}, q = null, lt = null, ut = {}, X = null, et = null, nt = null, B.reset(), F.reset(), G.reset()
        }

        var B = new r, F = new o, G = new a, k = t.getParameter(t.MAX_VERTEX_ATTRIBS), H = new Uint8Array(k),
            V = new Uint8Array(k), j = new Uint8Array(k), W = {}, q = null, X = null, Y = null, Z = null, J = null,
            Q = null, K = null, $ = null, tt = !1, et = null, nt = null, it = null, rt = null, ot = null, at = null,
            st = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),
            ct = parseFloat(/^WebGL\ ([0-9])/.exec(t.getParameter(t.VERSION))[1]), ht = parseFloat(ct) >= 1, lt = null,
            ut = {}, pt = new i, dt = new i, ft = {};
        return ft[t.TEXTURE_2D] = s(t.TEXTURE_2D, t.TEXTURE_2D, 1), ft[t.TEXTURE_CUBE_MAP] = s(t.TEXTURE_CUBE_MAP, t.TEXTURE_CUBE_MAP_POSITIVE_X, 6), {
            buffers: {
                color: B,
                depth: F,
                stencil: G
            },
            init: c,
            initAttributes: h,
            enableAttribute: l,
            enableAttributeAndDivisor: u,
            disableUnusedAttributes: p,
            enable: d,
            disable: f,
            getCompressedTextureFormats: m,
            setBlending: g,
            setColorWrite: v,
            setDepthTest: y,
            setDepthWrite: x,
            setDepthFunc: _,
            setStencilTest: b,
            setStencilWrite: w,
            setStencilFunc: M,
            setStencilOp: E,
            setFlipSided: T,
            setCullFace: S,
            setLineWidth: A,
            setPolygonOffset: L,
            getScissorTest: R,
            setScissorTest: P,
            activeTexture: C,
            bindTexture: N,
            compressedTexImage2D: I,
            texImage2D: U,
            scissor: D,
            viewport: O,
            reset: z
        }
    }

    function re(t, e, n) {
        function i() {
            if (void 0 !== o)return o;
            var n = e.get("EXT_texture_filter_anisotropic");
            return o = null !== n ? t.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
        }

        function r(e) {
            if ("highp" === e) {
                if (t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_FLOAT).precision > 0 && t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT).precision > 0)return "highp";
                e = "mediump"
            }
            return "mediump" === e && t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_FLOAT).precision > 0 && t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp"
        }

        var o, a = void 0 !== n.precision ? n.precision : "highp", s = r(a);
        s !== a && (console.warn("THREE.WebGLRenderer:", a, "not supported, using", s, "instead."), a = s);
        var c = n.logarithmicDepthBuffer === !0 && !!e.get("EXT_frag_depth"),
            h = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS), l = t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
            u = t.getParameter(t.MAX_TEXTURE_SIZE), p = t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),
            d = t.getParameter(t.MAX_VERTEX_ATTRIBS), f = t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),
            m = t.getParameter(t.MAX_VARYING_VECTORS), g = t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS), v = l > 0,
            y = !!e.get("OES_texture_float");
        return {
            getMaxAnisotropy: i,
            getMaxPrecision: r,
            precision: a,
            logarithmicDepthBuffer: c,
            maxTextures: h,
            maxVertexTextures: l,
            maxTextureSize: u,
            maxCubemapSize: p,
            maxAttributes: d,
            maxVertexUniforms: f,
            maxVaryings: m,
            maxFragmentUniforms: g,
            vertexTextures: v,
            floatFragmentTextures: y,
            floatVertexTextures: v && y
        }
    }

    function oe(t) {
        var e = {};
        return {
            get: function (n) {
                if (void 0 !== e[n])return e[n];
                var i;
                switch (n) {
                    case"WEBGL_depth_texture":
                        i = t.getExtension("WEBGL_depth_texture") || t.getExtension("MOZ_WEBGL_depth_texture") || t.getExtension("WEBKIT_WEBGL_depth_texture");
                        break;
                    case"EXT_texture_filter_anisotropic":
                        i = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                        break;
                    case"WEBGL_compressed_texture_s3tc":
                        i = t.getExtension("WEBGL_compressed_texture_s3tc") || t.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                        break;
                    case"WEBGL_compressed_texture_pvrtc":
                        i = t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                        break;
                    case"WEBGL_compressed_texture_etc1":
                        i = t.getExtension("WEBGL_compressed_texture_etc1");
                        break;
                    default:
                        i = t.getExtension(n)
                }
                return null === i && console.warn("THREE.WebGLRenderer: " + n + " extension not supported."), e[n] = i, i
            }
        }
    }

    function ae() {
        function t() {
            h.value !== i && (h.value = i, h.needsUpdate = r > 0), n.numPlanes = r, n.numIntersection = 0
        }

        function e(t, e, i, r) {
            var o = null !== t ? t.length : 0, a = null;
            if (0 !== o) {
                if (a = h.value, r !== !0 || null === a) {
                    var l = i + 4 * o, u = e.matrixWorldInverse;
                    c.getNormalMatrix(u), (null === a || a.length < l) && (a = new Float32Array(l));
                    for (var p = 0, d = i; p !== o; ++p, d += 4)s.copy(t[p]).applyMatrix4(u, c), s.normal.toArray(a, d), a[d + 3] = s.constant
                }
                h.value = a, h.needsUpdate = !0
            }
            return n.numPlanes = o, a
        }

        var n = this, i = null, r = 0, o = !1, a = !1, s = new et, c = new tt, h = {value: null, needsUpdate: !1};
        this.uniform = h, this.numPlanes = 0, this.numIntersection = 0, this.init = function (t, n, a) {
            var s = 0 !== t.length || n || 0 !== r || o;
            return o = n, i = e(t, a, 0), r = t.length, s
        }, this.beginShadows = function () {
            a = !0, e(null)
        }, this.endShadows = function () {
            a = !1, t()
        }, this.setState = function (n, s, c, l, u, p) {
            if (!o || null === n || 0 === n.length || a && !c) a ? e(null) : t(); else {
                var d = a ? 0 : r, f = 4 * d, m = u.clippingState || null;
                h.value = m, m = e(n, l, f, p);
                for (var g = 0; g !== f; ++g)m[g] = i[g];
                u.clippingState = m, this.numIntersection = s ? this.numPlanes : 0, this.numPlanes += d
            }
        }
    }

    function se(t) {
        function e() {
            return null === dt ? Lt : 1
        }

        function n() {
            ce.init(), ce.scissor(yt.copy(Pt).multiplyScalar(Lt)), ce.viewport(_t.copy(Bt).multiplyScalar(Lt)), ce.buffers.color.setClear(wt.r, wt.g, wt.b, Mt, Q)
        }

        function r() {
            pt = null, vt = null, gt = "", mt = -1, ce.reset()
        }

        function o(t) {
            t.preventDefault(), r(), n(), he.clear()
        }

        function a(t) {
            var e = t.target;
            e.removeEventListener("dispose", a), h(e)
        }

        function h(t) {
            l(t), he.delete(t)
        }

        function l(t) {
            var e = he.get(t).program;
            t.program = void 0, void 0 !== e && pe.releaseProgram(e)
        }

        function u(t, e, n, i) {
            var r;
            if (n && n.isInstancedBufferGeometry && null === (r = $t.get("ANGLE_instanced_arrays")))return void console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
            void 0 === i && (i = 0), ce.initAttributes();
            var o = n.attributes, a = e.getAttributes(), s = t.defaultAttributeValues;
            for (var c in a) {
                var h = a[c];
                if (h >= 0) {
                    var l = o[c];
                    if (void 0 !== l) {
                        var u = l.normalized, p = l.itemSize, d = ue.getAttributeProperties(l), f = d.__webglBuffer,
                            m = d.type, g = d.bytesPerElement;
                        if (l.isInterleavedBufferAttribute) {
                            var v = l.data, y = v.stride, x = l.offset;
                            v && v.isInstancedInterleavedBuffer ? (ce.enableAttributeAndDivisor(h, v.meshPerAttribute, r), void 0 === n.maxInstancedCount && (n.maxInstancedCount = v.meshPerAttribute * v.count)) : ce.enableAttribute(h), Jt.bindBuffer(Jt.ARRAY_BUFFER, f), Jt.vertexAttribPointer(h, p, m, u, y * g, (i * y + x) * g)
                        } else l.isInstancedBufferAttribute ? (ce.enableAttributeAndDivisor(h, l.meshPerAttribute, r), void 0 === n.maxInstancedCount && (n.maxInstancedCount = l.meshPerAttribute * l.count)) : ce.enableAttribute(h), Jt.bindBuffer(Jt.ARRAY_BUFFER, f), Jt.vertexAttribPointer(h, p, m, u, 0, i * p * g)
                    } else if (void 0 !== s) {
                        var _ = s[c];
                        if (void 0 !== _)switch (_.length) {
                            case 2:
                                Jt.vertexAttrib2fv(h, _);
                                break;
                            case 3:
                                Jt.vertexAttrib3fv(h, _);
                                break;
                            case 4:
                                Jt.vertexAttrib4fv(h, _);
                                break;
                            default:
                                Jt.vertexAttrib1fv(h, _)
                        }
                    }
                }
            }
            ce.disableUnusedAttributes()
        }

        function p(t, e) {
            return Math.abs(e[0]) - Math.abs(t[0])
        }

        function d(t, e) {
            return t.object.renderOrder !== e.object.renderOrder ? t.object.renderOrder - e.object.renderOrder : t.material.program && e.material.program && t.material.program !== e.material.program ? t.material.program.id - e.material.program.id : t.material.id !== e.material.id ? t.material.id - e.material.id : t.z !== e.z ? t.z - e.z : t.id - e.id
        }

        function f(t, e) {
            return t.object.renderOrder !== e.object.renderOrder ? t.object.renderOrder - e.object.renderOrder : t.z !== e.z ? e.z - t.z : t.id - e.id
        }

        function m(t, e, n, i, r) {
            var o, a;
            n.transparent ? (o = ot, a = ++at) : (o = et, a = ++rt);
            var s = o[a];
            void 0 !== s ? (s.id = t.id, s.object = t, s.geometry = e, s.material = n, s.z = Wt.z, s.group = r) : (s = {
                id: t.id,
                object: t,
                geometry: e,
                material: n,
                z: Wt.z,
                group: r
            }, o.push(s))
        }

        function g(t) {
            var e = t.geometry;
            return null === e.boundingSphere && e.computeBoundingSphere(), Vt.copy(e.boundingSphere).applyMatrix4(t.matrixWorld), y(Vt)
        }

        function v(t) {
            return Vt.center.set(0, 0, 0), Vt.radius = .7071067811865476, Vt.applyMatrix4(t.matrixWorld), y(Vt)
        }

        function y(t) {
            if (!Ft.intersectsSphere(t))return !1;
            var e = Gt.numPlanes;
            if (0 === e)return !0;
            var n = lt.clippingPlanes, i = t.center, r = -t.radius, o = 0;
            do if (n[o].distanceToPoint(i) < r)return !1; while (++o !== e)
            return !0
        }

        function x(t, e) {
            if (t.visible !== !1) {
                if (0 != (t.layers.mask & e.layers.mask))if (t.isLight) tt.push(t); else if (t.isSprite) t.frustumCulled !== !1 && v(t) !== !0 || ct.push(t); else if (t.isLensFlare) ht.push(t); else if (t.isImmediateRenderObject) lt.sortObjects === !0 && (Wt.setFromMatrixPosition(t.matrixWorld), Wt.applyMatrix4(jt)), m(t, null, t.material, Wt.z, null); else if ((t.isMesh || t.isLine || t.isPoints) && (t.isSkinnedMesh && t.skeleton.update(), t.frustumCulled === !1 || g(t) === !0)) {
                    var n = t.material;
                    if (n.visible === !0) {
                        lt.sortObjects === !0 && (Wt.setFromMatrixPosition(t.matrixWorld), Wt.applyMatrix4(jt));
                        var i = ue.update(t);
                        if (n.isMultiMaterial)for (var r = i.groups, o = n.materials, a = 0, s = r.length; a < s; a++) {
                            var c = r[a], h = o[c.materialIndex];
                            h.visible === !0 && m(t, i, h, Wt.z, c)
                        } else m(t, i, n, Wt.z, null)
                    }
                }
                for (var l = t.children, a = 0, s = l.length; a < s; a++)x(l[a], e)
            }
        }

        function _(t, e, n, i) {
            for (var r = 0, o = t.length; r < o; r++) {
                var a = t[r], s = a.object, c = a.geometry, h = void 0 === i ? a.material : i, l = a.group;
                if (s.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, s.matrixWorld), s.normalMatrix.getNormalMatrix(s.modelViewMatrix), s.onBeforeRender(lt, e, n, c, h, l), s.isImmediateRenderObject) {
                    w(h);
                    var u = M(n, e.fog, h, s);
                    gt = "", s.render(function (t) {
                        lt.renderBufferImmediate(t, u, h)
                    })
                } else lt.renderBufferDirect(n, e.fog, c, h, s, l);
                s.onAfterRender(lt, e, n, c, h, l)
            }
        }

        function b(t, e, n) {
            var i = he.get(t), r = pe.getParameters(t, Yt, e, Gt.numPlanes, Gt.numIntersection, n),
                o = pe.getProgramCode(t, r), s = i.program, c = !0;
            if (void 0 === s) t.addEventListener("dispose", a); else if (s.code !== o) l(t); else {
                if (void 0 !== r.shaderID)return;
                c = !1
            }
            if (c) {
                if (r.shaderID) {
                    var h = oh[r.shaderID];
                    i.__webglShader = {
                        name: t.type,
                        uniforms: eh.clone(h.uniforms),
                        vertexShader: h.vertexShader,
                        fragmentShader: h.fragmentShader
                    }
                } else i.__webglShader = {
                    name: t.type,
                    uniforms: t.uniforms,
                    vertexShader: t.vertexShader,
                    fragmentShader: t.fragmentShader
                };
                t.__webglShader = i.__webglShader, s = pe.acquireProgram(t, r, o), i.program = s, t.program = s
            }
            var u = s.getAttributes();
            if (t.morphTargets) {
                t.numSupportedMorphTargets = 0;
                for (var p = 0; p < lt.maxMorphTargets; p++)u["morphTarget" + p] >= 0 && t.numSupportedMorphTargets++
            }
            if (t.morphNormals) {
                t.numSupportedMorphNormals = 0;
                for (var p = 0; p < lt.maxMorphNormals; p++)u["morphNormal" + p] >= 0 && t.numSupportedMorphNormals++
            }
            var d = i.__webglShader.uniforms;
            (t.isShaderMaterial || t.isRawShaderMaterial) && t.clipping !== !0 || (i.numClippingPlanes = Gt.numPlanes, i.numIntersection = Gt.numIntersection, d.clippingPlanes = Gt.uniform), i.fog = e, i.lightsHash = Yt.hash, t.lights && (d.ambientLightColor.value = Yt.ambient, d.directionalLights.value = Yt.directional, d.spotLights.value = Yt.spot, d.rectAreaLights.value = Yt.rectArea, d.pointLights.value = Yt.point, d.hemisphereLights.value = Yt.hemi, d.directionalShadowMap.value = Yt.directionalShadowMap, d.directionalShadowMatrix.value = Yt.directionalShadowMatrix, d.spotShadowMap.value = Yt.spotShadowMap, d.spotShadowMatrix.value = Yt.spotShadowMatrix, d.pointShadowMap.value = Yt.pointShadowMap, d.pointShadowMatrix.value = Yt.pointShadowMatrix);
            var f = i.program.getUniforms(), m = V.seqWithValue(f.seq, d);
            i.uniformsList = m
        }

        function w(t) {
            t.side === $a ? ce.disable(Jt.CULL_FACE) : ce.enable(Jt.CULL_FACE), ce.setFlipSided(t.side === Ka), t.transparent === !0 ? ce.setBlending(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha, t.premultipliedAlpha) : ce.setBlending(os), ce.setDepthFunc(t.depthFunc), ce.setDepthTest(t.depthTest), ce.setDepthWrite(t.depthWrite), ce.setColorWrite(t.colorWrite), ce.setPolygonOffset(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits)
        }

        function M(t, e, n, i) {
            bt = 0;
            var r = he.get(n);
            if (kt && (Ht || t !== vt)) {
                var o = t === vt && n.id === mt;
                Gt.setState(n.clippingPlanes, n.clipIntersection, n.clipShadows, t, r, o)
            }
            n.needsUpdate === !1 && (void 0 === r.program ? n.needsUpdate = !0 : n.fog && r.fog !== e ? n.needsUpdate = !0 : n.lights && r.lightsHash !== Yt.hash ? n.needsUpdate = !0 : void 0 === r.numClippingPlanes || r.numClippingPlanes === Gt.numPlanes && r.numIntersection === Gt.numIntersection || (n.needsUpdate = !0)), n.needsUpdate && (b(n, e, i), n.needsUpdate = !1);
            var a = !1, s = !1, c = !1, h = r.program, l = h.getUniforms(), u = r.__webglShader.uniforms;
            if (h.id !== pt && (Jt.useProgram(h.program), pt = h.id, a = !0, s = !0, c = !0), n.id !== mt && (mt = n.id, s = !0), a || t !== vt) {
                if (l.set(Jt, t, "projectionMatrix"), se.logarithmicDepthBuffer && l.setValue(Jt, "logDepthBufFC", 2 / (Math.log(t.far + 1) / Math.LN2)), t !== vt && (vt = t, s = !0, c = !0), n.isShaderMaterial || n.isMeshPhongMaterial || n.isMeshStandardMaterial || n.envMap) {
                    var p = l.map.cameraPosition;
                    void 0 !== p && p.setValue(Jt, Wt.setFromMatrixPosition(t.matrixWorld))
                }
                (n.isMeshPhongMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isMeshStandardMaterial || n.isShaderMaterial || n.skinning) && l.setValue(Jt, "viewMatrix", t.matrixWorldInverse), l.set(Jt, lt, "toneMappingExposure"), l.set(Jt, lt, "toneMappingWhitePoint")
            }
            if (n.skinning) {
                l.setOptional(Jt, i, "bindMatrix"), l.setOptional(Jt, i, "bindMatrixInverse");
                var d = i.skeleton;
                d && (se.floatVertexTextures && d.useVertexTexture ? (l.set(Jt, d, "boneTexture"), l.set(Jt, d, "boneTextureWidth"), l.set(Jt, d, "boneTextureHeight")) : l.setOptional(Jt, d, "boneMatrices"))
            }
            return s && (n.lights && D(u, c), e && n.fog && L(u, e), (n.isMeshBasicMaterial || n.isMeshLambertMaterial || n.isMeshPhongMaterial || n.isMeshStandardMaterial || n.isMeshNormalMaterial || n.isMeshDepthMaterial) && E(u, n), n.isLineBasicMaterial ? T(u, n) : n.isLineDashedMaterial ? (T(u, n), S(u, n)) : n.isPointsMaterial ? A(u, n) : n.isMeshLambertMaterial ? R(u, n) : n.isMeshToonMaterial ? C(u, n) : n.isMeshPhongMaterial ? P(u, n) : n.isMeshPhysicalMaterial ? I(u, n) : n.isMeshStandardMaterial ? N(u, n) : n.isMeshDepthMaterial ? n.displacementMap && (u.displacementMap.value = n.displacementMap, u.displacementScale.value = n.displacementScale, u.displacementBias.value = n.displacementBias) : n.isMeshNormalMaterial && U(u, n), void 0 !== u.ltcMat && (u.ltcMat.value = THREE.UniformsLib.LTC_MAT_TEXTURE), void 0 !== u.ltcMag && (u.ltcMag.value = THREE.UniformsLib.LTC_MAG_TEXTURE), V.upload(Jt, r.uniformsList, u, lt)), l.set(Jt, i, "modelViewMatrix"), l.set(Jt, i, "normalMatrix"), l.setValue(Jt, "modelMatrix", i.matrixWorld), h
        }

        function E(t, e) {
            t.opacity.value = e.opacity, t.diffuse.value = e.color, e.emissive && t.emissive.value.copy(e.emissive).multiplyScalar(e.emissiveIntensity), t.map.value = e.map, t.specularMap.value = e.specularMap, t.alphaMap.value = e.alphaMap, e.lightMap && (t.lightMap.value = e.lightMap, t.lightMapIntensity.value = e.lightMapIntensity), e.aoMap && (t.aoMap.value = e.aoMap, t.aoMapIntensity.value = e.aoMapIntensity);
            var n;
            if (e.map ? n = e.map : e.specularMap ? n = e.specularMap : e.displacementMap ? n = e.displacementMap : e.normalMap ? n = e.normalMap : e.bumpMap ? n = e.bumpMap : e.roughnessMap ? n = e.roughnessMap : e.metalnessMap ? n = e.metalnessMap : e.alphaMap ? n = e.alphaMap : e.emissiveMap && (n = e.emissiveMap), void 0 !== n) {
                n.isWebGLRenderTarget && (n = n.texture);
                var i = n.offset, r = n.repeat;
                t.offsetRepeat.value.set(i.x, i.y, r.x, r.y)
            }
            t.envMap.value = e.envMap, t.flipEnvMap.value = e.envMap && e.envMap.isCubeTexture ? -1 : 1, t.reflectivity.value = e.reflectivity, t.refractionRatio.value = e.refractionRatio
        }

        function T(t, e) {
            t.diffuse.value = e.color, t.opacity.value = e.opacity
        }

        function S(t, e) {
            t.dashSize.value = e.dashSize, t.totalSize.value = e.dashSize + e.gapSize, t.scale.value = e.scale
        }

        function A(t, e) {
            if (t.diffuse.value = e.color, t.opacity.value = e.opacity, t.size.value = e.size * Lt, t.scale.value = .5 * Tt, t.map.value = e.map, null !== e.map) {
                var n = e.map.offset, i = e.map.repeat;
                t.offsetRepeat.value.set(n.x, n.y, i.x, i.y)
            }
        }

        function L(t, e) {
            t.fogColor.value = e.color, e.isFog ? (t.fogNear.value = e.near, t.fogFar.value = e.far) : e.isFogExp2 && (t.fogDensity.value = e.density)
        }

        function R(t, e) {
            e.emissiveMap && (t.emissiveMap.value = e.emissiveMap)
        }

        function P(t, e) {
            t.specular.value = e.specular, t.shininess.value = Math.max(e.shininess, 1e-4), e.emissiveMap && (t.emissiveMap.value = e.emissiveMap), e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale), e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale)), e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias)
        }

        function C(t, e) {
            P(t, e), e.gradientMap && (t.gradientMap.value = e.gradientMap)
        }

        function N(t, e) {
            t.roughness.value = e.roughness, t.metalness.value = e.metalness, e.roughnessMap && (t.roughnessMap.value = e.roughnessMap), e.metalnessMap && (t.metalnessMap.value = e.metalnessMap), e.emissiveMap && (t.emissiveMap.value = e.emissiveMap), e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale), e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale)), e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias), e.envMap && (t.envMapIntensity.value = e.envMapIntensity)
        }

        function I(t, e) {
            t.clearCoat.value = e.clearCoat, t.clearCoatRoughness.value = e.clearCoatRoughness, N(t, e)
        }

        function U(t, e) {
            e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale), e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale)), e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias)
        }

        function D(t, e) {
            t.ambientLightColor.needsUpdate = e, t.directionalLights.needsUpdate = e, t.pointLights.needsUpdate = e, t.spotLights.needsUpdate = e, t.rectAreaLights.needsUpdate = e, t.hemisphereLights.needsUpdate = e
        }

        function O(t) {
            for (var e = 0, n = 0, i = t.length; n < i; n++) {
                var r = t[n];
                r.castShadow && (Yt.shadows[e++] = r)
            }
            Yt.shadows.length = e
        }

        function z(t, e) {
            var n, i, r, o, a, s, h, l = 0, u = 0, p = 0, d = e.matrixWorldInverse, f = 0, m = 0, g = 0, v = 0, y = 0;
            for (n = 0, i = t.length; n < i; n++)if (r = t[n], o = r.color, a = r.intensity, s = r.distance, h = r.shadow && r.shadow.map ? r.shadow.map.texture : null, r.isAmbientLight) l += o.r * a, u += o.g * a, p += o.b * a; else if (r.isDirectionalLight) {
                var x = de.get(r);
                x.color.copy(r.color).multiplyScalar(r.intensity), x.direction.setFromMatrixPosition(r.matrixWorld), Wt.setFromMatrixPosition(r.target.matrixWorld), x.direction.sub(Wt), x.direction.transformDirection(d), x.shadow = r.castShadow, r.castShadow && (x.shadowBias = r.shadow.bias, x.shadowRadius = r.shadow.radius, x.shadowMapSize = r.shadow.mapSize), Yt.directionalShadowMap[f] = h, Yt.directionalShadowMatrix[f] = r.shadow.matrix, Yt.directional[f++] = x
            } else if (r.isSpotLight) {
                var x = de.get(r);
                x.position.setFromMatrixPosition(r.matrixWorld), x.position.applyMatrix4(d), x.color.copy(o).multiplyScalar(a), x.distance = s, x.direction.setFromMatrixPosition(r.matrixWorld), Wt.setFromMatrixPosition(r.target.matrixWorld), x.direction.sub(Wt), x.direction.transformDirection(d), x.coneCos = Math.cos(r.angle), x.penumbraCos = Math.cos(r.angle * (1 - r.penumbra)), x.decay = 0 === r.distance ? 0 : r.decay, x.shadow = r.castShadow, r.castShadow && (x.shadowBias = r.shadow.bias, x.shadowRadius = r.shadow.radius, x.shadowMapSize = r.shadow.mapSize), Yt.spotShadowMap[g] = h, Yt.spotShadowMatrix[g] = r.shadow.matrix, Yt.spot[g++] = x
            } else if (r.isRectAreaLight) {
                var x = de.get(r);
                x.color.copy(o).multiplyScalar(a / (r.width * r.height)), x.position.setFromMatrixPosition(r.matrixWorld), x.position.applyMatrix4(d), Xt.identity(), qt.copy(r.matrixWorld), qt.premultiply(d), Xt.extractRotation(qt), x.halfWidth.set(.5 * r.width, 0, 0), x.halfHeight.set(0, .5 * r.height, 0), x.halfWidth.applyMatrix4(Xt), x.halfHeight.applyMatrix4(Xt), Yt.rectArea[v++] = x
            } else if (r.isPointLight) {
                var x = de.get(r);
                x.position.setFromMatrixPosition(r.matrixWorld), x.position.applyMatrix4(d), x.color.copy(r.color).multiplyScalar(r.intensity), x.distance = r.distance, x.decay = 0 === r.distance ? 0 : r.decay, x.shadow = r.castShadow, r.castShadow && (x.shadowBias = r.shadow.bias, x.shadowRadius = r.shadow.radius, x.shadowMapSize = r.shadow.mapSize), Yt.pointShadowMap[m] = h, void 0 === Yt.pointShadowMatrix[m] && (Yt.pointShadowMatrix[m] = new c), Wt.setFromMatrixPosition(r.matrixWorld).negate(), Yt.pointShadowMatrix[m].identity().setPosition(Wt), Yt.point[m++] = x
            } else if (r.isHemisphereLight) {
                var x = de.get(r);
                x.direction.setFromMatrixPosition(r.matrixWorld), x.direction.transformDirection(d), x.direction.normalize(), x.skyColor.copy(r.color).multiplyScalar(a), x.groundColor.copy(r.groundColor).multiplyScalar(a), Yt.hemi[y++] = x
            }
            Yt.ambient[0] = l, Yt.ambient[1] = u, Yt.ambient[2] = p, Yt.directional.length = f, Yt.spot.length = g, Yt.rectArea.length = v, Yt.point.length = m, Yt.hemi.length = y, Yt.hash = f + "," + m + "," + g + "," + v + "," + y + "," + Yt.shadows.length
        }

        function B() {
            var t = bt;
            return t >= se.maxTextures && console.warn("WebGLRenderer: trying to use " + t + " texture units while this GPU supports only " + se.maxTextures), bt += 1, t
        }

        function F(t) {
            var e;
            if (t === Js)return Jt.REPEAT;
            if (t === Qs)return Jt.CLAMP_TO_EDGE;
            if (t === Ks)return Jt.MIRRORED_REPEAT;
            if (t === $s)return Jt.NEAREST;
            if (t === tc)return Jt.NEAREST_MIPMAP_NEAREST;
            if (t === ec)return Jt.NEAREST_MIPMAP_LINEAR;
            if (t === nc)return Jt.LINEAR;
            if (t === ic)return Jt.LINEAR_MIPMAP_NEAREST;
            if (t === rc)return Jt.LINEAR_MIPMAP_LINEAR;
            if (t === oc)return Jt.UNSIGNED_BYTE;
            if (t === dc)return Jt.UNSIGNED_SHORT_4_4_4_4;
            if (t === fc)return Jt.UNSIGNED_SHORT_5_5_5_1;
            if (t === mc)return Jt.UNSIGNED_SHORT_5_6_5;
            if (t === ac)return Jt.BYTE;
            if (t === sc)return Jt.SHORT;
            if (t === cc)return Jt.UNSIGNED_SHORT;
            if (t === hc)return Jt.INT;
            if (t === lc)return Jt.UNSIGNED_INT;
            if (t === uc)return Jt.FLOAT;
            if (t === pc && null !== (e = $t.get("OES_texture_half_float")))return e.HALF_FLOAT_OES;
            if (t === vc)return Jt.ALPHA;
            if (t === yc)return Jt.RGB;
            if (t === xc)return Jt.RGBA;
            if (t === _c)return Jt.LUMINANCE;
            if (t === bc)return Jt.LUMINANCE_ALPHA;
            if (t === Mc)return Jt.DEPTH_COMPONENT;
            if (t === Ec)return Jt.DEPTH_STENCIL;
            if (t === us)return Jt.FUNC_ADD;
            if (t === ps)return Jt.FUNC_SUBTRACT;
            if (t === ds)return Jt.FUNC_REVERSE_SUBTRACT;
            if (t === gs)return Jt.ZERO;
            if (t === vs)return Jt.ONE;
            if (t === ys)return Jt.SRC_COLOR;
            if (t === xs)return Jt.ONE_MINUS_SRC_COLOR;
            if (t === _s)return Jt.SRC_ALPHA;
            if (t === bs)return Jt.ONE_MINUS_SRC_ALPHA;
            if (t === ws)return Jt.DST_ALPHA;
            if (t === Ms)return Jt.ONE_MINUS_DST_ALPHA;
            if (t === Es)return Jt.DST_COLOR;
            if (t === Ts)return Jt.ONE_MINUS_DST_COLOR;
            if (t === Ss)return Jt.SRC_ALPHA_SATURATE;
            if ((t === Tc || t === Sc || t === Ac || t === Lc) && null !== (e = $t.get("WEBGL_compressed_texture_s3tc"))) {
                if (t === Tc)return e.COMPRESSED_RGB_S3TC_DXT1_EXT;
                if (t === Sc)return e.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                if (t === Ac)return e.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                if (t === Lc)return e.COMPRESSED_RGBA_S3TC_DXT5_EXT
            }
            if ((t === Rc || t === Pc || t === Cc || t === Nc) && null !== (e = $t.get("WEBGL_compressed_texture_pvrtc"))) {
                if (t === Rc)return e.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                if (t === Pc)return e.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                if (t === Cc)return e.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                if (t === Nc)return e.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
            }
            if (t === Ic && null !== (e = $t.get("WEBGL_compressed_texture_etc1")))return e.COMPRESSED_RGB_ETC1_WEBGL;
            if ((t === fs || t === ms) && null !== (e = $t.get("EXT_blend_minmax"))) {
                if (t === fs)return e.MIN_EXT;
                if (t === ms)return e.MAX_EXT
            }
            return t === gc && null !== (e = $t.get("WEBGL_depth_texture")) ? e.UNSIGNED_INT_24_8_WEBGL : 0
        }

        console.log("THREE.WebGLRenderer", Va), t = t || {};
        var G = void 0 !== t.canvas ? t.canvas : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"),
            k = void 0 !== t.context ? t.context : null, H = void 0 !== t.alpha && t.alpha,
            W = void 0 === t.depth || t.depth, q = void 0 === t.stencil || t.stencil,
            Z = void 0 !== t.antialias && t.antialias, Q = void 0 === t.premultipliedAlpha || t.premultipliedAlpha,
            K = void 0 !== t.preserveDrawingBuffer && t.preserveDrawingBuffer, tt = [], et = [], rt = -1, ot = [],
            at = -1, st = new Float32Array(8), ct = [], ht = [];
        this.domElement = G, this.context = null, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.gammaFactor = 2, this.gammaInput = !1, this.gammaOutput = !1, this.physicallyCorrectLights = !1, this.toneMapping = Fs, this.toneMappingExposure = 1, this.toneMappingWhitePoint = 1, this.maxMorphTargets = 8, this.maxMorphNormals = 4;
        var lt = this, pt = null, dt = null, ft = null, mt = -1, gt = "", vt = null, yt = new i, xt = null, _t = new i,
            bt = 0, wt = new j(0), Mt = 0, Et = G.width, Tt = G.height, Lt = 1, Pt = new i(0, 0, Et, Tt), Nt = !1,
            Bt = new i(0, 0, Et, Tt), Ft = new nt, Gt = new ae, kt = !1, Ht = !1, Vt = new $, jt = new c, Wt = new s,
            qt = new c, Xt = new c, Yt = {
                hash: "",
                ambient: [0, 0, 0],
                directional: [],
                directionalShadowMap: [],
                directionalShadowMatrix: [],
                spot: [],
                spotShadowMap: [],
                spotShadowMatrix: [],
                rectArea: [],
                point: [],
                pointShadowMap: [],
                pointShadowMatrix: [],
                hemi: [],
                shadows: []
            }, Zt = {calls: 0, vertices: 0, faces: 0, points: 0};
        this.info = {render: Zt, memory: {geometries: 0, textures: 0}, programs: null};
        var Jt;
        try {
            var Qt = {alpha: H, depth: W, stencil: q, antialias: Z, premultipliedAlpha: Q, preserveDrawingBuffer: K};
            if (null === (Jt = k || G.getContext("webgl", Qt) || G.getContext("experimental-webgl", Qt)))throw null !== G.getContext("webgl") ? "Error creating WebGL context with your selected attributes." : "Error creating WebGL context.";
            void 0 === Jt.getShaderPrecisionFormat && (Jt.getShaderPrecisionFormat = function () {
                return {rangeMin: 1, rangeMax: 1, precision: 1}
            }), G.addEventListener("webglcontextlost", o, !1)
        } catch (t) {
            console.error("THREE.WebGLRenderer: " + t)
        }
        var $t = new oe(Jt);
        $t.get("WEBGL_depth_texture"), $t.get("OES_texture_float"), $t.get("OES_texture_float_linear"), $t.get("OES_texture_half_float"), $t.get("OES_texture_half_float_linear"), $t.get("OES_standard_derivatives"), $t.get("ANGLE_instanced_arrays"), $t.get("OES_element_index_uint") && (St.MaxIndex = 4294967296);
        var se = new re(Jt, $t, t), ce = new ie(Jt, $t, F), he = new ne, le = new ee(Jt, $t, ce, he, se, F, this.info),
            ue = new te(Jt, he, this.info), pe = new Kt(this, se), de = new zt;
        this.info.programs = pe.programs;
        var fe, me, ge, ve, ye = new Ot(Jt, $t, Zt), xe = new Dt(Jt, $t, Zt);
        n(), this.context = Jt, this.capabilities = se, this.extensions = $t, this.properties = he, this.state = ce;
        var _e = new it(this, Yt, ue, se);
        this.shadowMap = _e;
        var be = new Y(this, ct), we = new X(this, ht);
        this.getContext = function () {
            return Jt
        }, this.getContextAttributes = function () {
            return Jt.getContextAttributes()
        }, this.forceContextLoss = function () {
            $t.get("WEBGL_lose_context").loseContext()
        }, this.getMaxAnisotropy = function () {
            return se.getMaxAnisotropy()
        }, this.getPrecision = function () {
            return se.precision
        }, this.getPixelRatio = function () {
            return Lt
        }, this.setPixelRatio = function (t) {
            void 0 !== t && (Lt = t, this.setSize(Bt.z, Bt.w, !1))
        }, this.getSize = function () {
            return {width: Et, height: Tt}
        }, this.setSize = function (t, e, n) {
            Et = t, Tt = e, G.width = t * Lt, G.height = e * Lt, n !== !1 && (G.style.width = t + "px", G.style.height = e + "px"), this.setViewport(0, 0, t, e)
        }, this.setViewport = function (t, e, n, i) {
            ce.viewport(Bt.set(t, e, n, i))
        }, this.setScissor = function (t, e, n, i) {
            ce.scissor(Pt.set(t, e, n, i))
        }, this.setScissorTest = function (t) {
            ce.setScissorTest(Nt = t)
        }, this.getClearColor = function () {
            return wt
        }, this.setClearColor = function (t, e) {
            wt.set(t), Mt = void 0 !== e ? e : 1, ce.buffers.color.setClear(wt.r, wt.g, wt.b, Mt, Q)
        }, this.getClearAlpha = function () {
            return Mt
        }, this.setClearAlpha = function (t) {
            Mt = t, ce.buffers.color.setClear(wt.r, wt.g, wt.b, Mt, Q)
        }, this.clear = function (t, e, n) {
            var i = 0;
            (void 0 === t || t) && (i |= Jt.COLOR_BUFFER_BIT), (void 0 === e || e) && (i |= Jt.DEPTH_BUFFER_BIT), (void 0 === n || n) && (i |= Jt.STENCIL_BUFFER_BIT), Jt.clear(i)
        }, this.clearColor = function () {
            this.clear(!0, !1, !1)
        }, this.clearDepth = function () {
            this.clear(!1, !0, !1)
        }, this.clearStencil = function () {
            this.clear(!1, !1, !0)
        }, this.clearTarget = function (t, e, n, i) {
            this.setRenderTarget(t), this.clear(e, n, i)
        }, this.resetGLState = r, this.dispose = function () {
            ot = [], at = -1, et = [], rt = -1, G.removeEventListener("webglcontextlost", o, !1)
        }, this.renderBufferImmediate = function (t, e, n) {
            ce.initAttributes();
            var i = he.get(t);
            t.hasPositions && !i.position && (i.position = Jt.createBuffer()), t.hasNormals && !i.normal && (i.normal = Jt.createBuffer()), t.hasUvs && !i.uv && (i.uv = Jt.createBuffer()), t.hasColors && !i.color && (i.color = Jt.createBuffer());
            var r = e.getAttributes();
            if (t.hasPositions && (Jt.bindBuffer(Jt.ARRAY_BUFFER, i.position), Jt.bufferData(Jt.ARRAY_BUFFER, t.positionArray, Jt.DYNAMIC_DRAW), ce.enableAttribute(r.position), Jt.vertexAttribPointer(r.position, 3, Jt.FLOAT, !1, 0, 0)), t.hasNormals) {
                if (Jt.bindBuffer(Jt.ARRAY_BUFFER, i.normal), !n.isMeshPhongMaterial && !n.isMeshStandardMaterial && !n.isMeshNormalMaterial && n.shading === ts)for (var o = 0, a = 3 * t.count; o < a; o += 9) {
                    var s = t.normalArray, c = (s[o + 0] + s[o + 3] + s[o + 6]) / 3,
                        h = (s[o + 1] + s[o + 4] + s[o + 7]) / 3, l = (s[o + 2] + s[o + 5] + s[o + 8]) / 3;
                    s[o + 0] = c, s[o + 1] = h, s[o + 2] = l, s[o + 3] = c, s[o + 4] = h, s[o + 5] = l, s[o + 6] = c, s[o + 7] = h, s[o + 8] = l
                }
                Jt.bufferData(Jt.ARRAY_BUFFER, t.normalArray, Jt.DYNAMIC_DRAW), ce.enableAttribute(r.normal), Jt.vertexAttribPointer(r.normal, 3, Jt.FLOAT, !1, 0, 0)
            }
            t.hasUvs && n.map && (Jt.bindBuffer(Jt.ARRAY_BUFFER, i.uv), Jt.bufferData(Jt.ARRAY_BUFFER, t.uvArray, Jt.DYNAMIC_DRAW), ce.enableAttribute(r.uv), Jt.vertexAttribPointer(r.uv, 2, Jt.FLOAT, !1, 0, 0)), t.hasColors && n.vertexColors !== ns && (Jt.bindBuffer(Jt.ARRAY_BUFFER, i.color), Jt.bufferData(Jt.ARRAY_BUFFER, t.colorArray, Jt.DYNAMIC_DRAW), ce.enableAttribute(r.color), Jt.vertexAttribPointer(r.color, 3, Jt.FLOAT, !1, 0, 0)), ce.disableUnusedAttributes(), Jt.drawArrays(Jt.TRIANGLES, 0, t.count), t.count = 0
        }, this.renderBufferDirect = function (t, n, i, r, o, a) {
            w(r);
            var s = M(t, n, r, o), c = !1, h = i.id + "_" + s.id + "_" + r.wireframe;
            h !== gt && (gt = h, c = !0);
            var l = o.morphTargetInfluences;
            if (void 0 !== l) {
                for (var d = [], f = 0, m = l.length; f < m; f++) {
                    var g = l[f];
                    d.push([g, f])
                }
                d.sort(p), d.length > 8 && (d.length = 8);
                for (var v = i.morphAttributes, f = 0, m = d.length; f < m; f++) {
                    var g = d[f];
                    if (st[f] = g[0], 0 !== g[0]) {
                        var y = g[1];
                        r.morphTargets === !0 && v.position && i.addAttribute("morphTarget" + f, v.position[y]), r.morphNormals === !0 && v.normal && i.addAttribute("morphNormal" + f, v.normal[y])
                    } else r.morphTargets === !0 && i.removeAttribute("morphTarget" + f), r.morphNormals === !0 && i.removeAttribute("morphNormal" + f)
                }
                for (var f = d.length, x = st.length; f < x; f++)st[f] = 0;
                s.getUniforms().setValue(Jt, "morphTargetInfluences", st), c = !0
            }
            var y = i.index, _ = i.attributes.position, b = 1;
            r.wireframe === !0 && (y = ue.getWireframeAttribute(i), b = 2);
            var E;
            null !== y ? (E = xe, E.setIndex(y)) : E = ye, c && (u(r, s, i), null !== y && Jt.bindBuffer(Jt.ELEMENT_ARRAY_BUFFER, ue.getAttributeBuffer(y)));
            var T = 0;
            null !== y ? T = y.count : void 0 !== _ && (T = _.count);
            var S = i.drawRange.start * b, A = i.drawRange.count * b, L = null !== a ? a.start * b : 0,
                R = null !== a ? a.count * b : 1 / 0, P = Math.max(S, L), C = Math.min(T, S + A, L + R) - 1,
                N = Math.max(0, C - P + 1);
            if (0 !== N) {
                if (o.isMesh)if (r.wireframe === !0) ce.setLineWidth(r.wireframeLinewidth * e()), E.setMode(Jt.LINES); else switch (o.drawMode) {
                    case Oc:
                        E.setMode(Jt.TRIANGLES);
                        break;
                    case zc:
                        E.setMode(Jt.TRIANGLE_STRIP);
                        break;
                    case Bc:
                        E.setMode(Jt.TRIANGLE_FAN)
                } else if (o.isLine) {
                    var I = r.linewidth;
                    void 0 === I && (I = 1), ce.setLineWidth(I * e()), o.isLineSegments ? E.setMode(Jt.LINES) : E.setMode(Jt.LINE_STRIP)
                } else o.isPoints && E.setMode(Jt.POINTS);
                i && i.isInstancedBufferGeometry ? i.maxInstancedCount > 0 && E.renderInstances(i, P, N) : E.render(P, N)
            }
        }, this.render = function (t, e, n, i) {
            if (void 0 !== e && e.isCamera !== !0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
            gt = "", mt = -1, vt = null, t.autoUpdate === !0 && t.updateMatrixWorld(), null === e.parent && e.updateMatrixWorld(), e.matrixWorldInverse.getInverse(e.matrixWorld), jt.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), Ft.setFromMatrix(jt), tt.length = 0, rt = -1, at = -1, ct.length = 0, ht.length = 0, Ht = this.localClippingEnabled, kt = Gt.init(this.clippingPlanes, Ht, e), x(t, e), et.length = rt + 1, ot.length = at + 1, lt.sortObjects === !0 && (et.sort(d), ot.sort(f)), kt && Gt.beginShadows(), O(tt), _e.render(t, e), z(tt, e), kt && Gt.endShadows(), Zt.calls = 0, Zt.vertices = 0, Zt.faces = 0, Zt.points = 0, void 0 === n && (n = null), this.setRenderTarget(n);
            var r = t.background;
            if (null === r ? ce.buffers.color.setClear(wt.r, wt.g, wt.b, Mt, Q) : r && r.isColor && (ce.buffers.color.setClear(r.r, r.g, r.b, 1, Q), i = !0), (this.autoClear || i) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil), r && r.isCubeTexture ? (void 0 === ge && (ge = new It, ve = new At(new Rt(5, 5, 5), new J({
                    uniforms: oh.cube.uniforms,
                    vertexShader: oh.cube.vertexShader,
                    fragmentShader: oh.cube.fragmentShader,
                    side: Ka,
                    depthTest: !1,
                    depthWrite: !1,
                    fog: !1
                }))),
                    ge.projectionMatrix.copy(e.projectionMatrix), ge.matrixWorld.extractRotation(e.matrixWorld), ge.matrixWorldInverse.getInverse(ge.matrixWorld), ve.material.uniforms.tCube.value = r, ve.modelViewMatrix.multiplyMatrices(ge.matrixWorldInverse, ve.matrixWorld), ue.update(ve), lt.renderBufferDirect(ge, null, ve.geometry, ve.material, ve, null)) : r && r.isTexture && (void 0 === fe && (fe = new Ut(-1, 1, 1, -1, 0, 1), me = new At(new Ct(2, 2), new ut({
                        depthTest: !1,
                        depthWrite: !1,
                        fog: !1
                    }))), me.material.map = r, ue.update(me), lt.renderBufferDirect(fe, null, me.geometry, me.material, me, null)), t.overrideMaterial) {
                var o = t.overrideMaterial;
                _(et, t, e, o), _(ot, t, e, o)
            } else ce.setBlending(os), _(et, t, e), _(ot, t, e);
            be.render(t, e), we.render(t, e, _t), n && le.updateRenderTargetMipmap(n), ce.setDepthTest(!0), ce.setDepthWrite(!0), ce.setColorWrite(!0)
        }, this.setFaceCulling = function (t, e) {
            ce.setCullFace(t), ce.setFlipSided(e === Ya)
        }, this.allocTextureUnit = B, this.setTexture2D = function () {
            var t = !1;
            return function (e, n) {
                e && e.isWebGLRenderTarget && (t || (console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead."), t = !0), e = e.texture), le.setTexture2D(e, n)
            }
        }(), this.setTexture = function () {
            var t = !1;
            return function (e, n) {
                t || (console.warn("THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead."), t = !0), le.setTexture2D(e, n)
            }
        }(), this.setTextureCube = function () {
            var t = !1;
            return function (e, n) {
                e && e.isWebGLRenderTargetCube && (t || (console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead."), t = !0), e = e.texture), e && e.isCubeTexture || Array.isArray(e.image) && 6 === e.image.length ? le.setTextureCube(e, n) : le.setTextureCubeDynamic(e, n)
            }
        }(), this.getCurrentRenderTarget = function () {
            return dt
        }, this.setRenderTarget = function (t) {
            dt = t, t && void 0 === he.get(t).__webglFramebuffer && le.setupRenderTarget(t);
            var e, n = t && t.isWebGLRenderTargetCube;
            if (t) {
                var i = he.get(t);
                e = n ? i.__webglFramebuffer[t.activeCubeFace] : i.__webglFramebuffer, yt.copy(t.scissor), xt = t.scissorTest, _t.copy(t.viewport)
            } else e = null, yt.copy(Pt).multiplyScalar(Lt), xt = Nt, _t.copy(Bt).multiplyScalar(Lt);
            if (ft !== e && (Jt.bindFramebuffer(Jt.FRAMEBUFFER, e), ft = e), ce.scissor(yt), ce.setScissorTest(xt), ce.viewport(_t), n) {
                var r = he.get(t.texture);
                Jt.framebufferTexture2D(Jt.FRAMEBUFFER, Jt.COLOR_ATTACHMENT0, Jt.TEXTURE_CUBE_MAP_POSITIVE_X + t.activeCubeFace, r.__webglTexture, t.activeMipMapLevel)
            }
        }, this.readRenderTargetPixels = function (t, e, n, i, r, o) {
            if ((t && t.isWebGLRenderTarget) === !1)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
            var a = he.get(t).__webglFramebuffer;
            if (a) {
                var s = !1;
                a !== ft && (Jt.bindFramebuffer(Jt.FRAMEBUFFER, a), s = !0);
                try {
                    var c = t.texture, h = c.format, l = c.type;
                    if (h !== xc && F(h) !== Jt.getParameter(Jt.IMPLEMENTATION_COLOR_READ_FORMAT))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
                    if (!(l === oc || F(l) === Jt.getParameter(Jt.IMPLEMENTATION_COLOR_READ_TYPE) || l === uc && ($t.get("OES_texture_float") || $t.get("WEBGL_color_buffer_float")) || l === pc && $t.get("EXT_color_buffer_half_float")))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
                    Jt.checkFramebufferStatus(Jt.FRAMEBUFFER) === Jt.FRAMEBUFFER_COMPLETE ? e >= 0 && e <= t.width - i && n >= 0 && n <= t.height - r && Jt.readPixels(e, n, i, r, F(h), F(l), o) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")
                } finally {
                    s && Jt.bindFramebuffer(Jt.FRAMEBUFFER, ft)
                }
            }
        }
    }

    function ce(t, e) {
        this.name = "", this.color = new j(t), this.density = void 0 !== e ? e : 25e-5
    }

    function he(t, e, n) {
        this.name = "", this.color = new j(t), this.near = void 0 !== e ? e : 1, this.far = void 0 !== n ? n : 1e3
    }

    function le() {
        st.call(this), this.type = "Scene", this.background = null, this.fog = null, this.overrideMaterial = null, this.autoUpdate = !0
    }

    function ue(t, e, n, i, r) {
        st.call(this), this.lensFlares = [], this.positionScreen = new s, this.customUpdateCallback = void 0, void 0 !== t && this.add(t, e, n, i, r)
    }

    function pe(t) {
        Z.call(this), this.type = "SpriteMaterial", this.color = new j(16777215), this.map = null, this.rotation = 0, this.fog = !1, this.lights = !1, this.setValues(t)
    }

    function de(t) {
        st.call(this), this.type = "Sprite", this.material = void 0 !== t ? t : new pe
    }

    function fe() {
        st.call(this), this.type = "LOD", Object.defineProperties(this, {levels: {enumerable: !0, value: []}})
    }

    function me(t, e, n) {
        if (this.useVertexTexture = void 0 === n || n, this.identityMatrix = new c, t = t || [], this.bones = t.slice(0), this.useVertexTexture) {
            var i = Math.sqrt(4 * this.bones.length);
            i = Yc.nextPowerOfTwo(Math.ceil(i)), i = Math.max(i, 4), this.boneTextureWidth = i, this.boneTextureHeight = i, this.boneMatrices = new Float32Array(this.boneTextureWidth * this.boneTextureHeight * 4), this.boneTexture = new W(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, xc, uc)
        } else this.boneMatrices = new Float32Array(16 * this.bones.length);
        if (void 0 === e) this.calculateInverses(); else if (this.bones.length === e.length) this.boneInverses = e.slice(0); else {
            console.warn("THREE.Skeleton bonInverses is the wrong length."), this.boneInverses = [];
            for (var r = 0, o = this.bones.length; r < o; r++)this.boneInverses.push(new c)
        }
    }

    function ge() {
        st.call(this), this.type = "Bone"
    }

    function ve(t, e, n) {
        At.call(this, t, e), this.type = "SkinnedMesh", this.bindMode = "attached", this.bindMatrix = new c, this.bindMatrixInverse = new c;
        var i = [];
        if (this.geometry && void 0 !== this.geometry.bones) {
            for (var r, o, a = 0, s = this.geometry.bones.length; a < s; ++a)o = this.geometry.bones[a], r = new ge, i.push(r), r.name = o.name, r.position.fromArray(o.pos), r.quaternion.fromArray(o.rotq), void 0 !== o.scl && r.scale.fromArray(o.scl);
            for (var a = 0, s = this.geometry.bones.length; a < s; ++a)o = this.geometry.bones[a], o.parent !== -1 && null !== o.parent && void 0 !== i[o.parent] ? i[o.parent].add(i[a]) : this.add(i[a])
        }
        this.normalizeSkinWeights(), this.updateMatrixWorld(!0), this.bind(new me(i, void 0, n), this.matrixWorld)
    }

    function ye(t) {
        Z.call(this), this.type = "LineBasicMaterial", this.color = new j(16777215), this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.lights = !1, this.setValues(t)
    }

    function xe(t, e, n) {
        if (1 === n)return console.warn("THREE.Line: parameter THREE.LinePieces no longer supported. Created THREE.LineSegments instead."), new _e(t, e);
        st.call(this), this.type = "Line", this.geometry = void 0 !== t ? t : new St, this.material = void 0 !== e ? e : new ye({color: 16777215 * Math.random()})
    }

    function _e(t, e) {
        xe.call(this, t, e), this.type = "LineSegments"
    }

    function be(t) {
        Z.call(this), this.type = "PointsMaterial", this.color = new j(16777215), this.map = null, this.size = 1, this.sizeAttenuation = !0, this.lights = !1, this.setValues(t)
    }

    function we(t, e) {
        st.call(this), this.type = "Points", this.geometry = void 0 !== t ? t : new St, this.material = void 0 !== e ? e : new be({color: 16777215 * Math.random()})
    }

    function Me() {
        st.call(this), this.type = "Group"
    }

    function Ee(t, e, i, r, o, a, s, c, h) {
        function l() {
            requestAnimationFrame(l), t.readyState >= t.HAVE_CURRENT_DATA && (u.needsUpdate = !0)
        }

        n.call(this, t, e, i, r, o, a, s, c, h), this.generateMipmaps = !1;
        var u = this;
        l()
    }

    function Te(t, e, i, r, o, a, s, c, h, l, u, p) {
        n.call(this, null, a, s, c, h, l, r, o, u, p), this.image = {
            width: e,
            height: i
        }, this.mipmaps = t, this.flipY = !1, this.generateMipmaps = !1
    }

    function Se(t, e, i, r, o, a, s, c, h) {
        n.call(this, t, e, i, r, o, a, s, c, h), this.needsUpdate = !0
    }

    function Ae(t, e, i, r, o, a, s, c, h, l) {
        if ((l = void 0 !== l ? l : Mc) !== Mc && l !== Ec)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
        void 0 === i && l === Mc && (i = cc), void 0 === i && l === Ec && (i = gc), n.call(this, null, r, o, a, s, c, l, i, h), this.image = {
            width: t,
            height: e
        }, this.magFilter = void 0 !== s ? s : $s, this.minFilter = void 0 !== c ? c : $s, this.flipY = !1, this.generateMipmaps = !1
    }

    function Le(t) {
        function e(t, e) {
            return t - e
        }

        St.call(this), this.type = "WireframeGeometry";
        var n, i, r, o, a, c, h, l, u = [], p = [0, 0], d = {}, f = ["a", "b", "c"];
        if (t && t.isGeometry) {
            var m = t.faces;
            for (n = 0, r = m.length; n < r; n++) {
                var g = m[n];
                for (i = 0; i < 3; i++)p[0] = g[f[i]], p[1] = g[f[(i + 1) % 3]], p.sort(e), h = p.toString(), void 0 === d[h] && (d[h] = {
                    index1: p[0],
                    index2: p[1]
                })
            }
            for (h in d)c = d[h], l = t.vertices[c.index1], u.push(l.x, l.y, l.z), l = t.vertices[c.index2], u.push(l.x, l.y, l.z)
        } else if (t && t.isBufferGeometry) {
            var v, y, x, _, b, w, M, E;
            if (l = new s, null !== t.index) {
                for (v = t.attributes.position, y = t.index, x = t.groups, 0 === x.length && t.addGroup(0, y.count), o = 0, a = x.length; o < a; ++o)for (_ = x[o], b = _.start, w = _.count, n = b, r = b + w; n < r; n += 3)for (i = 0; i < 3; i++)p[0] = y.getX(n + i), p[1] = y.getX(n + (i + 1) % 3), p.sort(e), h = p.toString(), void 0 === d[h] && (d[h] = {
                    index1: p[0],
                    index2: p[1]
                });
                for (h in d)c = d[h], l.fromBufferAttribute(v, c.index1), u.push(l.x, l.y, l.z), l.fromBufferAttribute(v, c.index2), u.push(l.x, l.y, l.z)
            } else for (v = t.attributes.position, n = 0, r = v.count / 3; n < r; n++)for (i = 0; i < 3; i++)M = 3 * n + i, l.fromBufferAttribute(v, M), u.push(l.x, l.y, l.z), E = 3 * n + (i + 1) % 3, l.fromBufferAttribute(v, E), u.push(l.x, l.y, l.z)
        }
        this.addAttribute("position", new _t(u, 3))
    }

    function Re(t, e, n) {
        Tt.call(this), this.type = "ParametricGeometry", this.parameters = {
            func: t,
            slices: e,
            stacks: n
        }, this.fromBufferGeometry(new Pe(t, e, n)), this.mergeVertices()
    }

    function Pe(t, e, n) {
        St.call(this), this.type = "ParametricBufferGeometry", this.parameters = {func: t, slices: e, stacks: n};
        var i, r, o = [], a = [], s = [], c = e + 1;
        for (i = 0; i <= n; i++) {
            var h = i / n;
            for (r = 0; r <= e; r++) {
                var l = r / e, u = t(l, h);
                a.push(u.x, u.y, u.z), s.push(l, h)
            }
        }
        for (i = 0; i < n; i++)for (r = 0; r < e; r++) {
            var p = i * c + r, d = i * c + r + 1, f = (i + 1) * c + r + 1, m = (i + 1) * c + r;
            o.push(p, d, m), o.push(d, f, m)
        }
        this.setIndex(o), this.addAttribute("position", new _t(a, 3)), this.addAttribute("uv", new _t(s, 2)), this.computeVertexNormals()
    }

    function Ce(t, e, n, i) {
        Tt.call(this), this.type = "PolyhedronGeometry", this.parameters = {
            vertices: t,
            indices: e,
            radius: n,
            detail: i
        }, this.fromBufferGeometry(new Ne(t, e, n, i)), this.mergeVertices()
    }

    function Ne(t, n, i, r) {
        function o(t, e, n, i) {
            var r, o, a = Math.pow(2, i), s = [];
            for (r = 0; r <= a; r++) {
                s[r] = [];
                var h = t.clone().lerp(n, r / a), l = e.clone().lerp(n, r / a), u = a - r;
                for (o = 0; o <= u; o++)s[r][o] = 0 === o && r === a ? h : h.clone().lerp(l, o / u)
            }
            for (r = 0; r < a; r++)for (o = 0; o < 2 * (a - r) - 1; o++) {
                var p = Math.floor(o / 2);
                o % 2 == 0 ? (c(s[r][p + 1]), c(s[r + 1][p]), c(s[r][p])) : (c(s[r][p + 1]), c(s[r + 1][p + 1]), c(s[r + 1][p]))
            }
        }

        function a() {
            for (var t = 0; t < m.length; t += 6) {
                var e = m[t + 0], n = m[t + 2], i = m[t + 4], r = Math.max(e, n, i), o = Math.min(e, n, i);
                r > .9 && o < .1 && (e < .2 && (m[t + 0] += 1), n < .2 && (m[t + 2] += 1), i < .2 && (m[t + 4] += 1))
            }
        }

        function c(t) {
            f.push(t.x, t.y, t.z)
        }

        function h(e, n) {
            var i = 3 * e;
            n.x = t[i + 0], n.y = t[i + 1], n.z = t[i + 2]
        }

        function l() {
            for (var t = new s, n = new s, i = new s, r = new s, o = new e, a = new e, c = new e, h = 0, l = 0; h < f.length; h += 9, l += 6) {
                t.set(f[h + 0], f[h + 1], f[h + 2]), n.set(f[h + 3], f[h + 4], f[h + 5]), i.set(f[h + 6], f[h + 7], f[h + 8]), o.set(m[l + 0], m[l + 1]), a.set(m[l + 2], m[l + 3]), c.set(m[l + 4], m[l + 5]), r.copy(t).add(n).add(i).divideScalar(3);
                var d = p(r);
                u(o, l + 0, t, d), u(a, l + 2, n, d), u(c, l + 4, i, d)
            }
        }

        function u(t, e, n, i) {
            i < 0 && 1 === t.x && (m[e] = t.x - 1), 0 === n.x && 0 === n.z && (m[e] = i / 2 / Math.PI + .5)
        }

        function p(t) {
            return Math.atan2(t.z, -t.x)
        }

        function d(t) {
            return Math.atan2(-t.y, Math.sqrt(t.x * t.x + t.z * t.z))
        }

        St.call(this), this.type = "PolyhedronBufferGeometry", this.parameters = {
            vertices: t,
            indices: n,
            radius: i,
            detail: r
        }, i = i || 1, r = r || 0;
        var f = [], m = [];
        !function (t) {
            for (var e = new s, i = new s, r = new s, a = 0; a < n.length; a += 3)h(n[a + 0], e), h(n[a + 1], i), h(n[a + 2], r), o(e, i, r, t)
        }(r), function (t) {
            for (var e = new s, n = 0; n < f.length; n += 3)e.x = f[n + 0], e.y = f[n + 1], e.z = f[n + 2], e.normalize().multiplyScalar(t), f[n + 0] = e.x, f[n + 1] = e.y, f[n + 2] = e.z
        }(i), function () {
            for (var t = new s, e = 0; e < f.length; e += 3) {
                t.x = f[e + 0], t.y = f[e + 1], t.z = f[e + 2];
                var n = p(t) / 2 / Math.PI + .5, i = d(t) / Math.PI + .5;
                m.push(n, 1 - i)
            }
            l(), a()
        }(), this.addAttribute("position", new _t(f, 3)), this.addAttribute("normal", new _t(f.slice(), 3)), this.addAttribute("uv", new _t(m, 2)), this.normalizeNormals()
    }

    function Ie(t, e) {
        Tt.call(this), this.type = "TetrahedronGeometry", this.parameters = {
            radius: t,
            detail: e
        }, this.fromBufferGeometry(new Ue(t, e)), this.mergeVertices()
    }

    function Ue(t, e) {
        var n = [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], i = [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1];
        Ne.call(this, n, i, t, e), this.type = "TetrahedronBufferGeometry", this.parameters = {radius: t, detail: e}
    }

    function De(t, e) {
        Tt.call(this), this.type = "OctahedronGeometry", this.parameters = {
            radius: t,
            detail: e
        }, this.fromBufferGeometry(new Oe(t, e)), this.mergeVertices()
    }

    function Oe(t, e) {
        var n = [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1],
            i = [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2];
        Ne.call(this, n, i, t, e), this.type = "OctahedronBufferGeometry", this.parameters = {radius: t, detail: e}
    }

    function ze(t, e) {
        Tt.call(this), this.type = "IcosahedronGeometry", this.parameters = {
            radius: t,
            detail: e
        }, this.fromBufferGeometry(new Be(t, e)), this.mergeVertices()
    }

    function Be(t, e) {
        var n = (1 + Math.sqrt(5)) / 2,
            i = [-1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, 0, 0, -1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, n, 0, -1, n, 0, 1, -n, 0, -1, -n, 0, 1],
            r = [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1];
        Ne.call(this, i, r, t, e), this.type = "IcosahedronBufferGeometry", this.parameters = {radius: t, detail: e}
    }

    function Fe(t, e) {
        Tt.call(this), this.type = "DodecahedronGeometry", this.parameters = {
            radius: t,
            detail: e
        }, this.fromBufferGeometry(new Ge(t, e)), this.mergeVertices()
    }

    function Ge(t, e) {
        var n = (1 + Math.sqrt(5)) / 2, i = 1 / n,
            r = [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -i, -n, 0, -i, n, 0, i, -n, 0, i, n, -i, -n, 0, -i, n, 0, i, -n, 0, i, n, 0, -n, 0, -i, n, 0, -i, -n, 0, i, n, 0, i],
            o = [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9];
        Ne.call(this, r, o, t, e), this.type = "DodecahedronBufferGeometry", this.parameters = {radius: t, detail: e}
    }

    function ke(t, e, n, i, r, o) {
        Tt.call(this), this.type = "TubeGeometry", this.parameters = {
            path: t,
            tubularSegments: e,
            radius: n,
            radialSegments: i,
            closed: r
        }, void 0 !== o && console.warn("THREE.TubeGeometry: taper has been removed.");
        var a = new He(t, e, n, i, r);
        this.tangents = a.tangents, this.normals = a.normals, this.binormals = a.binormals, this.fromBufferGeometry(a), this.mergeVertices()
    }

    function He(t, n, i, r, o) {
        function a(e) {
            var o = t.getPointAt(e / n), a = l.normals[e], s = l.binormals[e];
            for (p = 0; p <= r; p++) {
                var c = p / r * Math.PI * 2, h = Math.sin(c), u = -Math.cos(c);
                f.x = u * a.x + h * s.x, f.y = u * a.y + h * s.y, f.z = u * a.z + h * s.z, f.normalize(), v.push(f.x, f.y, f.z), d.x = o.x + i * f.x, d.y = o.y + i * f.y, d.z = o.z + i * f.z, g.push(d.x, d.y, d.z)
            }
        }

        function c() {
            for (p = 1; p <= n; p++)for (u = 1; u <= r; u++) {
                var t = (r + 1) * (p - 1) + (u - 1), e = (r + 1) * p + (u - 1), i = (r + 1) * p + u,
                    o = (r + 1) * (p - 1) + u;
                x.push(t, e, o), x.push(e, i, o)
            }
        }

        function h() {
            for (u = 0; u <= n; u++)for (p = 0; p <= r; p++)m.x = u / n, m.y = p / r, y.push(m.x, m.y)
        }

        St.call(this), this.type = "TubeBufferGeometry", this.parameters = {
            path: t,
            tubularSegments: n,
            radius: i,
            radialSegments: r,
            closed: o
        }, n = n || 64, i = i || 1, r = r || 8, o = o || !1;
        var l = t.computeFrenetFrames(n, o);
        this.tangents = l.tangents, this.normals = l.normals, this.binormals = l.binormals;
        var u, p, d = new s, f = new s, m = new e, g = [], v = [], y = [], x = [];
        !function () {
            for (u = 0; u < n; u++)a(u);
            a(o === !1 ? n : 0), h(), c()
        }(), this.setIndex(x), this.addAttribute("position", new _t(g, 3)), this.addAttribute("normal", new _t(v, 3)), this.addAttribute("uv", new _t(y, 2))
    }

    function Ve(t, e, n, i, r, o, a) {
        Tt.call(this), this.type = "TorusKnotGeometry", this.parameters = {
            radius: t,
            tube: e,
            tubularSegments: n,
            radialSegments: i,
            p: r,
            q: o
        }, void 0 !== a && console.warn("THREE.TorusKnotGeometry: heightScale has been deprecated. Use .scale( x, y, z ) instead."), this.fromBufferGeometry(new je(t, e, n, i, r, o)), this.mergeVertices()
    }

    function je(t, n, i, r, o, a) {
        function c(t, e, n, i, r) {
            var o = Math.cos(t), a = Math.sin(t), s = n / e * t, c = Math.cos(s);
            r.x = i * (2 + c) * .5 * o, r.y = i * (2 + c) * a * .5, r.z = i * Math.sin(s) * .5
        }

        St.call(this), this.type = "TorusKnotBufferGeometry", this.parameters = {
            radius: t,
            tube: n,
            tubularSegments: i,
            radialSegments: r,
            p: o,
            q: a
        }, t = t || 100, n = n || 40, i = Math.floor(i) || 64, r = Math.floor(r) || 8, o = o || 2, a = a || 3;
        var h, l, u = [], p = [], d = [], f = [], m = new s, g = new s, v = (new e, new s), y = new s, x = new s,
            _ = new s, b = new s;
        for (h = 0; h <= i; ++h) {
            var w = h / i * o * Math.PI * 2;
            for (c(w, o, a, t, v), c(w + .01, o, a, t, y), _.subVectors(y, v), b.addVectors(y, v), x.crossVectors(_, b), b.crossVectors(x, _), x.normalize(), b.normalize(), l = 0; l <= r; ++l) {
                var M = l / r * Math.PI * 2, E = -n * Math.cos(M), T = n * Math.sin(M);
                m.x = v.x + (E * b.x + T * x.x), m.y = v.y + (E * b.y + T * x.y), m.z = v.z + (E * b.z + T * x.z), p.push(m.x, m.y, m.z), g.subVectors(m, v).normalize(), d.push(g.x, g.y, g.z), f.push(h / i), f.push(l / r)
            }
        }
        for (l = 1; l <= i; l++)for (h = 1; h <= r; h++) {
            var S = (r + 1) * (l - 1) + (h - 1), A = (r + 1) * l + (h - 1), L = (r + 1) * l + h,
                R = (r + 1) * (l - 1) + h;
            u.push(S, A, R), u.push(A, L, R)
        }
        this.setIndex(u), this.addAttribute("position", new _t(p, 3)), this.addAttribute("normal", new _t(d, 3)), this.addAttribute("uv", new _t(f, 2))
    }

    function We(t, e, n, i, r) {
        Tt.call(this), this.type = "TorusGeometry", this.parameters = {
            radius: t,
            tube: e,
            radialSegments: n,
            tubularSegments: i,
            arc: r
        }, this.fromBufferGeometry(new qe(t, e, n, i, r))
    }

    function qe(t, e, n, i, r) {
        St.call(this), this.type = "TorusBufferGeometry", this.parameters = {
            radius: t,
            tube: e,
            radialSegments: n,
            tubularSegments: i,
            arc: r
        }, t = t || 100, e = e || 40, n = Math.floor(n) || 8, i = Math.floor(i) || 6, r = r || 2 * Math.PI;
        var o, a, c = [], h = [], l = [], u = [], p = new s, d = new s, f = new s;
        for (o = 0; o <= n; o++)for (a = 0; a <= i; a++) {
            var m = a / i * r, g = o / n * Math.PI * 2;
            d.x = (t + e * Math.cos(g)) * Math.cos(m), d.y = (t + e * Math.cos(g)) * Math.sin(m), d.z = e * Math.sin(g), h.push(d.x, d.y, d.z), p.x = t * Math.cos(m), p.y = t * Math.sin(m), f.subVectors(d, p).normalize(), l.push(f.x, f.y, f.z), u.push(a / i), u.push(o / n)
        }
        for (o = 1; o <= n; o++)for (a = 1; a <= i; a++) {
            var v = (i + 1) * o + a - 1, y = (i + 1) * (o - 1) + a - 1, x = (i + 1) * (o - 1) + a, _ = (i + 1) * o + a;
            c.push(v, y, _), c.push(y, x, _)
        }
        this.setIndex(c), this.addAttribute("position", new _t(h, 3)), this.addAttribute("normal", new _t(l, 3)), this.addAttribute("uv", new _t(u, 2))
    }

    function Xe(t, e) {
        if (void 0 === t)return void(t = []);
        Tt.call(this), this.type = "ExtrudeGeometry", t = Array.isArray(t) ? t : [t], this.addShapeList(t, e), this.computeFaceNormals()
    }

    function Ye(t, e) {
        e = e || {};
        var n = e.font;
        if ((n && n.isFont) === !1)return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."), new Tt;
        var i = n.generateShapes(t, e.size, e.curveSegments);
        e.amount = void 0 !== e.height ? e.height : 50, void 0 === e.bevelThickness && (e.bevelThickness = 10), void 0 === e.bevelSize && (e.bevelSize = 8), void 0 === e.bevelEnabled && (e.bevelEnabled = !1), Xe.call(this, i, e), this.type = "TextGeometry"
    }

    function Ze(t, e, n, i, r, o, a) {
        Tt.call(this), this.type = "SphereGeometry", this.parameters = {
            radius: t,
            widthSegments: e,
            heightSegments: n,
            phiStart: i,
            phiLength: r,
            thetaStart: o,
            thetaLength: a
        }, this.fromBufferGeometry(new Je(t, e, n, i, r, o, a))
    }

    function Je(t, e, n, i, r, o, a) {
        St.call(this), this.type = "SphereBufferGeometry", this.parameters = {
            radius: t,
            widthSegments: e,
            heightSegments: n,
            phiStart: i,
            phiLength: r,
            thetaStart: o,
            thetaLength: a
        }, t = t || 50, e = Math.max(3, Math.floor(e) || 8), n = Math.max(2, Math.floor(n) || 6), i = void 0 !== i ? i : 0, r = void 0 !== r ? r : 2 * Math.PI, o = void 0 !== o ? o : 0, a = void 0 !== a ? a : Math.PI;
        var c, h, l = o + a, u = 0, p = [], d = new s, f = new s, m = [], g = [], v = [], y = [];
        for (h = 0; h <= n; h++) {
            var x = [], _ = h / n;
            for (c = 0; c <= e; c++) {
                var b = c / e;
                d.x = -t * Math.cos(i + b * r) * Math.sin(o + _ * a), d.y = t * Math.cos(o + _ * a), d.z = t * Math.sin(i + b * r) * Math.sin(o + _ * a), g.push(d.x, d.y, d.z), f.set(d.x, d.y, d.z).normalize(), v.push(f.x, f.y, f.z), y.push(b, 1 - _), x.push(u++)
            }
            p.push(x)
        }
        for (h = 0; h < n; h++)for (c = 0; c < e; c++) {
            var w = p[h][c + 1], M = p[h][c], E = p[h + 1][c], T = p[h + 1][c + 1];
            (0 !== h || o > 0) && m.push(w, M, T), (h !== n - 1 || l < Math.PI) && m.push(M, E, T)
        }
        this.setIndex(m), this.addAttribute("position", new _t(g, 3)), this.addAttribute("normal", new _t(v, 3)), this.addAttribute("uv", new _t(y, 2))
    }

    function Qe(t, e, n, i, r, o) {
        Tt.call(this), this.type = "RingGeometry", this.parameters = {
            innerRadius: t,
            outerRadius: e,
            thetaSegments: n,
            phiSegments: i,
            thetaStart: r,
            thetaLength: o
        }, this.fromBufferGeometry(new Ke(t, e, n, i, r, o))
    }

    function Ke(t, n, i, r, o, a) {
        St.call(this), this.type = "RingBufferGeometry", this.parameters = {
            innerRadius: t,
            outerRadius: n,
            thetaSegments: i,
            phiSegments: r,
            thetaStart: o,
            thetaLength: a
        }, t = t || 20, n = n || 50, o = void 0 !== o ? o : 0, a = void 0 !== a ? a : 2 * Math.PI, i = void 0 !== i ? Math.max(3, i) : 8, r = void 0 !== r ? Math.max(1, r) : 1;
        var c, h, l, u = [], p = [], d = [], f = [], m = t, g = (n - t) / r, v = new s, y = new e;
        for (h = 0; h <= r; h++) {
            for (l = 0; l <= i; l++)c = o + l / i * a, v.x = m * Math.cos(c), v.y = m * Math.sin(c), p.push(v.x, v.y, v.z), d.push(0, 0, 1), y.x = (v.x / n + 1) / 2, y.y = (v.y / n + 1) / 2, f.push(y.x, y.y);
            m += g
        }
        for (h = 0; h < r; h++) {
            var x = h * (i + 1);
            for (l = 0; l < i; l++) {
                c = l + x;
                var _ = c, b = c + i + 1, w = c + i + 2, M = c + 1;
                u.push(_, b, M), u.push(b, w, M)
            }
        }
        this.setIndex(u), this.addAttribute("position", new _t(p, 3)), this.addAttribute("normal", new _t(d, 3)), this.addAttribute("uv", new _t(f, 2))
    }

    function $e(t, e, n, i) {
        Tt.call(this), this.type = "LatheGeometry", this.parameters = {
            points: t,
            segments: e,
            phiStart: n,
            phiLength: i
        }, this.fromBufferGeometry(new tn(t, e, n, i)), this.mergeVertices()
    }

    function tn(t, n, i, r) {
        St.call(this), this.type = "LatheBufferGeometry", this.parameters = {
            points: t,
            segments: n,
            phiStart: i,
            phiLength: r
        }, n = Math.floor(n) || 12, i = i || 0, r = r || 2 * Math.PI, r = Yc.clamp(r, 0, 2 * Math.PI);
        var o, a, c, h = [], l = [], u = [], p = 1 / n, d = new s, f = new e;
        for (a = 0; a <= n; a++) {
            var m = i + a * p * r, g = Math.sin(m), v = Math.cos(m);
            for (c = 0; c <= t.length - 1; c++)d.x = t[c].x * g, d.y = t[c].y, d.z = t[c].x * v, l.push(d.x, d.y, d.z), f.x = a / n, f.y = c / (t.length - 1), u.push(f.x, f.y)
        }
        for (a = 0; a < n; a++)for (c = 0; c < t.length - 1; c++) {
            o = c + a * t.length;
            var y = o, x = o + t.length, _ = o + t.length + 1, b = o + 1;
            h.push(y, x, b), h.push(x, _, b)
        }
        if (this.setIndex(h), this.addAttribute("position", new _t(l, 3)), this.addAttribute("uv", new _t(u, 2)), this.computeVertexNormals(), r === 2 * Math.PI) {
            var w = this.attributes.normal.array, M = new s, E = new s, T = new s;
            for (o = n * t.length * 3, a = 0, c = 0; a < t.length; a++, c += 3)M.x = w[c + 0], M.y = w[c + 1], M.z = w[c + 2], E.x = w[o + c + 0], E.y = w[o + c + 1], E.z = w[o + c + 2], T.addVectors(M, E).normalize(), w[c + 0] = w[o + c + 0] = T.x, w[c + 1] = w[o + c + 1] = T.y, w[c + 2] = w[o + c + 2] = T.z
        }
    }

    function en(t, e) {
        Tt.call(this), this.type = "ShapeGeometry", "object" == typeof e && (console.warn("THREE.ShapeGeometry: Options parameter has been removed."), e = e.curveSegments), this.parameters = {
            shapes: t,
            curveSegments: e
        }, this.fromBufferGeometry(new nn(t, e)), this.mergeVertices()
    }

    function nn(t, e) {
        function n(t) {
            var n, s, h, l = r.length / 3, u = t.extractPoints(e), p = u.shape, d = u.holes;
            if (lh.isClockWise(p) === !1)for (p = p.reverse(), n = 0, s = d.length; n < s; n++)h = d[n], lh.isClockWise(h) === !0 && (d[n] = h.reverse());
            var f = lh.triangulateShape(p, d);
            for (n = 0, s = d.length; n < s; n++)h = d[n], p = p.concat(h);
            for (n = 0, s = p.length; n < s; n++) {
                var m = p[n];
                r.push(m.x, m.y, 0), o.push(0, 0, 1), a.push(m.x, m.y)
            }
            for (n = 0, s = f.length; n < s; n++) {
                var g = f[n], v = g[0] + l, y = g[1] + l, x = g[2] + l;
                i.push(v, y, x), c += 3
            }
        }

        St.call(this), this.type = "ShapeBufferGeometry", this.parameters = {shapes: t, curveSegments: e}, e = e || 12;
        var i = [], r = [], o = [], a = [], s = 0, c = 0;
        if (Array.isArray(t) === !1) n(t); else for (var h = 0; h < t.length; h++)n(t[h]), this.addGroup(s, c, h), s += c, c = 0;
        this.setIndex(i), this.addAttribute("position", new _t(r, 3)), this.addAttribute("normal", new _t(o, 3)), this.addAttribute("uv", new _t(a, 2))
    }

    function rn(t, e) {
        function n(t, e) {
            return t - e
        }

        St.call(this), this.type = "EdgesGeometry", this.parameters = {thresholdAngle: e}, e = void 0 !== e ? e : 1;
        var i, r, o = [], a = Math.cos(Yc.DEG2RAD * e), s = [0, 0], c = {}, h = ["a", "b", "c"];
        t.isBufferGeometry ? (r = new Tt, r.fromBufferGeometry(t)) : r = t.clone(), r.mergeVertices(), r.computeFaceNormals();
        for (var l = r.vertices, u = r.faces, p = 0, d = u.length; p < d; p++)for (var f = u[p], m = 0; m < 3; m++)s[0] = f[h[m]], s[1] = f[h[(m + 1) % 3]], s.sort(n), i = s.toString(), void 0 === c[i] ? c[i] = {
            index1: s[0],
            index2: s[1],
            face1: p,
            face2: void 0
        } : c[i].face2 = p;
        for (i in c) {
            var g = c[i];
            if (void 0 === g.face2 || u[g.face1].normal.dot(u[g.face2].normal) <= a) {
                var v = l[g.index1];
                o.push(v.x, v.y, v.z), v = l[g.index2], o.push(v.x, v.y, v.z)
            }
        }
        this.addAttribute("position", new _t(o, 3))
    }

    function on(t, e, n, i, r, o, a, s) {
        Tt.call(this), this.type = "CylinderGeometry", this.parameters = {
            radiusTop: t,
            radiusBottom: e,
            height: n,
            radialSegments: i,
            heightSegments: r,
            openEnded: o,
            thetaStart: a,
            thetaLength: s
        }, this.fromBufferGeometry(new an(t, e, n, i, r, o, a, s)), this.mergeVertices()
    }

    function an(t, n, i, r, o, a, c, h) {
        function l(i) {
            var o, a, l, v = new e, _ = new s, b = 0, w = i === !0 ? t : n, M = i === !0 ? 1 : -1;
            for (a = g, o = 1; o <= r; o++)d.push(0, y * M, 0), f.push(0, M, 0), m.push(.5, .5), g++;
            for (l = g, o = 0; o <= r; o++) {
                var E = o / r, T = E * h + c, S = Math.cos(T), A = Math.sin(T);
                _.x = w * A, _.y = y * M, _.z = w * S, d.push(_.x, _.y, _.z), f.push(0, M, 0), v.x = .5 * S + .5, v.y = .5 * A * M + .5, m.push(v.x, v.y), g++
            }
            for (o = 0; o < r; o++) {
                var L = a + o, R = l + o;
                i === !0 ? p.push(R, R + 1, L) : p.push(R + 1, R, L), b += 3
            }
            u.addGroup(x, b, i === !0 ? 1 : 2), x += b
        }

        St.call(this), this.type = "CylinderBufferGeometry", this.parameters = {
            radiusTop: t,
            radiusBottom: n,
            height: i,
            radialSegments: r,
            heightSegments: o,
            openEnded: a,
            thetaStart: c,
            thetaLength: h
        };
        var u = this;
        t = void 0 !== t ? t : 20, n = void 0 !== n ? n : 20, i = void 0 !== i ? i : 100, r = Math.floor(r) || 8, o = Math.floor(o) || 1, a = void 0 !== a && a, c = void 0 !== c ? c : 0, h = void 0 !== h ? h : 2 * Math.PI;
        var p = [], d = [], f = [], m = [], g = 0, v = [], y = i / 2, x = 0;
        !function () {
            var e, a, l = new s, _ = new s, b = 0, w = (n - t) / i;
            for (a = 0; a <= o; a++) {
                var M = [], E = a / o, T = E * (n - t) + t;
                for (e = 0; e <= r; e++) {
                    var S = e / r, A = S * h + c, L = Math.sin(A), R = Math.cos(A);
                    _.x = T * L, _.y = -E * i + y, _.z = T * R, d.push(_.x, _.y, _.z), l.set(L, w, R).normalize(), f.push(l.x, l.y, l.z), m.push(S, 1 - E), M.push(g++)
                }
                v.push(M)
            }
            for (e = 0; e < r; e++)for (a = 0; a < o; a++) {
                var P = v[a][e], C = v[a + 1][e], N = v[a + 1][e + 1], I = v[a][e + 1];
                p.push(P, C, I), p.push(C, N, I), b += 6
            }
            u.addGroup(x, b, 0), x += b
        }(), a === !1 && (t > 0 && l(!0), n > 0 && l(!1)), this.setIndex(p), this.addAttribute("position", new _t(d, 3)), this.addAttribute("normal", new _t(f, 3)), this.addAttribute("uv", new _t(m, 2))
    }

    function sn(t, e, n, i, r, o, a) {
        on.call(this, 0, t, e, n, i, r, o, a), this.type = "ConeGeometry", this.parameters = {
            radius: t,
            height: e,
            radialSegments: n,
            heightSegments: i,
            openEnded: r,
            thetaStart: o,
            thetaLength: a
        }
    }

    function cn(t, e, n, i, r, o, a) {
        an.call(this, 0, t, e, n, i, r, o, a), this.type = "ConeBufferGeometry", this.parameters = {
            radius: t,
            height: e,
            radialSegments: n,
            heightSegments: i,
            openEnded: r,
            thetaStart: o,
            thetaLength: a
        }
    }

    function hn(t, e, n, i) {
        Tt.call(this), this.type = "CircleGeometry", this.parameters = {
            radius: t,
            segments: e,
            thetaStart: n,
            thetaLength: i
        }, this.fromBufferGeometry(new ln(t, e, n, i))
    }

    function ln(t, n, i, r) {
        St.call(this), this.type = "CircleBufferGeometry", this.parameters = {
            radius: t,
            segments: n,
            thetaStart: i,
            thetaLength: r
        }, t = t || 50, n = void 0 !== n ? Math.max(3, n) : 8, i = void 0 !== i ? i : 0, r = void 0 !== r ? r : 2 * Math.PI;
        var o, a, c = [], h = [], l = [], u = [], p = new s, d = new e;
        for (h.push(0, 0, 0), l.push(0, 0, 1), u.push(.5, .5), a = 0, o = 3; a <= n; a++, o += 3) {
            var f = i + a / n * r;
            p.x = t * Math.cos(f), p.y = t * Math.sin(f), h.push(p.x, p.y, p.z), l.push(0, 0, 1), d.x = (h[o] / t + 1) / 2, d.y = (h[o + 1] / t + 1) / 2, u.push(d.x, d.y)
        }
        for (o = 1; o <= n; o++)c.push(o, o + 1, 0);
        this.setIndex(c), this.addAttribute("position", new _t(h, 3)), this.addAttribute("normal", new _t(l, 3)), this.addAttribute("uv", new _t(u, 2))
    }

    function un() {
        J.call(this, {
            uniforms: eh.merge([rh.lights, {opacity: {value: 1}}]),
            vertexShader: nh.shadow_vert,
            fragmentShader: nh.shadow_frag
        }), this.lights = !0, this.transparent = !0, Object.defineProperties(this, {
            opacity: {
                enumerable: !0,
                get: function () {
                    return this.uniforms.opacity.value
                },
                set: function (t) {
                    this.uniforms.opacity.value = t
                }
            }
        })
    }

    function pn(t) {
        J.call(this, t), this.type = "RawShaderMaterial"
    }

    function dn(t) {
        this.uuid = Yc.generateUUID(), this.type = "MultiMaterial", this.materials = Array.isArray(t) ? t : [], this.visible = !0
    }

    function fn(t) {
        Z.call(this), this.defines = {STANDARD: ""}, this.type = "MeshStandardMaterial", this.color = new j(16777215), this.roughness = .5, this.metalness = .5, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new j(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new e(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t)
    }

    function mn(t) {
        fn.call(this), this.defines = {PHYSICAL: ""}, this.type = "MeshPhysicalMaterial", this.reflectivity = .5, this.clearCoat = 0, this.clearCoatRoughness = 0, this.setValues(t)
    }

    function gn(t) {
        Z.call(this), this.type = "MeshPhongMaterial", this.color = new j(16777215), this.specular = new j(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new j(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new e(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = Ds, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t)
    }

    function vn(t) {
        gn.call(this), this.defines = {TOON: ""}, this.type = "MeshToonMaterial", this.gradientMap = null, this.setValues(t)
    }

    function yn(t) {
        Z.call(this, t), this.type = "MeshNormalMaterial", this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new e(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t)
    }

    function xn(t) {
        Z.call(this), this.type = "MeshLambertMaterial", this.color = new j(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new j(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = Ds, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t)
    }

    function _n(t) {
        Z.call(this), this.type = "LineDashedMaterial", this.color = new j(16777215), this.linewidth = 1, this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.lights = !1, this.setValues(t)
    }

    function bn(t, e, n) {
        var i = this, r = !1, o = 0, a = 0;
        this.onStart = void 0, this.onLoad = t, this.onProgress = e, this.onError = n, this.itemStart = function (t) {
            a++, r === !1 && void 0 !== i.onStart && i.onStart(t, o, a), r = !0
        }, this.itemEnd = function (t) {
            o++, void 0 !== i.onProgress && i.onProgress(t, o, a), o === a && (r = !1, void 0 !== i.onLoad && i.onLoad())
        }, this.itemError = function (t) {
            void 0 !== i.onError && i.onError(t)
        }
    }

    function wn(t) {
        this.manager = void 0 !== t ? t : fh
    }

    function Mn(t) {
        this.manager = void 0 !== t ? t : fh, this._parser = null
    }

    function En(t) {
        this.manager = void 0 !== t ? t : fh, this._parser = null
    }

    function Tn(t) {
        this.manager = void 0 !== t ? t : fh
    }

    function Sn(t) {
        this.manager = void 0 !== t ? t : fh
    }

    function An(t) {
        this.manager = void 0 !== t ? t : fh
    }

    function Ln(t, e) {
        st.call(this), this.type = "Light", this.color = new j(t), this.intensity = void 0 !== e ? e : 1, this.receiveShadow = void 0
    }

    function Rn(t, e, n) {
        Ln.call(this, t, n), this.type = "HemisphereLight", this.castShadow = void 0, this.position.copy(st.DefaultUp), this.updateMatrix(), this.groundColor = new j(e)
    }

    function Pn(t) {
        this.camera = t, this.bias = 0, this.radius = 1, this.mapSize = new e(512, 512), this.map = null, this.matrix = new c
    }

    function Cn() {
        Pn.call(this, new It(50, 1, .5, 500))
    }

    function Nn(t, e, n, i, r, o) {
        Ln.call(this, t, e), this.type = "SpotLight", this.position.copy(st.DefaultUp), this.updateMatrix(), this.target = new st, Object.defineProperty(this, "power", {
            get: function () {
                return this.intensity * Math.PI
            }, set: function (t) {
                this.intensity = t / Math.PI
            }
        }), this.distance = void 0 !== n ? n : 0, this.angle = void 0 !== i ? i : Math.PI / 3, this.penumbra = void 0 !== r ? r : 0, this.decay = void 0 !== o ? o : 1, this.shadow = new Cn
    }

    function In(t, e, n, i) {
        Ln.call(this, t, e), this.type = "PointLight", Object.defineProperty(this, "power", {
            get: function () {
                return 4 * this.intensity * Math.PI
            }, set: function (t) {
                this.intensity = t / (4 * Math.PI)
            }
        }), this.distance = void 0 !== n ? n : 0, this.decay = void 0 !== i ? i : 1, this.shadow = new Pn(new It(90, 1, .5, 500))
    }

    function Un() {
        Pn.call(this, new Ut(-5, 5, 5, -5, .5, 500))
    }

    function Dn(t, e) {
        Ln.call(this, t, e), this.type = "DirectionalLight", this.position.copy(st.DefaultUp), this.updateMatrix(), this.target = new st, this.shadow = new Un
    }

    function On(t, e) {
        Ln.call(this, t, e), this.type = "AmbientLight", this.castShadow = void 0
    }

    function zn(t, e, n, i) {
        this.parameterPositions = t, this._cachedIndex = 0, this.resultBuffer = void 0 !== i ? i : new e.constructor(n), this.sampleValues = e, this.valueSize = n
    }

    function Bn(t, e, n, i) {
        zn.call(this, t, e, n, i), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0
    }

    function Fn(t, e, n, i) {
        zn.call(this, t, e, n, i)
    }

    function Gn(t, e, n, i) {
        zn.call(this, t, e, n, i)
    }

    function kn(t, e, n, i) {
        if (void 0 === t)throw new Error("track name is undefined");
        if (void 0 === e || 0 === e.length)throw new Error("no keyframes in track named " + t);
        this.name = t, this.times = mh.convertArray(e, this.TimeBufferType),
            this.values = mh.convertArray(n, this.ValueBufferType), this.setInterpolation(i || this.DefaultInterpolation), this.validate(), this.optimize()
    }

    function Hn(t, e, n, i) {
        kn.call(this, t, e, n, i)
    }

    function Vn(t, e, n, i) {
        zn.call(this, t, e, n, i)
    }

    function jn(t, e, n, i) {
        kn.call(this, t, e, n, i)
    }

    function Wn(t, e, n, i) {
        kn.call(this, t, e, n, i)
    }

    function qn(t, e, n, i) {
        kn.call(this, t, e, n, i)
    }

    function Xn(t, e, n) {
        kn.call(this, t, e, n)
    }

    function Yn(t, e, n, i) {
        kn.call(this, t, e, n, i)
    }

    function Zn(t, e, n, i) {
        kn.apply(this, arguments)
    }

    function Jn(t, e, n) {
        this.name = t, this.tracks = n, this.duration = void 0 !== e ? e : -1, this.uuid = Yc.generateUUID(), this.duration < 0 && this.resetDuration(), this.optimize()
    }

    function Qn(t) {
        this.manager = void 0 !== t ? t : fh, this.textures = {}
    }

    function Kn(t) {
        this.manager = void 0 !== t ? t : fh
    }

    function $n() {
        this.onLoadStart = function () {
        }, this.onLoadProgress = function () {
        }, this.onLoadComplete = function () {
        }
    }

    function ti(t) {
        "boolean" == typeof t && (console.warn("THREE.JSONLoader: showStatus parameter has been removed from constructor."), t = void 0), this.manager = void 0 !== t ? t : fh, this.withCredentials = !1
    }

    function ei(t) {
        this.manager = void 0 !== t ? t : fh, this.texturePath = ""
    }

    function ni(t, e, n, i, r) {
        var o = .5 * (i - e), a = .5 * (r - n), s = t * t;
        return (2 * n - 2 * i + o + a) * (t * s) + (-3 * n + 3 * i - 2 * o - a) * s + o * t + n
    }

    function ii(t, e) {
        var n = 1 - t;
        return n * n * e
    }

    function ri(t, e) {
        return 2 * (1 - t) * t * e
    }

    function oi(t, e) {
        return t * t * e
    }

    function ai(t, e, n, i) {
        return ii(t, e) + ri(t, n) + oi(t, i)
    }

    function si(t, e) {
        var n = 1 - t;
        return n * n * n * e
    }

    function ci(t, e) {
        var n = 1 - t;
        return 3 * n * n * t * e
    }

    function hi(t, e) {
        return 3 * (1 - t) * t * t * e
    }

    function li(t, e) {
        return t * t * t * e
    }

    function ui(t, e, n, i, r) {
        return si(t, e) + ci(t, n) + hi(t, i) + li(t, r)
    }

    function pi() {
    }

    function di(t, e) {
        this.v1 = t, this.v2 = e
    }

    function fi() {
        this.curves = [], this.autoClose = !1
    }

    function mi(t, e, n, i, r, o, a, s) {
        this.aX = t, this.aY = e, this.xRadius = n, this.yRadius = i, this.aStartAngle = r, this.aEndAngle = o, this.aClockwise = a, this.aRotation = s || 0
    }

    function gi(t) {
        this.points = void 0 === t ? [] : t
    }

    function vi(t, e, n, i) {
        this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = i
    }

    function yi(t, e, n) {
        this.v0 = t, this.v1 = e, this.v2 = n
    }

    function xi(t) {
        fi.call(this), this.currentPoint = new e, t && this.fromPoints(t)
    }

    function _i() {
        xi.apply(this, arguments), this.holes = []
    }

    function bi() {
        this.subPaths = [], this.currentPath = null
    }

    function wi(t) {
        this.data = t
    }

    function Mi(t) {
        this.manager = void 0 !== t ? t : fh
    }

    function Ei(t) {
        this.manager = void 0 !== t ? t : fh
    }

    function Ti(t, e, n, i) {
        Ln.call(this, t, e), this.type = "RectAreaLight", this.position.set(0, 1, 0), this.updateMatrix(), this.width = void 0 !== n ? n : 10, this.height = void 0 !== i ? i : 10
    }

    function Si() {
        this.type = "StereoCamera", this.aspect = 1, this.eyeSep = .064, this.cameraL = new It, this.cameraL.layers.enable(1), this.cameraL.matrixAutoUpdate = !1, this.cameraR = new It, this.cameraR.layers.enable(2), this.cameraR.matrixAutoUpdate = !1
    }

    function Ai(t, e, n) {
        st.call(this), this.type = "CubeCamera";
        var i = new It(90, 1, t, e);
        i.up.set(0, -1, 0), i.lookAt(new s(1, 0, 0)), this.add(i);
        var r = new It(90, 1, t, e);
        r.up.set(0, -1, 0), r.lookAt(new s(-1, 0, 0)), this.add(r);
        var a = new It(90, 1, t, e);
        a.up.set(0, 0, 1), a.lookAt(new s(0, 1, 0)), this.add(a);
        var c = new It(90, 1, t, e);
        c.up.set(0, 0, -1), c.lookAt(new s(0, -1, 0)), this.add(c);
        var h = new It(90, 1, t, e);
        h.up.set(0, -1, 0), h.lookAt(new s(0, 0, 1)), this.add(h);
        var l = new It(90, 1, t, e);
        l.up.set(0, -1, 0), l.lookAt(new s(0, 0, -1)), this.add(l);
        var u = {format: yc, magFilter: nc, minFilter: nc};
        this.renderTarget = new o(n, n, u), this.updateCubeMap = function (t, e) {
            null === this.parent && this.updateMatrixWorld();
            var n = this.renderTarget, o = n.texture.generateMipmaps;
            n.texture.generateMipmaps = !1, n.activeCubeFace = 0, t.render(e, i, n), n.activeCubeFace = 1, t.render(e, r, n), n.activeCubeFace = 2, t.render(e, a, n), n.activeCubeFace = 3, t.render(e, c, n), n.activeCubeFace = 4, t.render(e, h, n), n.texture.generateMipmaps = o, n.activeCubeFace = 5, t.render(e, l, n), t.setRenderTarget(null)
        }
    }

    function Li() {
        st.call(this), this.type = "AudioListener", this.context = xh.getContext(), this.gain = this.context.createGain(), this.gain.connect(this.context.destination), this.filter = null
    }

    function Ri(t) {
        st.call(this), this.type = "Audio", this.context = t.context, this.gain = this.context.createGain(), this.gain.connect(t.getInput()), this.autoplay = !1, this.buffer = null, this.loop = !1, this.startTime = 0, this.playbackRate = 1, this.isPlaying = !1, this.hasPlaybackControl = !0, this.sourceType = "empty", this.filters = []
    }

    function Pi(t) {
        Ri.call(this, t), this.panner = this.context.createPanner(), this.panner.connect(this.gain)
    }

    function Ci(t, e) {
        this.analyser = t.context.createAnalyser(), this.analyser.fftSize = void 0 !== e ? e : 2048, this.data = new Uint8Array(this.analyser.frequencyBinCount), t.getOutput().connect(this.analyser)
    }

    function Ni(t, e, n) {
        this.binding = t, this.valueSize = n;
        var i, r = Float64Array;
        switch (e) {
            case"quaternion":
                i = this._slerp;
                break;
            case"string":
            case"bool":
                r = Array, i = this._select;
                break;
            default:
                i = this._lerp
        }
        this.buffer = new r(4 * n), this._mixBufferRegion = i, this.cumulativeWeight = 0, this.useCount = 0, this.referenceCount = 0
    }

    function Ii(t, e, n) {
        this.path = e, this.parsedPath = n || Ii.parseTrackName(e), this.node = Ii.findNode(t, this.parsedPath.nodeName) || t, this.rootNode = t
    }

    function Ui(t) {
        this.uuid = Yc.generateUUID(), this._objects = Array.prototype.slice.call(arguments), this.nCachedObjects_ = 0;
        var e = {};
        this._indicesByUUID = e;
        for (var n = 0, i = arguments.length; n !== i; ++n)e[arguments[n].uuid] = n;
        this._paths = [], this._parsedPaths = [], this._bindings = [], this._bindingsIndicesByPath = {};
        var r = this;
        this.stats = {
            objects: {
                get total() {
                    return r._objects.length
                }, get inUse() {
                    return this.total - r.nCachedObjects_
                }
            }, get bindingsPerObject() {
                return r._bindings.length
            }
        }
    }

    function Di(t, e, n) {
        this._mixer = t, this._clip = e, this._localRoot = n || null;
        for (var i = e.tracks, r = i.length, o = new Array(r), a = {
            endingStart: Dc,
            endingEnd: Dc
        }, s = 0; s !== r; ++s) {
            var c = i[s].createInterpolant(null);
            o[s] = c, c.settings = a
        }
        this._interpolantSettings = a, this._interpolants = o, this._propertyBindings = new Array(r), this._cacheIndex = null, this._byClipCacheIndex = null, this._timeScaleInterpolant = null, this._weightInterpolant = null, this.loop = Uc, this._loopCount = -1, this._startTime = null, this.time = 0, this.timeScale = 1, this._effectiveTimeScale = 1, this.weight = 1, this._effectiveWeight = 1, this.repetitions = 1 / 0, this.paused = !1, this.enabled = !0, this.clampWhenFinished = !1, this.zeroSlopeAtStart = !0, this.zeroSlopeAtEnd = !0
    }

    function Oi(t) {
        this._root = t, this._initMemoryManager(), this._accuIndex = 0, this.time = 0, this.timeScale = 1
    }

    function zi(t) {
        "string" == typeof t && (console.warn("THREE.Uniform: Type parameter is no longer needed."), t = arguments[1]), this.value = t
    }

    function Bi() {
        St.call(this), this.type = "InstancedBufferGeometry", this.maxInstancedCount = void 0
    }

    function Fi(t, e, n, i) {
        this.uuid = Yc.generateUUID(), this.data = t, this.itemSize = e, this.offset = n, this.normalized = i === !0
    }

    function Gi(t, e) {
        this.uuid = Yc.generateUUID(), this.array = t, this.stride = e, this.count = void 0 !== t ? t.length / e : 0, this.dynamic = !1, this.updateRange = {
            offset: 0,
            count: -1
        }, this.onUploadCallback = function () {
        }, this.version = 0
    }

    function ki(t, e, n) {
        Gi.call(this, t, e), this.meshPerAttribute = n || 1
    }

    function Hi(t, e, n) {
        pt.call(this, t, e), this.meshPerAttribute = n || 1
    }

    function Vi(t, e, n, i) {
        this.ray = new rt(t, e), this.near = n || 0, this.far = i || 1 / 0, this.params = {
            Mesh: {},
            Line: {},
            LOD: {},
            Points: {threshold: 1},
            Sprite: {}
        }, Object.defineProperties(this.params, {
            PointCloud: {
                get: function () {
                    return console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points."), this.Points
                }
            }
        })
    }

    function ji(t, e) {
        return t.distance - e.distance
    }

    function Wi(t, e, n, i) {
        if (t.visible !== !1 && (t.raycast(e, n), i === !0))for (var r = t.children, o = 0, a = r.length; o < a; o++)Wi(r[o], e, n, !0)
    }

    function qi(t) {
        this.autoStart = void 0 === t || t, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1
    }

    function Xi(t, e, n) {
        return this.radius = void 0 !== t ? t : 1, this.phi = void 0 !== e ? e : 0, this.theta = void 0 !== n ? n : 0, this
    }

    function Yi(t, e, n) {
        return this.radius = void 0 !== t ? t : 1, this.theta = void 0 !== e ? e : 0, this.y = void 0 !== n ? n : 0, this
    }

    function Zi(t, e) {
        At.call(this, t, e), this.animationsMap = {}, this.animationsList = [];
        var n = this.geometry.morphTargets.length, i = n - 1, r = n / 1;
        this.createAnimation("__default", 0, i, r), this.setAnimationWeight("__default", 1)
    }

    function Ji(t) {
        st.call(this), this.material = t, this.render = function (t) {
        }
    }

    function Qi(t, e, n, i) {
        this.object = t, this.size = void 0 !== e ? e : 1;
        var r = void 0 !== n ? n : 16711680, o = void 0 !== i ? i : 1, a = 0, s = this.object.geometry;
        s && s.isGeometry ? a = 3 * s.faces.length : s && s.isBufferGeometry && (a = s.attributes.normal.count);
        var c = new St, h = new _t(2 * a * 3, 3);
        c.addAttribute("position", h), _e.call(this, c, new ye({
            color: r,
            linewidth: o
        })), this.matrixAutoUpdate = !1, this.update()
    }

    function Ki(t) {
        st.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1;
        for (var e = new St, n = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1], i = 0, r = 1; i < 32; i++, r++) {
            var o = i / 32 * Math.PI * 2, a = r / 32 * Math.PI * 2;
            n.push(Math.cos(o), Math.sin(o), 1, Math.cos(a), Math.sin(a), 1)
        }
        e.addAttribute("position", new _t(n, 3));
        var s = new ye({fog: !1});
        this.cone = new _e(e, s), this.add(this.cone), this.update()
    }

    function $i(t) {
        this.bones = this.getBoneList(t);
        for (var e = new St, n = [], i = [], r = new j(0, 0, 1), o = new j(0, 1, 0), a = 0; a < this.bones.length; a++) {
            var s = this.bones[a];
            s.parent && s.parent.isBone && (n.push(0, 0, 0), n.push(0, 0, 0), i.push(r.r, r.g, r.b), i.push(o.r, o.g, o.b))
        }
        e.addAttribute("position", new _t(n, 3)), e.addAttribute("color", new _t(i, 3));
        var c = new ye({vertexColors: rs, depthTest: !1, depthWrite: !1, transparent: !0});
        _e.call(this, e, c), this.root = t, this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, this.update()
    }

    function tr(t, e) {
        this.light = t, this.light.updateMatrixWorld();
        var n = new Je(e, 4, 2), i = new ut({wireframe: !0, fog: !1});
        i.color.copy(this.light.color).multiplyScalar(this.light.intensity), At.call(this, n, i), this.matrix = this.light.matrixWorld, this.matrixAutoUpdate = !1
    }

    function er(t) {
        st.call(this), this.light = t, this.light.updateMatrixWorld();
        var e = new ut({color: t.color, fog: !1}), n = new ut({color: t.color, fog: !1, wireframe: !0}), i = new St;
        i.addAttribute("position", new pt(new Float32Array(18), 3)), this.add(new At(i, e)), this.add(new At(i, n)), this.update()
    }

    function nr(t, e) {
        st.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1;
        var n = new Oe(e);
        n.rotateY(.5 * Math.PI);
        var i = new ut({vertexColors: rs, wireframe: !0}), r = n.getAttribute("position"),
            o = new Float32Array(3 * r.count);
        n.addAttribute("color", new pt(o, 3)), this.add(new At(n, i)), this.update()
    }

    function ir(t, e, n, i) {
        t = t || 10, e = e || 10, n = new j(void 0 !== n ? n : 4473924), i = new j(void 0 !== i ? i : 8947848);
        for (var r = e / 2, o = t / e, a = t / 2, s = [], c = [], h = 0, l = 0, u = -a; h <= e; h++, u += o) {
            s.push(-a, 0, u, a, 0, u), s.push(u, 0, -a, u, 0, a);
            var p = h === r ? n : i;
            p.toArray(c, l), l += 3, p.toArray(c, l), l += 3, p.toArray(c, l), l += 3, p.toArray(c, l), l += 3
        }
        var d = new St;
        d.addAttribute("position", new _t(s, 3)), d.addAttribute("color", new _t(c, 3));
        var f = new ye({vertexColors: rs});
        _e.call(this, d, f)
    }

    function rr(t, e, n, i, r, o) {
        t = t || 10, e = e || 16, n = n || 8, i = i || 64, r = new j(void 0 !== r ? r : 4473924), o = new j(void 0 !== o ? o : 8947848);
        var a, s, c, h, l, u, p, d = [], f = [];
        for (h = 0; h <= e; h++)c = h / e * (2 * Math.PI), a = Math.sin(c) * t, s = Math.cos(c) * t, d.push(0, 0, 0), d.push(a, 0, s), p = 1 & h ? r : o, f.push(p.r, p.g, p.b), f.push(p.r, p.g, p.b);
        for (h = 0; h <= n; h++)for (p = 1 & h ? r : o, u = t - t / n * h, l = 0; l < i; l++)c = l / i * (2 * Math.PI), a = Math.sin(c) * u, s = Math.cos(c) * u, d.push(a, 0, s), f.push(p.r, p.g, p.b), c = (l + 1) / i * (2 * Math.PI), a = Math.sin(c) * u, s = Math.cos(c) * u, d.push(a, 0, s), f.push(p.r, p.g, p.b);
        var m = new St;
        m.addAttribute("position", new _t(d, 3)), m.addAttribute("color", new _t(f, 3));
        var g = new ye({vertexColors: rs});
        _e.call(this, m, g)
    }

    function or(t, e, n, i) {
        this.object = t, this.size = void 0 !== e ? e : 1;
        var r = void 0 !== n ? n : 16776960, o = void 0 !== i ? i : 1, a = 0, s = this.object.geometry;
        s && s.isGeometry ? a = s.faces.length : console.warn("THREE.FaceNormalsHelper: only THREE.Geometry is supported. Use THREE.VertexNormalsHelper, instead.");
        var c = new St, h = new _t(2 * a * 3, 3);
        c.addAttribute("position", h), _e.call(this, c, new ye({
            color: r,
            linewidth: o
        })), this.matrixAutoUpdate = !1, this.update()
    }

    function ar(t, e) {
        st.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, void 0 === e && (e = 1);
        var n = new St;
        n.addAttribute("position", new _t([-e, e, 0, e, e, 0, e, -e, 0, -e, -e, 0, -e, e, 0], 3));
        var i = new ye({fog: !1});
        this.add(new xe(n, i)), n = new St, n.addAttribute("position", new _t([0, 0, 0, 0, 0, 1], 3)), this.add(new xe(n, i)), this.update()
    }

    function sr(t) {
        function e(t, e, i) {
            n(t, i), n(e, i)
        }

        function n(t, e) {
            o.push(0, 0, 0), a.push(e.r, e.g, e.b), void 0 === s[t] && (s[t] = []), s[t].push(o.length / 3 - 1)
        }

        var i = new St, r = new ye({color: 16777215, vertexColors: is}), o = [], a = [], s = {}, c = new j(16755200),
            h = new j(16711680), l = new j(43775), u = new j(16777215), p = new j(3355443);
        e("n1", "n2", c), e("n2", "n4", c), e("n4", "n3", c), e("n3", "n1", c), e("f1", "f2", c), e("f2", "f4", c), e("f4", "f3", c), e("f3", "f1", c), e("n1", "f1", c), e("n2", "f2", c), e("n3", "f3", c), e("n4", "f4", c), e("p", "n1", h), e("p", "n2", h), e("p", "n3", h), e("p", "n4", h), e("u1", "u2", l), e("u2", "u3", l), e("u3", "u1", l), e("c", "t", u), e("p", "c", p), e("cn1", "cn2", p), e("cn3", "cn4", p), e("cf1", "cf2", p), e("cf3", "cf4", p), i.addAttribute("position", new _t(o, 3)), i.addAttribute("color", new _t(a, 3)), _e.call(this, i, r), this.camera = t, this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, this.pointMap = s, this.update()
    }

    function cr(t, e) {
        void 0 === e && (e = 16776960);
        var n = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]),
            i = new Float32Array(24), r = new St;
        r.setIndex(new pt(n, 1)), r.addAttribute("position", new pt(i, 3)), _e.call(this, r, new ye({color: e})), void 0 !== t && this.update(t)
    }

    function hr(t, e, n, i, r, o) {
        st.call(this), void 0 === i && (i = 16776960), void 0 === n && (n = 1), void 0 === r && (r = .2 * n), void 0 === o && (o = .2 * r), void 0 === _h && (_h = new St, _h.addAttribute("position", new _t([0, 0, 0, 0, 1, 0], 3)), bh = new an(0, .5, 1, 5, 1), bh.translate(0, -.5, 0)), this.position.copy(e), this.line = new xe(_h, new ye({color: i})), this.line.matrixAutoUpdate = !1, this.add(this.line), this.cone = new At(bh, new ut({color: i})), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(t), this.setLength(n, r, o)
    }

    function lr(t) {
        t = t || 1;
        var e = [0, 0, 0, t, 0, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 0, t],
            n = [1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1], i = new St;
        i.addAttribute("position", new _t(e, 3)), i.addAttribute("color", new _t(n, 3));
        var r = new ye({vertexColors: rs});
        _e.call(this, i, r)
    }

    function ur() {
        function t(t, o, a, s) {
            e = t, n = a, i = -3 * t + 3 * o - 2 * a - s, r = 2 * t - 2 * o + a + s
        }

        var e = 0, n = 0, i = 0, r = 0;
        return {
            initCatmullRom: function (e, n, i, r, o) {
                t(n, i, o * (i - e), o * (r - n))
            }, initNonuniformCatmullRom: function (e, n, i, r, o, a, s) {
                var c = (n - e) / o - (i - e) / (o + a) + (i - n) / a,
                    h = (i - n) / a - (r - n) / (a + s) + (r - i) / s;
                c *= a, h *= a, t(n, i, c, h)
            }, calc: function (t) {
                var o = t * t;
                return e + n * t + i * o + r * (o * t)
            }
        }
    }

    function pr(t) {
        this.points = t || [], this.closed = !1
    }

    function dr(t, e, n, i) {
        this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = i
    }

    function fr(t, e, n) {
        this.v0 = t, this.v1 = e, this.v2 = n
    }

    function mr(t, e) {
        this.v1 = t, this.v2 = e
    }

    function gr(t, e, n, i, r, o) {
        mi.call(this, t, e, n, n, i, r, o)
    }

    function vr(t, e, n, i, r, o, a) {
        return console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead."), new lt(t, e, n, r, o, a)
    }

    function yr(t) {
        return console.warn("THREE.MeshFaceMaterial has been renamed to THREE.MultiMaterial."), new dn(t)
    }

    function xr(t, e) {
        return console.warn("THREE.PointCloud has been renamed to THREE.Points."), new we(t, e)
    }

    function _r(t) {
        return console.warn("THREE.Particle has been renamed to THREE.Sprite."), new de(t)
    }

    function br(t, e) {
        return console.warn("THREE.ParticleSystem has been renamed to THREE.Points."), new we(t, e)
    }

    function wr(t) {
        return console.warn("THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial."), new be(t)
    }

    function Mr(t) {
        return console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial."), new be(t)
    }

    function Er(t) {
        return console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial."), new be(t)
    }

    function Tr(t, e, n) {
        return console.warn("THREE.Vertex has been removed. Use THREE.Vector3 instead."), new s(t, e, n)
    }

    function Sr(t, e) {
        return console.warn("THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setDynamic( true ) instead."), new pt(t, e).setDynamic(!0)
    }

    function Ar(t, e) {
        return console.warn("THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead."), new dt(t, e)
    }

    function Lr(t, e) {
        return console.warn("THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead."), new ft(t, e)
    }

    function Rr(t, e) {
        return console.warn("THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead."), new mt(t, e)
    }

    function Pr(t, e) {
        return console.warn("THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead."), new gt(t, e)
    }

    function Cr(t, e) {
        return console.warn("THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead."), new vt(t, e)
    }

    function Nr(t, e) {
        return console.warn("THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead."), new yt(t, e)
    }

    function Ir(t, e) {
        return console.warn("THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead."), new xt(t, e)
    }

    function Ur(t, e) {
        return console.warn("THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead."), new _t(t, e)
    }

    function Dr(t, e) {
        return console.warn("THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead."), new bt(t, e)
    }

    function Or(t) {
        console.warn("THREE.ClosedSplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead."), pr.call(this, t), this.type = "catmullrom", this.closed = !0
    }

    function zr(t) {
        console.warn("THREE.SplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead."), pr.call(this, t), this.type = "catmullrom"
    }

    function Br(t) {
        console.warn("THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead."), pr.call(this, t), this.type = "catmullrom"
    }

    function Fr(t, e) {
        return console.warn("THREE.BoundingBoxHelper has been deprecated. Creating a THREE.BoxHelper instead."), new cr(t, e)
    }

    function Gr(t, e) {
        return console.warn("THREE.EdgesHelper has been removed. Use THREE.EdgesGeometry instead."), new _e(new rn(t.geometry), new ye({color: void 0 !== e ? e : 16777215}))
    }

    function kr(t, e) {
        return console.warn("THREE.WireframeHelper has been removed. Use THREE.WireframeGeometry instead."), new _e(new Le(t.geometry), new ye({color: void 0 !== e ? e : 16777215}))
    }

    function Hr(t) {
        return console.warn("THREE.XHRLoader has been renamed to THREE.FileLoader."), new wn(t)
    }

    function Vr(t) {
        return console.warn("THREE.BinaryTextureLoader has been renamed to THREE.DataTextureLoader."), new En(t)
    }

    function jr() {
        console.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js."), this.projectVector = function (t, e) {
            console.warn("THREE.Projector: .projectVector() is now vector.project()."), t.project(e)
        }, this.unprojectVector = function (t, e) {
            console.warn("THREE.Projector: .unprojectVector() is now vector.unproject()."), t.unproject(e)
        }, this.pickingRay = function () {
            console.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")
        }
    }

    function Wr() {
        console.error("THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js"), this.domElement = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"), this.clear = function () {
        }, this.render = function () {
        }, this.setClearColor = function () {
        }, this.setSize = function () {
        }
    }

    function qr(t, e, n) {
        if (isNaN(e))return t;
        var i, r, o, a, s, c, h = t._root, l = {data: n}, u = t._x0, p = t._x1;
        if (!h)return t._root = l, t;
        for (; h.length;)if ((a = e >= (r = (u + p) / 2)) ? u = r : p = r, i = h, !(h = h[s = +a]))return i[s] = l, t;
        if (o = +t._x.call(null, h.data), e === o)return l.next = h, i ? i[s] = l : t._root = l, t;
        do i = i ? i[s] = new Array(2) : t._root = new Array(2), (a = e >= (r = (u + p) / 2)) ? u = r : p = r; while ((s = +a) == (c = +(o >= r)))
        return i[c] = h, i[s] = l, t
    }

    function Xr(t) {
        var e, n, i = t.length, r = new Array(i), o = 1 / 0, a = -(1 / 0);
        for (e = 0; e < i; ++e)isNaN(n = +this._x.call(null, t[e])) || (r[e] = n, n < o && (o = n), n > a && (a = n));
        for (a < o && (o = this._x0, a = this._x1), this.cover(o).cover(a), e = 0; e < i; ++e)qr(this, r[e], t[e]);
        return this
    }

    function Yr(t) {
        for (var e = 0, n = t.length; e < n; ++e)this.remove(t[e]);
        return this
    }

    function Zr(t) {
        return t[0]
    }

    function Jr(t, e) {
        var n = new Qr(null == e ? Zr : e, NaN, NaN);
        return null == t ? n : n.addAll(t)
    }

    function Qr(t, e, n) {
        this._x = t, this._x0 = e, this._x1 = n, this._root = void 0
    }

    function Kr(t) {
        for (var e = {data: t.data}, n = e; t = t.next;)n = n.next = {data: t.data};
        return e
    }

    function $r(t, e, n, i) {
        if (isNaN(e) || isNaN(n))return t;
        var r, o, a, s, c, h, l, u, p, d = t._root, f = {data: i}, m = t._x0, g = t._y0, v = t._x1, y = t._y1;
        if (!d)return t._root = f, t;
        for (; d.length;)if ((h = e >= (o = (m + v) / 2)) ? m = o : v = o, (l = n >= (a = (g + y) / 2)) ? g = a : y = a, r = d, !(d = d[u = l << 1 | h]))return r[u] = f, t;
        if (s = +t._x.call(null, d.data), c = +t._y.call(null, d.data), e === s && n === c)return f.next = d, r ? r[u] = f : t._root = f, t;
        do r = r ? r[u] = new Array(4) : t._root = new Array(4), (h = e >= (o = (m + v) / 2)) ? m = o : v = o, (l = n >= (a = (g + y) / 2)) ? g = a : y = a; while ((u = l << 1 | h) == (p = (c >= a) << 1 | s >= o))
        return r[p] = d, r[u] = f, t
    }

    function to(t) {
        var e, n, i, r, o = t.length, a = new Array(o), s = new Array(o), c = 1 / 0, h = 1 / 0, l = -(1 / 0),
            u = -(1 / 0);
        for (n = 0; n < o; ++n)isNaN(i = +this._x.call(null, e = t[n])) || isNaN(r = +this._y.call(null, e)) || (a[n] = i, s[n] = r, i < c && (c = i), i > l && (l = i), r < h && (h = r), r > u && (u = r));
        for (l < c && (c = this._x0, l = this._x1), u < h && (h = this._y0, u = this._y1), this.cover(c, h).cover(l, u), n = 0; n < o; ++n)$r(this, a[n], s[n], t[n]);
        return this
    }

    function eo(t) {
        for (var e = 0, n = t.length; e < n; ++e)this.remove(t[e]);
        return this
    }

    function no(t) {
        return t[0]
    }

    function io(t) {
        return t[1]
    }

    function ro(t, e, n) {
        var i = new oo(null == e ? no : e, null == n ? io : n, NaN, NaN, NaN, NaN);
        return null == t ? i : i.addAll(t)
    }

    function oo(t, e, n, i, r, o) {
        this._x = t, this._y = e, this._x0 = n, this._y0 = i, this._x1 = r, this._y1 = o, this._root = void 0
    }

    function ao(t) {
        for (var e = {data: t.data}, n = e; t = t.next;)n = n.next = {data: t.data};
        return e
    }

    function so(t, e, n, i, r) {
        if (isNaN(e) || isNaN(n) || isNaN(i))return t;
        var o, a, s, c, h, l, u, p, d, f, m, g, v = t._root, y = {data: r}, x = t._x0, _ = t._y0, b = t._z0, w = t._x1,
            M = t._y1, E = t._z1;
        if (!v)return t._root = y, t;
        for (; v.length;)if ((p = e >= (a = (x + w) / 2)) ? x = a : w = a, (d = n >= (s = (_ + M) / 2)) ? _ = s : M = s, (f = i >= (c = (b + E) / 2)) ? b = c : E = c, o = v, !(v = v[m = f << 2 | d << 1 | p]))return o[m] = y, t;
        if (h = +t._x.call(null, v.data), l = +t._y.call(null, v.data), u = +t._z.call(null, v.data), e === h && n === l && i === u)return y.next = v, o ? o[m] = y : t._root = y, t;
        do o = o ? o[m] = new Array(8) : t._root = new Array(8), (p = e >= (a = (x + w) / 2)) ? x = a : w = a, (d = n >= (s = (_ + M) / 2)) ? _ = s : M = s, (f = i >= (c = (b + E) / 2)) ? b = c : E = c; while ((m = f << 2 | d << 1 | p) == (g = (u >= c) << 2 | (l >= s) << 1 | h >= a))
        return o[g] = v, o[m] = y, t
    }

    function co(t) {
        var e, n, i, r, o, a = t.length, s = new Array(a), c = new Array(a), h = new Array(a), l = 1 / 0, u = 1 / 0,
            p = 1 / 0, d = -(1 / 0), f = -(1 / 0), m = -(1 / 0);
        for (n = 0; n < a; ++n)isNaN(i = +this._x.call(null, e = t[n])) || isNaN(r = +this._y.call(null, e)) || isNaN(o = +this._z.call(null, e)) || (s[n] = i, c[n] = r, h[n] = o, i < l && (l = i), i > d && (d = i), r < u && (u = r), r > f && (f = r), o < p && (p = o), o > m && (m = o));
        for (d < l && (l = this._x0, d = this._x1), f < u && (u = this._y0, f = this._y1), m < p && (p = this._z0, m = this._z1), this.cover(l, u, p).cover(d, f, m), n = 0; n < a; ++n)so(this, s[n], c[n], h[n], t[n]);
        return this
    }

    function ho(t) {
        for (var e = 0, n = t.length; e < n; ++e)this.remove(t[e]);
        return this
    }

    function lo(t) {
        return t[0]
    }

    function uo(t) {
        return t[1]
    }

    function po(t) {
        return t[2]
    }

    function fo(t, e, n, i) {
        var r = new mo(null == e ? lo : e, null == n ? uo : n, null == i ? po : i, NaN, NaN, NaN, NaN, NaN, NaN);
        return null == t ? r : r.addAll(t)
    }

    function mo(t, e, n, i, r, o, a, s, c) {
        this._x = t, this._y = e, this._z = n, this._x0 = i, this._y0 = r, this._z0 = o, this._x1 = a, this._y1 = s, this._z1 = c, this._root = void 0
    }

    function go(t) {
        for (var e = {data: t.data}, n = e; t = t.next;)n = n.next = {data: t.data};
        return e
    }

    function vo() {
    }

    function yo(t, e) {
        var n = new vo;
        if (t instanceof vo) t.each(function (t, e) {
            n.set(e, t)
        }); else if (Array.isArray(t)) {
            var i, r = -1, o = t.length;
            if (null == e)for (; ++r < o;)n.set(r, t[r]); else for (; ++r < o;)n.set(e(i = t[r], r, t), i)
        } else if (t)for (var a in t)n.set(a, t[a]);
        return n
    }

    function xo() {
    }

    function _o(t, e) {
        var n = new xo;
        if (t instanceof xo) t.each(function (t) {
            n.add(t)
        }); else if (t) {
            var i = -1, r = t.length;
            if (null == e)for (; ++i < r;)n.add(t[i]); else for (; ++i < r;)n.add(e(t[i], i, t))
        }
        return n
    }

    function bo(t) {
        return t.index
    }

    function wo(t, e) {
        var n = t.get(e);
        if (!n)throw new Error("missing: " + e);
        return n
    }

    function Mo() {
        for (var t, e = 0, n = arguments.length, i = {}; e < n; ++e) {
            if (!(t = arguments[e] + "") || t in i)throw new Error("illegal type: " + t);
            i[t] = []
        }
        return new Eo(i)
    }

    function Eo(t) {
        this._ = t
    }

    function To(t, e) {
        return t.trim().split(/^|\s+/).map(function (t) {
            var n = "", i = t.indexOf(".");
            if (i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), t && !e.hasOwnProperty(t))throw new Error("unknown type: " + t);
            return {type: t, name: n}
        })
    }

    function So(t, e) {
        for (var n, i = 0, r = t.length; i < r; ++i)if ((n = t[i]).name === e)return n.value
    }

    function Ao(t, e, n) {
        for (var i = 0, r = t.length; i < r; ++i)if (t[i].name === e) {
            t[i] = Ml, t = t.slice(0, i).concat(t.slice(i + 1));
            break
        }
        return null != n && t.push({name: e, value: n}), t
    }

    function Lo() {
        return Cl || (Ul(Ro), Cl = Il.now() + Nl)
    }

    function Ro() {
        Cl = 0
    }

    function Po() {
        this._call = this._time = this._next = null
    }

    function Co(t, e, n) {
        var i = new Po;
        return i.restart(t, e, n), i
    }

    function No() {
        Lo(), ++Sl;
        for (var t, e = El; e;)(t = Cl - e._time) >= 0 && e._call.call(null, t), e = e._next;
        --Sl
    }

    function Io() {
        Cl = (Pl = Il.now()) + Nl, Sl = Al = 0;
        try {
            No()
        } finally {
            Sl = 0, Do(), Cl = 0
        }
    }

    function Uo() {
        var t = Il.now(), e = t - Pl;
        e > Rl && (Nl -= e, Pl = t)
    }

    function Do() {
        for (var t, e, n = El, i = 1 / 0; n;)n._call ? (i > n._time && (i = n._time), t = n, n = n._next) : (e = n._next, n._next = null, n = t ? t._next = e : El = e);
        Tl = t, Oo(i)
    }

    function Oo(t) {
        if (!Sl) {
            Al && (Al = clearTimeout(Al));
            var e = t - Cl;
            e > 24 ? (t < 1 / 0 && (Al = setTimeout(Io, e)), Ll && (Ll = clearInterval(Ll))) : (Ll || (Pl = Cl, Ll = setInterval(Uo, Rl)), Sl = 1, Ul(Io))
        }
    }

    function zo(t) {
        return t.x
    }

    function Bo(t) {
        return t.y
    }

    function Fo(t) {
        return t.z
    }

    function Go(t) {
        var e = Object.create(null);
        return {
            on: function (n, i, r) {
                if ("function" != typeof i)throw new Error("callback is expected to be a function");
                var o = e[n];
                return o || (o = e[n] = []), o.push({callback: i, ctx: r}), t
            }, off: function (n, i) {
                if (void 0 === n)return e = Object.create(null), t;
                if (e[n]) {
                    if ("function" != typeof i) delete e[n]; else for (var r = e[n], o = 0; o < r.length; ++o)r[o].callback === i && r.splice(o, 1)
                }
                return t
            }, fire: function (n) {
                var i = e[n];
                if (!i)return t;
                var r;
                arguments.length > 1 && (r = Array.prototype.splice.call(arguments, 1));
                for (var o = 0; o < i.length; ++o) {
                    var a = i[o];
                    a.callback.apply(a.ctx, r)
                }
                return t
            }
        }
    }

    function ko(t) {
        if (!t)throw new Error("Eventify cannot use falsy object as events subject");
        for (var e = ["on", "fire", "off"], n = 0; n < e.length; ++n)if (t.hasOwnProperty(e[n]))throw new Error("Subject cannot be eventified, since it already has property '" + e[n] + "'")
    }

    function Ho(t) {
        function e(t, e) {
            R.push({link: t, changeType: e})
        }

        function n(t, e) {
            R.push({node: t, changeType: e})
        }

        function i(t, e) {
            if (void 0 === t)throw new Error("Invalid node identifier");
            N();
            var n = r(t);
            return n ? C(n, "update") : (n = new jo(t), T++, C(n, "add")), n.data = e, w[t] = n, I(), n
        }

        function r(t) {
            return w[t]
        }

        function o(t) {
            var e = r(t);
            if (!e)return !1;
            if (N(), e.links)for (; e.links.length;) {
                var n = e.links[0];
                l(n)
            }
            return delete w[t], T--, C(e, "remove"), I(), !0
        }

        function a(t, e, n) {
            N();
            var o = r(t) || i(t), a = r(e) || i(e), s = L(t, e, n);
            return M.push(s), Wo(o, s), t !== e && Wo(a, s), P(s, "add"), I(), s
        }

        function s(t, e, n) {
            return new qo(t, e, n, Yo(t, e))
        }

        function c(t, e, n) {
            var i = Yo(t, e), r = E.hasOwnProperty(i);
            if (r || u(t, e)) {
                r || (E[i] = 0);
                var o = "@" + ++E[i];
                i = Yo(t + o, e + o)
            }
            return new qo(t, e, n, i)
        }

        function h(t) {
            var e = r(t);
            return e ? e.links : null
        }

        function l(t) {
            if (!t)return !1;
            var e = Vo(t, M);
            if (e < 0)return !1;
            N(), M.splice(e, 1);
            var n = r(t.fromId), i = r(t.toId);
            return n && (e = Vo(t, n.links)) >= 0 && n.links.splice(e, 1), i && (e = Vo(t, i.links)) >= 0 && i.links.splice(e, 1), P(t, "remove"), I(), !0
        }

        function u(t, e) {
            var n, i = r(t);
            if (!i || !i.links)return null;
            for (n = 0; n < i.links.length; ++n) {
                var o = i.links[n];
                if (o.fromId === t && o.toId === e)return o
            }
            return null
        }

        function p() {
            N(), A(function (t) {
                o(t.id)
            }), I()
        }

        function d(t) {
            var e, n;
            if ("function" == typeof t)for (e = 0, n = M.length; e < n; ++e)t(M[e])
        }

        function f(t, e, n) {
            var i = r(t);
            if (i && i.links && "function" == typeof e)return n ? g(i.links, t, e) : m(i.links, t, e)
        }

        function m(t, e, n) {
            for (var i = 0; i < t.length; ++i) {
                var r = t[i];
                if (n(w[r.fromId === e ? r.toId : r.fromId], r))return !0
            }
        }

        function g(t, e, n) {
            for (var i = 0; i < t.length; ++i) {
                var r = t[i];
                if (r.fromId === e && n(w[r.toId], r))return !0
            }
        }

        function v() {
        }

        function y() {
            S += 1
        }

        function x() {
            0 === (S -= 1) && R.length > 0 && (U.fire("changed", R), R.length = 0)
        }

        function _(t) {
            if ("function" == typeof t)for (var e = Object.keys(w), n = 0; n < e.length; ++n)if (t(w[e[n]]))return !0
        }

        function b(t) {
            if ("function" == typeof t) {
                var e;
                for (e in w)if (t(w[e]))return !0
            }
        }

        t = t || {}, void 0 === t.uniqueLinkId && (t.uniqueLinkId = !0);
        var w = "function" == typeof Object.create ? Object.create(null) : {}, M = [], E = {}, T = 0, S = 0,
            A = function () {
                return Object.keys ? _ : b
            }(), L = t.uniqueLinkId ? c : s, R = [], P = v, C = v, N = v, I = v, U = {
                addNode: i,
                addLink: a,
                removeLink: l,
                removeNode: o,
                getNode: r,
                getNodesCount: function () {
                    return T
                },
                getLinksCount: function () {
                    return M.length
                },
                getLinks: h,
                forEachNode: A,
                forEachLinkedNode: f,
                forEachLink: d,
                beginUpdate: N,
                endUpdate: I,
                clear: p,
                hasLink: u,
                getLink: u
            };
        return Hl(U), function () {
            function t() {
                return U.beginUpdate = N = y, U.endUpdate = I = x, P = e, C = n, U.on = i, i.apply(U, arguments)
            }

            var i = U.on;
            U.on = t
        }(), U
    }

    function Vo(t, e) {
        if (!e)return -1;
        if (e.indexOf)return e.indexOf(t);
        var n, i = e.length;
        for (n = 0; n < i; n += 1)if (e[n] === t)return n;
        return -1
    }

    function jo(t) {
        this.id = t, this.links = null, this.data = null
    }

    function Wo(t, e) {
        t.links ? t.links.push(e) : t.links = [e]
    }

    function qo(t, e, n, i) {
        this.fromId = t, this.toId = e, this.data = n, this.id = i
    }

    function Xo(t) {
        var e, n, i, r = 0;
        if (0 == t.length)return r;
        for (e = 0, i = t.length; e < i; e++)n = t.charCodeAt(e), r = (r << 5) - r + n, r |= 0;
        return r
    }

    function Yo(t, e) {
        return Xo(t.toString() + "ðŸ‘‰ " + e.toString())
    }

    function Zo(t) {
        var e = Object.create(null);
        return {
            on: function (n, i, r) {
                if ("function" != typeof i)throw new Error("callback is expected to be a function");
                var o = e[n];
                return o || (o = e[n] = []), o.push({callback: i, ctx: r}), t
            }, off: function (n, i) {
                if (void 0 === n)return e = Object.create(null), t;
                if (e[n]) {
                    if ("function" != typeof i) delete e[n]; else for (var r = e[n], o = 0; o < r.length; ++o)r[o].callback === i && r.splice(o, 1)
                }
                return t
            }, fire: function (n) {
                var i = e[n];
                if (!i)return t;
                var r;
                arguments.length > 1 && (r = Array.prototype.splice.call(arguments, 1));
                for (var o = 0; o < i.length; ++o) {
                    var a = i[o];
                    a.callback.apply(a.ctx, r)
                }
                return t
            }
        }
    }

    function Jo(t) {
        if (!t)throw new Error("Eventify cannot use falsy object as events subject");
        for (var e = ["on", "fire", "off"], n = 0; n < e.length; ++n)if (t.hasOwnProperty(e[n]))throw new Error("Subject cannot be eventified, since it already has property '" + e[n] + "'")
    }

    function Qo(t, e, n, i, r) {
        this.from = t, this.to = e, this.length = n, this.coeff = i, this.weight = "number" == typeof r ? r : 1
    }

    function Ko(t, e, n) {
        if ("[object Array]" === Object.prototype.toString.call(n))for (var i = 0; i < n.length; ++i)$o(t, e, n[i]); else for (var r in t)$o(t, e, r)
    }

    function $o(t, e, n) {
        if (t.hasOwnProperty(n)) {
            if ("function" == typeof e[n])return;
            e[n] = function (i) {
                return void 0 !== i ? (t[n] = i, e) : t[n]
            }
        }
    }

    function ta(t, e) {
        var n;
        if (t || (t = {}), e)for (n in e)if (e.hasOwnProperty(n)) {
            var i = t.hasOwnProperty(n), r = typeof e[n], o = !i || typeof t[n] !== r;
            o ? t[n] = e[n] : "object" === r && (t[n] = ta(t[n], e[n]))
        }
        return t
    }

    function ea(t) {
        var e = "number" == typeof t ? t : +new Date, n = function () {
            return e = e + 2127912214 + (e << 12) & 4294967295, e = 4294967295 & (3345072700 ^ e ^ e >>> 19), e = e + 374761393 + (e << 5) & 4294967295, e = 4294967295 & (e + 3550635116 ^ e << 9), e = e + 4251993797 + (e << 3) & 4294967295, (268435455 & (e = 4294967295 & (3042594569 ^ e ^ e >>> 16))) / 268435456
        };
        return {
            next: function (t) {
                return Math.floor(n() * t)
            }, nextDouble: function () {
                return n()
            }
        }
    }

    function na(t, e) {
        var n = e || ea();
        if ("function" != typeof n.next)throw new Error("customRandom does not match expected API: next() function is missing");
        return {
            forEach: function (e) {
                var i, r, o;
                for (i = t.length - 1; i > 0; --i)r = n.next(i + 1), o = t[r], t[r] = t[i], t[i] = o, e(o);
                t.length && e(t[0])
            }, shuffle: function () {
                var e, i, r;
                for (e = t.length - 1; e > 0; --e)i = n.next(e + 1), r = t[i], t[i] = t[e], t[e] = r;
                return t
            }
        }
    }

    function ia() {
        this.stack = [], this.popIdx = 0
    }

    function ra(t, e) {
        this.node = t, this.body = e
    }

    function oa(t, e) {
        return 0 === e ? t.quad0 : 1 === e ? t.quad1 : 2 === e ? t.quad2 : 3 === e ? t.quad3 : null
    }

    function aa(t, e, n) {
        0 === e ? t.quad0 = n : 1 === e ? t.quad1 = n : 2 === e ? t.quad2 = n : 3 === e && (t.quad3 = n)
    }

    function sa(t, e) {
        var n, i = 0, r = 0, o = 0, a = 0, s = t.length;
        if (0 === s)return 0;
        for (n = 0; n < s; ++n) {
            var c = t[n], h = e / c.mass;
            c.velocity.x += h * c.force.x, c.velocity.y += h * c.force.y;
            var l = c.velocity.x, u = c.velocity.y, p = Math.sqrt(l * l + u * u);
            p > 1 && (c.velocity.x = l / p, c.velocity.y = u / p), i = e * c.velocity.x, o = e * c.velocity.y, c.pos.x += i, c.pos.y += o, r += Math.abs(i), a += Math.abs(o)
        }
        return (r * r + a * a) / s
    }

    function ca(t, e) {
        this.pos = new ha(t, e), this.prevPos = new ha(t, e), this.force = new ha, this.velocity = new ha, this.mass = 1
    }

    function ha(t, e) {
        t && "number" != typeof t ? (this.x = "number" == typeof t.x ? t.x : 0, this.y = "number" == typeof t.y ? t.y : 0) : (this.x = "number" == typeof t ? t : 0, this.y = "number" == typeof e ? e : 0)
    }

    function la(t, e, n) {
        this.pos = new ua(t, e, n), this.prevPos = new ua(t, e, n), this.force = new ua, this.velocity = new ua, this.mass = 1
    }

    function ua(t, e, n) {
        t && "number" != typeof t ? (this.x = "number" == typeof t.x ? t.x : 0, this.y = "number" == typeof t.y ? t.y : 0, this.z = "number" == typeof t.z ? t.z : 0) : (this.x = "number" == typeof t ? t : 0, this.y = "number" == typeof e ? e : 0, this.z = "number" == typeof n ? n : 0)
    }

    function pa(t) {
        function e() {
            var t, e = p.length;
            if (e)for (f.insertBodies(p); e--;)t = p[e], t.isPinned || (t.force.reset(), f.updateBodyForce(t), v.update(t));
            for (e = d.length; e--;)g.update(d[e])
        }

        var n = jl, i = Wl, r = ql, o = Vl;
        t = r(t, {springLength: 30, springCoeff: 8e-4, gravity: -1.2, theta: .8, dragCoeff: .02, timeStep: 20});
        var a = t.createQuadTree || Ql, s = t.createBounds || Kl, c = t.createDragForce || $l,
            h = t.createSpringForce || tu, l = t.integrator || eu, u = t.createBody || ru, p = [], d = [], f = a(t),
            m = s(p, t), g = h(t), v = c(t), y = {
                bodies: p, quadTree: f, springs: d, settings: t, step: function () {
                    e();
                    var n = l(p, t.timeStep);
                    return m.update(), n
                }, addBody: function (t) {
                    if (!t)throw new Error("Body is required");
                    return p.push(t), t
                }, addBodyAt: function (t) {
                    if (!t)throw new Error("Body position is required");
                    var e = u(t);
                    return p.push(e), e
                }, removeBody: function (t) {
                    if (t) {
                        var e = p.indexOf(t);
                        if (!(e < 0))return p.splice(e, 1), 0 === p.length && m.reset(), !0
                    }
                }, addSpring: function (t, e, i, r, o) {
                    if (!t || !e)throw new Error("Cannot add null spring to force simulator");
                    "number" != typeof i && (i = -1);
                    var a = new n(t, e, i, o >= 0 ? o : -1, r);
                    return d.push(a), a
                }, getTotalMovement: function () {
                    return 0
                }, removeSpring: function (t) {
                    if (t) {
                        var e = d.indexOf(t);
                        return e > -1 ? (d.splice(e, 1), !0) : void 0
                    }
                }, getBestNewBodyPosition: function (t) {
                    return m.getBestNewPosition(t)
                }, getBBox: function () {
                    return m.box
                }, gravity: function (e) {
                    return void 0 !== e ? (t.gravity = e, f.options({gravity: e}), this) : t.gravity
                }, theta: function (e) {
                    return void 0 !== e ? (t.theta = e, f.options({theta: e}), this) : t.theta
                }
            };
        return i(t, y), o(y), y
    }

    function da(t, e) {
        function n(t) {
            Object.keys(y).forEach(function (e) {
                t(y[e], e)
            })
        }

        function i(e, n) {
            var i;
            if (void 0 === n) i = "object" != typeof e ? e : e.id; else {
                var r = t.hasLink(e, n);
                if (!r)return;
                i = r.id
            }
            return x[i]
        }

        function r(t) {
            return y[t]
        }

        function o(t) {
            M.fire("stable", t)
        }

        function a(e) {
            for (var n = 0; n < e.length; ++n) {
                var i = e[n];
                "add" === i.changeType ? (i.node && s(i.node.id), i.link && h(i.link)) : "remove" === i.changeType && (i.node && c(i.node), i.link && l(i.link))
            }
            _ = t.getNodesCount()
        }

        function s(e) {
            var n = y[e];
            if (!n) {
                var i = t.getNode(e);
                if (!i)throw new Error("initBody() was called with unknown node id");
                var r = i.position;
                if (!r) {
                    var o = u(i);
                    r = v.getBestNewBodyPosition(o)
                }
                n = v.addBodyAt(r), n.id = e, y[e] = n, p(e), d(i) && (n.isPinned = !0)
            }
        }

        function c(t) {
            var e = t.id, n = y[e];
            n && (y[e] = null, delete y[e], v.removeBody(n))
        }

        function h(t) {
            p(t.fromId), p(t.toId);
            var e = y[t.fromId], n = y[t.toId], i = v.addSpring(e, n, t.length);
            b(t, i), x[t.id] = i
        }

        function l(e) {
            var n = x[e.id];
            if (n) {
                var i = t.getNode(e.fromId), r = t.getNode(e.toId);
                i && p(i.id), r && p(r.id), delete x[e.id], v.removeSpring(n)
            }
        }

        function u(t) {
            var e = [];
            if (!t.links)return e;
            for (var n = Math.min(t.links.length, 2), i = 0; i < n; ++i) {
                var r = t.links[i], o = r.fromId !== t.id ? y[r.fromId] : y[r.toId];
                o && o.pos && e.push(o)
            }
            return e
        }

        function p(t) {
            y[t].mass = m(t)
        }

        function d(t) {
            return t && (t.isPinned || t.data && t.data.isPinned)
        }

        function f(t) {
            var e = y[t];
            return e || (s(t), e = y[t]), e
        }

        function m(e) {
            var n = t.getLinks(e);
            return n ? 1 + n.length / 3 : 1
        }

        if (!t)throw new Error("Graph structure cannot be undefined");
        var g = ou, v = g(e), y = Object.create(null), x = {}, _ = 0, b = v.settings.springTransform || fa;
        !function () {
            _ = 0, t.forEachNode(function (t) {
                s(t.id), _ += 1
            }), t.forEachLink(h)
        }(), function () {
            t.on("changed", a)
        }();
        var w = !1, M = {
            step: function () {
                if (0 === _)return !0;
                var t = v.step();
                M.lastMove = t, M.fire("step");
                var e = t / _, n = e <= .01;
                return w !== n && (w = n, o(n)), n
            }, getNodePosition: function (t) {
                return f(t).pos
            }, setNodePosition: function (t) {
                var e = f(t);
                e.setPosition.apply(e, Array.prototype.slice.call(arguments, 1))
            }, getLinkPosition: function (t) {
                var e = x[t];
                if (e)return {from: e.from.pos, to: e.to.pos}
            }, getGraphRect: function () {
                return v.getBBox()
            }, forEachBody: n, pinNode: function (t, e) {
                f(t.id).isPinned = !!e
            }, isNodePinned: function (t) {
                return f(t.id).isPinned
            }, dispose: function () {
                t.off("changed", a), M.fire("disposed")
            }, getBody: r, getSpring: i, simulator: v, graph: t, lastMove: 0
        };
        return cu(M), M
    }

    function fa() {
    }

    function ma(t) {
        var e = Object.create(null);
        return {
            on: function (n, i, r) {
                if ("function" != typeof i)throw new Error("callback is expected to be a function");
                var o = e[n];
                return o || (o = e[n] = []), o.push({callback: i, ctx: r}), t
            }, off: function (n, i) {
                if (void 0 === n)return e = Object.create(null), t;
                if (e[n]) {
                    if ("function" != typeof i) delete e[n]; else for (var r = e[n], o = 0; o < r.length; ++o)r[o].callback === i && r.splice(o, 1)
                }
                return t
            }, fire: function (n) {
                var i = e[n];
                if (!i)return t;
                var r;
                arguments.length > 1 && (r = Array.prototype.splice.call(arguments, 1));
                for (var o = 0; o < i.length; ++o) {
                    var a = i[o];
                    a.callback.apply(a.ctx, r)
                }
                return t
            }
        }
    }

    function ga(t) {
        if (!t)throw new Error("Eventify cannot use falsy object as events subject");
        for (var e = ["on", "fire", "off"], n = 0; n < e.length; ++n)if (t.hasOwnProperty(e[n]))throw new Error("Subject cannot be eventified, since it already has property '" + e[n] + "'")
    }

    function va(t, e, n, i, r) {
        this.from = t, this.to = e, this.length = n, this.coeff = i, this.weight = "number" == typeof r ? r : 1
    }

    function ya(t, e, n) {
        if ("[object Array]" === Object.prototype.toString.call(n))for (var i = 0; i < n.length; ++i)xa(t, e, n[i]); else for (var r in t)xa(t, e, r)
    }

    function xa(t, e, n) {
        if (t.hasOwnProperty(n)) {
            if ("function" == typeof e[n])return;
            e[n] = function (i) {
                return void 0 !== i ? (t[n] = i, e) : t[n]
            }
        }
    }

    function _a(t, e) {
        var n;
        if (t || (t = {}), e)for (n in e)if (e.hasOwnProperty(n)) {
            var i = t.hasOwnProperty(n), r = typeof e[n], o = !i || typeof t[n] !== r;
            o ? t[n] = e[n] : "object" === r && (t[n] = _a(t[n], e[n]))
        }
        return t
    }

    function ba(t) {
        var e = "number" == typeof t ? t : +new Date, n = function () {
            return e = e + 2127912214 + (e << 12) & 4294967295, e = 4294967295 & (3345072700 ^ e ^ e >>> 19), e = e + 374761393 + (e << 5) & 4294967295, e = 4294967295 & (e + 3550635116 ^ e << 9), e = e + 4251993797 + (e << 3) & 4294967295, (268435455 & (e = 4294967295 & (3042594569 ^ e ^ e >>> 16))) / 268435456
        };
        return {
            next: function (t) {
                return Math.floor(n() * t)
            }, nextDouble: function () {
                return n()
            }
        }
    }

    function wa(t, e) {
        var n = e || ba();
        if ("function" != typeof n.next)throw new Error("customRandom does not match expected API: next() function is missing");
        return {
            forEach: function (e) {
                var i, r, o;
                for (i = t.length - 1; i > 0; --i)r = n.next(i + 1), o = t[r], t[r] = t[i], t[i] = o, e(o);
                t.length && e(t[0])
            }, shuffle: function () {
                var e, i, r;
                for (e = t.length - 1; e > 0; --e)i = n.next(e + 1), r = t[i], t[i] = t[e], t[e] = r;
                return t
            }
        }
    }

    function Ma() {
        this.stack = [], this.popIdx = 0
    }

    function Ea(t, e) {
        this.node = t, this.body = e
    }

    function Ta(t, e) {
        return 0 === e ? t.quad0 : 1 === e ? t.quad1 : 2 === e ? t.quad2 : 3 === e ? t.quad3 : null
    }

    function Sa(t, e, n) {
        0 === e ? t.quad0 = n : 1 === e ? t.quad1 = n : 2 === e ? t.quad2 = n : 3 === e && (t.quad3 = n)
    }

    function Aa(t, e) {
        var n, i = 0, r = 0, o = 0, a = 0, s = t.length;
        if (0 === s)return 0;
        for (n = 0; n < s; ++n) {
            var c = t[n], h = e / c.mass;
            c.velocity.x += h * c.force.x, c.velocity.y += h * c.force.y;
            var l = c.velocity.x, u = c.velocity.y, p = Math.sqrt(l * l + u * u);
            p > 1 && (c.velocity.x = l / p, c.velocity.y = u / p), i = e * c.velocity.x, o = e * c.velocity.y, c.pos.x += i, c.pos.y += o, r += Math.abs(i), a += Math.abs(o)
        }
        return (r * r + a * a) / s
    }

    function La(t, e) {
        this.pos = new Ra(t, e), this.prevPos = new Ra(t, e), this.force = new Ra, this.velocity = new Ra, this.mass = 1
    }

    function Ra(t, e) {
        t && "number" != typeof t ? (this.x = "number" == typeof t.x ? t.x : 0, this.y = "number" == typeof t.y ? t.y : 0) : (this.x = "number" == typeof t ? t : 0, this.y = "number" == typeof e ? e : 0)
    }

    function Pa(t, e, n) {
        this.pos = new Ca(t, e, n), this.prevPos = new Ca(t, e, n), this.force = new Ca, this.velocity = new Ca, this.mass = 1
    }

    function Ca(t, e, n) {
        t && "number" != typeof t ? (this.x = "number" == typeof t.x ? t.x : 0, this.y = "number" == typeof t.y ? t.y : 0, this.z = "number" == typeof t.z ? t.z : 0) : (this.x = "number" == typeof t ? t : 0, this.y = "number" == typeof e ? e : 0, this.z = "number" == typeof n ? n : 0)
    }

    function Na(t) {
        function e() {
            var t, e = p.length;
            if (e)for (f.insertBodies(p); e--;)t = p[e], t.isPinned || (t.force.reset(), f.updateBodyForce(t), v.update(t));
            for (e = d.length; e--;)g.update(d[e])
        }

        var n = lu, i = uu, r = pu, o = hu;
        t = r(t, {
            springLength: 30,
            springCoeff: 8e-4,
            gravity: -1.2,
            theta: .8,
            dragCoeff: .02,
            timeStep: 20,
            stableThreshold: .009
        });
        var a = t.createQuadTree || vu, s = t.createBounds || yu, c = t.createDragForce || xu,
            h = t.createSpringForce || _u, l = t.integrator || bu, u = t.createBody || Eu, p = [], d = [], f = a(t),
            m = s(p, t), g = h(t), v = c(t), y = 0, x = !1, _ = {
                bodies: p, springs: d, settings: t, step: function () {
                    e(), y = l(p, t.timeStep), m.update();
                    var n = y < t.stableThreshold;
                    return x !== n && _.fire("stable", n), x = n, n
                }, addBody: function (t) {
                    if (!t)throw new Error("Body is required");
                    return p.push(t), t
                }, addBodyAt: function (t) {
                    if (!t)throw new Error("Body position is required");
                    var e = u(t);
                    return p.push(e), e
                }, removeBody: function (t) {
                    if (t) {
                        var e = p.indexOf(t);
                        if (!(e < 0))return p.splice(e, 1), 0 === p.length && m.reset(), !0
                    }
                }, addSpring: function (t, e, i, r, o) {
                    if (!t || !e)throw new Error("Cannot add null spring to force simulator");
                    "number" != typeof i && (i = -1);
                    var a = new n(t, e, i, o >= 0 ? o : -1, r);
                    return d.push(a), a
                }, getTotalMovement: function () {
                    return y
                }, removeSpring: function (t) {
                    if (t) {
                        var e = d.indexOf(t);
                        return e > -1 ? (d.splice(e, 1), !0) : void 0
                    }
                }, getBestNewBodyPosition: function (t) {
                    return m.getBestNewPosition(t)
                }, getBBox: function () {
                    return m.box
                }, gravity: function (e) {
                    return void 0 !== e ? (t.gravity = e, f.options({gravity: e}), this) : t.gravity
                }, theta: function (e) {
                    return void 0 !== e ? (t.theta = e, f.options({theta: e}), this) : t.theta
                }
            };
        return i(t, _), o(_), _
    }

    function Ia(t, e) {
        function n(e, n) {
            var i;
            if (void 0 === n) i = "object" != typeof e ? e : e.id; else {
                var r = t.hasLink(e, n);
                if (!r)return;
                i = r.id
            }
            return y[i]
        }

        function i(t) {
            return v[t]
        }

        function r(t) {
            _.fire("stable", t)
        }

        function o(t) {
            for (var e = 0; e < t.length; ++e) {
                var n = t[e];
                "add" === n.changeType ? (n.node && a(n.node.id), n.link && c(n.link)) : "remove" === n.changeType && (n.node && s(n.node), n.link && h(n.link))
            }
        }

        function a(e) {
            var n = v[e];
            if (!n) {
                var i = t.getNode(e);
                if (!i)throw new Error("initBody() was called with unknown node id");
                var r = i.position;
                if (!r) {
                    var o = l(i);
                    r = g.getBestNewBodyPosition(o)
                }
                n = g.addBodyAt(r), v[e] = n, u(e), p(i) && (n.isPinned = !0)
            }
        }

        function s(t) {
            var e = t.id, n = v[e];
            n && (v[e] = null, delete v[e], g.removeBody(n))
        }

        function c(t) {
            u(t.fromId), u(t.toId);
            var e = v[t.fromId], n = v[t.toId], i = g.addSpring(e, n, t.length);
            x(t, i), y[t.id] = i
        }

        function h(e) {
            var n = y[e.id];
            if (n) {
                var i = t.getNode(e.fromId), r = t.getNode(e.toId);
                i && u(i.id), r && u(r.id), delete y[e.id], g.removeSpring(n)
            }
        }

        function l(t) {
            var e = [];
            if (!t.links)return e;
            for (var n = Math.min(t.links.length, 2), i = 0; i < n; ++i) {
                var r = t.links[i], o = r.fromId !== t.id ? v[r.fromId] : v[r.toId];
                o && o.pos && e.push(o)
            }
            return e
        }

        function u(t) {
            v[t].mass = f(t)
        }

        function p(t) {
            return t && (t.isPinned || t.data && t.data.isPinned)
        }

        function d(t) {
            var e = v[t];
            return e || (a(t), e = v[t]), e
        }

        function f(e) {
            var n = t.getLinks(e);
            return n ? 1 + n.length / 3 : 1
        }

        if (!t)throw new Error("Graph structure cannot be undefined");
        var m = Tu, g = m(e), v = "function" == typeof Object.create ? Object.create(null) : {}, y = {},
            x = g.settings.springTransform || Ua;
        !function () {
            t.forEachNode(function (t) {
                a(t.id)
            }), t.forEachLink(c)
        }(), function () {
            t.on("changed", o), g.on("stable", r)
        }();
        var _ = {
            step: function () {
                return g.step()
            }, getNodePosition: function (t) {
                return d(t).pos
            }, setNodePosition: function (t) {
                var e = d(t);
                e.setPosition.apply(e, Array.prototype.slice.call(arguments, 1))
            }, getLinkPosition: function (t) {
                var e = y[t];
                if (e)return {from: e.from.pos, to: e.to.pos}
            }, getGraphRect: function () {
                return g.getBBox()
            }, pinNode: function (t, e) {
                d(t.id).isPinned = !!e
            }, isNodePinned: function (t) {
                return d(t.id).isPinned
            }, dispose: function () {
                t.off("changed", o), g.off("stable", r)
            }, getBody: i, getSpring: n, simulator: g
        };
        return Lu(_), _
    }

    function Ua() {
    }

    function Da() {
        this.stack = [], this.popIdx = 0
    }

    function Oa(t, e) {
        this.node = t, this.body = e
    }

    function za(t, e) {
        return 0 === e ? t.quad0 : 1 === e ? t.quad1 : 2 === e ? t.quad2 : 3 === e ? t.quad3 : 4 === e ? t.quad4 : 5 === e ? t.quad5 : 6 === e ? t.quad6 : 7 === e ? t.quad7 : null
    }

    function Ba(t, e, n) {
        0 === e ? t.quad0 = n : 1 === e ? t.quad1 = n : 2 === e ? t.quad2 = n : 3 === e ? t.quad3 = n : 4 === e ? t.quad4 = n : 5 === e ? t.quad5 = n : 6 === e ? t.quad6 = n : 7 === e && (t.quad7 = n)
    }

    function Fa(t, e) {
        var n, i = 0, r = 0, o = 0, a = t.length;
        for (n = 0; n < a; ++n) {
            var s = t[n], c = e * e / s.mass;
            s.pos.x = 2 * s.pos.x - s.prevPos.x + s.force.x * c, s.pos.y = 2 * s.pos.y - s.prevPos.y + s.force.y * c, s.pos.z = 2 * s.pos.z - s.prevPos.z + s.force.z * c, i += Math.abs(s.pos.x - s.prevPos.x), r += Math.abs(s.pos.y - s.prevPos.y), o += Math.abs(s.pos.z - s.prevPos.z)
        }
        return (i * i + r * r + o * o) / t.length
    }

    function Ga(t, e) {
        var n, i = 0, r = 0, o = 0, a = 0, s = 0, c = 0, h = t.length;
        for (n = 0; n < h; ++n) {
            var l = t[n], u = e / l.mass;
            l.velocity.x += u * l.force.x, l.velocity.y += u * l.force.y, l.velocity.z += u * l.force.z;
            var p = l.velocity.x, d = l.velocity.y, f = l.velocity.z, m = Math.sqrt(p * p + d * d + f * f);
            m > 1 && (l.velocity.x = p / m, l.velocity.y = d / m, l.velocity.z = f / m), i = e * l.velocity.x, o = e * l.velocity.y, s = e * l.velocity.z, l.pos.x += i, l.pos.y += o, l.pos.z += s, r += Math.abs(i), a += Math.abs(o), c += Math.abs(s)
        }
        return (r * r + a * a + c * c) / t.length
    }

    function ka(t, e) {
        return e = pu(e, {
            createQuadTree: Nu,
            createBounds: Iu,
            createDragForce: Uu,
            createSpringForce: Du,
            integrator: Ha(e),
            createBody: zu
        }), ka.get2dLayout(t, e)
    }

    function Ha(t) {
        return t && "verlet" === t.integrator ? Bu : Fu
    }

    !function (t, e) {
        if ("undefined" == typeof document)return e;
        t = t || "";
        var n = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
        i.type = "text/css", i.styleSheet ? i.styleSheet.cssText = t : i.appendChild(document.createTextNode(t)), n.appendChild(i), e
    }(".graph-nav-info {\n    position: absolute;\n    bottom: 5px;\n    width: 100%;\n    text-align: center;\n    color: slategrey;\n    opacity: 0.7;\n    font-size: 10px;\n}\n\n.graph-info-msg {\n    position: absolute;\n    top: 50%;\n    width: 100%;\n    text-align: center;\n    color: lavender;\n    opacity: 0.7;\n    font-size: 22px;\n}\n\n.graph-tooltip {\n    position: absolute;\n    color: lavender;\n    font-size: 18px;\n}", void 0), void 0 === Number.EPSILON && (Number.EPSILON = Math.pow(2, -52)), void 0 === Math.sign && (Math.sign = function (t) {
        return t < 0 ? -1 : t > 0 ? 1 : +t
    }), void 0 === Function.prototype.name && Object.defineProperty(Function.prototype, "name", {
        get: function () {
            return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1]
        }
    }), void 0 === Object.assign && function () {
        Object.assign = function (t) {
            if (void 0 === t || null === t)throw new TypeError("Cannot convert undefined or null to object");
            for (var e = Object(t), n = 1; n < arguments.length; n++) {
                var i = arguments[n];
                if (void 0 !== i && null !== i)for (var r in i)Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r])
            }
            return e
        }
    }(), t.prototype = {
        addEventListener: function (t, e) {
            void 0 === this._listeners && (this._listeners = {});
            var n = this._listeners;
            void 0 === n[t] && (n[t] = []), n[t].indexOf(e) === -1 && n[t].push(e)
        }, hasEventListener: function (t, e) {
            if (void 0 === this._listeners)return !1;
            var n = this._listeners;
            return void 0 !== n[t] && n[t].indexOf(e) !== -1
        }, removeEventListener: function (t, e) {
            if (void 0 !== this._listeners) {
                var n = this._listeners, i = n[t];
                if (void 0 !== i) {
                    var r = i.indexOf(e);
                    r !== -1 && i.splice(r, 1)
                }
            }
        }, dispatchEvent: function (t) {
            if (void 0 !== this._listeners) {
                var e = this._listeners, n = e[t.type];
                if (void 0 !== n) {
                    t.target = this;
                    var i = [], r = 0, o = n.length;
                    for (r = 0; r < o; r++)i[r] = n[r];
                    for (r = 0; r < o; r++)i[r].call(this, t)
                }
            }
        }
    };
    var Va = "84", ja = {LEFT: 0, MIDDLE: 1, RIGHT: 2}, Wa = 0, qa = 1, Xa = 2, Ya = 0, Za = 1, Ja = 2, Qa = 0, Ka = 1,
        $a = 2, ts = 1, es = 2, ns = 0, is = 1, rs = 2, os = 0, as = 1, ss = 2, cs = 3, hs = 4, ls = 5, us = 100,
        ps = 101, ds = 102, fs = 103, ms = 104, gs = 200, vs = 201, ys = 202, xs = 203, _s = 204, bs = 205, ws = 206,
        Ms = 207, Es = 208, Ts = 209, Ss = 210, As = 0, Ls = 1, Rs = 2, Ps = 3, Cs = 4, Ns = 5, Is = 6, Us = 7, Ds = 0,
        Os = 1, zs = 2, Bs = 0, Fs = 1, Gs = 2, ks = 3, Hs = 4, Vs = 301, js = 302, Ws = 303, qs = 304, Xs = 305,
        Ys = 306, Zs = 307, Js = 1e3, Qs = 1001, Ks = 1002, $s = 1003, tc = 1004, ec = 1005, nc = 1006, ic = 1007,
        rc = 1008, oc = 1009, ac = 1010, sc = 1011, cc = 1012, hc = 1013, lc = 1014, uc = 1015, pc = 1016, dc = 1017,
        fc = 1018, mc = 1019, gc = 1020, vc = 1021, yc = 1022, xc = 1023, _c = 1024, bc = 1025, wc = xc, Mc = 1026,
        Ec = 1027, Tc = 2001, Sc = 2002, Ac = 2003, Lc = 2004, Rc = 2100, Pc = 2101, Cc = 2102, Nc = 2103, Ic = 2151,
        Uc = 2201, Dc = 2400, Oc = 0, zc = 1, Bc = 2, Fc = 3e3, Gc = 3001, kc = 3007, Hc = 3002, Vc = 3004, jc = 3005,
        Wc = 3006, qc = 3200, Xc = 3201, Yc = {
            DEG2RAD: Math.PI / 180, RAD2DEG: 180 / Math.PI, generateUUID: function () {
                var t, e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), n = new Array(36),
                    i = 0;
                return function () {
                    for (var r = 0; r < 36; r++)8 === r || 13 === r || 18 === r || 23 === r ? n[r] = "-" : 14 === r ? n[r] = "4" : (i <= 2 && (i = 33554432 + 16777216 * Math.random() | 0), t = 15 & i, i >>= 4, n[r] = e[19 === r ? 3 & t | 8 : t]);
                    return n.join("")
                }
            }(), clamp: function (t, e, n) {
                return Math.max(e, Math.min(n, t))
            }, euclideanModulo: function (t, e) {
                return (t % e + e) % e
            }, mapLinear: function (t, e, n, i, r) {
                return i + (t - e) * (r - i) / (n - e)
            }, lerp: function (t, e, n) {
                return (1 - n) * t + n * e
            }, smoothstep: function (t, e, n) {
                return t <= e ? 0 : t >= n ? 1 : (t = (t - e) / (n - e)) * t * (3 - 2 * t)
            }, smootherstep: function (t, e, n) {
                return t <= e ? 0 : t >= n ? 1 : (t = (t - e) / (n - e)) * t * t * (t * (6 * t - 15) + 10)
            }, randInt: function (t, e) {
                return t + Math.floor(Math.random() * (e - t + 1))
            }, randFloat: function (t, e) {
                return t + Math.random() * (e - t)
            }, randFloatSpread: function (t) {
                return t * (.5 - Math.random())
            }, degToRad: function (t) {
                return t * Yc.DEG2RAD
            }, radToDeg: function (t) {
                return t * Yc.RAD2DEG
            }, isPowerOfTwo: function (t) {
                return 0 == (t & t - 1) && 0 !== t
            }, nearestPowerOfTwo: function (t) {
                return Math.pow(2, Math.round(Math.log(t) / Math.LN2))
            }, nextPowerOfTwo: function (t) {
                return t--, t |= t >> 1, t |= t >> 2, t |= t >> 4, t |= t >> 8, t |= t >> 16, ++t
            }
        };
    e.prototype = {
        constructor: e, isVector2: !0, get width() {
            return this.x
        }, set width(t) {
            this.x = t
        }, get height() {
            return this.y
        }, set height(t) {
            this.y = t
        }, set: function (t, e) {
            return this.x = t, this.y = e, this
        }, setScalar: function (t) {
            return this.x = t, this.y = t, this
        }, setX: function (t) {
            return this.x = t, this
        }, setY: function (t) {
            return this.y = t, this
        }, setComponent: function (t, e) {
            switch (t) {
                case 0:
                    this.x = e;
                    break;
                case 1:
                    this.y = e;
                    break;
                default:
                    throw new Error("index is out of range: " + t)
            }
            return this
        }, getComponent: function (t) {
            switch (t) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                default:
                    throw new Error("index is out of range: " + t)
            }
        }, clone: function () {
            return new this.constructor(this.x, this.y)
        }, copy: function (t) {
            return this.x = t.x, this.y = t.y, this
        }, add: function (t, e) {
            return void 0 !== e ? (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this)
        }, addScalar: function (t) {
            return this.x += t, this.y += t, this
        }, addVectors: function (t, e) {
            return this.x = t.x + e.x, this.y = t.y + e.y, this
        }, addScaledVector: function (t, e) {
            return this.x += t.x * e, this.y += t.y * e, this
        }, sub: function (t, e) {
            return void 0 !== e ? (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this)
        }, subScalar: function (t) {
            return this.x -= t, this.y -= t, this
        }, subVectors: function (t, e) {
            return this.x = t.x - e.x, this.y = t.y - e.y, this
        }, multiply: function (t) {
            return this.x *= t.x, this.y *= t.y, this
        }, multiplyScalar: function (t) {
            return isFinite(t) ? (this.x *= t, this.y *= t) : (this.x = 0, this.y = 0), this
        }, divide: function (t) {
            return this.x /= t.x, this.y /= t.y, this
        }, divideScalar: function (t) {
            return this.multiplyScalar(1 / t)
        }, min: function (t) {
            return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this
        }, max: function (t) {
            return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this
        }, clamp: function (t, e) {
            return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this
        }, clampScalar: function () {
            var t, n;
            return function (i, r) {
                return void 0 === t && (t = new e, n = new e), t.set(i, i), n.set(r, r), this.clamp(t, n)
            }
        }(), clampLength: function (t, e) {
            var n = this.length();
            return this.multiplyScalar(Math.max(t, Math.min(e, n)) / n)
        }, floor: function () {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
        }, ceil: function () {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
        }, round: function () {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this
        }, roundToZero: function () {
            return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this
        }, negate: function () {
            return this.x = -this.x, this.y = -this.y, this
        }, dot: function (t) {
            return this.x * t.x + this.y * t.y
        }, lengthSq: function () {
            return this.x * this.x + this.y * this.y
        }, length: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        }, lengthManhattan: function () {
            return Math.abs(this.x) + Math.abs(this.y)
        }, normalize: function () {
            return this.divideScalar(this.length())
        }, angle: function () {
            var t = Math.atan2(this.y, this.x);
            return t < 0 && (t += 2 * Math.PI), t
        }, distanceTo: function (t) {
            return Math.sqrt(this.distanceToSquared(t))
        }, distanceToSquared: function (t) {
            var e = this.x - t.x, n = this.y - t.y;
            return e * e + n * n
        }, distanceToManhattan: function (t) {
            return Math.abs(this.x - t.x) + Math.abs(this.y - t.y)
        }, setLength: function (t) {
            return this.multiplyScalar(t / this.length())
        }, lerp: function (t, e) {
            return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this
        }, lerpVectors: function (t, e, n) {
            return this.subVectors(e, t).multiplyScalar(n).add(t)
        }, equals: function (t) {
            return t.x === this.x && t.y === this.y
        }, fromArray: function (t, e) {
            return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this
        }, toArray: function (t, e) {
            return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t
        }, fromBufferAttribute: function (t, e, n) {
            return void 0 !== n && console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this
        }, rotateAround: function (t, e) {
            var n = Math.cos(e), i = Math.sin(e), r = this.x - t.x, o = this.y - t.y;
            return this.x = r * n - o * i + t.x, this.y = r * i + o * n + t.y, this
        }
    };
    var Zc = 0;
    n.DEFAULT_IMAGE = void 0, n.DEFAULT_MAPPING = 300, n.prototype = {
        constructor: n,
        isTexture: !0,
        set needsUpdate(t) {
            t === !0 && this.version++
        },
        clone: function () {
            return (new this.constructor).copy(this)
        },
        copy: function (t) {
            return this.image = t.image, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.encoding = t.encoding, this
        },
        toJSON: function (t) {
            if (void 0 !== t.textures[this.uuid])return t.textures[this.uuid];
            var e = {
                metadata: {version: 4.4, type: "Texture", generator: "Texture.toJSON"},
                uuid: this.uuid,
                name: this.name,
                mapping: this.mapping,
                repeat: [this.repeat.x, this.repeat.y],
                offset: [this.offset.x, this.offset.y],
                wrap: [this.wrapS, this.wrapT],
                minFilter: this.minFilter,
                magFilter: this.magFilter,
                anisotropy: this.anisotropy,
                flipY: this.flipY
            };
            if (void 0 !== this.image) {
                var n = this.image;
                void 0 === n.uuid && (n.uuid = Yc.generateUUID()), void 0 === t.images[n.uuid] && (t.images[n.uuid] = {
                    uuid: n.uuid,
                    url: function (t) {
                        var e;
                        return void 0 !== t.toDataURL ? e = t : (e = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"), e.width = t.width, e.height = t.height, e.getContext("2d").drawImage(t, 0, 0, t.width, t.height)), e.width > 2048 || e.height > 2048 ? e.toDataURL("image/jpeg", .6) : e.toDataURL("image/png")
                    }(n)
                }), e.image = n.uuid
            }
            return t.textures[this.uuid] = e, e
        },
        dispose: function () {
            this.dispatchEvent({type: "dispose"})
        },
        transformUv: function (t) {
            if (300 === this.mapping) {
                if (t.multiply(this.repeat), t.add(this.offset), t.x < 0 || t.x > 1)switch (this.wrapS) {
                    case Js:
                        t.x = t.x - Math.floor(t.x);
                        break;
                    case Qs:
                        t.x = t.x < 0 ? 0 : 1;
                        break;
                    case Ks:
                        1 === Math.abs(Math.floor(t.x) % 2) ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x)
                }
                if (t.y < 0 || t.y > 1)switch (this.wrapT) {
                    case Js:
                        t.y = t.y - Math.floor(t.y);
                        break;
                    case Qs:
                        t.y = t.y < 0 ? 0 : 1;
                        break;
                    case Ks:
                        1 === Math.abs(Math.floor(t.y) % 2) ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y)
                }
                this.flipY && (t.y = 1 - t.y)
            }
        }
    }, Object.assign(n.prototype, t.prototype), i.prototype = {
        constructor: i,
        isVector4: !0,
        set: function (t, e, n, i) {
            return this.x = t, this.y = e, this.z = n, this.w = i, this
        },
        setScalar: function (t) {
            return this.x = t, this.y = t, this.z = t, this.w = t, this
        },
        setX: function (t) {
            return this.x = t, this
        },
        setY: function (t) {
            return this.y = t, this
        },
        setZ: function (t) {
            return this.z = t, this
        },
        setW: function (t) {
            return this.w = t, this
        },
        setComponent: function (t, e) {
            switch (t) {
                case 0:
                    this.x = e;
                    break;
                case 1:
                    this.y = e;
                    break;
                case 2:
                    this.z = e;
                    break;
                case 3:
                    this.w = e;
                    break;
                default:
                    throw new Error("index is out of range: " + t)
            }
            return this
        },
        getComponent: function (t) {
            switch (t) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                case 3:
                    return this.w;
                default:
                    throw new Error("index is out of range: " + t)
            }
        },
        clone: function () {
            return new this.constructor(this.x, this.y, this.z, this.w)
        },
        copy: function (t) {
            return this.x = t.x, this.y = t.y, this.z = t.z, this.w = void 0 !== t.w ? t.w : 1, this
        },
        add: function (t, e) {
            return void 0 !== e ? (console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this)
        },
        addScalar: function (t) {
            return this.x += t, this.y += t, this.z += t, this.w += t, this
        },
        addVectors: function (t, e) {
            return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this
        },
        addScaledVector: function (t, e) {
            return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, this
        },
        sub: function (t, e) {
            return void 0 !== e ? (console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this)
        },
        subScalar: function (t) {
            return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this
        },
        subVectors: function (t, e) {
            return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this
        },
        multiplyScalar: function (t) {
            return isFinite(t) ? (this.x *= t, this.y *= t, this.z *= t, this.w *= t) : (this.x = 0, this.y = 0, this.z = 0, this.w = 0), this
        },
        applyMatrix4: function (t) {
            var e = this.x, n = this.y, i = this.z, r = this.w, o = t.elements;
            return this.x = o[0] * e + o[4] * n + o[8] * i + o[12] * r, this.y = o[1] * e + o[5] * n + o[9] * i + o[13] * r, this.z = o[2] * e + o[6] * n + o[10] * i + o[14] * r, this.w = o[3] * e + o[7] * n + o[11] * i + o[15] * r, this
        },
        divideScalar: function (t) {
            return this.multiplyScalar(1 / t)
        },
        setAxisAngleFromQuaternion: function (t) {
            this.w = 2 * Math.acos(t.w);
            var e = Math.sqrt(1 - t.w * t.w);
            return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this
        },
        setAxisAngleFromRotationMatrix: function (t) {
            var e, n, i, r, o = t.elements, a = o[0], s = o[4], c = o[8], h = o[1], l = o[5], u = o[9], p = o[2],
                d = o[6], f = o[10];
            if (Math.abs(s - h) < .01 && Math.abs(c - p) < .01 && Math.abs(u - d) < .01) {
                if (Math.abs(s + h) < .1 && Math.abs(c + p) < .1 && Math.abs(u + d) < .1 && Math.abs(a + l + f - 3) < .1)return this.set(1, 0, 0, 0), this;
                e = Math.PI;
                var m = (a + 1) / 2, g = (l + 1) / 2, v = (f + 1) / 2, y = (s + h) / 4, x = (c + p) / 4,
                    _ = (u + d) / 4;
                return m > g && m > v ? m < .01 ? (n = 0, i = .707106781, r = .707106781) : (n = Math.sqrt(m), i = y / n, r = x / n) : g > v ? g < .01 ? (n = .707106781, i = 0, r = .707106781) : (i = Math.sqrt(g), n = y / i, r = _ / i) : v < .01 ? (n = .707106781, i = .707106781, r = 0) : (r = Math.sqrt(v), n = x / r, i = _ / r), this.set(n, i, r, e), this
            }
            var b = Math.sqrt((d - u) * (d - u) + (c - p) * (c - p) + (h - s) * (h - s));
            return Math.abs(b) < .001 && (b = 1), this.x = (d - u) / b, this.y = (c - p) / b, this.z = (h - s) / b, this.w = Math.acos((a + l + f - 1) / 2), this
        },
        min: function (t) {
            return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this
        },
        max: function (t) {
            return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this
        },
        clamp: function (t, e) {
            return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this.w = Math.max(t.w, Math.min(e.w, this.w)), this
        },
        clampScalar: function () {
            var t, e;
            return function (n, r) {
                return void 0 === t && (t = new i, e = new i), t.set(n, n, n, n), e.set(r, r, r, r), this.clamp(t, e)
            }
        }(),
        floor: function () {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
        },
        ceil: function () {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
        },
        round: function () {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
        },
        roundToZero: function () {
            return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), this
        },
        negate: function () {
            return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this
        },
        dot: function (t) {
            return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w
        },
        lengthSq: function () {
            return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
        },
        length: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
        },
        lengthManhattan: function () {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
        },
        normalize: function () {
            return this.divideScalar(this.length())
        },
        setLength: function (t) {
            return this.multiplyScalar(t / this.length())
        },
        lerp: function (t, e) {
            return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this
        },
        lerpVectors: function (t, e, n) {
            return this.subVectors(e, t).multiplyScalar(n).add(t)
        },
        equals: function (t) {
            return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w
        },
        fromArray: function (t, e) {
            return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this
        },
        toArray: function (t, e) {
            return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t
        },
        fromBufferAttribute: function (t, e, n) {
            return void 0 !== n && console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), this
        }
    }, r.prototype = {
        constructor: r, isWebGLRenderTarget: !0, setSize: function (t, e) {
            this.width === t && this.height === e || (this.width = t, this.height = e, this.dispose()), this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e)
        }, clone: function () {
            return (new this.constructor).copy(this)
        }, copy: function (t) {
            return this.width = t.width, this.height = t.height, this.viewport.copy(t.viewport), this.texture = t.texture.clone(), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.depthTexture = t.depthTexture, this
        }, dispose: function () {
            this.dispatchEvent({type: "dispose"})
        }
    }, Object.assign(r.prototype, t.prototype), o.prototype = Object.create(r.prototype), o.prototype.constructor = o, o.prototype.isWebGLRenderTargetCube = !0, a.prototype = {
        constructor: a, get x() {
            return this._x
        }, set x(t) {
            this._x = t, this.onChangeCallback()
        }, get y() {
            return this._y
        }, set y(t) {
            this._y = t, this.onChangeCallback()
        }, get z() {
            return this._z
        }, set z(t) {
            this._z = t, this.onChangeCallback()
        }, get w() {
            return this._w
        }, set w(t) {
            this._w = t, this.onChangeCallback()
        }, set: function (t, e, n, i) {
            return this._x = t, this._y = e, this._z = n, this._w = i, this.onChangeCallback(), this
        }, clone: function () {
            return new this.constructor(this._x, this._y, this._z, this._w)
        }, copy: function (t) {
            return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this.onChangeCallback(), this
        }, setFromEuler: function (t, e) {
            if ((t && t.isEuler) === !1)throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
            var n = Math.cos(t._x / 2), i = Math.cos(t._y / 2), r = Math.cos(t._z / 2), o = Math.sin(t._x / 2),
                a = Math.sin(t._y / 2), s = Math.sin(t._z / 2), c = t.order;
            return "XYZ" === c ? (this._x = o * i * r + n * a * s, this._y = n * a * r - o * i * s, this._z = n * i * s + o * a * r, this._w = n * i * r - o * a * s) : "YXZ" === c ? (this._x = o * i * r + n * a * s, this._y = n * a * r - o * i * s, this._z = n * i * s - o * a * r, this._w = n * i * r + o * a * s) : "ZXY" === c ? (this._x = o * i * r - n * a * s, this._y = n * a * r + o * i * s, this._z = n * i * s + o * a * r, this._w = n * i * r - o * a * s) : "ZYX" === c ? (this._x = o * i * r - n * a * s, this._y = n * a * r + o * i * s, this._z = n * i * s - o * a * r, this._w = n * i * r + o * a * s) : "YZX" === c ? (this._x = o * i * r + n * a * s, this._y = n * a * r + o * i * s, this._z = n * i * s - o * a * r, this._w = n * i * r - o * a * s) : "XZY" === c && (this._x = o * i * r - n * a * s, this._y = n * a * r - o * i * s, this._z = n * i * s + o * a * r, this._w = n * i * r + o * a * s), e !== !1 && this.onChangeCallback(), this
        }, setFromAxisAngle: function (t, e) {
            var n = e / 2, i = Math.sin(n);
            return this._x = t.x * i, this._y = t.y * i, this._z = t.z * i, this._w = Math.cos(n), this.onChangeCallback(), this
        }, setFromRotationMatrix: function (t) {
            var e, n = t.elements, i = n[0], r = n[4], o = n[8], a = n[1], s = n[5], c = n[9], h = n[2], l = n[6],
                u = n[10], p = i + s + u;
            return p > 0 ? (e = .5 / Math.sqrt(p + 1), this._w = .25 / e, this._x = (l - c) * e, this._y = (o - h) * e, this._z = (a - r) * e) : i > s && i > u ? (e = 2 * Math.sqrt(1 + i - s - u), this._w = (l - c) / e, this._x = .25 * e, this._y = (r + a) / e, this._z = (o + h) / e) : s > u ? (e = 2 * Math.sqrt(1 + s - i - u), this._w = (o - h) / e, this._x = (r + a) / e, this._y = .25 * e, this._z = (c + l) / e) : (e = 2 * Math.sqrt(1 + u - i - s), this._w = (a - r) / e, this._x = (o + h) / e, this._y = (c + l) / e, this._z = .25 * e), this.onChangeCallback(), this
        }, setFromUnitVectors: function () {
            var t, e;
            return function (n, i) {
                return void 0 === t && (t = new s), e = n.dot(i) + 1, e < 1e-6 ? (e = 0, Math.abs(n.x) > Math.abs(n.z) ? t.set(-n.y, n.x, 0) : t.set(0, -n.z, n.y)) : t.crossVectors(n, i), this._x = t.x, this._y = t.y, this._z = t.z, this._w = e, this.normalize()
            }
        }(), inverse: function () {
            return this.conjugate().normalize()
        }, conjugate: function () {
            return this._x *= -1, this._y *= -1, this._z *= -1, this.onChangeCallback(), this
        }, dot: function (t) {
            return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w
        }, lengthSq: function () {
            return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
        }, length: function () {
            return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
        }, normalize: function () {
            var t = this.length();
            return 0 === t ? (this._x = 0, this._y = 0,
                this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this.onChangeCallback(), this
        }, multiply: function (t, e) {
            return void 0 !== e ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(t, e)) : this.multiplyQuaternions(this, t)
        }, premultiply: function (t) {
            return this.multiplyQuaternions(t, this)
        }, multiplyQuaternions: function (t, e) {
            var n = t._x, i = t._y, r = t._z, o = t._w, a = e._x, s = e._y, c = e._z, h = e._w;
            return this._x = n * h + o * a + i * c - r * s, this._y = i * h + o * s + r * a - n * c, this._z = r * h + o * c + n * s - i * a, this._w = o * h - n * a - i * s - r * c, this.onChangeCallback(), this
        }, slerp: function (t, e) {
            if (0 === e)return this;
            if (1 === e)return this.copy(t);
            var n = this._x, i = this._y, r = this._z, o = this._w, a = o * t._w + n * t._x + i * t._y + r * t._z;
            if (a < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, a = -a) : this.copy(t), a >= 1)return this._w = o, this._x = n, this._y = i, this._z = r, this;
            var s = Math.sqrt(1 - a * a);
            if (Math.abs(s) < .001)return this._w = .5 * (o + this._w), this._x = .5 * (n + this._x), this._y = .5 * (i + this._y), this._z = .5 * (r + this._z), this;
            var c = Math.atan2(s, a), h = Math.sin((1 - e) * c) / s, l = Math.sin(e * c) / s;
            return this._w = o * h + this._w * l, this._x = n * h + this._x * l, this._y = i * h + this._y * l, this._z = r * h + this._z * l, this.onChangeCallback(), this
        }, equals: function (t) {
            return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w
        }, fromArray: function (t, e) {
            return void 0 === e && (e = 0), this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this.onChangeCallback(), this
        }, toArray: function (t, e) {
            return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t
        }, onChange: function (t) {
            return this.onChangeCallback = t, this
        }, onChangeCallback: function () {
        }
    }, Object.assign(a, {
        slerp: function (t, e, n, i) {
            return n.copy(t).slerp(e, i)
        }, slerpFlat: function (t, e, n, i, r, o, a) {
            var s = n[i + 0], c = n[i + 1], h = n[i + 2], l = n[i + 3], u = r[o + 0], p = r[o + 1], d = r[o + 2],
                f = r[o + 3];
            if (l !== f || s !== u || c !== p || h !== d) {
                var m = 1 - a, g = s * u + c * p + h * d + l * f, v = g >= 0 ? 1 : -1, y = 1 - g * g;
                if (y > Number.EPSILON) {
                    var x = Math.sqrt(y), _ = Math.atan2(x, g * v);
                    m = Math.sin(m * _) / x, a = Math.sin(a * _) / x
                }
                var b = a * v;
                if (s = s * m + u * b, c = c * m + p * b, h = h * m + d * b, l = l * m + f * b, m === 1 - a) {
                    var w = 1 / Math.sqrt(s * s + c * c + h * h + l * l);
                    s *= w, c *= w, h *= w, l *= w
                }
            }
            t[e] = s, t[e + 1] = c, t[e + 2] = h, t[e + 3] = l
        }
    }), s.prototype = {
        constructor: s, isVector3: !0, set: function (t, e, n) {
            return this.x = t, this.y = e, this.z = n, this
        }, setScalar: function (t) {
            return this.x = t, this.y = t, this.z = t, this
        }, setX: function (t) {
            return this.x = t, this
        }, setY: function (t) {
            return this.y = t, this
        }, setZ: function (t) {
            return this.z = t, this
        }, setComponent: function (t, e) {
            switch (t) {
                case 0:
                    this.x = e;
                    break;
                case 1:
                    this.y = e;
                    break;
                case 2:
                    this.z = e;
                    break;
                default:
                    throw new Error("index is out of range: " + t)
            }
            return this
        }, getComponent: function (t) {
            switch (t) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                default:
                    throw new Error("index is out of range: " + t)
            }
        }, clone: function () {
            return new this.constructor(this.x, this.y, this.z)
        }, copy: function (t) {
            return this.x = t.x, this.y = t.y, this.z = t.z, this
        }, add: function (t, e) {
            return void 0 !== e ? (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this.z += t.z, this)
        }, addScalar: function (t) {
            return this.x += t, this.y += t, this.z += t, this
        }, addVectors: function (t, e) {
            return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this
        }, addScaledVector: function (t, e) {
            return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this
        }, sub: function (t, e) {
            return void 0 !== e ? (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this.z -= t.z, this)
        }, subScalar: function (t) {
            return this.x -= t, this.y -= t, this.z -= t, this
        }, subVectors: function (t, e) {
            return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this
        }, multiply: function (t, e) {
            return void 0 !== e ? (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(t, e)) : (this.x *= t.x, this.y *= t.y, this.z *= t.z, this)
        }, multiplyScalar: function (t) {
            return isFinite(t) ? (this.x *= t, this.y *= t, this.z *= t) : (this.x = 0, this.y = 0, this.z = 0), this
        }, multiplyVectors: function (t, e) {
            return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this
        }, applyEuler: function () {
            var t;
            return function (e) {
                return (e && e.isEuler) === !1 && console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), void 0 === t && (t = new a), this.applyQuaternion(t.setFromEuler(e))
            }
        }(), applyAxisAngle: function () {
            var t;
            return function (e, n) {
                return void 0 === t && (t = new a), this.applyQuaternion(t.setFromAxisAngle(e, n))
            }
        }(), applyMatrix3: function (t) {
            var e = this.x, n = this.y, i = this.z, r = t.elements;
            return this.x = r[0] * e + r[3] * n + r[6] * i, this.y = r[1] * e + r[4] * n + r[7] * i, this.z = r[2] * e + r[5] * n + r[8] * i, this
        }, applyMatrix4: function (t) {
            var e = this.x, n = this.y, i = this.z, r = t.elements;
            this.x = r[0] * e + r[4] * n + r[8] * i + r[12], this.y = r[1] * e + r[5] * n + r[9] * i + r[13], this.z = r[2] * e + r[6] * n + r[10] * i + r[14];
            var o = r[3] * e + r[7] * n + r[11] * i + r[15];
            return this.divideScalar(o)
        }, applyQuaternion: function (t) {
            var e = this.x, n = this.y, i = this.z, r = t.x, o = t.y, a = t.z, s = t.w, c = s * e + o * i - a * n,
                h = s * n + a * e - r * i, l = s * i + r * n - o * e, u = -r * e - o * n - a * i;
            return this.x = c * s + u * -r + h * -a - l * -o, this.y = h * s + u * -o + l * -r - c * -a, this.z = l * s + u * -a + c * -o - h * -r, this
        }, project: function () {
            var t;
            return function (e) {
                return void 0 === t && (t = new c), t.multiplyMatrices(e.projectionMatrix, t.getInverse(e.matrixWorld)), this.applyMatrix4(t)
            }
        }(), unproject: function () {
            var t;
            return function (e) {
                return void 0 === t && (t = new c), t.multiplyMatrices(e.matrixWorld, t.getInverse(e.projectionMatrix)), this.applyMatrix4(t)
            }
        }(), transformDirection: function (t) {
            var e = this.x, n = this.y, i = this.z, r = t.elements;
            return this.x = r[0] * e + r[4] * n + r[8] * i, this.y = r[1] * e + r[5] * n + r[9] * i, this.z = r[2] * e + r[6] * n + r[10] * i, this.normalize()
        }, divide: function (t) {
            return this.x /= t.x, this.y /= t.y, this.z /= t.z, this
        }, divideScalar: function (t) {
            return this.multiplyScalar(1 / t)
        }, min: function (t) {
            return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this
        }, max: function (t) {
            return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this
        }, clamp: function (t, e) {
            return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this
        }, clampScalar: function () {
            var t, e;
            return function (n, i) {
                return void 0 === t && (t = new s, e = new s), t.set(n, n, n), e.set(i, i, i), this.clamp(t, e)
            }
        }(), clampLength: function (t, e) {
            var n = this.length();
            return this.multiplyScalar(Math.max(t, Math.min(e, n)) / n)
        }, floor: function () {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
        }, ceil: function () {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
        }, round: function () {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
        }, roundToZero: function () {
            return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this
        }, negate: function () {
            return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
        }, dot: function (t) {
            return this.x * t.x + this.y * t.y + this.z * t.z
        }, lengthSq: function () {
            return this.x * this.x + this.y * this.y + this.z * this.z
        }, length: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
        }, lengthManhattan: function () {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
        }, normalize: function () {
            return this.divideScalar(this.length())
        }, setLength: function (t) {
            return this.multiplyScalar(t / this.length())
        }, lerp: function (t, e) {
            return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this
        }, lerpVectors: function (t, e, n) {
            return this.subVectors(e, t).multiplyScalar(n).add(t)
        }, cross: function (t, e) {
            if (void 0 !== e)return console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(t, e);
            var n = this.x, i = this.y, r = this.z;
            return this.x = i * t.z - r * t.y, this.y = r * t.x - n * t.z, this.z = n * t.y - i * t.x, this
        }, crossVectors: function (t, e) {
            var n = t.x, i = t.y, r = t.z, o = e.x, a = e.y, s = e.z;
            return this.x = i * s - r * a, this.y = r * o - n * s, this.z = n * a - i * o, this
        }, projectOnVector: function (t) {
            var e = t.dot(this) / t.lengthSq();
            return this.copy(t).multiplyScalar(e)
        }, projectOnPlane: function () {
            var t;
            return function (e) {
                return void 0 === t && (t = new s), t.copy(this).projectOnVector(e), this.sub(t)
            }
        }(), reflect: function () {
            var t;
            return function (e) {
                return void 0 === t && (t = new s), this.sub(t.copy(e).multiplyScalar(2 * this.dot(e)))
            }
        }(), angleTo: function (t) {
            var e = this.dot(t) / Math.sqrt(this.lengthSq() * t.lengthSq());
            return Math.acos(Yc.clamp(e, -1, 1))
        }, distanceTo: function (t) {
            return Math.sqrt(this.distanceToSquared(t))
        }, distanceToSquared: function (t) {
            var e = this.x - t.x, n = this.y - t.y, i = this.z - t.z;
            return e * e + n * n + i * i
        }, distanceToManhattan: function (t) {
            return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z)
        }, setFromSpherical: function (t) {
            var e = Math.sin(t.phi) * t.radius;
            return this.x = e * Math.sin(t.theta), this.y = Math.cos(t.phi) * t.radius, this.z = e * Math.cos(t.theta), this
        }, setFromCylindrical: function (t) {
            return this.x = t.radius * Math.sin(t.theta), this.y = t.y, this.z = t.radius * Math.cos(t.theta), this
        }, setFromMatrixPosition: function (t) {
            return this.setFromMatrixColumn(t, 3)
        }, setFromMatrixScale: function (t) {
            var e = this.setFromMatrixColumn(t, 0).length(), n = this.setFromMatrixColumn(t, 1).length(),
                i = this.setFromMatrixColumn(t, 2).length();
            return this.x = e, this.y = n, this.z = i, this
        }, setFromMatrixColumn: function (t, e) {
            if ("number" == typeof t) {
                console.warn("THREE.Vector3: setFromMatrixColumn now expects ( matrix, index ).");
                var n = t;
                t = e, e = n
            }
            return this.fromArray(t.elements, 4 * e)
        }, equals: function (t) {
            return t.x === this.x && t.y === this.y && t.z === this.z
        }, fromArray: function (t, e) {
            return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this
        }, toArray: function (t, e) {
            return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t
        }, fromBufferAttribute: function (t, e, n) {
            return void 0 !== n && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this
        }
    }, c.prototype = {
        constructor: c, isMatrix4: !0, set: function (t, e, n, i, r, o, a, s, c, h, l, u, p, d, f, m) {
            var g = this.elements;
            return g[0] = t, g[4] = e, g[8] = n, g[12] = i, g[1] = r, g[5] = o, g[9] = a, g[13] = s, g[2] = c, g[6] = h, g[10] = l, g[14] = u, g[3] = p, g[7] = d, g[11] = f, g[15] = m, this
        }, identity: function () {
            return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
        }, clone: function () {
            return (new c).fromArray(this.elements)
        }, copy: function (t) {
            return this.elements.set(t.elements), this
        }, copyPosition: function (t) {
            var e = this.elements, n = t.elements;
            return e[12] = n[12], e[13] = n[13], e[14] = n[14], this
        }, extractBasis: function (t, e, n) {
            return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this
        }, makeBasis: function (t, e, n) {
            return this.set(t.x, e.x, n.x, 0, t.y, e.y, n.y, 0, t.z, e.z, n.z, 0, 0, 0, 0, 1), this
        }, extractRotation: function () {
            var t;
            return function (e) {
                void 0 === t && (t = new s);
                var n = this.elements, i = e.elements, r = 1 / t.setFromMatrixColumn(e, 0).length(),
                    o = 1 / t.setFromMatrixColumn(e, 1).length(), a = 1 / t.setFromMatrixColumn(e, 2).length();
                return n[0] = i[0] * r, n[1] = i[1] * r, n[2] = i[2] * r, n[4] = i[4] * o, n[5] = i[5] * o, n[6] = i[6] * o, n[8] = i[8] * a, n[9] = i[9] * a, n[10] = i[10] * a, this
            }
        }(), makeRotationFromEuler: function (t) {
            (t && t.isEuler) === !1 && console.error("THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
            var e = this.elements, n = t.x, i = t.y, r = t.z, o = Math.cos(n), a = Math.sin(n), s = Math.cos(i),
                c = Math.sin(i), h = Math.cos(r), l = Math.sin(r);
            if ("XYZ" === t.order) {
                var u = o * h, p = o * l, d = a * h, f = a * l;
                e[0] = s * h, e[4] = -s * l, e[8] = c, e[1] = p + d * c, e[5] = u - f * c, e[9] = -a * s, e[2] = f - u * c, e[6] = d + p * c, e[10] = o * s
            } else if ("YXZ" === t.order) {
                var m = s * h, g = s * l, v = c * h, y = c * l;
                e[0] = m + y * a, e[4] = v * a - g, e[8] = o * c, e[1] = o * l, e[5] = o * h, e[9] = -a, e[2] = g * a - v, e[6] = y + m * a, e[10] = o * s
            } else if ("ZXY" === t.order) {
                var m = s * h, g = s * l, v = c * h, y = c * l;
                e[0] = m - y * a, e[4] = -o * l, e[8] = v + g * a, e[1] = g + v * a, e[5] = o * h, e[9] = y - m * a, e[2] = -o * c, e[6] = a, e[10] = o * s
            } else if ("ZYX" === t.order) {
                var u = o * h, p = o * l, d = a * h, f = a * l;
                e[0] = s * h, e[4] = d * c - p, e[8] = u * c + f, e[1] = s * l, e[5] = f * c + u, e[9] = p * c - d, e[2] = -c, e[6] = a * s, e[10] = o * s
            } else if ("YZX" === t.order) {
                var x = o * s, _ = o * c, b = a * s, w = a * c;
                e[0] = s * h, e[4] = w - x * l, e[8] = b * l + _, e[1] = l, e[5] = o * h, e[9] = -a * h, e[2] = -c * h, e[6] = _ * l + b, e[10] = x - w * l
            } else if ("XZY" === t.order) {
                var x = o * s, _ = o * c, b = a * s, w = a * c;
                e[0] = s * h, e[4] = -l, e[8] = c * h, e[1] = x * l + w, e[5] = o * h, e[9] = _ * l - b, e[2] = b * l - _, e[6] = a * h, e[10] = w * l + x
            }
            return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this
        }, makeRotationFromQuaternion: function (t) {
            var e = this.elements, n = t.x, i = t.y, r = t.z, o = t.w, a = n + n, s = i + i, c = r + r, h = n * a,
                l = n * s, u = n * c, p = i * s, d = i * c, f = r * c, m = o * a, g = o * s, v = o * c;
            return e[0] = 1 - (p + f), e[4] = l - v, e[8] = u + g, e[1] = l + v, e[5] = 1 - (h + f), e[9] = d - m, e[2] = u - g, e[6] = d + m, e[10] = 1 - (h + p), e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this
        }, lookAt: function () {
            var t, e, n;
            return function (i, r, o) {
                void 0 === t && (t = new s, e = new s, n = new s);
                var a = this.elements;
                return n.subVectors(i, r).normalize(), 0 === n.lengthSq() && (n.z = 1), t.crossVectors(o, n).normalize(), 0 === t.lengthSq() && (n.z += 1e-4, t.crossVectors(o, n).normalize()), e.crossVectors(n, t), a[0] = t.x, a[4] = e.x, a[8] = n.x, a[1] = t.y, a[5] = e.y, a[9] = n.y, a[2] = t.z, a[6] = e.z, a[10] = n.z, this
            }
        }(), multiply: function (t, e) {
            return void 0 !== e ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(t, e)) : this.multiplyMatrices(this, t)
        }, premultiply: function (t) {
            return this.multiplyMatrices(t, this)
        }, multiplyMatrices: function (t, e) {
            var n = t.elements, i = e.elements, r = this.elements, o = n[0], a = n[4], s = n[8], c = n[12], h = n[1],
                l = n[5], u = n[9], p = n[13], d = n[2], f = n[6], m = n[10], g = n[14], v = n[3], y = n[7], x = n[11],
                _ = n[15], b = i[0], w = i[4], M = i[8], E = i[12], T = i[1], S = i[5], A = i[9], L = i[13], R = i[2],
                P = i[6], C = i[10], N = i[14], I = i[3], U = i[7], D = i[11], O = i[15];
            return r[0] = o * b + a * T + s * R + c * I, r[4] = o * w + a * S + s * P + c * U, r[8] = o * M + a * A + s * C + c * D, r[12] = o * E + a * L + s * N + c * O, r[1] = h * b + l * T + u * R + p * I, r[5] = h * w + l * S + u * P + p * U, r[9] = h * M + l * A + u * C + p * D, r[13] = h * E + l * L + u * N + p * O, r[2] = d * b + f * T + m * R + g * I, r[6] = d * w + f * S + m * P + g * U, r[10] = d * M + f * A + m * C + g * D, r[14] = d * E + f * L + m * N + g * O, r[3] = v * b + y * T + x * R + _ * I, r[7] = v * w + y * S + x * P + _ * U, r[11] = v * M + y * A + x * C + _ * D, r[15] = v * E + y * L + x * N + _ * O, this
        }, multiplyToArray: function (t, e, n) {
            var i = this.elements;
            return this.multiplyMatrices(t, e), n[0] = i[0], n[1] = i[1], n[2] = i[2], n[3] = i[3], n[4] = i[4], n[5] = i[5], n[6] = i[6], n[7] = i[7], n[8] = i[8], n[9] = i[9], n[10] = i[10], n[11] = i[11], n[12] = i[12], n[13] = i[13], n[14] = i[14], n[15] = i[15], this
        }, multiplyScalar: function (t) {
            var e = this.elements;
            return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this
        }, applyToBufferAttribute: function () {
            var t;
            return function (e) {
                void 0 === t && (t = new s);
                for (var n = 0, i = e.count; n < i; n++)t.x = e.getX(n), t.y = e.getY(n), t.z = e.getZ(n), t.applyMatrix4(this), e.setXYZ(n, t.x, t.y, t.z);
                return e
            }
        }(), determinant: function () {
            var t = this.elements, e = t[0], n = t[4], i = t[8], r = t[12], o = t[1], a = t[5], s = t[9], c = t[13],
                h = t[2], l = t[6], u = t[10], p = t[14];
            return t[3] * (+r * s * l - i * c * l - r * a * u + n * c * u + i * a * p - n * s * p) + t[7] * (+e * s * p - e * c * u + r * o * u - i * o * p + i * c * h - r * s * h) + t[11] * (+e * c * l - e * a * p - r * o * l + n * o * p + r * a * h - n * c * h) + t[15] * (-i * a * h - e * s * l + e * a * u + i * o * l - n * o * u + n * s * h)
        }, transpose: function () {
            var t, e = this.elements;
            return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this
        }, setPosition: function (t) {
            var e = this.elements;
            return e[12] = t.x, e[13] = t.y, e[14] = t.z, this
        }, getInverse: function (t, e) {
            var n = this.elements, i = t.elements, r = i[0], o = i[1], a = i[2], s = i[3], c = i[4], h = i[5], l = i[6],
                u = i[7], p = i[8], d = i[9], f = i[10], m = i[11], g = i[12], v = i[13], y = i[14], x = i[15],
                _ = d * y * u - v * f * u + v * l * m - h * y * m - d * l * x + h * f * x,
                b = g * f * u - p * y * u - g * l * m + c * y * m + p * l * x - c * f * x,
                w = p * v * u - g * d * u + g * h * m - c * v * m - p * h * x + c * d * x,
                M = g * d * l - p * v * l - g * h * f + c * v * f + p * h * y - c * d * y,
                E = r * _ + o * b + a * w + s * M;
            if (0 === E) {
                var T = "THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0";
                if (e === !0)throw new Error(T);
                return console.warn(T), this.identity()
            }
            var S = 1 / E;
            return n[0] = _ * S, n[1] = (v * f * s - d * y * s - v * a * m + o * y * m + d * a * x - o * f * x) * S, n[2] = (h * y * s - v * l * s + v * a * u - o * y * u - h * a * x + o * l * x) * S, n[3] = (d * l * s - h * f * s - d * a * u + o * f * u + h * a * m - o * l * m) * S, n[4] = b * S, n[5] = (p * y * s - g * f * s + g * a * m - r * y * m - p * a * x + r * f * x) * S, n[6] = (g * l * s - c * y * s - g * a * u + r * y * u + c * a * x - r * l * x) * S, n[7] = (c * f * s - p * l * s + p * a * u - r * f * u - c * a * m + r * l * m) * S, n[8] = w * S, n[9] = (g * d * s - p * v * s - g * o * m + r * v * m + p * o * x - r * d * x) * S, n[10] = (c * v * s - g * h * s + g * o * u - r * v * u - c * o * x + r * h * x) * S, n[11] = (p * h * s - c * d * s - p * o * u + r * d * u + c * o * m - r * h * m) * S, n[12] = M * S, n[13] = (p * v * a - g * d * a + g * o * f - r * v * f - p * o * y + r * d * y) * S, n[14] = (g * h * a - c * v * a - g * o * l + r * v * l + c * o * y - r * h * y) * S, n[15] = (c * d * a - p * h * a + p * o * l - r * d * l - c * o * f + r * h * f) * S, this
        }, scale: function (t) {
            var e = this.elements, n = t.x, i = t.y, r = t.z;
            return e[0] *= n, e[4] *= i, e[8] *= r, e[1] *= n, e[5] *= i, e[9] *= r, e[2] *= n, e[6] *= i, e[10] *= r, e[3] *= n, e[7] *= i, e[11] *= r, this
        }, getMaxScaleOnAxis: function () {
            var t = this.elements, e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
                n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6], i = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
            return Math.sqrt(Math.max(e, n, i))
        }, makeTranslation: function (t, e, n) {
            return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, n, 0, 0, 0, 1), this
        }, makeRotationX: function (t) {
            var e = Math.cos(t), n = Math.sin(t);
            return this.set(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1), this
        }, makeRotationY: function (t) {
            var e = Math.cos(t), n = Math.sin(t);
            return this.set(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1), this
        }, makeRotationZ: function (t) {
            var e = Math.cos(t), n = Math.sin(t);
            return this.set(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
        }, makeRotationAxis: function (t, e) {
            var n = Math.cos(e), i = Math.sin(e), r = 1 - n, o = t.x, a = t.y, s = t.z, c = r * o, h = r * a;
            return this.set(c * o + n, c * a - i * s, c * s + i * a, 0, c * a + i * s, h * a + n, h * s - i * o, 0, c * s - i * a, h * s + i * o, r * s * s + n, 0, 0, 0, 0, 1), this
        }, makeScale: function (t, e, n) {
            return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this
        }, makeShear: function (t, e, n) {
            return this.set(1, e, n, 0, t, 1, n, 0, t, e, 1, 0, 0, 0, 0, 1), this
        }, compose: function (t, e, n) {
            return this.makeRotationFromQuaternion(e), this.scale(n), this.setPosition(t), this
        }, decompose: function () {
            var t, e;
            return function (n, i, r) {
                void 0 === t && (t = new s, e = new c);
                var o = this.elements, a = t.set(o[0], o[1], o[2]).length(), h = t.set(o[4], o[5], o[6]).length(),
                    l = t.set(o[8], o[9], o[10]).length();
                this.determinant() < 0 && (a = -a), n.x = o[12], n.y = o[13], n.z = o[14], e.elements.set(this.elements);
                var u = 1 / a, p = 1 / h, d = 1 / l;
                return e.elements[0] *= u, e.elements[1] *= u, e.elements[2] *= u, e.elements[4] *= p, e.elements[5] *= p, e.elements[6] *= p, e.elements[8] *= d, e.elements[9] *= d, e.elements[10] *= d, i.setFromRotationMatrix(e), r.x = a, r.y = h, r.z = l, this
            }
        }(), makePerspective: function (t, e, n, i, r, o) {
            void 0 === o && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
            var a = this.elements, s = 2 * r / (e - t), c = 2 * r / (n - i), h = (e + t) / (e - t),
                l = (n + i) / (n - i), u = -(o + r) / (o - r), p = -2 * o * r / (o - r);
            return a[0] = s, a[4] = 0, a[8] = h, a[12] = 0, a[1] = 0, a[5] = c, a[9] = l, a[13] = 0, a[2] = 0, a[6] = 0, a[10] = u, a[14] = p, a[3] = 0, a[7] = 0, a[11] = -1, a[15] = 0, this
        }, makeOrthographic: function (t, e, n, i, r, o) {
            var a = this.elements, s = 1 / (e - t), c = 1 / (n - i), h = 1 / (o - r), l = (e + t) * s, u = (n + i) * c,
                p = (o + r) * h;
            return a[0] = 2 * s, a[4] = 0, a[8] = 0, a[12] = -l, a[1] = 0, a[5] = 2 * c, a[9] = 0, a[13] = -u, a[2] = 0, a[6] = 0, a[10] = -2 * h, a[14] = -p, a[3] = 0, a[7] = 0, a[11] = 0, a[15] = 1, this
        }, equals: function (t) {
            for (var e = this.elements, n = t.elements, i = 0; i < 16; i++)if (e[i] !== n[i])return !1;
            return !0
        }, fromArray: function (t, e) {
            void 0 === e && (e = 0);
            for (var n = 0; n < 16; n++)this.elements[n] = t[n + e];
            return this
        }, toArray: function (t, e) {
            void 0 === t && (t = []), void 0 === e && (e = 0);
            var n = this.elements;
            return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t[e + 9] = n[9], t[e + 10] = n[10], t[e + 11] = n[11], t[e + 12] = n[12], t[e + 13] = n[13], t[e + 14] = n[14], t[e + 15] = n[15], t
        }
    }, h.prototype = Object.create(n.prototype), h.prototype.constructor = h, h.prototype.isCubeTexture = !0, Object.defineProperty(h.prototype, "images", {
        get: function () {
            return this.image
        }, set: function (t) {
            this.image = t
        }
    });
    var Jc = new n, Qc = new h, Kc = [], $c = [];
    G.prototype.setValue = function (t, e) {
        for (var n = this.seq, i = 0, r = n.length; i !== r; ++i) {
            var o = n[i];
            o.setValue(t, e[o.id])
        }
    };
    var th = /([\w\d_]+)(\])?(\[|\.)?/g;
    V.prototype.setValue = function (t, e, n) {
        var i = this.map[e];
        void 0 !== i && i.setValue(t, n, this.renderer)
    }, V.prototype.set = function (t, e, n) {
        var i = this.map[n];
        void 0 !== i && i.setValue(t, e[n], this.renderer)
    }, V.prototype.setOptional = function (t, e, n) {
        var i = e[n];
        void 0 !== i && this.setValue(t, n, i)
    }, V.upload = function (t, e, n, i) {
        for (var r = 0, o = e.length; r !== o; ++r) {
            var a = e[r], s = n[a.id];
            s.needsUpdate !== !1 && a.setValue(t, s.value, i)
        }
    }, V.seqWithValue = function (t, e) {
        for (var n = [], i = 0, r = t.length; i !== r; ++i) {
            var o = t[i];
            o.id in e && n.push(o)
        }
        return n
    };
    var eh = {
        merge: function (t) {
            for (var e = {}, n = 0; n < t.length; n++) {
                var i = this.clone(t[n]);
                for (var r in i)e[r] = i[r]
            }
            return e
        }, clone: function (t) {
            var e = {};
            for (var n in t) {
                e[n] = {};
                for (var i in t[n]) {
                    var r = t[n][i];
                    r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture) ? e[n][i] = r.clone() : Array.isArray(r) ? e[n][i] = r.slice() : e[n][i] = r
                }
            }
            return e
        }
    }, nh = {
        alphamap_fragment: "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif\n",
        alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif\n",
        alphatest_fragment: "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n",
        aomap_fragment: "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif\n",
        aomap_pars_fragment: "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
        begin_vertex: "\nvec3 transformed = vec3( position );\n",
        beginnormal_vertex: "\nvec3 objectNormal = vec3( normal );\n",
        bsdfs: "float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\t\tif( decayExponent > 0.0 ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\t\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\t\tfloat maxDistanceCutoffFactor = pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\t\treturn distanceFalloff * maxDistanceCutoffFactor;\n#else\n\t\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n#endif\n\t\t}\n\t\treturn 1.0;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 ltcTextureCoords( const in GeometricContext geometry, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = (LUT_SIZE - 1.0)/LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5/LUT_SIZE;\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 P = geometry.position;\n\tfloat theta = acos( dot( N, V ) );\n\tvec2 uv = vec2(\n\t\tsqrt( saturate( roughness ) ),\n\t\tsaturate( theta / ( 0.5 * PI ) ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nvoid clipQuadToHorizon( inout vec3 L[5], out int n ) {\n\tint config = 0;\n\tif ( L[0].z > 0.0 ) config += 1;\n\tif ( L[1].z > 0.0 ) config += 2;\n\tif ( L[2].z > 0.0 ) config += 4;\n\tif ( L[3].z > 0.0 ) config += 8;\n\tn = 0;\n\tif ( config == 0 ) {\n\t} else if ( config == 1 ) {\n\t\tn = 3;\n\t\tL[1] = -L[1].z * L[0] + L[0].z * L[1];\n\t\tL[2] = -L[3].z * L[0] + L[0].z * L[3];\n\t} else if ( config == 2 ) {\n\t\tn = 3;\n\t\tL[0] = -L[0].z * L[1] + L[1].z * L[0];\n\t\tL[2] = -L[2].z * L[1] + L[1].z * L[2];\n\t} else if ( config == 3 ) {\n\t\tn = 4;\n\t\tL[2] = -L[2].z * L[1] + L[1].z * L[2];\n\t\tL[3] = -L[3].z * L[0] + L[0].z * L[3];\n\t} else if ( config == 4 ) {\n\t\tn = 3;\n\t\tL[0] = -L[3].z * L[2] + L[2].z * L[3];\n\t\tL[1] = -L[1].z * L[2] + L[2].z * L[1];\n\t} else if ( config == 5 ) {\n\t\tn = 0;\n\t} else if ( config == 6 ) {\n\t\tn = 4;\n\t\tL[0] = -L[0].z * L[1] + L[1].z * L[0];\n\t\tL[3] = -L[3].z * L[2] + L[2].z * L[3];\n\t} else if ( config == 7 ) {\n\t\tn = 5;\n\t\tL[4] = -L[3].z * L[0] + L[0].z * L[3];\n\t\tL[3] = -L[3].z * L[2] + L[2].z * L[3];\n\t} else if ( config == 8 ) {\n\t\tn = 3;\n\t\tL[0] = -L[0].z * L[3] + L[3].z * L[0];\n\t\tL[1] = -L[2].z * L[3] + L[3].z * L[2];\n\t\tL[2] =  L[3];\n\t} else if ( config == 9 ) {\n\t\tn = 4;\n\t\tL[1] = -L[1].z * L[0] + L[0].z * L[1];\n\t\tL[2] = -L[2].z * L[3] + L[3].z * L[2];\n\t} else if ( config == 10 ) {\n\t\tn = 0;\n\t} else if ( config == 11 ) {\n\t\tn = 5;\n\t\tL[4] = L[3];\n\t\tL[3] = -L[2].z * L[3] + L[3].z * L[2];\n\t\tL[2] = -L[2].z * L[1] + L[1].z * L[2];\n\t} else if ( config == 12 ) {\n\t\tn = 4;\n\t\tL[1] = -L[1].z * L[2] + L[2].z * L[1];\n\t\tL[0] = -L[0].z * L[3] + L[3].z * L[0];\n\t} else if ( config == 13 ) {\n\t\tn = 5;\n\t\tL[4] = L[3];\n\t\tL[3] = L[2];\n\t\tL[2] = -L[1].z * L[2] + L[2].z * L[1];\n\t\tL[1] = -L[1].z * L[0] + L[0].z * L[1];\n\t} else if ( config == 14 ) {\n\t\tn = 5;\n\t\tL[4] = -L[0].z * L[3] + L[3].z * L[0];\n\t\tL[0] = -L[0].z * L[1] + L[1].z * L[0];\n\t} else if ( config == 15 ) {\n\t\tn = 4;\n\t}\n\tif ( n == 3 )\n\t\tL[3] = L[0];\n\tif ( n == 4 )\n\t\tL[4] = L[0];\n}\nfloat integrateLtcBrdfOverRectEdge( vec3 v1, vec3 v2 ) {\n\tfloat cosTheta = dot( v1, v2 );\n\tfloat theta = acos( cosTheta );\n\tfloat res = cross( v1, v2 ).z * ( ( theta > 0.001 ) ? theta / sin( theta ) : 1.0 );\n\treturn res;\n}\nvoid initRectPoints( const in vec3 pos, const in vec3 halfWidth, const in vec3 halfHeight, out vec3 rectPoints[4] ) {\n\trectPoints[0] = pos - halfWidth - halfHeight;\n\trectPoints[1] = pos + halfWidth - halfHeight;\n\trectPoints[2] = pos + halfWidth + halfHeight;\n\trectPoints[3] = pos - halfWidth + halfHeight;\n}\nvec3 integrateLtcBrdfOverRect( const in GeometricContext geometry, const in mat3 brdfMat, const in vec3 rectPoints[4] ) {\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 P = geometry.position;\n\tvec3 T1, T2;\n\tT1 = normalize(V - N * dot( V, N ));\n\tT2 = - cross( N, T1 );\n\tmat3 brdfWrtSurface = brdfMat * transpose( mat3( T1, T2, N ) );\n\tvec3 clippedRect[5];\n\tclippedRect[0] = brdfWrtSurface * ( rectPoints[0] - P );\n\tclippedRect[1] = brdfWrtSurface * ( rectPoints[1] - P );\n\tclippedRect[2] = brdfWrtSurface * ( rectPoints[2] - P );\n\tclippedRect[3] = brdfWrtSurface * ( rectPoints[3] - P );\n\tint n;\n\tclipQuadToHorizon(clippedRect, n);\n\tif ( n == 0 )\n\t\treturn vec3( 0, 0, 0 );\n\tclippedRect[0] = normalize( clippedRect[0] );\n\tclippedRect[1] = normalize( clippedRect[1] );\n\tclippedRect[2] = normalize( clippedRect[2] );\n\tclippedRect[3] = normalize( clippedRect[3] );\n\tclippedRect[4] = normalize( clippedRect[4] );\n\tfloat sum = 0.0;\n\tsum += integrateLtcBrdfOverRectEdge( clippedRect[0], clippedRect[1] );\n\tsum += integrateLtcBrdfOverRectEdge( clippedRect[1], clippedRect[2] );\n\tsum += integrateLtcBrdfOverRectEdge( clippedRect[2], clippedRect[3] );\n\tif (n >= 4)\n\t\tsum += integrateLtcBrdfOverRectEdge( clippedRect[3], clippedRect[4] );\n\tif (n == 5)\n\t\tsum += integrateLtcBrdfOverRectEdge( clippedRect[4], clippedRect[0] );\n\tsum = max( 0.0, sum );\n\tvec3 Lo_i = vec3( sum, sum, sum );\n\treturn Lo_i;\n}\nvec3 Rect_Area_Light_Specular_Reflectance(\n\t\tconst in GeometricContext geometry,\n\t\tconst in vec3 lightPos, const in vec3 lightHalfWidth, const in vec3 lightHalfHeight,\n\t\tconst in float roughness,\n\t\tconst in sampler2D ltcMat, const in sampler2D ltcMag ) {\n\tvec3 rectPoints[4];\n\tinitRectPoints( lightPos, lightHalfWidth, lightHalfHeight, rectPoints );\n\tvec2 uv = ltcTextureCoords( geometry, roughness );\n\tvec4 brdfLtcApproxParams, t;\n\tbrdfLtcApproxParams = texture2D( ltcMat, uv );\n\tt = texture2D( ltcMat, uv );\n\tfloat brdfLtcScalar = texture2D( ltcMag, uv ).a;\n\tmat3 brdfLtcApproxMat = mat3(\n\t\tvec3(   1,   0, t.y ),\n\t\tvec3(   0, t.z,   0 ),\n\t\tvec3( t.w,   0, t.x )\n\t);\n\tvec3 specularReflectance = integrateLtcBrdfOverRect( geometry, brdfLtcApproxMat, rectPoints );\n\tspecularReflectance *= brdfLtcScalar;\n\treturn specularReflectance;\n}\nvec3 Rect_Area_Light_Diffuse_Reflectance(\n\t\tconst in GeometricContext geometry,\n\t\tconst in vec3 lightPos, const in vec3 lightHalfWidth, const in vec3 lightHalfHeight ) {\n\tvec3 rectPoints[4];\n\tinitRectPoints( lightPos, lightHalfWidth, lightHalfHeight, rectPoints );\n\tmat3 diffuseBrdfMat = mat3(1);\n\tvec3 diffuseReflectance = integrateLtcBrdfOverRect( geometry, diffuseBrdfMat, rectPoints );\n\treturn diffuseReflectance;\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn specularColor * AB.x + AB.y;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n",
        bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = dFdx( surf_pos );\n\t\tvec3 vSigmaY = dFdy( surf_pos );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif\n",
        clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; ++ i ) {\n\t\tvec4 plane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t\t\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; ++ i ) {\n\t\t\tvec4 plane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t\n\t#endif\n#endif\n",
        clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif\n",
        clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvarying vec3 vViewPosition;\n#endif\n",
        clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n",
        color_fragment: "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",
        color_pars_fragment: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n",
        color_pars_vertex: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",
        color_vertex: "#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif",
        common: "#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transpose( const in mat3 v ) {\n\tmat3 tmp;\n\ttmp[0] = vec3(v[0].x, v[1].x, v[2].x);\n\ttmp[1] = vec3(v[0].y, v[1].y, v[2].y);\n\ttmp[2] = vec3(v[0].z, v[1].z, v[2].z);\n\treturn tmp;\n}\n",
        cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV(vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif\n",
        defaultnormal_vertex: "#ifdef FLIP_SIDED\n\tobjectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;\n",
        displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif\n",
        displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normal * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif\n",
        emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif\n",
        emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif\n",
        encodings_fragment: "  gl_FragColor = linearToOutputTexel( gl_FragColor );\n",
        encodings_pars_fragment: "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( gammaFactor ) ), value.w );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.w );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.xyz * value.w * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat M      = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM            = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat D      = max( maxRange / maxRGB, 1.0 );\n\tD            = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n\tXp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract(Le);\n\tvResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n\treturn vec4( max(vRGB, 0.0), 1.0 );\n}\n",
        envmap_fragment: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\tsampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n\t\tsampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\tvec3 reflectView = flipNormal * normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif\n",
        envmap_pars_fragment: "#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n#ifdef USE_ENVMAP\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif\n",
        envmap_pars_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif\n",
        envmap_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif\n",
        fog_vertex: "\n#ifdef USE_FOG\nfogDepth = -mvPosition.z;\n#endif",
        fog_pars_vertex: "#ifdef USE_FOG\n  varying float fogDepth;\n#endif\n",
        fog_fragment: "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif\n",
        fog_pars_fragment: "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif\n",
        gradientmap_pars_fragment: "#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif\n",
        lightmap_fragment: "#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif\n",
        lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
        lights_lambert_vertex: "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif\n",
        lights_pars: "uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltcMat;\tuniform sampler2D ltcMag;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif\n#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar - 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV(queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent));\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = saturate( reflectVec.y * 0.5 + 0.5 );\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif\n",
        lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n",
        lights_phong_pars_fragment: "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_BlinnPhong( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 matDiffColor = material.diffuseColor;\n\t\tvec3 matSpecColor = material.specularColor;\n\t\tvec3 lightColor   = rectAreaLight.color;\n\t\tfloat roughness = BlinnExponentToGGXRoughness( material.specularShininess );\n\t\tvec3 spec = Rect_Area_Light_Specular_Reflectance(\n\t\t\t\tgeometry,\n\t\t\t\trectAreaLight.position, rectAreaLight.halfWidth, rectAreaLight.halfHeight,\n\t\t\t\troughness,\n\t\t\t\tltcMat, ltcMag );\n\t\tvec3 diff = Rect_Area_Light_Diffuse_Reflectance(\n\t\t\t\tgeometry,\n\t\t\t\trectAreaLight.position, rectAreaLight.halfWidth, rectAreaLight.halfHeight );\n\t\treflectedLight.directSpecular += lightColor * matSpecColor * spec / PI2;\n\t\treflectedLight.directDiffuse  += lightColor * matDiffColor * diff / PI2;\n\t}\n#endif\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)\n",
        lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat );\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n",
        lights_physical_pars_fragment: "struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 matDiffColor = material.diffuseColor;\n\t\tvec3 matSpecColor = material.specularColor;\n\t\tvec3 lightColor   = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 spec = Rect_Area_Light_Specular_Reflectance(\n\t\t\t\tgeometry,\n\t\t\t\trectAreaLight.position, rectAreaLight.halfWidth, rectAreaLight.halfHeight,\n\t\t\t\troughness,\n\t\t\t\tltcMat, ltcMag );\n\t\tvec3 diff = Rect_Area_Light_Diffuse_Reflectance(\n\t\t\t\tgeometry,\n\t\t\t\trectAreaLight.position, rectAreaLight.halfWidth, rectAreaLight.halfHeight );\n\t\treflectedLight.directSpecular += lightColor * matSpecColor * spec;\n\t\treflectedLight.directDiffuse  += lightColor * matDiffColor * diff;\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#ifndef STANDARD\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.indirectSpecular += ( 1.0 - clearCoatDHR ) * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\t#ifndef STANDARD\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}\n",
        lights_template: "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tirradiance += getLightProbeIndirectIrradiance( geometry, 8 );\n\t#endif\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tvec3 radiance = getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), 8 );\n\t#ifndef STANDARD\n\t\tvec3 clearCoatRadiance = getLightProbeIndirectRadiance( geometry, Material_ClearCoat_BlinnShininessExponent( material ), 8 );\n\t#else\n\t\tvec3 clearCoatRadiance = vec3( 0.0 );\n\t#endif\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif\n",
        logdepthbuf_fragment: "#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\tgl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n#endif",
        logdepthbuf_pars_fragment: "#ifdef USE_LOGDEPTHBUF\n\tuniform float logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n#endif\n",
        logdepthbuf_pars_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n\tuniform float logDepthBufFC;\n#endif",
        logdepthbuf_vertex: "#ifdef USE_LOGDEPTHBUF\n\tgl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\t#endif\n#endif\n",
        map_fragment: "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif\n",
        map_pars_fragment: "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n",
        map_particle_fragment: "#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n",
        map_particle_pars_fragment: "#ifdef USE_MAP\n\tuniform vec4 offsetRepeat;\n\tuniform sampler2D map;\n#endif\n",
        metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.r;\n#endif\n",
        metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
        morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif\n",
        morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",
        morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif\n",
        normal_flip: "#ifdef DOUBLE_SIDED\n\tfloat flipNormal = ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n#else\n\tfloat flipNormal = 1.0;\n#endif\n",
        normal_fragment: "#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal ) * flipNormal;\n#endif\n#ifdef USE_NORMALMAP\n\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n",
        normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 S = normalize( q0 * st1.t - q1 * st0.t );\n\t\tvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n\t\tvec3 N = normalize( surf_norm );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif\n",
        packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 1.0 - 2.0 * rgb.xyz;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n",
        premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n",
        project_vertex: "#ifdef USE_SKINNING\n\tvec4 mvPosition = modelViewMatrix * skinned;\n#else\n\tvec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;\n",
        roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.r;\n#endif\n",
        roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
        shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\treturn (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn 1.0;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\tfloat dp = ( length( lightToPosition ) - shadowBias ) / 1000.0;\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif\n",
        shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n#endif\n",
        shadowmap_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif\n",
        shadowmask_pars_fragment: "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tDirectionalLight directionalLight;\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tSpotLight spotLight;\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tPointLight pointLight;\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}\n",
        skinbase_vertex: "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
        skinning_pars_vertex: "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureWidth;\n\t\tuniform int boneTextureHeight;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureWidth ) );\n\t\t\tfloat y = floor( j / float( boneTextureWidth ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureWidth );\n\t\t\tfloat dy = 1.0 / float( boneTextureHeight );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif\n",
        skinning_vertex: "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\tskinned  = bindMatrixInverse * skinned;\n#endif\n",
        skinnormal_vertex: "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif\n",
        specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
        specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
        tonemapping_fragment: "#if defined( TONE_MAPPING )\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif\n",
        tonemapping_pars_fragment: "#define saturate(a) clamp( a, 0.0, 1.0 )\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\n",
        uv_pars_fragment: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif",
        uv_pars_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform vec4 offsetRepeat;\n#endif\n",
        uv_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
        uv2_pars_fragment: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",
        uv2_pars_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif",
        uv2_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif",
        worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( PHYSICAL ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\t#ifdef USE_SKINNING\n\t\tvec4 worldPosition = modelMatrix * skinned;\n\t#else\n\t\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n\t#endif\n#endif\n",
        cube_frag: "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n\tgl_FragColor.a *= opacity;\n}\n",
        cube_vert: "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",
        depth_frag: "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}\n",
        depth_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n",
        distanceRGBA_frag: "uniform vec3 lightPos;\nvarying vec4 vWorldPosition;\n#include <common>\n#include <packing>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tgl_FragColor = packDepthToRGBA( length( vWorldPosition.xyz - lightPos.xyz ) / 1000.0 );\n}\n",
        distanceRGBA_vert: "varying vec4 vWorldPosition;\n#include <common>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <skinbase_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition;\n}\n",
        equirect_frag: "uniform sampler2D tEquirect;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldPosition );\n\tvec2 sampleUV;\n\tsampleUV.y = saturate( tFlip * direction.y * -0.5 + 0.5 );\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n}\n",
        equirect_vert: "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",
        linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
        linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n",
        meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <normal_flip>\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
        meshbasic_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}\n",
        meshlambert_frag: "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <normal_flip>\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
        meshlambert_vert: "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
        meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_flip>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_template>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
        meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
        meshphysical_frag: "#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <lights_pars>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_flip>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_template>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
        meshphysical_vert: "#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
        normal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\t#include <normal_flip>\n\t#include <normal_fragment>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}\n",
        normal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}\n",
        points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
        points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#ifdef USE_SIZEATTENUATION\n\t\tgl_PointSize = size * ( scale / - mvPosition.z );\n\t#else\n\t\tgl_PointSize = size;\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
        shadow_frag: "uniform float opacity;\n#include <common>\n#include <packing>\n#include <bsdfs>\n#include <lights_pars>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( 0.0, 0.0, 0.0, opacity * ( 1.0 - getShadowMask() ) );\n}\n",
        shadow_vert: "#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n}\n"
    };
    j.prototype = {
        constructor: j, isColor: !0, r: 1, g: 1, b: 1, set: function (t) {
            return t && t.isColor ? this.copy(t) : "number" == typeof t ? this.setHex(t) : "string" == typeof t && this.setStyle(t), this
        }, setScalar: function (t) {
            return this.r = t, this.g = t, this.b = t, this
        }, setHex: function (t) {
            return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (255 & t) / 255, this
        }, setRGB: function (t, e, n) {
            return this.r = t, this.g = e, this.b = n, this
        }, setHSL: function () {
            function t(t, e, n) {
                return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + 6 * (e - t) * n : n < .5 ? e : n < 2 / 3 ? t + 6 * (e - t) * (2 / 3 - n) : t
            }

            return function (e, n, i) {
                if (e = Yc.euclideanModulo(e, 1), n = Yc.clamp(n, 0, 1), i = Yc.clamp(i, 0, 1), 0 === n) this.r = this.g = this.b = i; else {
                    var r = i <= .5 ? i * (1 + n) : i + n - i * n, o = 2 * i - r;
                    this.r = t(o, r, e + 1 / 3), this.g = t(o, r, e), this.b = t(o, r, e - 1 / 3)
                }
                return this
            }
        }(), setStyle: function (t) {
            function e(e) {
                void 0 !== e && parseFloat(e) < 1 && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.")
            }

            var n;
            if (n = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(t)) {
                var i, r = n[1], o = n[2];
                switch (r) {
                    case"rgb":
                    case"rgba":
                        if (i = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(o))return this.r = Math.min(255, parseInt(i[1], 10)) / 255, this.g = Math.min(255, parseInt(i[2], 10)) / 255, this.b = Math.min(255, parseInt(i[3], 10)) / 255, e(i[5]), this;
                        if (i = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(o))return this.r = Math.min(100, parseInt(i[1], 10)) / 100, this.g = Math.min(100, parseInt(i[2], 10)) / 100, this.b = Math.min(100, parseInt(i[3], 10)) / 100, e(i[5]), this;
                        break;
                    case"hsl":
                    case"hsla":
                        if (i = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(o)) {
                            var a = parseFloat(i[1]) / 360, s = parseInt(i[2], 10) / 100, c = parseInt(i[3], 10) / 100;
                            return e(i[5]), this.setHSL(a, s, c)
                        }
                }
            } else if (n = /^\#([A-Fa-f0-9]+)$/.exec(t)) {
                var h = n[1], l = h.length;
                if (3 === l)return this.r = parseInt(h.charAt(0) + h.charAt(0), 16) / 255, this.g = parseInt(h.charAt(1) + h.charAt(1), 16) / 255, this.b = parseInt(h.charAt(2) + h.charAt(2), 16) / 255, this;
                if (6 === l)return this.r = parseInt(h.charAt(0) + h.charAt(1), 16) / 255, this.g = parseInt(h.charAt(2) + h.charAt(3), 16) / 255, this.b = parseInt(h.charAt(4) + h.charAt(5), 16) / 255, this
            }
            if (t && t.length > 0) {
                var h = ih[t];
                void 0 !== h ? this.setHex(h) : console.warn("THREE.Color: Unknown color " + t)
            }
            return this
        }, clone: function () {
            return new this.constructor(this.r, this.g, this.b)
        }, copy: function (t) {
            return this.r = t.r, this.g = t.g, this.b = t.b, this
        }, copyGammaToLinear: function (t, e) {
            return void 0 === e && (e = 2), this.r = Math.pow(t.r, e), this.g = Math.pow(t.g, e), this.b = Math.pow(t.b, e), this
        }, copyLinearToGamma: function (t, e) {
            void 0 === e && (e = 2);
            var n = e > 0 ? 1 / e : 1;
            return this.r = Math.pow(t.r, n), this.g = Math.pow(t.g, n), this.b = Math.pow(t.b, n), this
        }, convertGammaToLinear: function () {
            var t = this.r, e = this.g, n = this.b;
            return this.r = t * t, this.g = e * e, this.b = n * n, this
        }, convertLinearToGamma: function () {
            return this.r = Math.sqrt(this.r), this.g = Math.sqrt(this.g), this.b = Math.sqrt(this.b), this
        }, getHex: function () {
            return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
        }, getHexString: function () {
            return ("000000" + this.getHex().toString(16)).slice(-6)
        }, getHSL: function (t) {
            var e, n, i = t || {h: 0, s: 0, l: 0}, r = this.r, o = this.g, a = this.b, s = Math.max(r, o, a),
                c = Math.min(r, o, a), h = (c + s) / 2;
            if (c === s) e = 0, n = 0; else {
                var l = s - c;
                switch (n = h <= .5 ? l / (s + c) : l / (2 - s - c), s) {
                    case r:
                        e = (o - a) / l + (o < a ? 6 : 0);
                        break;
                    case o:
                        e = (a - r) / l + 2;
                        break;
                    case a:
                        e = (r - o) / l + 4
                }
                e /= 6
            }
            return i.h = e, i.s = n, i.l = h, i
        }, getStyle: function () {
            return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
        }, offsetHSL: function (t, e, n) {
            var i = this.getHSL();
            return i.h += t, i.s += e, i.l += n, this.setHSL(i.h, i.s, i.l), this
        }, add: function (t) {
            return this.r += t.r, this.g += t.g, this.b += t.b, this
        }, addColors: function (t, e) {
            return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this
        }, addScalar: function (t) {
            return this.r += t, this.g += t, this.b += t, this
        }, sub: function (t) {
            return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this
        }, multiply: function (t) {
            return this.r *= t.r, this.g *= t.g, this.b *= t.b, this
        }, multiplyScalar: function (t) {
            return this.r *= t, this.g *= t, this.b *= t, this
        }, lerp: function (t, e) {
            return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this
        }, equals: function (t) {
            return t.r === this.r && t.g === this.g && t.b === this.b
        }, fromArray: function (t, e) {
            return void 0 === e && (e = 0), this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this
        }, toArray: function (t, e) {
            return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t
        }, toJSON: function () {
            return this.getHex()
        }
    };
    var ih = {
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    };
    W.prototype = Object.create(n.prototype), W.prototype.constructor = W, W.prototype.isDataTexture = !0;
    var rh = {
        common: {
            diffuse: {value: new j(15658734)},
            opacity: {value: 1},
            map: {value: null},
            offsetRepeat: {value: new i(0, 0, 1, 1)},
            specularMap: {value: null},
            alphaMap: {value: null},
            envMap: {value: null},
            flipEnvMap: {value: -1},
            reflectivity: {value: 1},
            refractionRatio: {value: .98}
        },
        aomap: {aoMap: {value: null}, aoMapIntensity: {value: 1}},
        lightmap: {lightMap: {value: null}, lightMapIntensity: {value: 1}},
        emissivemap: {emissiveMap: {value: null}},
        bumpmap: {bumpMap: {value: null}, bumpScale: {value: 1}},
        normalmap: {normalMap: {value: null}, normalScale: {value: new e(1, 1)}},
        displacementmap: {displacementMap: {value: null}, displacementScale: {value: 1}, displacementBias: {value: 0}},
        roughnessmap: {roughnessMap: {value: null}},
        metalnessmap: {metalnessMap: {value: null}},
        gradientmap: {gradientMap: {value: null}},
        fog: {
            fogDensity: {value: 25e-5},
            fogNear: {value: 1},
            fogFar: {value: 2e3},
            fogColor: {value: new j(16777215)}
        },
        lights: {
            ambientLightColor: {value: []},
            directionalLights: {
                value: [],
                properties: {direction: {}, color: {}, shadow: {}, shadowBias: {}, shadowRadius: {}, shadowMapSize: {}}
            },
            directionalShadowMap: {value: []},
            directionalShadowMatrix: {value: []},
            spotLights: {
                value: [],
                properties: {
                    color: {},
                    position: {},
                    direction: {},
                    distance: {},
                    coneCos: {},
                    penumbraCos: {},
                    decay: {},
                    shadow: {},
                    shadowBias: {},
                    shadowRadius: {},
                    shadowMapSize: {}
                }
            },
            spotShadowMap: {value: []},
            spotShadowMatrix: {value: []},
            pointLights: {
                value: [],
                properties: {
                    color: {},
                    position: {},
                    decay: {},
                    distance: {},
                    shadow: {},
                    shadowBias: {},
                    shadowRadius: {},
                    shadowMapSize: {}
                }
            },
            pointShadowMap: {value: []},
            pointShadowMatrix: {value: []},
            hemisphereLights: {value: [], properties: {direction: {}, skyColor: {}, groundColor: {}}},
            rectAreaLights: {value: [], properties: {color: {}, position: {}, width: {}, height: {}}}
        },
        points: {
            diffuse: {value: new j(15658734)},
            opacity: {value: 1},
            size: {value: 1},
            scale: {value: 1},
            map: {value: null},
            offsetRepeat: {value: new i(0, 0, 1, 1)}
        }
    }, oh = {
        basic: {
            uniforms: eh.merge([rh.common, rh.aomap, rh.lightmap, rh.fog]),
            vertexShader: nh.meshbasic_vert,
            fragmentShader: nh.meshbasic_frag
        },
        lambert: {
            uniforms: eh.merge([rh.common, rh.aomap, rh.lightmap, rh.emissivemap, rh.fog, rh.lights, {emissive: {value: new j(0)}}]),
            vertexShader: nh.meshlambert_vert,
            fragmentShader: nh.meshlambert_frag
        },
        phong: {
            uniforms: eh.merge([rh.common, rh.aomap, rh.lightmap, rh.emissivemap, rh.bumpmap, rh.normalmap, rh.displacementmap, rh.gradientmap, rh.fog, rh.lights, {
                emissive: {value: new j(0)},
                specular: {value: new j(1118481)},
                shininess: {value: 30}
            }]), vertexShader: nh.meshphong_vert, fragmentShader: nh.meshphong_frag
        },
        standard: {
            uniforms: eh.merge([rh.common, rh.aomap, rh.lightmap, rh.emissivemap, rh.bumpmap, rh.normalmap, rh.displacementmap, rh.roughnessmap, rh.metalnessmap, rh.fog, rh.lights, {
                emissive: {value: new j(0)},
                roughness: {value: .5},
                metalness: {value: 0},
                envMapIntensity: {value: 1}
            }]), vertexShader: nh.meshphysical_vert, fragmentShader: nh.meshphysical_frag
        },
        points: {uniforms: eh.merge([rh.points, rh.fog]), vertexShader: nh.points_vert, fragmentShader: nh.points_frag},
        dashed: {
            uniforms: eh.merge([rh.common, rh.fog, {
                scale: {value: 1},
                dashSize: {value: 1},
                totalSize: {value: 2}
            }]), vertexShader: nh.linedashed_vert, fragmentShader: nh.linedashed_frag
        },
        depth: {
            uniforms: eh.merge([rh.common, rh.displacementmap]),
            vertexShader: nh.depth_vert,
            fragmentShader: nh.depth_frag
        },
        normal: {
            uniforms: eh.merge([rh.common, rh.bumpmap, rh.normalmap, rh.displacementmap, {opacity: {value: 1}}]),
            vertexShader: nh.normal_vert,
            fragmentShader: nh.normal_frag
        },
        cube: {
            uniforms: {tCube: {value: null}, tFlip: {value: -1}, opacity: {value: 1}},
            vertexShader: nh.cube_vert,
            fragmentShader: nh.cube_frag
        },
        equirect: {
            uniforms: {tEquirect: {value: null}, tFlip: {value: -1}},
            vertexShader: nh.equirect_vert,
            fragmentShader: nh.equirect_frag
        },
        distanceRGBA: {
            uniforms: {lightPos: {value: new s}},
            vertexShader: nh.distanceRGBA_vert,
            fragmentShader: nh.distanceRGBA_frag
        }
    };
    oh.physical = {
        uniforms: eh.merge([oh.standard.uniforms, {clearCoat: {value: 0}, clearCoatRoughness: {value: 0}}]),
        vertexShader: nh.meshphysical_vert,
        fragmentShader: nh.meshphysical_frag
    }, q.prototype = {
        constructor: q, set: function (t, e) {
            return this.min.copy(t), this.max.copy(e), this
        }, setFromPoints: function (t) {
            this.makeEmpty();
            for (var e = 0, n = t.length; e < n; e++)this.expandByPoint(t[e]);
            return this
        }, setFromCenterAndSize: function () {
            var t = new e;
            return function (e, n) {
                var i = t.copy(n).multiplyScalar(.5);
                return this.min.copy(e).sub(i), this.max.copy(e).add(i), this
            }
        }(), clone: function () {
            return (new this.constructor).copy(this)
        }, copy: function (t) {
            return this.min.copy(t.min), this.max.copy(t.max), this
        }, makeEmpty: function () {
            return this.min.x = this.min.y = +(1 / 0), this.max.x = this.max.y = -(1 / 0), this
        }, isEmpty: function () {
            return this.max.x < this.min.x || this.max.y < this.min.y
        }, getCenter: function (t) {
            var n = t || new e;
            return this.isEmpty() ? n.set(0, 0) : n.addVectors(this.min, this.max).multiplyScalar(.5)
        }, getSize: function (t) {
            var n = t || new e;
            return this.isEmpty() ? n.set(0, 0) : n.subVectors(this.max, this.min)
        }, expandByPoint: function (t) {
            return this.min.min(t), this.max.max(t), this
        }, expandByVector: function (t) {
            return this.min.sub(t), this.max.add(t), this
        }, expandByScalar: function (t) {
            return this.min.addScalar(-t), this.max.addScalar(t), this
        }, containsPoint: function (t) {
            return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y)
        }, containsBox: function (t) {
            return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y
        }, getParameter: function (t, n) {
            return (n || new e).set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y))
        }, intersectsBox: function (t) {
            return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y)
        }, clampPoint: function (t, n) {
            return (n || new e).copy(t).clamp(this.min, this.max)
        }, distanceToPoint: function () {
            var t = new e;
            return function (e) {
                return t.copy(e).clamp(this.min, this.max).sub(e).length()
            }
        }(), intersect: function (t) {
            return this.min.max(t.min), this.max.min(t.max), this
        }, union: function (t) {
            return this.min.min(t.min), this.max.max(t.max), this
        }, translate: function (t) {
            return this.min.add(t), this.max.add(t), this
        }, equals: function (t) {
            return t.min.equals(this.min) && t.max.equals(this.max)
        }
    };
    var ah = 0;
    Z.prototype = {
        constructor: Z, isMaterial: !0, get needsUpdate() {
            return this._needsUpdate
        }, set needsUpdate(t) {
            t === !0 && this.update(), this._needsUpdate = t
        }, setValues: function (t) {
            if (void 0 !== t)for (var e in t) {
                var n = t[e];
                if (void 0 !== n) {
                    var i = this[e];
                    void 0 !== i ? i && i.isColor ? i.set(n) : i && i.isVector3 && n && n.isVector3 ? i.copy(n) : this[e] = "overdraw" === e ? Number(n) : n : console.warn("THREE." + this.type + ": '" + e + "' is not a property of this material.")
                } else console.warn("THREE.Material: '" + e + "' parameter is undefined.")
            }
        }, toJSON: function (t) {
            function e(t) {
                var e = [];
                for (var n in t) {
                    var i = t[n];
                    delete i.metadata, e.push(i)
                }
                return e
            }

            var n = void 0 === t;
            n && (t = {textures: {}, images: {}});
            var i = {metadata: {version: 4.4, type: "Material", generator: "Material.toJSON"}};
            if (i.uuid = this.uuid, i.type = this.type, "" !== this.name && (i.name = this.name), this.color && this.color.isColor && (i.color = this.color.getHex()), void 0 !== this.roughness && (i.roughness = this.roughness), void 0 !== this.metalness && (i.metalness = this.metalness), this.emissive && this.emissive.isColor && (i.emissive = this.emissive.getHex()), this.specular && this.specular.isColor && (i.specular = this.specular.getHex()), void 0 !== this.shininess && (i.shininess = this.shininess), void 0 !== this.clearCoat && (i.clearCoat = this.clearCoat), void 0 !== this.clearCoatRoughness && (i.clearCoatRoughness = this.clearCoatRoughness), this.map && this.map.isTexture && (i.map = this.map.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (i.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (i.lightMap = this.lightMap.toJSON(t).uuid), this.bumpMap && this.bumpMap.isTexture && (i.bumpMap = this.bumpMap.toJSON(t).uuid, i.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (i.normalMap = this.normalMap.toJSON(t).uuid, i.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (i.displacementMap = this.displacementMap.toJSON(t).uuid, i.displacementScale = this.displacementScale, i.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (i.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (i.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (i.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (i.specularMap = this.specularMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (i.envMap = this.envMap.toJSON(t).uuid, i.reflectivity = this.reflectivity), this.gradientMap && this.gradientMap.isTexture && (i.gradientMap = this.gradientMap.toJSON(t).uuid), void 0 !== this.size && (i.size = this.size), void 0 !== this.sizeAttenuation && (i.sizeAttenuation = this.sizeAttenuation), this.blending !== as && (i.blending = this.blending), this.shading !== es && (i.shading = this.shading), this.side !== Qa && (i.side = this.side), this.vertexColors !== ns && (i.vertexColors = this.vertexColors),
                this.opacity < 1 && (i.opacity = this.opacity), this.transparent === !0 && (i.transparent = this.transparent), i.depthFunc = this.depthFunc, i.depthTest = this.depthTest, i.depthWrite = this.depthWrite, this.alphaTest > 0 && (i.alphaTest = this.alphaTest), this.premultipliedAlpha === !0 && (i.premultipliedAlpha = this.premultipliedAlpha), this.wireframe === !0 && (i.wireframe = this.wireframe), this.wireframeLinewidth > 1 && (i.wireframeLinewidth = this.wireframeLinewidth), "round" !== this.wireframeLinecap && (i.wireframeLinecap = this.wireframeLinecap), "round" !== this.wireframeLinejoin && (i.wireframeLinejoin = this.wireframeLinejoin), i.skinning = this.skinning, i.morphTargets = this.morphTargets, n) {
                var r = e(t.textures), o = e(t.images);
                r.length > 0 && (i.textures = r), o.length > 0 && (i.images = o)
            }
            return i
        }, clone: function () {
            return (new this.constructor).copy(this)
        }, copy: function (t) {
            this.name = t.name, this.fog = t.fog, this.lights = t.lights, this.blending = t.blending, this.side = t.side, this.shading = t.shading, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.alphaTest = t.alphaTest, this.premultipliedAlpha = t.premultipliedAlpha, this.overdraw = t.overdraw, this.visible = t.visible, this.clipShadows = t.clipShadows, this.clipIntersection = t.clipIntersection;
            var e = t.clippingPlanes, n = null;
            if (null !== e) {
                var i = e.length;
                n = new Array(i);
                for (var r = 0; r !== i; ++r)n[r] = e[r].clone()
            }
            return this.clippingPlanes = n, this
        }, update: function () {
            this.dispatchEvent({type: "update"})
        }, dispose: function () {
            this.dispatchEvent({type: "dispose"})
        }
    }, Object.assign(Z.prototype, t.prototype), J.prototype = Object.create(Z.prototype), J.prototype.constructor = J, J.prototype.isShaderMaterial = !0, J.prototype.copy = function (t) {
        return Z.prototype.copy.call(this, t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = eh.clone(t.uniforms), this.defines = t.defines, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.lights = t.lights, this.clipping = t.clipping, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this.extensions = t.extensions, this
    }, J.prototype.toJSON = function (t) {
        var e = Z.prototype.toJSON.call(this, t);
        return e.uniforms = this.uniforms, e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader, e
    }, Q.prototype = Object.create(Z.prototype), Q.prototype.constructor = Q, Q.prototype.isMeshDepthMaterial = !0, Q.prototype.copy = function (t) {
        return Z.prototype.copy.call(this, t), this.depthPacking = t.depthPacking, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this
    }, K.prototype = {
        constructor: K, isBox3: !0, set: function (t, e) {
            return this.min.copy(t), this.max.copy(e), this
        }, setFromArray: function (t) {
            for (var e = +(1 / 0), n = +(1 / 0), i = +(1 / 0), r = -(1 / 0), o = -(1 / 0), a = -(1 / 0), s = 0, c = t.length; s < c; s += 3) {
                var h = t[s], l = t[s + 1], u = t[s + 2];
                h < e && (e = h), l < n && (n = l), u < i && (i = u), h > r && (r = h), l > o && (o = l), u > a && (a = u)
            }
            return this.min.set(e, n, i), this.max.set(r, o, a), this
        }, setFromBufferAttribute: function (t) {
            for (var e = +(1 / 0), n = +(1 / 0), i = +(1 / 0), r = -(1 / 0), o = -(1 / 0), a = -(1 / 0), s = 0, c = t.count; s < c; s++) {
                var h = t.getX(s), l = t.getY(s), u = t.getZ(s);
                h < e && (e = h), l < n && (n = l), u < i && (i = u), h > r && (r = h), l > o && (o = l), u > a && (a = u)
            }
            return this.min.set(e, n, i), this.max.set(r, o, a), this
        }, setFromPoints: function (t) {
            this.makeEmpty();
            for (var e = 0, n = t.length; e < n; e++)this.expandByPoint(t[e]);
            return this
        }, setFromCenterAndSize: function () {
            var t = new s;
            return function (e, n) {
                var i = t.copy(n).multiplyScalar(.5);
                return this.min.copy(e).sub(i), this.max.copy(e).add(i), this
            }
        }(), setFromObject: function (t) {
            return this.makeEmpty(), this.expandByObject(t)
        }, clone: function () {
            return (new this.constructor).copy(this)
        }, copy: function (t) {
            return this.min.copy(t.min), this.max.copy(t.max), this
        }, makeEmpty: function () {
            return this.min.x = this.min.y = this.min.z = +(1 / 0), this.max.x = this.max.y = this.max.z = -(1 / 0), this
        }, isEmpty: function () {
            return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
        }, getCenter: function (t) {
            var e = t || new s;
            return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5)
        }, getSize: function (t) {
            var e = t || new s;
            return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min)
        }, expandByPoint: function (t) {
            return this.min.min(t), this.max.max(t), this
        }, expandByVector: function (t) {
            return this.min.sub(t), this.max.add(t), this
        }, expandByScalar: function (t) {
            return this.min.addScalar(-t), this.max.addScalar(t), this
        }, expandByObject: function () {
            var t = new s;
            return function (e) {
                var n = this;
                return e.updateMatrixWorld(!0), e.traverse(function (e) {
                    var i, r, o = e.geometry;
                    if (void 0 !== o)if (o.isGeometry) {
                        var a = o.vertices;
                        for (i = 0, r = a.length; i < r; i++)t.copy(a[i]), t.applyMatrix4(e.matrixWorld), n.expandByPoint(t)
                    } else if (o.isBufferGeometry) {
                        var s = o.attributes.position;
                        if (void 0 !== s)for (i = 0, r = s.count; i < r; i++)t.fromBufferAttribute(s, i).applyMatrix4(e.matrixWorld), n.expandByPoint(t)
                    }
                }), this
            }
        }(), containsPoint: function (t) {
            return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y || t.z < this.min.z || t.z > this.max.z)
        }, containsBox: function (t) {
            return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z
        }, getParameter: function (t, e) {
            return (e || new s).set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z))
        }, intersectsBox: function (t) {
            return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y || t.max.z < this.min.z || t.min.z > this.max.z)
        }, intersectsSphere: function () {
            var t;
            return function (e) {
                return void 0 === t && (t = new s), this.clampPoint(e.center, t), t.distanceToSquared(e.center) <= e.radius * e.radius
            }
        }(), intersectsPlane: function (t) {
            var e, n;
            return t.normal.x > 0 ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= t.constant && n >= t.constant
        }, clampPoint: function (t, e) {
            return (e || new s).copy(t).clamp(this.min, this.max)
        }, distanceToPoint: function () {
            var t = new s;
            return function (e) {
                return t.copy(e).clamp(this.min, this.max).sub(e).length()
            }
        }(), getBoundingSphere: function () {
            var t = new s;
            return function (e) {
                var n = e || new $;
                return this.getCenter(n.center), n.radius = .5 * this.getSize(t).length(), n
            }
        }(), intersect: function (t) {
            return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this
        }, union: function (t) {
            return this.min.min(t.min), this.max.max(t.max), this
        }, applyMatrix4: function () {
            var t = [new s, new s, new s, new s, new s, new s, new s, new s];
            return function (e) {
                return this.isEmpty() ? this : (t[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), t[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), t[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), t[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), t[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), t[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), t[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), t[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(t), this)
            }
        }(), translate: function (t) {
            return this.min.add(t), this.max.add(t), this
        }, equals: function (t) {
            return t.min.equals(this.min) && t.max.equals(this.max)
        }
    }, $.prototype = {
        constructor: $, set: function (t, e) {
            return this.center.copy(t), this.radius = e, this
        }, setFromPoints: function () {
            var t;
            return function (e, n) {
                void 0 === t && (t = new K);
                var i = this.center;
                void 0 !== n ? i.copy(n) : t.setFromPoints(e).getCenter(i);
                for (var r = 0, o = 0, a = e.length; o < a; o++)r = Math.max(r, i.distanceToSquared(e[o]));
                return this.radius = Math.sqrt(r), this
            }
        }(), clone: function () {
            return (new this.constructor).copy(this)
        }, copy: function (t) {
            return this.center.copy(t.center), this.radius = t.radius, this
        }, empty: function () {
            return this.radius <= 0
        }, containsPoint: function (t) {
            return t.distanceToSquared(this.center) <= this.radius * this.radius
        }, distanceToPoint: function (t) {
            return t.distanceTo(this.center) - this.radius
        }, intersectsSphere: function (t) {
            var e = this.radius + t.radius;
            return t.center.distanceToSquared(this.center) <= e * e
        }, intersectsBox: function (t) {
            return t.intersectsSphere(this)
        }, intersectsPlane: function (t) {
            return Math.abs(this.center.dot(t.normal) - t.constant) <= this.radius
        }, clampPoint: function (t, e) {
            var n = this.center.distanceToSquared(t), i = e || new s;
            return i.copy(t), n > this.radius * this.radius && (i.sub(this.center).normalize(), i.multiplyScalar(this.radius).add(this.center)), i
        }, getBoundingBox: function (t) {
            var e = t || new K;
            return e.set(this.center, this.center), e.expandByScalar(this.radius), e
        }, applyMatrix4: function (t) {
            return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this
        }, translate: function (t) {
            return this.center.add(t), this
        }, equals: function (t) {
            return t.center.equals(this.center) && t.radius === this.radius
        }
    }, tt.prototype = {
        constructor: tt, isMatrix3: !0, set: function (t, e, n, i, r, o, a, s, c) {
            var h = this.elements;
            return h[0] = t, h[1] = i, h[2] = a, h[3] = e, h[4] = r, h[5] = s, h[6] = n, h[7] = o, h[8] = c, this
        }, identity: function () {
            return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
        }, clone: function () {
            return (new this.constructor).fromArray(this.elements)
        }, copy: function (t) {
            var e = t.elements;
            return this.set(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]), this
        }, setFromMatrix4: function (t) {
            var e = t.elements;
            return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this
        }, applyToBufferAttribute: function () {
            var t;
            return function (e) {
                void 0 === t && (t = new s);
                for (var n = 0, i = e.count; n < i; n++)t.x = e.getX(n), t.y = e.getY(n), t.z = e.getZ(n), t.applyMatrix3(this), e.setXYZ(n, t.x, t.y, t.z);
                return e
            }
        }(), multiplyScalar: function (t) {
            var e = this.elements;
            return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this
        }, determinant: function () {
            var t = this.elements, e = t[0], n = t[1], i = t[2], r = t[3], o = t[4], a = t[5], s = t[6], c = t[7],
                h = t[8];
            return e * o * h - e * a * c - n * r * h + n * a * s + i * r * c - i * o * s
        }, getInverse: function (t, e) {
            t && t.isMatrix4 && console.error("THREE.Matrix3.getInverse no longer takes a Matrix4 argument.");
            var n = t.elements, i = this.elements, r = n[0], o = n[1], a = n[2], s = n[3], c = n[4], h = n[5], l = n[6],
                u = n[7], p = n[8], d = p * c - h * u, f = h * l - p * s, m = u * s - c * l, g = r * d + o * f + a * m;
            if (0 === g) {
                var v = "THREE.Matrix3.getInverse(): can't invert matrix, determinant is 0";
                if (e === !0)throw new Error(v);
                return console.warn(v), this.identity()
            }
            var y = 1 / g;
            return i[0] = d * y, i[1] = (a * u - p * o) * y, i[2] = (h * o - a * c) * y, i[3] = f * y, i[4] = (p * r - a * l) * y, i[5] = (a * s - h * r) * y, i[6] = m * y, i[7] = (o * l - u * r) * y, i[8] = (c * r - o * s) * y, this
        }, transpose: function () {
            var t, e = this.elements;
            return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this
        }, getNormalMatrix: function (t) {
            return this.setFromMatrix4(t).getInverse(this).transpose()
        }, transposeIntoArray: function (t) {
            var e = this.elements;
            return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this
        }, fromArray: function (t, e) {
            void 0 === e && (e = 0);
            for (var n = 0; n < 9; n++)this.elements[n] = t[n + e];
            return this
        }, toArray: function (t, e) {
            void 0 === t && (t = []), void 0 === e && (e = 0);
            var n = this.elements;
            return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t
        }
    }, et.prototype = {
        constructor: et, set: function (t, e) {
            return this.normal.copy(t), this.constant = e, this
        }, setComponents: function (t, e, n, i) {
            return this.normal.set(t, e, n), this.constant = i, this
        }, setFromNormalAndCoplanarPoint: function (t, e) {
            return this.normal.copy(t), this.constant = -e.dot(this.normal), this
        }, setFromCoplanarPoints: function () {
            var t = new s, e = new s;
            return function (n, i, r) {
                var o = t.subVectors(r, i).cross(e.subVectors(n, i)).normalize();
                return this.setFromNormalAndCoplanarPoint(o, n), this
            }
        }(), clone: function () {
            return (new this.constructor).copy(this)
        }, copy: function (t) {
            return this.normal.copy(t.normal), this.constant = t.constant, this
        }, normalize: function () {
            var t = 1 / this.normal.length();
            return this.normal.multiplyScalar(t), this.constant *= t, this
        }, negate: function () {
            return this.constant *= -1, this.normal.negate(), this
        }, distanceToPoint: function (t) {
            return this.normal.dot(t) + this.constant
        }, distanceToSphere: function (t) {
            return this.distanceToPoint(t.center) - t.radius
        }, projectPoint: function (t, e) {
            return this.orthoPoint(t, e).sub(t).negate()
        }, orthoPoint: function (t, e) {
            var n = this.distanceToPoint(t);
            return (e || new s).copy(this.normal).multiplyScalar(n)
        }, intersectLine: function () {
            var t = new s;
            return function (e, n) {
                var i = n || new s, r = e.delta(t), o = this.normal.dot(r);
                if (0 !== o) {
                    var a = -(e.start.dot(this.normal) + this.constant) / o;
                    if (!(a < 0 || a > 1))return i.copy(r).multiplyScalar(a).add(e.start)
                } else if (0 === this.distanceToPoint(e.start))return i.copy(e.start)
            }
        }(), intersectsLine: function (t) {
            var e = this.distanceToPoint(t.start), n = this.distanceToPoint(t.end);
            return e < 0 && n > 0 || n < 0 && e > 0
        }, intersectsBox: function (t) {
            return t.intersectsPlane(this)
        }, intersectsSphere: function (t) {
            return t.intersectsPlane(this)
        }, coplanarPoint: function (t) {
            return (t || new s).copy(this.normal).multiplyScalar(-this.constant)
        }, applyMatrix4: function () {
            var t = new s, e = new tt;
            return function (n, i) {
                var r = this.coplanarPoint(t).applyMatrix4(n), o = i || e.getNormalMatrix(n),
                    a = this.normal.applyMatrix3(o).normalize();
                return this.constant = -r.dot(a), this
            }
        }(), translate: function (t) {
            return this.constant = this.constant - t.dot(this.normal), this
        }, equals: function (t) {
            return t.normal.equals(this.normal) && t.constant === this.constant
        }
    }, nt.prototype = {
        constructor: nt, set: function (t, e, n, i, r, o) {
            var a = this.planes;
            return a[0].copy(t), a[1].copy(e), a[2].copy(n), a[3].copy(i), a[4].copy(r), a[5].copy(o), this
        }, clone: function () {
            return (new this.constructor).copy(this)
        }, copy: function (t) {
            for (var e = this.planes, n = 0; n < 6; n++)e[n].copy(t.planes[n]);
            return this
        }, setFromMatrix: function (t) {
            var e = this.planes, n = t.elements, i = n[0], r = n[1], o = n[2], a = n[3], s = n[4], c = n[5], h = n[6],
                l = n[7], u = n[8], p = n[9], d = n[10], f = n[11], m = n[12], g = n[13], v = n[14], y = n[15];
            return e[0].setComponents(a - i, l - s, f - u, y - m).normalize(), e[1].setComponents(a + i, l + s, f + u, y + m).normalize(), e[2].setComponents(a + r, l + c, f + p, y + g).normalize(), e[3].setComponents(a - r, l - c, f - p, y - g).normalize(), e[4].setComponents(a - o, l - h, f - d, y - v).normalize(), e[5].setComponents(a + o, l + h, f + d, y + v).normalize(), this
        }, intersectsObject: function () {
            var t = new $;
            return function (e) {
                var n = e.geometry;
                return null === n.boundingSphere && n.computeBoundingSphere(), t.copy(n.boundingSphere).applyMatrix4(e.matrixWorld), this.intersectsSphere(t)
            }
        }(), intersectsSprite: function () {
            var t = new $;
            return function (e) {
                return t.center.set(0, 0, 0), t.radius = .7071067811865476, t.applyMatrix4(e.matrixWorld), this.intersectsSphere(t)
            }
        }(), intersectsSphere: function (t) {
            for (var e = this.planes, n = t.center, i = -t.radius, r = 0; r < 6; r++) {
                if (e[r].distanceToPoint(n) < i)return !1
            }
            return !0
        }, intersectsBox: function () {
            var t = new s, e = new s;
            return function (n) {
                for (var i = this.planes, r = 0; r < 6; r++) {
                    var o = i[r];
                    t.x = o.normal.x > 0 ? n.min.x : n.max.x, e.x = o.normal.x > 0 ? n.max.x : n.min.x, t.y = o.normal.y > 0 ? n.min.y : n.max.y, e.y = o.normal.y > 0 ? n.max.y : n.min.y, t.z = o.normal.z > 0 ? n.min.z : n.max.z, e.z = o.normal.z > 0 ? n.max.z : n.min.z;
                    var a = o.distanceToPoint(t), s = o.distanceToPoint(e);
                    if (a < 0 && s < 0)return !1
                }
                return !0
            }
        }(), containsPoint: function (t) {
            for (var e = this.planes, n = 0; n < 6; n++)if (e[n].distanceToPoint(t) < 0)return !1;
            return !0
        }
    }, rt.prototype = {
        constructor: rt, set: function (t, e) {
            return this.origin.copy(t), this.direction.copy(e), this
        }, clone: function () {
            return (new this.constructor).copy(this)
        }, copy: function (t) {
            return this.origin.copy(t.origin), this.direction.copy(t.direction), this
        }, at: function (t, e) {
            return (e || new s).copy(this.direction).multiplyScalar(t).add(this.origin)
        }, lookAt: function (t) {
            return this.direction.copy(t).sub(this.origin).normalize(), this
        }, recast: function () {
            var t = new s;
            return function (e) {
                return this.origin.copy(this.at(e, t)), this
            }
        }(), closestPointToPoint: function (t, e) {
            var n = e || new s;
            n.subVectors(t, this.origin);
            var i = n.dot(this.direction);
            return i < 0 ? n.copy(this.origin) : n.copy(this.direction).multiplyScalar(i).add(this.origin)
        }, distanceToPoint: function (t) {
            return Math.sqrt(this.distanceSqToPoint(t))
        }, distanceSqToPoint: function () {
            var t = new s;
            return function (e) {
                var n = t.subVectors(e, this.origin).dot(this.direction);
                return n < 0 ? this.origin.distanceToSquared(e) : (t.copy(this.direction).multiplyScalar(n).add(this.origin), t.distanceToSquared(e))
            }
        }(), distanceSqToSegment: function () {
            var t = new s, e = new s, n = new s;
            return function (i, r, o, a) {
                t.copy(i).add(r).multiplyScalar(.5), e.copy(r).sub(i).normalize(), n.copy(this.origin).sub(t);
                var s, c, h, l, u = .5 * i.distanceTo(r), p = -this.direction.dot(e), d = n.dot(this.direction),
                    f = -n.dot(e), m = n.lengthSq(), g = Math.abs(1 - p * p);
                if (g > 0)if (s = p * f - d, c = p * d - f, l = u * g, s >= 0)if (c >= -l)if (c <= l) {
                    var v = 1 / g;
                    s *= v, c *= v, h = s * (s + p * c + 2 * d) + c * (p * s + c + 2 * f) + m
                } else c = u, s = Math.max(0, -(p * c + d)), h = -s * s + c * (c + 2 * f) + m; else c = -u, s = Math.max(0, -(p * c + d)), h = -s * s + c * (c + 2 * f) + m; else c <= -l ? (s = Math.max(0, -(-p * u + d)), c = s > 0 ? -u : Math.min(Math.max(-u, -f), u), h = -s * s + c * (c + 2 * f) + m) : c <= l ? (s = 0, c = Math.min(Math.max(-u, -f), u), h = c * (c + 2 * f) + m) : (s = Math.max(0, -(p * u + d)), c = s > 0 ? u : Math.min(Math.max(-u, -f), u), h = -s * s + c * (c + 2 * f) + m); else c = p > 0 ? -u : u, s = Math.max(0, -(p * c + d)), h = -s * s + c * (c + 2 * f) + m;
                return o && o.copy(this.direction).multiplyScalar(s).add(this.origin), a && a.copy(e).multiplyScalar(c).add(t), h
            }
        }(), intersectSphere: function () {
            var t = new s;
            return function (e, n) {
                t.subVectors(e.center, this.origin);
                var i = t.dot(this.direction), r = t.dot(t) - i * i, o = e.radius * e.radius;
                if (r > o)return null;
                var a = Math.sqrt(o - r), s = i - a, c = i + a;
                return s < 0 && c < 0 ? null : s < 0 ? this.at(c, n) : this.at(s, n)
            }
        }(), intersectsSphere: function (t) {
            return this.distanceToPoint(t.center) <= t.radius
        }, distanceToPlane: function (t) {
            var e = t.normal.dot(this.direction);
            if (0 === e)return 0 === t.distanceToPoint(this.origin) ? 0 : null;
            var n = -(this.origin.dot(t.normal) + t.constant) / e;
            return n >= 0 ? n : null
        }, intersectPlane: function (t, e) {
            var n = this.distanceToPlane(t);
            return null === n ? null : this.at(n, e)
        }, intersectsPlane: function (t) {
            var e = t.distanceToPoint(this.origin);
            return 0 === e || t.normal.dot(this.direction) * e < 0
        }, intersectBox: function (t, e) {
            var n, i, r, o, a, s, c = 1 / this.direction.x, h = 1 / this.direction.y, l = 1 / this.direction.z,
                u = this.origin;
            return c >= 0 ? (n = (t.min.x - u.x) * c, i = (t.max.x - u.x) * c) : (n = (t.max.x - u.x) * c, i = (t.min.x - u.x) * c), h >= 0 ? (r = (t.min.y - u.y) * h, o = (t.max.y - u.y) * h) : (r = (t.max.y - u.y) * h, o = (t.min.y - u.y) * h), n > o || r > i ? null : ((r > n || n !== n) && (n = r), (o < i || i !== i) && (i = o), l >= 0 ? (a = (t.min.z - u.z) * l, s = (t.max.z - u.z) * l) : (a = (t.max.z - u.z) * l, s = (t.min.z - u.z) * l), n > s || a > i ? null : ((a > n || n !== n) && (n = a), (s < i || i !== i) && (i = s), i < 0 ? null : this.at(n >= 0 ? n : i, e)))
        }, intersectsBox: function () {
            var t = new s;
            return function (e) {
                return null !== this.intersectBox(e, t)
            }
        }(), intersectTriangle: function () {
            var t = new s, e = new s, n = new s, i = new s;
            return function (r, o, a, s, c) {
                e.subVectors(o, r), n.subVectors(a, r), i.crossVectors(e, n);
                var h, l = this.direction.dot(i);
                if (l > 0) {
                    if (s)return null;
                    h = 1
                } else {
                    if (!(l < 0))return null;
                    h = -1, l = -l
                }
                t.subVectors(this.origin, r);
                var u = h * this.direction.dot(n.crossVectors(t, n));
                if (u < 0)return null;
                var p = h * this.direction.dot(e.cross(t));
                if (p < 0)return null;
                if (u + p > l)return null;
                var d = -h * t.dot(i);
                return d < 0 ? null : this.at(d / l, c)
            }
        }(), applyMatrix4: function (t) {
            return this.direction.add(this.origin).applyMatrix4(t), this.origin.applyMatrix4(t), this.direction.sub(this.origin), this.direction.normalize(), this
        }, equals: function (t) {
            return t.origin.equals(this.origin) && t.direction.equals(this.direction)
        }
    }, ot.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"], ot.DefaultOrder = "XYZ", ot.prototype = {
        constructor: ot,
        isEuler: !0,
        get x() {
            return this._x
        },
        set x(t) {
            this._x = t, this.onChangeCallback()
        },
        get y() {
            return this._y
        },
        set y(t) {
            this._y = t, this.onChangeCallback()
        },
        get z() {
            return this._z
        },
        set z(t) {
            this._z = t, this.onChangeCallback()
        },
        get order() {
            return this._order
        },
        set order(t) {
            this._order = t, this.onChangeCallback()
        },
        set: function (t, e, n, i) {
            return this._x = t, this._y = e, this._z = n, this._order = i || this._order, this.onChangeCallback(), this
        },
        clone: function () {
            return new this.constructor(this._x, this._y, this._z, this._order)
        },
        copy: function (t) {
            return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this.onChangeCallback(), this
        },
        setFromRotationMatrix: function (t, e, n) {
            var i = Yc.clamp, r = t.elements, o = r[0], a = r[4], s = r[8], c = r[1], h = r[5], l = r[9], u = r[2],
                p = r[6], d = r[10];
            return e = e || this._order, "XYZ" === e ? (this._y = Math.asin(i(s, -1, 1)), Math.abs(s) < .99999 ? (this._x = Math.atan2(-l, d), this._z = Math.atan2(-a, o)) : (this._x = Math.atan2(p, h), this._z = 0)) : "YXZ" === e ? (this._x = Math.asin(-i(l, -1, 1)), Math.abs(l) < .99999 ? (this._y = Math.atan2(s, d), this._z = Math.atan2(c, h)) : (this._y = Math.atan2(-u, o), this._z = 0)) : "ZXY" === e ? (this._x = Math.asin(i(p, -1, 1)), Math.abs(p) < .99999 ? (this._y = Math.atan2(-u, d), this._z = Math.atan2(-a, h)) : (this._y = 0, this._z = Math.atan2(c, o))) : "ZYX" === e ? (this._y = Math.asin(-i(u, -1, 1)), Math.abs(u) < .99999 ? (this._x = Math.atan2(p, d), this._z = Math.atan2(c, o)) : (this._x = 0, this._z = Math.atan2(-a, h))) : "YZX" === e ? (this._z = Math.asin(i(c, -1, 1)), Math.abs(c) < .99999 ? (this._x = Math.atan2(-l, h), this._y = Math.atan2(-u, o)) : (this._x = 0, this._y = Math.atan2(s, d))) : "XZY" === e ? (this._z = Math.asin(-i(a, -1, 1)), Math.abs(a) < .99999 ? (this._x = Math.atan2(p, h), this._y = Math.atan2(s, o)) : (this._x = Math.atan2(-l, d), this._y = 0)) : console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + e), this._order = e, n !== !1 && this.onChangeCallback(), this
        },
        setFromQuaternion: function () {
            var t;
            return function (e, n, i) {
                return void 0 === t && (t = new c), t.makeRotationFromQuaternion(e), this.setFromRotationMatrix(t, n, i)
            }
        }(),
        setFromVector3: function (t, e) {
            return this.set(t.x, t.y, t.z, e || this._order)
        },
        reorder: function () {
            var t = new a;
            return function (e) {
                return t.setFromEuler(this), this.setFromQuaternion(t, e)
            }
        }(),
        equals: function (t) {
            return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order
        },
        fromArray: function (t) {
            return this._x = t[0], this._y = t[1], this._z = t[2], void 0 !== t[3] && (this._order = t[3]), this.onChangeCallback(), this
        },
        toArray: function (t, e) {
            return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t
        },
        toVector3: function (t) {
            return t ? t.set(this._x, this._y, this._z) : new s(this._x, this._y, this._z)
        },
        onChange: function (t) {
            return this.onChangeCallback = t, this
        },
        onChangeCallback: function () {
        }
    }, at.prototype = {
        constructor: at, set: function (t) {
            this.mask = 1 << t
        }, enable: function (t) {
            this.mask |= 1 << t
        }, toggle: function (t) {
            this.mask ^= 1 << t
        }, disable: function (t) {
            this.mask &= ~(1 << t)
        }, test: function (t) {
            return 0 != (this.mask & t.mask)
        }
    };
    var sh = 0;
    st.DefaultUp = new s(0, 1, 0), st.DefaultMatrixAutoUpdate = !0, st.prototype = {
        constructor: st,
        isObject3D: !0,
        applyMatrix: function (t) {
            this.matrix.multiplyMatrices(t, this.matrix), this.matrix.decompose(this.position, this.quaternion, this.scale)
        },
        setRotationFromAxisAngle: function (t, e) {
            this.quaternion.setFromAxisAngle(t, e)
        },
        setRotationFromEuler: function (t) {
            this.quaternion.setFromEuler(t, !0)
        },
        setRotationFromMatrix: function (t) {
            this.quaternion.setFromRotationMatrix(t)
        },
        setRotationFromQuaternion: function (t) {
            this.quaternion.copy(t)
        },
        rotateOnAxis: function () {
            var t = new a;
            return function (e, n) {
                return t.setFromAxisAngle(e, n), this.quaternion.multiply(t), this
            }
        }(),
        rotateX: function () {
            var t = new s(1, 0, 0);
            return function (e) {
                return this.rotateOnAxis(t, e)
            }
        }(),
        rotateY: function () {
            var t = new s(0, 1, 0);
            return function (e) {
                return this.rotateOnAxis(t, e)
            }
        }(),
        rotateZ: function () {
            var t = new s(0, 0, 1);
            return function (e) {
                return this.rotateOnAxis(t, e)
            }
        }(),
        translateOnAxis: function () {
            var t = new s;
            return function (e, n) {
                return t.copy(e).applyQuaternion(this.quaternion), this.position.add(t.multiplyScalar(n)), this
            }
        }(),
        translateX: function () {
            var t = new s(1, 0, 0);
            return function (e) {
                return this.translateOnAxis(t, e)
            }
        }(),
        translateY: function () {
            var t = new s(0, 1, 0);
            return function (e) {
                return this.translateOnAxis(t, e)
            }
        }(),
        translateZ: function () {
            var t = new s(0, 0, 1);
            return function (e) {
                return this.translateOnAxis(t, e)
            }
        }(),
        localToWorld: function (t) {
            return t.applyMatrix4(this.matrixWorld)
        },
        worldToLocal: function () {
            var t = new c;
            return function (e) {
                return e.applyMatrix4(t.getInverse(this.matrixWorld))
            }
        }(),
        lookAt: function () {
            var t = new c;
            return function (e) {
                t.lookAt(e, this.position, this.up), this.quaternion.setFromRotationMatrix(t)
            }
        }(),
        add: function (t) {
            if (arguments.length > 1) {
                for (var e = 0; e < arguments.length; e++)this.add(arguments[e]);
                return this
            }
            return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (null !== t.parent && t.parent.remove(t), t.parent = this, t.dispatchEvent({type: "added"}), this.children.push(t)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this)
        },
        remove: function (t) {
            if (arguments.length > 1)for (var e = 0; e < arguments.length; e++)this.remove(arguments[e]);
            var n = this.children.indexOf(t);
            n !== -1 && (t.parent = null, t.dispatchEvent({type: "removed"}), this.children.splice(n, 1))
        },
        getObjectById: function (t) {
            return this.getObjectByProperty("id", t)
        },
        getObjectByName: function (t) {
            return this.getObjectByProperty("name", t)
        },
        getObjectByProperty: function (t, e) {
            if (this[t] === e)return this;
            for (var n = 0, i = this.children.length; n < i; n++) {
                var r = this.children[n], o = r.getObjectByProperty(t, e);
                if (void 0 !== o)return o
            }
        },
        getWorldPosition: function (t) {
            var e = t || new s;
            return this.updateMatrixWorld(!0), e.setFromMatrixPosition(this.matrixWorld)
        },
        getWorldQuaternion: function () {
            var t = new s, e = new s;
            return function (n) {
                var i = n || new a;
                return this.updateMatrixWorld(!0), this.matrixWorld.decompose(t, i, e), i
            }
        }(),
        getWorldRotation: function () {
            var t = new a;
            return function (e) {
                var n = e || new ot;
                return this.getWorldQuaternion(t), n.setFromQuaternion(t, this.rotation.order, !1)
            }
        }(),
        getWorldScale: function () {
            var t = new s, e = new a;
            return function (n) {
                var i = n || new s;
                return this.updateMatrixWorld(!0), this.matrixWorld.decompose(t, e, i), i
            }
        }(),
        getWorldDirection: function () {
            var t = new a;
            return function (e) {
                var n = e || new s;
                return this.getWorldQuaternion(t), n.set(0, 0, 1).applyQuaternion(t)
            }
        }(),
        raycast: function () {
        },
        traverse: function (t) {
            t(this);
            for (var e = this.children, n = 0, i = e.length; n < i; n++)e[n].traverse(t)
        },
        traverseVisible: function (t) {
            if (this.visible !== !1) {
                t(this);
                for (var e = this.children, n = 0, i = e.length; n < i; n++)e[n].traverseVisible(t)
            }
        },
        traverseAncestors: function (t) {
            var e = this.parent;
            null !== e && (t(e), e.traverseAncestors(t))
        },
        updateMatrix: function () {
            this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
        },
        updateMatrixWorld: function (t) {
            this.matrixAutoUpdate === !0 && this.updateMatrix(), this.matrixWorldNeedsUpdate !== !0 && t !== !0 || (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, t = !0);
            for (var e = this.children, n = 0, i = e.length; n < i; n++)e[n].updateMatrixWorld(t)
        },
        toJSON: function (t) {
            function e(t) {
                var e = [];
                for (var n in t) {
                    var i = t[n];
                    delete i.metadata, e.push(i)
                }
                return e
            }

            var n = void 0 === t || "" === t, i = {};
            n && (t = {geometries: {}, materials: {}, textures: {}, images: {}}, i.metadata = {
                version: 4.4,
                type: "Object",
                generator: "Object3D.toJSON"
            });
            var r = {};
            if (r.uuid = this.uuid, r.type = this.type, "" !== this.name && (r.name = this.name), "{}" !== JSON.stringify(this.userData) && (r.userData = this.userData), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), r.matrix = this.matrix.toArray(), void 0 !== this.geometry && (void 0 === t.geometries[this.geometry.uuid] && (t.geometries[this.geometry.uuid] = this.geometry.toJSON(t)), r.geometry = this.geometry.uuid), void 0 !== this.material && (void 0 === t.materials[this.material.uuid] && (t.materials[this.material.uuid] = this.material.toJSON(t)), r.material = this.material.uuid), this.children.length > 0) {
                r.children = [];
                for (var o = 0; o < this.children.length; o++)r.children.push(this.children[o].toJSON(t).object)
            }
            if (n) {
                var a = e(t.geometries), s = e(t.materials), c = e(t.textures), h = e(t.images);
                a.length > 0 && (i.geometries = a), s.length > 0 && (i.materials = s), c.length > 0 && (i.textures = c), h.length > 0 && (i.images = h)
            }
            return i.object = r, i
        },
        clone: function (t) {
            return (new this.constructor).copy(this, t)
        },
        copy: function (t, e) {
            if (void 0 === e && (e = !0), this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.userData = JSON.parse(JSON.stringify(t.userData)), e === !0)for (var n = 0; n < t.children.length; n++) {
                var i = t.children[n];
                this.add(i.clone())
            }
            return this
        }
    }, Object.assign(st.prototype, t.prototype), ct.prototype = {
        constructor: ct, set: function (t, e) {
            return this.start.copy(t), this.end.copy(e), this
        }, clone: function () {
            return (new this.constructor).copy(this)
        }, copy: function (t) {
            return this.start.copy(t.start), this.end.copy(t.end), this
        }, getCenter: function (t) {
            return (t || new s).addVectors(this.start, this.end).multiplyScalar(.5)
        }, delta: function (t) {
            return (t || new s).subVectors(this.end, this.start)
        }, distanceSq: function () {
            return this.start.distanceToSquared(this.end)
        }, distance: function () {
            return this.start.distanceTo(this.end)
        }, at: function (t, e) {
            var n = e || new s;
            return this.delta(n).multiplyScalar(t).add(this.start)
        }, closestPointToPointParameter: function () {
            var t = new s, e = new s;
            return function (n, i) {
                t.subVectors(n, this.start), e.subVectors(this.end, this.start);
                var r = e.dot(e), o = e.dot(t), a = o / r;
                return i && (a = Yc.clamp(a, 0, 1)), a
            }
        }(), closestPointToPoint: function (t, e, n) {
            var i = this.closestPointToPointParameter(t, e), r = n || new s;
            return this.delta(r).multiplyScalar(i).add(this.start)
        }, applyMatrix4: function (t) {
            return this.start.applyMatrix4(t), this.end.applyMatrix4(t), this
        }, equals: function (t) {
            return t.start.equals(this.start) && t.end.equals(this.end)
        }
    }, ht.normal = function () {
        var t = new s;
        return function (e, n, i, r) {
            var o = r || new s;
            o.subVectors(i, n), t.subVectors(e, n), o.cross(t);
            var a = o.lengthSq();
            return a > 0 ? o.multiplyScalar(1 / Math.sqrt(a)) : o.set(0, 0, 0)
        }
    }(), ht.barycoordFromPoint = function () {
        var t = new s, e = new s, n = new s;
        return function (i, r, o, a, c) {
            t.subVectors(a, r), e.subVectors(o, r), n.subVectors(i, r);
            var h = t.dot(t), l = t.dot(e), u = t.dot(n), p = e.dot(e), d = e.dot(n), f = h * p - l * l, m = c || new s;
            if (0 === f)return m.set(-2, -1, -1);
            var g = 1 / f, v = (p * u - l * d) * g, y = (h * d - l * u) * g;
            return m.set(1 - v - y, y, v)
        }
    }(), ht.containsPoint = function () {
        var t = new s;
        return function (e, n, i, r) {
            var o = ht.barycoordFromPoint(e, n, i, r, t);
            return o.x >= 0 && o.y >= 0 && o.x + o.y <= 1
        }
    }(), ht.prototype = {
        constructor: ht, set: function (t, e, n) {
            return this.a.copy(t), this.b.copy(e), this.c.copy(n), this
        }, setFromPointsAndIndices: function (t, e, n, i) {
            return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[i]), this
        }, clone: function () {
            return (new this.constructor).copy(this)
        }, copy: function (t) {
            return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this
        }, area: function () {
            var t = new s, e = new s;
            return function () {
                return t.subVectors(this.c, this.b), e.subVectors(this.a, this.b), .5 * t.cross(e).length()
            }
        }(), midpoint: function (t) {
            return (t || new s).addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
        }, normal: function (t) {
            return ht.normal(this.a, this.b, this.c, t)
        }, plane: function (t) {
            return (t || new et).setFromCoplanarPoints(this.a, this.b, this.c)
        }, barycoordFromPoint: function (t, e) {
            return ht.barycoordFromPoint(t, this.a, this.b, this.c, e)
        }, containsPoint: function (t) {
            return ht.containsPoint(t, this.a, this.b, this.c)
        }, closestPointToPoint: function () {
            var t, e, n, i;
            return function (r, o) {
                void 0 === t && (t = new et, e = [new ct, new ct, new ct], n = new s, i = new s);
                var a = o || new s, c = 1 / 0;
                if (t.setFromCoplanarPoints(this.a, this.b, this.c), t.projectPoint(r, n), this.containsPoint(n) === !0) a.copy(n); else {
                    e[0].set(this.a, this.b), e[1].set(this.b, this.c), e[2].set(this.c, this.a);
                    for (var h = 0; h < e.length; h++) {
                        e[h].closestPointToPoint(n, !0, i);
                        var l = n.distanceToSquared(i);
                        l < c && (c = l, a.copy(i))
                    }
                }
                return a
            }
        }(),
        equals: function (t) {
            return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c)
        }
    }, lt.prototype = {
        constructor: lt, clone: function () {
            return (new this.constructor).copy(this)
        }, copy: function (t) {
            this.a = t.a, this.b = t.b, this.c = t.c, this.normal.copy(t.normal), this.color.copy(t.color), this.materialIndex = t.materialIndex;
            for (var e = 0, n = t.vertexNormals.length; e < n; e++)this.vertexNormals[e] = t.vertexNormals[e].clone();
            for (var e = 0, n = t.vertexColors.length; e < n; e++)this.vertexColors[e] = t.vertexColors[e].clone();
            return this
        }
    }, ut.prototype = Object.create(Z.prototype), ut.prototype.constructor = ut, ut.prototype.isMeshBasicMaterial = !0, ut.prototype.copy = function (t) {
        return Z.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this
    }, pt.prototype = {
        constructor: pt, isBufferAttribute: !0, set needsUpdate(t) {
            t === !0 && this.version++
        }, setArray: function (t) {
            if (Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
            this.count = void 0 !== t ? t.length / this.itemSize : 0, this.array = t
        }, setDynamic: function (t) {
            return this.dynamic = t, this
        }, copy: function (t) {
            return this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.dynamic = t.dynamic, this
        }, copyAt: function (t, e, n) {
            t *= this.itemSize, n *= e.itemSize;
            for (var i = 0, r = this.itemSize; i < r; i++)this.array[t + i] = e.array[n + i];
            return this
        }, copyArray: function (t) {
            return this.array.set(t), this
        }, copyColorsArray: function (t) {
            for (var e = this.array, n = 0, i = 0, r = t.length; i < r; i++) {
                var o = t[i];
                void 0 === o && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", i), o = new j), e[n++] = o.r, e[n++] = o.g, e[n++] = o.b
            }
            return this
        }, copyIndicesArray: function (t) {
            for (var e = this.array, n = 0, i = 0, r = t.length; i < r; i++) {
                var o = t[i];
                e[n++] = o.a, e[n++] = o.b, e[n++] = o.c
            }
            return this
        }, copyVector2sArray: function (t) {
            for (var n = this.array, i = 0, r = 0, o = t.length; r < o; r++) {
                var a = t[r];
                void 0 === a && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", r), a = new e), n[i++] = a.x, n[i++] = a.y
            }
            return this
        }, copyVector3sArray: function (t) {
            for (var e = this.array, n = 0, i = 0, r = t.length; i < r; i++) {
                var o = t[i];
                void 0 === o && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", i), o = new s), e[n++] = o.x, e[n++] = o.y, e[n++] = o.z
            }
            return this
        }, copyVector4sArray: function (t) {
            for (var e = this.array, n = 0, r = 0, o = t.length; r < o; r++) {
                var a = t[r];
                void 0 === a && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", r), a = new i), e[n++] = a.x, e[n++] = a.y, e[n++] = a.z, e[n++] = a.w
            }
            return this
        }, set: function (t, e) {
            return void 0 === e && (e = 0), this.array.set(t, e), this
        }, getX: function (t) {
            return this.array[t * this.itemSize]
        }, setX: function (t, e) {
            return this.array[t * this.itemSize] = e, this
        }, getY: function (t) {
            return this.array[t * this.itemSize + 1]
        }, setY: function (t, e) {
            return this.array[t * this.itemSize + 1] = e, this
        }, getZ: function (t) {
            return this.array[t * this.itemSize + 2]
        }, setZ: function (t, e) {
            return this.array[t * this.itemSize + 2] = e, this
        }, getW: function (t) {
            return this.array[t * this.itemSize + 3]
        }, setW: function (t, e) {
            return this.array[t * this.itemSize + 3] = e, this
        }, setXY: function (t, e, n) {
            return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = n, this
        }, setXYZ: function (t, e, n, i) {
            return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = i, this
        }, setXYZW: function (t, e, n, i, r) {
            return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = i, this.array[t + 3] = r, this
        }, onUpload: function (t) {
            return this.onUploadCallback = t, this
        }, clone: function () {
            return new this.constructor(this.array, this.itemSize).copy(this)
        }
    }, dt.prototype = Object.create(pt.prototype), dt.prototype.constructor = dt, ft.prototype = Object.create(pt.prototype), ft.prototype.constructor = ft, mt.prototype = Object.create(pt.prototype), mt.prototype.constructor = mt, gt.prototype = Object.create(pt.prototype), gt.prototype.constructor = gt, vt.prototype = Object.create(pt.prototype), vt.prototype.constructor = vt, yt.prototype = Object.create(pt.prototype), yt.prototype.constructor = yt, xt.prototype = Object.create(pt.prototype), xt.prototype.constructor = xt, _t.prototype = Object.create(pt.prototype), _t.prototype.constructor = _t, bt.prototype = Object.create(pt.prototype), bt.prototype.constructor = bt, Object.assign(wt.prototype, {
        computeGroups: function (t) {
            for (var e, n = [], i = void 0, r = t.faces, o = 0; o < r.length; o++) {
                var a = r[o];
                a.materialIndex !== i && (i = a.materialIndex, void 0 !== e && (e.count = 3 * o - e.start, n.push(e)), e = {
                    start: 3 * o,
                    materialIndex: i
                })
            }
            void 0 !== e && (e.count = 3 * o - e.start, n.push(e)), this.groups = n
        }, fromGeometry: function (t) {
            var n, i = t.faces, r = t.vertices, o = t.faceVertexUvs, a = o[0] && o[0].length > 0,
                s = o[1] && o[1].length > 0, c = t.morphTargets, h = c.length;
            if (h > 0) {
                n = [];
                for (var l = 0; l < h; l++)n[l] = [];
                this.morphTargets.position = n
            }
            var u, p = t.morphNormals, d = p.length;
            if (d > 0) {
                u = [];
                for (var l = 0; l < d; l++)u[l] = [];
                this.morphTargets.normal = u
            }
            for (var f = t.skinIndices, m = t.skinWeights, g = f.length === r.length, v = m.length === r.length, l = 0; l < i.length; l++) {
                var y = i[l];
                this.vertices.push(r[y.a], r[y.b], r[y.c]);
                var x = y.vertexNormals;
                if (3 === x.length) this.normals.push(x[0], x[1], x[2]); else {
                    var _ = y.normal;
                    this.normals.push(_, _, _)
                }
                var b = y.vertexColors;
                if (3 === b.length) this.colors.push(b[0], b[1], b[2]); else {
                    var w = y.color;
                    this.colors.push(w, w, w)
                }
                if (a === !0) {
                    var M = o[0][l];
                    void 0 !== M ? this.uvs.push(M[0], M[1], M[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ", l), this.uvs.push(new e, new e, new e))
                }
                if (s === !0) {
                    var M = o[1][l];
                    void 0 !== M ? this.uvs2.push(M[0], M[1], M[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ", l), this.uvs2.push(new e, new e, new e))
                }
                for (var E = 0; E < h; E++) {
                    var T = c[E].vertices;
                    n[E].push(T[y.a], T[y.b], T[y.c])
                }
                for (var E = 0; E < d; E++) {
                    var S = p[E].vertexNormals[l];
                    u[E].push(S.a, S.b, S.c)
                }
                g && this.skinIndices.push(f[y.a], f[y.b], f[y.c]), v && this.skinWeights.push(m[y.a], m[y.b], m[y.c])
            }
            return this.computeGroups(t), this.verticesNeedUpdate = t.verticesNeedUpdate, this.normalsNeedUpdate = t.normalsNeedUpdate, this.colorsNeedUpdate = t.colorsNeedUpdate, this.uvsNeedUpdate = t.uvsNeedUpdate, this.groupsNeedUpdate = t.groupsNeedUpdate, this
        }
    });
    var ch = 0;
    Tt.prototype = {
        constructor: Tt, isGeometry: !0, applyMatrix: function (t) {
            for (var e = (new tt).getNormalMatrix(t), n = 0, i = this.vertices.length; n < i; n++) {
                this.vertices[n].applyMatrix4(t)
            }
            for (var n = 0, i = this.faces.length; n < i; n++) {
                var r = this.faces[n];
                r.normal.applyMatrix3(e).normalize();
                for (var o = 0, a = r.vertexNormals.length; o < a; o++)r.vertexNormals[o].applyMatrix3(e).normalize()
            }
            return null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this.verticesNeedUpdate = !0, this.normalsNeedUpdate = !0, this
        }, rotateX: function () {
            var t;
            return function (e) {
                return void 0 === t && (t = new c), t.makeRotationX(e), this.applyMatrix(t), this
            }
        }(), rotateY: function () {
            var t;
            return function (e) {
                return void 0 === t && (t = new c), t.makeRotationY(e), this.applyMatrix(t), this
            }
        }(), rotateZ: function () {
            var t;
            return function (e) {
                return void 0 === t && (t = new c), t.makeRotationZ(e), this.applyMatrix(t), this
            }
        }(), translate: function () {
            var t;
            return function (e, n, i) {
                return void 0 === t && (t = new c), t.makeTranslation(e, n, i), this.applyMatrix(t), this
            }
        }(), scale: function () {
            var t;
            return function (e, n, i) {
                return void 0 === t && (t = new c), t.makeScale(e, n, i), this.applyMatrix(t), this
            }
        }(), lookAt: function () {
            var t;
            return function (e) {
                void 0 === t && (t = new st), t.lookAt(e), t.updateMatrix(), this.applyMatrix(t.matrix)
            }
        }(), fromBufferGeometry: function (t) {
            function n(t, e, n, r) {
                var o = void 0 !== c ? [p[t].clone(), p[e].clone(), p[n].clone()] : [],
                    a = void 0 !== h ? [i.colors[t].clone(), i.colors[e].clone(), i.colors[n].clone()] : [],
                    s = new lt(t, e, n, o, a, r);
                i.faces.push(s), void 0 !== l && i.faceVertexUvs[0].push([d[t].clone(), d[e].clone(), d[n].clone()]), void 0 !== u && i.faceVertexUvs[1].push([f[t].clone(), f[e].clone(), f[n].clone()])
            }

            var i = this, r = null !== t.index ? t.index.array : void 0, o = t.attributes, a = o.position.array,
                c = void 0 !== o.normal ? o.normal.array : void 0, h = void 0 !== o.color ? o.color.array : void 0,
                l = void 0 !== o.uv ? o.uv.array : void 0, u = void 0 !== o.uv2 ? o.uv2.array : void 0;
            void 0 !== u && (this.faceVertexUvs[1] = []);
            for (var p = [], d = [], f = [], m = 0, g = 0; m < a.length; m += 3, g += 2)i.vertices.push(new s(a[m], a[m + 1], a[m + 2])), void 0 !== c && p.push(new s(c[m], c[m + 1], c[m + 2])), void 0 !== h && i.colors.push(new j(h[m], h[m + 1], h[m + 2])), void 0 !== l && d.push(new e(l[g], l[g + 1])), void 0 !== u && f.push(new e(u[g], u[g + 1]));
            if (void 0 !== r) {
                var v = t.groups;
                if (v.length > 0)for (var m = 0; m < v.length; m++)for (var y = v[m], x = y.start, _ = y.count, g = x, b = x + _; g < b; g += 3)n(r[g], r[g + 1], r[g + 2], y.materialIndex); else for (var m = 0; m < r.length; m += 3)n(r[m], r[m + 1], r[m + 2])
            } else for (var m = 0; m < a.length / 3; m += 3)n(m, m + 1, m + 2);
            return this.computeFaceNormals(), null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone()), null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()), this
        }, center: function () {
            this.computeBoundingBox();
            var t = this.boundingBox.getCenter().negate();
            return this.translate(t.x, t.y, t.z), t
        }, normalize: function () {
            this.computeBoundingSphere();
            var t = this.boundingSphere.center, e = this.boundingSphere.radius, n = 0 === e ? 1 : 1 / e, i = new c;
            return i.set(n, 0, 0, -n * t.x, 0, n, 0, -n * t.y, 0, 0, n, -n * t.z, 0, 0, 0, 1), this.applyMatrix(i), this
        }, computeFaceNormals: function () {
            for (var t = new s, e = new s, n = 0, i = this.faces.length; n < i; n++) {
                var r = this.faces[n], o = this.vertices[r.a], a = this.vertices[r.b], c = this.vertices[r.c];
                t.subVectors(c, a), e.subVectors(o, a), t.cross(e), t.normalize(), r.normal.copy(t)
            }
        }, computeVertexNormals: function (t) {
            void 0 === t && (t = !0);
            var e, n, i, r, o, a;
            for (a = new Array(this.vertices.length), e = 0, n = this.vertices.length; e < n; e++)a[e] = new s;
            if (t) {
                var c, h, l, u = new s, p = new s;
                for (i = 0, r = this.faces.length; i < r; i++)o = this.faces[i], c = this.vertices[o.a], h = this.vertices[o.b], l = this.vertices[o.c], u.subVectors(l, h), p.subVectors(c, h), u.cross(p), a[o.a].add(u), a[o.b].add(u), a[o.c].add(u)
            } else for (this.computeFaceNormals(), i = 0, r = this.faces.length; i < r; i++)o = this.faces[i], a[o.a].add(o.normal), a[o.b].add(o.normal), a[o.c].add(o.normal);
            for (e = 0, n = this.vertices.length; e < n; e++)a[e].normalize();
            for (i = 0, r = this.faces.length; i < r; i++) {
                o = this.faces[i];
                var d = o.vertexNormals;
                3 === d.length ? (d[0].copy(a[o.a]), d[1].copy(a[o.b]), d[2].copy(a[o.c])) : (d[0] = a[o.a].clone(), d[1] = a[o.b].clone(), d[2] = a[o.c].clone())
            }
            this.faces.length > 0 && (this.normalsNeedUpdate = !0)
        }, computeFlatVertexNormals: function () {
            var t, e, n;
            for (this.computeFaceNormals(), t = 0, e = this.faces.length; t < e; t++) {
                n = this.faces[t];
                var i = n.vertexNormals;
                3 === i.length ? (i[0].copy(n.normal), i[1].copy(n.normal), i[2].copy(n.normal)) : (i[0] = n.normal.clone(), i[1] = n.normal.clone(), i[2] = n.normal.clone())
            }
            this.faces.length > 0 && (this.normalsNeedUpdate = !0)
        }, computeMorphNormals: function () {
            var t, e, n, i, r;
            for (n = 0, i = this.faces.length; n < i; n++)for (r = this.faces[n], r.__originalFaceNormal ? r.__originalFaceNormal.copy(r.normal) : r.__originalFaceNormal = r.normal.clone(), r.__originalVertexNormals || (r.__originalVertexNormals = []), t = 0, e = r.vertexNormals.length; t < e; t++)r.__originalVertexNormals[t] ? r.__originalVertexNormals[t].copy(r.vertexNormals[t]) : r.__originalVertexNormals[t] = r.vertexNormals[t].clone();
            var o = new Tt;
            for (o.faces = this.faces, t = 0, e = this.morphTargets.length; t < e; t++) {
                if (!this.morphNormals[t]) {
                    this.morphNormals[t] = {}, this.morphNormals[t].faceNormals = [], this.morphNormals[t].vertexNormals = [];
                    var a, c, h = this.morphNormals[t].faceNormals, l = this.morphNormals[t].vertexNormals;
                    for (n = 0, i = this.faces.length; n < i; n++)a = new s, c = {
                        a: new s,
                        b: new s,
                        c: new s
                    }, h.push(a), l.push(c)
                }
                var u = this.morphNormals[t];
                o.vertices = this.morphTargets[t].vertices, o.computeFaceNormals(), o.computeVertexNormals();
                var a, c;
                for (n = 0, i = this.faces.length; n < i; n++)r = this.faces[n], a = u.faceNormals[n], c = u.vertexNormals[n], a.copy(r.normal), c.a.copy(r.vertexNormals[0]), c.b.copy(r.vertexNormals[1]), c.c.copy(r.vertexNormals[2])
            }
            for (n = 0, i = this.faces.length; n < i; n++)r = this.faces[n], r.normal = r.__originalFaceNormal, r.vertexNormals = r.__originalVertexNormals
        }, computeLineDistances: function () {
            for (var t = 0, e = this.vertices, n = 0, i = e.length; n < i; n++)n > 0 && (t += e[n].distanceTo(e[n - 1])), this.lineDistances[n] = t
        }, computeBoundingBox: function () {
            null === this.boundingBox && (this.boundingBox = new K), this.boundingBox.setFromPoints(this.vertices)
        }, computeBoundingSphere: function () {
            null === this.boundingSphere && (this.boundingSphere = new $), this.boundingSphere.setFromPoints(this.vertices)
        }, merge: function (t, e, n) {
            if ((t && t.isGeometry) === !1)return void console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", t);
            var i, r = this.vertices.length, o = this.vertices, a = t.vertices, s = this.faces, c = t.faces,
                h = this.faceVertexUvs[0], l = t.faceVertexUvs[0], u = this.colors, p = t.colors;
            void 0 === n && (n = 0), void 0 !== e && (i = (new tt).getNormalMatrix(e));
            for (var d = 0, f = a.length; d < f; d++) {
                var m = a[d], g = m.clone();
                void 0 !== e && g.applyMatrix4(e), o.push(g)
            }
            for (var d = 0, f = p.length; d < f; d++)u.push(p[d].clone());
            for (d = 0, f = c.length; d < f; d++) {
                var v, y, x, _ = c[d], b = _.vertexNormals, w = _.vertexColors;
                v = new lt(_.a + r, _.b + r, _.c + r), v.normal.copy(_.normal), void 0 !== i && v.normal.applyMatrix3(i).normalize();
                for (var M = 0, E = b.length; M < E; M++)y = b[M].clone(), void 0 !== i && y.applyMatrix3(i).normalize(), v.vertexNormals.push(y);
                v.color.copy(_.color);
                for (var M = 0, E = w.length; M < E; M++)x = w[M], v.vertexColors.push(x.clone());
                v.materialIndex = _.materialIndex + n, s.push(v)
            }
            for (d = 0, f = l.length; d < f; d++) {
                var T = l[d], S = [];
                if (void 0 !== T) {
                    for (var M = 0, E = T.length; M < E; M++)S.push(T[M].clone());
                    h.push(S)
                }
            }
        }, mergeMesh: function (t) {
            if ((t && t.isMesh) === !1)return void console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", t);
            t.matrixAutoUpdate && t.updateMatrix(), this.merge(t.geometry, t.matrix)
        }, mergeVertices: function () {
            var t, e, n, i, r, o, a, s, c = {}, h = [], l = [], u = Math.pow(10, 4);
            for (n = 0, i = this.vertices.length; n < i; n++)t = this.vertices[n], e = Math.round(t.x * u) + "_" + Math.round(t.y * u) + "_" + Math.round(t.z * u), void 0 === c[e] ? (c[e] = n, h.push(this.vertices[n]), l[n] = h.length - 1) : l[n] = l[c[e]];
            var p = [];
            for (n = 0, i = this.faces.length; n < i; n++) {
                r = this.faces[n], r.a = l[r.a], r.b = l[r.b], r.c = l[r.c], o = [r.a, r.b, r.c];
                for (var d = 0; d < 3; d++)if (o[d] === o[(d + 1) % 3]) {
                    p.push(n);
                    break
                }
            }
            for (n = p.length - 1; n >= 0; n--) {
                var f = p[n];
                for (this.faces.splice(f, 1), a = 0, s = this.faceVertexUvs.length; a < s; a++)this.faceVertexUvs[a].splice(f, 1)
            }
            var m = this.vertices.length - h.length;
            return this.vertices = h, m
        }, sortFacesByMaterialIndex: function () {
            function t(t, e) {
                return t.materialIndex - e.materialIndex
            }

            for (var e = this.faces, n = e.length, i = 0; i < n; i++)e[i]._id = i;
            e.sort(t);
            var r, o, a = this.faceVertexUvs[0], s = this.faceVertexUvs[1];
            a && a.length === n && (r = []), s && s.length === n && (o = []);
            for (var i = 0; i < n; i++) {
                var c = e[i]._id;
                r && r.push(a[c]), o && o.push(s[c])
            }
            r && (this.faceVertexUvs[0] = r), o && (this.faceVertexUvs[1] = o)
        }, toJSON: function () {
            function t(t, e, n) {
                return n ? t | 1 << e : t & ~(1 << e)
            }

            function e(t) {
                var e = t.x.toString() + t.y.toString() + t.z.toString();
                return void 0 !== p[e] ? p[e] : (p[e] = u.length / 3, u.push(t.x, t.y, t.z), p[e])
            }

            function n(t) {
                var e = t.r.toString() + t.g.toString() + t.b.toString();
                return void 0 !== f[e] ? f[e] : (f[e] = d.length, d.push(t.getHex()), f[e])
            }

            function i(t) {
                var e = t.x.toString() + t.y.toString();
                return void 0 !== g[e] ? g[e] : (g[e] = m.length / 2, m.push(t.x, t.y), g[e])
            }

            var r = {metadata: {version: 4.4, type: "Geometry", generator: "Geometry.toJSON"}};
            if (r.uuid = this.uuid, r.type = this.type, "" !== this.name && (r.name = this.name), void 0 !== this.parameters) {
                var o = this.parameters;
                for (var a in o)void 0 !== o[a] && (r[a] = o[a]);
                return r
            }
            for (var s = [], c = 0; c < this.vertices.length; c++) {
                var h = this.vertices[c];
                s.push(h.x, h.y, h.z)
            }
            for (var l = [], u = [], p = {}, d = [], f = {}, m = [], g = {}, c = 0; c < this.faces.length; c++) {
                var v = this.faces[c], y = void 0 !== this.faceVertexUvs[0][c], x = v.normal.length() > 0,
                    _ = v.vertexNormals.length > 0, b = 1 !== v.color.r || 1 !== v.color.g || 1 !== v.color.b,
                    w = v.vertexColors.length > 0, M = 0;
                if (M = t(M, 0, 0), M = t(M, 1, !0), M = t(M, 2, !1), M = t(M, 3, y), M = t(M, 4, x), M = t(M, 5, _), M = t(M, 6, b), M = t(M, 7, w), l.push(M), l.push(v.a, v.b, v.c), l.push(v.materialIndex), y) {
                    var E = this.faceVertexUvs[0][c];
                    l.push(i(E[0]), i(E[1]), i(E[2]))
                }
                if (x && l.push(e(v.normal)), _) {
                    var T = v.vertexNormals;
                    l.push(e(T[0]), e(T[1]), e(T[2]))
                }
                if (b && l.push(n(v.color)), w) {
                    var S = v.vertexColors;
                    l.push(n(S[0]), n(S[1]), n(S[2]))
                }
            }
            return r.data = {}, r.data.vertices = s, r.data.normals = u, d.length > 0 && (r.data.colors = d), m.length > 0 && (r.data.uvs = [m]), r.data.faces = l, r
        }, clone: function () {
            return (new Tt).copy(this)
        }, copy: function (t) {
            var e, n, i, r, o, a;
            this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [[]], this.morphTargets = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.name = t.name;
            var s = t.vertices;
            for (e = 0, n = s.length; e < n; e++)this.vertices.push(s[e].clone());
            var c = t.colors;
            for (e = 0, n = c.length; e < n; e++)this.colors.push(c[e].clone());
            var h = t.faces;
            for (e = 0, n = h.length; e < n; e++)this.faces.push(h[e].clone());
            for (e = 0, n = t.faceVertexUvs.length; e < n; e++) {
                var l = t.faceVertexUvs[e];
                for (void 0 === this.faceVertexUvs[e] && (this.faceVertexUvs[e] = []), i = 0, r = l.length; i < r; i++) {
                    var u = l[i], p = [];
                    for (o = 0, a = u.length; o < a; o++) {
                        var d = u[o];
                        p.push(d.clone())
                    }
                    this.faceVertexUvs[e].push(p)
                }
            }
            var f = t.morphTargets;
            for (e = 0, n = f.length; e < n; e++) {
                var m = {};
                if (m.name = f[e].name, void 0 !== f[e].vertices)for (m.vertices = [], i = 0, r = f[e].vertices.length; i < r; i++)m.vertices.push(f[e].vertices[i].clone());
                if (void 0 !== f[e].normals)for (m.normals = [], i = 0, r = f[e].normals.length; i < r; i++)m.normals.push(f[e].normals[i].clone());
                this.morphTargets.push(m)
            }
            var g = t.morphNormals;
            for (e = 0, n = g.length; e < n; e++) {
                var v = {};
                if (void 0 !== g[e].vertexNormals)for (v.vertexNormals = [], i = 0, r = g[e].vertexNormals.length; i < r; i++) {
                    var y = g[e].vertexNormals[i], x = {};
                    x.a = y.a.clone(), x.b = y.b.clone(), x.c = y.c.clone(), v.vertexNormals.push(x)
                }
                if (void 0 !== g[e].faceNormals)for (v.faceNormals = [], i = 0, r = g[e].faceNormals.length; i < r; i++)v.faceNormals.push(g[e].faceNormals[i].clone());
                this.morphNormals.push(v)
            }
            var _ = t.skinWeights;
            for (e = 0, n = _.length; e < n; e++)this.skinWeights.push(_[e].clone());
            var b = t.skinIndices;
            for (e = 0, n = b.length; e < n; e++)this.skinIndices.push(b[e].clone());
            var w = t.lineDistances;
            for (e = 0, n = w.length; e < n; e++)this.lineDistances.push(w[e]);
            var M = t.boundingBox;
            null !== M && (this.boundingBox = M.clone());
            var E = t.boundingSphere;
            return null !== E && (this.boundingSphere = E.clone()), this.elementsNeedUpdate = t.elementsNeedUpdate, this.verticesNeedUpdate = t.verticesNeedUpdate, this.uvsNeedUpdate = t.uvsNeedUpdate, this.normalsNeedUpdate = t.normalsNeedUpdate, this.colorsNeedUpdate = t.colorsNeedUpdate, this.lineDistancesNeedUpdate = t.lineDistancesNeedUpdate, this.groupsNeedUpdate = t.groupsNeedUpdate, this
        }, dispose: function () {
            this.dispatchEvent({type: "dispose"})
        }
    }, Object.assign(Tt.prototype, t.prototype), St.prototype = {
        constructor: St,
        isBufferGeometry: !0,
        getIndex: function () {
            return this.index
        },
        setIndex: function (t) {
            Array.isArray(t) ? this.index = new (Mt(t) > 65535 ? xt : vt)(t, 1) : this.index = t
        },
        addAttribute: function (t, e) {
            return (e && e.isBufferAttribute) === !1 && (e && e.isInterleavedBufferAttribute) === !1 ? (console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), void this.addAttribute(t, new pt(arguments[1], arguments[2]))) : "index" === t ? (console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."), void this.setIndex(e)) : (this.attributes[t] = e, this)
        },
        getAttribute: function (t) {
            return this.attributes[t]
        },
        removeAttribute: function (t) {
            return delete this.attributes[t], this
        },
        addGroup: function (t, e, n) {
            this.groups.push({start: t, count: e, materialIndex: void 0 !== n ? n : 0})
        },
        clearGroups: function () {
            this.groups = []
        },
        setDrawRange: function (t, e) {
            this.drawRange.start = t, this.drawRange.count = e
        },
        applyMatrix: function (t) {
            var e = this.attributes.position;
            void 0 !== e && (t.applyToBufferAttribute(e), e.needsUpdate = !0);
            var n = this.attributes.normal;
            if (void 0 !== n) {
                (new tt).getNormalMatrix(t).applyToBufferAttribute(n), n.needsUpdate = !0
            }
            return null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this
        },
        rotateX: function () {
            var t;
            return function (e) {
                return void 0 === t && (t = new c), t.makeRotationX(e), this.applyMatrix(t), this
            }
        }(),
        rotateY: function () {
            var t;
            return function (e) {
                return void 0 === t && (t = new c), t.makeRotationY(e), this.applyMatrix(t), this
            }
        }(),
        rotateZ: function () {
            var t;
            return function (e) {
                return void 0 === t && (t = new c), t.makeRotationZ(e), this.applyMatrix(t), this
            }
        }(),
        translate: function () {
            var t;
            return function (e, n, i) {
                return void 0 === t && (t = new c), t.makeTranslation(e, n, i), this.applyMatrix(t), this
            }
        }(),
        scale: function () {
            var t;
            return function (e, n, i) {
                return void 0 === t && (t = new c), t.makeScale(e, n, i), this.applyMatrix(t), this
            }
        }(),
        lookAt: function () {
            var t;
            return function (e) {
                void 0 === t && (t = new st), t.lookAt(e), t.updateMatrix(), this.applyMatrix(t.matrix)
            }
        }(),
        center: function () {
            this.computeBoundingBox();
            var t = this.boundingBox.getCenter().negate();
            return this.translate(t.x, t.y, t.z), t
        },
        setFromObject: function (t) {
            var e = t.geometry;
            if (t.isPoints || t.isLine) {
                var n = new _t(3 * e.vertices.length, 3), i = new _t(3 * e.colors.length, 3);
                if (this.addAttribute("position", n.copyVector3sArray(e.vertices)), this.addAttribute("color", i.copyColorsArray(e.colors)), e.lineDistances && e.lineDistances.length === e.vertices.length) {
                    var r = new _t(e.lineDistances.length, 1);
                    this.addAttribute("lineDistance", r.copyArray(e.lineDistances))
                }
                null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone())
            } else t.isMesh && e && e.isGeometry && this.fromGeometry(e);
            return this
        },
        updateFromObject: function (t) {
            var e = t.geometry;
            if (t.isMesh) {
                var n = e.__directGeometry;
                if (e.elementsNeedUpdate === !0 && (n = void 0, e.elementsNeedUpdate = !1), void 0 === n)return this.fromGeometry(e);
                n.verticesNeedUpdate = e.verticesNeedUpdate, n.normalsNeedUpdate = e.normalsNeedUpdate, n.colorsNeedUpdate = e.colorsNeedUpdate, n.uvsNeedUpdate = e.uvsNeedUpdate, n.groupsNeedUpdate = e.groupsNeedUpdate, e.verticesNeedUpdate = !1, e.normalsNeedUpdate = !1, e.colorsNeedUpdate = !1, e.uvsNeedUpdate = !1, e.groupsNeedUpdate = !1, e = n
            }
            var i;
            return e.verticesNeedUpdate === !0 && (i = this.attributes.position, void 0 !== i && (i.copyVector3sArray(e.vertices), i.needsUpdate = !0), e.verticesNeedUpdate = !1), e.normalsNeedUpdate === !0 && (i = this.attributes.normal, void 0 !== i && (i.copyVector3sArray(e.normals), i.needsUpdate = !0), e.normalsNeedUpdate = !1), e.colorsNeedUpdate === !0 && (i = this.attributes.color, void 0 !== i && (i.copyColorsArray(e.colors), i.needsUpdate = !0), e.colorsNeedUpdate = !1), e.uvsNeedUpdate && (i = this.attributes.uv, void 0 !== i && (i.copyVector2sArray(e.uvs), i.needsUpdate = !0), e.uvsNeedUpdate = !1), e.lineDistancesNeedUpdate && (i = this.attributes.lineDistance, void 0 !== i && (i.copyArray(e.lineDistances), i.needsUpdate = !0), e.lineDistancesNeedUpdate = !1), e.groupsNeedUpdate && (e.computeGroups(t.geometry), this.groups = e.groups, e.groupsNeedUpdate = !1), this
        },
        fromGeometry: function (t) {
            return t.__directGeometry = (new wt).fromGeometry(t), this.fromDirectGeometry(t.__directGeometry)
        },
        fromDirectGeometry: function (t) {
            var e = new Float32Array(3 * t.vertices.length);
            if (this.addAttribute("position", new pt(e, 3).copyVector3sArray(t.vertices)), t.normals.length > 0) {
                var n = new Float32Array(3 * t.normals.length);
                this.addAttribute("normal", new pt(n, 3).copyVector3sArray(t.normals))
            }
            if (t.colors.length > 0) {
                var i = new Float32Array(3 * t.colors.length);
                this.addAttribute("color", new pt(i, 3).copyColorsArray(t.colors))
            }
            if (t.uvs.length > 0) {
                var r = new Float32Array(2 * t.uvs.length);
                this.addAttribute("uv", new pt(r, 2).copyVector2sArray(t.uvs))
            }
            if (t.uvs2.length > 0) {
                var o = new Float32Array(2 * t.uvs2.length);
                this.addAttribute("uv2", new pt(o, 2).copyVector2sArray(t.uvs2))
            }
            if (t.indices.length > 0) {
                var a = Mt(t.indices) > 65535 ? Uint32Array : Uint16Array, s = new a(3 * t.indices.length);
                this.setIndex(new pt(s, 1).copyIndicesArray(t.indices))
            }
            this.groups = t.groups;
            for (var c in t.morphTargets) {
                for (var h = [], l = t.morphTargets[c], u = 0, p = l.length; u < p; u++) {
                    var d = l[u], f = new _t(3 * d.length, 3);
                    h.push(f.copyVector3sArray(d))
                }
                this.morphAttributes[c] = h
            }
            if (t.skinIndices.length > 0) {
                var m = new _t(4 * t.skinIndices.length, 4);
                this.addAttribute("skinIndex", m.copyVector4sArray(t.skinIndices))
            }
            if (t.skinWeights.length > 0) {
                var g = new _t(4 * t.skinWeights.length, 4);
                this.addAttribute("skinWeight", g.copyVector4sArray(t.skinWeights))
            }
            return null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()), null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone()), this
        },
        computeBoundingBox: function () {
            null === this.boundingBox && (this.boundingBox = new K);
            var t = this.attributes.position;
            void 0 !== t ? this.boundingBox.setFromBufferAttribute(t) : this.boundingBox.makeEmpty(), (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
        },
        computeBoundingSphere: function () {
            var t = new K, e = new s;
            return function () {
                null === this.boundingSphere && (this.boundingSphere = new $);
                var n = this.attributes.position;
                if (n) {
                    var i = this.boundingSphere.center;
                    t.setFromBufferAttribute(n), t.getCenter(i);
                    for (var r = 0, o = 0, a = n.count; o < a; o++)e.x = n.getX(o), e.y = n.getY(o), e.z = n.getZ(o), r = Math.max(r, i.distanceToSquared(e));
                    this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
                }
            }
        }(),
        computeFaceNormals: function () {
        },
        computeVertexNormals: function () {
            var t = this.index, e = this.attributes, n = this.groups;
            if (e.position) {
                var i = e.position.array;
                if (void 0 === e.normal) this.addAttribute("normal", new pt(new Float32Array(i.length), 3)); else for (var r = e.normal.array, o = 0, a = r.length; o < a; o++)r[o] = 0;
                var c, h, l, u = e.normal.array, p = new s, d = new s, f = new s, m = new s, g = new s;
                if (t) {
                    var v = t.array;
                    0 === n.length && this.addGroup(0, v.length);
                    for (var y = 0, x = n.length; y < x; ++y)for (var _ = n[y], b = _.start, w = _.count, o = b, a = b + w; o < a; o += 3)c = 3 * v[o + 0], h = 3 * v[o + 1], l = 3 * v[o + 2], p.fromArray(i, c), d.fromArray(i, h), f.fromArray(i, l), m.subVectors(f, d), g.subVectors(p, d), m.cross(g), u[c] += m.x, u[c + 1] += m.y, u[c + 2] += m.z, u[h] += m.x, u[h + 1] += m.y, u[h + 2] += m.z, u[l] += m.x, u[l + 1] += m.y, u[l + 2] += m.z
                } else for (var o = 0, a = i.length; o < a; o += 9)p.fromArray(i, o), d.fromArray(i, o + 3), f.fromArray(i, o + 6), m.subVectors(f, d), g.subVectors(p, d), m.cross(g), u[o] = m.x, u[o + 1] = m.y, u[o + 2] = m.z, u[o + 3] = m.x, u[o + 4] = m.y, u[o + 5] = m.z, u[o + 6] = m.x, u[o + 7] = m.y, u[o + 8] = m.z;
                this.normalizeNormals(), e.normal.needsUpdate = !0
            }
        },
        merge: function (t, e) {
            if ((t && t.isBufferGeometry) === !1)return void console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", t);
            void 0 === e && (e = 0);
            var n = this.attributes;
            for (var i in n)if (void 0 !== t.attributes[i])for (var r = n[i], o = r.array, a = t.attributes[i], s = a.array, c = a.itemSize, h = 0, l = c * e; h < s.length; h++, l++)o[l] = s[h];
            return this
        },
        normalizeNormals: function () {
            for (var t, e, n, i, r = this.attributes.normal.array, o = 0, a = r.length; o < a; o += 3)t = r[o], e = r[o + 1], n = r[o + 2], i = 1 / Math.sqrt(t * t + e * e + n * n), r[o] *= i, r[o + 1] *= i, r[o + 2] *= i
        },
        toNonIndexed: function () {
            if (null === this.index)return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."), this;
            var t = new St, e = this.index.array, n = this.attributes;
            for (var i in n) {
                for (var r = n[i], o = r.array, a = r.itemSize, s = new o.constructor(e.length * a), c = 0, h = 0, l = 0, u = e.length; l < u; l++) {
                    c = e[l] * a;
                    for (var p = 0; p < a; p++)s[h++] = o[c++]
                }
                t.addAttribute(i, new pt(s, a))
            }
            return t
        },
        toJSON: function () {
            var t = {metadata: {version: 4.4, type: "BufferGeometry", generator: "BufferGeometry.toJSON"}};
            if (t.uuid = this.uuid, t.type = this.type, "" !== this.name && (t.name = this.name), void 0 !== this.parameters) {
                var e = this.parameters;
                for (var n in e)void 0 !== e[n] && (t[n] = e[n]);
                return t
            }
            t.data = {attributes: {}};
            var i = this.index;
            if (null !== i) {
                var r = Array.prototype.slice.call(i.array);
                t.data.index = {type: i.array.constructor.name, array: r}
            }
            var o = this.attributes;
            for (var n in o) {
                var a = o[n], r = Array.prototype.slice.call(a.array);
                t.data.attributes[n] = {
                    itemSize: a.itemSize,
                    type: a.array.constructor.name,
                    array: r,
                    normalized: a.normalized
                }
            }
            var s = this.groups;
            s.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(s)));
            var c = this.boundingSphere;
            return null !== c && (t.data.boundingSphere = {center: c.center.toArray(), radius: c.radius}), t
        },
        clone: function () {
            return (new St).copy(this)
        },
        copy: function (t) {
            var e, n, i;
            this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.name = t.name;
            var r = t.index;
            null !== r && this.setIndex(r.clone());
            var o = t.attributes;
            for (e in o) {
                var a = o[e];
                this.addAttribute(e, a.clone())
            }
            var s = t.morphAttributes;
            for (e in s) {
                var c = [], h = s[e];
                for (n = 0, i = h.length; n < i; n++)c.push(h[n].clone());
                this.morphAttributes[e] = c
            }
            var l = t.groups;
            for (n = 0, i = l.length; n < i; n++) {
                var u = l[n];
                this.addGroup(u.start, u.count, u.materialIndex)
            }
            var p = t.boundingBox;
            null !== p && (this.boundingBox = p.clone());
            var d = t.boundingSphere;
            return null !== d && (this.boundingSphere = d.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this
        },
        dispose: function () {
            this.dispatchEvent({type: "dispose"})
        }
    }, St.MaxIndex = 65535, Object.assign(St.prototype, t.prototype), At.prototype = Object.assign(Object.create(st.prototype), {
        constructor: At,
        isMesh: !0,
        setDrawMode: function (t) {
            this.drawMode = t
        },
        copy: function (t) {
            return st.prototype.copy.call(this, t), this.drawMode = t.drawMode, this
        },
        updateMorphTargets: function () {
            var t = this.geometry.morphTargets;
            if (void 0 !== t && t.length > 0) {
                this.morphTargetInfluences = [], this.morphTargetDictionary = {};
                for (var e = 0, n = t.length; e < n; e++)this.morphTargetInfluences.push(0), this.morphTargetDictionary[t[e].name] = e
            }
        },
        raycast: function () {
            function t(t, e, n, i, r, o, a) {
                return ht.barycoordFromPoint(t, e, n, i, y), r.multiplyScalar(y.x), o.multiplyScalar(y.y), a.multiplyScalar(y.z), r.add(o).add(a), r.clone()
            }

            function n(t, e, n, i, r, o, a) {
                var s = t.material;
                if (null === (s.side === Ka ? n.intersectTriangle(o, r, i, !0, a) : n.intersectTriangle(i, r, o, s.side !== $a, a)))return null;
                _.copy(a), _.applyMatrix4(t.matrixWorld);
                var c = e.ray.origin.distanceTo(_);
                return c < e.near || c > e.far ? null : {distance: c, point: _.clone(), object: t}
            }

            function i(e, i, r, o, a, s, c, p) {
                h.fromBufferAttribute(o, s), l.fromBufferAttribute(o, c), u.fromBufferAttribute(o, p);
                var d = n(e, i, r, h, l, u, x);
                return d && (a && (m.fromBufferAttribute(a, s), g.fromBufferAttribute(a, c), v.fromBufferAttribute(a, p), d.uv = t(x, h, l, u, m, g, v)), d.face = new lt(s, c, p, ht.normal(h, l, u)), d.faceIndex = s), d
            }

            var r = new c, o = new rt, a = new $, h = new s, l = new s, u = new s, p = new s, d = new s, f = new s,
                m = new e, g = new e, v = new e, y = new s, x = new s, _ = new s;
            return function (e, s) {
                var c = this.geometry, y = this.material, _ = this.matrixWorld;
                if (void 0 !== y && (null === c.boundingSphere && c.computeBoundingSphere(), a.copy(c.boundingSphere), a.applyMatrix4(_), e.ray.intersectsSphere(a) !== !1 && (r.getInverse(_), o.copy(e.ray).applyMatrix4(r), null === c.boundingBox || o.intersectsBox(c.boundingBox) !== !1))) {
                    var b;
                    if (c.isBufferGeometry) {
                        var w, M, E, T, S, A = c.index, L = c.attributes.position, R = c.attributes.uv;
                        if (null !== A)for (T = 0, S = A.count; T < S; T += 3)w = A.getX(T), M = A.getX(T + 1), E = A.getX(T + 2), (b = i(this, e, o, L, R, w, M, E)) && (b.faceIndex = Math.floor(T / 3), s.push(b)); else for (T = 0, S = L.count; T < S; T += 3)w = T, M = T + 1, E = T + 2, (b = i(this, e, o, L, R, w, M, E)) && (b.index = w, s.push(b))
                    } else if (c.isGeometry) {
                        var P, C, N, I, U = y && y.isMultiMaterial, D = U === !0 ? y.materials : null, O = c.vertices,
                            z = c.faces, B = c.faceVertexUvs[0];
                        B.length > 0 && (I = B);
                        for (var F = 0, G = z.length; F < G; F++) {
                            var k = z[F], H = U === !0 ? D[k.materialIndex] : y;
                            if (void 0 !== H) {
                                if (P = O[k.a], C = O[k.b], N = O[k.c], H.morphTargets === !0) {
                                    var V = c.morphTargets, j = this.morphTargetInfluences;
                                    h.set(0, 0, 0), l.set(0, 0, 0), u.set(0, 0, 0);
                                    for (var W = 0, q = V.length; W < q; W++) {
                                        var X = j[W];
                                        if (0 !== X) {
                                            var Y = V[W].vertices;
                                            h.addScaledVector(p.subVectors(Y[k.a], P), X), l.addScaledVector(d.subVectors(Y[k.b], C), X), u.addScaledVector(f.subVectors(Y[k.c], N), X)
                                        }
                                    }
                                    h.add(P), l.add(C), u.add(N), P = h, C = l, N = u
                                }
                                if (b = n(this, e, o, P, C, N, x)) {
                                    if (I) {
                                        var Z = I[F];
                                        m.copy(Z[0]), g.copy(Z[1]), v.copy(Z[2]), b.uv = t(x, P, C, N, m, g, v)
                                    }
                                    b.face = k, b.faceIndex = F, s.push(b)
                                }
                            }
                        }
                    }
                }
            }
        }(),
        clone: function () {
            return new this.constructor(this.geometry, this.material).copy(this)
        }
    }), Lt.prototype = Object.create(Tt.prototype), Lt.prototype.constructor = Lt, Rt.prototype = Object.create(St.prototype),
        Rt.prototype.constructor = Rt, Pt.prototype = Object.create(Tt.prototype), Pt.prototype.constructor = Pt, Ct.prototype = Object.create(St.prototype), Ct.prototype.constructor = Ct, Nt.prototype = Object.create(st.prototype), Nt.prototype.constructor = Nt, Nt.prototype.isCamera = !0, Nt.prototype.getWorldDirection = function () {
        var t = new a;
        return function (e) {
            var n = e || new s;
            return this.getWorldQuaternion(t), n.set(0, 0, -1).applyQuaternion(t)
        }
    }(), Nt.prototype.lookAt = function () {
        var t = new c;
        return function (e) {
            t.lookAt(this.position, e, this.up), this.quaternion.setFromRotationMatrix(t)
        }
    }(), Nt.prototype.clone = function () {
        return (new this.constructor).copy(this)
    }, Nt.prototype.copy = function (t) {
        return st.prototype.copy.call(this, t), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this
    }, It.prototype = Object.assign(Object.create(Nt.prototype), {
        constructor: It,
        isPerspectiveCamera: !0,
        copy: function (t) {
            return Nt.prototype.copy.call(this, t), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = null === t.view ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this
        },
        setFocalLength: function (t) {
            var e = .5 * this.getFilmHeight() / t;
            this.fov = 2 * Yc.RAD2DEG * Math.atan(e), this.updateProjectionMatrix()
        },
        getFocalLength: function () {
            var t = Math.tan(.5 * Yc.DEG2RAD * this.fov);
            return .5 * this.getFilmHeight() / t
        },
        getEffectiveFOV: function () {
            return 2 * Yc.RAD2DEG * Math.atan(Math.tan(.5 * Yc.DEG2RAD * this.fov) / this.zoom)
        },
        getFilmWidth: function () {
            return this.filmGauge * Math.min(this.aspect, 1)
        },
        getFilmHeight: function () {
            return this.filmGauge / Math.max(this.aspect, 1)
        },
        setViewOffset: function (t, e, n, i, r, o) {
            this.aspect = t / e, this.view = {
                fullWidth: t,
                fullHeight: e,
                offsetX: n,
                offsetY: i,
                width: r,
                height: o
            }, this.updateProjectionMatrix()
        },
        clearViewOffset: function () {
            this.view = null, this.updateProjectionMatrix()
        },
        updateProjectionMatrix: function () {
            var t = this.near, e = t * Math.tan(.5 * Yc.DEG2RAD * this.fov) / this.zoom, n = 2 * e, i = this.aspect * n,
                r = -.5 * i, o = this.view;
            if (null !== o) {
                var a = o.fullWidth, s = o.fullHeight;
                r += o.offsetX * i / a, e -= o.offsetY * n / s, i *= o.width / a, n *= o.height / s
            }
            var c = this.filmOffset;
            0 !== c && (r += t * c / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + i, e, e - n, t, this.far)
        },
        toJSON: function (t) {
            var e = st.prototype.toJSON.call(this, t);
            return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, null !== this.view && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e
        }
    }), Ut.prototype = Object.assign(Object.create(Nt.prototype), {
        constructor: Ut,
        isOrthographicCamera: !0,
        copy: function (t) {
            return Nt.prototype.copy.call(this, t), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = null === t.view ? null : Object.assign({}, t.view), this
        },
        setViewOffset: function (t, e, n, i, r, o) {
            this.view = {
                fullWidth: t,
                fullHeight: e,
                offsetX: n,
                offsetY: i,
                width: r,
                height: o
            }, this.updateProjectionMatrix()
        },
        clearViewOffset: function () {
            this.view = null, this.updateProjectionMatrix()
        },
        updateProjectionMatrix: function () {
            var t = (this.right - this.left) / (2 * this.zoom), e = (this.top - this.bottom) / (2 * this.zoom),
                n = (this.right + this.left) / 2, i = (this.top + this.bottom) / 2, r = n - t, o = n + t, a = i + e,
                s = i - e;
            if (null !== this.view) {
                var c = this.zoom / (this.view.width / this.view.fullWidth),
                    h = this.zoom / (this.view.height / this.view.fullHeight),
                    l = (this.right - this.left) / this.view.width, u = (this.top - this.bottom) / this.view.height;
                r += l * (this.view.offsetX / c), o = r + l * (this.view.width / c), a -= u * (this.view.offsetY / h), s = a - u * (this.view.height / h)
            }
            this.projectionMatrix.makeOrthographic(r, o, a, s, this.near, this.far)
        },
        toJSON: function (t) {
            var e = st.prototype.toJSON.call(this, t);
            return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, null !== this.view && (e.object.view = Object.assign({}, this.view)), e
        }
    });
    var hh = 0;
    ce.prototype.isFogExp2 = !0, ce.prototype.clone = function () {
        return new ce(this.color.getHex(), this.density)
    }, ce.prototype.toJSON = function (t) {
        return {type: "FogExp2", color: this.color.getHex(), density: this.density}
    }, he.prototype.isFog = !0, he.prototype.clone = function () {
        return new he(this.color.getHex(), this.near, this.far)
    }, he.prototype.toJSON = function (t) {
        return {type: "Fog", color: this.color.getHex(), near: this.near, far: this.far}
    }, le.prototype = Object.create(st.prototype), le.prototype.constructor = le, le.prototype.copy = function (t, e) {
        return st.prototype.copy.call(this, t, e), null !== t.background && (this.background = t.background.clone()), null !== t.fog && (this.fog = t.fog.clone()), null !== t.overrideMaterial && (this.overrideMaterial = t.overrideMaterial.clone()), this.autoUpdate = t.autoUpdate, this.matrixAutoUpdate = t.matrixAutoUpdate, this
    }, le.prototype.toJSON = function (t) {
        var e = st.prototype.toJSON.call(this, t);
        return null !== this.background && (e.object.background = this.background.toJSON(t)), null !== this.fog && (e.object.fog = this.fog.toJSON()), e
    }, ue.prototype = Object.assign(Object.create(st.prototype), {
        constructor: ue, isLensFlare: !0, copy: function (t) {
            st.prototype.copy.call(this, t), this.positionScreen.copy(t.positionScreen), this.customUpdateCallback = t.customUpdateCallback;
            for (var e = 0, n = t.lensFlares.length; e < n; e++)this.lensFlares.push(t.lensFlares[e]);
            return this
        }, add: function (t, e, n, i, r, o) {
            void 0 === e && (e = -1), void 0 === n && (n = 0), void 0 === o && (o = 1), void 0 === r && (r = new j(16777215)), void 0 === i && (i = as), n = Math.min(n, Math.max(0, n)), this.lensFlares.push({
                texture: t,
                size: e,
                distance: n,
                x: 0,
                y: 0,
                z: 0,
                scale: 1,
                rotation: 0,
                opacity: o,
                color: r,
                blending: i
            })
        }, updateLensFlares: function () {
            var t, e, n = this.lensFlares.length, i = 2 * -this.positionScreen.x, r = 2 * -this.positionScreen.y;
            for (t = 0; t < n; t++)e = this.lensFlares[t], e.x = this.positionScreen.x + i * e.distance, e.y = this.positionScreen.y + r * e.distance, e.wantedRotation = e.x * Math.PI * .25, e.rotation += .25 * (e.wantedRotation - e.rotation)
        }
    }), pe.prototype = Object.create(Z.prototype), pe.prototype.constructor = pe, pe.prototype.copy = function (t) {
        return Z.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, this.rotation = t.rotation, this
    }, de.prototype = Object.assign(Object.create(st.prototype), {
        constructor: de, isSprite: !0, raycast: function () {
            var t = new s;
            return function (e, n) {
                t.setFromMatrixPosition(this.matrixWorld);
                var i = e.ray.distanceSqToPoint(t);
                i > this.scale.x * this.scale.y / 4 || n.push({
                    distance: Math.sqrt(i),
                    point: this.position,
                    face: null,
                    object: this
                })
            }
        }(), clone: function () {
            return new this.constructor(this.material).copy(this)
        }
    }), fe.prototype = Object.assign(Object.create(st.prototype), {
        constructor: fe, copy: function (t) {
            st.prototype.copy.call(this, t, !1);
            for (var e = t.levels, n = 0, i = e.length; n < i; n++) {
                var r = e[n];
                this.addLevel(r.object.clone(), r.distance)
            }
            return this
        }, addLevel: function (t, e) {
            void 0 === e && (e = 0), e = Math.abs(e);
            for (var n = this.levels, i = 0; i < n.length && !(e < n[i].distance); i++);
            n.splice(i, 0, {distance: e, object: t}), this.add(t)
        }, getObjectForDistance: function (t) {
            for (var e = this.levels, n = 1, i = e.length; n < i && !(t < e[n].distance); n++);
            return e[n - 1].object
        }, raycast: function () {
            var t = new s;
            return function (e, n) {
                t.setFromMatrixPosition(this.matrixWorld);
                var i = e.ray.origin.distanceTo(t);
                this.getObjectForDistance(i).raycast(e, n)
            }
        }(), update: function () {
            var t = new s, e = new s;
            return function (n) {
                var i = this.levels;
                if (i.length > 1) {
                    t.setFromMatrixPosition(n.matrixWorld), e.setFromMatrixPosition(this.matrixWorld);
                    var r = t.distanceTo(e);
                    i[0].object.visible = !0;
                    for (var o = 1, a = i.length; o < a && r >= i[o].distance; o++)i[o - 1].object.visible = !1, i[o].object.visible = !0;
                    for (; o < a; o++)i[o].object.visible = !1
                }
            }
        }(), toJSON: function (t) {
            var e = st.prototype.toJSON.call(this, t);
            e.object.levels = [];
            for (var n = this.levels, i = 0, r = n.length; i < r; i++) {
                var o = n[i];
                e.object.levels.push({object: o.object.uuid, distance: o.distance})
            }
            return e
        }
    }), Object.assign(me.prototype, {
        calculateInverses: function () {
            this.boneInverses = [];
            for (var t = 0, e = this.bones.length; t < e; t++) {
                var n = new c;
                this.bones[t] && n.getInverse(this.bones[t].matrixWorld), this.boneInverses.push(n)
            }
        }, pose: function () {
            for (var t, e = 0, n = this.bones.length; e < n; e++)(t = this.bones[e]) && t.matrixWorld.getInverse(this.boneInverses[e]);
            for (var e = 0, n = this.bones.length; e < n; e++)(t = this.bones[e]) && (t.parent && t.parent.isBone ? (t.matrix.getInverse(t.parent.matrixWorld), t.matrix.multiply(t.matrixWorld)) : t.matrix.copy(t.matrixWorld), t.matrix.decompose(t.position, t.quaternion, t.scale))
        }, update: function () {
            var t = new c;
            return function () {
                for (var e = 0, n = this.bones.length; e < n; e++) {
                    var i = this.bones[e] ? this.bones[e].matrixWorld : this.identityMatrix;
                    t.multiplyMatrices(i, this.boneInverses[e]), t.toArray(this.boneMatrices, 16 * e)
                }
                this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
            }
        }(), clone: function () {
            return new me(this.bones, this.boneInverses, this.useVertexTexture)
        }
    }), ge.prototype = Object.assign(Object.create(st.prototype), {
        constructor: ge,
        isBone: !0
    }), ve.prototype = Object.assign(Object.create(At.prototype), {
        constructor: ve,
        isSkinnedMesh: !0,
        bind: function (t, e) {
            this.skeleton = t, void 0 === e && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), e = this.matrixWorld), this.bindMatrix.copy(e), this.bindMatrixInverse.getInverse(e)
        },
        pose: function () {
            this.skeleton.pose()
        },
        normalizeSkinWeights: function () {
            if (this.geometry && this.geometry.isGeometry)for (var t = 0; t < this.geometry.skinWeights.length; t++) {
                var e = this.geometry.skinWeights[t], n = 1 / e.lengthManhattan();
                n !== 1 / 0 ? e.multiplyScalar(n) : e.set(1, 0, 0, 0)
            } else if (this.geometry && this.geometry.isBufferGeometry)for (var r = new i, o = this.geometry.attributes.skinWeight, t = 0; t < o.count; t++) {
                r.x = o.getX(t), r.y = o.getY(t), r.z = o.getZ(t), r.w = o.getW(t);
                var n = 1 / r.lengthManhattan();
                n !== 1 / 0 ? r.multiplyScalar(n) : r.set(1, 0, 0, 0), o.setXYZW(t, r.x, r.y, r.z, r.w)
            }
        },
        updateMatrixWorld: function (t) {
            At.prototype.updateMatrixWorld.call(this, !0), "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : console.warn("THREE.SkinnedMesh unrecognized bindMode: " + this.bindMode)
        },
        clone: function () {
            return new this.constructor(this.geometry, this.material, this.skeleton.useVertexTexture).copy(this)
        }
    }), ye.prototype = Object.create(Z.prototype), ye.prototype.constructor = ye, ye.prototype.isLineBasicMaterial = !0, ye.prototype.copy = function (t) {
        return Z.prototype.copy.call(this, t), this.color.copy(t.color), this.linewidth = t.linewidth, this.linecap = t.linecap, this.linejoin = t.linejoin, this
    }, xe.prototype = Object.assign(Object.create(st.prototype), {
        constructor: xe, isLine: !0, raycast: function () {
            var t = new c, e = new rt, n = new $;
            return function (i, r) {
                var o = i.linePrecision, a = o * o, c = this.geometry, h = this.matrixWorld;
                if (null === c.boundingSphere && c.computeBoundingSphere(), n.copy(c.boundingSphere), n.applyMatrix4(h), i.ray.intersectsSphere(n) !== !1) {
                    t.getInverse(h), e.copy(i.ray).applyMatrix4(t);
                    var l = new s, u = new s, p = new s, d = new s, f = this && this.isLineSegments ? 2 : 1;
                    if (c.isBufferGeometry) {
                        var m = c.index, g = c.attributes, v = g.position.array;
                        if (null !== m)for (var y = m.array, x = 0, _ = y.length - 1; x < _; x += f) {
                            var b = y[x], w = y[x + 1];
                            l.fromArray(v, 3 * b), u.fromArray(v, 3 * w);
                            var M = e.distanceSqToSegment(l, u, d, p);
                            if (!(M > a)) {
                                d.applyMatrix4(this.matrixWorld);
                                var E = i.ray.origin.distanceTo(d);
                                E < i.near || E > i.far || r.push({
                                    distance: E,
                                    point: p.clone().applyMatrix4(this.matrixWorld),
                                    index: x,
                                    face: null,
                                    faceIndex: null,
                                    object: this
                                })
                            }
                        } else for (var x = 0, _ = v.length / 3 - 1; x < _; x += f) {
                            l.fromArray(v, 3 * x), u.fromArray(v, 3 * x + 3);
                            var M = e.distanceSqToSegment(l, u, d, p);
                            if (!(M > a)) {
                                d.applyMatrix4(this.matrixWorld);
                                var E = i.ray.origin.distanceTo(d);
                                E < i.near || E > i.far || r.push({
                                    distance: E,
                                    point: p.clone().applyMatrix4(this.matrixWorld),
                                    index: x,
                                    face: null,
                                    faceIndex: null,
                                    object: this
                                })
                            }
                        }
                    } else if (c.isGeometry)for (var T = c.vertices, S = T.length, x = 0; x < S - 1; x += f) {
                        var M = e.distanceSqToSegment(T[x], T[x + 1], d, p);
                        if (!(M > a)) {
                            d.applyMatrix4(this.matrixWorld);
                            var E = i.ray.origin.distanceTo(d);
                            E < i.near || E > i.far || r.push({
                                distance: E,
                                point: p.clone().applyMatrix4(this.matrixWorld),
                                index: x,
                                face: null,
                                faceIndex: null,
                                object: this
                            })
                        }
                    }
                }
            }
        }(), clone: function () {
            return new this.constructor(this.geometry, this.material).copy(this)
        }
    }), _e.prototype = Object.assign(Object.create(xe.prototype), {
        constructor: _e,
        isLineSegments: !0
    }), be.prototype = Object.create(Z.prototype), be.prototype.constructor = be, be.prototype.isPointsMaterial = !0, be.prototype.copy = function (t) {
        return Z.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, this.size = t.size, this.sizeAttenuation = t.sizeAttenuation, this
    }, we.prototype = Object.assign(Object.create(st.prototype), {
        constructor: we, isPoints: !0, raycast: function () {
            var t = new c, e = new rt, n = new $;
            return function (i, r) {
                function o(t, n) {
                    var o = e.distanceSqToPoint(t);
                    if (o < p) {
                        var s = e.closestPointToPoint(t);
                        s.applyMatrix4(h);
                        var c = i.ray.origin.distanceTo(s);
                        if (c < i.near || c > i.far)return;
                        r.push({
                            distance: c,
                            distanceToRay: Math.sqrt(o),
                            point: s.clone(),
                            index: n,
                            face: null,
                            object: a
                        })
                    }
                }

                var a = this, c = this.geometry, h = this.matrixWorld, l = i.params.Points.threshold;
                if (null === c.boundingSphere && c.computeBoundingSphere(), n.copy(c.boundingSphere), n.applyMatrix4(h), i.ray.intersectsSphere(n) !== !1) {
                    t.getInverse(h), e.copy(i.ray).applyMatrix4(t);
                    var u = l / ((this.scale.x + this.scale.y + this.scale.z) / 3), p = u * u, d = new s;
                    if (c.isBufferGeometry) {
                        var f = c.index, m = c.attributes, g = m.position.array;
                        if (null !== f)for (var v = f.array, y = 0, x = v.length; y < x; y++) {
                            var _ = v[y];
                            d.fromArray(g, 3 * _), o(d, _)
                        } else for (var y = 0, b = g.length / 3; y < b; y++)d.fromArray(g, 3 * y), o(d, y)
                    } else for (var w = c.vertices, y = 0, b = w.length; y < b; y++)o(w[y], y)
                }
            }
        }(), clone: function () {
            return new this.constructor(this.geometry, this.material).copy(this)
        }
    }), Me.prototype = Object.assign(Object.create(st.prototype), {constructor: Me}), Ee.prototype = Object.create(n.prototype), Ee.prototype.constructor = Ee, Te.prototype = Object.create(n.prototype), Te.prototype.constructor = Te, Te.prototype.isCompressedTexture = !0, Se.prototype = Object.create(n.prototype), Se.prototype.constructor = Se, Ae.prototype = Object.create(n.prototype), Ae.prototype.constructor = Ae, Ae.prototype.isDepthTexture = !0, Le.prototype = Object.create(St.prototype), Le.prototype.constructor = Le, Re.prototype = Object.create(Tt.prototype), Re.prototype.constructor = Re, Pe.prototype = Object.create(St.prototype), Pe.prototype.constructor = Pe, Ce.prototype = Object.create(Tt.prototype), Ce.prototype.constructor = Ce, Ne.prototype = Object.create(St.prototype), Ne.prototype.constructor = Ne, Ie.prototype = Object.create(Tt.prototype), Ie.prototype.constructor = Ie, Ue.prototype = Object.create(Ne.prototype), Ue.prototype.constructor = Ue, De.prototype = Object.create(Tt.prototype), De.prototype.constructor = De, Oe.prototype = Object.create(Ne.prototype), Oe.prototype.constructor = Oe, ze.prototype = Object.create(Tt.prototype), ze.prototype.constructor = ze, Be.prototype = Object.create(Ne.prototype), Be.prototype.constructor = Be, Fe.prototype = Object.create(Tt.prototype), Fe.prototype.constructor = Fe, Ge.prototype = Object.create(Ne.prototype), Ge.prototype.constructor = Ge, ke.prototype = Object.create(Tt.prototype), ke.prototype.constructor = ke, He.prototype = Object.create(St.prototype), He.prototype.constructor = He, Ve.prototype = Object.create(Tt.prototype), Ve.prototype.constructor = Ve, je.prototype = Object.create(St.prototype), je.prototype.constructor = je, We.prototype = Object.create(Tt.prototype), We.prototype.constructor = We, qe.prototype = Object.create(St.prototype), qe.prototype.constructor = qe;
    var lh = {
        area: function (t) {
            for (var e = t.length, n = 0, i = e - 1, r = 0; r < e; i = r++)n += t[i].x * t[r].y - t[r].x * t[i].y;
            return .5 * n
        }, triangulate: function () {
            function t(t, e, n, i, r, o) {
                var a, s, c, h, l, u, p, d, f;
                if (s = t[o[e]].x, c = t[o[e]].y, h = t[o[n]].x, l = t[o[n]].y, u = t[o[i]].x, p = t[o[i]].y, (h - s) * (p - c) - (l - c) * (u - s) <= 0)return !1;
                var m, g, v, y, x, _, b, w, M, E, T, S, A, L, R;
                for (m = u - h, g = p - l, v = s - u, y = c - p, x = h - s, _ = l - c, a = 0; a < r; a++)if (d = t[o[a]].x, f = t[o[a]].y, !(d === s && f === c || d === h && f === l || d === u && f === p) && (b = d - s, w = f - c, M = d - h, E = f - l, T = d - u, S = f - p, R = m * E - g * M, A = x * w - _ * b, L = v * S - y * T, R >= -Number.EPSILON && L >= -Number.EPSILON && A >= -Number.EPSILON))return !1;
                return !0
            }

            return function (e, n) {
                var i = e.length;
                if (i < 3)return null;
                var r, o, a, s = [], c = [], h = [];
                if (lh.area(e) > 0)for (o = 0; o < i; o++)c[o] = o; else for (o = 0; o < i; o++)c[o] = i - 1 - o;
                var l = i, u = 2 * l;
                for (o = l - 1; l > 2;) {
                    if (u-- <= 0)return console.warn("THREE.ShapeUtils: Unable to triangulate polygon! in triangulate()"), n ? h : s;
                    if (r = o, l <= r && (r = 0), o = r + 1, l <= o && (o = 0), a = o + 1, l <= a && (a = 0), t(e, r, o, a, l, c)) {
                        var p, d, f, m, g;
                        for (p = c[r], d = c[o], f = c[a], s.push([e[p], e[d], e[f]]), h.push([c[r], c[o], c[a]]), m = o, g = o + 1; g < l; m++, g++)c[m] = c[g];
                        l--, u = 2 * l
                    }
                }
                return n ? h : s
            }
        }(), triangulateShape: function (t, e) {
            function n(t) {
                var e = t.length;
                e > 2 && t[e - 1].equals(t[0]) && t.pop()
            }

            function i(t, e, n) {
                return t.x !== e.x ? t.x < e.x ? t.x <= n.x && n.x <= e.x : e.x <= n.x && n.x <= t.x : t.y < e.y ? t.y <= n.y && n.y <= e.y : e.y <= n.y && n.y <= t.y
            }

            function r(t, e, n, r, o) {
                var a = e.x - t.x, s = e.y - t.y, c = r.x - n.x, h = r.y - n.y, l = t.x - n.x, u = t.y - n.y,
                    p = s * c - a * h, d = s * l - a * u;
                if (Math.abs(p) > Number.EPSILON) {
                    var f;
                    if (p > 0) {
                        if (d < 0 || d > p)return [];
                        if ((f = h * l - c * u) < 0 || f > p)return []
                    } else {
                        if (d > 0 || d < p)return [];
                        if ((f = h * l - c * u) > 0 || f < p)return []
                    }
                    if (0 === f)return !o || 0 !== d && d !== p ? [t] : [];
                    if (f === p)return !o || 0 !== d && d !== p ? [e] : [];
                    if (0 === d)return [n];
                    if (d === p)return [r];
                    var m = f / p;
                    return [{x: t.x + m * a, y: t.y + m * s}]
                }
                if (0 !== d || h * l != c * u)return [];
                var g = 0 === a && 0 === s, v = 0 === c && 0 === h;
                if (g && v)return t.x !== n.x || t.y !== n.y ? [] : [t];
                if (g)return i(n, r, t) ? [t] : [];
                if (v)return i(t, e, n) ? [n] : [];
                var y, x, _, b, w, M, E, T;
                return 0 !== a ? (t.x < e.x ? (y = t, _ = t.x, x = e, b = e.x) : (y = e, _ = e.x, x = t, b = t.x), n.x < r.x ? (w = n, E = n.x, M = r, T = r.x) : (w = r, E = r.x, M = n, T = n.x)) : (t.y < e.y ? (y = t, _ = t.y, x = e, b = e.y) : (y = e, _ = e.y, x = t, b = t.y), n.y < r.y ? (w = n, E = n.y, M = r, T = r.y) : (w = r, E = r.y, M = n, T = n.y)), _ <= E ? b < E ? [] : b === E ? o ? [] : [w] : b <= T ? [w, x] : [w, M] : _ > T ? [] : _ === T ? o ? [] : [y] : b <= T ? [y, x] : [y, M]
            }

            function o(t, e, n, i) {
                var r = e.x - t.x, o = e.y - t.y, a = n.x - t.x, s = n.y - t.y, c = i.x - t.x, h = i.y - t.y,
                    l = r * s - o * a, u = r * h - o * c;
                if (Math.abs(l) > Number.EPSILON) {
                    var p = c * s - h * a;
                    return l > 0 ? u >= 0 && p >= 0 : u >= 0 || p >= 0
                }
                return u > 0
            }

            n(t), e.forEach(n);
            for (var a, s, c, h, l, u, p = {}, d = t.concat(), f = 0, m = e.length; f < m; f++)Array.prototype.push.apply(d, e[f]);
            for (a = 0, s = d.length; a < s; a++)l = d[a].x + ":" + d[a].y, void 0 !== p[l] && console.warn("THREE.ShapeUtils: Duplicate point", l, a), p[l] = a;
            var g = function (t, e) {
                for (var n, i, a, s, c, h, l, u, p, d, f, m = t.concat(), g = [], v = [], y = 0, x = e.length; y < x; y++)g.push(y);
                for (var _ = 0, b = 2 * g.length; g.length > 0;) {
                    if (--b < 0) {
                        console.log("Infinite Loop! Holes left:" + g.length + ", Probably Hole outside Shape!");
                        break
                    }
                    for (a = _; a < m.length; a++) {
                        s = m[a], i = -1;
                        for (var y = 0; y < g.length; y++)if (h = g[y], l = s.x + ":" + s.y + ":" + h, void 0 === v[l]) {
                            n = e[h];
                            for (var w = 0; w < n.length; w++)if (c = n[w], function (t, e) {
                                    var i = m.length - 1, r = t - 1;
                                    r < 0 && (r = i);
                                    var a = t + 1;
                                    a > i && (a = 0);
                                    var s = o(m[t], m[r], m[a], n[e]);
                                    if (!s)return !1;
                                    var c = n.length - 1, h = e - 1;
                                    h < 0 && (h = c);
                                    var l = e + 1;
                                    return l > c && (l = 0), !!(s = o(n[e], n[h], n[l], m[t]))
                                }(a, w) && !function (t, e) {
                                    var n, i, o;
                                    for (n = 0; n < m.length; n++)if (i = n + 1, i %= m.length, o = r(t, e, m[n], m[i], !0), o.length > 0)return !0;
                                    return !1
                                }(s, c) && !function (t, n) {
                                    var i, o, a, s, c;
                                    for (i = 0; i < g.length; i++)for (o = e[g[i]], a = 0; a < o.length; a++)if (s = a + 1, s %= o.length, c = r(t, n, o[a], o[s], !0), c.length > 0)return !0;
                                    return !1
                                }(s, c)) {
                                i = w, g.splice(y, 1), u = m.slice(0, a + 1), p = m.slice(a), d = n.slice(i), f = n.slice(0, i + 1), m = u.concat(d).concat(f).concat(p), _ = a;
                                break
                            }
                            if (i >= 0)break;
                            v[l] = !0
                        }
                        if (i >= 0)break
                    }
                }
                return m
            }(t, e), v = lh.triangulate(g, !1);
            for (a = 0, s = v.length; a < s; a++)for (h = v[a], c = 0; c < 3; c++)l = h[c].x + ":" + h[c].y, void 0 !== (u = p[l]) && (h[c] = u);
            return v.concat()
        }, isClockWise: function (t) {
            return lh.area(t) < 0
        }
    };
    Xe.prototype = Object.create(Tt.prototype), Xe.prototype.constructor = Xe, Xe.prototype.addShapeList = function (t, e) {
        for (var n = t.length, i = 0; i < n; i++) {
            var r = t[i];
            this.addShape(r, e)
        }
    }, Xe.prototype.addShape = function (t, n) {
        function i(t, e, n) {
            return e || console.error("THREE.ExtrudeGeometry: vec does not exist"), e.clone().multiplyScalar(n).add(t)
        }

        function r(t, n, i) {
            var r, o, a = 1, s = t.x - n.x, c = t.y - n.y, h = i.x - t.x, l = i.y - t.y, u = s * s + c * c,
                p = s * l - c * h;
            if (Math.abs(p) > Number.EPSILON) {
                var d = Math.sqrt(u), f = Math.sqrt(h * h + l * l), m = n.x - c / d, g = n.y + s / d, v = i.x - l / f,
                    y = i.y + h / f, x = ((v - m) * l - (y - g) * h) / (s * l - c * h);
                r = m + s * x - t.x, o = g + c * x - t.y;
                var _ = r * r + o * o;
                if (_ <= 2)return new e(r, o);
                a = Math.sqrt(_ / 2)
            } else {
                var b = !1;
                s > Number.EPSILON ? h > Number.EPSILON && (b = !0) : s < -Number.EPSILON ? h < -Number.EPSILON && (b = !0) : Math.sign(c) === Math.sign(l) && (b = !0), b ? (r = -c, o = s, a = Math.sqrt(u)) : (r = s, o = c, a = Math.sqrt(u / 2))
            }
            return new e(r / a, o / a)
        }

        function o(t, e) {
            var n, i;
            for (W = t.length; --W >= 0;) {
                n = W, i = W - 1, i < 0 && (i = t.length - 1);
                var r = 0, o = b + 2 * y;
                for (r = 0; r < o; r++) {
                    var a = H * r, s = H * (r + 1);
                    h(e + n + a, e + i + a, e + i + s, e + n + s, t, r, o, n, i)
                }
            }
        }

        function a(t, e, n) {
            L.vertices.push(new s(t, e, n))
        }

        function c(t, e, n) {
            t += R, e += R, n += R, L.faces.push(new lt(t, e, n, null, null, 0));
            var i = E.generateTopUV(L, t, e, n);
            L.faceVertexUvs[0].push(i)
        }

        function h(t, e, n, i, r, o, a, s, c) {
            t += R, e += R, n += R, i += R, L.faces.push(new lt(t, e, i, null, null, 1)), L.faces.push(new lt(e, n, i, null, null, 1));
            var h = E.generateSideWallUV(L, t, e, n, i);
            L.faceVertexUvs[0].push([h[0], h[1], h[3]]), L.faceVertexUvs[0].push([h[1], h[2], h[3]])
        }

        var l, u, p, d, f, m = void 0 !== n.amount ? n.amount : 100,
            g = void 0 !== n.bevelThickness ? n.bevelThickness : 6, v = void 0 !== n.bevelSize ? n.bevelSize : g - 2,
            y = void 0 !== n.bevelSegments ? n.bevelSegments : 3, x = void 0 === n.bevelEnabled || n.bevelEnabled,
            _ = void 0 !== n.curveSegments ? n.curveSegments : 12, b = void 0 !== n.steps ? n.steps : 1,
            w = n.extrudePath, M = !1, E = void 0 !== n.UVGenerator ? n.UVGenerator : Xe.WorldUVGenerator;
        w && (l = w.getSpacedPoints(b), M = !0, x = !1, u = void 0 !== n.frames ? n.frames : w.computeFrenetFrames(b, !1), p = new s, d = new s, f = new s), x || (y = 0, g = 0, v = 0);
        var T, S, A, L = this, R = this.vertices.length, P = t.extractPoints(_), C = P.shape, N = P.holes,
            I = !lh.isClockWise(C);
        if (I) {
            for (C = C.reverse(), S = 0, A = N.length; S < A; S++)T = N[S], lh.isClockWise(T) && (N[S] = T.reverse());
            I = !1
        }
        var U = lh.triangulateShape(C, N), D = C;
        for (S = 0, A = N.length; S < A; S++)T = N[S], C = C.concat(T);
        for (var O, z, B, F, G, k, H = C.length, V = U.length, j = [], W = 0, q = D.length, X = q - 1, Y = W + 1; W < q; W++, X++, Y++)X === q && (X = 0), Y === q && (Y = 0), j[W] = r(D[W], D[X], D[Y]);
        var Z, J = [], Q = j.concat();
        for (S = 0, A = N.length; S < A; S++) {
            for (T = N[S], Z = [], W = 0, q = T.length, X = q - 1, Y = W + 1; W < q; W++, X++, Y++)X === q && (X = 0), Y === q && (Y = 0), Z[W] = r(T[W], T[X], T[Y]);
            J.push(Z), Q = Q.concat(Z)
        }
        for (O = 0; O < y; O++) {
            for (B = O / y, F = g * Math.cos(B * Math.PI / 2), z = v * Math.sin(B * Math.PI / 2), W = 0, q = D.length; W < q; W++)G = i(D[W], j[W], z), a(G.x, G.y, -F);
            for (S = 0, A = N.length; S < A; S++)for (T = N[S], Z = J[S], W = 0, q = T.length; W < q; W++)G = i(T[W], Z[W], z), a(G.x, G.y, -F)
        }
        for (z = v, W = 0; W < H; W++)G = x ? i(C[W], Q[W], z) : C[W], M ? (d.copy(u.normals[0]).multiplyScalar(G.x), p.copy(u.binormals[0]).multiplyScalar(G.y), f.copy(l[0]).add(d).add(p), a(f.x, f.y, f.z)) : a(G.x, G.y, 0);
        var K;
        for (K = 1; K <= b; K++)for (W = 0; W < H; W++)G = x ? i(C[W], Q[W], z) : C[W], M ? (d.copy(u.normals[K]).multiplyScalar(G.x), p.copy(u.binormals[K]).multiplyScalar(G.y), f.copy(l[K]).add(d).add(p), a(f.x, f.y, f.z)) : a(G.x, G.y, m / b * K);
        for (O = y - 1; O >= 0; O--) {
            for (B = O / y, F = g * Math.cos(B * Math.PI / 2), z = v * Math.sin(B * Math.PI / 2), W = 0, q = D.length; W < q; W++)G = i(D[W], j[W], z), a(G.x, G.y, m + F);
            for (S = 0, A = N.length; S < A; S++)for (T = N[S], Z = J[S], W = 0, q = T.length; W < q; W++)G = i(T[W], Z[W], z), M ? a(G.x, G.y + l[b - 1].y, l[b - 1].x + F) : a(G.x, G.y, m + F)
        }
        !function () {
            if (x) {
                var t = 0, e = H * t;
                for (W = 0; W < V; W++)k = U[W], c(k[2] + e, k[1] + e, k[0] + e);
                for (t = b + 2 * y, e = H * t, W = 0; W < V; W++)k = U[W], c(k[0] + e, k[1] + e, k[2] + e)
            } else {
                for (W = 0; W < V; W++)k = U[W], c(k[2], k[1], k[0]);
                for (W = 0; W < V; W++)k = U[W], c(k[0] + H * b, k[1] + H * b, k[2] + H * b)
            }
        }(), function () {
            var t = 0;
            for (o(D, t), t += D.length, S = 0, A = N.length; S < A; S++)T = N[S], o(T, t), t += T.length
        }()
    }, Xe.WorldUVGenerator = {
        generateTopUV: function (t, n, i, r) {
            var o = t.vertices, a = o[n], s = o[i], c = o[r];
            return [new e(a.x, a.y), new e(s.x, s.y), new e(c.x, c.y)]
        }, generateSideWallUV: function (t, n, i, r, o) {
            var a = t.vertices, s = a[n], c = a[i], h = a[r], l = a[o];
            return Math.abs(s.y - c.y) < .01 ? [new e(s.x, 1 - s.z), new e(c.x, 1 - c.z), new e(h.x, 1 - h.z), new e(l.x, 1 - l.z)] : [new e(s.y, 1 - s.z), new e(c.y, 1 - c.z), new e(h.y, 1 - h.z), new e(l.y, 1 - l.z)]
        }
    }, Ye.prototype = Object.create(Xe.prototype), Ye.prototype.constructor = Ye, Ze.prototype = Object.create(Tt.prototype), Ze.prototype.constructor = Ze, Je.prototype = Object.create(St.prototype), Je.prototype.constructor = Je, Qe.prototype = Object.create(Tt.prototype), Qe.prototype.constructor = Qe, Ke.prototype = Object.create(St.prototype), Ke.prototype.constructor = Ke, $e.prototype = Object.create(Tt.prototype), $e.prototype.constructor = $e, tn.prototype = Object.create(St.prototype), tn.prototype.constructor = tn, en.prototype = Object.create(Tt.prototype), en.prototype.constructor = en, nn.prototype = Object.create(St.prototype), nn.prototype.constructor = nn, rn.prototype = Object.create(St.prototype), rn.prototype.constructor = rn, on.prototype = Object.create(Tt.prototype), on.prototype.constructor = on, an.prototype = Object.create(St.prototype), an.prototype.constructor = an, sn.prototype = Object.create(on.prototype), sn.prototype.constructor = sn, cn.prototype = Object.create(an.prototype), cn.prototype.constructor = cn, hn.prototype = Object.create(Tt.prototype), hn.prototype.constructor = hn, ln.prototype = Object.create(St.prototype), ln.prototype.constructor = ln;
    var uh = Object.freeze({
        WireframeGeometry: Le,
        ParametricGeometry: Re,
        ParametricBufferGeometry: Pe,
        TetrahedronGeometry: Ie,
        TetrahedronBufferGeometry: Ue,
        OctahedronGeometry: De,
        OctahedronBufferGeometry: Oe,
        IcosahedronGeometry: ze,
        IcosahedronBufferGeometry: Be,
        DodecahedronGeometry: Fe,
        DodecahedronBufferGeometry: Ge,
        PolyhedronGeometry: Ce,
        PolyhedronBufferGeometry: Ne,
        TubeGeometry: ke,
        TubeBufferGeometry: He,
        TorusKnotGeometry: Ve,
        TorusKnotBufferGeometry: je,
        TorusGeometry: We,
        TorusBufferGeometry: qe,
        TextGeometry: Ye,
        SphereGeometry: Ze,
        SphereBufferGeometry: Je,
        RingGeometry: Qe,
        RingBufferGeometry: Ke,
        PlaneGeometry: Pt,
        PlaneBufferGeometry: Ct,
        LatheGeometry: $e,
        LatheBufferGeometry: tn,
        ShapeGeometry: en,
        ShapeBufferGeometry: nn,
        ExtrudeGeometry: Xe,
        EdgesGeometry: rn,
        ConeGeometry: sn,
        ConeBufferGeometry: cn,
        CylinderGeometry: on,
        CylinderBufferGeometry: an,
        CircleGeometry: hn,
        CircleBufferGeometry: ln,
        BoxGeometry: Lt,
        BoxBufferGeometry: Rt
    });
    un.prototype = Object.create(J.prototype), un.prototype.constructor = un, un.prototype.isShadowMaterial = !0, pn.prototype = Object.create(J.prototype), pn.prototype.constructor = pn, pn.prototype.isRawShaderMaterial = !0, dn.prototype = {
        constructor: dn,
        isMultiMaterial: !0,
        toJSON: function (t) {
            for (var e = {
                metadata: {version: 4.2, type: "material", generator: "MaterialExporter"},
                uuid: this.uuid,
                type: this.type,
                materials: []
            }, n = this.materials, i = 0, r = n.length; i < r; i++) {
                var o = n[i].toJSON(t);
                delete o.metadata, e.materials.push(o)
            }
            return e.visible = this.visible, e
        },
        clone: function () {
            for (var t = new this.constructor, e = 0; e < this.materials.length; e++)t.materials.push(this.materials[e].clone());
            return t.visible = this.visible, t
        }
    }, fn.prototype = Object.create(Z.prototype), fn.prototype.constructor = fn, fn.prototype.isMeshStandardMaterial = !0, fn.prototype.copy = function (t) {
        return Z.prototype.copy.call(this, t), this.defines = {STANDARD: ""}, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapIntensity = t.envMapIntensity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this
    }, mn.prototype = Object.create(fn.prototype), mn.prototype.constructor = mn, mn.prototype.isMeshPhysicalMaterial = !0, mn.prototype.copy = function (t) {
        return fn.prototype.copy.call(this, t), this.defines = {PHYSICAL: ""}, this.reflectivity = t.reflectivity, this.clearCoat = t.clearCoat, this.clearCoatRoughness = t.clearCoatRoughness, this
    }, gn.prototype = Object.create(Z.prototype), gn.prototype.constructor = gn, gn.prototype.isMeshPhongMaterial = !0, gn.prototype.copy = function (t) {
        return Z.prototype.copy.call(this, t), this.color.copy(t.color), this.specular.copy(t.specular), this.shininess = t.shininess, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this
    }, vn.prototype = Object.create(gn.prototype), vn.prototype.constructor = vn, vn.prototype.isMeshToonMaterial = !0, vn.prototype.copy = function (t) {
        return gn.prototype.copy.call(this, t), this.gradientMap = t.gradientMap, this
    }, yn.prototype = Object.create(Z.prototype), yn.prototype.constructor = yn, yn.prototype.isMeshNormalMaterial = !0, yn.prototype.copy = function (t) {
        return Z.prototype.copy.call(this, t), this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this
    }, xn.prototype = Object.create(Z.prototype), xn.prototype.constructor = xn, xn.prototype.isMeshLambertMaterial = !0, xn.prototype.copy = function (t) {
        return Z.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this
    }, _n.prototype = Object.create(Z.prototype), _n.prototype.constructor = _n, _n.prototype.isLineDashedMaterial = !0, _n.prototype.copy = function (t) {
        return Z.prototype.copy.call(this, t), this.color.copy(t.color), this.linewidth = t.linewidth, this.scale = t.scale, this.dashSize = t.dashSize, this.gapSize = t.gapSize, this
    };
    var ph = Object.freeze({
        ShadowMaterial: un,
        SpriteMaterial: pe,
        RawShaderMaterial: pn,
        ShaderMaterial: J,
        PointsMaterial: be,
        MultiMaterial: dn,
        MeshPhysicalMaterial: mn,
        MeshStandardMaterial: fn,
        MeshPhongMaterial: gn,
        MeshToonMaterial: vn,
        MeshNormalMaterial: yn,
        MeshLambertMaterial: xn,
        MeshDepthMaterial: Q,
        MeshBasicMaterial: ut,
        LineDashedMaterial: _n,
        LineBasicMaterial: ye,
        Material: Z
    }), dh = {
        enabled: !1, files: {}, add: function (t, e) {
            this.enabled !== !1 && (this.files[t] = e)
        }, get: function (t) {
            if (this.enabled !== !1)return this.files[t]
        }, remove: function (t) {
            delete this.files[t]
        }, clear: function () {
            this.files = {}
        }
    }, fh = new bn;
    Object.assign(wn.prototype, {
        load: function (t, e, n, i) {
            void 0 === t && (t = ""), void 0 !== this.path && (t = this.path + t);
            var r = this, o = dh.get(t);
            if (void 0 !== o)return r.manager.itemStart(t), setTimeout(function () {
                e && e(o), r.manager.itemEnd(t)
            }, 0), o;
            var a = t.match(/^data:(.*?)(;base64)?,(.*)$/);
            if (a) {
                var s = a[1], c = !!a[2], h = a[3];
                h = window.decodeURIComponent(h), c && (h = window.atob(h));
                try {
                    var l, u = (this.responseType || "").toLowerCase();
                    switch (u) {
                        case"arraybuffer":
                        case"blob":
                            l = new ArrayBuffer(h.length);
                            for (var p = new Uint8Array(l), d = 0; d < h.length; d++)p[d] = h.charCodeAt(d);
                            "blob" === u && (l = new Blob([l], {type: s}));
                            break;
                        case"document":
                            l = (new DOMParser).parseFromString(h, s);
                            break;
                        case"json":
                            l = JSON.parse(h);
                            break;
                        default:
                            l = h
                    }
                    window.setTimeout(function () {
                        e && e(l), r.manager.itemEnd(t)
                    }, 0)
                } catch (e) {
                    window.setTimeout(function () {
                        i && i(e), r.manager.itemError(t)
                    }, 0)
                }
            } else {
                var f = new XMLHttpRequest;
                f.open("GET", t, !0), f.addEventListener("load", function (n) {
                    var o = n.target.response;
                    dh.add(t, o), 200 === this.status ? (e && e(o), r.manager.itemEnd(t)) : 0 === this.status ? (console.warn("THREE.FileLoader: HTTP Status 0 received."), e && e(o), r.manager.itemEnd(t)) : (i && i(n), r.manager.itemError(t))
                }, !1), void 0 !== n && f.addEventListener("progress", function (t) {
                    n(t)
                }, !1), f.addEventListener("error", function (e) {
                    i && i(e), r.manager.itemError(t)
                }, !1), void 0 !== this.responseType && (f.responseType = this.responseType), void 0 !== this.withCredentials && (f.withCredentials = this.withCredentials), f.overrideMimeType && f.overrideMimeType(void 0 !== this.mimeType ? this.mimeType : "text/plain"), f.send(null)
            }
            return r.manager.itemStart(t), f
        }, setPath: function (t) {
            return this.path = t, this
        }, setResponseType: function (t) {
            return this.responseType = t, this
        }, setWithCredentials: function (t) {
            return this.withCredentials = t, this
        }, setMimeType: function (t) {
            return this.mimeType = t, this
        }
    }), Object.assign(Mn.prototype, {
        load: function (t, e, n, i) {
            var r = this, o = [], a = new Te;
            a.image = o;
            var s = new wn(this.manager);
            if (s.setPath(this.path), s.setResponseType("arraybuffer"), Array.isArray(t))for (var c = 0, h = 0, l = t.length; h < l; ++h)!function (h) {
                s.load(t[h], function (t) {
                    var n = r._parser(t, !0);
                    o[h] = {
                        width: n.width,
                        height: n.height,
                        format: n.format,
                        mipmaps: n.mipmaps
                    }, 6 == (c += 1) && (1 === n.mipmapCount && (a.minFilter = nc), a.format = n.format, a.needsUpdate = !0, e && e(a))
                }, n, i)
            }(h); else s.load(t, function (t) {
                var n = r._parser(t, !0);
                if (n.isCubemap)for (var i = n.mipmaps.length / n.mipmapCount, s = 0; s < i; s++) {
                    o[s] = {mipmaps: []};
                    for (var c = 0; c < n.mipmapCount; c++)o[s].mipmaps.push(n.mipmaps[s * n.mipmapCount + c]), o[s].format = n.format, o[s].width = n.width, o[s].height = n.height
                } else a.image.width = n.width, a.image.height = n.height, a.mipmaps = n.mipmaps;
                1 === n.mipmapCount && (a.minFilter = nc), a.format = n.format, a.needsUpdate = !0, e && e(a)
            }, n, i);
            return a
        }, setPath: function (t) {
            return this.path = t, this
        }
    }), Object.assign(En.prototype, {
        load: function (t, e, n, i) {
            var r = this, o = new W, a = new wn(this.manager);
            return a.setResponseType("arraybuffer"), a.load(t, function (t) {
                var n = r._parser(t);
                n && (void 0 !== n.image ? o.image = n.image : void 0 !== n.data && (o.image.width = n.width, o.image.height = n.height, o.image.data = n.data), o.wrapS = void 0 !== n.wrapS ? n.wrapS : Qs, o.wrapT = void 0 !== n.wrapT ? n.wrapT : Qs, o.magFilter = void 0 !== n.magFilter ? n.magFilter : nc, o.minFilter = void 0 !== n.minFilter ? n.minFilter : rc, o.anisotropy = void 0 !== n.anisotropy ? n.anisotropy : 1, void 0 !== n.format && (o.format = n.format), void 0 !== n.type && (o.type = n.type), void 0 !== n.mipmaps && (o.mipmaps = n.mipmaps), 1 === n.mipmapCount && (o.minFilter = nc), o.needsUpdate = !0, e && e(o, n))
            }, n, i), o
        }
    }), Object.assign(Tn.prototype, {
        load: function (t, e, n, i) {
            void 0 === t && (t = ""), void 0 !== this.path && (t = this.path + t);
            var r = this, o = dh.get(t);
            if (void 0 !== o)return r.manager.itemStart(t), setTimeout(function () {
                e && e(o), r.manager.itemEnd(t)
            }, 0), o;
            var a = document.createElementNS("http://www.w3.org/1999/xhtml", "img");
            return a.addEventListener("load", function () {
                dh.add(t, this), e && e(this), r.manager.itemEnd(t)
            }, !1), a.addEventListener("error", function (e) {
                i && i(e), r.manager.itemError(t)
            }, !1), void 0 !== this.crossOrigin && (a.crossOrigin = this.crossOrigin), r.manager.itemStart(t), a.src = t, a
        }, setCrossOrigin: function (t) {
            return this.crossOrigin = t, this
        }, setPath: function (t) {
            return this.path = t, this
        }
    }), Object.assign(Sn.prototype, {
        load: function (t, e, n, i) {
            var r = new h, o = new Tn(this.manager);
            o.setCrossOrigin(this.crossOrigin), o.setPath(this.path);
            for (var a = 0, s = 0; s < t.length; ++s)!function (n) {
                o.load(t[n], function (t) {
                    r.images[n] = t, 6 == ++a && (r.needsUpdate = !0, e && e(r))
                }, void 0, i)
            }(s);
            return r
        }, setCrossOrigin: function (t) {
            return this.crossOrigin = t, this
        }, setPath: function (t) {
            return this.path = t, this
        }
    }), Object.assign(An.prototype, {
        load: function (t, e, i, r) {
            var o = new n, a = new Tn(this.manager);
            return a.setCrossOrigin(this.crossOrigin), a.setPath(this.path), a.load(t, function (n) {
                var i = t.search(/\.(jpg|jpeg)$/) > 0 || 0 === t.search(/^data\:image\/jpeg/);
                o.format = i ? yc : xc, o.image = n, o.needsUpdate = !0, void 0 !== e && e(o)
            }, i, r), o
        }, setCrossOrigin: function (t) {
            return this.crossOrigin = t, this
        }, setPath: function (t) {
            return this.path = t, this
        }
    }), Ln.prototype = Object.assign(Object.create(st.prototype), {
        constructor: Ln, isLight: !0, copy: function (t) {
            return st.prototype.copy.call(this, t), this.color.copy(t.color), this.intensity = t.intensity, this
        }, toJSON: function (t) {
            var e = st.prototype.toJSON.call(this, t);
            return e.object.color = this.color.getHex(), e.object.intensity = this.intensity, void 0 !== this.groundColor && (e.object.groundColor = this.groundColor.getHex()), void 0 !== this.distance && (e.object.distance = this.distance), void 0 !== this.angle && (e.object.angle = this.angle), void 0 !== this.decay && (e.object.decay = this.decay), void 0 !== this.penumbra && (e.object.penumbra = this.penumbra), void 0 !== this.shadow && (e.object.shadow = this.shadow.toJSON()), e
        }
    }), Rn.prototype = Object.assign(Object.create(Ln.prototype), {
        constructor: Rn,
        isHemisphereLight: !0,
        copy: function (t) {
            return Ln.prototype.copy.call(this, t), this.groundColor.copy(t.groundColor), this
        }
    }), Object.assign(Pn.prototype, {
        copy: function (t) {
            return this.camera = t.camera.clone(), this.bias = t.bias, this.radius = t.radius, this.mapSize.copy(t.mapSize), this
        }, clone: function () {
            return (new this.constructor).copy(this)
        }, toJSON: function () {
            var t = {};
            return 0 !== this.bias && (t.bias = this.bias), 1 !== this.radius && (t.radius = this.radius), 512 === this.mapSize.x && 512 === this.mapSize.y || (t.mapSize = this.mapSize.toArray()), t.camera = this.camera.toJSON(!1).object, delete t.camera.matrix, t
        }
    }), Cn.prototype = Object.assign(Object.create(Pn.prototype), {
        constructor: Cn,
        isSpotLightShadow: !0,
        update: function (t) {
            var e = 2 * Yc.RAD2DEG * t.angle, n = this.mapSize.width / this.mapSize.height, i = t.distance || 500,
                r = this.camera;
            e === r.fov && n === r.aspect && i === r.far || (r.fov = e, r.aspect = n, r.far = i, r.updateProjectionMatrix())
        }
    }), Nn.prototype = Object.assign(Object.create(Ln.prototype), {
        constructor: Nn,
        isSpotLight: !0,
        copy: function (t) {
            return Ln.prototype.copy.call(this, t), this.distance = t.distance, this.angle = t.angle, this.penumbra = t.penumbra, this.decay = t.decay, this.target = t.target.clone(), this.shadow = t.shadow.clone(), this
        }
    }), In.prototype = Object.assign(Object.create(Ln.prototype), {
        constructor: In,
        isPointLight: !0,
        copy: function (t) {
            return Ln.prototype.copy.call(this, t), this.distance = t.distance, this.decay = t.decay, this.shadow = t.shadow.clone(), this
        }
    }), Un.prototype = Object.assign(Object.create(Pn.prototype), {constructor: Un}), Dn.prototype = Object.assign(Object.create(Ln.prototype), {
        constructor: Dn,
        isDirectionalLight: !0,
        copy: function (t) {
            return Ln.prototype.copy.call(this, t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this
        }
    }), On.prototype = Object.assign(Object.create(Ln.prototype), {constructor: On, isAmbientLight: !0});
    var mh = {
        arraySlice: function (t, e, n) {
            return mh.isTypedArray(t) ? new t.constructor(t.subarray(e, n)) : t.slice(e, n)
        }, convertArray: function (t, e, n) {
            return !t || !n && t.constructor === e ? t : "number" == typeof e.BYTES_PER_ELEMENT ? new e(t) : Array.prototype.slice.call(t)
        }, isTypedArray: function (t) {
            return ArrayBuffer.isView(t) && !(t instanceof DataView)
        }, getKeyframeOrder: function (t) {
            function e(e, n) {
                return t[e] - t[n]
            }

            for (var n = t.length, i = new Array(n), r = 0; r !== n; ++r)i[r] = r;
            return i.sort(e), i
        }, sortedArray: function (t, e, n) {
            for (var i = t.length, r = new t.constructor(i), o = 0, a = 0; a !== i; ++o)for (var s = n[o] * e, c = 0; c !== e; ++c)r[a++] = t[s + c];
            return r
        }, flattenJSON: function (t, e, n, i) {
            for (var r = 1, o = t[0]; void 0 !== o && void 0 === o[i];)o = t[r++];
            if (void 0 !== o) {
                var a = o[i];
                if (void 0 !== a)if (Array.isArray(a))do a = o[i], void 0 !== a && (e.push(o.time), n.push.apply(n, a)), o = t[r++]; while (void 0 !== o) else if (void 0 !== a.toArray)do a = o[i], void 0 !== a && (e.push(o.time), a.toArray(n, n.length)), o = t[r++]; while (void 0 !== o) else do a = o[i], void 0 !== a && (e.push(o.time), n.push(a)), o = t[r++]; while (void 0 !== o)
            }
        }
    };
    zn.prototype = {
        constructor: zn, evaluate: function (t) {
            var e = this.parameterPositions, n = this._cachedIndex, i = e[n], r = e[n - 1];
            t:{
                e:{
                    var o;
                    n:{
                        i:if (!(t < i)) {
                            for (var a = n + 2; ;) {
                                if (void 0 === i) {
                                    if (t < r)break i;
                                    return n = e.length, this._cachedIndex = n, this.afterEnd_(n - 1, t, r)
                                }
                                if (n === a)break;
                                if (r = i, i = e[++n], t < i)break e
                            }
                            o = e.length;
                            break n
                        }
                        if (t >= r)break t;
                        var s = e[1];
                        t < s && (n = 2, r = s);
                        for (var a = n - 2; ;) {
                            if (void 0 === r)return this._cachedIndex = 0, this.beforeStart_(0, t, i);
                            if (n === a)break;
                            if (i = r, r = e[--n - 1], t >= r)break e
                        }
                        o = n, n = 0
                    }
                    for (; n < o;) {
                        var c = n + o >>> 1;
                        t < e[c] ? o = c : n = c + 1
                    }
                    if (i = e[n], void 0 === (r = e[n - 1]))return this._cachedIndex = 0, this.beforeStart_(0, t, i);
                    if (void 0 === i)return n = e.length, this._cachedIndex = n, this.afterEnd_(n - 1, r, t)
                }
                this._cachedIndex = n, this.intervalChanged_(n, r, i)
            }
            return this.interpolate_(n, r, t, i)
        }, settings: null, DefaultSettings_: {}, getSettings_: function () {
            return this.settings || this.DefaultSettings_
        }, copySampleValue_: function (t) {
            for (var e = this.resultBuffer, n = this.sampleValues, i = this.valueSize, r = t * i, o = 0; o !== i; ++o)e[o] = n[r + o];
            return e
        }, interpolate_: function (t, e, n, i) {
            throw new Error("call to abstract method")
        }, intervalChanged_: function (t, e, n) {
        }
    }, Object.assign(zn.prototype, {
        beforeStart_: zn.prototype.copySampleValue_,
        afterEnd_: zn.prototype.copySampleValue_
    }), Bn.prototype = Object.assign(Object.create(zn.prototype), {
        constructor: Bn,
        DefaultSettings_: {endingStart: Dc, endingEnd: Dc},
        intervalChanged_: function (t, e, n) {
            var i = this.parameterPositions, r = t - 2, o = t + 1, a = i[r], s = i[o];
            if (void 0 === a)switch (this.getSettings_().endingStart) {
                case 2401:
                    r = t, a = 2 * e - n;
                    break;
                case 2402:
                    r = i.length - 2, a = e + i[r] - i[r + 1];
                    break;
                default:
                    r = t, a = n
            }
            if (void 0 === s)switch (this.getSettings_().endingEnd) {
                case 2401:
                    o = t, s = 2 * n - e;
                    break;
                case 2402:
                    o = 1, s = n + i[1] - i[0];
                    break;
                default:
                    o = t - 1, s = e
            }
            var c = .5 * (n - e), h = this.valueSize;
            this._weightPrev = c / (e - a), this._weightNext = c / (s - n), this._offsetPrev = r * h, this._offsetNext = o * h
        },
        interpolate_: function (t, e, n, i) {
            for (var r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, s = t * a, c = s - a, h = this._offsetPrev, l = this._offsetNext, u = this._weightPrev, p = this._weightNext, d = (n - e) / (i - e), f = d * d, m = f * d, g = -u * m + 2 * u * f - u * d, v = (1 + u) * m + (-1.5 - 2 * u) * f + (-.5 + u) * d + 1, y = (-1 - p) * m + (1.5 + p) * f + .5 * d, x = p * m - p * f, _ = 0; _ !== a; ++_)r[_] = g * o[h + _] + v * o[c + _] + y * o[s + _] + x * o[l + _];
            return r
        }
    }), Fn.prototype = Object.assign(Object.create(zn.prototype), {
        constructor: Fn,
        interpolate_: function (t, e, n, i) {
            for (var r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, s = t * a, c = s - a, h = (n - e) / (i - e), l = 1 - h, u = 0; u !== a; ++u)r[u] = o[c + u] * l + o[s + u] * h;
            return r
        }
    }), Gn.prototype = Object.assign(Object.create(zn.prototype), {
        constructor: Gn,
        interpolate_: function (t, e, n, i) {
            return this.copySampleValue_(t - 1)
        }
    });
    var gh;
    gh = {
        TimeBufferType: Float32Array,
        ValueBufferType: Float32Array,
        DefaultInterpolation: 2301,
        InterpolantFactoryMethodDiscrete: function (t) {
            return new Gn(this.times, this.values, this.getValueSize(), t)
        },
        InterpolantFactoryMethodLinear: function (t) {
            return new Fn(this.times, this.values, this.getValueSize(), t)
        },
        InterpolantFactoryMethodSmooth: function (t) {
            return new Bn(this.times, this.values, this.getValueSize(), t)
        },
        setInterpolation: function (t) {
            var e;
            switch (t) {
                case 2300:
                    e = this.InterpolantFactoryMethodDiscrete;
                    break;
                case 2301:
                    e = this.InterpolantFactoryMethodLinear;
                    break;
                case 2302:
                    e = this.InterpolantFactoryMethodSmooth
            }
            if (void 0 === e) {
                var n = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
                if (void 0 === this.createInterpolant) {
                    if (t === this.DefaultInterpolation)throw new Error(n);
                    this.setInterpolation(this.DefaultInterpolation)
                }
                return void console.warn(n)
            }
            this.createInterpolant = e
        },
        getInterpolation: function () {
            switch (this.createInterpolant) {
                case this.InterpolantFactoryMethodDiscrete:
                    return 2300;
                case this.InterpolantFactoryMethodLinear:
                    return 2301;
                case this.InterpolantFactoryMethodSmooth:
                    return 2302
            }
        },
        getValueSize: function () {
            return this.values.length / this.times.length
        },
        shift: function (t) {
            if (0 !== t)for (var e = this.times, n = 0, i = e.length; n !== i; ++n)e[n] += t;
            return this
        },
        scale: function (t) {
            if (1 !== t)for (var e = this.times, n = 0, i = e.length; n !== i; ++n)e[n] *= t;
            return this
        },
        trim: function (t, e) {
            for (var n = this.times, i = n.length, r = 0, o = i - 1; r !== i && n[r] < t;)++r;
            for (; o !== -1 && n[o] > e;)--o;
            if (++o, 0 !== r || o !== i) {
                r >= o && (o = Math.max(o, 1), r = o - 1);
                var a = this.getValueSize();
                this.times = mh.arraySlice(n, r, o), this.values = mh.arraySlice(this.values, r * a, o * a)
            }
            return this
        },
        validate: function () {
            var t = !0, e = this.getValueSize();
            e - Math.floor(e) != 0 && (console.error("invalid value size in track", this), t = !1);
            var n = this.times, i = this.values, r = n.length;
            0 === r && (console.error("track is empty", this), t = !1);
            for (var o = null, a = 0; a !== r; a++) {
                var s = n[a];
                if ("number" == typeof s && isNaN(s)) {
                    console.error("time is not a valid number", this, a, s), t = !1;
                    break
                }
                if (null !== o && o > s) {
                    console.error("out of order keys", this, a, s, o), t = !1;
                    break
                }
                o = s
            }
            if (void 0 !== i && mh.isTypedArray(i))for (var a = 0, c = i.length; a !== c; ++a) {
                var h = i[a];
                if (isNaN(h)) {
                    console.error("value is not a valid number", this, a, h), t = !1;
                    break
                }
            }
            return t
        },
        optimize: function () {
            for (var t = this.times, e = this.values, n = this.getValueSize(), i = 2302 === this.getInterpolation(), r = 1, o = t.length - 1, a = 1; a < o; ++a) {
                var s = !1, c = t[a];
                if (c !== t[a + 1] && (1 !== a || c !== c[0]))if (i) s = !0; else for (var h = a * n, l = h - n, u = h + n, p = 0; p !== n; ++p) {
                    var d = e[h + p];
                    if (d !== e[l + p] || d !== e[u + p]) {
                        s = !0;
                        break
                    }
                }
                if (s) {
                    if (a !== r) {
                        t[r] = t[a];
                        for (var f = a * n, m = r * n, p = 0; p !== n; ++p)e[m + p] = e[f + p]
                    }
                    ++r
                }
            }
            if (o > 0) {
                t[r] = t[o];
                for (var f = o * n, m = r * n, p = 0; p !== n; ++p)e[m + p] = e[f + p];
                ++r
            }
            return r !== t.length && (this.times = mh.arraySlice(t, 0, r), this.values = mh.arraySlice(e, 0, r * n)), this
        }
    }, Hn.prototype = Object.assign(Object.create(gh), {
        constructor: Hn,
        ValueTypeName: "vector"
    }), Vn.prototype = Object.assign(Object.create(zn.prototype), {
        constructor: Vn,
        interpolate_: function (t, e, n, i) {
            for (var r = this.resultBuffer, o = this.sampleValues, s = this.valueSize, c = t * s, h = (n - e) / (i - e), l = c + s; c !== l; c += 4)a.slerpFlat(r, 0, o, c - s, o, c, h);
            return r
        }
    }), jn.prototype = Object.assign(Object.create(gh), {
        constructor: jn,
        ValueTypeName: "quaternion",
        DefaultInterpolation: 2301,
        InterpolantFactoryMethodLinear: function (t) {
            return new Vn(this.times, this.values, this.getValueSize(), t)
        },
        InterpolantFactoryMethodSmooth: void 0
    }), Wn.prototype = Object.assign(Object.create(gh), {
        constructor: Wn,
        ValueTypeName: "number"
    }), qn.prototype = Object.assign(Object.create(gh), {
        constructor: qn,
        ValueTypeName: "string",
        ValueBufferType: Array,
        DefaultInterpolation: 2300,
        InterpolantFactoryMethodLinear: void 0,
        InterpolantFactoryMethodSmooth: void 0
    }), Xn.prototype = Object.assign(Object.create(gh), {
        constructor: Xn,
        ValueTypeName: "bool",
        ValueBufferType: Array,
        DefaultInterpolation: 2300,
        InterpolantFactoryMethodLinear: void 0,
        InterpolantFactoryMethodSmooth: void 0
    }), Yn.prototype = Object.assign(Object.create(gh), {
        constructor: Yn,
        ValueTypeName: "color"
    }), Zn.prototype = gh, gh.constructor = Zn, Object.assign(Zn, {
        parse: function (t) {
            if (void 0 === t.type)throw new Error("track type undefined, can not parse");
            var e = Zn._getTrackTypeForValueTypeName(t.type);
            if (void 0 === t.times) {
                var n = [], i = [];
                mh.flattenJSON(t.keys, n, i, "value"), t.times = n, t.values = i
            }
            return void 0 !== e.parse ? e.parse(t) : new e(t.name, t.times, t.values, t.interpolation)
        }, toJSON: function (t) {
            var e, n = t.constructor;
            if (void 0 !== n.toJSON) e = n.toJSON(t); else {
                e = {name: t.name, times: mh.convertArray(t.times, Array), values: mh.convertArray(t.values, Array)};
                var i = t.getInterpolation();
                i !== t.DefaultInterpolation && (e.interpolation = i)
            }
            return e.type = t.ValueTypeName, e
        }, _getTrackTypeForValueTypeName: function (t) {
            switch (t.toLowerCase()) {
                case"scalar":
                case"double":
                case"float":
                case"number":
                case"integer":
                    return Wn;
                case"vector":
                case"vector2":
                case"vector3":
                case"vector4":
                    return Hn;
                case"color":
                    return Yn;
                case"quaternion":
                    return jn;
                case"bool":
                case"boolean":
                    return Xn;
                case"string":
                    return qn
            }
            throw new Error("Unsupported typeName: " + t)
        }
    }), Jn.prototype = {
        constructor: Jn, resetDuration: function () {
            for (var t = this.tracks, e = 0, n = 0, i = t.length; n !== i; ++n) {
                var r = this.tracks[n];
                e = Math.max(e, r.times[r.times.length - 1])
            }
            this.duration = e
        }, trim: function () {
            for (var t = 0; t < this.tracks.length; t++)this.tracks[t].trim(0, this.duration);
            return this
        }, optimize: function () {
            for (var t = 0; t < this.tracks.length; t++)this.tracks[t].optimize();
            return this
        }
    }, Object.assign(Jn, {
        parse: function (t) {
            for (var e = [], n = t.tracks, i = 1 / (t.fps || 1), r = 0, o = n.length; r !== o; ++r)e.push(Zn.parse(n[r]).scale(i));
            return new Jn(t.name, t.duration, e)
        }, toJSON: function (t) {
            for (var e = [], n = t.tracks, i = {
                name: t.name,
                duration: t.duration,
                tracks: e
            }, r = 0, o = n.length; r !== o; ++r)e.push(Zn.toJSON(n[r]));
            return i
        }, CreateFromMorphTargetSequence: function (t, e, n, i) {
            for (var r = e.length, o = [], a = 0; a < r; a++) {
                var s = [], c = [];
                s.push((a + r - 1) % r, a, (a + 1) % r), c.push(0, 1, 0);
                var h = mh.getKeyframeOrder(s);
                s = mh.sortedArray(s, 1, h), c = mh.sortedArray(c, 1, h), i || 0 !== s[0] || (s.push(r), c.push(c[0])), o.push(new Wn(".morphTargetInfluences[" + e[a].name + "]", s, c).scale(1 / n))
            }
            return new Jn(t, -1, o)
        }, findByName: function (t, e) {
            var n = t;
            if (!Array.isArray(t)) {
                var i = t;
                n = i.geometry && i.geometry.animations || i.animations
            }
            for (var r = 0; r < n.length; r++)if (n[r].name === e)return n[r];
            return null
        }, CreateClipsFromMorphTargetSequences: function (t, e, n) {
            for (var i = {}, r = 0, o = t.length; r < o; r++) {
                var a = t[r], s = a.name.match(/^([\w-]*?)([\d]+)$/);
                if (s && s.length > 1) {
                    var c = s[1], h = i[c];
                    h || (i[c] = h = []), h.push(a)
                }
            }
            var l = [];
            for (var c in i)l.push(Jn.CreateFromMorphTargetSequence(c, i[c], e, n));
            return l
        }, parseAnimation: function (t, e) {
            if (!t)return console.error("  no animation in JSONLoader data"), null;
            for (var n = function (t, e, n, i, r) {
                if (0 !== n.length) {
                    var o = [], a = [];
                    mh.flattenJSON(n, o, a, i), 0 !== o.length && r.push(new t(e, o, a))
                }
            }, i = [], r = t.name || "default", o = t.length || -1, a = t.fps || 30, s = t.hierarchy || [], c = 0; c < s.length; c++) {
                var h = s[c].keys;
                if (h && 0 !== h.length)if (h[0].morphTargets) {
                    for (var l = {}, u = 0; u < h.length; u++)if (h[u].morphTargets)for (var p = 0; p < h[u].morphTargets.length; p++)l[h[u].morphTargets[p]] = -1;
                    for (var d in l) {
                        for (var f = [], m = [], p = 0; p !== h[u].morphTargets.length; ++p) {
                            var g = h[u];
                            f.push(g.time), m.push(g.morphTarget === d ? 1 : 0)
                        }
                        i.push(new Wn(".morphTargetInfluence[" + d + "]", f, m))
                    }
                    o = l.length * (a || 1)
                } else {
                    var v = ".bones[" + e[c].name + "]";
                    n(Hn, v + ".position", h, "pos", i), n(jn, v + ".quaternion", h, "rot", i), n(Hn, v + ".scale", h, "scl", i)
                }
            }
            return 0 === i.length ? null : new Jn(r, o, i)
        }
    }), Object.assign(Qn.prototype, {
        load: function (t, e, n, i) {
            var r = this;
            new wn(r.manager).load(t, function (t) {
                e(r.parse(JSON.parse(t)))
            }, n, i)
        }, setTextures: function (t) {
            this.textures = t
        }, parse: function (t) {
            function n(t) {
                return void 0 === i[t] && console.warn("THREE.MaterialLoader: Undefined texture", t), i[t]
            }

            var i = this.textures, r = new ph[t.type];
            if (void 0 !== t.uuid && (r.uuid = t.uuid), void 0 !== t.name && (r.name = t.name), void 0 !== t.color && r.color.setHex(t.color), void 0 !== t.roughness && (r.roughness = t.roughness), void 0 !== t.metalness && (r.metalness = t.metalness), void 0 !== t.emissive && r.emissive.setHex(t.emissive), void 0 !== t.specular && r.specular.setHex(t.specular), void 0 !== t.shininess && (r.shininess = t.shininess), void 0 !== t.clearCoat && (r.clearCoat = t.clearCoat), void 0 !== t.clearCoatRoughness && (r.clearCoatRoughness = t.clearCoatRoughness), void 0 !== t.uniforms && (r.uniforms = t.uniforms), void 0 !== t.vertexShader && (r.vertexShader = t.vertexShader), void 0 !== t.fragmentShader && (r.fragmentShader = t.fragmentShader), void 0 !== t.vertexColors && (r.vertexColors = t.vertexColors), void 0 !== t.fog && (r.fog = t.fog), void 0 !== t.shading && (r.shading = t.shading), void 0 !== t.blending && (r.blending = t.blending), void 0 !== t.side && (r.side = t.side), void 0 !== t.opacity && (r.opacity = t.opacity), void 0 !== t.transparent && (r.transparent = t.transparent), void 0 !== t.alphaTest && (r.alphaTest = t.alphaTest), void 0 !== t.depthTest && (r.depthTest = t.depthTest), void 0 !== t.depthWrite && (r.depthWrite = t.depthWrite), void 0 !== t.colorWrite && (r.colorWrite = t.colorWrite), void 0 !== t.wireframe && (r.wireframe = t.wireframe), void 0 !== t.wireframeLinewidth && (r.wireframeLinewidth = t.wireframeLinewidth), void 0 !== t.wireframeLinecap && (r.wireframeLinecap = t.wireframeLinecap), void 0 !== t.wireframeLinejoin && (r.wireframeLinejoin = t.wireframeLinejoin), void 0 !== t.skinning && (r.skinning = t.skinning), void 0 !== t.morphTargets && (r.morphTargets = t.morphTargets), void 0 !== t.size && (r.size = t.size), void 0 !== t.sizeAttenuation && (r.sizeAttenuation = t.sizeAttenuation), void 0 !== t.map && (r.map = n(t.map)), void 0 !== t.alphaMap && (r.alphaMap = n(t.alphaMap), r.transparent = !0), void 0 !== t.bumpMap && (r.bumpMap = n(t.bumpMap)), void 0 !== t.bumpScale && (r.bumpScale = t.bumpScale), void 0 !== t.normalMap && (r.normalMap = n(t.normalMap)), void 0 !== t.normalScale) {
                var o = t.normalScale;
                Array.isArray(o) === !1 && (o = [o, o]), r.normalScale = (new e).fromArray(o)
            }
            if (void 0 !== t.displacementMap && (r.displacementMap = n(t.displacementMap)), void 0 !== t.displacementScale && (r.displacementScale = t.displacementScale), void 0 !== t.displacementBias && (r.displacementBias = t.displacementBias), void 0 !== t.roughnessMap && (r.roughnessMap = n(t.roughnessMap)), void 0 !== t.metalnessMap && (r.metalnessMap = n(t.metalnessMap)), void 0 !== t.emissiveMap && (r.emissiveMap = n(t.emissiveMap)), void 0 !== t.emissiveIntensity && (r.emissiveIntensity = t.emissiveIntensity), void 0 !== t.specularMap && (r.specularMap = n(t.specularMap)), void 0 !== t.envMap && (r.envMap = n(t.envMap)), void 0 !== t.reflectivity && (r.reflectivity = t.reflectivity), void 0 !== t.lightMap && (r.lightMap = n(t.lightMap)), void 0 !== t.lightMapIntensity && (r.lightMapIntensity = t.lightMapIntensity), void 0 !== t.aoMap && (r.aoMap = n(t.aoMap)), void 0 !== t.aoMapIntensity && (r.aoMapIntensity = t.aoMapIntensity), void 0 !== t.gradientMap && (r.gradientMap = n(t.gradientMap)), void 0 !== t.materials)for (var a = 0, s = t.materials.length; a < s; a++)r.materials.push(this.parse(t.materials[a]));
            return r
        }
    }), Object.assign(Kn.prototype, {
        load: function (t, e, n, i) {
            var r = this;
            new wn(r.manager).load(t, function (t) {
                e(r.parse(JSON.parse(t)))
            }, n, i)
        }, parse: function (t) {
            var e = new St, n = t.data.index, i = {
                Int8Array: Int8Array,
                Uint8Array: Uint8Array,
                Uint8ClampedArray: Uint8ClampedArray,
                Int16Array: Int16Array,
                Uint16Array: Uint16Array,
                Int32Array: Int32Array,
                Uint32Array: Uint32Array,
                Float32Array: Float32Array,
                Float64Array: Float64Array
            };
            if (void 0 !== n) {
                var r = new i[n.type](n.array);
                e.setIndex(new pt(r, 1))
            }
            var o = t.data.attributes;
            for (var a in o) {
                var c = o[a], r = new i[c.type](c.array);
                e.addAttribute(a, new pt(r, c.itemSize, c.normalized))
            }
            var h = t.data.groups || t.data.drawcalls || t.data.offsets;
            if (void 0 !== h)for (var l = 0, u = h.length; l !== u; ++l) {
                var p = h[l];
                e.addGroup(p.start, p.count, p.materialIndex)
            }
            var d = t.data.boundingSphere;
            if (void 0 !== d) {
                var f = new s;
                void 0 !== d.center && f.fromArray(d.center), e.boundingSphere = new $(f, d.radius)
            }
            return e
        }
    }), $n.prototype = {
        constructor: $n, crossOrigin: void 0, extractUrlBase: function (t) {
            var e = t.split("/");
            return 1 === e.length ? "./" : (e.pop(), e.join("/") + "/")
        }, initMaterials: function (t, e, n) {
            for (var i = [], r = 0; r < t.length; ++r)i[r] = this.createMaterial(t[r], e, n);
            return i
        }, createMaterial: function () {
            var t, e, n, i = {
                NoBlending: os,
                NormalBlending: as,
                AdditiveBlending: ss,
                SubtractiveBlending: cs,
                MultiplyBlending: hs,
                CustomBlending: ls
            };
            return function (r, o, a) {
                function s(t, n, i, r, s) {
                    var h, l = o + t, u = $n.Handlers.get(l);
                    null !== u ? h = u.load(l) : (e.setCrossOrigin(a), h = e.load(l)), void 0 !== n && (h.repeat.fromArray(n), 1 !== n[0] && (h.wrapS = Js), 1 !== n[1] && (h.wrapT = Js)), void 0 !== i && h.offset.fromArray(i), void 0 !== r && ("repeat" === r[0] && (h.wrapS = Js), "mirror" === r[0] && (h.wrapS = Ks), "repeat" === r[1] && (h.wrapT = Js), "mirror" === r[1] && (h.wrapT = Ks)), void 0 !== s && (h.anisotropy = s);
                    var p = Yc.generateUUID();
                    return c[p] = h, p
                }

                void 0 === t && (t = new j), void 0 === e && (e = new An), void 0 === n && (n = new Qn);
                var c = {}, h = {uuid: Yc.generateUUID(), type: "MeshLambertMaterial"};
                for (var l in r) {
                    var u = r[l];
                    switch (l) {
                        case"DbgColor":
                        case"DbgIndex":
                        case"opticalDensity":
                        case"illumination":
                            break;
                        case"DbgName":
                            h.name = u;
                            break;
                        case"blending":
                            h.blending = i[u];
                            break;
                        case"colorAmbient":
                        case"mapAmbient":
                            console.warn("THREE.Loader.createMaterial:", l, "is no longer supported.");
                            break;
                        case"colorDiffuse":
                            h.color = t.fromArray(u).getHex();
                            break;
                        case"colorSpecular":
                            h.specular = t.fromArray(u).getHex();
                            break;
                        case"colorEmissive":
                            h.emissive = t.fromArray(u).getHex();
                            break;
                        case"specularCoef":
                            h.shininess = u;
                            break;
                        case"shading":
                            "basic" === u.toLowerCase() && (h.type = "MeshBasicMaterial"), "phong" === u.toLowerCase() && (h.type = "MeshPhongMaterial"), "standard" === u.toLowerCase() && (h.type = "MeshStandardMaterial");
                            break;
                        case"mapDiffuse":
                            h.map = s(u, r.mapDiffuseRepeat, r.mapDiffuseOffset, r.mapDiffuseWrap, r.mapDiffuseAnisotropy);
                            break;
                        case"mapDiffuseRepeat":
                        case"mapDiffuseOffset":
                        case"mapDiffuseWrap":
                        case"mapDiffuseAnisotropy":
                            break;
                        case"mapEmissive":
                            h.emissiveMap = s(u, r.mapEmissiveRepeat, r.mapEmissiveOffset, r.mapEmissiveWrap, r.mapEmissiveAnisotropy);
                            break;
                        case"mapEmissiveRepeat":
                        case"mapEmissiveOffset":
                        case"mapEmissiveWrap":
                        case"mapEmissiveAnisotropy":
                            break;
                        case"mapLight":
                            h.lightMap = s(u, r.mapLightRepeat, r.mapLightOffset, r.mapLightWrap, r.mapLightAnisotropy);
                            break;
                        case"mapLightRepeat":
                        case"mapLightOffset":
                        case"mapLightWrap":
                        case"mapLightAnisotropy":
                            break;
                        case"mapAO":
                            h.aoMap = s(u, r.mapAORepeat, r.mapAOOffset, r.mapAOWrap, r.mapAOAnisotropy);
                            break;
                        case"mapAORepeat":
                        case"mapAOOffset":
                        case"mapAOWrap":
                        case"mapAOAnisotropy":
                            break;
                        case"mapBump":
                            h.bumpMap = s(u, r.mapBumpRepeat, r.mapBumpOffset, r.mapBumpWrap, r.mapBumpAnisotropy);
                            break;
                        case"mapBumpScale":
                            h.bumpScale = u;
                            break;
                        case"mapBumpRepeat":
                        case"mapBumpOffset":
                        case"mapBumpWrap":
                        case"mapBumpAnisotropy":
                            break;
                        case"mapNormal":
                            h.normalMap = s(u, r.mapNormalRepeat, r.mapNormalOffset, r.mapNormalWrap, r.mapNormalAnisotropy);
                            break;
                        case"mapNormalFactor":
                            h.normalScale = [u, u];
                            break;
                        case"mapNormalRepeat":
                        case"mapNormalOffset":
                        case"mapNormalWrap":
                        case"mapNormalAnisotropy":
                            break;
                        case"mapSpecular":
                            h.specularMap = s(u, r.mapSpecularRepeat, r.mapSpecularOffset, r.mapSpecularWrap, r.mapSpecularAnisotropy);
                            break;
                        case"mapSpecularRepeat":
                        case"mapSpecularOffset":
                        case"mapSpecularWrap":
                        case"mapSpecularAnisotropy":
                            break;
                        case"mapMetalness":
                            h.metalnessMap = s(u, r.mapMetalnessRepeat, r.mapMetalnessOffset, r.mapMetalnessWrap, r.mapMetalnessAnisotropy);
                            break;
                        case"mapMetalnessRepeat":
                        case"mapMetalnessOffset":
                        case"mapMetalnessWrap":
                        case"mapMetalnessAnisotropy":
                            break;
                        case"mapRoughness":
                            h.roughnessMap = s(u, r.mapRoughnessRepeat, r.mapRoughnessOffset, r.mapRoughnessWrap, r.mapRoughnessAnisotropy);
                            break;
                        case"mapRoughnessRepeat":
                        case"mapRoughnessOffset":
                        case"mapRoughnessWrap":
                        case"mapRoughnessAnisotropy":
                            break;
                        case"mapAlpha":
                            h.alphaMap = s(u, r.mapAlphaRepeat, r.mapAlphaOffset, r.mapAlphaWrap, r.mapAlphaAnisotropy);
                            break;
                        case"mapAlphaRepeat":
                        case"mapAlphaOffset":
                        case"mapAlphaWrap":
                        case"mapAlphaAnisotropy":
                            break;
                        case"flipSided":
                            h.side = Ka;
                            break;
                        case"doubleSided":
                            h.side = $a;
                            break;
                        case"transparency":
                            console.warn("THREE.Loader.createMaterial: transparency has been renamed to opacity"), h.opacity = u;
                            break;
                        case"depthTest":
                        case"depthWrite":
                        case"colorWrite":
                        case"opacity":
                        case"reflectivity":
                        case"transparent":
                        case"visible":
                        case"wireframe":
                            h[l] = u;
                            break;
                        case"vertexColors":
                            u === !0 && (h.vertexColors = rs), "face" === u && (h.vertexColors = is);
                            break;
                        default:
                            console.error("THREE.Loader.createMaterial: Unsupported", l, u)
                    }
                }
                return "MeshBasicMaterial" === h.type && delete h.emissive, "MeshPhongMaterial" !== h.type && delete h.specular, h.opacity < 1 && (h.transparent = !0), n.setTextures(c), n.parse(h)
            }
        }()
    }, $n.Handlers = {
        handlers: [], add: function (t, e) {
            this.handlers.push(t, e)
        }, get: function (t) {
            for (var e = this.handlers, n = 0, i = e.length; n < i; n += 2) {
                var r = e[n], o = e[n + 1];
                if (r.test(t))return o
            }
            return null
        }
    }, Object.assign(ti.prototype, {
        load: function (t, e, n, i) {
            var r = this,
                o = this.texturePath && "string" == typeof this.texturePath ? this.texturePath : $n.prototype.extractUrlBase(t),
                a = new wn(this.manager);
            a.setWithCredentials(this.withCredentials), a.load(t, function (n) {
                var i = JSON.parse(n), a = i.metadata;
                if (void 0 !== a) {
                    var s = a.type;
                    if (void 0 !== s) {
                        if ("object" === s.toLowerCase())return void console.error("THREE.JSONLoader: " + t + " should be loaded with THREE.ObjectLoader instead.");
                        if ("scene" === s.toLowerCase())return void console.error("THREE.JSONLoader: " + t + " should be loaded with THREE.SceneLoader instead.")
                    }
                }
                var c = r.parse(i, o);
                e(c.geometry, c.materials)
            }, n, i)
        }, setTexturePath: function (t) {
            this.texturePath = t
        }, parse: function (t, n) {
            var r = new Tt, o = void 0 !== t.scale ? 1 / t.scale : 1;
            return function (n) {
                function i(t, e) {
                    return t & 1 << e
                }

                var o, a, c, h, l, u, p, d, f, m, g, v, y, x, _, b, w, M, E, T, S, A, L, R, P, C, N, I = t.faces,
                    U = t.vertices, D = t.normals, O = t.colors, z = 0;
                if (void 0 !== t.uvs) {
                    for (o = 0; o < t.uvs.length; o++)t.uvs[o].length && z++;
                    for (o = 0; o < z; o++)r.faceVertexUvs[o] = []
                }
                for (h = 0, l = U.length; h < l;)M = new s, M.x = U[h++] * n, M.y = U[h++] * n, M.z = U[h++] * n, r.vertices.push(M);
                for (h = 0, l = I.length; h < l;)if (m = I[h++], g = i(m, 0), v = i(m, 1), y = i(m, 3), x = i(m, 4), _ = i(m, 5), b = i(m, 6), w = i(m, 7), g) {
                    if (T = new lt, T.a = I[h], T.b = I[h + 1], T.c = I[h + 3], S = new lt, S.a = I[h + 1], S.b = I[h + 2], S.c = I[h + 3], h += 4, v && (f = I[h++], T.materialIndex = f, S.materialIndex = f), c = r.faces.length, y)for (o = 0; o < z; o++)for (R = t.uvs[o], r.faceVertexUvs[o][c] = [], r.faceVertexUvs[o][c + 1] = [], a = 0; a < 4; a++)d = I[h++], C = R[2 * d], N = R[2 * d + 1], P = new e(C, N), 2 !== a && r.faceVertexUvs[o][c].push(P), 0 !== a && r.faceVertexUvs[o][c + 1].push(P);
                    if (x && (p = 3 * I[h++], T.normal.set(D[p++], D[p++], D[p]), S.normal.copy(T.normal)), _)for (o = 0; o < 4; o++)p = 3 * I[h++], L = new s(D[p++], D[p++], D[p]), 2 !== o && T.vertexNormals.push(L), 0 !== o && S.vertexNormals.push(L);
                    if (b && (u = I[h++], A = O[u], T.color.setHex(A), S.color.setHex(A)), w)for (o = 0; o < 4; o++)u = I[h++], A = O[u], 2 !== o && T.vertexColors.push(new j(A)), 0 !== o && S.vertexColors.push(new j(A));
                    r.faces.push(T), r.faces.push(S)
                } else {
                    if (E = new lt, E.a = I[h++], E.b = I[h++], E.c = I[h++], v && (f = I[h++], E.materialIndex = f), c = r.faces.length, y)for (o = 0; o < z; o++)for (R = t.uvs[o], r.faceVertexUvs[o][c] = [], a = 0; a < 3; a++)d = I[h++], C = R[2 * d], N = R[2 * d + 1], P = new e(C, N), r.faceVertexUvs[o][c].push(P);
                    if (x && (p = 3 * I[h++], E.normal.set(D[p++], D[p++], D[p])), _)for (o = 0; o < 3; o++)p = 3 * I[h++], L = new s(D[p++], D[p++], D[p]), E.vertexNormals.push(L);
                    if (b && (u = I[h++], E.color.setHex(O[u])), w)for (o = 0; o < 3; o++)u = I[h++], E.vertexColors.push(new j(O[u]));
                    r.faces.push(E)
                }
            }(o), function () {
                var e = void 0 !== t.influencesPerVertex ? t.influencesPerVertex : 2;
                if (t.skinWeights)for (var n = 0, o = t.skinWeights.length; n < o; n += e) {
                    var a = t.skinWeights[n], s = e > 1 ? t.skinWeights[n + 1] : 0,
                        c = e > 2 ? t.skinWeights[n + 2] : 0, h = e > 3 ? t.skinWeights[n + 3] : 0;
                    r.skinWeights.push(new i(a, s, c, h))
                }
                if (t.skinIndices)for (var n = 0, o = t.skinIndices.length; n < o; n += e) {
                    var l = t.skinIndices[n], u = e > 1 ? t.skinIndices[n + 1] : 0,
                        p = e > 2 ? t.skinIndices[n + 2] : 0, d = e > 3 ? t.skinIndices[n + 3] : 0;
                    r.skinIndices.push(new i(l, u, p, d))
                }
                r.bones = t.bones, r.bones && r.bones.length > 0 && (r.skinWeights.length !== r.skinIndices.length || r.skinIndices.length !== r.vertices.length) && console.warn("When skinning, number of vertices (" + r.vertices.length + "), skinIndices (" + r.skinIndices.length + "), and skinWeights (" + r.skinWeights.length + ") should match.")
            }(), function (e) {
                if (void 0 !== t.morphTargets)for (var n = 0, i = t.morphTargets.length; n < i; n++) {
                    r.morphTargets[n] = {}, r.morphTargets[n].name = t.morphTargets[n].name, r.morphTargets[n].vertices = [];
                    for (var o = r.morphTargets[n].vertices, a = t.morphTargets[n].vertices, c = 0, h = a.length; c < h; c += 3) {
                        var l = new s;
                        l.x = a[c] * e, l.y = a[c + 1] * e, l.z = a[c + 2] * e, o.push(l)
                    }
                }
                if (void 0 !== t.morphColors && t.morphColors.length > 0) {
                    console.warn('THREE.JSONLoader: "morphColors" no longer supported. Using them as face colors.');
                    for (var u = r.faces, p = t.morphColors[0].colors, n = 0, i = u.length; n < i; n++)u[n].color.fromArray(p, 3 * n)
                }
            }(o), function () {
                var e = [], n = [];
                void 0 !== t.animation && n.push(t.animation), void 0 !== t.animations && (t.animations.length ? n = n.concat(t.animations) : n.push(t.animations));
                for (var i = 0; i < n.length; i++) {
                    var o = Jn.parseAnimation(n[i], r.bones);
                    o && e.push(o)
                }
                if (r.morphTargets) {
                    var a = Jn.CreateClipsFromMorphTargetSequences(r.morphTargets, 10);
                    e = e.concat(a)
                }
                e.length > 0 && (r.animations = e)
            }(), r.computeFaceNormals(), r.computeBoundingSphere(), void 0 === t.materials || 0 === t.materials.length ? {geometry: r} : {
                geometry: r,
                materials: $n.prototype.initMaterials(t.materials, n, this.crossOrigin)
            }
        }
    }), Object.assign(ei.prototype, {
        load: function (t, e, n, i) {
            "" === this.texturePath && (this.texturePath = t.substring(0, t.lastIndexOf("/") + 1));
            var r = this;
            new wn(r.manager).load(t, function (n) {
                var o = null;
                try {
                    o = JSON.parse(n)
                } catch (e) {
                    return void 0 !== i && i(e), void console.error("THREE:ObjectLoader: Can't parse " + t + ".", e.message)
                }
                var a = o.metadata;
                if (void 0 === a || void 0 === a.type || "geometry" === a.type.toLowerCase())return void console.error("THREE.ObjectLoader: Can't load " + t + ". Use THREE.JSONLoader instead.");
                r.parse(o, e)
            }, n, i)
        }, setTexturePath: function (t) {
            this.texturePath = t
        }, setCrossOrigin: function (t) {
            this.crossOrigin = t
        }, parse: function (t, e) {
            var n = this.parseGeometries(t.geometries), i = this.parseImages(t.images, function () {
                    void 0 !== e && e(a)
                }), r = this.parseTextures(t.textures, i), o = this.parseMaterials(t.materials, r),
                a = this.parseObject(t.object, n, o);
            return t.animations && (a.animations = this.parseAnimations(t.animations)), void 0 !== t.images && 0 !== t.images.length || void 0 !== e && e(a), a
        },
        parseGeometries: function (t) {
            var e = {};
            if (void 0 !== t)for (var n = new ti, i = new Kn, r = 0, o = t.length; r < o; r++) {
                var a, s = t[r];
                switch (s.type) {
                    case"PlaneGeometry":
                    case"PlaneBufferGeometry":
                        a = new uh[s.type](s.width, s.height, s.widthSegments, s.heightSegments);
                        break;
                    case"BoxGeometry":
                    case"BoxBufferGeometry":
                    case"CubeGeometry":
                        a = new uh[s.type](s.width, s.height, s.depth, s.widthSegments, s.heightSegments, s.depthSegments);
                        break;
                    case"CircleGeometry":
                    case"CircleBufferGeometry":
                        a = new uh[s.type](s.radius, s.segments, s.thetaStart, s.thetaLength);
                        break;
                    case"CylinderGeometry":
                    case"CylinderBufferGeometry":
                        a = new uh[s.type](s.radiusTop, s.radiusBottom, s.height, s.radialSegments, s.heightSegments, s.openEnded, s.thetaStart, s.thetaLength);
                        break;
                    case"ConeGeometry":
                    case"ConeBufferGeometry":
                        a = new uh[s.type](s.radius, s.height, s.radialSegments, s.heightSegments, s.openEnded, s.thetaStart, s.thetaLength);
                        break;
                    case"SphereGeometry":
                    case"SphereBufferGeometry":
                        a = new uh[s.type](s.radius, s.widthSegments, s.heightSegments, s.phiStart, s.phiLength, s.thetaStart, s.thetaLength);
                        break;
                    case"DodecahedronGeometry":
                    case"IcosahedronGeometry":
                    case"OctahedronGeometry":
                    case"TetrahedronGeometry":
                        a = new uh[s.type](s.radius, s.detail);
                        break;
                    case"RingGeometry":
                    case"RingBufferGeometry":
                        a = new uh[s.type](s.innerRadius, s.outerRadius, s.thetaSegments, s.phiSegments, s.thetaStart, s.thetaLength);
                        break;
                    case"TorusGeometry":
                    case"TorusBufferGeometry":
                        a = new uh[s.type](s.radius, s.tube, s.radialSegments, s.tubularSegments, s.arc);
                        break;
                    case"TorusKnotGeometry":
                    case"TorusKnotBufferGeometry":
                        a = new uh[s.type](s.radius, s.tube, s.tubularSegments, s.radialSegments, s.p, s.q);
                        break;
                    case"LatheGeometry":
                    case"LatheBufferGeometry":
                        a = new uh[s.type](s.points, s.segments, s.phiStart, s.phiLength);
                        break;
                    case"BufferGeometry":
                        a = i.parse(s);
                        break;
                    case"Geometry":
                        a = n.parse(s.data, this.texturePath).geometry;
                        break;
                    default:
                        console.warn('THREE.ObjectLoader: Unsupported geometry type "' + s.type + '"');
                        continue
                }
                a.uuid = s.uuid, void 0 !== s.name && (a.name = s.name), e[s.uuid] = a
            }
            return e
        }, parseMaterials: function (t, e) {
            var n = {};
            if (void 0 !== t) {
                var i = new Qn;
                i.setTextures(e);
                for (var r = 0, o = t.length; r < o; r++) {
                    var a = i.parse(t[r]);
                    n[a.uuid] = a
                }
            }
            return n
        }, parseAnimations: function (t) {
            for (var e = [], n = 0; n < t.length; n++) {
                var i = Jn.parse(t[n]);
                e.push(i)
            }
            return e
        }, parseImages: function (t, e) {
            var n = this, i = {};
            if (void 0 !== t && t.length > 0) {
                var r = new bn(e), o = new Tn(r);
                o.setCrossOrigin(this.crossOrigin);
                for (var a = 0, s = t.length; a < s; a++) {
                    var c = t[a], h = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(c.url) ? c.url : n.texturePath + c.url;
                    i[c.uuid] = function (t) {
                        return n.manager.itemStart(t), o.load(t, function () {
                            n.manager.itemEnd(t)
                        }, void 0, function () {
                            n.manager.itemError(t)
                        })
                    }(h)
                }
            }
            return i
        }, parseTextures: function (t, e) {
            function i(t, e) {
                return "number" == typeof t ? t : (console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.", t), e[t])
            }

            var r = {
                UVMapping: 300,
                CubeReflectionMapping: Vs,
                CubeRefractionMapping: js,
                EquirectangularReflectionMapping: Ws,
                EquirectangularRefractionMapping: qs,
                SphericalReflectionMapping: Xs,
                CubeUVReflectionMapping: Ys,
                CubeUVRefractionMapping: Zs
            }, o = {RepeatWrapping: Js, ClampToEdgeWrapping: Qs, MirroredRepeatWrapping: Ks}, a = {
                NearestFilter: $s,
                NearestMipMapNearestFilter: tc,
                NearestMipMapLinearFilter: ec,
                LinearFilter: nc,
                LinearMipMapNearestFilter: ic,
                LinearMipMapLinearFilter: rc
            }, s = {};
            if (void 0 !== t)for (var c = 0, h = t.length; c < h; c++) {
                var l = t[c];
                void 0 === l.image && console.warn('THREE.ObjectLoader: No "image" specified for', l.uuid), void 0 === e[l.image] && console.warn("THREE.ObjectLoader: Undefined image", l.image);
                var u = new n(e[l.image]);
                u.needsUpdate = !0, u.uuid = l.uuid, void 0 !== l.name && (u.name = l.name), void 0 !== l.mapping && (u.mapping = i(l.mapping, r)), void 0 !== l.offset && u.offset.fromArray(l.offset), void 0 !== l.repeat && u.repeat.fromArray(l.repeat), void 0 !== l.wrap && (u.wrapS = i(l.wrap[0], o), u.wrapT = i(l.wrap[1], o)), void 0 !== l.minFilter && (u.minFilter = i(l.minFilter, a)), void 0 !== l.magFilter && (u.magFilter = i(l.magFilter, a)), void 0 !== l.anisotropy && (u.anisotropy = l.anisotropy), void 0 !== l.flipY && (u.flipY = l.flipY), s[l.uuid] = u
            }
            return s
        }, parseObject: function () {
            var t = new c;
            return function (e, n, i) {
                function r(t) {
                    return void 0 === n[t] && console.warn("THREE.ObjectLoader: Undefined geometry", t), n[t]
                }

                function o(t) {
                    if (void 0 !== t)return void 0 === i[t] && console.warn("THREE.ObjectLoader: Undefined material", t), i[t]
                }

                var a;
                switch (e.type) {
                    case"Scene":
                        a = new le, void 0 !== e.background && Number.isInteger(e.background) && (a.background = new j(e.background)), void 0 !== e.fog && ("Fog" === e.fog.type ? a.fog = new he(e.fog.color, e.fog.near, e.fog.far) : "FogExp2" === e.fog.type && (a.fog = new ce(e.fog.color, e.fog.density)));
                        break;
                    case"PerspectiveCamera":
                        a = new It(e.fov, e.aspect, e.near, e.far), void 0 !== e.focus && (a.focus = e.focus), void 0 !== e.zoom && (a.zoom = e.zoom), void 0 !== e.filmGauge && (a.filmGauge = e.filmGauge), void 0 !== e.filmOffset && (a.filmOffset = e.filmOffset), void 0 !== e.view && (a.view = Object.assign({}, e.view));
                        break;
                    case"OrthographicCamera":
                        a = new Ut(e.left, e.right, e.top, e.bottom, e.near, e.far);
                        break;
                    case"AmbientLight":
                        a = new On(e.color, e.intensity);
                        break;
                    case"DirectionalLight":
                        a = new Dn(e.color, e.intensity);
                        break;
                    case"PointLight":
                        a = new In(e.color, e.intensity, e.distance, e.decay);
                        break;
                    case"SpotLight":
                        a = new Nn(e.color, e.intensity, e.distance, e.angle, e.penumbra, e.decay);
                        break;
                    case"HemisphereLight":
                        a = new Rn(e.color, e.groundColor, e.intensity);
                        break;
                    case"Mesh":
                        var s = r(e.geometry), c = o(e.material);
                        a = s.bones && s.bones.length > 0 ? new ve(s, c) : new At(s, c);
                        break;
                    case"LOD":
                        a = new fe;
                        break;
                    case"Line":
                        a = new xe(r(e.geometry), o(e.material), e.mode);
                        break;
                    case"LineSegments":
                        a = new _e(r(e.geometry), o(e.material));
                        break;
                    case"PointCloud":
                    case"Points":
                        a = new we(r(e.geometry), o(e.material));
                        break;
                    case"Sprite":
                        a = new de(o(e.material));
                        break;
                    case"Group":
                        a = new Me;
                        break;
                    case"SkinnedMesh":
                        console.warn("THREE.ObjectLoader.parseObject() does not support SkinnedMesh type. Instantiates Object3D instead.");
                    default:
                        a = new st
                }
                if (a.uuid = e.uuid, void 0 !== e.name && (a.name = e.name), void 0 !== e.matrix ? (t.fromArray(e.matrix), t.decompose(a.position, a.quaternion, a.scale)) : (void 0 !== e.position && a.position.fromArray(e.position), void 0 !== e.rotation && a.rotation.fromArray(e.rotation), void 0 !== e.quaternion && a.quaternion.fromArray(e.quaternion), void 0 !== e.scale && a.scale.fromArray(e.scale)), void 0 !== e.castShadow && (a.castShadow = e.castShadow), void 0 !== e.receiveShadow && (a.receiveShadow = e.receiveShadow), e.shadow && (void 0 !== e.shadow.bias && (a.shadow.bias = e.shadow.bias), void 0 !== e.shadow.radius && (a.shadow.radius = e.shadow.radius), void 0 !== e.shadow.mapSize && a.shadow.mapSize.fromArray(e.shadow.mapSize), void 0 !== e.shadow.camera && (a.shadow.camera = this.parseObject(e.shadow.camera))), void 0 !== e.visible && (a.visible = e.visible), void 0 !== e.userData && (a.userData = e.userData), void 0 !== e.children)for (var h in e.children)a.add(this.parseObject(e.children[h], n, i));
                if ("LOD" === e.type)for (var l = e.levels, u = 0; u < l.length; u++) {
                    var p = l[u], h = a.getObjectByProperty("uuid", p.object);
                    void 0 !== h && a.addLevel(h, p.distance)
                }
                return a
            }
        }()
    }), pi.prototype = {
        constructor: pi, getPoint: function (t) {
            return console.warn("THREE.Curve: Warning, getPoint() not implemented!"), null
        }, getPointAt: function (t) {
            var e = this.getUtoTmapping(t);
            return this.getPoint(e)
        }, getPoints: function (t) {
            isNaN(t) && (t = 5);
            for (var e = [], n = 0; n <= t; n++)e.push(this.getPoint(n / t));
            return e
        }, getSpacedPoints: function (t) {
            isNaN(t) && (t = 5);
            for (var e = [], n = 0; n <= t; n++)e.push(this.getPointAt(n / t));
            return e
        }, getLength: function () {
            var t = this.getLengths();
            return t[t.length - 1]
        }, getLengths: function (t) {
            if (isNaN(t) && (t = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200), this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate)return this.cacheArcLengths;
            this.needsUpdate = !1;
            var e, n, i = [], r = this.getPoint(0), o = 0;
            for (i.push(0), n = 1; n <= t; n++)e = this.getPoint(n / t), o += e.distanceTo(r), i.push(o), r = e;
            return this.cacheArcLengths = i, i
        }, updateArcLengths: function () {
            this.needsUpdate = !0, this.getLengths()
        }, getUtoTmapping: function (t, e) {
            var n, i = this.getLengths(), r = 0, o = i.length;
            n = e ? e : t * i[o - 1];
            for (var a, s = 0, c = o - 1; s <= c;)if (r = Math.floor(s + (c - s) / 2), (a = i[r] - n) < 0) s = r + 1; else {
                if (!(a > 0)) {
                    c = r;
                    break
                }
                c = r - 1
            }
            if (r = c, i[r] === n) {
                var h = r / (o - 1);
                return h
            }
            var l = i[r], u = i[r + 1], p = u - l, d = (n - l) / p, h = (r + d) / (o - 1);
            return h
        }, getTangent: function (t) {
            var e = t - 1e-4, n = t + 1e-4;
            e < 0 && (e = 0), n > 1 && (n = 1);
            var i = this.getPoint(e);
            return this.getPoint(n).clone().sub(i).normalize()
        }, getTangentAt: function (t) {
            var e = this.getUtoTmapping(t);
            return this.getTangent(e)
        }, computeFrenetFrames: function (t, e) {
            var n, i, r, o = new s, a = [], h = [], l = [], u = new s, p = new c;
            for (n = 0; n <= t; n++)i = n / t, a[n] = this.getTangentAt(i), a[n].normalize();
            h[0] = new s, l[0] = new s;
            var d = Number.MAX_VALUE, f = Math.abs(a[0].x), m = Math.abs(a[0].y), g = Math.abs(a[0].z);
            for (f <= d && (d = f, o.set(1, 0, 0)), m <= d && (d = m, o.set(0, 1, 0)), g <= d && o.set(0, 0, 1), u.crossVectors(a[0], o).normalize(), h[0].crossVectors(a[0], u), l[0].crossVectors(a[0], h[0]), n = 1; n <= t; n++)h[n] = h[n - 1].clone(), l[n] = l[n - 1].clone(), u.crossVectors(a[n - 1], a[n]), u.length() > Number.EPSILON && (u.normalize(), r = Math.acos(Yc.clamp(a[n - 1].dot(a[n]), -1, 1)), h[n].applyMatrix4(p.makeRotationAxis(u, r))), l[n].crossVectors(a[n], h[n]);
            if (e === !0)for (r = Math.acos(Yc.clamp(h[0].dot(h[t]), -1, 1)), r /= t, a[0].dot(u.crossVectors(h[0], h[t])) > 0 && (r = -r), n = 1; n <= t; n++)h[n].applyMatrix4(p.makeRotationAxis(a[n], r * n)), l[n].crossVectors(a[n], h[n]);
            return {tangents: a, normals: h, binormals: l}
        }
    }, di.prototype = Object.create(pi.prototype), di.prototype.constructor = di, di.prototype.isLineCurve = !0, di.prototype.getPoint = function (t) {
        if (1 === t)return this.v2.clone();
        var e = this.v2.clone().sub(this.v1);
        return e.multiplyScalar(t).add(this.v1), e
    }, di.prototype.getPointAt = function (t) {
        return this.getPoint(t)
    }, di.prototype.getTangent = function (t) {
        return this.v2.clone().sub(this.v1).normalize()
    }, fi.prototype = Object.assign(Object.create(pi.prototype), {
        constructor: fi, add: function (t) {
            this.curves.push(t)
        }, closePath: function () {
            var t = this.curves[0].getPoint(0), e = this.curves[this.curves.length - 1].getPoint(1);
            t.equals(e) || this.curves.push(new di(e, t))
        }, getPoint: function (t) {
            for (var e = t * this.getLength(), n = this.getCurveLengths(), i = 0; i < n.length;) {
                if (n[i] >= e) {
                    var r = n[i] - e, o = this.curves[i], a = o.getLength(), s = 0 === a ? 0 : 1 - r / a;
                    return o.getPointAt(s)
                }
                i++
            }
            return null
        }, getLength: function () {
            var t = this.getCurveLengths();
            return t[t.length - 1]
        }, updateArcLengths: function () {
            this.needsUpdate = !0, this.cacheLengths = null, this.getLengths()
        }, getCurveLengths: function () {
            if (this.cacheLengths && this.cacheLengths.length === this.curves.length)return this.cacheLengths;
            for (var t = [], e = 0, n = 0, i = this.curves.length; n < i; n++)e += this.curves[n].getLength(), t.push(e);
            return this.cacheLengths = t, t
        }, getSpacedPoints: function (t) {
            isNaN(t) && (t = 40);
            for (var e = [], n = 0; n <= t; n++)e.push(this.getPoint(n / t));
            return this.autoClose && e.push(e[0]), e
        }, getPoints: function (t) {
            t = t || 12;
            for (var e, n = [], i = 0, r = this.curves; i < r.length; i++)for (var o = r[i], a = o && o.isEllipseCurve ? 2 * t : o && o.isLineCurve ? 1 : o && o.isSplineCurve ? t * o.points.length : t, s = o.getPoints(a), c = 0; c < s.length; c++) {
                var h = s[c];
                e && e.equals(h) || (n.push(h), e = h)
            }
            return this.autoClose && n.length > 1 && !n[n.length - 1].equals(n[0]) && n.push(n[0]), n
        }, createPointsGeometry: function (t) {
            var e = this.getPoints(t);
            return this.createGeometry(e)
        }, createSpacedPointsGeometry: function (t) {
            var e = this.getSpacedPoints(t);
            return this.createGeometry(e)
        }, createGeometry: function (t) {
            for (var e = new Tt, n = 0, i = t.length; n < i; n++) {
                var r = t[n];
                e.vertices.push(new s(r.x, r.y, r.z || 0))
            }
            return e
        }
    }), mi.prototype = Object.create(pi.prototype), mi.prototype.constructor = mi, mi.prototype.isEllipseCurve = !0, mi.prototype.getPoint = function (t) {
        for (var n = 2 * Math.PI, i = this.aEndAngle - this.aStartAngle, r = Math.abs(i) < Number.EPSILON; i < 0;)i += n;
        for (; i > n;)i -= n;
        i < Number.EPSILON && (i = r ? 0 : n), this.aClockwise !== !0 || r || (i === n ? i = -n : i -= n);
        var o = this.aStartAngle + t * i, a = this.aX + this.xRadius * Math.cos(o),
            s = this.aY + this.yRadius * Math.sin(o);
        if (0 !== this.aRotation) {
            var c = Math.cos(this.aRotation), h = Math.sin(this.aRotation), l = a - this.aX, u = s - this.aY;
            a = l * c - u * h + this.aX, s = l * h + u * c + this.aY
        }
        return new e(a, s)
    }, gi.prototype = Object.create(pi.prototype), gi.prototype.constructor = gi, gi.prototype.isSplineCurve = !0, gi.prototype.getPoint = function (t) {
        var n = this.points, i = (n.length - 1) * t, r = Math.floor(i), o = i - r, a = n[0 === r ? r : r - 1], s = n[r],
            c = n[r > n.length - 2 ? n.length - 1 : r + 1], h = n[r > n.length - 3 ? n.length - 1 : r + 2];
        return new e(ni(o, a.x, s.x, c.x, h.x), ni(o, a.y, s.y, c.y, h.y))
    }, vi.prototype = Object.create(pi.prototype), vi.prototype.constructor = vi, vi.prototype.getPoint = function (t) {
        var n = this.v0, i = this.v1, r = this.v2, o = this.v3;
        return new e(ui(t, n.x, i.x, r.x, o.x), ui(t, n.y, i.y, r.y, o.y))
    }, yi.prototype = Object.create(pi.prototype), yi.prototype.constructor = yi, yi.prototype.getPoint = function (t) {
        var n = this.v0, i = this.v1, r = this.v2;
        return new e(ai(t, n.x, i.x, r.x), ai(t, n.y, i.y, r.y))
    };
    var vh = Object.assign(Object.create(fi.prototype), {
        fromPoints: function (t) {
            this.moveTo(t[0].x, t[0].y);
            for (var e = 1, n = t.length; e < n; e++)this.lineTo(t[e].x, t[e].y)
        }, moveTo: function (t, e) {
            this.currentPoint.set(t, e)
        }, lineTo: function (t, n) {
            var i = new di(this.currentPoint.clone(), new e(t, n));
            this.curves.push(i), this.currentPoint.set(t, n)
        }, quadraticCurveTo: function (t, n, i, r) {
            var o = new yi(this.currentPoint.clone(), new e(t, n), new e(i, r));
            this.curves.push(o), this.currentPoint.set(i, r)
        }, bezierCurveTo: function (t, n, i, r, o, a) {
            var s = new vi(this.currentPoint.clone(), new e(t, n), new e(i, r), new e(o, a));
            this.curves.push(s), this.currentPoint.set(o, a)
        }, splineThru: function (t) {
            var e = [this.currentPoint.clone()].concat(t), n = new gi(e);
            this.curves.push(n), this.currentPoint.copy(t[t.length - 1])
        }, arc: function (t, e, n, i, r, o) {
            var a = this.currentPoint.x, s = this.currentPoint.y;
            this.absarc(t + a, e + s, n, i, r, o)
        }, absarc: function (t, e, n, i, r, o) {
            this.absellipse(t, e, n, n, i, r, o)
        }, ellipse: function (t, e, n, i, r, o, a, s) {
            var c = this.currentPoint.x, h = this.currentPoint.y;
            this.absellipse(t + c, e + h, n, i, r, o, a, s)
        }, absellipse: function (t, e, n, i, r, o, a, s) {
            var c = new mi(t, e, n, i, r, o, a, s);
            if (this.curves.length > 0) {
                var h = c.getPoint(0);
                h.equals(this.currentPoint) || this.lineTo(h.x, h.y)
            }
            this.curves.push(c);
            var l = c.getPoint(1);
            this.currentPoint.copy(l)
        }
    });
    xi.prototype = vh, vh.constructor = xi, _i.prototype = Object.assign(Object.create(vh), {
        constructor: _i,
        getPointsHoles: function (t) {
            for (var e = [], n = 0, i = this.holes.length; n < i; n++)e[n] = this.holes[n].getPoints(t);
            return e
        },
        extractAllPoints: function (t) {
            return {shape: this.getPoints(t), holes: this.getPointsHoles(t)}
        },
        extractPoints: function (t) {
            return this.extractAllPoints(t)
        }
    }), bi.prototype = {
        moveTo: function (t, e) {
            this.currentPath = new xi, this.subPaths.push(this.currentPath), this.currentPath.moveTo(t, e)
        }, lineTo: function (t, e) {
            this.currentPath.lineTo(t, e)
        }, quadraticCurveTo: function (t, e, n, i) {
            this.currentPath.quadraticCurveTo(t, e, n, i)
        }, bezierCurveTo: function (t, e, n, i, r, o) {
            this.currentPath.bezierCurveTo(t, e, n, i, r, o)
        }, splineThru: function (t) {
            this.currentPath.splineThru(t)
        }, toShapes: function (t, e) {
            function n(t) {
                for (var e = [], n = 0, i = t.length; n < i; n++) {
                    var r = t[n], o = new _i;
                    o.curves = r.curves, e.push(o)
                }
                return e
            }

            var i = lh.isClockWise, r = this.subPaths;
            if (0 === r.length)return [];
            if (e === !0)return n(r);
            var o, a, s, c = [];
            if (1 === r.length)return a = r[0], s = new _i, s.curves = a.curves, c.push(s), c;
            var h = !i(r[0].getPoints());
            h = t ? !h : h;
            var l, u = [], p = [], d = [], f = 0;
            p[f] = void 0, d[f] = [];
            for (var m = 0, g = r.length; m < g; m++)a = r[m], l = a.getPoints(), o = i(l), o = t ? !o : o, o ? (!h && p[f] && f++, p[f] = {
                s: new _i,
                p: l
            }, p[f].s.curves = a.curves, h && f++, d[f] = []) : d[f].push({h: a, p: l[0]});
            if (!p[0])return n(r);
            if (p.length > 1) {
                for (var v = !1, y = [], x = 0, _ = p.length; x < _; x++)u[x] = [];
                for (var x = 0, _ = p.length; x < _; x++)for (var b = d[x], w = 0; w < b.length; w++) {
                    for (var M = b[w], E = !0, T = 0; T < p.length; T++)(function (t, e) {
                        for (var n = e.length, i = !1, r = n - 1, o = 0; o < n; r = o++) {
                            var a = e[r], s = e[o], c = s.x - a.x, h = s.y - a.y;
                            if (Math.abs(h) > Number.EPSILON) {
                                if (h < 0 && (a = e[o], c = -c, s = e[r], h = -h), t.y < a.y || t.y > s.y)continue;
                                if (t.y === a.y) {
                                    if (t.x === a.x)return !0
                                } else {
                                    var l = h * (t.x - a.x) - c * (t.y - a.y);
                                    if (0 === l)return !0;
                                    if (l < 0)continue;
                                    i = !i
                                }
                            } else {
                                if (t.y !== a.y)continue;
                                if (s.x <= t.x && t.x <= a.x || a.x <= t.x && t.x <= s.x)return !0
                            }
                        }
                        return i
                    })(M.p, p[T].p) && (x !== T && y.push({
                        froms: x,
                        tos: T,
                        hole: w
                    }), E ? (E = !1, u[T].push(M)) : v = !0);
                    E && u[x].push(M)
                }
                y.length > 0 && (v || (d = u))
            }
            for (var S, m = 0, A = p.length; m < A; m++) {
                s = p[m].s, c.push(s), S = d[m];
                for (var L = 0, R = S.length; L < R; L++)s.holes.push(S[L].h)
            }
            return c
        }
    }, Object.assign(wi.prototype, {
        isFont: !0, generateShapes: function (t, e, n) {
            function i(t, e, i, o) {
                var a = r.glyphs[t] || r.glyphs["?"];
                if (a) {
                    var s, c, h, l, u, p, d, f, m, g, v, y = new bi, x = [];
                    if (a.o)for (var _ = a._cachedOutline || (a._cachedOutline = a.o.split(" ")), b = 0, w = _.length; b < w;) {
                        var M = _[b++];
                        switch (M) {
                            case"m":
                                s = _[b++] * e + i, c = _[b++] * e + o, y.moveTo(s, c);
                                break;
                            case"l":
                                s = _[b++] * e + i, c = _[b++] * e + o, y.lineTo(s, c);
                                break;
                            case"q":
                                if (h = _[b++] * e + i, l = _[b++] * e + o, d = _[b++] * e + i, f = _[b++] * e + o, y.quadraticCurveTo(d, f, h, l), v = x[x.length - 1]) {
                                    u = v.x, p = v.y;
                                    for (var E = 1; E <= n; E++) {
                                        var T = E / n;
                                        ai(T, u, d, h), ai(T, p, f, l)
                                    }
                                }
                                break;
                            case"b":
                                if (h = _[b++] * e + i, l = _[b++] * e + o, d = _[b++] * e + i, f = _[b++] * e + o, m = _[b++] * e + i, g = _[b++] * e + o, y.bezierCurveTo(d, f, m, g, h, l), v = x[x.length - 1]) {
                                    u = v.x, p = v.y;
                                    for (var E = 1; E <= n; E++) {
                                        var T = E / n;
                                        ui(T, u, d, m, h), ui(T, p, f, g, l)
                                    }
                                }
                        }
                    }
                    return {offsetX: a.ha * e, path: y}
                }
            }

            void 0 === e && (e = 100), void 0 === n && (n = 4);
            for (var r = this.data, o = function (t) {
                for (var n = String(t).split(""), o = e / r.resolution, a = (r.boundingBox.yMax - r.boundingBox.yMin + r.underlineThickness) * o, s = 0, c = 0, h = [], l = 0; l < n.length; l++) {
                    var u = n[l];
                    if ("\n" === u) s = 0, c -= a; else {
                        var p = i(u, o, s, c);
                        s += p.offsetX, h.push(p.path)
                    }
                }
                return h
            }(t), a = [], s = 0, c = o.length; s < c; s++)Array.prototype.push.apply(a, o[s].toShapes());
            return a
        }
    }), Object.assign(Mi.prototype, {
        load: function (t, e, n, i) {
            var r = this;
            new wn(this.manager).load(t, function (t) {
                var n;
                try {
                    n = JSON.parse(t)
                } catch (e) {
                    console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."), n = JSON.parse(t.substring(65, t.length - 2))
                }
                var i = r.parse(n);
                e && e(i)
            }, n, i)
        }, parse: function (t) {
            return new wi(t)
        }
    });
    var yh, xh = {
        getContext: function () {
            return void 0 === yh && (yh = new (window.AudioContext || window.webkitAudioContext)), yh
        }, setContext: function (t) {
            yh = t
        }
    };
    Object.assign(Ei.prototype, {
        load: function (t, e, n, i) {
            var r = new wn(this.manager);
            r.setResponseType("arraybuffer"), r.load(t, function (t) {
                xh.getContext().decodeAudioData(t, function (t) {
                    e(t)
                })
            }, n, i)
        }
    }), Ti.prototype = Object.assign(Object.create(Ln.prototype), {
        constructor: Ti,
        isRectAreaLight: !0,
        copy: function (t) {
            return Ln.prototype.copy.call(this, t), this.width = t.width, this.height = t.height, this
        }
    }), Object.assign(Si.prototype, {
        update: function () {
            var t, e, n, i, r, o, a, s = new c, h = new c;
            return function (c) {
                if (t !== this || e !== c.focus || n !== c.fov || i !== c.aspect * this.aspect || r !== c.near || o !== c.far || a !== c.zoom) {
                    t = this, e = c.focus, n = c.fov, i = c.aspect * this.aspect, r = c.near, o = c.far, a = c.zoom;
                    var l, u, p = c.projectionMatrix.clone(), d = this.eyeSep / 2, f = d * r / e,
                        m = r * Math.tan(Yc.DEG2RAD * n * .5) / a;
                    h.elements[12] = -d, s.elements[12] = d, l = -m * i + f, u = m * i + f, p.elements[0] = 2 * r / (u - l), p.elements[8] = (u + l) / (u - l), this.cameraL.projectionMatrix.copy(p), l = -m * i - f, u = m * i - f, p.elements[0] = 2 * r / (u - l), p.elements[8] = (u + l) / (u - l), this.cameraR.projectionMatrix.copy(p)
                }
                this.cameraL.matrixWorld.copy(c.matrixWorld).multiply(h), this.cameraR.matrixWorld.copy(c.matrixWorld).multiply(s)
            }
        }()
    }), Ai.prototype = Object.create(st.prototype), Ai.prototype.constructor = Ai, Li.prototype = Object.assign(Object.create(st.prototype), {
        constructor: Li,
        getInput: function () {
            return this.gain
        },
        removeFilter: function () {
            null !== this.filter && (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination), this.gain.connect(this.context.destination), this.filter = null)
        },
        getFilter: function () {
            return this.filter
        },
        setFilter: function (t) {
            null !== this.filter ? (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination)) : this.gain.disconnect(this.context.destination), this.filter = t, this.gain.connect(this.filter), this.filter.connect(this.context.destination)
        },
        getMasterVolume: function () {
            return this.gain.gain.value
        },
        setMasterVolume: function (t) {
            this.gain.gain.value = t
        },
        updateMatrixWorld: function () {
            var t = new s, e = new a, n = new s, i = new s;
            return function (r) {
                st.prototype.updateMatrixWorld.call(this, r);
                var o = this.context.listener, a = this.up;
                this.matrixWorld.decompose(t, e, n), i.set(0, 0, -1).applyQuaternion(e), o.positionX ? (o.positionX.setValueAtTime(t.x, this.context.currentTime), o.positionY.setValueAtTime(t.y, this.context.currentTime), o.positionZ.setValueAtTime(t.z, this.context.currentTime), o.forwardX.setValueAtTime(i.x, this.context.currentTime), o.forwardY.setValueAtTime(i.y, this.context.currentTime), o.forwardZ.setValueAtTime(i.z, this.context.currentTime), o.upX.setValueAtTime(a.x, this.context.currentTime), o.upY.setValueAtTime(a.y, this.context.currentTime), o.upZ.setValueAtTime(a.z, this.context.currentTime)) : (o.setPosition(t.x, t.y, t.z), o.setOrientation(i.x, i.y, i.z, a.x, a.y, a.z))
            }
        }()
    }), Ri.prototype = Object.assign(Object.create(st.prototype), {
        constructor: Ri, getOutput: function () {
            return this.gain
        }, setNodeSource: function (t) {
            return this.hasPlaybackControl = !1, this.sourceType = "audioNode", this.source = t, this.connect(), this
        }, setBuffer: function (t) {
            return this.buffer = t, this.sourceType = "buffer", this.autoplay && this.play(), this
        }, play: function () {
            if (this.isPlaying === !0)return void console.warn("THREE.Audio: Audio is already playing.");
            if (this.hasPlaybackControl === !1)return void console.warn("THREE.Audio: this Audio has no playback control.");
            var t = this.context.createBufferSource();
            return t.buffer = this.buffer, t.loop = this.loop, t.onended = this.onEnded.bind(this), t.playbackRate.setValueAtTime(this.playbackRate, this.startTime), t.start(0, this.startTime), this.isPlaying = !0, this.source = t, this.connect()
        }, pause: function () {
            return this.hasPlaybackControl === !1 ? void console.warn("THREE.Audio: this Audio has no playback control.") : (this.source.stop(), this.startTime = this.context.currentTime, this.isPlaying = !1, this)
        }, stop: function () {
            return this.hasPlaybackControl === !1 ? void console.warn("THREE.Audio: this Audio has no playback control.") : (this.source.stop(), this.startTime = 0, this.isPlaying = !1, this)
        }, connect: function () {
            if (this.filters.length > 0) {
                this.source.connect(this.filters[0]);
                for (var t = 1, e = this.filters.length; t < e; t++)this.filters[t - 1].connect(this.filters[t]);
                this.filters[this.filters.length - 1].connect(this.getOutput())
            } else this.source.connect(this.getOutput());
            return this
        }, disconnect: function () {
            if (this.filters.length > 0) {
                this.source.disconnect(this.filters[0]);
                for (var t = 1, e = this.filters.length; t < e; t++)this.filters[t - 1].disconnect(this.filters[t]);
                this.filters[this.filters.length - 1].disconnect(this.getOutput())
            } else this.source.disconnect(this.getOutput());
            return this
        }, getFilters: function () {
            return this.filters
        }, setFilters: function (t) {
            return t || (t = []), this.isPlaying === !0 ? (this.disconnect(), this.filters = t, this.connect()) : this.filters = t, this
        }, getFilter: function () {
            return this.getFilters()[0]
        }, setFilter: function (t) {
            return this.setFilters(t ? [t] : [])
        }, setPlaybackRate: function (t) {
            return this.hasPlaybackControl === !1 ? void console.warn("THREE.Audio: this Audio has no playback control.") : (this.playbackRate = t, this.isPlaying === !0 && this.source.playbackRate.setValueAtTime(this.playbackRate, this.context.currentTime), this)
        }, getPlaybackRate: function () {
            return this.playbackRate
        }, onEnded: function () {
            this.isPlaying = !1
        }, getLoop: function () {
            return this.hasPlaybackControl === !1 ? (console.warn("THREE.Audio: this Audio has no playback control."), !1) : this.loop
        }, setLoop: function (t) {
            return this.hasPlaybackControl === !1 ? void console.warn("THREE.Audio: this Audio has no playback control.") : (this.loop = t, this.isPlaying === !0 && (this.source.loop = this.loop), this)
        }, getVolume: function () {
            return this.gain.gain.value
        }, setVolume: function (t) {
            return this.gain.gain.value = t, this
        }
    }), Pi.prototype = Object.assign(Object.create(Ri.prototype), {
        constructor: Pi, getOutput: function () {
            return this.panner
        }, getRefDistance: function () {
            return this.panner.refDistance
        }, setRefDistance: function (t) {
            this.panner.refDistance = t
        }, getRolloffFactor: function () {
            return this.panner.rolloffFactor
        }, setRolloffFactor: function (t) {
            this.panner.rolloffFactor = t
        }, getDistanceModel: function () {
            return this.panner.distanceModel
        }, setDistanceModel: function (t) {
            this.panner.distanceModel = t
        }, getMaxDistance: function () {
            return this.panner.maxDistance
        }, setMaxDistance: function (t) {
            this.panner.maxDistance = t
        }, updateMatrixWorld: function () {
            var t = new s;
            return function (e) {
                st.prototype.updateMatrixWorld.call(this, e), t.setFromMatrixPosition(this.matrixWorld), this.panner.setPosition(t.x, t.y, t.z)
            }
        }()
    }), Object.assign(Ci.prototype, {
        getFrequencyData: function () {
            return this.analyser.getByteFrequencyData(this.data), this.data
        }, getAverageFrequency: function () {
            for (var t = 0, e = this.getFrequencyData(), n = 0; n < e.length; n++)t += e[n];
            return t / e.length
        }
    }), Ni.prototype = {
        constructor: Ni, accumulate: function (t, e) {
            var n = this.buffer, i = this.valueSize, r = t * i + i, o = this.cumulativeWeight;
            if (0 === o) {
                for (var a = 0; a !== i; ++a)n[r + a] = n[a];
                o = e
            } else {
                o += e;
                var s = e / o;
                this._mixBufferRegion(n, r, 0, s, i)
            }
            this.cumulativeWeight = o
        }, apply: function (t) {
            var e = this.valueSize, n = this.buffer, i = t * e + e, r = this.cumulativeWeight, o = this.binding;
            if (this.cumulativeWeight = 0, r < 1) {
                var a = 3 * e;
                this._mixBufferRegion(n, i, a, 1 - r, e)
            }
            for (var s = e, c = e + e; s !== c; ++s)if (n[s] !== n[s + e]) {
                o.setValue(n, i);
                break
            }
        }, saveOriginalState: function () {
            var t = this.binding, e = this.buffer, n = this.valueSize, i = 3 * n;
            t.getValue(e, i);
            for (var r = n, o = i; r !== o; ++r)e[r] = e[i + r % n];
            this.cumulativeWeight = 0
        }, restoreOriginalState: function () {
            var t = 3 * this.valueSize;
            this.binding.setValue(this.buffer, t)
        }, _select: function (t, e, n, i, r) {
            if (i >= .5)for (var o = 0; o !== r; ++o)t[e + o] = t[n + o]
        }, _slerp: function (t, e, n, i, r) {
            a.slerpFlat(t, e, t, e, t, n, i)
        }, _lerp: function (t, e, n, i, r) {
            for (var o = 1 - i, a = 0; a !== r; ++a) {
                var s = e + a;
                t[s] = t[s] * o + t[n + a] * i
            }
        }
    }, Ii.prototype = {
        constructor: Ii, getValue: function (t, e) {
            this.bind(), this.getValue(t, e)
        }, setValue: function (t, e) {
            this.bind(), this.setValue(t, e)
        }, bind: function () {
            var t = this.node, e = this.parsedPath, n = e.objectName, i = e.propertyName, r = e.propertyIndex;
            if (t || (t = Ii.findNode(this.rootNode, e.nodeName) || this.rootNode, this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t)return void console.error("  trying to update node for track: " + this.path + " but it wasn't found.");
            if (n) {
                var o = e.objectIndex;
                switch (n) {
                    case"materials":
                        if (!t.material)return void console.error("  can not bind to material as node does not have a material", this);
                        if (!t.material.materials)return void console.error("  can not bind to material.materials as node.material does not have a materials array", this);
                        t = t.material.materials;
                        break;
                    case"bones":
                        if (!t.skeleton)return void console.error("  can not bind to bones as node does not have a skeleton", this);
                        t = t.skeleton.bones;
                        for (var a = 0; a < t.length; a++)if (t[a].name === o) {
                            o = a;
                            break
                        }
                        break;
                    default:
                        if (void 0 === t[n])return void console.error("  can not bind to objectName of node, undefined", this);
                        t = t[n]
                }
                if (void 0 !== o) {
                    if (void 0 === t[o])return void console.error("  trying to bind to objectIndex of objectName, but is undefined:", this, t);
                    t = t[o]
                }
            }
            var s = t[i];
            if (void 0 === s) {
                var c = e.nodeName;
                return void console.error("  trying to update property for track: " + c + "." + i + " but it wasn't found.", t)
            }
            var h = this.Versioning.None;
            void 0 !== t.needsUpdate ? (h = this.Versioning.NeedsUpdate, this.targetObject = t) : void 0 !== t.matrixWorldNeedsUpdate && (h = this.Versioning.MatrixWorldNeedsUpdate, this.targetObject = t);
            var l = this.BindingType.Direct;
            if (void 0 !== r) {
                if ("morphTargetInfluences" === i) {
                    if (!t.geometry)return void console.error("  can not bind to morphTargetInfluences becasuse node does not have a geometry", this);
                    if (!t.geometry.morphTargets)return void console.error("  can not bind to morphTargetInfluences becasuse node does not have a geometry.morphTargets", this);
                    for (var a = 0; a < this.node.geometry.morphTargets.length; a++)if (t.geometry.morphTargets[a].name === r) {
                        r = a;
                        break
                    }
                }
                l = this.BindingType.ArrayElement, this.resolvedProperty = s, this.propertyIndex = r
            } else void 0 !== s.fromArray && void 0 !== s.toArray ? (l = this.BindingType.HasFromToArray, this.resolvedProperty = s) : void 0 !== s.length ? (l = this.BindingType.EntireArray, this.resolvedProperty = s) : this.propertyName = i;
            this.getValue = this.GetterByBindingType[l], this.setValue = this.SetterByBindingTypeAndVersioning[l][h]
        }, unbind: function () {
            this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound
        }
    }, Object.assign(Ii.prototype, {
        _getValue_unavailable: function () {
        },
        _setValue_unavailable: function () {
        },
        _getValue_unbound: Ii.prototype.getValue,
        _setValue_unbound: Ii.prototype.setValue,
        BindingType: {Direct: 0, EntireArray: 1, ArrayElement: 2, HasFromToArray: 3},
        Versioning: {None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2},
        GetterByBindingType: [function (t, e) {
            t[e] = this.node[this.propertyName]
        }, function (t, e) {
            for (var n = this.resolvedProperty, i = 0, r = n.length; i !== r; ++i)t[e++] = n[i]
        }, function (t, e) {
            t[e] = this.resolvedProperty[this.propertyIndex]
        }, function (t, e) {
            this.resolvedProperty.toArray(t, e)
        }],
        SetterByBindingTypeAndVersioning: [[function (t, e) {
            this.node[this.propertyName] = t[e]
        }, function (t, e) {
            this.node[this.propertyName] = t[e], this.targetObject.needsUpdate = !0
        }, function (t, e) {
            this.node[this.propertyName] = t[e], this.targetObject.matrixWorldNeedsUpdate = !0
        }], [function (t, e) {
            for (var n = this.resolvedProperty, i = 0, r = n.length; i !== r; ++i)n[i] = t[e++]
        }, function (t, e) {
            for (var n = this.resolvedProperty, i = 0, r = n.length; i !== r; ++i)n[i] = t[e++];
            this.targetObject.needsUpdate = !0
        }, function (t, e) {
            for (var n = this.resolvedProperty, i = 0, r = n.length; i !== r; ++i)n[i] = t[e++];
            this.targetObject.matrixWorldNeedsUpdate = !0
        }], [function (t, e) {
            this.resolvedProperty[this.propertyIndex] = t[e]
        }, function (t, e) {
            this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.needsUpdate = !0
        }, function (t, e) {
            this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.matrixWorldNeedsUpdate = !0
        }], [function (t, e) {
            this.resolvedProperty.fromArray(t, e)
        }, function (t, e) {
            this.resolvedProperty.fromArray(t, e), this.targetObject.needsUpdate = !0
        }, function (t, e) {
            this.resolvedProperty.fromArray(t, e), this.targetObject.matrixWorldNeedsUpdate = !0
        }]]
    }), Ii.Composite = function (t, e, n) {
        var i = n || Ii.parseTrackName(e);
        this._targetGroup = t, this._bindings = t.subscribe_(e, i)
    }, Ii.Composite.prototype = {
        constructor: Ii.Composite, getValue: function (t, e) {
            this.bind();
            var n = this._targetGroup.nCachedObjects_, i = this._bindings[n];
            void 0 !== i && i.getValue(t, e)
        }, setValue: function (t, e) {
            for (var n = this._bindings, i = this._targetGroup.nCachedObjects_, r = n.length; i !== r; ++i)n[i].setValue(t, e)
        }, bind: function () {
            for (var t = this._bindings, e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e)t[e].bind()
        }, unbind: function () {
            for (var t = this._bindings, e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e)t[e].unbind()
        }
    }, Ii.create = function (t, e, n) {
        return t && t.isAnimationObjectGroup ? new Ii.Composite(t, e, n) : new Ii(t, e, n)
    }, Ii.parseTrackName = function (t) {
        var e = /^((?:[\w-]+[\/:])*)([\w-]+)?(?:\.([\w-]+)(?:\[(.+)\])?)?\.([\w-]+)(?:\[(.+)\])?$/, n = e.exec(t);
        if (!n)throw new Error("cannot parse trackName at all: " + t);
        var i = {nodeName: n[2], objectName: n[3], objectIndex: n[4], propertyName: n[5], propertyIndex: n[6]};
        if (null === i.propertyName || 0 === i.propertyName.length)throw new Error("can not parse propertyName from trackName: " + t);
        return i
    }, Ii.findNode = function (t, e) {
        if (!e || "" === e || "root" === e || "." === e || e === -1 || e === t.name || e === t.uuid)return t;
        if (t.skeleton) {
            var n = function (t) {
                for (var n = 0; n < t.bones.length; n++) {
                    var i = t.bones[n];
                    if (i.name === e)return i
                }
                return null
            }(t.skeleton);
            if (n)return n
        }
        if (t.children) {
            var i = function (t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    if (r.name === e || r.uuid === e)return r;
                    var o = i(r.children);
                    if (o)return o
                }
                return null
            }, r = i(t.children);
            if (r)return r
        }
        return null
    }, Ui.prototype = {
        constructor: Ui, isAnimationObjectGroup: !0, add: function (t) {
            for (var e = this._objects, n = e.length, i = this.nCachedObjects_, r = this._indicesByUUID, o = this._paths, a = this._parsedPaths, s = this._bindings, c = s.length, h = 0, l = arguments.length; h !== l; ++h) {
                var u = arguments[h], p = u.uuid, d = r[p], f = void 0;
                if (void 0 === d) {
                    d = n++, r[p] = d, e.push(u);
                    for (var m = 0, g = c; m !== g; ++m)s[m].push(new Ii(u, o[m], a[m]))
                } else if (d < i) {
                    f = e[d];
                    var v = --i, y = e[v];
                    r[y.uuid] = d, e[d] = y, r[p] = v, e[v] = u;
                    for (var m = 0, g = c; m !== g; ++m) {
                        var x = s[m], _ = x[v], b = x[d];
                        x[d] = _, void 0 === b && (b = new Ii(u, o[m], a[m])), x[v] = b
                    }
                } else e[d] !== f && console.error("Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes...")
            }
            this.nCachedObjects_ = i
        }, remove: function (t) {
            for (var e = this._objects, n = this.nCachedObjects_, i = this._indicesByUUID, r = this._bindings, o = r.length, a = 0, s = arguments.length; a !== s; ++a) {
                var c = arguments[a], h = c.uuid, l = i[h]
                ;
                if (void 0 !== l && l >= n) {
                    var u = n++, p = e[u];
                    i[p.uuid] = l, e[l] = p, i[h] = u, e[u] = c;
                    for (var d = 0, f = o; d !== f; ++d) {
                        var m = r[d], g = m[u], v = m[l];
                        m[l] = g, m[u] = v
                    }
                }
            }
            this.nCachedObjects_ = n
        }, uncache: function (t) {
            for (var e = this._objects, n = e.length, i = this.nCachedObjects_, r = this._indicesByUUID, o = this._bindings, a = o.length, s = 0, c = arguments.length; s !== c; ++s) {
                var h = arguments[s], l = h.uuid, u = r[l];
                if (void 0 !== u)if (delete r[l], u < i) {
                    var p = --i, d = e[p], f = --n, m = e[f];
                    r[d.uuid] = u, e[u] = d, r[m.uuid] = p, e[p] = m, e.pop();
                    for (var g = 0, v = a; g !== v; ++g) {
                        var y = o[g], x = y[p], _ = y[f];
                        y[u] = x, y[p] = _, y.pop()
                    }
                } else {
                    var f = --n, m = e[f];
                    r[m.uuid] = u, e[u] = m, e.pop();
                    for (var g = 0, v = a; g !== v; ++g) {
                        var y = o[g];
                        y[u] = y[f], y.pop()
                    }
                }
            }
            this.nCachedObjects_ = i
        }, subscribe_: function (t, e) {
            var n = this._bindingsIndicesByPath, i = n[t], r = this._bindings;
            if (void 0 !== i)return r[i];
            var o = this._paths, a = this._parsedPaths, s = this._objects, c = s.length, h = this.nCachedObjects_,
                l = new Array(c);
            i = r.length, n[t] = i, o.push(t), a.push(e), r.push(l);
            for (var u = h, p = s.length; u !== p; ++u) {
                var d = s[u];
                l[u] = new Ii(d, t, e)
            }
            return l
        }, unsubscribe_: function (t) {
            var e = this._bindingsIndicesByPath, n = e[t];
            if (void 0 !== n) {
                var i = this._paths, r = this._parsedPaths, o = this._bindings, a = o.length - 1, s = o[a];
                e[t[a]] = n, o[n] = s, o.pop(), r[n] = r[a], r.pop(), i[n] = i[a], i.pop()
            }
        }
    }, Di.prototype = {
        constructor: Di, play: function () {
            return this._mixer._activateAction(this), this
        }, stop: function () {
            return this._mixer._deactivateAction(this), this.reset()
        }, reset: function () {
            return this.paused = !1, this.enabled = !0, this.time = 0, this._loopCount = -1, this._startTime = null, this.stopFading().stopWarping()
        }, isRunning: function () {
            return this.enabled && !this.paused && 0 !== this.timeScale && null === this._startTime && this._mixer._isActiveAction(this)
        }, isScheduled: function () {
            return this._mixer._isActiveAction(this)
        }, startAt: function (t) {
            return this._startTime = t, this
        }, setLoop: function (t, e) {
            return this.loop = t, this.repetitions = e, this
        }, setEffectiveWeight: function (t) {
            return this.weight = t, this._effectiveWeight = this.enabled ? t : 0, this.stopFading()
        }, getEffectiveWeight: function () {
            return this._effectiveWeight
        }, fadeIn: function (t) {
            return this._scheduleFading(t, 0, 1)
        }, fadeOut: function (t) {
            return this._scheduleFading(t, 1, 0)
        }, crossFadeFrom: function (t, e, n) {
            if (t.fadeOut(e), this.fadeIn(e), n) {
                var i = this._clip.duration, r = t._clip.duration, o = r / i, a = i / r;
                t.warp(1, o, e), this.warp(a, 1, e)
            }
            return this
        }, crossFadeTo: function (t, e, n) {
            return t.crossFadeFrom(this, e, n)
        }, stopFading: function () {
            var t = this._weightInterpolant;
            return null !== t && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(t)), this
        }, setEffectiveTimeScale: function (t) {
            return this.timeScale = t, this._effectiveTimeScale = this.paused ? 0 : t, this.stopWarping()
        }, getEffectiveTimeScale: function () {
            return this._effectiveTimeScale
        }, setDuration: function (t) {
            return this.timeScale = this._clip.duration / t, this.stopWarping()
        }, syncWith: function (t) {
            return this.time = t.time, this.timeScale = t.timeScale, this.stopWarping()
        }, halt: function (t) {
            return this.warp(this._effectiveTimeScale, 0, t)
        }, warp: function (t, e, n) {
            var i = this._mixer, r = i.time, o = this._timeScaleInterpolant, a = this.timeScale;
            null === o && (o = i._lendControlInterpolant(), this._timeScaleInterpolant = o);
            var s = o.parameterPositions, c = o.sampleValues;
            return s[0] = r, s[1] = r + n, c[0] = t / a, c[1] = e / a, this
        }, stopWarping: function () {
            var t = this._timeScaleInterpolant;
            return null !== t && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(t)), this
        }, getMixer: function () {
            return this._mixer
        }, getClip: function () {
            return this._clip
        }, getRoot: function () {
            return this._localRoot || this._mixer._root
        }, _update: function (t, e, n, i) {
            var r = this._startTime;
            if (null !== r) {
                var o = (t - r) * n;
                if (o < 0 || 0 === n)return;
                this._startTime = null, e = n * o
            }
            e *= this._updateTimeScale(t);
            var a = this._updateTime(e), s = this._updateWeight(t);
            if (s > 0)for (var c = this._interpolants, h = this._propertyBindings, l = 0, u = c.length; l !== u; ++l)c[l].evaluate(a), h[l].accumulate(i, s)
        }, _updateWeight: function (t) {
            var e = 0;
            if (this.enabled) {
                e = this.weight;
                var n = this._weightInterpolant;
                if (null !== n) {
                    var i = n.evaluate(t)[0];
                    e *= i, t > n.parameterPositions[1] && (this.stopFading(), 0 === i && (this.enabled = !1))
                }
            }
            return this._effectiveWeight = e, e
        }, _updateTimeScale: function (t) {
            var e = 0;
            if (!this.paused) {
                e = this.timeScale;
                var n = this._timeScaleInterpolant;
                if (null !== n) {
                    e *= n.evaluate(t)[0], t > n.parameterPositions[1] && (this.stopWarping(), 0 === e ? this.paused = !0 : this.timeScale = e)
                }
            }
            return this._effectiveTimeScale = e, e
        }, _updateTime: function (t) {
            var e = this.time + t;
            if (0 === t)return e;
            var n = this._clip.duration, i = this.loop, r = this._loopCount;
            if (2200 === i) {
                r === -1 && (this._loopCount = 0, this._setEndings(!0, !0, !1));
                t:{
                    if (e >= n) e = n; else {
                        if (!(e < 0))break t;
                        e = 0
                    }
                    this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, this._mixer.dispatchEvent({
                        type: "finished",
                        action: this,
                        direction: t < 0 ? -1 : 1
                    })
                }
            } else {
                var o = 2202 === i;
                if (r === -1 && (t >= 0 ? (r = 0, this._setEndings(!0, 0 === this.repetitions, o)) : this._setEndings(0 === this.repetitions, !0, o)), e >= n || e < 0) {
                    var a = Math.floor(e / n);
                    e -= n * a, r += Math.abs(a);
                    var s = this.repetitions - r;
                    if (s < 0) this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, e = t > 0 ? n : 0, this._mixer.dispatchEvent({
                        type: "finished",
                        action: this,
                        direction: t > 0 ? 1 : -1
                    }); else {
                        if (0 === s) {
                            var c = t < 0;
                            this._setEndings(c, !c, o)
                        } else this._setEndings(!1, !1, o);
                        this._loopCount = r, this._mixer.dispatchEvent({type: "loop", action: this, loopDelta: a})
                    }
                }
                if (o && 1 == (1 & r))return this.time = e, n - e
            }
            return this.time = e, e
        }, _setEndings: function (t, e, n) {
            var i = this._interpolantSettings;
            n ? (i.endingStart = 2401, i.endingEnd = 2401) : (i.endingStart = t ? this.zeroSlopeAtStart ? 2401 : Dc : 2402, i.endingEnd = e ? this.zeroSlopeAtEnd ? 2401 : Dc : 2402)
        }, _scheduleFading: function (t, e, n) {
            var i = this._mixer, r = i.time, o = this._weightInterpolant;
            null === o && (o = i._lendControlInterpolant(), this._weightInterpolant = o);
            var a = o.parameterPositions, s = o.sampleValues;
            return a[0] = r, s[0] = e, a[1] = r + t, s[1] = n, this
        }
    }, Oi.prototype = {
        constructor: Oi, clipAction: function (t, e) {
            var n = e || this._root, i = n.uuid, r = "string" == typeof t ? Jn.findByName(n, t) : t,
                o = null !== r ? r.uuid : t, a = this._actionsByClip[o], s = null;
            if (void 0 !== a) {
                var c = a.actionByRoot[i];
                if (void 0 !== c)return c;
                s = a.knownActions[0], null === r && (r = s._clip)
            }
            if (null === r)return null;
            var h = new Di(this, r, e);
            return this._bindAction(h, s), this._addInactiveAction(h, o, i), h
        }, existingAction: function (t, e) {
            var n = e || this._root, i = n.uuid, r = "string" == typeof t ? Jn.findByName(n, t) : t, o = r ? r.uuid : t,
                a = this._actionsByClip[o];
            return void 0 !== a ? a.actionByRoot[i] || null : null
        }, stopAllAction: function () {
            var t = this._actions, e = this._nActiveActions, n = this._bindings, i = this._nActiveBindings;
            this._nActiveActions = 0, this._nActiveBindings = 0;
            for (var r = 0; r !== e; ++r)t[r].reset();
            for (var r = 0; r !== i; ++r)n[r].useCount = 0;
            return this
        }, update: function (t) {
            t *= this.timeScale;
            for (var e = this._actions, n = this._nActiveActions, i = this.time += t, r = Math.sign(t), o = this._accuIndex ^= 1, a = 0; a !== n; ++a) {
                var s = e[a];
                s.enabled && s._update(i, t, r, o)
            }
            for (var c = this._bindings, h = this._nActiveBindings, a = 0; a !== h; ++a)c[a].apply(o);
            return this
        }, getRoot: function () {
            return this._root
        }, uncacheClip: function (t) {
            var e = this._actions, n = t.uuid, i = this._actionsByClip, r = i[n];
            if (void 0 !== r) {
                for (var o = r.knownActions, a = 0, s = o.length; a !== s; ++a) {
                    var c = o[a];
                    this._deactivateAction(c);
                    var h = c._cacheIndex, l = e[e.length - 1];
                    c._cacheIndex = null, c._byClipCacheIndex = null, l._cacheIndex = h, e[h] = l, e.pop(), this._removeInactiveBindingsForAction(c)
                }
                delete i[n]
            }
        }, uncacheRoot: function (t) {
            var e = t.uuid, n = this._actionsByClip;
            for (var i in n) {
                var r = n[i].actionByRoot, o = r[e];
                void 0 !== o && (this._deactivateAction(o), this._removeInactiveAction(o))
            }
            var a = this._bindingsByRootAndName, s = a[e];
            if (void 0 !== s)for (var c in s) {
                var h = s[c];
                h.restoreOriginalState(), this._removeInactiveBinding(h)
            }
        }, uncacheAction: function (t, e) {
            var n = this.existingAction(t, e);
            null !== n && (this._deactivateAction(n), this._removeInactiveAction(n))
        }
    }, Object.assign(Oi.prototype, {
        _bindAction: function (t, e) {
            var n = t._localRoot || this._root, i = t._clip.tracks, r = i.length, o = t._propertyBindings,
                a = t._interpolants, s = n.uuid, c = this._bindingsByRootAndName, h = c[s];
            void 0 === h && (h = {}, c[s] = h);
            for (var l = 0; l !== r; ++l) {
                var u = i[l], p = u.name, d = h[p];
                if (void 0 !== d) o[l] = d; else {
                    if (void 0 !== (d = o[l])) {
                        null === d._cacheIndex && (++d.referenceCount, this._addInactiveBinding(d, s, p));
                        continue
                    }
                    var f = e && e._propertyBindings[l].binding.parsedPath;
                    d = new Ni(Ii.create(n, p, f), u.ValueTypeName, u.getValueSize()), ++d.referenceCount, this._addInactiveBinding(d, s, p), o[l] = d
                }
                a[l].resultBuffer = d.buffer
            }
        }, _activateAction: function (t) {
            if (!this._isActiveAction(t)) {
                if (null === t._cacheIndex) {
                    var e = (t._localRoot || this._root).uuid, n = t._clip.uuid, i = this._actionsByClip[n];
                    this._bindAction(t, i && i.knownActions[0]), this._addInactiveAction(t, n, e)
                }
                for (var r = t._propertyBindings, o = 0, a = r.length; o !== a; ++o) {
                    var s = r[o];
                    0 == s.useCount++ && (this._lendBinding(s), s.saveOriginalState())
                }
                this._lendAction(t)
            }
        }, _deactivateAction: function (t) {
            if (this._isActiveAction(t)) {
                for (var e = t._propertyBindings, n = 0, i = e.length; n !== i; ++n) {
                    var r = e[n];
                    0 == --r.useCount && (r.restoreOriginalState(), this._takeBackBinding(r))
                }
                this._takeBackAction(t)
            }
        }, _initMemoryManager: function () {
            this._actions = [], this._nActiveActions = 0, this._actionsByClip = {}, this._bindings = [], this._nActiveBindings = 0, this._bindingsByRootAndName = {}, this._controlInterpolants = [], this._nActiveControlInterpolants = 0;
            var t = this;
            this.stats = {
                actions: {
                    get total() {
                        return t._actions.length
                    }, get inUse() {
                        return t._nActiveActions
                    }
                }, bindings: {
                    get total() {
                        return t._bindings.length
                    }, get inUse() {
                        return t._nActiveBindings
                    }
                }, controlInterpolants: {
                    get total() {
                        return t._controlInterpolants.length
                    }, get inUse() {
                        return t._nActiveControlInterpolants
                    }
                }
            }
        }, _isActiveAction: function (t) {
            var e = t._cacheIndex;
            return null !== e && e < this._nActiveActions
        }, _addInactiveAction: function (t, e, n) {
            var i = this._actions, r = this._actionsByClip, o = r[e];
            if (void 0 === o) o = {knownActions: [t], actionByRoot: {}}, t._byClipCacheIndex = 0, r[e] = o; else {
                var a = o.knownActions;
                t._byClipCacheIndex = a.length, a.push(t)
            }
            t._cacheIndex = i.length, i.push(t), o.actionByRoot[n] = t
        }, _removeInactiveAction: function (t) {
            var e = this._actions, n = e[e.length - 1], i = t._cacheIndex;
            n._cacheIndex = i, e[i] = n, e.pop(), t._cacheIndex = null;
            var r = t._clip.uuid, o = this._actionsByClip, a = o[r], s = a.knownActions, c = s[s.length - 1],
                h = t._byClipCacheIndex;
            c._byClipCacheIndex = h, s[h] = c, s.pop(), t._byClipCacheIndex = null, delete a.actionByRoot[(e._localRoot || this._root).uuid], 0 === s.length && delete o[r], this._removeInactiveBindingsForAction(t)
        }, _removeInactiveBindingsForAction: function (t) {
            for (var e = t._propertyBindings, n = 0, i = e.length; n !== i; ++n) {
                var r = e[n];
                0 == --r.referenceCount && this._removeInactiveBinding(r)
            }
        }, _lendAction: function (t) {
            var e = this._actions, n = t._cacheIndex, i = this._nActiveActions++, r = e[i];
            t._cacheIndex = i, e[i] = t, r._cacheIndex = n, e[n] = r
        }, _takeBackAction: function (t) {
            var e = this._actions, n = t._cacheIndex, i = --this._nActiveActions, r = e[i];
            t._cacheIndex = i, e[i] = t, r._cacheIndex = n, e[n] = r
        }, _addInactiveBinding: function (t, e, n) {
            var i = this._bindingsByRootAndName, r = i[e], o = this._bindings;
            void 0 === r && (r = {}, i[e] = r), r[n] = t, t._cacheIndex = o.length, o.push(t)
        }, _removeInactiveBinding: function (t) {
            var e = this._bindings, n = t.binding, i = n.rootNode.uuid, r = n.path, o = this._bindingsByRootAndName,
                a = o[i], s = e[e.length - 1], c = t._cacheIndex;
            s._cacheIndex = c, e[c] = s, e.pop(), delete a[r];
            t:{
                for (var h in a)break t;
                delete o[i]
            }
        }, _lendBinding: function (t) {
            var e = this._bindings, n = t._cacheIndex, i = this._nActiveBindings++, r = e[i];
            t._cacheIndex = i, e[i] = t, r._cacheIndex = n, e[n] = r
        }, _takeBackBinding: function (t) {
            var e = this._bindings, n = t._cacheIndex, i = --this._nActiveBindings, r = e[i];
            t._cacheIndex = i, e[i] = t, r._cacheIndex = n, e[n] = r
        }, _lendControlInterpolant: function () {
            var t = this._controlInterpolants, e = this._nActiveControlInterpolants++, n = t[e];
            return void 0 === n && (n = new Fn(new Float32Array(2), new Float32Array(2), 1, this._controlInterpolantsResultBuffer), n.__cacheIndex = e, t[e] = n), n
        }, _takeBackControlInterpolant: function (t) {
            var e = this._controlInterpolants, n = t.__cacheIndex, i = --this._nActiveControlInterpolants, r = e[i];
            t.__cacheIndex = i, e[i] = t, r.__cacheIndex = n, e[n] = r
        }, _controlInterpolantsResultBuffer: new Float32Array(1)
    }), Object.assign(Oi.prototype, t.prototype), zi.prototype.clone = function () {
        return new zi(void 0 === this.value.clone ? this.value : this.value.clone())
    }, Bi.prototype = Object.create(St.prototype), Bi.prototype.constructor = Bi, Bi.prototype.isInstancedBufferGeometry = !0, Bi.prototype.addGroup = function (t, e, n) {
        this.groups.push({start: t, count: e, materialIndex: n})
    }, Bi.prototype.copy = function (t) {
        var e = t.index;
        null !== e && this.setIndex(e.clone());
        var n = t.attributes;
        for (var i in n) {
            var r = n[i];
            this.addAttribute(i, r.clone())
        }
        for (var o = t.groups, a = 0, s = o.length; a < s; a++) {
            var c = o[a];
            this.addGroup(c.start, c.count, c.materialIndex)
        }
        return this
    }, Fi.prototype = {
        constructor: Fi, isInterleavedBufferAttribute: !0, get count() {
            return this.data.count
        }, get array() {
            return this.data.array
        }, setX: function (t, e) {
            return this.data.array[t * this.data.stride + this.offset] = e, this
        }, setY: function (t, e) {
            return this.data.array[t * this.data.stride + this.offset + 1] = e, this
        }, setZ: function (t, e) {
            return this.data.array[t * this.data.stride + this.offset + 2] = e, this
        }, setW: function (t, e) {
            return this.data.array[t * this.data.stride + this.offset + 3] = e, this
        }, getX: function (t) {
            return this.data.array[t * this.data.stride + this.offset]
        }, getY: function (t) {
            return this.data.array[t * this.data.stride + this.offset + 1]
        }, getZ: function (t) {
            return this.data.array[t * this.data.stride + this.offset + 2]
        }, getW: function (t) {
            return this.data.array[t * this.data.stride + this.offset + 3]
        }, setXY: function (t, e, n) {
            return t = t * this.data.stride + this.offset, this.data.array[t + 0] = e, this.data.array[t + 1] = n, this
        }, setXYZ: function (t, e, n, i) {
            return t = t * this.data.stride + this.offset, this.data.array[t + 0] = e, this.data.array[t + 1] = n, this.data.array[t + 2] = i, this
        }, setXYZW: function (t, e, n, i, r) {
            return t = t * this.data.stride + this.offset, this.data.array[t + 0] = e, this.data.array[t + 1] = n, this.data.array[t + 2] = i, this.data.array[t + 3] = r, this
        }
    }, Gi.prototype = {
        constructor: Gi, isInterleavedBuffer: !0, set needsUpdate(t) {
            t === !0 && this.version++
        }, setArray: function (t) {
            if (Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
            this.count = void 0 !== t ? t.length / this.stride : 0, this.array = t
        }, setDynamic: function (t) {
            return this.dynamic = t, this
        }, copy: function (t) {
            return this.array = new t.array.constructor(t.array), this.count = t.count, this.stride = t.stride, this.dynamic = t.dynamic, this
        }, copyAt: function (t, e, n) {
            t *= this.stride, n *= e.stride;
            for (var i = 0, r = this.stride; i < r; i++)this.array[t + i] = e.array[n + i];
            return this
        }, set: function (t, e) {
            return void 0 === e && (e = 0), this.array.set(t, e), this
        }, clone: function () {
            return (new this.constructor).copy(this)
        }, onUpload: function (t) {
            return this.onUploadCallback = t, this
        }
    }, ki.prototype = Object.create(Gi.prototype), ki.prototype.constructor = ki, ki.prototype.isInstancedInterleavedBuffer = !0, ki.prototype.copy = function (t) {
        return Gi.prototype.copy.call(this, t), this.meshPerAttribute = t.meshPerAttribute, this
    }, Hi.prototype = Object.create(pt.prototype), Hi.prototype.constructor = Hi, Hi.prototype.isInstancedBufferAttribute = !0, Hi.prototype.copy = function (t) {
        return pt.prototype.copy.call(this, t), this.meshPerAttribute = t.meshPerAttribute, this
    }, Vi.prototype = {
        constructor: Vi, linePrecision: 1, set: function (t, e) {
            this.ray.set(t, e)
        }, setFromCamera: function (t, e) {
            e && e.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(t.x, t.y, .5).unproject(e).sub(this.ray.origin).normalize()) : e && e.isOrthographicCamera ? (this.ray.origin.set(t.x, t.y, (e.near + e.far) / (e.near - e.far)).unproject(e), this.ray.direction.set(0, 0, -1).transformDirection(e.matrixWorld)) : console.error("THREE.Raycaster: Unsupported camera type.")
        }, intersectObject: function (t, e) {
            var n = [];
            return Wi(t, this, n, e), n.sort(ji), n
        }, intersectObjects: function (t, e) {
            var n = [];
            if (Array.isArray(t) === !1)return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."), n;
            for (var i = 0, r = t.length; i < r; i++)Wi(t[i], this, n, e);
            return n.sort(ji), n
        }
    }, qi.prototype = {
        constructor: qi, start: function () {
            this.startTime = (performance || Date).now(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0
        }, stop: function () {
            this.getElapsedTime(), this.running = !1
        }, getElapsedTime: function () {
            return this.getDelta(), this.elapsedTime
        }, getDelta: function () {
            var t = 0;
            if (this.autoStart && !this.running && this.start(), this.running) {
                var e = (performance || Date).now();
                t = (e - this.oldTime) / 1e3, this.oldTime = e, this.elapsedTime += t
            }
            return t
        }
    }, Xi.prototype = {
        constructor: Xi, set: function (t, e, n) {
            return this.radius = t, this.phi = e, this.theta = n, this
        }, clone: function () {
            return (new this.constructor).copy(this)
        }, copy: function (t) {
            return this.radius = t.radius, this.phi = t.phi, this.theta = t.theta, this
        }, makeSafe: function () {
            return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)), this
        }, setFromVector3: function (t) {
            return this.radius = t.length(), 0 === this.radius ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(t.x, t.z), this.phi = Math.acos(Yc.clamp(t.y / this.radius, -1, 1))), this
        }
    }, Yi.prototype = {
        constructor: Yi, set: function (t, e, n) {
            return this.radius = t, this.theta = e, this.y = n, this
        }, clone: function () {
            return (new this.constructor).copy(this)
        }, copy: function (t) {
            return this.radius = t.radius, this.theta = t.theta, this.y = t.y, this
        }, setFromVector3: function (t) {
            return this.radius = Math.sqrt(t.x * t.x + t.z * t.z), this.theta = Math.atan2(t.x, t.z), this.y = t.y, this
        }
    }, Zi.prototype = Object.create(At.prototype), Zi.prototype.constructor = Zi, Zi.prototype.createAnimation = function (t, e, n, i) {
        var r = {
            start: e,
            end: n,
            length: n - e + 1,
            fps: i,
            duration: (n - e) / i,
            lastFrame: 0,
            currentFrame: 0,
            active: !1,
            time: 0,
            direction: 1,
            weight: 1,
            directionBackwards: !1,
            mirroredLoop: !1
        };
        this.animationsMap[t] = r, this.animationsList.push(r)
    }, Zi.prototype.autoCreateAnimations = function (t) {
        for (var e, n = {}, i = this.geometry, r = 0, o = i.morphTargets.length; r < o; r++) {
            var a = i.morphTargets[r], s = a.name.match(/([a-z]+)_?(\d+)/i);
            if (s && s.length > 1) {
                var c = s[1];
                n[c] || (n[c] = {start: 1 / 0, end: -(1 / 0)});
                var h = n[c];
                r < h.start && (h.start = r), r > h.end && (h.end = r), e || (e = c)
            }
        }
        for (var c in n) {
            var h = n[c];
            this.createAnimation(c, h.start, h.end, t)
        }
        this.firstAnimation = e
    }, Zi.prototype.setAnimationDirectionForward = function (t) {
        var e = this.animationsMap[t];
        e && (e.direction = 1, e.directionBackwards = !1)
    }, Zi.prototype.setAnimationDirectionBackward = function (t) {
        var e = this.animationsMap[t];
        e && (e.direction = -1, e.directionBackwards = !0)
    }, Zi.prototype.setAnimationFPS = function (t, e) {
        var n = this.animationsMap[t];
        n && (n.fps = e, n.duration = (n.end - n.start) / n.fps)
    }, Zi.prototype.setAnimationDuration = function (t, e) {
        var n = this.animationsMap[t];
        n && (n.duration = e, n.fps = (n.end - n.start) / n.duration)
    }, Zi.prototype.setAnimationWeight = function (t, e) {
        var n = this.animationsMap[t];
        n && (n.weight = e)
    }, Zi.prototype.setAnimationTime = function (t, e) {
        var n = this.animationsMap[t];
        n && (n.time = e)
    }, Zi.prototype.getAnimationTime = function (t) {
        var e = 0, n = this.animationsMap[t];
        return n && (e = n.time), e
    }, Zi.prototype.getAnimationDuration = function (t) {
        var e = -1, n = this.animationsMap[t];
        return n && (e = n.duration), e
    }, Zi.prototype.playAnimation = function (t) {
        var e = this.animationsMap[t];
        e ? (e.time = 0, e.active = !0) : console.warn("THREE.MorphBlendMesh: animation[" + t + "] undefined in .playAnimation()")
    }, Zi.prototype.stopAnimation = function (t) {
        var e = this.animationsMap[t];
        e && (e.active = !1)
    }, Zi.prototype.update = function (t) {
        for (var e = 0, n = this.animationsList.length; e < n; e++) {
            var i = this.animationsList[e];
            if (i.active) {
                var r = i.duration / i.length;
                i.time += i.direction * t, i.mirroredLoop ? (i.time > i.duration || i.time < 0) && (i.direction *= -1, i.time > i.duration && (i.time = i.duration, i.directionBackwards = !0), i.time < 0 && (i.time = 0, i.directionBackwards = !1)) : (i.time = i.time % i.duration, i.time < 0 && (i.time += i.duration));
                var o = i.start + Yc.clamp(Math.floor(i.time / r), 0, i.length - 1), a = i.weight;
                o !== i.currentFrame && (this.morphTargetInfluences[i.lastFrame] = 0, this.morphTargetInfluences[i.currentFrame] = 1 * a, this.morphTargetInfluences[o] = 0, i.lastFrame = i.currentFrame, i.currentFrame = o);
                var s = i.time % r / r;
                i.directionBackwards && (s = 1 - s), i.currentFrame !== i.lastFrame ? (this.morphTargetInfluences[i.currentFrame] = s * a, this.morphTargetInfluences[i.lastFrame] = (1 - s) * a) : this.morphTargetInfluences[i.currentFrame] = a
            }
        }
    }, Ji.prototype = Object.create(st.prototype), Ji.prototype.constructor = Ji, Ji.prototype.isImmediateRenderObject = !0, Qi.prototype = Object.create(_e.prototype), Qi.prototype.constructor = Qi, Qi.prototype.update = function () {
        var t = new s, e = new s, n = new tt;
        return function () {
            var i = ["a", "b", "c"];
            this.object.updateMatrixWorld(!0), n.getNormalMatrix(this.object.matrixWorld);
            var r = this.object.matrixWorld, o = this.geometry.attributes.position, a = this.object.geometry;
            if (a && a.isGeometry)for (var s = a.vertices, c = a.faces, h = 0, l = 0, u = c.length; l < u; l++)for (var p = c[l], d = 0, f = p.vertexNormals.length; d < f; d++) {
                var m = s[p[i[d]]], g = p.vertexNormals[d];
                t.copy(m).applyMatrix4(r), e.copy(g).applyMatrix3(n).normalize().multiplyScalar(this.size).add(t), o.setXYZ(h, t.x, t.y, t.z), h += 1, o.setXYZ(h, e.x, e.y, e.z), h += 1
            } else if (a && a.isBufferGeometry)for (var v = a.attributes.position, y = a.attributes.normal, h = 0, d = 0, f = v.count; d < f; d++)t.set(v.getX(d), v.getY(d), v.getZ(d)).applyMatrix4(r), e.set(y.getX(d), y.getY(d), y.getZ(d)), e.applyMatrix3(n).normalize().multiplyScalar(this.size).add(t), o.setXYZ(h, t.x, t.y, t.z), h += 1, o.setXYZ(h, e.x, e.y, e.z), h += 1;
            return o.needsUpdate = !0, this
        }
    }(), Ki.prototype = Object.create(st.prototype), Ki.prototype.constructor = Ki, Ki.prototype.dispose = function () {
        this.cone.geometry.dispose(), this.cone.material.dispose()
    }, Ki.prototype.update = function () {
        var t = new s, e = new s;
        return function () {
            var n = this.light.distance ? this.light.distance : 1e3, i = n * Math.tan(this.light.angle);
            this.cone.scale.set(i, i, n), t.setFromMatrixPosition(this.light.matrixWorld), e.setFromMatrixPosition(this.light.target.matrixWorld), this.cone.lookAt(e.sub(t)), this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
        }
    }(), $i.prototype = Object.create(_e.prototype), $i.prototype.constructor = $i, $i.prototype.getBoneList = function (t) {
        var e = [];
        t && t.isBone && e.push(t);
        for (var n = 0; n < t.children.length; n++)e.push.apply(e, this.getBoneList(t.children[n]));
        return e
    }, $i.prototype.update = function () {
        var t = new s, e = new c, n = new c;
        return function () {
            var i = this.geometry, r = i.getAttribute("position");
            n.getInverse(this.root.matrixWorld);
            for (var o = 0, a = 0; o < this.bones.length; o++) {
                var s = this.bones[o];
                s.parent && s.parent.isBone && (e.multiplyMatrices(n, s.matrixWorld), t.setFromMatrixPosition(e), r.setXYZ(a, t.x, t.y, t.z), e.multiplyMatrices(n, s.parent.matrixWorld), t.setFromMatrixPosition(e), r.setXYZ(a + 1, t.x, t.y, t.z), a += 2)
            }
            i.getAttribute("position").needsUpdate = !0
        }
    }(), tr.prototype = Object.create(At.prototype), tr.prototype.constructor = tr, tr.prototype.dispose = function () {
        this.geometry.dispose(), this.material.dispose()
    }, tr.prototype.update = function () {
        this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
    }, er.prototype = Object.create(st.prototype), er.prototype.constructor = er, er.prototype.dispose = function () {
        this.children[0].geometry.dispose(), this.children[0].material.dispose(), this.children[1].geometry.dispose(), this.children[1].material.dispose()
    }, er.prototype.update = function () {
        var t = new s, e = new s;
        return function () {
            var n = this.children[0], i = this.children[1];
            if (this.light.target) {
                t.setFromMatrixPosition(this.light.matrixWorld), e.setFromMatrixPosition(this.light.target.matrixWorld);
                var r = e.clone().sub(t);
                n.lookAt(r), i.lookAt(r)
            }
            n.material.color.copy(this.light.color).multiplyScalar(this.light.intensity), i.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
            var o = .5 * this.light.width, a = .5 * this.light.height, s = n.geometry.getAttribute("position"),
                c = s.array;
            c[0] = o, c[1] = -a, c[2] = 0, c[3] = o, c[4] = a, c[5] = 0, c[6] = -o, c[7] = a, c[8] = 0, c[9] = -o, c[10] = a, c[11] = 0, c[12] = -o, c[13] = -a, c[14] = 0, c[15] = o, c[16] = -a, c[17] = 0, s.needsUpdate = !0
        }
    }(), nr.prototype = Object.create(st.prototype), nr.prototype.constructor = nr, nr.prototype.dispose = function () {
        this.children[0].geometry.dispose(), this.children[0].material.dispose()
    }, nr.prototype.update = function () {
        var t = new s, e = new j, n = new j;
        return function () {
            var i = this.children[0], r = i.geometry.getAttribute("color");
            e.copy(this.light.color).multiplyScalar(this.light.intensity), n.copy(this.light.groundColor).multiplyScalar(this.light.intensity);
            for (var o = 0, a = r.count; o < a; o++) {
                var s = o < a / 2 ? e : n;
                r.setXYZ(o, s.r, s.g, s.b)
            }
            i.lookAt(t.setFromMatrixPosition(this.light.matrixWorld).negate()), r.needsUpdate = !0
        }
    }(), ir.prototype = Object.create(_e.prototype), ir.prototype.constructor = ir, rr.prototype = Object.create(_e.prototype), rr.prototype.constructor = rr, or.prototype = Object.create(_e.prototype), or.prototype.constructor = or, or.prototype.update = function () {
        var t = new s, e = new s, n = new tt;
        return function () {
            this.object.updateMatrixWorld(!0), n.getNormalMatrix(this.object.matrixWorld);
            for (var i = this.object.matrixWorld, r = this.geometry.attributes.position, o = this.object.geometry, a = o.vertices, s = o.faces, c = 0, h = 0, l = s.length; h < l; h++) {
                var u = s[h], p = u.normal;
                t.copy(a[u.a]).add(a[u.b]).add(a[u.c]).divideScalar(3).applyMatrix4(i), e.copy(p).applyMatrix3(n).normalize().multiplyScalar(this.size).add(t), r.setXYZ(c, t.x, t.y, t.z), c += 1, r.setXYZ(c, e.x, e.y, e.z), c += 1
            }
            return r.needsUpdate = !0, this
        }
    }(), ar.prototype = Object.create(st.prototype), ar.prototype.constructor = ar, ar.prototype.dispose = function () {
        var t = this.children[0], e = this.children[1];
        t.geometry.dispose(), t.material.dispose(), e.geometry.dispose(), e.material.dispose()
    }, ar.prototype.update = function () {
        var t = new s, e = new s, n = new s;
        return function () {
            t.setFromMatrixPosition(this.light.matrixWorld), e.setFromMatrixPosition(this.light.target.matrixWorld), n.subVectors(e, t);
            var i = this.children[0], r = this.children[1];
            i.lookAt(n), i.material.color.copy(this.light.color).multiplyScalar(this.light.intensity), r.lookAt(n), r.scale.z = n.length()
        }
    }(), sr.prototype = Object.create(_e.prototype), sr.prototype.constructor = sr, sr.prototype.update = function () {
        function t(t, o, a, s) {
            i.set(o, a, s).unproject(r);
            var c = n[t];
            if (void 0 !== c)for (var h = e.getAttribute("position"), l = 0, u = c.length; l < u; l++)h.setXYZ(c[l], i.x, i.y, i.z)
        }

        var e, n, i = new s, r = new Nt;
        return function () {
            e = this.geometry, n = this.pointMap;
            r.projectionMatrix.copy(this.camera.projectionMatrix), t("c", 0, 0, -1), t("t", 0, 0, 1), t("n1", -1, -1, -1), t("n2", 1, -1, -1), t("n3", -1, 1, -1), t("n4", 1, 1, -1), t("f1", -1, -1, 1), t("f2", 1, -1, 1), t("f3", -1, 1, 1), t("f4", 1, 1, 1), t("u1", .7, 1.1, -1), t("u2", -.7, 1.1, -1), t("u3", 0, 2, -1), t("cf1", -1, 0, 1), t("cf2", 1, 0, 1), t("cf3", 0, -1, 1), t("cf4", 0, 1, 1), t("cn1", -1, 0, -1), t("cn2", 1, 0, -1), t("cn3", 0, -1, -1), t("cn4", 0, 1, -1), e.getAttribute("position").needsUpdate = !0
        }
    }(), cr.prototype = Object.create(_e.prototype), cr.prototype.constructor = cr, cr.prototype.update = function () {
        var t = new K;
        return function (e) {
            if (e && e.isBox3 ? t.copy(e) : t.setFromObject(e), !t.isEmpty()) {
                var n = t.min, i = t.max, r = this.geometry.attributes.position, o = r.array;
                o[0] = i.x, o[1] = i.y, o[2] = i.z, o[3] = n.x, o[4] = i.y, o[5] = i.z, o[6] = n.x, o[7] = n.y, o[8] = i.z, o[9] = i.x, o[10] = n.y, o[11] = i.z, o[12] = i.x, o[13] = i.y, o[14] = n.z, o[15] = n.x, o[16] = i.y, o[17] = n.z, o[18] = n.x, o[19] = n.y, o[20] = n.z, o[21] = i.x, o[22] = n.y, o[23] = n.z, r.needsUpdate = !0, this.geometry.computeBoundingSphere()
            }
        }
    }();
    var _h, bh;
    hr.prototype = Object.create(st.prototype), hr.prototype.constructor = hr, hr.prototype.setDirection = function () {
        var t, e = new s;
        return function (n) {
            n.y > .99999 ? this.quaternion.set(0, 0, 0, 1) : n.y < -.99999 ? this.quaternion.set(1, 0, 0, 0) : (e.set(n.z, 0, -n.x).normalize(), t = Math.acos(n.y), this.quaternion.setFromAxisAngle(e, t))
        }
    }(), hr.prototype.setLength = function (t, e, n) {
        void 0 === e && (e = .2 * t), void 0 === n && (n = .2 * e), this.line.scale.set(1, Math.max(0, t - e), 1), this.line.updateMatrix(), this.cone.scale.set(n, e, n), this.cone.position.y = t, this.cone.updateMatrix()
    }, hr.prototype.setColor = function (t) {
        this.line.material.color.copy(t), this.cone.material.color.copy(t)
    }, lr.prototype = Object.create(_e.prototype), lr.prototype.constructor = lr;
    var wh = new s, Mh = new ur, Eh = new ur, Th = new ur;
    pr.prototype = Object.create(pi.prototype), pr.prototype.constructor = pr, pr.prototype.getPoint = function (t) {
        var e = this.points, n = e.length;
        n < 2 && console.log("duh, you need at least 2 points");
        var i = (n - (this.closed ? 0 : 1)) * t, r = Math.floor(i), o = i - r;
        this.closed ? r += r > 0 ? 0 : (Math.floor(Math.abs(r) / e.length) + 1) * e.length : 0 === o && r === n - 1 && (r = n - 2, o = 1);
        var a, c, h, l;
        if (this.closed || r > 0 ? a = e[(r - 1) % n] : (wh.subVectors(e[0], e[1]).add(e[0]), a = wh), c = e[r % n], h = e[(r + 1) % n], this.closed || r + 2 < n ? l = e[(r + 2) % n] : (wh.subVectors(e[n - 1], e[n - 2]).add(e[n - 1]), l = wh), void 0 === this.type || "centripetal" === this.type || "chordal" === this.type) {
            var u = "chordal" === this.type ? .5 : .25, p = Math.pow(a.distanceToSquared(c), u),
                d = Math.pow(c.distanceToSquared(h), u), f = Math.pow(h.distanceToSquared(l), u);
            d < 1e-4 && (d = 1), p < 1e-4 && (p = d), f < 1e-4 && (f = d), Mh.initNonuniformCatmullRom(a.x, c.x, h.x, l.x, p, d, f), Eh.initNonuniformCatmullRom(a.y, c.y, h.y, l.y, p, d, f), Th.initNonuniformCatmullRom(a.z, c.z, h.z, l.z, p, d, f)
        } else if ("catmullrom" === this.type) {
            var m = void 0 !== this.tension ? this.tension : .5;
            Mh.initCatmullRom(a.x, c.x, h.x, l.x, m), Eh.initCatmullRom(a.y, c.y, h.y, l.y, m), Th.initCatmullRom(a.z, c.z, h.z, l.z, m)
        }
        return new s(Mh.calc(o), Eh.calc(o), Th.calc(o))
    }, dr.prototype = Object.create(pi.prototype), dr.prototype.constructor = dr, dr.prototype.getPoint = function (t) {
        var e = this.v0, n = this.v1, i = this.v2, r = this.v3;
        return new s(ui(t, e.x, n.x, i.x, r.x), ui(t, e.y, n.y, i.y, r.y), ui(t, e.z, n.z, i.z, r.z))
    }, fr.prototype = Object.create(pi.prototype), fr.prototype.constructor = fr, fr.prototype.getPoint = function (t) {
        var e = this.v0, n = this.v1, i = this.v2;
        return new s(ai(t, e.x, n.x, i.x), ai(t, e.y, n.y, i.y), ai(t, e.z, n.z, i.z))
    }, mr.prototype = Object.create(pi.prototype), mr.prototype.constructor = mr, mr.prototype.getPoint = function (t) {
        if (1 === t)return this.v2.clone();
        var e = new s;
        return e.subVectors(this.v2, this.v1), e.multiplyScalar(t), e.add(this.v1), e
    }, gr.prototype = Object.create(mi.prototype), gr.prototype.constructor = gr;
    var Sh = {
        createMultiMaterialObject: function (t, e) {
            for (var n = new Me, i = 0, r = e.length; i < r; i++)n.add(new At(t, e[i]));
            return n
        }, detach: function (t, e, n) {
            t.applyMatrix(e.matrixWorld), e.remove(t), n.add(t)
        }, attach: function (t, e, n) {
            var i = new c;
            i.getInverse(n.matrixWorld), t.applyMatrix(i), e.remove(t), n.add(t)
        }
    };
    pi.create = function (t, e) {
        return console.log("THREE.Curve.create() has been deprecated"), t.prototype = Object.create(pi.prototype), t.prototype.constructor = t, t.prototype.getPoint = e, t
    }, Or.prototype = Object.create(pr.prototype), zr.prototype = Object.create(pr.prototype), Br.prototype = Object.create(pr.prototype), Object.assign(Br.prototype, {
        initFromArray: function (t) {
            console.error("THREE.Spline: .initFromArray() has been removed.")
        }, getControlPointsArray: function (t) {
            console.error("THREE.Spline: .getControlPointsArray() has been removed.")
        }, reparametrizeByArcLength: function (t) {
            console.error("THREE.Spline: .reparametrizeByArcLength() has been removed.")
        }
    }), ir.prototype.setColors = function () {
        console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")
    }, Object.assign(q.prototype, {
        center: function (t) {
            return console.warn("THREE.Box2: .center() has been renamed to .getCenter()."), this.getCenter(t)
        }, empty: function () {
            return console.warn("THREE.Box2: .empty() has been renamed to .isEmpty()."), this.isEmpty()
        }, isIntersectionBox: function (t) {
            return console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(t)
        }, size: function (t) {
            return console.warn("THREE.Box2: .size() has been renamed to .getSize()."), this.getSize(t)
        }
    }), Object.assign(K.prototype, {
        center: function (t) {
            return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."), this.getCenter(t)
        }, empty: function () {
            return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."), this.isEmpty()
        }, isIntersectionBox: function (t) {
            return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(t)
        }, isIntersectionSphere: function (t) {
            return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."), this.intersectsSphere(t)
        }, size: function (t) {
            return console.warn("THREE.Box3: .size() has been renamed to .getSize()."), this.getSize(t)
        }
    }), ct.prototype.center = function (t) {
        return console.warn("THREE.Line3: .center() has been renamed to .getCenter()."), this.getCenter(t)
    }, Yc.random16 = function () {
        return console.warn("THREE.Math.random16() has been deprecated. Use Math.random() instead."), Math.random()
    }, Object.assign(tt.prototype, {
        flattenToArrayOffset: function (t, e) {
            return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), this.toArray(t, e)
        }, multiplyVector3: function (t) {
            return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), t.applyMatrix3(this)
        }, multiplyVector3Array: function (t) {
            return console.warn("THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(t)
        }, applyToBuffer: function (t, e, n) {
            return console.warn("THREE.Matrix3: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead."), this.applyToBufferAttribute(t)
        }, applyToVector3Array: function (t, e, n) {
            console.error("THREE.Matrix3: .applyToVector3Array() has been removed.")
        }
    }), Object.assign(c.prototype, {
        extractPosition: function (t) {
            return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."), this.copyPosition(t)
        }, flattenToArrayOffset: function (t, e) {
            return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), this.toArray(t, e)
        }, getPosition: function () {
            var t;
            return function () {
                return void 0 === t && (t = new s), console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."), t.setFromMatrixColumn(this, 3)
            }
        }(), setRotationFromQuaternion: function (t) {
            return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."), this.makeRotationFromQuaternion(t)
        }, multiplyVector3: function (t) {
            return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."), t.applyMatrix4(this)
        }, multiplyVector4: function (t) {
            return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), t.applyMatrix4(this)
        }, multiplyVector3Array: function (t) {
            return console.warn("THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(t)
        }, rotateAxis: function (t) {
            console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."), t.transformDirection(this)
        }, crossVector: function (t) {
            return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), t.applyMatrix4(this)
        }, translate: function () {
            console.error("THREE.Matrix4: .translate() has been removed.")
        }, rotateX: function () {
            console.error("THREE.Matrix4: .rotateX() has been removed.")
        }, rotateY: function () {
            console.error("THREE.Matrix4: .rotateY() has been removed.")
        }, rotateZ: function () {
            console.error("THREE.Matrix4: .rotateZ() has been removed.")
        }, rotateByAxis: function () {
            console.error("THREE.Matrix4: .rotateByAxis() has been removed.")
        }, applyToBuffer: function (t, e, n) {
            return console.warn("THREE.Matrix4: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead."), this.applyToBufferAttribute(t)
        }, applyToVector3Array: function (t, e, n) {
            console.error("THREE.Matrix4: .applyToVector3Array() has been removed.")
        }, makeFrustum: function (t, e, n, i, r, o) {
            return console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."), this.makePerspective(t, e, i, n, r, o)
        }
    }), et.prototype.isIntersectionLine = function (t) {
        return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."), this.intersectsLine(t)
    }, a.prototype.multiplyVector3 = function (t) {
        return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), t.applyQuaternion(this)
    }, Object.assign(rt.prototype, {
        isIntersectionBox: function (t) {
            return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(t)
        }, isIntersectionPlane: function (t) {
            return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."), this.intersectsPlane(t)
        }, isIntersectionSphere: function (t) {
            return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."), this.intersectsSphere(t)
        }
    }), Object.assign(_i.prototype, {
        extrude: function (t) {
            return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."), new Xe(this, t)
        }, makeGeometry: function (t) {
            return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."), new en(this, t)
        }
    }), Object.assign(e.prototype, {
        fromAttribute: function (t, e, n) {
            return console.error("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(t, e, n)
        }
    }), Object.assign(s.prototype, {
        setEulerFromRotationMatrix: function () {
            console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
        }, setEulerFromQuaternion: function () {
            console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
        }, getPositionFromMatrix: function (t) {
            return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."), this.setFromMatrixPosition(t)
        }, getScaleFromMatrix: function (t) {
            return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."), this.setFromMatrixScale(t)
        }, getColumnFromMatrix: function (t, e) {
            return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."), this.setFromMatrixColumn(e, t)
        }, applyProjection: function (t) {
            return console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."), this.applyMatrix4(t)
        }, fromAttribute: function (t, e, n) {
            return console.error("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(t, e, n)
        }
    }), Object.assign(i.prototype, {
        fromAttribute: function (t, e, n) {
            return console.error("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(t, e, n)
        }
    }), Tt.prototype.computeTangents = function () {
        console.warn("THREE.Geometry: .computeTangents() has been removed.")
    }, Object.assign(st.prototype, {
        getChildByName: function (t) {
            return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."), this.getObjectByName(t)
        }, renderDepth: function () {
            console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")
        }, translate: function (t, e) {
            return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."), this.translateOnAxis(e, t)
        }
    }), Object.defineProperties(st.prototype, {
        eulerOrder: {
            get: function () {
                return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order
            }, set: function (t) {
                console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order = t
            }
        }, useQuaternion: {
            get: function () {
                console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
            }, set: function () {
                console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
            }
        }
    }), Object.defineProperties(fe.prototype, {
        objects: {
            get: function () {
                return console.warn("THREE.LOD: .objects has been renamed to .levels."), this.levels
            }
        }
    }), It.prototype.setLens = function (t, e) {
        console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."), void 0 !== e && (this.filmGauge = e), this.setFocalLength(t)
    }, Object.defineProperties(Ln.prototype, {
        onlyShadow: {
            set: function () {
                console.warn("THREE.Light: .onlyShadow has been removed.")
            }
        }, shadowCameraFov: {
            set: function (t) {
                console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."), this.shadow.camera.fov = t
            }
        }, shadowCameraLeft: {
            set: function (t) {
                console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."), this.shadow.camera.left = t
            }
        }, shadowCameraRight: {
            set: function (t) {
                console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."), this.shadow.camera.right = t
            }
        }, shadowCameraTop: {
            set: function (t) {
                console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."), this.shadow.camera.top = t
            }
        }, shadowCameraBottom: {
            set: function (t) {
                console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."), this.shadow.camera.bottom = t
            }
        }, shadowCameraNear: {
            set: function (t) {
                console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."), this.shadow.camera.near = t
            }
        }, shadowCameraFar: {
            set: function (t) {
                console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."), this.shadow.camera.far = t
            }
        }, shadowCameraVisible: {
            set: function () {
                console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")
            }
        }, shadowBias: {
            set: function (t) {
                console.warn("THREE.Light: .shadowBias is now .shadow.bias."), this.shadow.bias = t
            }
        }, shadowDarkness: {
            set: function () {
                console.warn("THREE.Light: .shadowDarkness has been removed.")
            }
        }, shadowMapWidth: {
            set: function (t) {
                console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."), this.shadow.mapSize.width = t
            }
        }, shadowMapHeight: {
            set: function (t) {
                console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."), this.shadow.mapSize.height = t
            }
        }
    }), Object.defineProperties(pt.prototype, {
        length: {
            get: function () {
                return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."), this.array.length
            }
        }
    }), Object.assign(St.prototype, {
        addIndex: function (t) {
            console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."), this.setIndex(t)
        }, addDrawCall: function (t, e, n) {
            void 0 !== n && console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."), console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."), this.addGroup(t, e)
        }, clearDrawCalls: function () {
            console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."), this.clearGroups()
        }, computeTangents: function () {
            console.warn("THREE.BufferGeometry: .computeTangents() has been removed.")
        }, computeOffsets: function () {
            console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")
        }
    }), Object.defineProperties(St.prototype, {
        drawcalls: {
            get: function () {
                return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."), this.groups
            }
        }, offsets: {
            get: function () {
                return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."), this.groups
            }
        }
    }), Object.defineProperties(zi.prototype, {
        dynamic: {
            set: function () {
                console.warn("THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.")
            }
        }, onUpdate: {
            value: function () {
                return console.warn("THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead."), this
            }
        }
    }), Object.defineProperties(Z.prototype, {
        wrapAround: {
            get: function () {
                console.warn("THREE." + this.type + ": .wrapAround has been removed.")
            }, set: function () {
                console.warn("THREE." + this.type + ": .wrapAround has been removed.")
            }
        }, wrapRGB: {
            get: function () {
                return console.warn("THREE." + this.type + ": .wrapRGB has been removed."), new j
            }
        }
    }), Object.defineProperties(gn.prototype, {
        metal: {
            get: function () {
                return console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead."), !1
            }, set: function () {
                console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead")
            }
        }
    }), Object.defineProperties(J.prototype, {
        derivatives: {
            get: function () {
                return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), this.extensions.derivatives
            }, set: function (t) {
                console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), this.extensions.derivatives = t
            }
        }
    }), Object.assign(se.prototype, {
        supportsFloatTextures: function () {
            return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."), this.extensions.get("OES_texture_float")
        }, supportsHalfFloatTextures: function () {
            return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."), this.extensions.get("OES_texture_half_float")
        }, supportsStandardDerivatives: function () {
            return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."), this.extensions.get("OES_standard_derivatives")
        }, supportsCompressedTextureS3TC: function () {
            return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."), this.extensions.get("WEBGL_compressed_texture_s3tc")
        }, supportsCompressedTexturePVRTC: function () {
            return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."), this.extensions.get("WEBGL_compressed_texture_pvrtc")
        }, supportsBlendMinMax: function () {
            return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."), this.extensions.get("EXT_blend_minmax")
        }, supportsVertexTextures: function () {
            return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."), this.capabilities.vertexTextures
        }, supportsInstancedArrays: function () {
            return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."), this.extensions.get("ANGLE_instanced_arrays")
        }, enableScissorTest: function (t) {
            console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."), this.setScissorTest(t)
        }, initMaterial: function () {
            console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
        }, addPrePlugin: function () {
            console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
        }, addPostPlugin: function () {
            console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
        }, updateShadowMap: function () {
            console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
        }
    }), Object.defineProperties(se.prototype, {
        shadowMapEnabled: {
            get: function () {
                return this.shadowMap.enabled
            }, set: function (t) {
                console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."), this.shadowMap.enabled = t
            }
        }, shadowMapType: {
            get: function () {
                return this.shadowMap.type
            }, set: function (t) {
                console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."), this.shadowMap.type = t
            }
        }, shadowMapCullFace: {
            get: function () {
                return this.shadowMap.cullFace
            }, set: function (t) {
                console.warn("THREE.WebGLRenderer: .shadowMapCullFace is now .shadowMap.cullFace."), this.shadowMap.cullFace = t
            }
        }
    }), Object.defineProperties(it.prototype, {
        cullFace: {
            get: function () {
                return this.renderReverseSided ? Xa : qa
            }, set: function (t) {
                var e = t !== qa;
                console.warn("WebGLRenderer: .shadowMap.cullFace is deprecated. Set .shadowMap.renderReverseSided to " + e + "."), this.renderReverseSided = e
            }
        }
    }), Object.defineProperties(r.prototype, {
        wrapS: {
            get: function () {
                return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS
            }, set: function (t) {
                console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS = t
            }
        }, wrapT: {
            get: function () {
                return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT
            }, set: function (t) {
                console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT = t
            }
        }, magFilter: {
            get: function () {
                return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), this.texture.magFilter
            }, set: function (t) {
                console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), this.texture.magFilter = t
            }
        }, minFilter: {
            get: function () {
                return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), this.texture.minFilter
            }, set: function (t) {
                console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), this.texture.minFilter = t
            }
        }, anisotropy: {
            get: function () {
                return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), this.texture.anisotropy
            }, set: function (t) {
                console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), this.texture.anisotropy = t
            }
        }, offset: {
            get: function () {
                return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), this.texture.offset
            }, set: function (t) {
                console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), this.texture.offset = t
            }
        }, repeat: {
            get: function () {
                return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), this.texture.repeat
            }, set: function (t) {
                console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), this.texture.repeat = t
            }
        }, format: {
            get: function () {
                return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), this.texture.format
            }, set: function (t) {
                console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), this.texture.format = t
            }
        }, type: {
            get: function () {
                return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type
            }, set: function (t) {
                console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type = t
            }
        }, generateMipmaps: {
            get: function () {
                return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), this.texture.generateMipmaps
            }, set: function (t) {
                console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), this.texture.generateMipmaps = t
            }
        }
    }), Ri.prototype.load = function (t) {
        console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");
        var e = this;
        return (new Ei).load(t, function (t) {
            e.setBuffer(t)
        }), this
    }, Ci.prototype.getData = function () {
        return console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData()."), this.getFrequencyData()
    };
    var Ah = {
        merge: function (t, e, n) {
            console.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");
            var i;
            e.isMesh && (e.matrixAutoUpdate && e.updateMatrix(), i = e.matrix, e = e.geometry), t.merge(e, i, n)
        }, center: function (t) {
            return console.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead."), t.center()
        }
    }, Lh = {
        crossOrigin: void 0, loadTexture: function (t, e, n, i) {
            console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");
            var r = new An;
            r.setCrossOrigin(this.crossOrigin);
            var o = r.load(t, n, void 0, i);
            return e && (o.mapping = e), o
        }, loadTextureCube: function (t, e, n, i) {
            console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");
            var r = new Sn;
            r.setCrossOrigin(this.crossOrigin);
            var o = r.load(t, n, void 0, i);
            return e && (o.mapping = e), o
        }, loadCompressedTexture: function () {
            console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
        }, loadCompressedTextureCube: function () {
            console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
        }
    }, Rh = Object.freeze({
        WebGLRenderTargetCube: o,
        WebGLRenderTarget: r,
        WebGLRenderer: se,
        ShaderLib: oh,
        UniformsLib: rh,
        UniformsUtils: eh,
        ShaderChunk: nh,
        FogExp2: ce,
        Fog: he,
        Scene: le,
        LensFlare: ue,
        Sprite: de,
        LOD: fe,
        SkinnedMesh: ve,
        Skeleton: me,
        Bone: ge,
        Mesh: At,
        LineSegments: _e,
        Line: xe,
        Points: we,
        Group: Me,
        VideoTexture: Ee,
        DataTexture: W,
        CompressedTexture: Te,
        CubeTexture: h,
        CanvasTexture: Se,
        DepthTexture: Ae,
        Texture: n,
        CompressedTextureLoader: Mn,
        DataTextureLoader: En,
        CubeTextureLoader: Sn,
        TextureLoader: An,
        ObjectLoader: ei,
        MaterialLoader: Qn,
        BufferGeometryLoader: Kn,
        DefaultLoadingManager: fh,
        LoadingManager: bn,
        JSONLoader: ti,
        ImageLoader: Tn,
        FontLoader: Mi,
        FileLoader: wn,
        Loader: $n,
        Cache: dh,
        AudioLoader: Ei,
        SpotLightShadow: Cn,
        SpotLight: Nn,
        PointLight: In,
        RectAreaLight: Ti,
        HemisphereLight: Rn,
        DirectionalLightShadow: Un,
        DirectionalLight: Dn,
        AmbientLight: On,
        LightShadow: Pn,
        Light: Ln,
        StereoCamera: Si,
        PerspectiveCamera: It,
        OrthographicCamera: Ut,
        CubeCamera: Ai,
        Camera: Nt,
        AudioListener: Li,
        PositionalAudio: Pi,
        AudioContext: xh,
        AudioAnalyser: Ci,
        Audio: Ri,
        VectorKeyframeTrack: Hn,
        StringKeyframeTrack: qn,
        QuaternionKeyframeTrack: jn,
        NumberKeyframeTrack: Wn,
        ColorKeyframeTrack: Yn,
        BooleanKeyframeTrack: Xn,
        PropertyMixer: Ni,
        PropertyBinding: Ii,
        KeyframeTrack: Zn,
        AnimationUtils: mh,
        AnimationObjectGroup: Ui,
        AnimationMixer: Oi,
        AnimationClip: Jn,
        Uniform: zi,
        InstancedBufferGeometry: Bi,
        BufferGeometry: St,
        GeometryIdCount: Et,
        Geometry: Tt,
        InterleavedBufferAttribute: Fi,
        InstancedInterleavedBuffer: ki,
        InterleavedBuffer: Gi,
        InstancedBufferAttribute: Hi,
        Face3: lt,
        Object3D: st,
        Raycaster: Vi,
        Layers: at,
        EventDispatcher: t,
        Clock: qi,
        QuaternionLinearInterpolant: Vn,
        LinearInterpolant: Fn,
        DiscreteInterpolant: Gn,
        CubicInterpolant: Bn,
        Interpolant: zn,
        Triangle: ht,
        Math: Yc,
        Spherical: Xi,
        Cylindrical: Yi,
        Plane: et,
        Frustum: nt,
        Sphere: $,
        Ray: rt,
        Matrix4: c,
        Matrix3: tt,
        Box3: K,
        Box2: q,
        Line3: ct,
        Euler: ot,
        Vector4: i,
        Vector3: s,
        Vector2: e,
        Quaternion: a,
        Color: j,
        MorphBlendMesh: Zi,
        ImmediateRenderObject: Ji,
        VertexNormalsHelper: Qi,
        SpotLightHelper: Ki,
        SkeletonHelper: $i,
        PointLightHelper: tr,
        RectAreaLightHelper: er,
        HemisphereLightHelper: nr,
        GridHelper: ir,
        PolarGridHelper: rr,
        FaceNormalsHelper: or,
        DirectionalLightHelper: ar,
        CameraHelper: sr,
        BoxHelper: cr,
        ArrowHelper: hr,
        AxisHelper: lr,
        CatmullRomCurve3: pr,
        CubicBezierCurve3: dr,
        QuadraticBezierCurve3: fr,
        LineCurve3: mr,
        ArcCurve: gr,
        EllipseCurve: mi,
        SplineCurve: gi,
        CubicBezierCurve: vi,
        QuadraticBezierCurve: yi,
        LineCurve: di,
        Shape: _i,
        Path: xi,
        ShapePath: bi,
        Font: wi,
        CurvePath: fi,
        Curve: pi,
        ShapeUtils: lh,
        SceneUtils: Sh,
        WireframeGeometry: Le,
        ParametricGeometry: Re,
        ParametricBufferGeometry: Pe,
        TetrahedronGeometry: Ie,
        TetrahedronBufferGeometry: Ue,
        OctahedronGeometry: De,
        OctahedronBufferGeometry: Oe,
        IcosahedronGeometry: ze,
        IcosahedronBufferGeometry: Be,
        DodecahedronGeometry: Fe,
        DodecahedronBufferGeometry: Ge,
        PolyhedronGeometry: Ce,
        PolyhedronBufferGeometry: Ne,
        TubeGeometry: ke,
        TubeBufferGeometry: He,
        TorusKnotGeometry: Ve,
        TorusKnotBufferGeometry: je,
        TorusGeometry: We,
        TorusBufferGeometry: qe,
        TextGeometry: Ye,
        SphereGeometry: Ze,
        SphereBufferGeometry: Je,
        RingGeometry: Qe,
        RingBufferGeometry: Ke,
        PlaneGeometry: Pt,
        PlaneBufferGeometry: Ct,
        LatheGeometry: $e,
        LatheBufferGeometry: tn,
        ShapeGeometry: en,
        ShapeBufferGeometry: nn,
        ExtrudeGeometry: Xe,
        EdgesGeometry: rn,
        ConeGeometry: sn,
        ConeBufferGeometry: cn,
        CylinderGeometry: on,
        CylinderBufferGeometry: an,
        CircleGeometry: hn,
        CircleBufferGeometry: ln,
        BoxGeometry: Lt,
        BoxBufferGeometry: Rt,
        ShadowMaterial: un,
        SpriteMaterial: pe,
        RawShaderMaterial: pn,
        ShaderMaterial: J,
        PointsMaterial: be,
        MultiMaterial: dn,
        MeshPhysicalMaterial: mn,
        MeshStandardMaterial: fn,
        MeshPhongMaterial: gn,
        MeshToonMaterial: vn,
        MeshNormalMaterial: yn,
        MeshLambertMaterial: xn,
        MeshDepthMaterial: Q,
        MeshBasicMaterial: ut,
        LineDashedMaterial: _n,
        LineBasicMaterial: ye,
        Material: Z,
        Float64BufferAttribute: bt,
        Float32BufferAttribute: _t,
        Uint32BufferAttribute: xt,
        Int32BufferAttribute: yt,
        Uint16BufferAttribute: vt,
        Int16BufferAttribute: gt,
        Uint8ClampedBufferAttribute: mt,
        Uint8BufferAttribute: ft,
        Int8BufferAttribute: dt,
        BufferAttribute: pt,
        REVISION: Va,
        MOUSE: ja,
        CullFaceNone: Wa,
        CullFaceBack: qa,
        CullFaceFront: Xa,
        CullFaceFrontBack: 3,
        FrontFaceDirectionCW: Ya,
        FrontFaceDirectionCCW: 1,
        BasicShadowMap: 0,
        PCFShadowMap: Za,
        PCFSoftShadowMap: Ja,
        FrontSide: Qa,
        BackSide: Ka,
        DoubleSide: $a,
        FlatShading: ts,
        SmoothShading: es,
        NoColors: ns,
        FaceColors: is,
        VertexColors: rs,
        NoBlending: os,
        NormalBlending: as,
        AdditiveBlending: ss,
        SubtractiveBlending: cs,
        MultiplyBlending: hs,
        CustomBlending: ls,
        AddEquation: us,
        SubtractEquation: ps,
        ReverseSubtractEquation: ds,
        MinEquation: fs,
        MaxEquation: ms,
        ZeroFactor: gs,
        OneFactor: vs,
        SrcColorFactor: ys,
        OneMinusSrcColorFactor: xs,
        SrcAlphaFactor: _s,
        OneMinusSrcAlphaFactor: bs,
        DstAlphaFactor: ws,
        OneMinusDstAlphaFactor: Ms,
        DstColorFactor: Es,
        OneMinusDstColorFactor: Ts,
        SrcAlphaSaturateFactor: Ss,
        NeverDepth: As,
        AlwaysDepth: Ls,
        LessDepth: Rs,
        LessEqualDepth: Ps,
        EqualDepth: Cs,
        GreaterEqualDepth: Ns,
        GreaterDepth: Is,
        NotEqualDepth: Us,
        MultiplyOperation: Ds,
        MixOperation: Os,
        AddOperation: zs,
        NoToneMapping: Bs,
        LinearToneMapping: Fs,
        ReinhardToneMapping: Gs,
        Uncharted2ToneMapping: ks,
        CineonToneMapping: Hs,
        UVMapping: 300,
        CubeReflectionMapping: Vs,
        CubeRefractionMapping: js,
        EquirectangularReflectionMapping: Ws,
        EquirectangularRefractionMapping: qs,
        SphericalReflectionMapping: Xs,
        CubeUVReflectionMapping: Ys,
        CubeUVRefractionMapping: Zs,
        RepeatWrapping: Js,
        ClampToEdgeWrapping: Qs,
        MirroredRepeatWrapping: Ks,
        NearestFilter: $s,
        NearestMipMapNearestFilter: tc,
        NearestMipMapLinearFilter: ec,
        LinearFilter: nc,
        LinearMipMapNearestFilter: ic,
        LinearMipMapLinearFilter: rc,
        UnsignedByteType: oc,
        ByteType: ac,
        ShortType: sc,
        UnsignedShortType: cc,
        IntType: hc,
        UnsignedIntType: lc,
        FloatType: uc,
        HalfFloatType: pc,
        UnsignedShort4444Type: dc,
        UnsignedShort5551Type: fc,
        UnsignedShort565Type: mc,
        UnsignedInt248Type: gc,
        AlphaFormat: vc,
        RGBFormat: yc,
        RGBAFormat: xc,
        LuminanceFormat: _c,
        LuminanceAlphaFormat: bc,
        RGBEFormat: wc,
        DepthFormat: Mc,
        DepthStencilFormat: Ec,
        RGB_S3TC_DXT1_Format: Tc,
        RGBA_S3TC_DXT1_Format: Sc,
        RGBA_S3TC_DXT3_Format: Ac,
        RGBA_S3TC_DXT5_Format: Lc,
        RGB_PVRTC_4BPPV1_Format: Rc,
        RGB_PVRTC_2BPPV1_Format: Pc,
        RGBA_PVRTC_4BPPV1_Format: Cc,
        RGBA_PVRTC_2BPPV1_Format: Nc,
        RGB_ETC1_Format: Ic,
        LoopOnce: 2200,
        LoopRepeat: Uc,
        LoopPingPong: 2202,
        InterpolateDiscrete: 2300,
        InterpolateLinear: 2301,
        InterpolateSmooth: 2302,
        ZeroCurvatureEnding: Dc,
        ZeroSlopeEnding: 2401,
        WrapAroundEnding: 2402,
        TrianglesDrawMode: Oc,
        TriangleStripDrawMode: zc,
        TriangleFanDrawMode: Bc,
        LinearEncoding: Fc,
        sRGBEncoding: Gc,
        GammaEncoding: kc,
        RGBEEncoding: Hc,
        LogLuvEncoding: 3003,
        RGBM7Encoding: Vc,
        RGBM16Encoding: jc,
        RGBDEncoding: Wc,
        BasicDepthPacking: qc,
        RGBADepthPacking: Xc,
        CubeGeometry: Lt,
        Face4: vr,
        LineStrip: 0,
        LinePieces: 1,
        MeshFaceMaterial: yr,
        PointCloud: xr,
        Particle: _r,
        ParticleSystem: br,
        PointCloudMaterial: wr,
        ParticleBasicMaterial: Mr,
        ParticleSystemMaterial: Er,
        Vertex: Tr,
        DynamicBufferAttribute: Sr,
        Int8Attribute: Ar,
        Uint8Attribute: Lr,
        Uint8ClampedAttribute: Rr,
        Int16Attribute: Pr,
        Uint16Attribute: Cr,
        Int32Attribute: Nr,
        Uint32Attribute: Ir,
        Float32Attribute: Ur,
        Float64Attribute: Dr,
        ClosedSplineCurve3: Or,
        SplineCurve3: zr,
        Spline: Br,
        BoundingBoxHelper: Fr,
        EdgesHelper: Gr,
        WireframeHelper: kr,
        XHRLoader: Hr,
        BinaryTextureLoader: Vr,
        GeometryUtils: Ah,
        ImageUtils: Lh,
        Projector: jr,
        CanvasRenderer: Wr
    });
    window.THREE = {}, Object.setPrototypeOf(window.THREE, Rh), THREE.TrackballControls = function (t, e) {
        function n(t) {
            p.enabled !== !1 && (window.removeEventListener("keydown", n), g = m, m === d.NONE && (t.keyCode !== p.keys[d.ROTATE] || p.noRotate ? t.keyCode !== p.keys[d.ZOOM] || p.noZoom ? t.keyCode !== p.keys[d.PAN] || p.noPan || (m = d.PAN) : m = d.ZOOM : m = d.ROTATE))
        }

        function i(t) {
            p.enabled !== !1 && (m = g, window.addEventListener("keydown", n, !1))
        }

        function r(t) {
            p.enabled !== !1 && (t.preventDefault(), t.stopPropagation(), m === d.NONE && (m = t.button), m !== d.ROTATE || p.noRotate ? m !== d.ZOOM || p.noZoom ? m !== d.PAN || p.noPan || (S.copy(C(t.pageX, t.pageY)), A.copy(S)) : (w.copy(C(t.pageX, t.pageY)), M.copy(w)) : (x.copy(N(t.pageX, t.pageY)), y.copy(x)), document.addEventListener("mousemove", o, !1), document.addEventListener("mouseup", a, !1), p.dispatchEvent(R))
        }

        function o(t) {
            p.enabled !== !1 && (t.preventDefault(), t.stopPropagation(), m !== d.ROTATE || p.noRotate ? m !== d.ZOOM || p.noZoom ? m !== d.PAN || p.noPan || A.copy(C(t.pageX, t.pageY)) : M.copy(C(t.pageX, t.pageY)) : (y.copy(x), x.copy(N(t.pageX, t.pageY))))
        }

        function a(t) {
            p.enabled !== !1 && (t.preventDefault(), t.stopPropagation(), m = d.NONE, document.removeEventListener("mousemove", o), document.removeEventListener("mouseup", a), p.dispatchEvent(P))
        }

        function s(t) {
            if (p.enabled !== !1) {
                switch (t.preventDefault(), t.stopPropagation(), t.deltaMode) {
                    case 2:
                        w.y -= .025 * t.deltaY;
                        break;
                    case 1:
                        w.y -= .01 * t.deltaY;
                        break;
                    default:
                        w.y -= 25e-5 * t.deltaY
                }
                p.dispatchEvent(R), p.dispatchEvent(P)
            }
        }

        function c(t) {
            if (p.enabled !== !1) {
                switch (t.touches.length) {
                    case 1:
                        m = d.TOUCH_ROTATE, x.copy(N(t.touches[0].pageX, t.touches[0].pageY)), y.copy(x);
                        break;
                    default:
                        m = d.TOUCH_ZOOM_PAN;
                        var e = t.touches[0].pageX - t.touches[1].pageX, n = t.touches[0].pageY - t.touches[1].pageY;
                        T = E = Math.sqrt(e * e + n * n);
                        var i = (t.touches[0].pageX + t.touches[1].pageX) / 2,
                            r = (t.touches[0].pageY + t.touches[1].pageY) / 2;
                        S.copy(C(i, r)), A.copy(S)
                }
                p.dispatchEvent(R)
            }
        }

        function h(t) {
            if (p.enabled !== !1)switch (t.preventDefault(), t.stopPropagation(), t.touches.length) {
                case 1:
                    y.copy(x), x.copy(N(t.touches[0].pageX, t.touches[0].pageY));
                    break;
                default:
                    var e = t.touches[0].pageX - t.touches[1].pageX, n = t.touches[0].pageY - t.touches[1].pageY;
                    T = Math.sqrt(e * e + n * n);
                    var i = (t.touches[0].pageX + t.touches[1].pageX) / 2,
                        r = (t.touches[0].pageY + t.touches[1].pageY) / 2;
                    A.copy(C(i, r))
            }
        }

        function l(t) {
            if (p.enabled !== !1) {
                switch (t.touches.length) {
                    case 0:
                        m = d.NONE;
                        break;
                    case 1:
                        m = d.TOUCH_ROTATE, x.copy(N(t.touches[0].pageX, t.touches[0].pageY)), y.copy(x)
                }
                p.dispatchEvent(P)
            }
        }

        function u(t) {
            t.preventDefault()
        }

        var p = this, d = {NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4};
        this.object = t, this.domElement = void 0 !== e ? e : document, this.enabled = !0, this.screen = {
            left: 0,
            top: 0,
            width: 0,
            height: 0
        }, this.rotateSpeed = 1, this.zoomSpeed = 1.2, this.panSpeed = .3, this.noRotate = !1, this.noZoom = !1, this.noPan = !1, this.staticMoving = !1, this.dynamicDampingFactor = .2, this.minDistance = 0, this.maxDistance = 1 / 0, this.keys = [65, 83, 68], this.target = new THREE.Vector3;
        var f = new THREE.Vector3, m = d.NONE, g = d.NONE, v = new THREE.Vector3, y = new THREE.Vector2,
            x = new THREE.Vector2, _ = new THREE.Vector3, b = 0, w = new THREE.Vector2, M = new THREE.Vector2, E = 0,
            T = 0, S = new THREE.Vector2, A = new THREE.Vector2;
        this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.up0 = this.object.up.clone();
        var L = {type: "change"}, R = {type: "start"}, P = {type: "end"};
        this.handleResize = function () {
            if (this.domElement === document) this.screen.left = 0, this.screen.top = 0, this.screen.width = window.innerWidth, this.screen.height = window.innerHeight; else {
                var t = this.domElement.getBoundingClientRect(), e = this.domElement.ownerDocument.documentElement;
                this.screen.left = t.left + window.pageXOffset - e.clientLeft, this.screen.top = t.top + window.pageYOffset - e.clientTop, this.screen.width = t.width, this.screen.height = t.height
            }
        }, this.handleEvent = function (t) {
            "function" == typeof this[t.type] && this[t.type](t)
        };
        var C = function () {
            var t = new THREE.Vector2;
            return function (e, n) {
                return t.set((e - p.screen.left) / p.screen.width, (n - p.screen.top) / p.screen.height), t
            }
        }(), N = function () {
            var t = new THREE.Vector2;
            return function (e, n) {
                return t.set((e - .5 * p.screen.width - p.screen.left) / (.5 * p.screen.width), (p.screen.height + 2 * (p.screen.top - n)) / p.screen.width), t
            }
        }();
        this.rotateCamera = function () {
            var t, e = new THREE.Vector3, n = new THREE.Quaternion, i = new THREE.Vector3, r = new THREE.Vector3,
                o = new THREE.Vector3, a = new THREE.Vector3;
            return function () {
                a.set(x.x - y.x, x.y - y.y, 0), t = a.length(), t ? (v.copy(p.object.position).sub(p.target), i.copy(v).normalize(), r.copy(p.object.up).normalize(), o.crossVectors(r, i).normalize(), r.setLength(x.y - y.y), o.setLength(x.x - y.x), a.copy(r.add(o)), e.crossVectors(a, v).normalize(), t *= p.rotateSpeed, n.setFromAxisAngle(e, t), v.applyQuaternion(n), p.object.up.applyQuaternion(n), _.copy(e), b = t) : !p.staticMoving && b && (b *= Math.sqrt(1 - p.dynamicDampingFactor), v.copy(p.object.position).sub(p.target), n.setFromAxisAngle(_, b), v.applyQuaternion(n), p.object.up.applyQuaternion(n)), y.copy(x)
            }
        }(), this.zoomCamera = function () {
            var t;
            m === d.TOUCH_ZOOM_PAN ? (t = E / T, E = T, v.multiplyScalar(t)) : (t = 1 + (M.y - w.y) * p.zoomSpeed, 1 !== t && t > 0 && v.multiplyScalar(t), p.staticMoving ? w.copy(M) : w.y += (M.y - w.y) * this.dynamicDampingFactor)
        }, this.panCamera = function () {
            var t = new THREE.Vector2, e = new THREE.Vector3, n = new THREE.Vector3;
            return function () {
                t.copy(A).sub(S), t.lengthSq() && (t.multiplyScalar(v.length() * p.panSpeed), n.copy(v).cross(p.object.up).setLength(t.x), n.add(e.copy(p.object.up).setLength(t.y)), p.object.position.add(n), p.target.add(n), p.staticMoving ? S.copy(A) : S.add(t.subVectors(A, S).multiplyScalar(p.dynamicDampingFactor)))
            }
        }(), this.checkDistances = function () {
            p.noZoom && p.noPan || (v.lengthSq() > p.maxDistance * p.maxDistance && (p.object.position.addVectors(p.target, v.setLength(p.maxDistance)), w.copy(M)), v.lengthSq() < p.minDistance * p.minDistance && (p.object.position.addVectors(p.target, v.setLength(p.minDistance)), w.copy(M)))
        }, this.update = function () {
            v.subVectors(p.object.position, p.target), p.noRotate || p.rotateCamera(), p.noZoom || p.zoomCamera(), p.noPan || p.panCamera(), p.object.position.addVectors(p.target, v), p.checkDistances(), p.object.lookAt(p.target), f.distanceToSquared(p.object.position) > 1e-6 && (p.dispatchEvent(L), f.copy(p.object.position))
        }, this.reset = function () {
            m = d.NONE, g = d.NONE, p.target.copy(p.target0), p.object.position.copy(p.position0), p.object.up.copy(p.up0), v.subVectors(p.object.position, p.target), p.object.lookAt(p.target), p.dispatchEvent(L), f.copy(p.object.position)
        }, this.dispose = function () {
            this.domElement.removeEventListener("contextmenu", u, !1),
                this.domElement.removeEventListener("mousedown", r, !1), this.domElement.removeEventListener("wheel", s, !1), this.domElement.removeEventListener("touchstart", c, !1), this.domElement.removeEventListener("touchend", l, !1), this.domElement.removeEventListener("touchmove", h, !1), document.removeEventListener("mousemove", o, !1), document.removeEventListener("mouseup", a, !1), window.removeEventListener("keydown", n, !1), window.removeEventListener("keyup", i, !1)
        }, this.domElement.addEventListener("contextmenu", u, !1), this.domElement.addEventListener("mousedown", r, !1), this.domElement.addEventListener("wheel", s, !1), this.domElement.addEventListener("touchstart", c, !1), this.domElement.addEventListener("touchend", l, !1), this.domElement.addEventListener("touchmove", h, !1), window.addEventListener("keydown", n, !1), window.addEventListener("keyup", i, !1), this.handleResize(), this.update()
    }, THREE.TrackballControls.prototype = Object.create(THREE.EventDispatcher.prototype), THREE.TrackballControls.prototype.constructor = THREE.TrackballControls;
    var Ph = function (t, e, n) {
        function i() {
            var i, o, a = r.length, s = 0, c = 0, h = 0;
            for (i = 0; i < a; ++i)o = r[i], s += o.x || 0, c += o.y || 0, h += o.z || 0;
            for (s = s / a - t, c = c / a - e, h = h / a - n, i = 0; i < a; ++i)o = r[i], s && (o.x -= s), c && (o.y -= c), h && (o.z -= h)
        }

        var r;
        return null == t && (t = 0), null == e && (e = 0), null == n && (n = 0), i.initialize = function (t) {
            r = t
        }, i.x = function (e) {
            return arguments.length ? (t = +e, i) : t
        }, i.y = function (t) {
            return arguments.length ? (e = +t, i) : e
        }, i.z = function (t) {
            return arguments.length ? (n = +t, i) : n
        }, i
    }, Ch = function (t) {
        return function () {
            return t
        }
    }, Nh = function () {
        return 1e-6 * (Math.random() - .5)
    }, Ih = function (t) {
        var e = +this._x.call(null, t);
        return qr(this.cover(e), e, t)
    }, Uh = function (t) {
        if (isNaN(t = +t))return this;
        var e = this._x0, n = this._x1;
        if (isNaN(e)) n = (e = Math.floor(t)) + 1; else {
            if (!(e > t || t > n))return this;
            var i, r, o = n - e, a = this._root;
            switch (r = +(t < (e + n) / 2)) {
                case 0:
                    do i = new Array(2), i[r] = a, a = i; while (o *= 2, n = e + o, t > n)
                    break;
                case 1:
                    do i = new Array(2), i[r] = a, a = i; while (o *= 2, (e = n - o) > t)
            }
            this._root && this._root.length && (this._root = a)
        }
        return this._x0 = e, this._x1 = n, this
    }, Dh = function () {
        var t = [];
        return this.visit(function (e) {
            if (!e.length)do t.push(e.data); while (e = e.next)
        }), t
    }, Oh = function (t) {
        return arguments.length ? this.cover(+t[0][0]).cover(+t[1][0]) : isNaN(this._x0) ? void 0 : [[this._x0], [this._x1]]
    }, zh = function (t, e, n) {
        this.node = t, this.x0 = e, this.x1 = n
    }, Bh = function (t, e) {
        var n, i, r, o, a, s = this._x0, c = this._x1, h = [], l = this._root;
        for (l && h.push(new zh(l, s, c)), null == e ? e = 1 / 0 : (s = t - e, c = t + e); o = h.pop();)if (!(!(l = o.node) || (i = o.x0) > c || (r = o.x1) < s))if (l.length) {
            var u = (i + r) / 2;
            h.push(new zh(l[1], u, r), new zh(l[0], i, u)), (a = +(t >= u)) && (o = h[h.length - 1], h[h.length - 1] = h[h.length - 1 - a], h[h.length - 1 - a] = o)
        } else {
            var p = t - +this._x.call(null, l.data);
            p < e && (e = p, s = t - p, c = t + p, n = l.data)
        }
        return n
    }, Fh = function (t) {
        if (isNaN(o = +this._x.call(null, t)))return this;
        var e, n, i, r, o, a, s, c, h, l = this._root, u = this._x0, p = this._x1;
        if (!l)return this;
        if (l.length)for (; ;) {
            if ((s = o >= (a = (u + p) / 2)) ? u = a : p = a, e = l, !(l = l[c = +s]))return this;
            if (!l.length)break;
            e[c + 1 & 1] && (n = e, h = c)
        }
        for (; l.data !== t;)if (i = l, !(l = l.next))return this;
        return (r = l.next) && delete l.next, i ? (r ? i.next = r : delete i.next, this) : e ? (r ? e[c] = r : delete e[c], (l = e[0] || e[1]) && l === (e[1] || e[0]) && !l.length && (n ? n[h] = l : this._root = l), this) : (this._root = r, this)
    }, Gh = function () {
        return this._root
    }, kh = function () {
        var t = 0;
        return this.visit(function (e) {
            if (!e.length)do++t; while (e = e.next)
        }), t
    }, Hh = function (t) {
        var e, n, i, r, o = [], a = this._root;
        for (a && o.push(new zh(a, this._x0, this._x1)); e = o.pop();)if (!t(a = e.node, i = e.x0, r = e.x1) && a.length) {
            var s = (i + r) / 2;
            (n = a[1]) && o.push(new zh(n, s, r)), (n = a[0]) && o.push(new zh(n, i, s))
        }
        return this
    }, Vh = function (t) {
        var e, n = [], i = [];
        for (this._root && n.push(new zh(this._root, this._x0, this._x1)); e = n.pop();) {
            var r = e.node;
            if (r.length) {
                var o, a = e.x0, s = e.x1, c = (a + s) / 2;
                (o = r[0]) && n.push(new zh(o, a, c)), (o = r[1]) && n.push(new zh(o, c, s))
            }
            i.push(e)
        }
        for (; e = i.pop();)t(e.node, e.x0, e.x1);
        return this
    }, jh = function (t) {
        return arguments.length ? (this._x = t, this) : this._x
    }, Wh = Jr.prototype = Qr.prototype;
    Wh.copy = function () {
        var t, e, n = new Qr(this._x, this._x0, this._x1), i = this._root;
        if (!i)return n;
        if (!i.length)return n._root = Kr(i), n;
        for (t = [{
            source: i,
            target: n._root = new Array(2)
        }]; i = t.pop();)for (var r = 0; r < 2; ++r)(e = i.source[r]) && (e.length ? t.push({
            source: e,
            target: i.target[r] = new Array(2)
        }) : i.target[r] = Kr(e));
        return n
    }, Wh.add = Ih, Wh.addAll = Xr, Wh.cover = Uh, Wh.data = Dh, Wh.extent = Oh, Wh.find = Bh, Wh.remove = Fh, Wh.removeAll = Yr, Wh.root = Gh, Wh.size = kh, Wh.visit = Hh, Wh.visitAfter = Vh, Wh.x = jh;
    var qh = function (t) {
        var e = +this._x.call(null, t), n = +this._y.call(null, t);
        return $r(this.cover(e, n), e, n, t)
    }, Xh = function (t, e) {
        if (isNaN(t = +t) || isNaN(e = +e))return this;
        var n = this._x0, i = this._y0, r = this._x1, o = this._y1;
        if (isNaN(n)) r = (n = Math.floor(t)) + 1, o = (i = Math.floor(e)) + 1; else {
            if (!(n > t || t > r || i > e || e > o))return this;
            var a, s, c = r - n, h = this._root;
            switch (s = (e < (i + o) / 2) << 1 | t < (n + r) / 2) {
                case 0:
                    do a = new Array(4), a[s] = h, h = a; while (c *= 2, r = n + c, o = i + c, t > r || e > o)
                    break;
                case 1:
                    do a = new Array(4), a[s] = h, h = a; while (c *= 2, n = r - c, o = i + c, n > t || e > o)
                    break;
                case 2:
                    do a = new Array(4), a[s] = h, h = a; while (c *= 2, r = n + c, i = o - c, t > r || i > e)
                    break;
                case 3:
                    do a = new Array(4), a[s] = h, h = a; while (c *= 2, n = r - c, i = o - c, n > t || i > e)
            }
            this._root && this._root.length && (this._root = h)
        }
        return this._x0 = n, this._y0 = i, this._x1 = r, this._y1 = o, this
    }, Yh = function () {
        var t = [];
        return this.visit(function (e) {
            if (!e.length)do t.push(e.data); while (e = e.next)
        }), t
    }, Zh = function (t) {
        return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]]
    }, Jh = function (t, e, n, i, r) {
        this.node = t, this.x0 = e, this.y0 = n, this.x1 = i, this.y1 = r
    }, Qh = function (t, e, n) {
        var i, r, o, a, s, c, h, l = this._x0, u = this._y0, p = this._x1, d = this._y1, f = [], m = this._root;
        for (m && f.push(new Jh(m, l, u, p, d)), null == n ? n = 1 / 0 : (l = t - n, u = e - n, p = t + n, d = e + n, n *= n); c = f.pop();)if (!(!(m = c.node) || (r = c.x0) > p || (o = c.y0) > d || (a = c.x1) < l || (s = c.y1) < u))if (m.length) {
            var g = (r + a) / 2, v = (o + s) / 2;
            f.push(new Jh(m[3], g, v, a, s), new Jh(m[2], r, v, g, s), new Jh(m[1], g, o, a, v), new Jh(m[0], r, o, g, v)), (h = (e >= v) << 1 | t >= g) && (c = f[f.length - 1], f[f.length - 1] = f[f.length - 1 - h], f[f.length - 1 - h] = c)
        } else {
            var y = t - +this._x.call(null, m.data), x = e - +this._y.call(null, m.data), _ = y * y + x * x;
            if (_ < n) {
                var b = Math.sqrt(n = _);
                l = t - b, u = e - b, p = t + b, d = e + b, i = m.data
            }
        }
        return i
    }, Kh = function (t) {
        if (isNaN(o = +this._x.call(null, t)) || isNaN(a = +this._y.call(null, t)))return this;
        var e, n, i, r, o, a, s, c, h, l, u, p, d = this._root, f = this._x0, m = this._y0, g = this._x1, v = this._y1;
        if (!d)return this;
        if (d.length)for (; ;) {
            if ((h = o >= (s = (f + g) / 2)) ? f = s : g = s, (l = a >= (c = (m + v) / 2)) ? m = c : v = c, e = d, !(d = d[u = l << 1 | h]))return this;
            if (!d.length)break;
            (e[u + 1 & 3] || e[u + 2 & 3] || e[u + 3 & 3]) && (n = e, p = u)
        }
        for (; d.data !== t;)if (i = d, !(d = d.next))return this;
        return (r = d.next) && delete d.next, i ? (r ? i.next = r : delete i.next, this) : e ? (r ? e[u] = r : delete e[u], (d = e[0] || e[1] || e[2] || e[3]) && d === (e[3] || e[2] || e[1] || e[0]) && !d.length && (n ? n[p] = d : this._root = d), this) : (this._root = r, this)
    }, $h = function () {
        return this._root
    }, tl = function () {
        var t = 0;
        return this.visit(function (e) {
            if (!e.length)do++t; while (e = e.next)
        }), t
    }, el = function (t) {
        var e, n, i, r, o, a, s = [], c = this._root;
        for (c && s.push(new Jh(c, this._x0, this._y0, this._x1, this._y1)); e = s.pop();)if (!t(c = e.node, i = e.x0, r = e.y0, o = e.x1, a = e.y1) && c.length) {
            var h = (i + o) / 2, l = (r + a) / 2;
            (n = c[3]) && s.push(new Jh(n, h, l, o, a)), (n = c[2]) && s.push(new Jh(n, i, l, h, a)), (n = c[1]) && s.push(new Jh(n, h, r, o, l)), (n = c[0]) && s.push(new Jh(n, i, r, h, l))
        }
        return this
    }, nl = function (t) {
        var e, n = [], i = [];
        for (this._root && n.push(new Jh(this._root, this._x0, this._y0, this._x1, this._y1)); e = n.pop();) {
            var r = e.node;
            if (r.length) {
                var o, a = e.x0, s = e.y0, c = e.x1, h = e.y1, l = (a + c) / 2, u = (s + h) / 2;
                (o = r[0]) && n.push(new Jh(o, a, s, l, u)), (o = r[1]) && n.push(new Jh(o, l, s, c, u)), (o = r[2]) && n.push(new Jh(o, a, u, l, h)), (o = r[3]) && n.push(new Jh(o, l, u, c, h))
            }
            i.push(e)
        }
        for (; e = i.pop();)t(e.node, e.x0, e.y0, e.x1, e.y1);
        return this
    }, il = function (t) {
        return arguments.length ? (this._x = t, this) : this._x
    }, rl = function (t) {
        return arguments.length ? (this._y = t, this) : this._y
    }, ol = ro.prototype = oo.prototype;
    ol.copy = function () {
        var t, e, n = new oo(this._x, this._y, this._x0, this._y0, this._x1, this._y1), i = this._root;
        if (!i)return n;
        if (!i.length)return n._root = ao(i), n;
        for (t = [{
            source: i,
            target: n._root = new Array(4)
        }]; i = t.pop();)for (var r = 0; r < 4; ++r)(e = i.source[r]) && (e.length ? t.push({
            source: e,
            target: i.target[r] = new Array(4)
        }) : i.target[r] = ao(e));
        return n
    }, ol.add = qh, ol.addAll = to, ol.cover = Xh, ol.data = Yh, ol.extent = Zh, ol.find = Qh, ol.remove = Kh, ol.removeAll = eo, ol.root = $h, ol.size = tl, ol.visit = el, ol.visitAfter = nl, ol.x = il, ol.y = rl;
    var al = function (t) {
        var e = +this._x.call(null, t), n = +this._y.call(null, t), i = +this._z.call(null, t);
        return so(this.cover(e, n, i), e, n, i, t)
    }, sl = function (t, e, n) {
        if (isNaN(t = +t) || isNaN(e = +e) || isNaN(n = +n))return this;
        var i = this._x0, r = this._y0, o = this._z0, a = this._x1, s = this._y1, c = this._z1;
        if (isNaN(i)) a = (i = Math.floor(t)) + 1, s = (r = Math.floor(e)) + 1, c = (o = Math.floor(n)) + 1; else {
            if (!(i > t || t > a || r > e || e > s || o > n || n > c))return this;
            var h, l, u = a - i, p = this._root;
            switch (l = (n < (o + c) / 2) << 2 | (e < (r + s) / 2) << 1 | t < (i + a) / 2) {
                case 0:
                    do h = new Array(8), h[l] = p, p = h; while (u *= 2, a = i + u, s = r + u, c = o + u, t > a || e > s || n > c)
                    break;
                case 1:
                    do h = new Array(8), h[l] = p, p = h; while (u *= 2, i = a - u, s = r + u, c = o + u, i > t || e > s || n > c)
                    break;
                case 2:
                    do h = new Array(8), h[l] = p, p = h; while (u *= 2, a = i + u, r = s - u, c = o + u, t > a || r > e || n > c)
                    break;
                case 3:
                    do h = new Array(8), h[l] = p, p = h; while (u *= 2, i = a - u, r = s - u, c = o + u, i > t || r > e || n > c)
                    break;
                case 4:
                    do h = new Array(8), h[l] = p, p = h; while (u *= 2, a = i + u, s = r + u, o = c - u, t > a || e > s || o > n)
                    break;
                case 5:
                    do h = new Array(8), h[l] = p, p = h; while (u *= 2, i = a - u, s = r + u, o = c - u, i > t || e > s || o > n)
                    break;
                case 6:
                    do h = new Array(8), h[l] = p, p = h; while (u *= 2, a = i + u, r = s - u, o = c - u, t > a || r > e || o > n)
                    break;
                case 7:
                    do h = new Array(8), h[l] = p, p = h; while (u *= 2, i = a - u, r = s - u, o = c - u, i > t || r > e || o > n)
            }
            this._root && this._root.length && (this._root = p)
        }
        return this._x0 = i, this._y0 = r, this._z0 = o, this._x1 = a, this._y1 = s, this._z1 = c, this
    }, cl = function () {
        var t = [];
        return this.visit(function (e) {
            if (!e.length)do t.push(e.data); while (e = e.next)
        }), t
    }, hl = function (t) {
        return arguments.length ? this.cover(+t[0][0], +t[0][1], +t[0][2]).cover(+t[1][0], +t[1][1], +t[1][2]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0, this._z0], [this._x1, this._y1, this._z1]]
    }, ll = function (t, e, n, i, r, o, a) {
        this.node = t, this.x0 = e, this.y0 = n, this.z0 = i, this.x1 = r, this.y1 = o, this.z1 = a
    }, ul = function (t, e, n, i) {
        var r, o, a, s, c, h, l, u, p, d = this._x0, f = this._y0, m = this._z0, g = this._x1, v = this._y1,
            y = this._z1, x = [], _ = this._root;
        for (_ && x.push(new ll(_, d, f, m, g, v, y)), null == i ? i = 1 / 0 : (d = t - i, f = e - i, m = n - i, g = t + i, v = e + i, y = n + i, i *= i); u = x.pop();)if (!(!(_ = u.node) || (o = u.x0) > g || (a = u.y0) > v || (s = u.z0) > y || (c = u.x1) < d || (h = u.y1) < f || (l = u.z1) < m))if (_.length) {
            var b = (o + c) / 2, w = (a + h) / 2, M = (s + l) / 2;
            x.push(new ll(_[7], b, w, M, c, h, l), new ll(_[6], o, w, M, b, h, l), new ll(_[5], b, a, M, c, w, l), new ll(_[4], o, a, M, b, w, l), new ll(_[3], b, w, s, c, h, M), new ll(_[2], o, w, s, b, h, M), new ll(_[1], b, a, s, c, w, M), new ll(_[0], o, a, s, b, w, M)), (p = (n >= M) << 2 | (e >= w) << 1 | t >= b) && (u = x[x.length - 1], x[x.length - 1] = x[x.length - 1 - p], x[x.length - 1 - p] = u)
        } else {
            var E = t - +this._x.call(null, _.data), T = e - +this._y.call(null, _.data),
                S = n - +this._z.call(null, _.data), A = E * E + T * T + S * S;
            if (A < i) {
                var L = Math.sqrt(i = A);
                d = t - L, f = e - L, m = n - L, g = t + L, v = e + L, y = n + L, r = _.data
            }
        }
        return r
    }, pl = function (t) {
        if (isNaN(o = +this._x.call(null, t)) || isNaN(a = +this._y.call(null, t)) || isNaN(s = +this._z.call(null, t)))return this;
        var e, n, i, r, o, a, s, c, h, l, u, p, d, f, m, g = this._root, v = this._x0, y = this._y0, x = this._z0,
            _ = this._x1, b = this._y1, w = this._z1;
        if (!g)return this;
        if (g.length)for (; ;) {
            if ((u = o >= (c = (v + _) / 2)) ? v = c : _ = c, (p = a >= (h = (y + b) / 2)) ? y = h : b = h, (d = s >= (l = (x + w) / 2)) ? x = l : w = l, e = g, !(g = g[f = d << 2 | p << 1 | u]))return this;
            if (!g.length)break;
            (e[f + 1 & 7] || e[f + 2 & 7] || e[f + 3 & 7] || e[f + 4 & 7] || e[f + 5 & 7] || e[f + 6 & 7] || e[f + 7 & 7]) && (n = e, m = f)
        }
        for (; g.data !== t;)if (i = g, !(g = g.next))return this;
        return (r = g.next) && delete g.next, i ? (r ? i.next = r : delete i.next, this) : e ? (r ? e[f] = r : delete e[f], (g = e[0] || e[1] || e[2] || e[3] || e[4] || e[5] || e[6] || e[7]) && g === (e[7] || e[6] || e[5] || e[4] || e[3] || e[2] || e[1] || e[0]) && !g.length && (n ? n[m] = g : this._root = g), this) : (this._root = r, this)
    }, dl = function () {
        return this._root
    }, fl = function () {
        var t = 0;
        return this.visit(function (e) {
            if (!e.length)do++t; while (e = e.next)
        }), t
    }, ml = function (t) {
        var e, n, i, r, o, a, s, c, h = [], l = this._root;
        for (l && h.push(new ll(l, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1)); e = h.pop();)if (!t(l = e.node, i = e.x0, r = e.y0, o = e.z0, a = e.x1, s = e.y1, c = e.z1) && l.length) {
            var u = (i + a) / 2, p = (r + s) / 2, d = (o + c) / 2;
            (n = l[7]) && h.push(new ll(n, u, p, d, a, s, c)), (n = l[6]) && h.push(new ll(n, i, p, d, u, s, c)), (n = l[5]) && h.push(new ll(n, u, r, d, a, p, c)), (n = l[4]) && h.push(new ll(n, i, r, d, u, p, c)), (n = l[3]) && h.push(new ll(n, u, p, o, a, s, d)), (n = l[2]) && h.push(new ll(n, i, p, o, u, s, d)), (n = l[1]) && h.push(new ll(n, u, r, o, a, p, d)), (n = l[0]) && h.push(new ll(n, i, r, o, u, p, d))
        }
        return this
    }, gl = function (t) {
        var e, n = [], i = [];
        for (this._root && n.push(new ll(this._root, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1)); e = n.pop();) {
            var r = e.node;
            if (r.length) {
                var o, a = e.x0, s = e.y0, c = e.z0, h = e.x1, l = e.y1, u = e.z1, p = (a + h) / 2, d = (s + l) / 2,
                    f = (c + u) / 2;
                (o = r[0]) && n.push(new ll(o, a, s, c, p, d, f)), (o = r[1]) && n.push(new ll(o, p, s, c, h, d, f)), (o = r[2]) && n.push(new ll(o, a, d, c, p, l, f)), (o = r[3]) && n.push(new ll(o, p, d, c, h, l, f)), (o = r[4]) && n.push(new ll(o, a, s, f, p, d, u)), (o = r[5]) && n.push(new ll(o, p, s, f, h, d, u)), (o = r[6]) && n.push(new ll(o, a, d, f, p, l, u)), (o = r[7]) && n.push(new ll(o, p, d, f, h, l, u))
            }
            i.push(e)
        }
        for (; e = i.pop();)t(e.node, e.x0, e.y0, e.z0, e.x1, e.y1, e.z1);
        return this
    }, vl = function (t) {
        return arguments.length ? (this._x = t, this) : this._x
    }, yl = function (t) {
        return arguments.length ? (this._y = t, this) : this._y
    }, xl = function (t) {
        return arguments.length ? (this._z = t, this) : this._z
    }, _l = fo.prototype = mo.prototype;
    _l.copy = function () {
        var t, e, n = new mo(this._x, this._y, this._z, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1),
            i = this._root;
        if (!i)return n;
        if (!i.length)return n._root = go(i), n;
        for (t = [{
            source: i,
            target: n._root = new Array(8)
        }]; i = t.pop();)for (var r = 0; r < 8; ++r)(e = i.source[r]) && (e.length ? t.push({
            source: e,
            target: i.target[r] = new Array(8)
        }) : i.target[r] = go(e));
        return n
    }, _l.add = al, _l.addAll = co, _l.cover = sl, _l.data = cl, _l.extent = hl, _l.find = ul, _l.remove = pl, _l.removeAll = ho, _l.root = dl, _l.size = fl, _l.visit = ml, _l.visitAfter = gl, _l.x = vl, _l.y = yl, _l.z = xl;
    vo.prototype = yo.prototype = {
        constructor: vo, has: function (t) {
            return "$" + t in this
        }, get: function (t) {
            return this["$" + t]
        }, set: function (t, e) {
            return this["$" + t] = e, this
        }, remove: function (t) {
            var e = "$" + t;
            return e in this && delete this[e]
        }, clear: function () {
            for (var t in this)"$" === t[0] && delete this[t]
        }, keys: function () {
            var t = [];
            for (var e in this)"$" === e[0] && t.push(e.slice(1));
            return t
        }, values: function () {
            var t = [];
            for (var e in this)"$" === e[0] && t.push(this[e]);
            return t
        }, entries: function () {
            var t = [];
            for (var e in this)"$" === e[0] && t.push({key: e.slice(1), value: this[e]});
            return t
        }, size: function () {
            var t = 0;
            for (var e in this)"$" === e[0] && ++t;
            return t
        }, empty: function () {
            for (var t in this)if ("$" === t[0])return !1;
            return !0
        }, each: function (t) {
            for (var e in this)"$" === e[0] && t(this[e], e.slice(1), this)
        }
    };
    var bl = yo.prototype;
    xo.prototype = _o.prototype = {
        constructor: xo, has: bl.has, add: function (t) {
            return t += "", this["$" + t] = t, this
        }, remove: bl.remove, clear: bl.clear, values: bl.keys, size: bl.size, empty: bl.empty, each: bl.each
    };
    var wl = function (t) {
        function e(t) {
            return 1 / Math.min(l[t.source.index], l[t.target.index])
        }

        function n(e) {
            for (var n = 0, i = t.length; n < m; ++n)for (var r, o, c, l, p, d = 0, f = 0, g = 0, v = 0; d < i; ++d)r = t[d], o = r.source, c = r.target, f = c.x + c.vx - o.x - o.vx || Nh(), h > 1 && (g = c.y + c.vy - o.y - o.vy || Nh()), h > 2 && (v = c.z + c.vz - o.z - o.vz || Nh()), l = Math.sqrt(f * f + g * g + v * v), l = (l - s[d]) / l * e * a[d], f *= l, g *= l, v *= l, c.vx -= f * (p = u[d]), h > 1 && (c.vy -= g * p), h > 2 && (c.vz -= v * p), o.vx += f * (p = 1 - p), h > 1 && (o.vy += g * p), h > 2 && (o.vz += v * p)
        }

        function i() {
            if (c) {
                var e, n, i = c.length, h = t.length, d = yo(c, p);
                for (e = 0, l = new Array(i); e < h; ++e)n = t[e], n.index = e, "object" != typeof n.source && (n.source = wo(d, n.source)), "object" != typeof n.target && (n.target = wo(d, n.target)), l[n.source.index] = (l[n.source.index] || 0) + 1, l[n.target.index] = (l[n.target.index] || 0) + 1;
                for (e = 0, u = new Array(h); e < h; ++e)n = t[e], u[e] = l[n.source.index] / (l[n.source.index] + l[n.target.index]);
                a = new Array(h), r(), s = new Array(h), o()
            }
        }

        function r() {
            if (c)for (var e = 0, n = t.length; e < n; ++e)a[e] = +d(t[e], e, t)
        }

        function o() {
            if (c)for (var e = 0, n = t.length; e < n; ++e)s[e] = +f(t[e], e, t)
        }

        var a, s, c, h, l, u, p = bo, d = e, f = Ch(30), m = 1;
        return null == t && (t = []), n.initialize = function (t, e) {
            c = t, h = e, i()
        }, n.links = function (e) {
            return arguments.length ? (t = e, i(), n) : t
        }, n.id = function (t) {
            return arguments.length ? (p = t, n) : p
        }, n.iterations = function (t) {
            return arguments.length ? (m = +t, n) : m
        }, n.strength = function (t) {
            return arguments.length ? (d = "function" == typeof t ? t : Ch(+t), r(), n) : d
        }, n.distance = function (t) {
            return arguments.length ? (f = "function" == typeof t ? t : Ch(+t), o(), n) : f
        }, n
    }, Ml = {
        value: function () {
        }
    };
    Eo.prototype = Mo.prototype = {
        constructor: Eo, on: function (t, e) {
            var n, i = this._, r = To(t + "", i), o = -1, a = r.length;
            if (!(arguments.length < 2)) {
                if (null != e && "function" != typeof e)throw new Error("invalid callback: " + e);
                for (; ++o < a;)if (n = (t = r[o]).type) i[n] = Ao(i[n], t.name, e); else if (null == e)for (n in i)i[n] = Ao(i[n], t.name, null);
                return this
            }
            for (; ++o < a;)if ((n = (t = r[o]).type) && (n = So(i[n], t.name)))return n
        }, copy: function () {
            var t = {}, e = this._;
            for (var n in e)t[n] = e[n].slice();
            return new Eo(t)
        }, call: function (t, e) {
            if ((n = arguments.length - 2) > 0)for (var n, i, r = new Array(n), o = 0; o < n; ++o)r[o] = arguments[o + 2];
            if (!this._.hasOwnProperty(t))throw new Error("unknown type: " + t);
            for (i = this._[t], o = 0, n = i.length; o < n; ++o)i[o].value.apply(e, r)
        }, apply: function (t, e, n) {
            if (!this._.hasOwnProperty(t))throw new Error("unknown type: " + t);
            for (var i = this._[t], r = 0, o = i.length; r < o; ++r)i[r].value.apply(e, n)
        }
    };
    var El, Tl, Sl = 0, Al = 0, Ll = 0, Rl = 1e3, Pl = 0, Cl = 0, Nl = 0,
        Il = "object" == typeof performance && performance.now ? performance : Date,
        Ul = "function" == typeof requestAnimationFrame ? requestAnimationFrame : function (t) {
            setTimeout(t, 17)
        };
    Po.prototype = Co.prototype = {
        constructor: Po, restart: function (t, e, n) {
            if ("function" != typeof t)throw new TypeError("callback is not a function");
            n = (null == n ? Lo() : +n) + (null == e ? 0 : +e), this._next || Tl === this || (Tl ? Tl._next = this : El = this, Tl = this), this._call = t, this._time = n, Oo()
        }, stop: function () {
            this._call && (this._call = null, this._time = 1 / 0, Oo())
        }
    };
    var Dl = 10, Ol = Math.PI * (3 - Math.sqrt(5)), zl = Math.PI / 24, Bl = function (t, e) {
        function n() {
            i(), m.call("tick", a), c < h && (f.stop(), m.call("end", a))
        }

        function i() {
            var e, n, i = t.length;
            for (c += (u - c) * l, d.each(function (t) {
                t(c)
            }), e = 0; e < i; ++e)n = t[e], null == n.fx ? n.x += n.vx *= p : (n.x = n.fx, n.vx = 0), s > 1 && (null == n.fy ? n.y += n.vy *= p : (n.y = n.fy, n.vy = 0)), s > 2 && (null == n.fz ? n.z += n.vz *= p : (n.z = n.fz, n.vz = 0))
        }

        function r() {
            for (var e, n = 0, i = t.length; n < i; ++n) {
                if (e = t[n], e.index = n, isNaN(e.x) || s > 1 && isNaN(e.y) || s > 2 && isNaN(e.z)) {
                    var r = Dl * (s > 2 ? Math.cbrt(n) : s > 1 ? Math.sqrt(n) : n), o = n * Ol, a = n * zl;
                    e.x = r * (s > 1 ? Math.cos(o) : 1), s > 1 && (e.y = r * Math.sin(o)), s > 2 && (e.z = r * Math.sin(a))
                }
                (isNaN(e.vx) || s > 1 && isNaN(e.vy) || s > 2 && isNaN(e.vz)) && (e.vx = 0, s > 1 && (e.vy = 0), s > 2 && (e.vz = 0))
            }
        }

        function o(e) {
            return e.initialize && e.initialize(t, s), e
        }

        e = e || 2;
        var a, s = Math.min(3, Math.max(1, Math.round(e))), c = 1, h = .001, l = 1 - Math.pow(h, 1 / 300), u = 0,
            p = .6, d = yo(), f = Co(n), m = Mo();
        return null == t && (t = []), r(), a = {
            tick: i, restart: function () {
                return f.restart(n), a
            }, stop: function () {
                return f.stop(), a
            }, numDimensions: function (t) {
                return arguments.length ? (s = Math.min(3, Math.max(1, Math.round(t))), d.each(o), a) : s
            }, nodes: function (e) {
                return arguments.length ? (t = e, r(), d.each(o), a) : t
            }, alpha: function (t) {
                return arguments.length ? (c = +t, a) : c
            }, alphaMin: function (t) {
                return arguments.length ? (h = +t, a) : h
            }, alphaDecay: function (t) {
                return arguments.length ? (l = +t, a) : +l
            }, alphaTarget: function (t) {
                return arguments.length ? (u = +t, a) : u
            }, velocityDecay: function (t) {
                return arguments.length ? (p = 1 - t, a) : 1 - p
            }, force: function (t, e) {
                return arguments.length > 1 ? (null == e ? d.remove(t) : d.set(t, o(e)), a) : d.get(t)
            }, find: function () {
                var e, n, i, r, o, a, c = Array.prototype.slice.call(arguments), h = c.shift() || 0,
                    l = (s > 1 ? c.shift() : null) || 0, u = (s > 2 ? c.shift() : null) || 0, p = c.shift() || 1 / 0,
                    d = 0, f = t.length;
                for (p *= p, d = 0; d < f; ++d)o = t[d], e = h - o.x, n = l - (o.y || 0), i = u - (o.z || 0), (r = e * e + n * n + i * i) < p && (a = o, p = r);
                return a
            }, on: function (t, e) {
                return arguments.length > 1 ? (m.on(t, e), a) : m.on(t)
            }
        }
    }, Fl = function () {
        function t(t) {
            var e, c = r.length,
                h = (1 === o ? Jr(r, zo) : 2 === o ? ro(r, zo, Bo) : 3 === o ? fo(r, zo, Bo, Fo) : null).visitAfter(n);
            for (s = t, e = 0; e < c; ++e)a = r[e], h.visit(i)
        }

        function e() {
            if (r) {
                var t, e, n = r.length;
                for (c = new Array(n), t = 0; t < n; ++t)e = r[t], c[e.index] = +h(e, t, r)
            }
        }

        function n(t) {
            var e, n, i, r, a, s, h = 0;
            if (t.length) {
                for (i = r = a = s = 0; s < 4; ++s)(e = t[s]) && (n = e.value) && (h += n, i += n * (e.x || 0), r += n * (e.y || 0), a += n * (e.z || 0));
                t.x = i / h, o > 1 && (t.y = r / h), o > 2 && (t.z = a / h)
            } else {
                e = t, e.x = e.data.x, o > 1 && (e.y = e.data.y), o > 2 && (e.z = e.data.z);
                do h += c[e.data.index]; while (e = e.next)
            }
            t.value = h
        }

        function i(t, e, n, i, r) {
            if (!t.value)return !0;
            var h = [n, i, r][o - 1], d = t.x - a.x, f = o > 1 ? t.y - a.y : 0, m = o > 2 ? t.z - a.z : 0, g = h - e,
                v = d * d + f * f + m * m;
            if (g * g / p < v)return v < u && (0 === d && (d = Nh(), v += d * d), o > 1 && 0 === f && (f = Nh(), v += f * f), o > 2 && 0 === m && (m = Nh(), v += m * m), v < l && (v = Math.sqrt(l * v)), a.vx += d * t.value * s / v, o > 1 && (a.vy += f * t.value * s / v), o > 2 && (a.vz += m * t.value * s / v)), !0;
            if (!(t.length || v >= u)) {
                (t.data !== a || t.next) && (0 === d && (d = Nh(), v += d * d), o > 1 && 0 === f && (f = Nh(), v += f * f), o > 2 && 0 === m && (m = Nh(), v += m * m), v < l && (v = Math.sqrt(l * v)));
                do t.data !== a && (g = c[t.data.index] * s / v, a.vx += d * g, o > 1 && (a.vy += f * g), o > 2 && (a.vz += m * g)); while (t = t.next)
            }
        }

        var r, o, a, s, c, h = Ch(-30), l = 1, u = 1 / 0, p = .81;
        return t.initialize = function (t, n) {
            r = t, o = n, e()
        }, t.strength = function (n) {
            return arguments.length ? (h = "function" == typeof n ? n : Ch(+n), e(), t) : h
        }, t.distanceMin = function (e) {
            return arguments.length ? (l = e * e, t) : Math.sqrt(l)
        }, t.distanceMax = function (e) {
            return arguments.length ? (u = e * e, t) : Math.sqrt(u)
        }, t.theta = function (e) {
            return arguments.length ? (p = e * e, t) : Math.sqrt(p)
        }, t
    }, Gl = function (t) {
        ko(t);
        var e = Go(t);
        return t.on = e.on, t.off = e.off, t.fire = e.fire, t
    }, kl = Ho, Hl = Gl, Vl = function (t) {
        Jo(t);
        var e = Zo(t);
        return t.on = e.on, t.off = e.off, t.fire = e.fire, t
    }, jl = Qo, Wl = Ko, ql = ta, Xl = {random: ea, randomIterator: na}, Yl = function () {
        this.body = null, this.quad0 = null, this.quad1 = null, this.quad2 = null, this.quad3 = null, this.mass = 0, this.massX = 0, this.massY = 0, this.left = 0, this.top = 0, this.bottom = 0, this.right = 0
    }, Zl = ia;
    ia.prototype = {
        isEmpty: function () {
            return 0 === this.popIdx
        }, push: function (t, e) {
            var n = this.stack[this.popIdx];
            n ? (n.node = t, n.body = e) : this.stack[this.popIdx] = new ra(t, e), ++this.popIdx
        }, pop: function () {
            if (this.popIdx > 0)return this.stack[--this.popIdx]
        }, reset: function () {
            this.popIdx = 0
        }
    };
    var Jl = function (t, e) {
        var n = Math.abs(t.x - e.x), i = Math.abs(t.y - e.y);
        return n < 1e-8 && i < 1e-8
    }, Ql = function (t) {
        function e() {
            var t = d[f];
            return t ? (t.quad0 = null, t.quad1 = null, t.quad2 = null, t.quad3 = null, t.body = null, t.mass = t.massX = t.massY = 0, t.left = t.right = t.top = t.bottom = 0) : (t = new a, d[f] = t), ++f, t
        }

        function n(t) {
            var e, n, i, r, a = l, s = 0, c = 0, u = 1, d = 0, f = 1;
            for (a[0] = m; u;) {
                var g = a[d], v = g.body;
                u -= 1, d += 1;
                var y = v !== t;
                v && y ? (n = v.pos.x - t.pos.x, i = v.pos.y - t.pos.y, r = Math.sqrt(n * n + i * i), 0 === r && (n = (o.nextDouble() - .5) / 50, i = (o.nextDouble() - .5) / 50, r = Math.sqrt(n * n + i * i)), e = h * v.mass * t.mass / (r * r * r), s += e * n, c += e * i) : y && (n = g.massX / g.mass - t.pos.x, i = g.massY / g.mass - t.pos.y, r = Math.sqrt(n * n + i * i), 0 === r && (n = (o.nextDouble() - .5) / 50, i = (o.nextDouble() - .5) / 50, r = Math.sqrt(n * n + i * i)), (g.right - g.left) / r < p ? (e = h * g.mass * t.mass / (r * r * r), s += e * n, c += e * i) : (g.quad0 && (a[f] = g.quad0, u += 1, f += 1), g.quad1 && (a[f] = g.quad1, u += 1, f += 1), g.quad2 && (a[f] = g.quad2, u += 1, f += 1), g.quad3 && (a[f] = g.quad3, u += 1, f += 1)))
            }
            t.force.x += s, t.force.y += c
        }

        function i(t) {
            var n, i = Number.MAX_VALUE, o = Number.MAX_VALUE, a = Number.MIN_VALUE, s = Number.MIN_VALUE, c = t.length;
            for (n = c; n--;) {
                var h = t[n].pos.x, l = t[n].pos.y;
                h < i && (i = h), h > a && (a = h), l < o && (o = l), l > s && (s = l)
            }
            var u = a - i, p = s - o;
            for (u > p ? s = o + u : a = i + p, f = 0, m = e(), m.left = i, m.right = a, m.top = o, m.bottom = s, n = c - 1, n >= 0 && (m.body = t[n]); n--;)r(t[n])
        }

        function r(t) {
            for (u.reset(), u.push(m, t); !u.isEmpty();) {
                var n = u.pop(), i = n.node, r = n.body;
                if (i.body) {
                    var a = i.body;
                    if (i.body = null, c(a.pos, r.pos)) {
                        var s = 3;
                        do {
                            var h = o.nextDouble(), l = (i.right - i.left) * h, p = (i.bottom - i.top) * h;
                            a.pos.x = i.left + l, a.pos.y = i.top + p, s -= 1
                        } while (s > 0 && c(a.pos, r.pos))
                        if (0 === s && c(a.pos, r.pos))return
                    }
                    u.push(i, a), u.push(i, r)
                } else {
                    var d = r.pos.x, f = r.pos.y;
                    i.mass = i.mass + r.mass, i.massX = i.massX + r.mass * d, i.massY = i.massY + r.mass * f;
                    var g = 0, v = i.left, y = (i.right + v) / 2, x = i.top, _ = (i.bottom + x) / 2;
                    d > y && (g += 1, v = y, y = i.right), f > _ && (g += 2, x = _, _ = i.bottom);
                    var b = oa(i, g);
                    b ? u.push(b, r) : (b = e(), b.left = v, b.top = x, b.right = y, b.bottom = _, b.body = r, aa(i, g, b))
                }
            }
        }

        t = t || {}, t.gravity = "number" == typeof t.gravity ? t.gravity : -1, t.theta = "number" == typeof t.theta ? t.theta : .8;
        var o = Xl.random(1984), a = Yl, s = Zl, c = Jl, h = t.gravity, l = [], u = new s, p = t.theta, d = [], f = 0,
            m = e();
        return {
            insertBodies: i, getRoot: function () {
                return m
            }, updateBodyForce: n, options: function (t) {
                return t ? ("number" == typeof t.gravity && (h = t.gravity), "number" == typeof t.theta && (p = t.theta), this) : {
                    gravity: h,
                    theta: p
                }
            }
        }
    }, Kl = function (t, e) {
        function n() {
            var e = t.length;
            if (0 !== e) {
                for (var n = Number.MAX_VALUE, i = Number.MAX_VALUE, o = Number.MIN_VALUE, a = Number.MIN_VALUE; e--;) {
                    var s = t[e];
                    s.isPinned ? (s.pos.x = s.prevPos.x, s.pos.y = s.prevPos.y) : (s.prevPos.x = s.pos.x, s.prevPos.y = s.pos.y), s.pos.x < n && (n = s.pos.x), s.pos.x > o && (o = s.pos.x), s.pos.y < i && (i = s.pos.y), s.pos.y > a && (a = s.pos.y)
                }
                r.x1 = n, r.x2 = o, r.y1 = i, r.y2 = a
            }
        }

        var i = Xl.random(42), r = {x1: 0, y1: 0, x2: 0, y2: 0};
        return {
            box: r, update: n, reset: function () {
                r.x1 = r.y1 = 0, r.x2 = r.y2 = 0
            }, getBestNewPosition: function (t) {
                var n = r, o = 0, a = 0;
                if (t.length) {
                    for (var s = 0; s < t.length; ++s)o += t[s].pos.x, a += t[s].pos.y;
                    o /= t.length, a /= t.length
                } else o = (n.x1 + n.x2) / 2, a = (n.y1 + n.y2) / 2;
                var c = e.springLength;
                return {x: o + i.next(c) - c / 2, y: a + i.next(c) - c / 2}
            }
        }
    }, $l = function (t) {
        var e = ql, n = Wl;
        t = e(t, {dragCoeff: .02});
        var i = {
            update: function (e) {
                e.force.x -= t.dragCoeff * e.velocity.x, e.force.y -= t.dragCoeff * e.velocity.y
            }
        };
        return n(t, i, ["dragCoeff"]), i
    }, tu = function (t) {
        var e = ql, n = Xl.random(42), i = Wl;
        t = e(t, {springCoeff: 2e-4, springLength: 80});
        var r = {
            update: function (e) {
                var i = e.from, r = e.to, o = e.length < 0 ? t.springLength : e.length, a = r.pos.x - i.pos.x,
                    s = r.pos.y - i.pos.y, c = Math.sqrt(a * a + s * s);
                0 === c && (a = (n.nextDouble() - .5) / 50, s = (n.nextDouble() - .5) / 50, c = Math.sqrt(a * a + s * s));
                var h = c - o, l = (!e.coeff || e.coeff < 0 ? t.springCoeff : e.coeff) * h / c * e.weight;
                i.force.x += l * a, i.force.y += l * s, r.force.x -= l * a, r.force.y -= l * s
            }
        };
        return i(t, r, ["springCoeff", "springLength"]), r
    }, eu = sa, nu = {Body: ca, Vector2d: ha, Body3d: la, Vector3d: ua};
    ca.prototype.setPosition = function (t, e) {
        this.prevPos.x = this.pos.x = t, this.prevPos.y = this.pos.y = e
    }, ha.prototype.reset = function () {
        this.x = this.y = 0
    }, la.prototype.setPosition = function (t, e, n) {
        this.prevPos.x = this.pos.x = t, this.prevPos.y = this.pos.y = e, this.prevPos.z = this.pos.z = n
    }, ua.prototype.reset = function () {
        this.x = this.y = this.z = 0
    };
    var iu = nu, ru = function (t) {
        return new iu.Body(t)
    }, ou = pa, au = da, su = ou, cu = Vl;
    au.simulator = su;
    var hu = function (t) {
        ga(t);
        var e = ma(t);
        return t.on = e.on, t.off = e.off, t.fire = e.fire, t
    }, lu = va, uu = ya, pu = _a, du = {random: ba, randomIterator: wa}, fu = function () {
        this.body = null, this.quad0 = null, this.quad1 = null, this.quad2 = null, this.quad3 = null, this.mass = 0, this.massX = 0, this.massY = 0, this.left = 0, this.top = 0, this.bottom = 0, this.right = 0
    }, mu = Ma;
    Ma.prototype = {
        isEmpty: function () {
            return 0 === this.popIdx
        }, push: function (t, e) {
            var n = this.stack[this.popIdx];
            n ? (n.node = t, n.body = e) : this.stack[this.popIdx] = new Ea(t, e), ++this.popIdx
        }, pop: function () {
            if (this.popIdx > 0)return this.stack[--this.popIdx]
        }, reset: function () {
            this.popIdx = 0
        }
    };
    var gu = function (t, e) {
        var n = Math.abs(t.x - e.x), i = Math.abs(t.y - e.y);
        return n < 1e-8 && i < 1e-8
    }, vu = function (t) {
        t = t || {}, t.gravity = "number" == typeof t.gravity ? t.gravity : -1, t.theta = "number" == typeof t.theta ? t.theta : .8;
        var e = du.random(1984), n = fu, i = mu, r = gu, o = t.gravity, a = [], s = new i, c = t.theta, h = [], l = 0,
            u = function () {
                var t = h[l];
                return t ? (t.quad0 = null, t.quad1 = null, t.quad2 = null, t.quad3 = null, t.body = null, t.mass = t.massX = t.massY = 0, t.left = t.right = t.top = t.bottom = 0) : (t = new n, h[l] = t), ++l, t
            }, p = u(), d = function (t) {
                for (s.reset(), s.push(p, t); !s.isEmpty();) {
                    var n = s.pop(), i = n.node, o = n.body;
                    if (i.body) {
                        var a = i.body;
                        if (i.body = null, r(a.pos, o.pos)) {
                            var c = 3;
                            do {
                                var h = e.nextDouble(), l = (i.right - i.left) * h, d = (i.bottom - i.top) * h;
                                a.pos.x = i.left + l, a.pos.y = i.top + d, c -= 1
                            } while (c > 0 && r(a.pos, o.pos))
                            if (0 === c && r(a.pos, o.pos))return
                        }
                        s.push(i, a), s.push(i, o)
                    } else {
                        var f = o.pos.x, m = o.pos.y;
                        i.mass = i.mass + o.mass, i.massX = i.massX + o.mass * f, i.massY = i.massY + o.mass * m;
                        var g = 0, v = i.left, y = (i.right + v) / 2, x = i.top, _ = (i.bottom + x) / 2;
                        if (f > y) {
                            g += 1;
                            var b = v;
                            v = y, y += y - b
                        }
                        if (m > _) {
                            g += 2;
                            var w = x;
                            x = _, _ += _ - w
                        }
                        var M = Ta(i, g);
                        M ? s.push(M, o) : (M = u(), M.left = v, M.top = x, M.right = y, M.bottom = _, M.body = o, Sa(i, g, M))
                    }
                }
            }, f = function (t) {
                var n, i, r, s, h = a, l = 0, u = 0, d = 1, f = 0, m = 1;
                for (h[0] = p; d;) {
                    var g = h[f], v = g.body;
                    d -= 1, f += 1;
                    var y = v !== t;
                    v && y ? (i = v.pos.x - t.pos.x, r = v.pos.y - t.pos.y, s = Math.sqrt(i * i + r * r), 0 === s && (i = (e.nextDouble() - .5) / 50, r = (e.nextDouble() - .5) / 50, s = Math.sqrt(i * i + r * r)), n = o * v.mass * t.mass / (s * s * s), l += n * i, u += n * r) : y && (i = g.massX / g.mass - t.pos.x, r = g.massY / g.mass - t.pos.y, s = Math.sqrt(i * i + r * r), 0 === s && (i = (e.nextDouble() - .5) / 50, r = (e.nextDouble() - .5) / 50, s = Math.sqrt(i * i + r * r)), (g.right - g.left) / s < c ? (n = o * g.mass * t.mass / (s * s * s), l += n * i, u += n * r) : (g.quad0 && (h[m] = g.quad0, d += 1, m += 1), g.quad1 && (h[m] = g.quad1, d += 1, m += 1), g.quad2 && (h[m] = g.quad2, d += 1, m += 1), g.quad3 && (h[m] = g.quad3, d += 1, m += 1)))
                }
                t.force.x += l, t.force.y += u
            };
        return {
            insertBodies: function (t) {
                var e, n = Number.MAX_VALUE, i = Number.MAX_VALUE, r = Number.MIN_VALUE, o = Number.MIN_VALUE,
                    a = t.length;
                for (e = a; e--;) {
                    var s = t[e].pos.x, c = t[e].pos.y;
                    s < n && (n = s), s > r && (r = s), c < i && (i = c), c > o && (o = c)
                }
                var h = r - n, f = o - i;
                for (h > f ? o = i + h : r = n + f, l = 0, p = u(), p.left = n, p.right = r, p.top = i, p.bottom = o, e = a - 1, e > 0 && (p.body = t[e]); e--;)d(t[e])
            }, updateBodyForce: f, options: function (t) {
                return t ? ("number" == typeof t.gravity && (o = t.gravity), "number" == typeof t.theta && (c = t.theta), this) : {
                    gravity: o,
                    theta: c
                }
            }
        }
    }, yu = function (t, e) {
        function n() {
            var e = t.length;
            if (0 !== e) {
                for (var n = Number.MAX_VALUE, i = Number.MAX_VALUE, o = Number.MIN_VALUE, a = Number.MIN_VALUE; e--;) {
                    var s = t[e];
                    s.isPinned ? (s.pos.x = s.prevPos.x, s.pos.y = s.prevPos.y) : (s.prevPos.x = s.pos.x, s.prevPos.y = s.pos.y), s.pos.x < n && (n = s.pos.x), s.pos.x > o && (o = s.pos.x), s.pos.y < i && (i = s.pos.y), s.pos.y > a && (a = s.pos.y)
                }
                r.x1 = n, r.x2 = o, r.y1 = i, r.y2 = a
            }
        }

        var i = du.random(42), r = {x1: 0, y1: 0, x2: 0, y2: 0};
        return {
            box: r, update: n, reset: function () {
                r.x1 = r.y1 = 0, r.x2 = r.y2 = 0
            }, getBestNewPosition: function (t) {
                var n = r, o = 0, a = 0;
                if (t.length) {
                    for (var s = 0; s < t.length; ++s)o += t[s].pos.x, a += t[s].pos.y;
                    o /= t.length, a /= t.length
                } else o = (n.x1 + n.x2) / 2, a = (n.y1 + n.y2) / 2;
                var c = e.springLength;
                return {x: o + i.next(c) - c / 2, y: a + i.next(c) - c / 2}
            }
        }
    }, xu = function (t) {
        var e = pu, n = uu;
        t = e(t, {dragCoeff: .02});
        var i = {
            update: function (e) {
                e.force.x -= t.dragCoeff * e.velocity.x, e.force.y -= t.dragCoeff * e.velocity.y
            }
        };
        return n(t, i, ["dragCoeff"]), i
    }, _u = function (t) {
        var e = pu, n = du.random(42), i = uu;
        t = e(t, {springCoeff: 2e-4, springLength: 80});
        var r = {
            update: function (e) {
                var i = e.from, r = e.to, o = e.length < 0 ? t.springLength : e.length, a = r.pos.x - i.pos.x,
                    s = r.pos.y - i.pos.y, c = Math.sqrt(a * a + s * s);
                0 === c && (a = (n.nextDouble() - .5) / 50, s = (n.nextDouble() - .5) / 50, c = Math.sqrt(a * a + s * s));
                var h = c - o, l = (!e.coeff || e.coeff < 0 ? t.springCoeff : e.coeff) * h / c * e.weight;
                i.force.x += l * a, i.force.y += l * s, r.force.x -= l * a, r.force.y -= l * s
            }
        };
        return i(t, r, ["springCoeff", "springLength"]), r
    }, bu = Aa, wu = {Body: La, Vector2d: Ra, Body3d: Pa, Vector3d: Ca};
    La.prototype.setPosition = function (t, e) {
        this.prevPos.x = this.pos.x = t, this.prevPos.y = this.pos.y = e
    }, Ra.prototype.reset = function () {
        this.x = this.y = 0
    }, Pa.prototype.setPosition = function (t, e, n) {
        this.prevPos.x = this.pos.x = t, this.prevPos.y = this.pos.y = e, this.prevPos.z = this.pos.z = n
    }, Ca.prototype.reset = function () {
        this.x = this.y = this.z = 0
    };
    var Mu = wu, Eu = function (t) {
        return new Mu.Body(t)
    }, Tu = Na, Su = Ia, Au = Tu, Lu = hu;
    Su.simulator = Au;
    var Ru = function () {
        this.body = null, this.quad0 = null, this.quad1 = null, this.quad2 = null, this.quad3 = null, this.quad4 = null, this.quad5 = null, this.quad6 = null, this.quad7 = null, this.mass = 0, this.massX = 0, this.massY = 0, this.massZ = 0, this.left = 0, this.top = 0, this.bottom = 0, this.right = 0, this.front = 0, this.back = 0
    }, Pu = Da;
    Da.prototype = {
        isEmpty: function () {
            return 0 === this.popIdx
        }, push: function (t, e) {
            var n = this.stack[this.popIdx];
            n ? (n.node = t, n.body = e) : this.stack[this.popIdx] = new Oa(t, e), ++this.popIdx
        }, pop: function () {
            if (this.popIdx > 0)return this.stack[--this.popIdx]
        }, reset: function () {
            this.popIdx = 0
        }
    };
    var Cu = function (t, e) {
        var n = Math.abs(t.x - e.x), i = Math.abs(t.y - e.y), r = Math.abs(t.z - e.z);
        return n < 1e-8 && i < 1e-8 && r < 1e-8
    }, Nu = function (t) {
        t = t || {}, t.gravity = "number" == typeof t.gravity ? t.gravity : -1, t.theta = "number" == typeof t.theta ? t.theta : .8;
        var e = du.random(1984), n = Ru, i = Pu, r = Cu, o = t.gravity, a = [], s = new i, c = t.theta, h = [], l = 0,
            u = function () {
                var t = h[l];
                return t ? (t.quad0 = null, t.quad4 = null, t.quad1 = null, t.quad5 = null, t.quad2 = null, t.quad6 = null, t.quad3 = null, t.quad7 = null, t.body = null, t.mass = t.massX = t.massY = t.massZ = 0, t.left = t.right = t.top = t.bottom = t.front = t.back = 0) : (t = new n, h[l] = t), ++l, t
            }, p = u(), d = function (t) {
                for (s.reset(), s.push(p, t); !s.isEmpty();) {
                    var n = s.pop(), i = n.node, o = n.body;
                    if (i.body) {
                        var a = i.body;
                        if (i.body = null, r(a.pos, o.pos)) {
                            var c = 3;
                            do {
                                var h = e.nextDouble(), l = (i.right - i.left) * h, d = (i.bottom - i.top) * h,
                                    f = (i.front - i.back) * h;
                                a.pos.x = i.left + l, a.pos.y = i.top + d, a.pos.z = i.back + f, c -= 1
                            } while (c > 0 && r(a.pos, o.pos))
                            if (0 === c && r(a.pos, o.pos))return
                        }
                        s.push(i, a), s.push(i, o)
                    } else {
                        var m = o.pos.x, g = o.pos.y, v = o.pos.z;
                        i.mass += o.mass, i.massX += o.mass * m, i.massY += o.mass * g, i.massZ += o.mass * v;
                        var y = 0, x = i.left, _ = (i.right + x) / 2, b = i.top, w = (i.bottom + b) / 2, M = i.back,
                            E = (i.front + M) / 2;
                        if (m > _) {
                            y += 1;
                            var T = x;
                            x = _, _ += _ - T
                        }
                        if (g > w) {
                            y += 2;
                            var S = b;
                            b = w, w += w - S
                        }
                        if (v > E) {
                            y += 4;
                            var A = M;
                            M = E, E = M + (M - A)
                        }
                        var L = za(i, y);
                        L ? s.push(L, o) : (L = u(), L.left = x, L.top = b, L.right = _, L.bottom = w, L.back = M, L.front = E, L.body = o, Ba(i, y, L))
                    }
                }
            }, f = function (t) {
                var n, i, r, s, h, l = a, u = 0, d = 0, f = 0, m = 1, g = 0, v = 1;
                for (l[0] = p; m;) {
                    var y = l[g], x = y.body;
                    m -= 1, g += 1;
                    var _ = x !== t;
                    x && _ ? (i = x.pos.x - t.pos.x, r = x.pos.y - t.pos.y, s = x.pos.z - t.pos.z, h = Math.sqrt(i * i + r * r + s * s), 0 === h && (i = (e.nextDouble() - .5) / 50, r = (e.nextDouble() - .5) / 50, s = (e.nextDouble() - .5) / 50, h = Math.sqrt(i * i + r * r + s * s)), n = o * x.mass * t.mass / (h * h * h), u += n * i, d += n * r, f += n * s) : _ && (i = y.massX / y.mass - t.pos.x, r = y.massY / y.mass - t.pos.y, s = y.massZ / y.mass - t.pos.z, h = Math.sqrt(i * i + r * r + s * s), 0 === h && (i = (e.nextDouble() - .5) / 50, r = (e.nextDouble() - .5) / 50, s = (e.nextDouble() - .5) / 50, h = Math.sqrt(i * i + r * r + s * s)), (y.right - y.left) / h < c ? (n = o * y.mass * t.mass / (h * h * h), u += n * i, d += n * r, f += n * s) : (y.quad0 && (l[v] = y.quad0, m += 1, v += 1), y.quad1 && (l[v] = y.quad1, m += 1, v += 1), y.quad2 && (l[v] = y.quad2, m += 1, v += 1), y.quad3 && (l[v] = y.quad3, m += 1, v += 1), y.quad4 && (l[v] = y.quad4, m += 1, v += 1), y.quad5 && (l[v] = y.quad5, m += 1, v += 1), y.quad6 && (l[v] = y.quad6, m += 1, v += 1), y.quad7 && (l[v] = y.quad7, m += 1, v += 1)))
                }
                t.force.x += u, t.force.y += d, t.force.z += f
            };
        return {
            insertBodies: function (t) {
                var e, n = Number.MAX_VALUE, i = Number.MAX_VALUE, r = Number.MAX_VALUE, o = Number.MIN_VALUE,
                    a = Number.MIN_VALUE, s = Number.MIN_VALUE, c = t.length;
                for (e = c; e--;) {
                    var h = t[e].pos, f = h.x, m = h.y, g = h.z;
                    f < n && (n = f), f > o && (o = f), m < i && (i = m), m > a && (a = m), g < r && (r = g), g > s && (s = g)
                }
                var v = Math.max(o - n, Math.max(a - i, s - r));
                for (o = n + v, a = i + v, s = r + v, l = 0, p = u(), p.left = n, p.right = o, p.top = i, p.bottom = a, p.back = r, p.front = s, e = c - 1, e > 0 && (p.body = t[e]); e--;)d(t[e])
            }, updateBodyForce: f, options: function (t) {
                return t ? ("number" == typeof t.gravity && (o = t.gravity), "number" == typeof t.theta && (c = t.theta), this) : {
                    gravity: o,
                    theta: c
                }
            }
        }
    }, Iu = function (t, e) {
        function n() {
            var e = t.length;
            if (0 !== e) {
                for (var n = Number.MAX_VALUE, i = Number.MAX_VALUE, o = Number.MAX_VALUE, a = Number.MIN_VALUE, s = Number.MIN_VALUE, c = Number.MIN_VALUE; e--;) {
                    var h = t[e];
                    h.isPinned ? (h.pos.x = h.prevPos.x, h.pos.y = h.prevPos.y, h.pos.z = h.prevPos.z) : (h.prevPos.x = h.pos.x, h.prevPos.y = h.pos.y, h.prevPos.z = h.pos.z), h.pos.x < n && (n = h.pos.x), h.pos.x > a && (a = h.pos.x), h.pos.y < i && (i = h.pos.y), h.pos.y > s && (s = h.pos.y), h.pos.z < o && (o = h.pos.z), h.pos.z > c && (c = h.pos.z)
                }
                r.x1 = n, r.x2 = a, r.y1 = i, r.y2 = s, r.z1 = o, r.z2 = c
            }
        }

        var i = du.random(42), r = {x1: 0, y1: 0, z1: 0, x2: 0, y2: 0, z2: 0};
        return {
            box: r, update: n, reset: function () {
                r.x1 = r.y1 = 0, r.x2 = r.y2 = 0, r.z1 = r.z2 = 0
            }, getBestNewPosition: function (t) {
                var n = r, o = 0, a = 0, s = 0;
                if (t.length) {
                    for (var c = 0; c < t.length; ++c)o += t[c].pos.x, a += t[c].pos.y, s += t[c].pos.z;
                    o /= t.length, a /= t.length, s /= t.length
                } else o = (n.x1 + n.x2) / 2, a = (n.y1 + n.y2) / 2, s = (n.z1 + n.z2) / 2;
                var h = e.springLength;
                return {x: o + i.next(h) - h / 2, y: a + i.next(h) - h / 2, z: s + i.next(h) - h / 2}
            }
        }
    }, Uu = function (t) {
        var e = pu, n = uu;
        t = e(t, {dragCoeff: .02});
        var i = {
            update: function (e) {
                e.force.x -= t.dragCoeff * e.velocity.x, e.force.y -= t.dragCoeff * e.velocity.y, e.force.z -= t.dragCoeff * e.velocity.z
            }
        };
        return n(t, i, ["dragCoeff"]), i
    }, Du = function (t) {
        var e = pu, n = du.random(42), i = uu;
        t = e(t, {springCoeff: 2e-4, springLength: 80});
        var r = {
            update: function (e) {
                var i = e.from, r = e.to, o = e.length < 0 ? t.springLength : e.length, a = r.pos.x - i.pos.x,
                    s = r.pos.y - i.pos.y, c = r.pos.z - i.pos.z, h = Math.sqrt(a * a + s * s + c * c);
                0 === h && (a = (n.nextDouble() - .5) / 50, s = (n.nextDouble() - .5) / 50, c = (n.nextDouble() - .5) / 50, h = Math.sqrt(a * a + s * s + c * c));
                var l = h - o, u = (!e.coeff || e.coeff < 0 ? t.springCoeff : e.coeff) * l / h * e.weight;
                i.force.x += u * a, i.force.y += u * s, i.force.z += u * c, r.force.x -= u * a, r.force.y -= u * s, r.force.z -= u * c
            }
        };
        return i(t, r, ["springCoeff", "springLength"]), r
    }, Ou = wu, zu = function (t) {
        return new Ou.Body3d(t)
    }, Bu = Fa, Fu = Ga, Gu = ka;
    ka.get2dLayout = Su;
    class ku {
        constructor(t, e = null, n = !0, i = (t => {
        })) {
            this.name = t, this.initVal = e, this.redigest = n, this.onChange = i
        }
    }
    const Hu = {graph: kl, forcelayout: au, forcelayout3d: Gu};
    return function (t = {}) {
        const e = t.props || [], n = t.init || (() => {
            }), i = t.update || (() => {
            });
        return function () {
            function t(e) {
                return r(e), o(), t
            }

            function r(t) {
                n(t, a), a.initialised = !0
            }

            function o() {
                a.initialised && i(a)
            }

            let a = {initialised: !1};
            return e.forEach(e => {
                t[e.name] = function (e, n = !1, i = (t => {
                })) {
                    return r => {
                        return arguments.length ? (a[e] = r, i(r), n && o(), t) : a[e]
                    }
                }(e.name, e.redigest, e.onChange), a[e.name] = e.initVal, e.onChange(e.initVal)
            }), t.resetProps = function () {
                return e.forEach(t => {
                    a[t.name] = t.initVal, t.onChange(t.initVal)
                }), o(), t
            }, t
        }
    }({
        props: [new ku("width", window.innerWidth), new ku("height", window.innerHeight), new ku("jsonUrl"), new ku("graphData", {
            nodes: [],
            links: []
        }), new ku("numDimensions", 3), new ku("nodeRelSize", 4), new ku("lineOpacity", .2), new ku("autoColorBy"), new ku("idField", "id"), new ku("valField", "val"), new ku("nameField", "name"), new ku("colorField", "color"), new ku("linkSourceField", "source"), new ku("linkTargetField", "target"), new ku("forceEngine", "d3"), new ku("warmupTicks", 0), new ku("cooldownTicks", 1 / 0), new ku("cooldownTime", 15e3)],
        init: (t, e) => {
            t.innerHTML = "";
            let n;
            t.appendChild(n = document.createElement("div")), n.className = "graph-nav-info", n.textContent = "Created by 苏汉 on 6.24.2017 suhan@nyu.edu. Thanks to 3d-force-graph library and Merriam-Webster Dictionary API", t.appendChild(e.infoElem = document.createElement("div")), e.infoElem.className = "graph-info-msg", e.infoElem.textContent = "";
            const i = document.createElement("div");
            i.classList.add("graph-tooltip"), t.appendChild(i);
            const r = new THREE.Raycaster, o = new THREE.Vector2;
            o.x = -2, o.y = -2, t.addEventListener("mousemove", n => {
                const r = function (t) {
                    const e = t.getBoundingClientRect(), n = window.pageXOffset || document.documentElement.scrollLeft,
                        i = window.pageYOffset || document.documentElement.scrollTop;
                    return {top: e.top + i, left: e.left + n}
                }(t), a = {x: n.pageX - r.left, y: n.pageY - r.top};
                o.x = a.x / e.width * 2 - 1, o.y = 2 * -(a.y / e.height) + 1, i.style.top = a.y - 40 + "px", i.style.left = a.x - 20 + "px"
            }, !1), e.renderer = new THREE.WebGLRenderer, t.appendChild(e.renderer.domElement);
            const a = new THREE.Scene;
            a.background = new THREE.Color(17), a.add(e.graphScene = new THREE.Group), a.add(new THREE.AmbientLight(12303291)), a.add(new THREE.DirectionalLight(16777215, .6)), e.camera = new THREE.PerspectiveCamera, e.camera.far = 2e4;
            const s = new THREE.TrackballControls(e.camera, e.renderer.domElement);
            e.d3ForceLayout = Bl().force("link", wl()).force("charge", Fl()).force("center", Ph()).stop(), function t() {
                e.onFrame && e.onFrame(), r.setFromCamera(o, e.camera);
                const n = r.intersectObjects(e.graphScene.children).filter(t => t.object.name);
                i.textContent = n.length ? n[0].object.name : "", s.update(), e.renderer.render(a, e.camera), requestAnimationFrame(t)
            }()
        },
        update: function t(e) {
            function n() {
                (a++ > e.cooldownTicks || new Date - s > e.cooldownTime) && (e.onFrame = null), o[r ? "tick" : "step"](), e.graphData.nodes.forEach(t => {
                    const n = t.__sphere, i = r ? t : o.getNodePosition(t[e.idField]);
                    n.position.x = i.x, n.position.y = i.y || 0, n.position.z = i.z || 0
                }), e.graphData.links.forEach(t => {
                    const e = t.__line, n = r ? t : o.getLinkPosition(o.graph.getLink(t.source, t.target).id),
                        i = n[r ? "source" : "from"], a = n[r ? "target" : "to"], s = e.geometry.attributes.position;
                    s.array[0] = i.x, s.array[1] = i.y || 0, s.array[2] = i.z || 0, s.array[3] = a.x, s.array[4] = a.y || 0, s.array[5] = a.z || 0, s.needsUpdate = !0, e.geometry.computeBoundingSphere()
                })
            }

            for (!function () {
                e.width && e.height && (e.renderer.setSize(e.width, e.height), e.camera.aspect = e.width / e.height, e.camera.updateProjectionMatrix())
            }(), e.onFrame = null, e.infoElem.textContent = "Loading...", (e.graphData.nodes.length || e.graphData.links.length) && console.info("3d-force-graph loading", e.graphData.nodes.length + " nodes", e.graphData.links.length + " links"), e.fetchingJson || !e.jsonUrl || e.graphData.nodes.length || e.graphData.links.length || (e.fetchingJson = !0, qwest.get(e.jsonUrl).then((n, i) => {
                e.fetchingJson = !1, e.graphData = i, t(e)
            })), function (t, e, n) {
                if (e) {
                    const i = ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
                        r = t.filter(t => !t[n]), o = {};
                    r.forEach(t => {
                        o[t[e]] = null
                    }), Object.keys(o).forEach((t, e) => {
                        o[t] = e
                    }), r.forEach(t => {
                        t[n] = parseInt(i[o[t[e]] % i.length].slice(1), 16)
                    })
                }
            }(e.graphData.nodes, e.autoColorBy, e.colorField), e.graphData.links.forEach(t => {
                t.source = t[e.linkSourceField], t.target = t[e.linkTargetField]
            }); e.graphScene.children.length;)e.graphScene.remove(e.graphScene.children[0]);

            e.graphData.nodes.forEach(t => {
                var texture1 = new THREEx.DynamicTexture(512,512);
                texture1.context.font   = "105px Helvetica Neue";
                let ColorArray=["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"];
                let color = ColorArray[Math.floor(Math.random() * ColorArray.length)];
                let word = t[e.nameField];
                texture1.clear(color).drawText(word, 128, 256, 'black');
                var len = Math.cbrt(t[e.valField] || word.length*20) * e.nodeRelSize;
                const n = new THREE.Mesh(
                    // new THREE.TextGeometry( 'Hello three.js!', {
                    // size: 80,
                    // height: 5,
                    // curveSegments: 12,
                    // bevelEnabled: true,
                    // bevelThickness: 10,
                    // bevelSize: 8,
                    // bevelSegments: 5
                // } ),
                //     new THREE.SphereGeometry(Math.cbrt(t[e.valField] || 5) * e.nodeRelSize, 22, 22),

                    new THREE.CubeGeometry(len,len,len), new THREE.MeshLambertMaterial({
                    color: t[e.colorField] || 16777130,
                    transparent: !0,

                    opacity: 1,
                    map:texture1.texture
                })
                );
                n.name = t[e.nameField], e.graphScene.add(t.__sphere = n)
            });

            const i = new THREE.LineBasicMaterial({color: 'white', transparent: !0, opacity: 1});
            e.graphData.links.forEach(t => {
                const n = new THREE.BufferGeometry;
                n.addAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 10));
                const r = new THREE.Line(n, i);
                r.renderOrder = 10, e.graphScene.add(t.__line = r)
            }), e.camera.lookAt(e.graphScene.position), e.camera.position.z = 30 * Math.cbrt(e.graphData.nodes.length);
            const r = "ngraph" !== e.forceEngine;
            let o;
            if (r) (o = e.d3ForceLayout).stop().alpha(1).numDimensions(e.numDimensions).nodes(e.graphData.nodes).force("link").id(t => t[e.idField]).links(e.graphData.links); else {
                const t = Hu.graph();
                e.graphData.nodes.forEach(n => {
                    t.addNode(n[e.idField])
                }), e.graphData.links.forEach(e => {
                    t.addLink(e.source, e.target)
                }), o = Hu["forcelayout" + (2 === e.numDimensions ? "" : "3d")](t), o.graph = t
            }
            for (let t = 0; t < e.warmupTicks; t++)o[r ? "tick" : "step"]();
            let a = 0;
            const s = new Date;
            e.onFrame = n, e.infoElem.textContent = ""
        }
    })
});