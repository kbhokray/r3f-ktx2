import React, { Suspense, useRef } from 'react';
import { View } from 'react-native';
import { Canvas, useLoader, useThree } from '@react-three/fiber/native';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import localKtxPath from './assets/duck_texture.ktx2'


function Plane() {
const ref = useRef();
  const gl = useThree(state => state.gl)
  // const textureUrl = 'https://cdntest.metatube.studio/public/duck_texture.ktx2'
  const textureUrl = localKtxPath
  const texture = useLoader(KTX2Loader, textureUrl, (loader) => {
    loader.setTranscoderPath(`https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/basis/`)
    .detectSupport(gl);
  })
  return(
    <mesh>
      <planeBufferGeometry attach="geometry" args={[3, 3]} />
      <meshStandardMaterial ref={ref} attach="material" color="orange" map={texture} />
    </mesh>
  )
}

export default function App() {
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        height,
        width,
        backgroundColor: '#FFA000',
      }}
    >
      <Canvas
        onCreated={(s) => {
          s.setSize(width, height);
        }}
        gl={{ physicallyCorrectLights: true }}
        camera={{ position: [-6, 0, 16], fov: 36 }}
      >
        <color attach="background" args={[0xe2f4df]} />
        <ambientLight />
        <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
        <directionalLight intensity={0.8} position={[-6, 2, 2]} />
        <Suspense>
          <Plane />
        </Suspense>
      </Canvas>
    </View>
  );
}
