import * as THREE from 'three'
import gsap from 'gsap'
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import pattern1VertexShader from './Shaders/Pattern1/vertext.glsl'
import pattern1FragmentShader from './Shaders/Pattern1/fragment.glsl'
import pattern2VertexShader from './Shaders/Pattern2/vertex.glsl'
import pattern2FragmentShader from './Shaders/Pattern2/fragment.glsl'
import pattern3VertexShader from './Shaders/Pattern3/vertex.glsl'
import pattern3FragmentShader from './Shaders/Pattern3/fragment.glsl'
import pattern4VertexShader from './Shaders/Pattern4/vertex.glsl'
import pattern4FragmentShader from './Shaders/Pattern4/fragment.glsl'
import pattern5VertexShader from './Shaders/Pattern5/vertex.glsl'
import pattern5FragmentShader from './Shaders/Pattern5/fragment.glsl'
import pattern6VertexShader from './Shaders/Pattern6/vertex.glsl'
import pattern6FragmentShader from './Shaders/Pattern6/fragment.glsl'
import pattern7VertexShader from './Shaders/Pattern7/vertex.glsl'
import pattern7FragmentShader from './Shaders/Pattern7/fragment.glsl'
import pattern8VertexShader from './Shaders/Pattern8/vertex.glsl'
import pattern8FragmentShader from './Shaders/Pattern8/fragment.glsl'
import pattern9VertexShader from './Shaders/Pattern9/vertex.glsl'
import pattern9FragmentShader from './Shaders/Pattern9/fragment.glsl'
import pattern10VertexShader from './Shaders/Pattern10/vertex.glsl'
import pattern10FragmentShader from './Shaders/Pattern10/fragment.glsl'
import pattern11VertexShader from './Shaders/Pattern11/vertex.glsl'
import pattern11FragmentShader from './Shaders/Pattern11/fragment.glsl'
import pattern12VertexShader from './Shaders/Pattern12/vertex.glsl'
import pattern12FragmentShader from './Shaders/Pattern12/fragment.glsl'
import pattern13VertexShader from './Shaders/Pattern13/vertex.glsl'
import pattern13FragmentShader from './Shaders/Pattern13/fragment.glsl'
import pattern14VertexShader from './Shaders/Pattern14/vertex.glsl'
import pattern14FragmentShader from './Shaders/Pattern14/fragment.glsl'
import pattern15VertexShader from './Shaders/Pattern15/vertex.glsl'
import pattern15FragmentShader from './Shaders/Pattern15/fragment.glsl'
import pattern16VertexShader from './Shaders/Pattern16/vertex.glsl'
import pattern16FragmentShader from './Shaders/Pattern16/fragment.glsl'
import pattern17VertexShader from './Shaders/Pattern17/vertex.glsl'
import pattern17FragmentShader from './Shaders/Pattern17/fragment.glsl'
import overlayVertexShader from './Shaders/Overlay/vertex.glsl'
import overlayFragmentShader from './Shaders/Overlay/fragment.glsl'


/**
 * Loaders
 */
// Loading
const loaderElement = document.querySelector('.loading')
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
        gsap.delayedCall(1, () => {

            loaderElement.style.display = 'none'

            gsap.to(
                overlayMaterial.uniforms.uAlpha, 
                { duration: 1.5, value: 0, delay: 0.5 }
            )

            addParticles()

            window.setTimeout(() => {
                initGUI()
            }, 2000)
        })
    },
    // Progress
    (itemUrl, itemsLoaded, itemsTotal) => 
    {
        loaderElement.style.display = 'block'
    }
)

const textureLoader = new THREE.TextureLoader(loadingManager)

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Texture
 */
// Matcap
const matcapTexture = textureLoader.load('Texture/Matcap/matcap15.png')
const matcap2Texture = textureLoader.load('Texture/Matcap/matcap14.png')
const matcap3Texture = textureLoader.load('Texture/Matcap/matcap13.png')
const matcap4Texture = textureLoader.load('Texture/Matcap/matcap5.png')
const matcap5Texture = textureLoader.load('Texture/Matcap/matcap3.png')
const matcap6Texture = textureLoader.load('Texture/Matcap/matcap16.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
matcap2Texture.colorSpace = THREE.SRGBColorSpace
matcap3Texture.colorSpace = THREE.SRGBColorSpace
matcap4Texture.colorSpace = THREE.SRGBColorSpace
matcap5Texture.colorSpace = THREE.SRGBColorSpace
matcap6Texture.colorSpace = THREE.SRGBColorSpace

// Start
const particleTexture = textureLoader.load('Texture/Particles/star_08.png')

/**
 * Overlay
 */
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    vertexShader: overlayVertexShader,
    fragmentShader: overlayFragmentShader,
    uniforms: {
        uAlpha: new THREE.Uniform(1)
    },
    transparent: true,
    depthWrite: false,
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)

