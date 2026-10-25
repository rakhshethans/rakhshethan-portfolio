// Velaris background adapted from the user-supplied React component for this static site.
(() => {
  const canvas = document.querySelector('.hero-atmosphere');
  const container = canvas?.closest('.opening');
  const toggle = container?.querySelector('.atmosphere-toggle');
  if (!canvas || !container || !toggle) return;

  const vertexSource = "\r\nattribute vec2 position;\r\nvarying vec2 vUv;\r\nvoid main() {\r\n  vUv = position * 0.5 + 0.5;\r\n  gl_Position = vec4(position, 0.0, 1.0);\r\n}\r\n";
  const fragmentSource = "\r\nprecision highp float;\r\nvarying vec2 vUv;\r\n\r\nuniform vec2  u_resolution;\r\nuniform float u_time;\r\nuniform float u_grain;\r\nuniform vec3  u_colors[4];\r\nuniform vec3  u_bg;\r\n\r\nvec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }\r\n\r\nfloat snoise(vec2 v){\r\n  const vec4 C = vec4(0.211324865405187, 0.366025403784439,\r\n           -0.577350269189626, 0.024390243902439);\r\n  vec2 i  = floor(v + dot(v, C.yy) );\r\n  vec2 x0 = v -   i + dot(i, C.xx);\r\n  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\r\n  vec4 x12 = x0.xyxy + C.xxzz;\r\n  x12.xy -= i1;\r\n  i = mod(i, 289.0);\r\n  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))\r\n  + i.x + vec3(0.0, i1.x, 1.0 ));\r\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),\r\n    dot(x12.zw,x12.zw)), 0.0);\r\n  m = m*m ;\r\n  m = m*m ;\r\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\r\n  vec3 h = abs(x) - 0.5;\r\n  vec3 ox = floor(x + 0.5);\r\n  vec3 a0 = x - ox;\r\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\r\n  vec3 g;\r\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\r\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\r\n  return 130.0 * dot(m, g);\r\n}\r\n\r\nvoid main() {\r\n  vec2 uv = vUv;\r\n  float ratio = u_resolution.x / u_resolution.y;\r\n  vec2 p = uv - 0.5;\r\n  p.x *= ratio;\r\n\r\n  float t = u_time * 0.1;\r\n\r\n  float n1 = snoise(p * 0.4 + vec2(t * 0.2, -t * 0.3));\r\n  float n2 = snoise(p * 0.55 + vec2(-t * 0.15, t * 0.25) + n1 * 0.25);\r\n  float n3 = snoise(p * 0.75 + vec2(t * 0.1, -t * 0.2) + n2 * 0.2);\r\n\r\n  vec3 col = u_bg;\r\n  \r\n  float dist = length(p) * 1.5;\r\n  float vignette = 1.0 - smoothstep(0.3, 1.2, dist);\r\n  \r\n  col = mix(col, u_colors[0], smoothstep(-0.2, 0.5, n1) * 0.85);\r\n  col = mix(col, u_colors[1], smoothstep(-0.1, 0.6, n2) * 0.7);\r\n  col = mix(col, u_colors[2], smoothstep(-0.3, 0.4, n3) * 0.6);\r\n  col = mix(col, u_colors[3], smoothstep(0.0, 0.7, n1 * n2) * 0.5);\r\n\r\n  float glow = (1.0 - smoothstep(0.0, 0.8, dist)) * 0.3;\r\n  col += u_colors[1] * glow;\r\n\r\n  col = mix(col * 0.2, col, vignette);\r\n\r\n  float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 + u_time);\r\n  col += (grain - 0.5) * u_grain * 0.1;\r\n\r\n  gl_FragColor = vec4(col, 1.0);\r\n}\r\n";
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const palette = ['#4b3028', '#79351f', '#352724', '#151312'];
  const rgb = hex => hex.match(/[a-f0-9]{2}/gi).map(part => parseInt(part, 16) / 255);
  let gl;
  try {
    gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false });
  } catch {
    canvas.dataset.state = 'fallback';
    return;
  }
  if (!gl) {
    canvas.dataset.state = 'fallback';
    return;
  }

  let program, buffer;
  let shaders = [];
  let uniforms;
  let frame = 0, lastFrame = 0, elapsed = 0;
  let inView = true, userPaused = false, contextLost = false, disposed = false;

  function compile(type, text) {
    const shader = gl.createShader(type);
    if (!shader) throw new Error('Unable to allocate background shader');
    shaders.push(shader);
    gl.shaderSource(shader, text);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Background shader unavailable');
    return shader;
  }

  function setup() {
    shaders = [];
    program = gl.createProgram();
    if (!program) throw new Error('Unable to allocate background program');
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Background renderer unavailable');
    gl.useProgram(program);
    buffer = gl.createBuffer();
    if (!buffer) throw new Error('Unable to allocate background geometry');
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    uniforms = Object.fromEntries(['u_resolution','u_time','u_grain','u_colors[0]','u_bg'].map(name => [name, gl.getUniformLocation(program, name)]));
    gl.uniform3fv(uniforms['u_colors[0]'], new Float32Array(palette.flatMap(rgb)));
    gl.uniform3fv(uniforms.u_bg, rgb('#171514'));
    gl.uniform1f(uniforms.u_grain, 0.22);
  }

  function draw() {
    if (contextLost || disposed) return;
    gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
    gl.uniform1f(uniforms.u_time, elapsed * 0.001 * 1.6);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function resize() {
    if (contextLost || disposed) return;
    const bounds = container.getBoundingClientRect();
    // Cap the decorative render surface, especially on high-DPI phones.
    const scale = Math.min(window.devicePixelRatio || 1, 1.25, 1600 / Math.max(bounds.width, 1));
    const width = Math.max(1, Math.round(bounds.width * scale));
    const height = Math.max(1, Math.round(bounds.height * scale));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
    draw();
  }

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = 0;
  }

  function canAnimate() {
    return !disposed && !contextLost && !motion.matches && !userPaused && inView && !document.hidden;
  }

  function tick(time) {
    frame = 0;
    if (!canAnimate()) return;
    if (!lastFrame || time - lastFrame >= 1000 / 30) {
      if (lastFrame) elapsed += Math.min(time - lastFrame, 100);
      lastFrame = time;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }

  function sync() {
    stop();
    if (disposed || contextLost) return;
    toggle.hidden = motion.matches;
    toggle.setAttribute('aria-pressed', String(userPaused));
    const label = userPaused ? 'Resume background animation' : 'Pause background animation';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    toggle.querySelector('use').setAttribute('href', userPaused ? '#ph-play' : '#ph-pause');
    canvas.dataset.state = motion.matches ? 'still' : canAnimate() ? 'animated' : 'paused';
    draw();
    if (canAnimate()) frame = requestAnimationFrame(tick);
  }

  function disposeResources() {
    if (buffer) gl.deleteBuffer(buffer);
    if (program) gl.deleteProgram(program);
    shaders.forEach(shader => gl.deleteShader(shader));
  }

  try {
    setup();
  } catch {
    disposeResources();
    canvas.dataset.state = 'fallback';
    return;
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  const intersectionObserver = new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    sync();
  });
  intersectionObserver.observe(container);
  toggle.addEventListener('click', () => { userPaused = !userPaused; sync(); });
  motion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    contextLost = true;
    stop();
    toggle.hidden = true;
    canvas.dataset.state = 'fallback';
  });
  canvas.addEventListener('webglcontextrestored', () => {
    contextLost = false;
    try {
      setup();
      resize();
      sync();
    } catch {
      contextLost = true;
      toggle.hidden = true;
      canvas.dataset.state = 'fallback';
    }
  });
  window.addEventListener('pagehide', event => {
    stop();
    if (event.persisted) return;
    disposed = true;
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    motion.removeEventListener('change', sync);
    document.removeEventListener('visibilitychange', sync);
    disposeResources();
  });
  window.addEventListener('pageshow', sync);
  resize();
  sync();
})();
