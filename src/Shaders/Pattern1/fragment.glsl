varying vec2 vUv;

void main()
{
    float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    strength += step(0.8, mod(vUv.y * 10.0, 1.0));
    
    vec3 color1 = vec3(0.0);
    vec3 color2 = vec3(0.7, 0.22, 0.15);
    vec3 mixedColor = mix(color1, color2, strength);

    gl_FragColor = vec4(mixedColor, 1.0);
}