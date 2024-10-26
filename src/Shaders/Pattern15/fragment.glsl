varying vec2 vUv;

void main()
{ 
    float pattern = fract(distance(vUv - 0.5, vec2(0.0, 0.0)) * 10.0);
    // pattern = step(0.2, pattern);

    vec3 color1 = vec3(1.0, 0.0, 0.5);
    vec3 color2 = vec3(0.5, 0.2, 1.0);

    vec3 mixColor = mix(color1, color2, pattern);
    
    gl_FragColor = vec4(mixColor, 1.0);
}