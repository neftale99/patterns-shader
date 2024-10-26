uniform float uTime;

varying vec2 vUv;

#include ../Include/perlinNoise2d.glsl


void main() { 

    float freq = 15.0;

    vec2 uvAnimated = vUv - vec2(0.12, uTime * 0.01) * 0.005; 

    float pattern = 
        abs(distance(fract(uvAnimated * freq), vec2(0.5)) - 0.5);
    pattern = step(0.1, pattern);

    float pattern2 = step(0.4, cnoise(vUv * 10.0));
    vec3 colorPattern2 = vec3(0.5, sin(uTime * 0.001) * 0.4,  0.4);
    vec3 color2Pattern2  = vec3(1.0);
    vec3 mixColorPattern2 = mix(colorPattern2, color2Pattern2, pattern2);

    vec3 color1 = vec3(1.0, sin(uTime * 0.001) * 1.0,  0.0);
    vec3 color2 = vec3(0.2, 0.1, 0.0);

    vec3 mixColor = mix(color1, color2, pattern);
    mixColor = mix(mixColorPattern2, mixColor, pattern2);
    
    gl_FragColor = vec4(mixColor, 1.0);
}