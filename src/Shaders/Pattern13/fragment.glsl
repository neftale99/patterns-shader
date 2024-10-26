uniform float uTime;
varying vec2 vUv;

#include ../Include/perlinNoise2d.glsl

void main()
{
    float stopTime = mod(uTime, 6000.0);
    float strength = sin(cnoise(vUv * 12.0) * stopTime * 0.0025);
   
    vec3 color1 = vec3(1.0, 0.5, 0.0);
    vec3 color2 = vec3(0.0, 0.0, 0.5);
    vec3 mixedColor = mix(color1, color2, strength);
    
    gl_FragColor = vec4(mixedColor, 1.0);
}