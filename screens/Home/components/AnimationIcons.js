import React, { useRef, useState } from 'react'
import LottieView from 'lottie-react-native';
import { optimizeHeight, optimizeWidth } from '../../../lib/helpers';

export const TabBarAnimationIcon = ({ source, size, positions }) => {
    const animationRef = useRef(null);

    animationRef?.current?.reset();
    animationRef?.current?.play(positions[0], positions[1]);

    return <LottieView
        ref={animationRef}
        loop={false}
        style={{
            width: optimizeWidth(size),
            height: optimizeWidth(size),
        }}
        source={source}
        speed={2}
    />
}