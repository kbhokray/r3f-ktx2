import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

function Box(props) {
  const mesh = useRef(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => {
    mesh.current.rotation.x += 0.01;
  });
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default function Experience({ listKey }) {
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        height,
        width,
        backgroundColor: '#00FF00',
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
        <Box position={[0, 0, 0]} />
      </Canvas>
    </View>
  );
}
