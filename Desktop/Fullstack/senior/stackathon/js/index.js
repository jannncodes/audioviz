const THREE = require('three');

//Scoped Variables

////Scene
var container, scene, camera, renderer, group, listener, sound, audioLoader,
analyser, audioData, rowWidth, light1, light2, selectedSong, uploadedSong;

//Load World
const loadWorld = function(){

  gui();
  firstInit();
  animate();

  function gui () {
    let rowWidthElm = document.getElementById('rowWidth');
    rowWidth = parseInt(rowWidthElm.value, 10);
    rowWidthElm.addEventListener('change', function() {
      rowWidth = parseInt( rowWidthElm.value, 10);
      initAfterRowChange();
    });

    let songElm = document.getElementById('song');
    selectedSong = songElm.value.split(' ')[0];
    songElm.addEventListener('change', function() {
      selectedSong = songElm.value.split(' ')[0];
      initAfterSongChange(selectedSong);
    });

    // const fReader = new FileReader();
    // let fileElm = document.getElementById('fileUpload');
    // fileElm.addEventListener('change', function() {
    //   let songFile = fileElm.files[0];
    //   fReader.onload = function(event) {
    //   };
    //   uploadedSong = fReader.readAsArrayBuffer(songFile);
    //   initAfterSongChange(uploadedSong);
    // });
  }

  function clear () {
    group = undefined;
  }

  function clearMusic () {
    listener = undefined;
    sound.disconnect();
  }

  function generateCubes () {
    const geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    group = new THREE.Group();
    let depth = (1024 / (rowWidth * 2)) / 2;

    for (let i = rowWidth * -1; i < rowWidth; i++) {
      for (let j = depth * -1; j < depth; j++) {
        let material = new THREE.MeshPhongMaterial( {
          color: (0, 0, 0),
          emissive: 0x334351,
        });
        let newCube = new THREE.Mesh(geometry, material);
        newCube.position.set(i, j, 0);
        group.add(newCube);
      }
    }
    return group;
  }

  function loadMusic (song) {
    listener = new THREE.AudioListener();
    camera.add(listener);
    sound = new THREE.Audio(listener);
    audioLoader = new THREE.AudioLoader();
    audioLoader.load(`../public/${song}.m4a`, function(buffer) {
      console.log(buffer);
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5);
      sound.play();
    });

    analyser = new THREE.AudioAnalyser(sound, 2048);
  }

  function loadUploadedMusic(song) {
    listener = new THREE.AudioListener();
    camera.add(listener);
    sound = new THREE.Audio(listener);
    audioLoader = new THREE.AudioLoader();
    audioLoader.load(song, function(buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5);
      sound.play();
    });
  }

  function createScene() {
    //Setup
    container = document.getElementById('container');
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x334351 );

    //Camera
    camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(100, 100, 60);
    camera.up = new THREE.Vector3(0, 0, 1);
    camera.lookAt(new THREE.Vector3(0, 0, 5));

    //Light
    light1 = new THREE.DirectionalLight(0xffffff, 0.8);
    light1.position.set(10, 0, 15);
    light2 = new THREE.DirectionalLight(0xffffff, 0.8);
    light2.position.set(-10, 10, 15);
    scene.add(light1, light2);

    //Renderer
    renderer = new THREE.WebGLRenderer( { alpha: true} );
    renderer.setSize( window.innerWidth, window.innerHeight);

    //Add to DOM
    container.appendChild( renderer.domElement );
    document.body.appendChild( container );
  }

  function firstInit(){
    createScene();

    //Audio
    loadMusic(selectedSong);

    //Add Cubes to Scene
    scene.add(generateCubes());
  }

  function initAfterRowChange () {
    clear();
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x334351);
    scene.add( camera, light1, light2 );
    if (rowWidth === 2) camera.position.set(200, 220, 120);
    if (rowWidth === 4) camera.position.set(110, 125, 60);
    if (rowWidth === 8) camera.position.set(100, 100, 60);
    if (rowWidth === 16) camera.position.set(100, 100, 60);
    if (rowWidth === 32) camera.position.set(100, 100, 60);
    if (rowWidth === 54) camera.position.set(100, 100, 80);

    //Add Cubes to Scene
    scene.add(generateCubes());
  }

  function initAfterSongChange (changedSong) {
    clear();
    clearMusic();
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x334351);
    scene.add(camera, light1, light2);

    //Add Cubes to Scene
    scene.add(generateCubes());
    if (uploadedSong) loadUploadedMusic(uploadedSong);
    else loadMusic(changedSong);
  }

  //Animate Scene
  function animate(){
    requestAnimationFrame( animate );
    audioData = analyser.getFrequencyData();
    let averageFreq = analyser.getAverageFrequency();
    let audioDataIndex = 0;
    let rValue = ((averageFreq / 140) + 0.2).toFixed(2);
    group.children.forEach((cube) => {
      cube.position.z = audioData[audioDataIndex] * 0.07;
      if (audioData[audioDataIndex] < 0.005) {
        cube.material.color.setHSL(0, 0, 0);
      } else {
        cube.material.color.setHSL(rValue, 1, 0.5);
      }
      audioDataIndex++;
    });

    render();
  }

  //Render Scene
  function render(){
    renderer.clear();
    renderer.render( scene, camera );
  }
};

loadWorld();

