#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

void main()
{
    float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    float strength = sin(angle * 100.0);

    vec3 color1 = vec3(1.0);
    vec3 color2 = vec3(0.0);
    vec3 mixedColor = mix(color1, color2, strength);
    
    gl_FragColor = vec4(mixedColor, 1.0);
}