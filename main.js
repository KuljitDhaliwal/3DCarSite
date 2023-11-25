import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelector(".preloader").style.display = "none";
// })

const loadingManager = new THREE.LoadingManager();
const progressBar = document.querySelector(".progressBar");
const preLoader = document.querySelector(".preloader");

loadingManager.onProgress = function (url, loaded, total) {
  progressBar.value = (loaded / total) * 100;
  console.log("OnProgress")
}

loadingManager.onLoad = function () {
  preLoader.style.display = "none"
}

// loadingManager.onError = function (url) {
//   console.log("Got a Problem");
// }

//SCENE
const scene = new THREE.Scene()


//SIZES
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/ sizes.height, 0.1, 1000)
// camera.position.set(0, 0, 3.5)
if (camera.aspect > 1) {
  camera.position.set(0, 0, 3.5)
} else {
  camera.position.set(0, 0, 6.3)
}
console.log(camera.aspect + 'Aspect')
scene.add(camera)


//Light
const light = new THREE.DirectionalLight(0xffffff, 10)
light.position.set(0, 1, 0) 
light.castShadow = true
scene.add(light)  

const pointLight1 = new THREE.DirectionalLight(0xffffff,3)
pointLight1.position.set(0, 0, 50)
scene.add(pointLight1)
const pointLightHelper = new THREE.PointLightHelper( pointLight1 );
scene.add( pointLightHelper );





//Loader
let can;
const GLloader = new GLTFLoader(loadingManager)
GLloader.load('/car.gltf', (glb) => {
  can = glb.scene
  can.position.set(0,-1,0)
  can.rotation.set(0,1.5,0.1)
  scene.add(can)


  //SCrollTrigger
gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.defaults({ scroller: ".wrapper" })


//GSAP
  //TIMELINE 2 for section 2
    const tm2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#two",
        start: "top bottom",
        end: "top top",
        scrub: 0.2
      }
    })
  tm2.to(can.rotation, {
    x: 0,
    y: 1.5,
    z: 1.5,
    duration: 4,
  },'one')
  tm2.to(can.position, {
    x: 0,
    y: 0,
    z: 0,
    duration: 4,
  }, 'one')
  tm2.to(".car-spec", {
    opacity: 0
  }, 'one')
  tm2.to(".details", {
    opacity: 0
  }, 'one')
  tm2.to("body", {
    backgroundImage: "linear-gradient(19deg, #9f7673 0%, #DDD6F3 100%)"
  },"one")
  
  //TIMELINE 3 for section3
  const tm3 = gsap.timeline({
    scrollTrigger: {
      trigger: "#three",
      start: "top bottom",
      end: "top top",
      scrub: 0.2
    }
  })
  tm3.to(can.rotation, {
    x: .5,
    y: 2,
    z: 0,
    duration: 4,
  },'three')
  tm3.to(can.position, {
    x: 2,
    y: -.5,
    z: 0,
    duration: 4,
  }, 'three')


  tm3.to("body", {
    backgroundImage: "linear-gradient(19deg, #927472 0%, #afa5d1 100%)"
  },"three")
    //TIMELINE 4 for section4
    const tm4 = gsap.timeline({
      scrollTrigger: {
        trigger: "#four",
        start: "top bottom",
        end: "top top",
        scrub: 0.2
      }
    })
    tm4.to(can.rotation, {
      x: .5,
      y: -2,
      z: 0,
      duration: 4,
    },'four')
    tm4.to(can.position, {
      x: -2,
      y: -0.5,
      z: 0,
      duration: 4,
    }, 'four')
  tm4.to("body", {
    backgroundImage: "linear-gradient(19deg, #c7b3b2 0%, rgb(92, 63, 188) 100%)"
  },"four")
  
  
    //TIMELINE 5 for section5
    const tm5 = gsap.timeline({
      scrollTrigger: {
        trigger: "#five",
        start: "top bottom",
        end: "top top",
        scrub: 0.2
      }
    })

    tm5.to(can.rotation, {
      x: 0,
      y: -1.5,
      z: 0,
      duration: 4,
    },'five')
    tm5.to(can.position, {
      x: 0,
      y: -1,
      z: 0,
      duration: 4,
    }, 'five')
    tm5.to(".chev", {
      opacity: 1
    },'same')
    tm5.to("#five h1", {
      opacity: 1
    }, 'same')
    tm5.to("body", {
      backgroundImage: "linear-gradient(19deg, #b2c7b3 0%, rgb(188, 63, 140) 100%)"
    },"five")
  
})

//Canvas
const canvas = document.querySelector("#canvas")

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true
})
renderer.physicallyCorrectLights = true
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.render(scene, camera)


//RESIZE
window.addEventListener("resize", () => {
  //updateSizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //updateCamera
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.render(scene,camera)
  camera.aspect = sizes.width / sizes.height;
  if (camera.aspect > 1) {
    camera.position.set(0, 0, 3.5)
  } else {
    camera.position.set(0, 0, 6.3)
  }
  camera.updateProjectionMatrix();
  console.log(camera.aspect + 'Aspect')
})


//Loop Function
const loop = (time) => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()



