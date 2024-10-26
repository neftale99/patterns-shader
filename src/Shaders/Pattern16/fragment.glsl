uniform float uTime;
varying vec2 vUv;

void main() { 

    float freq = 5.0;

    vec2 uvAnimated = vUv + vec2(0.0, uTime * 0.01) * 0.05; 

    float pattern = 
        abs(distance(fract(uvAnimated * freq), vec2(0.5)) - 0.5);
    pattern = step(0.1, pattern);

    float pattern2 = max(
        abs(fract(uvAnimated.x * freq) * 0.2),
        abs(fract(uvAnimated.y * freq))
    );
    pattern2 = step(0.5, pattern2);

    vec3 color = vec3(0.8, pattern, pattern2);
    
    gl_FragColor = vec4(color, 1.0);
}