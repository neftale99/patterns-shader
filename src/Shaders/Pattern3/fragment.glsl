varying vec2 vUv;

void main()
{
    float barX = step(0.4, mod(vUv.x * 10.0 - 0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0 - 0.2, 1.0));
    float strength = barX + barY;

    vec3 color1 = vec3(1.0);
    vec3 color2 = vec3(0.0, 0.0, 1.0);
    vec3 mixedColor = mix(color1, color2, strength);

    gl_FragColor = vec4(mixedColor, 1.0);
}