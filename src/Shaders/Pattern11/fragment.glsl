varying vec2 vUv;

#include ../Include/perlinNoise2d.glsl

void main()
{
    float strength = step(0.2, cnoise(vUv * 20.0));
    
    vec3 color1 = vec3(0.4, 1.0, 0.5);
    vec3 color2 = vec3(0.0);
    vec3 mixedColor = mix(color1, color2, strength);
    
    gl_FragColor = vec4(mixedColor, 1.0);
}