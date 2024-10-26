varying vec2 vUv;

void main()
{
    vec2 wavedUv = vec2(
    vUv.x,
    vUv.y + sin(vUv.x * 30.0) * 0.1);

    float strength = 1.0 - step(0.025, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    vec3 color1 = vec3(0.0);
    vec3 color2 = vec3(0.5, 1.0, 0.2);
    vec3 mixedColor = mix(color1, color2, strength);
    
    gl_FragColor = vec4(mixedColor, 1.0);
}