/**
 * Background Particles
 */
const addParticles = () =>
{
    // Geometry
    const particlesGeometry = new THREE.BufferGeometry()
    const count = 2000

    const positions = new Float32Array(count * 3)

    for(let i = 0; i < count * 3; i++)
    {
        positions[i] = (Math.random() - 0.5) * 70
    }

    particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    )

    // Material
    const particlesMaterial = new THREE.PointsMaterial()
    particlesMaterial.color = new THREE.Color('#ffffff')
    particlesMaterial.size = 1
    particlesMaterial.sizeAttenuation = true
    particlesMaterial.map = particleTexture
    particlesMaterial.transparent = true
    particlesMaterial.alphaMap = particleTexture
    particlesMaterial.depthWrite = false
    particlesMaterial.blending = THREE.AdditiveBlending


    const backgroundParticles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(backgroundParticles)
}

/**
 * Font
 */
const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

const fontLoader = new FontLoader()
let text = {}

fontLoader.load('Font/Exo 2_Italic.json', 
    (font) => {

        const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

        let textGeometry = new TextGeometry(
            'Shader Patterns',
            {
                font: font,
                size: 0.5,
                depth: 0.4,
                curveSegments: 20,
                bevelEnabled: true,
                bevelThickness: 0.02,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5,
            }
        )
    textGeometry.center()
    textGeometry.deleteAttribute('normal')
    textGeometry = mergeVertices(textGeometry, 1e-3)
    textGeometry.computeVertexNormals()

    const text = new THREE.Mesh(textGeometry, textMaterial)
    text.position.y = 1.2
    scene.add(text)
})



/**
 * Patterns
 */
const materials = {

    pattern1: new THREE.ShaderMaterial({
        vertexShader: pattern1VertexShader,
        fragmentShader: pattern1FragmentShader,
        uniforms: {
            uTime: { value: 0}
        }
    }),
    
    pattern2: new THREE.ShaderMaterial({
        vertexShader: pattern2VertexShader,
        fragmentShader: pattern2FragmentShader,
        side: THREE.DoubleSide
    }),
    
    pattern3: new THREE.ShaderMaterial({
        vertexShader: pattern3VertexShader,
        fragmentShader: pattern3FragmentShader,
        side: THREE.DoubleSide
    }),

    pattern4: new THREE.ShaderMaterial({
        vertexShader: pattern15VertexShader,
        fragmentShader: pattern15FragmentShader,
        side: THREE.DoubleSide
    }),
    
    pattern5: new THREE.ShaderMaterial({
        vertexShader: pattern4VertexShader,
        fragmentShader: pattern4FragmentShader,
        side: THREE.DoubleSide
    }),
    
    pattern6: new THREE.ShaderMaterial({
        vertexShader: pattern5VertexShader,
        fragmentShader: pattern5FragmentShader,
        side: THREE.DoubleSide
    }),
    
    pattern7: new THREE.ShaderMaterial({
        vertexShader: pattern6VertexShader,
        fragmentShader: pattern6FragmentShader,
        side: THREE.DoubleSide
    }),
    
    pattern8: new THREE.ShaderMaterial({
        vertexShader: pattern7VertexShader,
        fragmentShader: pattern7FragmentShader,
        side: THREE.DoubleSide
    }),
    
    pattern9: new THREE.ShaderMaterial({
        vertexShader: pattern8VertexShader,
        fragmentShader: pattern8FragmentShader,
        side: THREE.DoubleSide
    }),
    
    pattern10: new THREE.ShaderMaterial({
        vertexShader: pattern9VertexShader,
        fragmentShader: pattern9FragmentShader,
        side: THREE.DoubleSide
    }),
    
    pattern11: new THREE.ShaderMaterial({
        vertexShader: pattern10VertexShader,
        fragmentShader: pattern10FragmentShader,
        side: THREE.DoubleSide
    }),
    
    pattern12: new THREE.ShaderMaterial({
        vertexShader: pattern11VertexShader,
        fragmentShader: pattern11FragmentShader,
        side: THREE.DoubleSide
    }),
    
    pattern13: new THREE.ShaderMaterial({
        vertexShader: pattern12VertexShader,
        fragmentShader: pattern12FragmentShader,
        uniforms: {
            uTime: { value: 0}
        },
        side: THREE.DoubleSide
    }),
    
    pattern14: new THREE.ShaderMaterial({
        vertexShader: pattern13VertexShader,
        fragmentShader: pattern13FragmentShader,
        uniforms: {
            uTime: { value: 0}
        },
        side: THREE.DoubleSide
    }),
    
    pattern15: new THREE.ShaderMaterial({
        vertexShader: pattern14VertexShader,
        fragmentShader: pattern14FragmentShader,
        uniforms: {
            uTime: { value: 0}
        }
    }),

    pattern16: new THREE.ShaderMaterial({
        vertexShader: pattern16VertexShader,
        fragmentShader: pattern16FragmentShader,
        uniforms: {
            uTime: { value: 0}
        }
    }),

    pattern17: new THREE.ShaderMaterial({
        vertexShader: pattern17VertexShader,
        fragmentShader: pattern17FragmentShader,
        uniforms: {
            uTime: { value: 0}
        }
    }) 
}

const shaderPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(2.1, 2.1),
    materials.pattern1
)
shaderPlane.position.set(0, - 0.5, 0.4)
shaderPlane.rotation.set(- 0.2, 0, 0)
scene.add(shaderPlane)

/**
 * Tweaks
 */
function initGUI()
{
    const gui = new GUI()

    const materialNames = Object.keys(materials)

    const patternFolder = gui.addFolder('Pattern')
    patternFolder.close()

    patternFolder.add({ material: materialNames[0] }, 'material', materialNames)
        .name('Select Pattern')
        .onChange((value) => {
        shaderPlane.material = materials[value]
        shaderPlane.material.needsUpdate = true
})
}

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 4)
camera.lookAt(new THREE.Vector3(0))
scene.add(camera)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Mov camera
 */
const cameraXPos = {
    current: 0,
    target: 0,
    ease: 0.1
}

const cameraYPos = {
    current: 0,
    target: 0,
    ease: 0.1
}

// Mouse & Tactil
const updateCamera = (x, y) => {
    cameraXPos.target = (x / sizes.width - 0.5) * 2
    cameraYPos.target = - (y / sizes.height - 0.5) * 2
}

window.addEventListener('mousemove', event => {
    updateCamera(event.clientX, event.clientY)
})

window.addEventListener('touchmove',  event => {
    if (event.touches.length > 0) {
        const touch = event.touches[0]
        updateCamera(touch.clientX, touch.clientY)
    }
}, { passive: true })

/**
 * Time
 */
const time = {
    startTime: Date.now(),
    currentTime: 0,
    elapsedTime: 0,
    deltaTime: 16  
}

/**
 * Animate
 */
const tick = () => {
    const cTime = Date.now()
    time.elapsedTime = cTime - time.startTime
    time.deltaTime = cTime - time.currentTime
    time.currentTime = cTime

    // Camera
    cameraXPos.current = gsap.utils.interpolate(
    cameraXPos.current,
    cameraXPos.target,
    cameraXPos.ease)

    cameraYPos.current = gsap.utils.interpolate(
    cameraYPos.current,
    cameraYPos.target,
    cameraYPos.ease)

    camera.position.x = cameraXPos.current * 2
    camera.position.y = cameraYPos.current * 3
    camera.lookAt(new THREE.Vector3(0))

    // Uniforms
    materials.pattern17.uniforms.uTime.value = time.elapsedTime
    materials.pattern16.uniforms.uTime.value = time.elapsedTime
    materials.pattern15.uniforms.uTime.value = time.elapsedTime
    materials.pattern14.uniforms.uTime.value = time.elapsedTime
    materials.pattern13.uniforms.uTime.value = time.elapsedTime

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()