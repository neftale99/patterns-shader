uniform float uTime;

varying vec2 vUv;

#include ../Include/perlinNoise2d.glsl

void main()
{
    float noise = cnoise(vUv * 10.0 + uTime * 0.001);
    float strength = step(0.5, sin(noise * 20.0));
    
    vec3 color1 = vec3(0.5, 0.0, 0.5);
    vec3 color2 = vec3(0.9, 0.9, 0.9);
    vec3 mixedColor = mix(color1, color2, strength);
    
    gl_FragColor = vec4(mixedColor, 1.0);
}