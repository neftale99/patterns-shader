uniform float uTime;

varying vec2 vUv;

#include ../Include/perlinNoise2d.glsl

void main()
{
    float noise = cnoise(vUv * 12.0 - vec2(uTime * 0.0005, uTime * 0.005));
    float strength = 1.0 - abs(noise);
        
    vec3 color1 = vec3(0.0);
    vec3 color2 = vec3(1.0,  0.5, 1.0);
    vec3 mixedColor = mix(color1, color2, strength);
    
    gl_FragColor = vec4(mixedColor, 1.0);
}