import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as THREE from 'three';
/* import * as tf from '@tensorflow/tfjs-core'; */
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
import { createDetector, SupportedModels } from '@tensorflow-models/face-landmarks-detection';
import glassesSrc from '../assets/v.jpg'; 

const VirtualTryOn = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [glassesMesh, setGlassesMesh] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const setupCamera = async () => {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(newStream);
        if (webcamRef.current) {
          webcamRef.current.srcObject = newStream;
          webcamRef.current.video.play(); // Ensure the video plays
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    if (isCameraOn) {
      setupCamera();
    } else if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      if (webcamRef.current) {
        webcamRef.current.srcObject = null;
      }
    }

    const width = 800;
    const height = 800;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(width, height);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(glassesSrc, (texture) => {
      const geometry = new THREE.PlaneGeometry(4, 2); // Adjust the size as needed
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      const glasses = new THREE.Mesh(geometry, material);
      scene.add(glasses);
      setGlassesMesh(glasses);
    });

    const loadModel = async () => {
      try {
        const detector = await createDetector(SupportedModels.MediaPipeFaceMesh);
        setModel(detector);
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModel();

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOn, stream]);

  useEffect(() => {
    const detectAndPositionGlasses = async () => {
      if (!webcamRef.current || !model || !glassesMesh) return;
      const video = webcamRef.current.video;
      if (video.readyState !== 4) return;

      try {
        const faceEstimates = await model.estimateFaces({ input: video });
        if (faceEstimates.length > 0) {
          const keypoints = faceEstimates[0].scaledMesh;

          // Key points for eyes
          const leftEye = keypoints[33];
          const rightEye = keypoints[263];
          
          // Calculate eye center and eye distance
          const eyeCenter = [
            (leftEye[0] + rightEye[0]) / 2,
            (leftEye[1] + rightEye[1]) / 2,
          ];

          const eyeDistance = Math.sqrt(
            Math.pow(rightEye[0] - leftEye[0], 2) + Math.pow(rightEye[1] - leftEye[1], 2)
          );

          // Adjust scale and position based on face size and distance
          const scaleMultiplier = eyeDistance / 50; // Adjust scale as needed
          const glassesWidth = 4; // Width of the glasses model in 3D units
          const glassesHeight = 2; // Height of the glasses model in 3D units
          const glassesPositionZ = -glassesHeight / 2;

          // Position glasses
          glassesMesh.position.x = (eyeCenter[0] - video.videoWidth / 2) / 100;
          glassesMesh.position.y = -(eyeCenter[1] - video.videoHeight / 2) / 100;
          glassesMesh.position.z = glassesPositionZ;
          glassesMesh.scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier);

          // Calculate rotation angle
          const angle = Math.atan2(rightEye[1] - leftEye[1], rightEye[0] - leftEye[0]);
          glassesMesh.rotation.z = -angle;
        }
      } catch (error) {
        console.error('Error during face detection:', error);
      }
    };

    const intervalId = setInterval(() => {
      detectAndPositionGlasses();
    }, 100);

    return () => clearInterval(intervalId);
  }, [model, glassesMesh]);

  const toggleCamera = () => {
    setIsCameraOn(prev => !prev);
  };

  return (
    <div style={{ position: 'relative', width: '800px', height: '800px' }}>
      <Webcam
        ref={webcamRef}
        style={{ width: '800px', height: '800px' }}
        mirrored
        videoConstraints={{ facingMode: 'user' }} // Ensure the camera faces the user
      />
      <canvas ref={canvasRef} style={{ width: '800px', height: '800px', position: 'absolute', top: 0, left: 0 }} />
      <button
        onClick={toggleCamera}
        style={{ position: 'absolute', bottom: '10px', left: '10px', padding: '10px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        {isCameraOn ? 'Stop Camera' : 'Start Camera'}
      </button>
    </div>
  );
};

export default VirtualTryOn;
