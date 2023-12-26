import {useRef} from 'react'
import LottieView from 'lottie-react-native';
import { optimizeHeight, optimizeWidth } from '../../../lib/helpers';

export const InfiniteAnimationIcon = ({ source, size, speed }) => {
    const animationRef = useRef(null);
    return <LottieView
        ref={animationRef}
        loop
        autoPlay
        style={{
            width: optimizeWidth(size),
            height: optimizeWidth(size),
        }}
        source={source}
        speed={speed?speed:1}
    />
}